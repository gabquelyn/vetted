"use client";

import React, { useState } from "react";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";

interface CandidatePreviewProps {
  candidate: Candidate;
  /** Called when the user clicks "Complete Demo Reveal" */
  onReveal: (id: string) => void;
  /** "Done" action, e.g. close the modal */
  onCancel?: () => void;
  /** Optional handler for "Request Employer Early Access" */
  onRequestAccess?: () => void;
  /** Optional. Called when a sibling's "View" button is clicked. Should close
   *  the modal and open that profile. */
  onOpenSibling?: (sibling: Candidate) => void;
  revealing?: boolean;
  revealLabel?: string;
  reveals: string[];
  revealsRemaining: number;
  deductReveal: () => void;
}

/* .vr-field — forest-light cell in the 3-up grid */
function Detail({ label, val }: { label: string; val: string }) {
  return (
    <div className="bg-forest-light px-5 py-[18px]">
      <div className="mb-[5px] text-[9.5px] font-bold uppercase tracking-[.05em] text-forest">
        {label}
      </div>
      <div className="text-[13.5px] font-semibold text-ink">{val}</div>
    </div>
  );
}

/* .vr-tier-label */
const TierLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-2 block text-[9.5px] font-bold uppercase tracking-[.05em] text-[#8a8a84]">
    {children}
  </span>
);

/* .vr-contact-item */
function Contact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-0.5 text-[10.5px] font-semibold text-[#8a8a84]">
        {label}
      </div>
      <div className="text-sm font-bold text-ink">{value}</div>
    </div>
  );
}

export default function CandidatePreview({
  candidate: c,
  onReveal,
  onCancel,
  onRequestAccess,
  onOpenSibling,
  reveals,
  deductReveal,
}: CandidatePreviewProps) {
  const [revealed, setRevealed] = useState(reveals.includes(c.id));
  const reg = c.professionalRegistration?.[0];

  // Other discoverable profiles of the same person (personId is optional, so
  // fall back to the candidate's own id; a candidate with none only matches itself)
  const personKey = c.personId ?? c.id;
  const otherProfiles = Object.values(
    FULL_CANDIDATES as Record<string, Candidate> | Candidate[],
  ).filter(
    (x) =>
      (x.personId ?? x.id) === personKey &&
      x.id !== c.id &&
      x.discoverable !== false,
  );

  return (
    <div className="text-ink">
      {revealed ? (
        <>
          {/* Tier 2 — Contact access */}
          <div className="px-8 pb-4 pt-3.5">
            <TierLabel>Contact access</TierLabel>
            <div className="mb-2.5 grid grid-cols-1 gap-3.5 min-[480px]:grid-cols-2">
              <Contact label="Email" value={c.reveal.email} />
              <Contact label="Phone" value={c.reveal.phone} />
            </div>
            <span className="inline-block text-[13px] font-semibold text-[#8a8a84]">
              Resume available
            </span>
          </div>

          {/* Tier 3 — Professional registration */}
          {reg && (
            <div className="mx-8 border-l-[3px] border-forest py-3.5 pl-4">
              <TierLabel>Professional registration</TierLabel>
              <div className="text-[15px] font-bold text-ink">
                {reg.regulator}
                {reg.regulatorShort &&
                  reg.regulatorShort !== reg.regulator &&
                  ` (${reg.regulatorShort})`}
              </div>
              {reg.registrationNumber && (
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[.03em] text-[#8a8a84]">
                    Registration number
                  </span>
                  <span className="font-mono text-[13.5px] font-bold tracking-[.01em] text-ink">
                    {reg.registrationNumber}
                  </span>
                </div>
              )}
              <div className="mt-1.5 text-[12.5px] text-ink-soft">
                Registered · Candidate-reported ·{" "}
                {reg.registrationNumber
                  ? "Number on file"
                  : "Number not supplied"}
              </div>
              <div className="mt-1.5 text-[11px] italic text-[#8a8a84]">
                Employer should verify current standing with{" "}
                {reg.regulatorShort || reg.regulator} before hire.
              </div>
            </div>
          )}

          {/* Tier 4 — Workspace / activity */}
          <div className="flex flex-wrap gap-3.5 border-t border-ash px-8 py-2.5">
            <span className="text-[11px] text-[#8a8a84]">
              Added to Revealed Professionals
            </span>
            <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold text-ink-soft">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#22c55e]" />
              {c.activeAgo || "Active today"}
            </span>
          </div>

          {/* Tier 5 — Also available on Vetted as */}
          {otherProfiles.length > 0 && (
            <div className="border-t border-ash px-8 py-3">
              <TierLabel>Also available on Vetted as</TierLabel>
              {otherProfiles.map((op) => (
                <div
                  key={op.id}
                  className="flex flex-wrap items-center gap-2 py-0.5"
                >
                  <span className="text-[12.5px] font-bold text-ink">
                    {op.title}
                  </span>
                  <span className="flex-1 text-[11px] text-[#8a8a84]">
                    {op.empType} · {op.avail}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenSibling?.(op)}
                    className="cursor-pointer whitespace-nowrap rounded-[7px] border border-forest bg-transparent px-[9px] py-1 text-[10.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    View {op.code} →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Demo disclaimer */}
          <div className="flex items-start gap-2 border-t border-ash px-8 py-3.5 text-xs leading-[1.6] text-ink-soft">
            ⓘ This is simulated demo identity/contact information for
            demonstration purposes only — not a real person.
          </div>

          <div className="flex gap-2.5 px-8 pb-[26px] pt-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 cursor-pointer rounded-[7px] border-[1.5px] border-forest bg-white px-1.5 py-1.5 text-center text-[11px] font-bold text-forest transition-colors hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16260c]"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onRequestAccess}
              className="flex-[1.4] cursor-pointer rounded-[7px] border-none bg-forest px-1.5 py-1.5 text-center text-[11px] font-bold text-white transition-colors hover:bg-[#3d6b1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16260c]"
            >
              Request Employer Early Access →
            </button>
          </div>
        </>
      ) : (
        <>
          {/* .vr-grid */}
          <div className="grid grid-cols-1 gap-0.5 bg-ash min-[480px]:grid-cols-2 min-[720px]:grid-cols-3">
            <Detail
              label="In the Employer Workspace, Reveal provides"
              val="Full name, email, phone"
            />
            <Detail label="Resume" val="Included" />
            <Detail
              label="After Reveal"
              val="Stays organized in your workspace"
            />
          </div>

          {/* .vr-note */}
          <div className="flex items-start gap-2 border-t border-ash px-8 py-3.5 text-xs leading-[1.6] text-ink-soft">
            ⓘ This is a simulated demo Reveal. No real contact information
            exists for this profile — completing it shows you the state
            transition an employer would see, nothing more.
          </div>

          <div className="px-8 pb-[26px]">
            <button
              type="button"
              onClick={() => {
                setRevealed(true);
                onReveal(c.id);
                deductReveal();
              }}
              className="w-full max-w-[300px] cursor-pointer rounded-[7px] border-none bg-forest px-1.5 py-1.5 text-center text-[11px] font-bold text-white transition-colors hover:bg-[#3d6b1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16260c]"
            >
              Complete Demo Reveal →
            </button>
          </div>
        </>
      )}
    </div>
  );
}