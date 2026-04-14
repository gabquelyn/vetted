"use client";
import {
  CLUSTER_NEAR,
  DBWithCluster,
  getCityCluster,
} from "@/app/data/candidate";
import React, { useEffect, useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import CandidateCard from "./CandidateCard";
import CompareModal from "./CompareModal";

export default function EmployerPage() {
  const [ui, setUI] = useState<UICompare>({
    filters: {
      role: "all",
      ic: false,
      available: false,
      vehicle: false,
      days: false,
      evenings: false,
      nights: false,
      minExp: 0,
      insured: false,
      activeNow: false,
      city: "",
      radius: "any",
    },
    sortBy: "verified",
    unlocked: {},
    compare: [],
    compareOpen: false,
    cityInput: "",
  });

  const compareSelected = () => {
    setUI((prev) => ({ ...prev, compareOpen: true }));
  };
  const updateFilter = (key: string, value: string) => {
    setUI((s) => ({
      ...s,
      filters: { ...s.filters, [key]: value },
    }));
  };

  const toggleFilter = (key: string) => {
    setUI((s) => ({
      ...s,
      filters: {
        ...s.filters,
        [key]: !s.filters[key as keyof typeof s.filters],
      },
    }));
  };

  const resetFilters = () => {
    setUI((s) => ({
      ...s,
      filters: {
        role: "all",
        ic: false,
        available: false,
        vehicle: false,
        days: false,
        evenings: false,
        nights: false,
        minExp: 0,
        insured: false,
        activeNow: false,
        city: "",
        radius: "any",
      },
    }));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setUI((s) => ({
        ...s,
        filters: { ...s.filters, city: s.cityInput },
      }));
    }, 400);

    return () => clearTimeout(t);
  }, [ui.cityInput]);

  const filteredCandidates = useMemo(() => {
    const results = DBWithCluster.filter((c) => {
      const f = ui.filters;

      if (f.role !== "all" && c.role !== f.role) return false;
      if (f.ic && !c.ic) return false;
      if (f.available && !c.available) return false;
      if (f.vehicle && !c.vehicle) return false;
      if (f.days && !c.shifts.includes("days")) return false;
      if (f.evenings && !c.shifts.includes("evenings")) return false;
      if (f.nights && !c.shifts.includes("nights")) return false;
      if (c.exp < f.minExp) return false;
      if (f.insured && !c.insured) return false;
      if (f.activeNow && !c.activeNow) return false;
      // City/radius filtering
      if (f.city && f.radius !== "any") {
        const searchCluster = getCityCluster(f.city);
        if (searchCluster !== null && c._cluster) {
          const nearClusters = CLUSTER_NEAR[searchCluster]?.[f.radius];
          if (nearClusters && !nearClusters.includes(c._cluster)) return false;
        }
      }
      return true;
    });

    return results.sort((a, b) => {
      if (ui.sortBy === "verified") return a.verified - b.verified;
      if (ui.sortBy === "active") return a.active - b.active;
      if (ui.sortBy === "exp_desc") return b.exp - a.exp;
      if (ui.sortBy === "exp_asc") return a.exp - b.exp;
      return 0;
    });
  }, [ui.filters, ui.sortBy]);

  const activeFilterCount = Object.values(ui.filters).filter(
    (v) => v && v !== "all",
  ).length;
  // Unlock a candidate
  const handleUnlock = (id: string) => {
    setUI((prev) => ({
      ...prev,
      unlocked: { ...prev.unlocked, [id]: "revealed" },
    }));
  };

  // Toggle compare list
  const toggleCompare = (id: string) => {
    if (ui.compare.length === 3) return;
    setUI((prev) => {
      const isInCompare = prev.compare.includes(id);
      let newCompare = isInCompare
        ? prev.compare.filter((c) => c !== id)
        : [...prev.compare, id];

      // Optional: limit compare to 3 candidates
      if (newCompare.length > 3) newCompare = newCompare.slice(0, 3);

      return { ...prev, compare: newCompare };
    });
  };

  return (
    <section className="p-24 hidden md:block">
      <div className="text-center flex flex-col items-center mb-10">
        <h2 className="mb-5 text-2xl font-serif md:text-5xl leading-tighter text-ink">
          Want to explore before <br/>you <span className="text-forest">sign up?</span>
        </h2>
        <p className="text-sm md:w-md">
          Filter the registry by role, location, and availability. This is an
          interactive preview — the real platform has the same experience with
          live verified profiles.
        </p>
      </div>
      <div className="w-full max-w-[75%] mx-auto">
        <div className="grid grid-cols-[240px_1fr] gap-6 w-full">
          {/* ── FILTER PANEL ── */}
          <div>
            <FilterPanel
              ui={ui}
              toggleFilter={toggleFilter}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              setCompareOpen={compareSelected}
            />
          </div>

          {/* ── RESULTS ── */}
          <div className="">
            {/* Active filters */}
            {activeFilterCount > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                {Object.entries(ui.filters).map(([k, v]) => {
                  if (!v || v === "all") return null;
                  return (
                    <span
                      key={k}
                      onClick={() => toggleFilter(k)}
                      className="text-xs rounded-2xl p-1 px-2 border border-forest bg-forest-light/20 text-forest cursor-pointer"
                    >
                      {k} ✕
                    </span>
                  );
                })}
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-baseline min-w-full mb-4">
              <div className="text-xs">
                {filteredCandidates.length} professionals
              </div>

              <select
                value={ui.sortBy}
                className="text-xs border border-ash/50 rounded-lg bg-white p-2 outline-none"
                onChange={(e) =>
                  setUI((s) => ({ ...s, sortBy: e.target.value }))
                }
              >
                <option value="verified">Recently verified</option>
                <option value="active">Recently active</option>
                <option value="exp_desc">Most experience</option>
                <option value="exp_asc">Least experience</option>
              </select>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-3">
              {filteredCandidates.map((c) => (
                <CandidateCard
                  key={c.id}
                  c={c}
                  ui={ui}
                  toggleCompare={toggleCompare}
                  onUnlock={handleUnlock}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredCandidates.length === 0 && (
              <div className="text-center text-xs">
                <div>No matches found</div>
                <button
                  onClick={resetFilters}
                  className="cursor-pointer border border-ash rounded-xl p-1 px-2 mt-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Compare Modal */}
        {ui.compareOpen && ui.compare.length > 1 && (
          <CompareModal ui={ui} setUI={setUI} />
        )}
      </div>
    </section>
  );
}
