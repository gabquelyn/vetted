"use client";

import React, { useState } from "react";
import { LuZap } from "react-icons/lu";
import Modal from "./Modal";

/** How many urgent requests one simulated top-up adds. */
export const TOP_UP_AMOUNT = 2;

/**
 * Compact, clearly simulated "add more urgent requests" step.
 * No price and no payment fields: nothing is charged or collected.
 * Closing before confirming (Cancel, ✕, Escape, backdrop) adds nothing.
 */
export default function UrgentTopUp({
  allowance,
  used,
  onComplete,
  onClose,
}: {
  /** Current total (updates after onComplete) */
  allowance: number;
  used: number;
  /** Called once, on confirm: the parent adds TOP_UP_AMOUNT to the allowance */
  onComplete: () => void;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  return (
    <Modal
      onClose={onClose}
      className="max-w-md"
      title={
        <div className="flex items-center gap-3 p-3 text-white">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
            <LuZap className="h-4 w-4" />
          </span>
          <p className="font-serif text-xl font-semibold">
            {done ? `${TOP_UP_AMOUNT} requests added` : "Add more urgent requests"}
          </p>
        </div>
      }
    >
      <div className="p-6 text-xs leading-relaxed text-ink-mid">
        {done ? (
          <>
            <p>
              You now have <b className="text-ink">{allowance}</b> urgent requests
              ({used} used, {Math.max(0, allowance - used)} available).
            </p>
            <div className="mt-6 flex justify-end border-t border-ash pt-4">
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="cursor-pointer rounded-md bg-forest-dark px-4 py-2 text-xs font-semibold text-white hover:bg-highlight-dark"
              >
                Back to Urgent requests
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              You&apos;ve used all {allowance} of your urgent requests. You can add{" "}
              {TOP_UP_AMOUNT} more to keep going.
            </p>
            <p className="mt-3 rounded-md bg-cream px-3 py-2 font-semibold text-ink">
              Simulated demo: nothing is charged and no payment details are
              collected.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-ash pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md border border-ash bg-white px-4 py-2 text-xs text-ink-mid hover:border-highlight hover:text-highlight-dark"
              >
                Cancel
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  onComplete();
                  setDone(true);
                }}
                className="cursor-pointer rounded-md bg-forest-dark px-4 py-2 text-xs font-semibold text-white hover:bg-highlight-dark"
              >
                Add {TOP_UP_AMOUNT} requests
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}