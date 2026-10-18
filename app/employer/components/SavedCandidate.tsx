'use client'

import { FULL_CANDIDATES } from '@/app/data/registry'
import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface SavedCandidateProps {
  id: string
  onView?: (id: string) => void
  onRemove?: (id: string) => void
}

const MAX_SKILLS = 3

export default function SavedCandidate({ id, onView, onRemove }: SavedCandidateProps) {
  const reduce = useReducedMotion()
  const candidate = FULL_CANDIDATES.find((c) => c.id === id)

  if (!candidate) {
    return (
      <div className="rounded-lg border border-dashed border-ash p-3 text-sm text-ink-soft">
        This candidate is no longer available.
      </div>
    )
  }

  const extraSkills = Math.max(candidate.skills.length - MAX_SKILLS, 0)

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group rounded-lg border border-ash bg-white p-3 transition-colors hover:border-forest-mid"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded bg-forest-pale px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-forest">
              {candidate.code}
            </span>
            <span className="truncate text-xs text-ink-soft">{candidate.id}</span>
          </div>
          <h3 className="mt-1.5 truncate text-sm font-semibold text-ink">{candidate.title}</h3>
          <p className="mt-0.5 truncate text-xs text-ink-mid">
            {candidate.loc} · {candidate.years} {candidate.years === 1 ? 'yr' : 'yrs'} exp
          </p>
        </div>

        {onRemove && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            aria-label={`Remove ${candidate.id} from saved`}
            onClick={() => onRemove(candidate.id)}
            className="shrink-0 rounded-md p-1 text-ink-soft opacity-0 transition hover:bg-ash/60 hover:text-ink focus:opacity-100 group-hover:opacity-100"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* snapshot */}
      <p className="mt-2 text-xs text-ink-mid">{candidate.snapshot}</p>

      {/* quick facts */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-forest px-2 py-0.5 text-[11px] font-medium text-white">
          {candidate.empType}
        </span>
        {candidate.shift.map((s) => (
          <span key={s} className="rounded-full border border-ash px-2 py-0.5 text-[11px] text-ink-mid">
            {s}
          </span>
        ))}
        <span className="rounded-full border border-ash px-2 py-0.5 text-[11px] text-ink-mid">
          {candidate.avail}
        </span>
      </div>

      {/* skills */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, MAX_SKILLS).map((s) => (
          <span key={s} className="rounded-full bg-forest-pale px-2 py-0.5 text-[11px] font-medium text-forest">
            {s}
          </span>
        ))}
        {extraSkills > 0 && (
          <span className="rounded-full bg-ash/60 px-2 py-0.5 text-[11px] text-ink-mid">
            +{extraSkills}
          </span>
        )}
      </div>

      {/* footer */}
      <div className="mt-3 flex items-center justify-between border-t border-ash pt-2.5">
        <div className="flex items-center gap-2 text-[11px] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-mid" />
          {candidate.activeAgo}
          {candidate.vehicle && <span>· Vehicle</span>}
          {candidate.licence && <span>· Licence</span>}
        </div>

        {onView && (
          <button
            type="button"
            onClick={() => onView(candidate.id)}
            className="text-xs font-medium text-forest-mid hover:text-forest hover:underline"
          >
            View
          </button>
        )}
      </div>
    </motion.article>
  )
}