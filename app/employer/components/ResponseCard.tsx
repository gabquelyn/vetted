import React from "react";
import { LuClock, LuMapPin, LuArrowRight } from "react-icons/lu";
import { Candidate } from "@/app/data/registry";

export type ResponseMeta = {
  respondedAt: string; // ISO timestamp
  earliestStart: string; // e.g. "Tomorrow"
  distanceKm: number;
};

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
  now,
  isNew = false,
  onViewProfile,
}: {
  candidate: Candidate;
  response: ResponseMeta;
  /** current time in ms; passed in so every card ticks off one shared clock */
  now: number;
  isNew?: boolean;
  onViewProfile?: (c: Candidate) => void;
}) {
  const environment = candidate.env?.[0];

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

          <p className="mt-2 text-ink-mid">
            {[environment, coverageLabel(candidate.shift?.[0])]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <p className="mt-0.5 text-[.6rem] uppercase tracking-wider text-ink-soft">
          {candidate.loc}
        </p>
      </div>

      {/* response details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ash/70 pt-3">
        <Stat label="Responded">
          <span className="flex items-center gap-1.5">
            <LuClock className="h-3 w-3 shrink-0 text-ink-soft" />
            {timeAgo(response.respondedAt, now)}
          </span>
        </Stat>
        <Stat label="Earliest start">{response.earliestStart}</Stat>
        <Stat label="Shift">{candidate.shift?.join(", ") || "Flexible"}</Stat>
        <Stat label="Distance">
          <span className="flex items-center gap-1.5">
            <LuMapPin className="h-3 w-3 shrink-0 text-ink-soft" />
            {response.distanceKm} km away
          </span>
        </Stat>
      </div>

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
    </article>
  );
}
