import React from "react";
import {
  CONFIRMATION,
  EMPLOYMENT,
  ENVIRONMENT,
  MOBILITY,
  PROFESSIONS,
  PROFILE,
  SHIFTS,
} from "@/app/data/professions";
import { AVAILABILITY } from "@/app/data/registry";
import { interpretedAs } from "@/app/utils/search";

type FilterKey =
  | "profession"
  | "environment"
  | "shift"
  | "employment"
  | "mobility"
  | "profile"
  | "availability"
  | "openTo"
  | "confirmed" | "skills"

const ORDER: FilterKey[] = [
  "profession",
  "environment",
  "shift",
  "employment",
  "mobility",
  "profile",
  "availability",
  "openTo",
  "confirmed", "skills"
];

const VALUE_LABELS: Partial<Record<FilterKey, Record<string, string>>> = {
  profession: Object.fromEntries(PROFESSIONS.map(([v, l]) => [v, l])),
  mobility: {
    ...Object.fromEntries(MOBILITY.map(([v, l]) => [v, l])),
    // chip wording from the reference HTML
    vehicle: "Own vehicle",
    licence: "Driver's licence",
    rural: "Open to rural roles",
    travel: "Open to travel / fly-in roles",
    relocation: "Open to relocation",
  },
  profile: Object.fromEntries(PROFILE.map(([v, l]) => [v, l])),
  environment: Object.fromEntries(ENVIRONMENT.map((e) => [e, e])),
  availability: Object.fromEntries(AVAILABILITY.map((e) => [e, e])),
  shift: Object.fromEntries(SHIFTS.map((e) => [e, e])),
  employment: Object.fromEntries(EMPLOYMENT.map((e) => [e, e])),
  confirmed: Object.fromEntries(CONFIRMATION.map((e) => [e, e])),
  openTo: Object.fromEntries(ENVIRONMENT.map((e) => [`Open to:${e}`, e])),
};

// Chips wrap and never exceed the row; long labels truncate instead of forcing overflow.
const CHIP =
  "inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full py-1.25 pl-2.75 pr-1.5 text-[11px] font-semibold";
// 15px visually; 20px on small screens so the remove target is easier to hit
const X =
  "flex size-3.75 shrink-0 cursor-pointer items-center justify-center rounded-full border-none p-0 text-[11px] leading-none text-[#16260c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest max-sm:size-5";

export default function ActiveFilters({
  filters,
  setFilters,
  onClear,
  onSave,
  terms,
  removeTerm,
  literalTerm,
  location,
  removeLoc,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  /** "Clear all" — shown when there is more than one chip */
  onClear: () => void;
  /** Optional. Shows the "Save search" button */
  onSave?: () => void;
  terms: string[];
  removeTerm: (term: string) => void;
  /** One action that returns a recognised term to exact keyword matching, without retyping */
  literalTerm?: (term: string) => void;
  location: { radius: number; location: string; resolved: boolean };
  removeLoc: () => void;
}) {
  const chips = ORDER.flatMap((key) =>
    ((filters[key] as string[] | undefined) ?? []).map((value) => ({
      key,
      value,
      label: VALUE_LABELS[key]?.[value] ?? value,
    })),
  );

  if (chips.length === 0 && terms.length === 0 && !location.location)
    return null;

  const removeChip = (key: FilterKey, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((v) => v !== value),
    }));

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {/* .fd-query-chips */}
      <div className="flex min-w-0 basis-full flex-wrap items-center gap-1.5 min-[640px]:basis-0 min-[640px]:flex-1">
        {location.resolved && (
          <span className={`${CHIP} bg-forest-light text-[#16260c]`}>
            <span className="min-w-0 truncate">
              {location.location}
              {location.resolved && ` · within ${location.radius}km`}
            </span>
            <button
              type="button"
              aria-label={`Remove location search`}
              onClick={() => removeLoc()}
              className={`${X} bg-forest/15 hover:bg-forest/25`}
            >
              ×
            </button>
          </span>
        )}
        {chips.map((chip) => (
          <span
            key={`${chip.key}:${chip.value}`}
            className={`${CHIP} bg-forest-light text-[#16260c]`}
          >
            <span className="min-w-0 truncate">
              {chip.key == "confirmed"
                ? `Confirmed ≤${chip.value}d`
                : chip.key == "openTo"
                  ? `Open to: ${chip.value}`
                  : chip.label}
            </span>
            <button
              type="button"
              aria-label={`Remove ${chip.label}`}
              onClick={() => removeChip(chip.key, chip.value)}
              className={`${X} bg-forest/15 hover:bg-forest/25`}
            >
              ×
            </button>
          </span>
        ))}

        {/* Committed search phrases (.fd-query-chip) */}
        {terms.length > 0 && (
          <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5">
            {terms.map((term) => (
              <span
                key={term}
                className={`${CHIP} bg-[#ececea] text-ink-soft`}
              >
                <span className="min-w-0 truncate">{term}</span>
                {interpretedAs(term) && (
                  <>
                    <span className="min-w-0 break-words font-normal text-ink-soft/80">
                      read as {interpretedAs(term)}
                    </span>
                    {literalTerm && (
                      <button
                        type="button"
                        aria-label={`Match “${term}” exactly as typed`}
                        onClick={() => literalTerm(term)}
                        className="shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-[11px] font-bold text-forest underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
                      >
                        Exact only
                      </button>
                    )}
                  </>
                )}
                <button
                  type="button"
                  aria-label={`Remove ${term}`}
                  onClick={() => removeTerm(term)}
                  className={`${X} bg-[rgba(45,80,22,.14)] hover:bg-[rgba(45,80,22,.26)]`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions: one row on small screens (Clear all left, Save search right) */}
      <div className="flex w-full items-center justify-between gap-3 min-[640px]:ml-auto min-[640px]:w-auto min-[640px]:justify-end">
      {/* Clear all */}
      {chips.length + terms.length + (location.resolved ? 1 : 0) > 1 && (
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer whitespace-nowrap rounded-[3px] border-none bg-transparent p-0 text-[11px] font-bold text-[#8a8a84] underline underline-offset-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Clear all
        </button>
      )}

      {/* Save search */}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className="ml-auto inline-flex shrink-0 whitespace-nowrap cursor-pointer items-center gap-1.25 rounded-full border border-ash bg-white py-1.5 pl-2.75 pr-3.25 text-[11px] font-bold text-forest transition-colors hover:border-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" />
          </svg>
          Save search
        </button>
      )}
      </div>
    </div>
  );
}