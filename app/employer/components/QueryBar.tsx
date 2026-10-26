import React from "react";
import AddressAutocomplete from "@/app/components/AutoComplete";
import HelpButton from "./HelpButton";
import { restartTour } from "./TourController";

export default function QueryBar({
  query,
  setQuery,
  terms,
  onTermsChange,
  onHelp,
  radiusKm,
  radiusDisabled = false,
  onRadiusClick,
  onBuild,
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
  radiusKm?: number;
  /** Disabled until a supported city is chosen (as in the HTML) */
  radiusDisabled?: boolean;
  onRadiusClick?: () => void;
  onBuild?: () => void;
}) {
  // Segment: stacked with a bottom rule on small screens, inline from 900px
  const seg =
    "relative flex min-w-0 items-center gap-[9px] border-b border-ash px-3 py-2.5 min-[900px]:border-b-0 min-[900px]:py-3";
  const divider =
    "hidden h-5 w-px shrink-0 self-center bg-ash min-[900px]:block";

  /** Add phrases as chips, skipping empties and case-insensitive duplicates. */
  const commit = (phrases: string[]) => {
    const next = [...terms];
    phrases.forEach((raw) => {
      const phrase = raw.trim();
      if (!phrase) return;
      if (next.some((t) => t.toLowerCase() === phrase.toLowerCase())) return;
      next.push(phrase);
    });
    if (next.length !== terms.length) onTermsChange(next);
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
          </div>

          <div className={divider} />

          {/* Location */}
          <div
            className={`${seg} w-full min-[900px]:w-auto min-[900px]:flex-[0_1_170px]`}
          >
            <div className="min-w-0 text-xs flex-1">
              <AddressAutocomplete />
            </div>
          </div>

          {/* Distance */}
          {radiusKm !== undefined && (
            <>
              <div className={divider} />
              <div
                className={`${seg} w-full min-[900px]:w-auto min-[900px]:flex-none`}
              >
                <button
                  type="button"
                  disabled={radiusDisabled}
                  onClick={onRadiusClick}
                  aria-haspopup="true"
                  title={
                    radiusDisabled
                      ? "Select a supported city to enable distance search"
                      : undefined
                  }
                  className="flex w-full items-center gap-[7px] py-1.5 text-left text-[12.5px] font-medium text-ink enabled:cursor-pointer disabled:cursor-not-allowed disabled:text-[#8a8a84]"
                >
                  <span>Within {radiusKm} km</span>
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="ml-auto shrink-0 text-[#8a8a84]"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
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