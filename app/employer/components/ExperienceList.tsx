"use client"
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import Divider from "./Divider";
import Pill from "./Pill";
import { Candidate } from "@/app/data/registry";
import { AnimatePresence, motion } from "motion/react";

type Role = Candidate["exp"][number];

function RoleItem({ e }: { e: Role }) {
  return (
    <div className="relative min-w-0">
      <p className="wrap-break-word font-semibold text-ink">{e.role}</p>

      <p className="text-xs text-ink-soft">
        {e.env} · {e.expLoc} · {e.dates} · {e.dur}
      </p>

      <p className="text-xs text-ink-mid mt-2">{e.context}</p>

      {e.skills && (
        <div className=" flex flex-wrap gap-1 mt-2 mb-3">
          {e.skills.split(",").map((s) => (
            <Pill key={s} s={s} />
          ))}
        </div>
      )}
      <Divider />
    </div>
  );
}

export default function ExperienceList({ roles }: { roles: Candidate["exp"] }) {
  const [all, setAll] = useState(false);
  const INITIAL_ROLES = 4;
  const recent = roles.slice(0, INITIAL_ROLES);
  const earlier = roles.slice(INITIAL_ROLES);

  return (
    <>
      <div className="mt-3 flex flex-col gap-2">
        {recent.map((e, i) => (
          <RoleItem key={i} e={e} />
        ))}

        {/* Earlier roles drop down when `all` is true and fold back up when false */}
        <AnimatePresence initial={false}>
          {all && earlier.length > 0 && (
            <motion.div
              key="earlier-roles"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {earlier.map((e, i) => (
                <RoleItem key={i + INITIAL_ROLES} e={e} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {earlier.length > 0 && (
        <button
          type="button"
          aria-expanded={all}
          onClick={() => setAll((a) => !a)}
          className="mt-1 flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-forest hover:underline"
        >
          {all
            ? "Show fewer roles"
            : `Show ${earlier.length} earlier ${earlier.length === 1 ? "role" : "roles"}`}
          <motion.span
            className="block"
            animate={{ rotate: all ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <LuChevronDown />
          </motion.span>
        </button>
      )}
    </>
  );
}
