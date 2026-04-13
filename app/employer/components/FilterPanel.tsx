"use client";
import { motion } from "motion/react";
import { GiCheckMark } from "react-icons/gi";
type FilterKeys = keyof UICompare["filters"];
export default function FilterPanel({
  ui,
  toggleFilter,
  resetFilters,
  updateFilter,
  setCompareOpen,
}: {
  ui: UICompare;
  toggleFilter: (key: FilterKeys) => void;
  resetFilters: () => void;
  updateFilter: (key: FilterKeys, value: string) => void;

  setCompareOpen: () => void;
}) {
  const baseRow =
    "flex items-center gap-2 text-[11px] cursor-pointer transition";

  const checkBox = (active: boolean, color = "bg-forest") =>
    `h-4 w-4 rounded border flex items-center justify-center ${
      active ? `${color} text-white border-transparent` : "border-white/20"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="md:sticky md:top-24 rounded-2xl bg-ink p-5 text-white shadow-xl border border-white/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <p className="text-[10px] tracking-widest uppercase text-white/40 font-semibold">
          Filters
        </p>
      </div>

      {/* Location */}
      <div className="mb-5">
        <p className="filter-label">Location</p>

        <input
          value={ui.filters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          placeholder="Toronto, Mississauga..."
          className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-[11px] placeholder:text-white/40 focus:outline-none focus:border-forest"
        />

        <p className="filter-label mt-3">Radius</p>

        <div className="flex flex-wrap gap-1">
          {["All", "25 km", "50 km", "100 km", "Province"].map((r, i) => (
            <button
              key={i}
              onClick={() =>
                updateFilter("radius", ["any", "25", "50", "100", "prov"][i])
              }
              className="text-[10px] px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Role */}
      <div className="mb-5">
        <p className="filter-label">Role</p>
        <div className="flex flex-col gap-2">
          {[
            ["all", "All roles"],
            ["RN", "Registered Nurse"],
            ["RPN", "Registered Practical Nurse"],
            ["NP", "Nurse Practitioner"],
            ["UCP", "Unregulated Care Provider"],
            ["PSW", "PSW / HCA"],
            ["MOA", "Medical Office Assistant"],
            ["DIT", "Diagnostic Imaging Tech"],
            ["DA", "Dietary Aide"],
          ].map(([val, label]) => (
            <motion.div
              whileTap={{ scale: 0.97 }}
              key={val}
              onClick={() => updateFilter("role", val)}
              className={`${baseRow} hover:text-white`}
            >
              <div className={checkBox(ui.filters.role === val)}>
                {ui.filters.role === val && <GiCheckMark />}
              </div>
              {label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-5 border-t border-white/10 pt-4">
        <p className="filter-label">Availability</p>
        <div className="flex flex-col gap-2">
          {[
            ["ic", "IC / Short-notice"],
            ["available", "Available now"],
            ["insured", "Insurance Verified"],
            ["activeNow", "Active right now"],
            ["vehicle", "Vehicle access"],
          ].map(([key, label]) => (
            <motion.div
              whileTap={{ scale: 0.97 }}
              key={key}
              onClick={() => toggleFilter(key as FilterKeys)}
              className={`${baseRow}`}
            >
              <div
                className={checkBox(
                  ui.filters[key as FilterKeys] ? true : false,
                )}
              >
                {ui.filters[key as FilterKeys] && <GiCheckMark />}
              </div>
              {label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-5 border-t border-white/10 pt-4">
        <p className="filter-label">Min. experience</p>

        <div className="flex flex-col gap-2">
          {[0, 3, 5].map((exp) => (
            <motion.div
              whileTap={{ scale: 0.97 }}
              key={exp}
              onClick={() => updateFilter("minExp", `${exp}`)}
              className={baseRow}
            >
              <div className={checkBox(ui.filters.minExp == exp)}>
                {ui.filters.minExp == exp && <GiCheckMark />}
              </div>
              {exp === 0 ? "Any" : `${exp}+ years`}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-white/10 pt-4 space-y-2">
        <button
          onClick={setCompareOpen}
          className="w-full rounded-md border border-white/20 py-2 text-[11px] hover:border-white/40 cursor-pointer hover:text-white transition"
        >
          Compare ({ui.compare.length})
        </button>

        <button
          onClick={resetFilters}
          // disabled = {ui.compare.length < 2}
          className="w-full text-[11px] text-white/40 hover:text-white/70 transition"
        >
          Reset filters
        </button>
      </div>
    </motion.div>
  );
}
