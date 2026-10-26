"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function HelpButton({
  restartTours,
  tourDone = false,
  hint = "Separate search terms with comma — e.g. acute, palliative",
}: {
  restartTours: () => void;
  /** true once the tour was finished or skipped: label becomes "Take tour again" */
  tourDone?: boolean;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popId = useId();

  // Close on outside click or Escape, like the HTML
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden md:inline-flex shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={popId}
        aria-label="Registry help and tour"
        title="Registry help and tour"
        className="flex cursor-pointer items-center gap-[5px] rounded-[14px] border border-[#ece7da] bg-[#f6f3ea] py-[5px] pl-[7px] pr-2.5 text-[#a8a49a] opacity-[.85] transition-[opacity,color,background-color] duration-150 hover:bg-[#eee9db] hover:text-[#8a8578] hover:opacity-100 focus:bg-[#eee9db] focus:text-[#8a8578] focus:opacity-100 focus:outline-none"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9.5" />
          <path
            d="M9.3 9.2a2.7 2.7 0 0 1 5.2.9c0 1.8-2.5 2.1-2.5 3.5"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="17.1"
            r="0.15"
            fill="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span
          className="text-[11px] font-bold tracking-[.01em] text-[#6b6659]"
          aria-hidden="true"
        >
          Help
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={popId}
            role="region"
            aria-label="Registry help"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-[-8px] top-[calc(100%+9px)] z-40 w-[216px] rounded-[9px] border border-[#ece7da] bg-[#fffdf8] px-3 py-[11px] text-[11.5px] font-medium leading-[1.45] text-[#3d3d39] shadow-[0_8px_20px_rgba(28,28,20,.09)]"
          >
            <div className="mb-[9px]">{hint}</div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                restartTours();
              }}
              className="block w-full cursor-pointer rounded-[7px] border border-[#ece7da] bg-[#f6f3ea] px-[9px] py-[7px] text-left text-[11.5px] font-bold text-forest transition-colors hover:bg-[#eee9db] focus:bg-[#eee9db] focus:outline-none"
            >
              {tourDone ? "Take tour again" : "Take Registry tour"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}