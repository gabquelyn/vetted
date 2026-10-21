"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Candidate } from "@/app/data/registry";
import Divider from "./Divider";

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
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reveals.includes(c.id));
  return (
    <div className="text-ink text-xs">
      {/* header */}
      {revealed ? (
        <div className="space-y-3 p-6">
          <p className="mb-2 text-[.6rem] font-semibold uppercase text-ink-soft tracking-wider">
            Contact access
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Contact label="Email" value={c.reveal.email} />
            <Contact label="Phone" value={c.reveal.phone} />
          </div>

          {/* resume */}
          <p className="text-ink-soft font-semibold">Resume available</p>

          {c.professionalRegistration && (
            <div className="border-l-2 space-y-1 border-forest-dark p-3">
              <p className="mb-2 text-[.6rem] font-semibold uppercase text-ink-soft tracking-wider">
                professional registration
              </p>
              <p className="font-semibold text-sm">
                {c.professionalRegistration?.[0].regulator} (
                {c.professionalRegistration?.[0].regulatorShort})
              </p>
              <p className="text-ink-mid uppercase flex items-center gap-2">
                Registration number:{" "}
                <span className="font-bold">
                  {c.professionalRegistration?.[0].registrationNumber}
                </span>
              </p>
              <p>Registered · Candidate-reported · Number on file</p>
              <p className="italic text-ink-soft">
                Employer should verify current standing with CNO before hire.
              </p>
            </div>
          )}

          <Divider />
          <div className="flex items-center justify-between gap-3">
            <p className="text-ink-soft text-xs">
              Added to revealed professionals
            </p>
            <div className="flex items-center gap-2">
              <p className="h-2 w-2 bg-green-500 rounded-full"></p>
              <p>{c.activeAgo}</p>
            </div>
          </div>

          <Divider />

          <p className="text-ink-soft text-xs">
            ⓘ This is simulated demo identity/contact information for
            demonstration purposes only — not a real person.
          </p>
          <div className="flex gap-5 justify-between">
            <button className="p-2 w-[40%] border-forest border rounded-lg" onClick={onCancel}>
              Done
            </button>
            <button className="p-2 w-[40%] bg-forest text-white rounded-lg">
              Request Employer Early access
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-forest-light p-4 grid grid-cols-3 gap-2">
            <Detail
              label="In the Employer Workspace, Reveal provides:"
              val="Full name, email, phone"
            />
            <Detail label="Resume" val="Included" />
            <Detail
              label="After reveal"
              val="Stays organized in your workspace"
            />
          </div>
          <div className="p-5">
            <p>
              ⓘ This is a simulated demo reveal. No real contact information
              exists for this profile — completing it shows you the state
              transition an employer would see, nothing more.
            </p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-forest rounded-lg p-2 px-4 text-white"
                onClick={() => {
                  setRevealed(true);
                  onReveal(c.id);
                  deductReveal();
                }}
              >
                Complete reveal
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Detail({ label, val }: { label: string; val: string }) {
  return (
    <div className="space-y-3 font-semibold">
      <p className="text-forest">{label}</p>
      <p>{val}</p>
    </div>
  );
}

function Contact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-ink-soft">{label}</p>
      <p className="text-ink font-semibold">{value}</p>
    </div>
  );
}
