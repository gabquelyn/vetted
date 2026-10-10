"use client";
import React, { useState } from "react";
import { FULL_CANDIDATES } from "@/app/data/registry";
import Candidate from "./CanCard";
import Select from "@/app/components/CustomSelect";
import Filtering from "./Filtering";
import { applyFilters } from "@/app/utils/registry";

export default function Registry() {
  const [result, setResults] = useState("20");
  const [sort, setSort] = useState("new");
  const [data, setData] = useState(FULL_CANDIDATES);

  const onApply = (filters: Record<string, string[]>) => {
    console.log(filters);
    const data = applyFilters(FULL_CANDIDATES, filters);
    setData(data);
  };

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      {/* filter details */}
      <div className="flex items-center justify-between px-7 py-4 border-b-ash border-b">
        <Filtering onApply={onApply} />

        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            
            <p className="text-xs text-ink-soft">Results per page:</p>
            <Select
              options={[
                { value: "20", label: "20" },
                { value: "40", label: "40" },
                { value: "60", label: "60" },
              ]}
              onChange={(val) => setResults(val)}
              value={result}
            />
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-xs text-ink-soft">Sort:</p>
            <Select
              options={[
                { value: "new", label: "Newest Confirmed" },
                { value: "most", label: "Most Experienced" },
              ]}
              onChange={(val) => setSort(val)}
              value={sort}
            />
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
        {data.length == 0 && (
          <div className="flex items-center justify-center">
            No record found
          </div>
        )}
        <div className="grid grid-cols-4 gap-5">
          {data.slice(0, +result).map((candidate) => (
            <Candidate c={candidate} key={candidate.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
