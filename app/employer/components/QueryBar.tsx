import React, { useState } from "react";
// import AddressAutocomplete from "@/app/components/AutoComplete";
import LocationSelect from "./LocationSelect";
import RadiusSelect from "./RadiusSelector";
import HelpButton from "./HelpButton";
import { restartTour } from "./TourController";
import { parseQuery, type ResolvedTerm } from "@/app/utils/search";
export default function QueryBar({
  query,
  setQuery,
  terms,
  onTermsChange,
  onHelp,
  radiusKm,
  setRadius,
  onBuild,
  location,
  setLocation,
  filters,
  setFilters,
  onResolveLoc,
  resolved,
  keywordOnly = false,
}: {
  /** The live draft: text typed but not yet committed. It still filters as you type. */
  query: string;
  setQuery: (value: string) => void;
  /** Committed search phrases, one per chip. Each is matched as ONE phrase. */
  terms: string[];
  onTermsChange: (terms: string[]) => void;
  /** Opens the help / tour popover */
  onHelp?: () => void;
  /** When provided, the "Within N km" control is shown */
  radiusKm: number;
  /** Disabled until a supported city is chosen (as in the HTML) */
  radiusDisabled?: boolean;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  onBuild?: () => void;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onResolveLoc:(lo: string | null) => void;
  resolved: string | null
  /** Revealed workspace: every entry is a plain keyword (no filter promotion, no PT prompt) */
  keywordOnly?: boolean;
}) {
  // Segment: stacked with a bottom rule on small screens, inline from 900px
  const seg =
    "relative flex min-w-0 items-center gap-[9px] border-b border-ash px-3 py-2.5 min-[900px]:border-b-0 min-[900px]:py-3";
  const divider =
    "hidden h-5 w-px shrink-0 self-center bg-ash min-[900px]:block";

  // Ambiguous wording ("PT"): nothing is applied until the user picks a meaning.
  const [pending, setPending] = useState<NonNullable<ResolvedTerm["clarify"]> | null>(null);

  /** Applies resolved terms: filter terms update filters, everything else is a search chip. */
  const apply = (items: ResolvedTerm[]) => {
    const nextTerms = [...terms];
    const nextFilters: Filters = { ...filters };
    let filtersChanged = false;

    items.forEach(({ label, filter, value }) => {
      if (filter && value) {
        const current = nextFilters[filter] ?? [];
        if (!current.some((v) => v.toLowerCase() === value.toLowerCase())) {
          nextFilters[filter] = [...current, value] as never;
          filtersChanged = true;
        }
        return;
      }
      if (!label) return;
      if (!nextTerms.some((t) => t.toLowerCase() === label.toLowerCase())) {
        nextTerms.push(label);
      }
    });

    if (nextTerms.length !== terms.length) onTermsChange(nextTerms);
    if (filtersChanged) setFilters(nextFilters);
  };

  /**
   * "mental health np":
   *   - "np" is a profession -> added to filters.profession, no search chip
   *   - "mental health" is not a filter -> added to the search terms
   * "PT" shows the "PT could mean…" prompt and applies nothing yet.
   */
  const commit = (phrases: string[]) => {
    const items: ResolvedTerm[] = keywordOnly
      ? phrases.map((p) => ({ label: p.trim() })).filter((t) => t.label)
      : phrases.flatMap(parseQuery);
    const ask = items.find((t) => t.clarify);
    if (ask?.clarify) setPending(ask.clarify);
    apply(items.filter((t) => !t.clarify));
  };

  const choose = (option: ResolvedTerm) => {
    setPending(null);
    apply([option]);
  };

  // A comma ends a phrase. Everything before the last comma is committed
  // ("acute, palliative" pasted in becomes two chips); the rest stays as the draft.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.includes(",")) return setQuery(value);
    const parts = value.split(",");
    const draft = parts.pop() ?? "";
    commit(parts);
    setQuery(draft.trimStart());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && pending) return setPending(null);
    if (e.key !== "Enter") return;
    e.preventDefault();
    commit([query]);
    setQuery("");
  };


  return (
    <div className="mb-2.5 max-w-[1360px] shrink-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
        {/* .fd-sc-bar */}
        <div className="flex min-w-0 flex-[1_1_640px] flex-col items-stretch transition-[border-color] duration-150 min-[900px]:flex-row min-[900px]:border-b-[1.5px] min-[900px]:border-b-ash min-[900px]:focus-within:border-b-forest">
          {/* Keyword + Help */}
          <div
            data-tour="search"
            className={`${seg} w-full pl-1 min-[900px]:w-auto min-[900px]:flex-[1.6_1_260px]`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="shrink-0 text-[#8a8a84] opacity-85"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by profession, clinical experience, skill…"
              className="w-full min-w-0 border-none bg-transparent font-[inherit] text-sm font-medium text-ink outline-none placeholder:font-normal placeholder:text-[#8a8a84]"
            />

            <HelpButton restartTours={restartTour} />

            {pending && (
              <div
                role="group"
                aria-label={pending.prompt}
                className="absolute left-0 top-full z-30 mt-1 flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs shadow-xl"
              >
                <span className="font-semibold text-ink">{pending.prompt}</span>
                {pending.options.map((o) => (
                  <button
                    key={o.label + (o.value ?? "")}
                    type="button"
                    onClick={() => choose(o)}
                    className="cursor-pointer rounded-full border-none bg-forest-light px-3 py-1 font-bold text-[#16260c] hover:bg-[#dcead0] focus-visible:outline-2 focus-visible:outline-forest"
                  >
                    {o.filter ? o.label : `Keyword "${o.label}"`}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => setPending(null)}
                  className="cursor-pointer border-none bg-transparent text-ink-soft hover:text-ink"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className={divider} />

          {/* Location */}
          <div
            className={`${seg} w-full min-[900px]:w-auto min-[900px]:flex-[0_1_170px]`}
          >
            <div className="min-w-0 text-xs flex-1">
              <LocationSelect
                value={location}
                onChange={setLocation}
                onResolvedChange={onResolveLoc}
                resolved = {!!resolved}
                setRadius={setRadius}
              />
            </div>
          </div>
          <div
            className={`${seg} w-full min-w-0 min-[900px]:w-auto min-[900px]:flex-[0_0_145px]`}
          >
            <RadiusSelect
              value={radiusKm}
              onChange={setRadius}
              className="w-full min-w-0"
              disabled={!resolved || !location}
            />
          </div>
        </div>

        {/* Build from job description */}
        <button
          type="button"
          onClick={onBuild}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-none bg-forest-light px-4 py-[9px] text-[11.5px] font-bold text-[#16260c] transition-colors hover:bg-[#dcead0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest min-[900px]:w-auto"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          >
            <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          </svg>
          Build from job description
        </button>
      </div>
    </div>
  );
}