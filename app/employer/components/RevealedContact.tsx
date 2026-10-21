"use client";

import React, { useEffect, useRef } from "react";
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
export default function RevealedContact({
  values,
  active = true,
}: {
  values: string[];
  /** Pass false while a modal covers the page. The highlight stays lit and
   *  the hold-then-fade only starts once this flips to true. */
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Bring the contact details into view as soon as the highlight is allowed
  // to play (on mount, or when the modal closes). Syncs with the DOM only;
  // no state is set here.
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    ref.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  }, [active]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      // isolate keeps the -z-10 highlight inside this block, behind the text
      className="relative isolate mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-mid"
    >
      <motion.span
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{
          duration: FADE_SECONDS,
          delay: active ? HOLD_SECONDS : 0,
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