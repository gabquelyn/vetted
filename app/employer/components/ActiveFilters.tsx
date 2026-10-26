import React from "react";
import {
  EMPLOYMENT,
  ENVIRONMENT,
  MOBILITY,
  PROFESSIONS,
  PROFILE,
  SHIFTS,
} from "@/app/data/professions";
import { AVAILABILITY } from "@/app/data/registry";

type FilterKey =
  | "profession"
  | "environment"
  | "shift"
  | "employment"
  | "mobility"
  | "profile"
  | "availability";

const ORDER: FilterKey[] = [
  "profession",
  "environment",
  "shift",
  "employment",
  "mobility",
  "profile",
  "availability",
];

const VALUE_LABELS: Partial<Record<FilterKey, Record<string, string>>> = {
  profession: Object.fromEntries(PROFESSIONS.map(([v, l]) => [v, l])),
  mobility: Object.fromEntries(MOBILITY.map(([v, l]) => [v, l])),
  profile: Object.fromEntries(PROFILE.map(([v, l]) => [v, l])),
  environment: Object.fromEntries(ENVIRONMENT.map((e) => [e, e])),
  availability: Object.fromEntries(AVAILABILITY.map((e) => [e, e])),
  shift: Object.fromEntries(SHIFTS.map((e) => [e, e])),
  employment: Object.fromEntries(EMPLOYMENT.map((e) => [e, e])),
};

export default function ActiveFilters({
  filters,
  setFilters,
  onClear,
  onSave,
  terms,
  removeTerm
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  /** "Clear all" — shown when there is more than one chip */
  onClear: () => void;
  /** Optional. Shows the "Save search" button */
  onSave?: () => void;
  terms: string[];
  removeTerm: (term: string) => void
}) {
  const chips = ORDER.flatMap((key) =>
    ((filters[key] as string[] | undefined) ?? []).map((value) => ({
      key,
      value,
      label: VALUE_LABELS[key]?.[value] ?? value,
    })),
  );

  if (chips.length === 0 && terms.length === 0) return null;

  const removeChip = (key: FilterKey, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((v) => v !== value),
    }));

  return (
    <div className="flex flex-wrap items-center gap-5">
      {/* .fd-query-chips */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        {chips.map((chip) => (
          <span
            key={`${chip.key}:${chip.value}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest-light py-1.25 pl-2.75 pr-1.5 text-[11px] font-semibold text-[#16260c]"
          >
            {chip.label}
            <button
              type="button"
              aria-label={`Remove ${chip.label}`}
              onClick={() => removeChip(chip.key, chip.value)}
              className="flex h-3.75 w-3.75 cursor-pointer items-center justify-center rounded-full border-none bg-forest/15 p-0 text-[11px] leading-none text-[#16260c] transition-colors hover:bg-forest/25 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
            >
              ×
            </button>
          </span>
        ))}

        {/* Committed search phrases (.fd-query-chip) */}
        {terms.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {terms.map((term) => (
              <span
                key={term}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#ececea] py-1.25 pl-2.75 pr-1.5 text-[11px] font-semibold text-ink-soft"
              >
                {term}
                <button
                  type="button"
                  aria-label={`Remove ${term}`}
                  onClick={() => removeTerm(term)}
                  className="flex h-3.75 w-3.75 cursor-pointer items-center justify-center rounded-full border-none bg-[rgba(45,80,22,.14)] p-0 text-[11px] leading-none text-[#16260c] transition-colors hover:bg-[rgba(45,80,22,.26)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Clear all */}
      {chips.length + terms.length > 1 && (
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
          className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-1.25 rounded-full border border-ash bg-white py-1.5 pl-2.75 pr-3.25 text-[11px] font-bold text-forest transition-colors hover:border-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
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
  );
}
