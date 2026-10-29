import React from "react";
import { MOBILITY, PROFESSIONS, PROFILE } from "@/app/data/professions";

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
  variant = "saved",
  onApply,
  onDelete,
}: {
  id: string;
  timestamp: string;
  search: Search;
  /** "saved" shows a "Delete" link; "history" shows a small × (as in the HTML's Recent history) */
  variant?: "saved" | "history";
  onApply?: (search: Search) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-ash bg-white px-[15px] py-[13px]">
      {/* top: summary + remove */}
      <div className="flex items-start justify-between gap-2">
        <div className="text-[13.5px] font-bold text-ink">
          {getSearchSummary(search)}
        </div>

        {onDelete &&
          (variant === "history" ? (
            <button
              type="button"
              onClick={onDelete}
              aria-label="Remove from recent history"
              className="cursor-pointer border-none bg-transparent px-1 py-0.5 text-[15px] leading-none text-[#8a8a84] hover:text-ink"
            >
              ×
            </button>
          ) : (
            <button
              type="button"
              onClick={onDelete}
              className="cursor-pointer border-none bg-transparent p-0 text-[10.5px] text-[#8a8a84] hover:text-ink"
            >
              Delete
            </button>
          ))}
      </div>

      {/* timestamp (not in the HTML — delete this block to match it exactly) */}
      <div className="text-xs text-ink-soft">{formatTime(timestamp)}</div>

      {/* actions */}
      {onApply && (
        <div className="mt-1 flex gap-[7px]">
          <button
            type="button"
            onClick={() => onApply(search)}
            className="flex-1 cursor-pointer rounded-[7px] border border-ash bg-white p-[7px] text-[11px] font-bold text-ink-soft transition-colors hover:border-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Restore search
          </button>
        </div>
      )}
    </div>
  );
}

function getSearchSummary(search: Search): string {
  const groups: string[] = [];

  // Filter selections
  for (const [key, values] of Object.entries(search.filters)) {
    if (!Array.isArray(values) || values.length === 0) continue;

    const labels = values.map(
      (value: string) => VALUE_LABELS[key as string]?.[value] ?? value,
    );

    groups.push(labels.join("/"));
  }

  // Committed search terms
  if (search.terms.length > 0) {
    groups.push(search.terms.join("/"));
  }

  // Location and radius
  if (search.location) {
    groups.push(search.location);
    groups.push(`${search.radius} km`);
  }

  return groups.length ? groups.join(" · ") : "All candidates";
}
