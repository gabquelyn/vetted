"use client";

import React from "react";
import { motion } from "motion/react";

const HOLD_SECONDS = 2.8; // how long the highlight stays at full strength
const FADE_SECONDS = 1.2; // how long it takes to fade out afterwards

/**
 * The revealed contact details (name · email · phone).
 *
 * It only mounts once the candidate is in `reveals`, so mounting is the
 * "just revealed" moment: the row slides in, a green highlight sits behind
 * it for a few seconds, then fades away.
 */
export default function RevealedContact({ values }: { values: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      // isolate keeps the -z-10 highlight inside this block, behind the text
      className="relative isolate mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-mid"
    >
      <motion.span
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: FADE_SECONDS,
          delay: HOLD_SECONDS,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 -z-10 rounded-lg bg-forest-light ring-1 ring-forest/30"
      />

      {values.map((value, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="hidden h-4 w-px bg-ash sm:block" />
          )}
          <p className="break-all">{value}</p>
        </React.Fragment>
      ))}
    </motion.div>
  );
}