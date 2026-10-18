"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Candidate } from "@/app/data/registry";

interface CandidatePreviewProps {
  candidate: Candidate;
  /** Called when the user clicks "Continue to reveal candidate" */
  onReveal: (id: string) => void;
  /** Optional secondary action, e.g. close a modal */
  onCancel?: () => void;
  /** Disables the button and shows a pending label */
  revealing?: boolean;
  revealLabel?: string;
  reveals: string[];
  revealsRemaining: number;
  deductReveal: () => void;
}

const Section = ({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
    >
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {title}
      </h4>
      {children}
    </motion.section>
  );
};

const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="rounded-lg border border-ash bg-white p-3">
    <div className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">
      {label}
    </div>
    <div className="mt-0.5 text-sm font-semibold text-ink">{value}</div>
  </div>
);

export default function CandidatePreview({
  candidate: c,
  onReveal,
  onCancel,
  revealing = false,
  revealLabel = "Continue to reveal candidate",
  reveals,
  revealsRemaining,
  deductReveal,
}: CandidatePreviewProps) {
  console.log(reveals.includes(c.id));
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reveals.includes(c.id));
  return (
    <div className="text-ink">
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded bg-forest-pale px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-forest">
              {c.code}
            </span>
            <span className="text-xs text-ink-soft">{c.id}</span>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold text-forest">
            {c.title}
          </h3>
          <p className="mt-0.5 text-sm text-ink-mid">
            {c.loc} · {c.snapshot}
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-ash px-2.5 py-1 text-xs text-ink-mid">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-mid" />
          {c.activeAgo}
        </span>
      </div>

      <div className="mt-5 space-y-5">
        {/* key facts */}
        <Section title="At a glance" index={0}>
          <div className="grid grid-cols-2 gap-2">
            <Fact
              label="Experience"
              value={`${c.years} ${c.years === 1 ? "year" : "years"}`}
            />
            <Fact label="Availability" value={c.avail} />
          </div>
        </Section>

        {/* summary */}
        {c.summary && (
          <Section title="Summary" index={1}>
            <p className="text-sm leading-relaxed text-ink-mid">{c.summary}</p>
          </Section>
        )}

        {revealed && (
          <Section title="Personal details" index={2}>
            <div className="space-y-2">
              <Fact label="Name" value={c.reveal.name} />
              <Fact label="Email" value={c.reveal.email} />
              <Fact label="Phone number" value={c.reveal.phone} />
            </div>
          </Section>
        )}
      </div>

      {/* actions */}
      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-ash pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center w-full justify-between gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="rounded-md border border-ash bg-white px-4 py-2 text-sm text-ink-mid transition-colors hover:border-forest-mid hover:text-forest"
          >
            Cancel
          </motion.button>

          <motion.button
            type="button"
            disabled={revealed}
            whileHover={reduce || revealing ? undefined : { scale: 1.02 }}
            whileTap={reduce || revealing ? undefined : { scale: 0.97 }}
            onClick={() => {
              if (revealsRemaining > 0) {
                setRevealed(true);
                onReveal(c.id);
                deductReveal();
              }
            }}
            className="rounded-md bg-forest px-4 py-2 text-sm  text-white transition-colors hover:bg-forest-mid disabled:cursor-not-allowed disabled:opacity-60"
          >
            {revealLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
