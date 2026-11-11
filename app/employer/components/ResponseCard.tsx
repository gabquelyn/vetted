import React from "react";
import { LuClock, LuMapPin, LuArrowRight } from "react-icons/lu";
import { Candidate } from "@/app/data/registry";

export type ResponseMeta = {
  respondedAt: string; // ISO timestamp
  /** The responder's confirmed earliest start for THIS request (not their profile availability). */
  earliestStart: string;
  distanceKm: number;
  /** "local" = within the request radius; "relocation" = candidate is open to relocating there */
  locationMatch?: "local" | "relocation";
};

const MATCH_LABELS = {
  relocation: "Open to relocation",
} as const;

/** "just now" · "12 min ago" · "3 hr ago" */
export function timeAgo(iso: string, now: number) {
  const seconds = Math.max(
    0,
    Math.round((now - new Date(iso).getTime()) / 1000),
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} hr ago`;
}

// "Nights" -> "Overnight Coverage", "Days" -> "Day Coverage", ...
function coverageLabel(shift?: string) {
  if (!shift) return "Flexible Coverage";
  if (/night/i.test(shift)) return "Overnight Coverage";
  if (/even/i.test(shift)) return "Evening Coverage";
  if (/day/i.test(shift)) return "Day Coverage";
  if (/multiple/i.test(shift)) return "Multiple Shifts";
  return `${shift} Coverage`;
}

function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[.6rem] uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-ink-mid">{children}</p>
    </div>
  );
}

export default function ResponseCard({
  candidate,
  response,
  requestedShifts = [],
  now,
  isNew = false,
  onViewProfile,
  onIntroduction,
  introduced,
  revealed = [],
  onReveal,
}: {
  candidate: Candidate;
  response: ResponseMeta;
  /** shifts asked for in the request; the coverage label comes from these, not the profile */
  requestedShifts?: string[];
  /** current time in ms; passed in so every card ticks off one shared clock */
  now: number;
  isNew?: boolean;
  onViewProfile?: (c: Candidate) => void;
  onIntroduction?: (c: Candidate) => void;
  introduced: string[];
  /** ids already revealed (and paid for) anywhere in the app */
  revealed?: string[];
  onReveal?: (c: Candidate) => void;
}) {
  const environment = candidate.env?.[0];
  const intro = introduced.includes(candidate.id);
  // Registry stores reveals by person (personId), so a linked designation
  // (e.g. RN-042 / MOA-233) is revealed as soon as the person is.
  const isRevealed = revealed.includes(candidate.personId || candidate.id);
  // Coverage comes from the request; the setting (environment) comes from the profile
  const coverage = requestedShifts.length
    ? requestedShifts.map((s) => coverageLabel(s)).join(" / ")
    : coverageLabel();
  return (
    <article className="group flex h-full flex-col gap-3 rounded-2xl border border-ash bg-white p-4 text-xs shadow-sm">
      {/* status */}
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-forest">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
          {candidate.activeAgo}
        </p>

        {isNew && (
          <span className="rounded-full bg-highlight/15 px-2 py-0.5 text-[.55rem] font-semibold uppercase tracking-wide text-highlight">
            New
          </span>
        )}
      </div>

      {/* identity */}
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-forest">
            {candidate.title}
          </p>
          <p className="mt-0.5 text-[.6rem] uppercase tracking-wider text-ink-soft">
            {candidate.id}
          </p>
          {isRevealed && (
            <p className="mt-1.5 text-sm font-semibold text-ink">
              {candidate.reveal.name}
            </p>
          )}

          <p className="mt-2 text-ink-mid">
            {[environment, coverage].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="mt-0.5 flex flex-col items-end gap-1">
          <p className="text-[.6rem] uppercase tracking-wider text-ink-soft">
            {candidate.loc}
          </p>
          {response.locationMatch === "relocation" && (
            <span className="rounded-full bg-forest-light px-2 py-0.5 text-[.6rem] font-semibold text-forest">
              {MATCH_LABELS.relocation}
            </span>
          )}
        </div>
      </div>

      {/* response details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ash/70 pt-3">
        <Stat label="Responded">
          <span className="flex items-center gap-1.5">
            <LuClock className="h-3 w-3 shrink-0 text-ink-soft" />
            {timeAgo(response.respondedAt, now)}
          </span>
        </Stat>
        {response.earliestStart && (
          <Stat label="Earliest start (this request)">
            {response.earliestStart}
          </Stat>
        )}
        <Stat label="Shift">{candidate.shift?.join(", ") || "Flexible"}</Stat>
        <Stat label="Distance">
          <span className="flex items-center gap-1.5">
            <LuMapPin className="h-3 w-3 shrink-0 text-ink-soft" />
            {response.distanceKm} km away
          </span>
        </Stat>
      </div>

      {/* Already revealed: show the state only. The reveal action (and its charge) is never offered again. */}
      {isRevealed ? (
        <p
          className="rounded-[7px] border border-forest/30 bg-forest-light py-1.5 text-center text-[11px] font-bold text-forest"
          onClick={() => onReveal?.(candidate)}
        >
          Revealed ✓
        </p>
      ) : (
        !candidate.specialist && (
          <button
            type="button"
            onClick={() => onReveal?.(candidate)}
            className="cursor-pointer rounded-[7px] bg-forest py-1.5 text-center text-[11px] font-bold text-white transition-colors hover:bg-forest-dark"
          >
            Reveal →
          </button>
        )
      )}

      <div className="flex flex-col md:flex-row items-center justify-between">
        {onViewProfile && (
          <button
            type="button"
            onClick={() => onViewProfile(candidate)}
            className="mt-auto flex cursor-pointer opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 items-center justify-end gap-1 pt-1 text-xs font-semibold text-forest hover:underline"
          >
            View profile
            <LuArrowRight className="h-3 w-3" />
          </button>
        )}
        {candidate.specialist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIntroduction?.(candidate);
            }}
            className={`w-full md:w-[50%] rounded-[7px] p-1.5 text-center text-[11px] font-bold transition-colors ${
              intro
                ? "cursor-default border-[1.5px] border-[#d9a878] bg-white text-[#b8621a]"
                : "cursor-pointer border-none bg-[#b8621a] text-white hover:bg-[#96500f]"
            }`}
          >
            {intro ? "Introduction requested ✓" : "Request introduction"}
          </button>
        )}
      </div>
    </article>
  );
}
