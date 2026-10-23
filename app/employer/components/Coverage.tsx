"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

/* ------------------------------------------------------------------ */
/* Coverage data — the approved launch matrix                          */
/* ------------------------------------------------------------------ */

export type Option = { value: string; label: string };

export const COVERAGE_PROFESSIONS: Option[] = [
  { value: "cycp", label: "Child and Youth Care Practitioner (CYCP)" },
  { value: "cook", label: "Cook" },
  { value: "dsw", label: "Developmental Services Worker (DSW)" },
  { value: "dietary_aide", label: "Dietary Aide" },
  { value: "housekeeper", label: "Housekeeper" },
  { value: "maa", label: "Medical Administrative Assistant (MAA)" },
  { value: "moa", label: "Medical Office Assistant (MOA)" },
  { value: "np", label: "Nurse Practitioner (NP)" },
  { value: "psw", label: "Personal Support Worker (PSW)" },
  { value: "rn", label: "Registered Nurse (RN)" },
  { value: "rpn", label: "Registered Practical Nurse (RPN)" },
  { value: "rssw", label: "Registered Social Service Worker (RSSW)" },
  { value: "rsw", label: "Registered Social Worker (RSW)" },
  { value: "sched", label: "Scheduling Coordinator" },
  { value: "ucp", label: "Unregulated Care Provider (UCP)" },
];

export const COVERAGE_REGIONS: Option[] = [
  { value: "toronto", label: "Toronto" },
  { value: "peel", label: "Peel Region" },
  { value: "halton", label: "Halton Region" },
  { value: "york", label: "York Region" },
  { value: "durham", label: "Durham Region" },
  { value: "hamilton", label: "Hamilton" },
  { value: "niagara", label: "Niagara Region" },
  { value: "waterloo", label: "Waterloo Region" },
  { value: "london_middlesex", label: "London & Middlesex" },
];

// Group A: supported in every region.
const ALL_REGION_PROFESSIONS = new Set([
  "rn", "rpn", "psw", "ucp", "dsw", "housekeeper", "moa", "maa", "sched", "rsw",
]);
// Group B: supported only in the core GTA regions below.
const LIMITED_PROFESSIONS = new Set(["np", "rssw", "cycp", "dietary_aide", "cook"]);
const LIMITED_REGIONS = new Set(["toronto", "peel", "halton", "york"]);

/** No approved combination ever defaults to a false positive. */
export function isCovered(profession: string, region: string): boolean {
  if (ALL_REGION_PROFESSIONS.has(profession)) return true;
  if (LIMITED_PROFESSIONS.has(profession)) return LIMITED_REGIONS.has(region);
  return false;
}

/* ------------------------------------------------------------------ */
/* Small accessible dropdown                                           */
/* ------------------------------------------------------------------ */

