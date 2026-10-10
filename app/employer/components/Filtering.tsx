"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuFilter } from "react-icons/lu";
import Divider from "./Divider";
import MultiSelect from "./MultiSelect";
import {
  EMPLOYMENT,
  ENVIRONMENT,
  MOBILITY,
  PROFESSIONS,
  PROFILE,
  SHIFTS,
} from "@/app/data/professions";

type Filters = Record<string, string[]>;

export default function Filtering({
  onApply,
}: {
  onApply?: (filters: Filters) => void;
}) {
  const [open, setOpen] = useState(false);

  const [parties, setParties] = useState<string[]>([]);
  const [enviroment, setEnviroment] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [employment, setEmployment] = useState<string[]>([]);
  const [mobility, setMobility] = useState<string[]>([]);
  const [profile, setProfile] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((o) => !o)} // tap support for touch devices
        className="text-xs cursor-pointer flex items-center gap-2 border border-ash rounded-xl text-ink-soft p-2 px-3 relative"
      >
        {count > 0 && (
          <motion.p
            key={count}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="absolute right-0 text-white rounded-full bg-forest flex items-center justify-center -top-2 p-2 h-4 w-4 text-[.5rem]"
          >
            {count}
          </motion.p>
        )}
        <p>Filters</p>
        <LuFilter />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-full z-50 pt-2"
          >
            <div className="w-72 text-xs flex flex-col gap-2 rounded-xl border border-ash bg-white p-4 shadow-lg">
              <p className="uppercase text-forest font-semibold">
                Search and Filter
              </p>
              <Divider />

              <div>
                <p className="text-ink-soft font-bold mb-2">Primary Search</p>
                <MultiSelect
                  value={parties}
                  onChange={setParties}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={PROFESSIONS.map((p) => ({
                    label: p[1],
                    value: p[0],
                  }))}
                  allowSearch
                />
              </div>

              <div>
                <p className="text-ink-soft font-bold mb-2">
                  Experienced environment
                </p>
                <MultiSelect
                  value={enviroment}
                  onChange={setEnviroment}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={ENVIRONMENT.map((e) => ({
                    label: e,
                    value: e,
                  }))}
                  allowSearch
                />
              </div>

              <div>
                <p className="text-ink-soft font-bold mb-2">Shifts</p>
                <MultiSelect
                  value={shifts}
                  onChange={setShifts}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={SHIFTS.map((e) => ({
                    label: e,
                    value: e,
                  }))}
                />
              </div>

              <div>
                <p className="text-ink-soft font-bold mb-2">Employment</p>
                <MultiSelect
                  value={employment}
                  onChange={setEmployment}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={EMPLOYMENT.map((e) => ({
                    label: e,
                    value: e,
                  }))}
                />
              </div>

              <div>
                <p className="text-ink-soft font-bold mb-2">Mobility</p>
                <MultiSelect
                  value={mobility}
                  onChange={setMobility}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={MOBILITY.map((e) => ({
                    label: e[1],
                    value: e[0],
                  }))}
                />
              </div>

              <div>
                <p className="text-ink-soft font-bold mb-2">Profile</p>
                <MultiSelect
                  value={profile}
                  onChange={setProfile}
                  className="relative inline-block w-20 overflow-y-auto"
                  options={PROFILE.map((e) => ({
                    label: e[1],
                    value: e[0],
                  }))}
                />
              </div>

              {/* actions */}
              <div className="flex items-center justify-between">
                <button
                  className="cursor-pointer text-forest bg-forest-light p-2 rounded-md"
                  onClick={() => {
                    setCount(
                      parties.length +
                        enviroment.length +
                        shifts.length +
                        employment.length +
                        mobility.length +
                        profile.length,
                    );
                    onApply?.({
                      profession: parties,
                      environment: enviroment,
                      shift: shifts,
                      employment,
                      mobility,
                      profile,
                    });
                  }}
                >
                  Apply filters
                </button>
                <button className="cursor-pointer">Clear filters</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
