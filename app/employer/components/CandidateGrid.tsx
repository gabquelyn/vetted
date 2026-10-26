"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Candidate } from "@/app/data/registry";

// Same constants as the page's updateCanvasWidth()
const CARD = 316;
const GAP = 16;
const MAX_COLS = 4;

/**
 * Results grid that mirrors the page's `.fd-grid`:
 *  - fixed 316px cards with 16px gaps, left-aligned, cards keep their natural height
 *  - column count is a function of the width actually available to the results
 *    (so a pinned Filters panel automatically costs a column, no breakpoint logic)
 *  - capped at 4 columns on very wide screens
 *  - when every result fits in a single row, the row is centred instead of
 *    sitting flush-left in a wide, mostly empty canvas
 *  - cards fade up 8px over .4s on entry (the page's `cardIn` animation)
 */
export default function CandidateGrid({
  candidates,
  renderCard,
}: {
  candidates: Candidate[];
  renderCard: (candidate: Candidate) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState<number | null>(null);

  // Track the grid's available width. setState only happens in the observer callback.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = candidates.length;
  const cols =
    width === null
      ? null
      : Math.min(MAX_COLS, Math.max(1, Math.floor((width + GAP) / (CARD + GAP))));

  // Whole result set fits in one row of the current column capacity -> centre it
  const singleRow = cols !== null && total > 0 && total <= cols;

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1360px]">
      <div
        ref={ref}
        className="grid items-start gap-4"
        style={{
          // minmax(0, 316px) lets a card shrink below 316px on very narrow phones
          // instead of overflowing. auto-fill gives the right column count before
          // the width has been measured, so there is no first-paint flash.
          gridTemplateColumns: singleRow
            ? `repeat(${total}, minmax(0, ${CARD}px))`
            : `repeat(auto-fill, minmax(0, ${CARD}px))`,
          justifyContent: singleRow ? "center" : "start",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              layout
              // cardIn: opacity 0 + 8px down -> in place, .4s ease
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                // filtering / sorting / pinning Filters slides cards to their new spots
                layout: reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 40 },
              }}
            >
              {renderCard(candidate)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}