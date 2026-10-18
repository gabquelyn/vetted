'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface RequestIntroductionProps {
  /** e.g. "Occupational Therapist" */
  role: string
  /** e.g. "Hamilton, ON" */
  location: string
  /** Engagement fee amount without the currency symbol, e.g. "250". Shows a placeholder until set. */
  fee?: string
  onContinue: () => void
  onCancel: () => void
  /** True while payment is being initiated */
  loading?: boolean
  /** Label of the primary button */
  continueLabel?: string
}

const STEPS = [
  'Vetted will contact the Specialist about your opportunity.',
  "If they're interested, we'll let you know before any introduction is made.",
  'You can then approve the introduction. The success fee is only charged when you choose to proceed.',
]

export default function RequestIntroduction({
  role,
  location,
  fee,
  onContinue,
  onCancel,
  loading = false,
  continueLabel = 'Continue →',
}: RequestIntroductionProps) {
  const reduce = useReducedMotion()
  const feeLabel = fee ? `$${fee}` : '$[—]'

  return (
    <div className="text-ink">
      <p className="text-sm font-medium text-highlight">
        {role} <span className="text-ink-soft">·</span> {location}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink-mid">
        This is a recruiter-assisted introduction, not a self-serve Reveal. A{' '}
        <span className="font-semibold text-ink">{feeLabel}</span> non-refundable engagement fee is
        required upfront for Vetted to begin the request.
      </p>

      <div className="mt-4 rounded-lg border border-ash bg-highlight-pale/40 p-4">
        <h4 className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          What happens next
        </h4>

        <ol className="mt-3 space-y-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.25, ease: 'easeOut' }}
              className="flex items-start gap-3 text-sm text-ink-mid"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-highlight text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-ash pt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border border-ash bg-white px-4 py-2 text-sm text-ink-mid transition-colors hover:border-highlight-mid hover:text-highlight disabled:opacity-60"
        >
          Cancel
        </motion.button>

        <motion.button
          type="button"
          disabled={loading}
          whileHover={reduce || loading ? undefined : { scale: 1.02 }}
          whileTap={reduce || loading ? undefined : { scale: 0.97 }}
          onClick={onContinue}
          className="rounded-md bg-highlight px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-highlight-mid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Please wait…' : continueLabel}
        </motion.button>
      </div>
    </div>
  )
}