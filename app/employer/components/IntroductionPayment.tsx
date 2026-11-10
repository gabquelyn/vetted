"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Step 3 of the specialist introduction flow: the simulated payment.
 * Shown after the role form (step 2) and BEFORE the request is recorded.
 * No payment is taken; the disclosure below is required wording.
 */
export const SIMULATED_PAYMENT_DISCLOSURE =
  "This is a simulated demo — no real payment will be processed.";

export function IntroductionPayment({
  role,
  location,
  fee,
  submitting = false,
  onBack,
  onPay,
}: {
  role: string;
  location: string;
  /** Engagement fee, e.g. "250". The HTML shows "$[—]" when no figure is set. */
  fee?: string;
  submitting?: boolean;
  onBack: () => void;
  /** Called when the employer "pays": this is where the request is recorded. */
  onPay: () => void;
}) {
  const reduce = useReducedMotion();
  const amount = fee ? `$${fee}` : "$[—]";

  return (
    <div className="p-6 py-8 text-xs text-ink-mid">
      <p className="text-sm font-semibold text-ink">Engagement fee</p>
      <p className="mb-3 text-xs text-ink-soft">
        {role} · {location}
      </p>

      <p className="leading-relaxed">
        Recruiter-assisted. A <b className="text-ink">{amount} engagement fee</b>{" "}
        starts the screening. A success fee applies only if you choose to proceed
        to an introduction. {SIMULATED_PAYMENT_DISCLOSURE}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-ash pt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          disabled={submitting}
          className="rounded-md flex-1 border border-ash bg-white px-4 py-2 text-xs text-ink-mid transition-colors hover:border-highlight hover:text-highlight-dark disabled:opacity-60"
        >
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={onPay}
          disabled={submitting}
          whileHover={reduce || submitting ? undefined : { scale: 1.02 }}
          whileTap={reduce || submitting ? undefined : { scale: 0.97 }}
          className="flex-1 rounded-md bg-highlight p-2 text-xs font-semibold text-white transition-colors hover:bg-highlight-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Processing…" : `Pay ${amount} engagement fee`}
        </motion.button>
      </div>
    </div>
  );
}

/** Final step, after the request has been recorded. */
export function IntroductionSent({
  role,
  location,
  onDone,
}: {
  role: string;
  location: string;
  onDone: () => void;
}) {
  return (
    <div className="p-6 py-8 text-xs text-ink-mid">
      <p className="text-sm font-semibold text-ink">Request sent</p>
      <p className="mb-3 text-xs text-ink-soft">
        {role} · {location}
      </p>
      <p className="leading-relaxed">
        Your request is with our team. We&apos;ll follow up with next steps.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-6 cursor-pointer rounded-md bg-forest-dark px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-highlight-dark"
      >
        Done
      </button>
    </div>
  );
}