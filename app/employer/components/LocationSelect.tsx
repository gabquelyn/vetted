"use client";

import { useId, useRef, useState } from "react";
import {
  MdOutlineLocationOn,
  MdKeyboardArrowDown,
  MdCheck,
  MdClose,
} from "react-icons/md";
// Adjust to wherever CITY_COORDS / resolveCity live
import { CITY_COORDS, resolveCity } from "@/app/utils/geo";

/** Every supported city, A-Z. Driven by CITY_COORDS so there is one source of truth (same as the HTML). */
export const SUPPORTED_CITIES: string[] = Object.keys(CITY_COORDS).sort((a, b) =>
  a.localeCompare(b),
);
/** Kept for existing imports. */
export const LOCATIONS = SUPPORTED_CITIES;

const MAX_SUGGESTIONS = 8; // first 8 matches, including when the box is empty
const PANEL_MAX_PX = 256; // max-h-64

/**
 * Resolves what the user typed (or picked) by searching CITY_COORDS via resolveCity,
 * returning the CITY_COORDS key, or null if it has no coordinates.
 * Case-insensitive, and the province is optional: "toronto" -> "Toronto, ON".
 * Use this in the parent to enable the radius control and to compute distances.
 */
export const resolveTypedCity = (input: string): string | null =>
  resolveCity(input) ?? resolveCity(`${input.trim()}, ON`);

/** Comparable form of a city or query: no accents or punctuation, optional ", ON" dropped. */
const normCity = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(,\s*|\s+)(on|ontario)$/, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Bolds the part of a city that matches what was typed. */
function Highlighted({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <b className="font-bold text-forest">{text.slice(i, i + q.length)}</b>
      {text.slice(i + q.length)}
    </>
  );
}