function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // Close on outside click (subscribes to a DOM event; no state set on mount).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the keyboard-highlighted option visible inside the scrolling panel.
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${uid}-opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, uid]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="relative border-b border-ash pb-4 last:border-b-0 last:pb-0"
    >
      <p
        id={labelId}
        className="mb-1 text-[.6rem] font-bold uppercase tracking-widest text-ink-soft"
      >
        {label}
      </p>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) openList();
            else setActive((i) => Math.min(i + 1, options.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (open) setActive((i) => Math.max(i - 1, 0));
          } else if ((e.key === "Enter" || e.key === " ") && open) {
            e.preventDefault();
            choose(options[active].value);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded text-left text-[.95rem] transition-colors hover:text-forest  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${
          selected ? "font-semibold text-ink" : "font-medium text-ink-soft"
        } ${open ? "text-forest" : ""}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <LuChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-ink-soft transition-transform ${
            open ? "rotate-180 text-forest" : ""
          }`}
        />
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-40 overflow-y-auto overscroll-contain rounded-xl border border-ash bg-white p-1.5 shadow-[0_16px_36px_rgba(28,52,16,.16)]"
        >
          {options.map((o, i) => (
            <div
              key={o.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(o.value)}
              className={`cursor-pointer rounded-md px-3 py-2 text-[.8rem] leading-snug ${
                i === active ? "bg-forest-light text-forest" : "text-ink"
              } ${o.value === value ? "font-bold text-forest" : ""}`}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function CoverageAccess({
  onKeepMeUpdated,
}: {
  /** Called when the employer asks to be kept updated about an unsupported search. */
  onKeepMeUpdated?: (selection: { profession: Option; region: Option }) => void;
}) {
  const [profession, setProfession] = useState("");
  const [region, setRegion] = useState("");

  const professionOpt = COVERAGE_PROFESSIONS.find((p) => p.value === profession);
  const regionOpt = COVERAGE_REGIONS.find((r) => r.value === region);

  const status: "idle" | "supported" | "unsupported" =
    !professionOpt || !regionOpt
      ? "idle"
      : isCovered(profession, region)
        ? "supported"
        : "unsupported";

  const handleKeepMeUpdated = () => {
    if (!professionOpt || !regionOpt) return;
    if (onKeepMeUpdated) onKeepMeUpdated({ profession: professionOpt, region: regionOpt });
    else document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="coverage"
      className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-6 py-14 md:grid-cols-[1fr_.85fr] md:gap-12 md:py-16"
    >
      {/* Copy */}
      <div>
        <p className="mb-3.5 text-[.7rem] font-medium uppercase tracking-widest text-forest">
          Coverage &amp; Access
        </p>
        <h2 className="mb-3 font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink">
          Know whether <span className="font-semibold not-italic text-forest">Vetted</span>{" "}
          can support your search before you get started.
        </h2>
        <p className="mb-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Coverage reflects where Vetted currently supports Registry searches. Candidate
          availability varies by search criteria.
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {[
            "Coverage checked by profession and hiring region",
            "Search support is confirmed before you get started",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2.5 text-[.8rem] text-ink-soft">
              <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Checker */}
      <div className="rounded-2xl border border-ash bg-white p-6 shadow-[0_24px_60px_rgba(28,52,16,.08)]">
        <div className="flex flex-col gap-4">
          <SelectField
            label="Hiring for"
            placeholder="Select profession"
            options={COVERAGE_PROFESSIONS}
            value={profession}
            onChange={setProfession}
          />
          <SelectField
            label="Hiring location"
            placeholder="Select region"
            options={COVERAGE_REGIONS}
            value={region}
            onChange={setRegion}
          />
        </div>

        {/* Result */}
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex flex-col gap-1.5 border-t border-ash pt-4"
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className={
                status === "supported"
                  ? "h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,.5)]"
                  : "h-2 w-2 shrink-0 rounded-full border-[1.5px] border-ink-soft bg-white"
              }
            />
            <p
              className={
                status === "supported"
                  ? "text-sm font-bold text-forest"
                  : status === "unsupported"
                    ? "text-sm font-semibold text-ink-mid"
                    : "text-sm font-medium text-ink-soft"
              }
            >
              {status === "idle" && "Select a profession and region to check coverage"}
              {status === "supported" && "Vetted supports this search"}
              {status === "unsupported" && "Vetted doesn't currently support this search."}
            </p>
          </div>

          {status === "unsupported" && (
            <button
              type="button"
              onClick={handleKeepMeUpdated}
              className="w-fit cursor-pointer border-b border-forest/35 pb-px text-[.8rem] font-semibold text-forest transition-colors hover:border-current hover:text-forest-dark"
            >
              Keep me updated →
            </button>
          )}
        </div>

        {/* Supported areas for the chosen profession */}
        {professionOpt && (
          <div className="mt-4 border-t border-ash pt-4">
            <p className="mb-2 text-[.6rem] font-bold uppercase tracking-widest text-ink-soft">
              Where Vetted supports {professionOpt.label.replace(/\s*\(.*\)$/, "")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COVERAGE_REGIONS.map((r) => {
                const supported = isCovered(profession, r.value);
                const isSelected = r.value === region;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRegion(r.value)}
                    aria-pressed={isSelected}
                    title={supported ? "Supported" : "Not currently supported"}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[.7rem] font-semibold transition-colors ${
                      supported
                        ? "bg-forest-light text-forest hover:bg-forest hover:text-white"
                        : "border border-ash text-ink-soft opacity-60 hover:opacity-100"
                    } ${isSelected ? "ring-2 ring-forest/40 ring-offset-1" : ""}`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}