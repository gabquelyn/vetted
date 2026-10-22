import React from "react";
import { LuClock, LuRotateCcw, LuTrash2 } from "react-icons/lu";
import { MOBILITY, PROFESSIONS, PROFILE } from "@/app/data/professions";

const GROUP_LABELS: Record<string, string> = {
  profession: "Profession",
  environment: "Environment",
  shift: "Shifts",
  employment: "Employment",
  mobility: "Mobility",
  profile: "Profile",
};

const VALUE_LABELS: Record<string, Record<string, string>> = {
  profession: Object.fromEntries(PROFESSIONS.map(([v, l]) => [v, l])),
  mobility: Object.fromEntries(MOBILITY.map(([v, l]) => [v, l])),
  profile: Object.fromEntries(PROFILE.map(([v, l]) => [v, l])),
};

const formatTime = (ts: string) => { 
  const d = new Date(ts);
  return isNaN(d.getTime())
    ? ts
    : d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
};

export default function SearchItem({
  timestamp,
  id,
  search,
  onApply,
  onDelete,
}: {
  id: string;
  timestamp: string;
  search: Filters;
  onApply?: (search: Filters) => void;
  onDelete?: () => void;
}) {
  const groups = Object.entries(search).filter(([, v]) => v.length > 0);
  const total = groups.reduce((n, [, v]) => n + v.length, 0);
  console.log(timestamp);
  return (
    <div className="group rounded-xl border border-ash bg-white p-3 text-xs shadow-sm transition-shadow hover:shadow-md">
      {/* header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-ink-soft">
          <LuClock className="h-3.5 w-3.5" />
          <p>{formatTime(timestamp)}</p>
          <span className="rounded-full bg-forest-light px-2 py-0.5 text-[.65rem] font-semibold text-forest">
            {total} {total === 1 ? "filter" : "filters"}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          {onApply && (
            <button
              type="button"
              title="Run this search again"
              aria-label="Run this search again"
              onClick={() => onApply(search)}
              className="cursor-pointer rounded-md p-1.5 text-forest hover:bg-forest-light"
            >
              <LuRotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              title="Remove from history"
              aria-label="Remove from history"
              onClick={onDelete}
              className="cursor-pointer rounded-md p-1.5 text-ink-soft hover:bg-gray-100"
            >
              <LuTrash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* filter groups */}
      {groups.length === 0 ? (
        <p className="mt-2 text-ink-soft">No filters (all candidates)</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {groups.map(([key, values]) => (
            <div key={key} className="flex items-start gap-2">
              <p className="w-20 shrink-0 pt-1 font-semibold text-ink-soft">
                {GROUP_LABELS[key] ?? key}
              </p>
              <div className="flex flex-wrap gap-1">
                {values.map((v) => (
                  <span
                    key={v}
                    className="rounded-lg bg-forest-light px-2 py-1 text-ink-soft"
                  >
                    {VALUE_LABELS[key]?.[v] ?? v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