export default function LocationSelect({
  value,
  onChange,
  onResolvedChange,
  placeholder = "Location",
  disabled = false,
  className = "",
  resolved,
  setRadius
}: {
  /** The text in the box (a supported city or whatever the user is typing). */
  value: string;
  onChange: (value: string) => void;
  /** Fires when the typed text starts/stops matching a supported city. */
  onResolvedChange?: (city: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  resolved: boolean;
  setRadius?: React.Dispatch<React.SetStateAction<number>>
}) {
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const [query, setQuery] = useState(value);
  const [active, setActive] = useState(-1);
  // Keep the displayed text in sync when the parent changes the location
  // (adjusting state during render, so no effect is needed).
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastResolved = useRef<string | null>(resolveTypedCity(value));
  const listId = useId();

  const normalizedQuery = normCity(query);

  // Same as the HTML: the sorted supported cities, filtered by what was typed
  // (ignoring case, accents and ", ON"), first 8 only. An empty box shows the first 8.
  const matches = SUPPORTED_CITIES.filter((city) =>
    normCity(city).includes(normalizedQuery),
  );
  const suggestions = matches.slice(0, MAX_SUGGESTIONS);

  const unsupported = normalizedQuery.length > 0 && matches.length === 0;

  // Flip the list above the field when there isn't room below.
  const openList = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom - 12;
      const above = rect.top - 12;
      setFlipUp(below < Math.min(PANEL_MAX_PX, 200) && above > below);
    }
    setOpen(true);
  };

  const closeList = () => {
    setOpen(false);
    setActive(-1);
  };

  // Tell the parent when the typed text starts/stops resolving to a real city.
  const emitResolved = (text: string) => {
    const resolved = resolveTypedCity(text);
    if (resolved !== lastResolved.current) {
      lastResolved.current = resolved;
      onResolvedChange?.(resolved);
    }
  };

  const select = (location: string) => {
    onChange(location);
    setQuery(location);
    emitResolved(location);
    closeList();
  };

  // Settle whatever is typed: a supported city is kept (normalised to "Toronto, ON"),
  // anything else is cleared so free text never stays as the location.
  const commit = () => {
    closeList();
    const city = resolveTypedCity(query);
    if (city) {
      if (city !== value) onChange(city);
      setQuery(city);
      emitResolved(city);
    } else if (query.trim()) {
      onChange("");
      setQuery("");
      emitResolved("");
    } else {
      setQuery(value);
    }
  };

  // Close on focus leaving the whole control (covers outside click and Tab away).
  const onBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      commit();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      commit();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        openList();
        setActive(0);
        return;
      }
      if (suggestions.length === 0) return;

      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => {
        if (current < 0) return direction === 1 ? 0 : suggestions.length - 1;
        return (current + direction + suggestions.length) % suggestions.length;
      });
      return;
    }

    if (event.key === "Enter" && open) {
      event.preventDefault();

      if (active >= 0 && active < suggestions.length) {
        select(suggestions[active]);
        return;
      }
      // Nothing highlighted: accept what was typed if it resolves to a city.
      const resolved = resolveTypedCity(query);
      if (resolved) select(resolved);
    }
  };

  return (
    <div
      ref={rootRef}
      onBlurCapture={onBlurCapture}
      className={`relative min-w-0 ${className}`}
    >
      <MdOutlineLocationOn className="pointer-events-none absolute left-0 top-1/2 z-10 -translate-y-1/2 text-ink-soft" />

      <div className="flex w-full min-w-0 items-center">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search location"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && active >= 0 && active < suggestions.length
              ? `${listId}-option-${active}`
              : undefined
          }
          onFocus={() => {
            openList();
            setActive(-1);
          }}
          onClick={openList}
          // Resolves as the user types: filters the list, updates the parent
          // immediately, and reports when the text becomes a supported city.
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            onChange(next);
            emitResolved(next);
            openList();
            // highlight the best match so Enter picks it
            setActive(next.trim() ? 0 : -1);
          }}
          onKeyDown={onKeyDown}
          className="w-full min-w-0 border-none bg-transparent py-1.5 pl-6 pr-1 text-xs font-[inherit] text-ink outline-none placeholder:text-ink-soft disabled:cursor-not-allowed disabled:text-ink-soft"
        />

        {query && !disabled && (
          <button
            type="button"
            aria-label="Clear location"
            onClick={() => {
              setQuery("");
              onChange("");
              onResolvedChange?.(null)
              emitResolved("");
              setRadius?.(25)
              setActive(-1);
              openList();
              inputRef.current?.focus();
            }}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0.5 text-ink-soft transition-colors hover:bg-black/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest"
          >
            <MdClose size={15} />
          </button>
        )}

        <button
          type="button"
          disabled={disabled}
          aria-label={
            open ? "Close location suggestions" : "Open location suggestions"
          }
          onClick={() => {
            if (open) {
              closeList();
            } else {
              inputRef.current?.focus();
              openList();
            }
          }}
          className="shrink-0 cursor-pointer border-none bg-transparent p-0 text-ink-soft disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute left-0 right-0 z-50 max-h-64 overflow-y-auto rounded-xl border border-black/10 bg-white py-1 shadow-xl ${
            flipUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {unsupported ? (
            <li role="status" className="px-4 py-3">
              <p className="text-xs font-semibold text-ink">
                No match in this demo&apos;s sample set.
              </p>
              <p className="mt-1 text-[.7rem] leading-snug text-ink-soft">
                Supported cities include:{" "}
                {SUPPORTED_CITIES.slice(0, 5).join(", ")}…
              </p>
            </li>
          ) : (
            suggestions.map((location, index) => {
              const selected = location === value;
              const highlighted = active === index;

              return (
                <li
                  key={location}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  className={highlighted ? "bg-forest-light" : ""}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    // keep focus in the input so blur doesn't close the list mid-click
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => select(location)}
                    className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-2 text-left transition-colors hover:bg-forest-light"
                  >
                    <MdOutlineLocationOn className="shrink-0 text-ink-soft" />

                    <span className="flex-1 text-xs text-ink">
                      <Highlighted text={location} query={query} />
                    </span>

                    {selected && <MdCheck className="shrink-0 text-forest" />}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}