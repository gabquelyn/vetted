"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  MdOutlineLocationOn,
  MdKeyboardArrowDown,
  MdCheck,
  MdClose,
} from "react-icons/md";

export const LOCATIONS = [
  "Barrie, ON",
  "Brampton, ON",
  "Burlington, ON",
  "Cornwall, ON",
  "Goderich, ON",
  "Guelph, ON",
  "Hamilton, ON",
  "Kingston, ON",
  "Toronto, ON",
  "Mississauga, ON",
] as const;

export default function LocationSelect({
  value,
  onChange,
  placeholder = "Any location",
  disabled = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [active, setActive] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  // Keep the displayed text in sync when the parent changes the location.
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredLocations = LOCATIONS.filter((location) =>
    location.toLowerCase().includes(normalizedQuery),
  );

  // Include the option to clear the location when the input is empty.
  const suggestions =
    normalizedQuery.length === 0
      ? ["", ...filteredLocations]
      : filteredLocations;

  const exactMatch = LOCATIONS.some(
    (location) => location.toLowerCase() === normalizedQuery,
  );

  const unsupported =
    normalizedQuery.length > 0 && filteredLocations.length === 0;

  const select = (location: string) => {
    onChange(location);
    setQuery(location);
    setOpen(false);
    setActive(-1);
  };

  // Close on outside click.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery(value);
        setActive(-1);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, value]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setQuery(value);
      setActive(-1);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
        setActive(0);
        return;
      }

      if (suggestions.length === 0) return;

      const direction = event.key === "ArrowDown" ? 1 : -1;

      setActive((current) => {
        if (current < 0) {
          return direction === 1 ? 0 : suggestions.length - 1;
        }

        return (current + direction + suggestions.length) % suggestions.length;
      });

      return;
    }

    if (event.key === "Enter" && open) {
      event.preventDefault();

      if (active >= 0 && active < suggestions.length) {
        select(suggestions[active]);
      } else if (exactMatch) {
        const match = LOCATIONS.find(
          (location) => location.toLowerCase() === normalizedQuery,
        );

        if (match) select(match);
      }
    }
  };

  return (
    <div ref={rootRef} className={`relative min-w-0 ${className}`}>
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
            open && active >= 0 ? `${listId}-option-${active}` : undefined
          }
          onFocus={() => {
            setOpen(true);
            setActive(-1);
          }}
          onClick={() => setOpen(true)}
          onChange={(event) => {
            const nextValue = event.target.value;

            setQuery(nextValue);
            onChange(nextValue);
            setOpen(true);
            setActive(-1);
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
              setActive(-1);
              setOpen(true);
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
              setOpen(false);
            } else {
              inputRef.current?.focus();
              setOpen(true);
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
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-black/10 bg-white py-1 shadow-xl"
        >
          {suggestions.length > 0 ? (
            suggestions.map((location, index) => {
              const selected = location === value;
              const highlighted = active === index;

              return (
                <li
                  key={location || "any"}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  className={highlighted ? "bg-black/5" : ""}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => select(location)}
                    className="flex w-full items-center gap-3 border-none bg-transparent px-4 py-2 text-left transition-colors hover:bg-black/5"
                  >
                    <MdOutlineLocationOn className="shrink-0 text-ink-soft" />

                    <span
                      className={`flex-1 text-xs ${
                        location ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {location || placeholder}
                    </span>

                    {selected && <MdCheck className="shrink-0 text-forest" />}
                  </button>
                </li>
              );
            })
          ) : (
            <li role="status" className="flex items-start gap-2 px-4 py-3">
              <MdOutlineLocationOn className="mt-0.5 shrink-0 text-ink-soft" />

              <div>
                <p className="text-xs font-semibold text-ink">
                  Location not supported in demo
                </p>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
