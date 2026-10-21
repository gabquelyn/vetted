import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import React from "react";

export default function Requests({
  c,
  onViewProfile,
}: {
  c: string;
  onViewProfile: () => void;
}) {
  const candidate = FULL_CANDIDATES.find((can) => can.id == c);
  if (candidate)
    return (
      <div className="bg-white p-3 px-5 space-y-1 text-xs text-ink-soft rounded-lg border border-ash">
        <p>{candidate.id}</p>
        <p className="font-semibold text-ink text-sm">{candidate.title}</p>
        <p>{candidate.summary}</p>

        <div className="flex mt-2 flex-col md:flex-row items-center justify-between gap-2">
          <button
            className="px-3 w-full p-2 rounded-lg border border-ash "
            onClick={onViewProfile}
          >
            View profile
          </button>
          <button className="border border-highlight text-highlight px-3 w-full p-2 rounded-lg">
            Requested
          </button>
        </div>
      </div>
    );
}
