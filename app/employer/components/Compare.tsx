import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";

const MAX_COMPARE = 3;
const EMPTY = "—";

/* ---------- row / section definitions (mirror FD_COMPARE_SECTIONS) ---------- */

interface Row {
  label: string;
  /** Plain string — also used to detect differences between candidates */
  value: (c: Candidate) => string;
  /** Clamp long text to 3 lines */
  wrap?: boolean;
}

interface Section {
  title: string;
  rows: Row[];
  secondary?: boolean;
}

const list = (v?: string[]) => (v && v.length ? v.join(", ") : EMPTY);
const yesNo = (v?: boolean) => (v ? "Yes" : "No");

const SECTIONS: Section[] = [
  {
    title: "Role & Experience",
    rows: [
      { label: "Profession", value: (c) => c.title },
      {
        label: "Experience",
        value: (c) => `${c.years} ${c.years === 1 ? "year" : "years"}`,
      },
      {
        label: "Experience context",
        value: (c) => c.exp?.[0]?.context || EMPTY,
        wrap: true,
      },
      { label: "Work environments", value: (c) => list(c.env) },
      { label: "Skills & specialty", value: (c) => list(c.skills), wrap: true },
    ],
  },
  {
    title: "Availability & Schedule",
    rows: [
      { label: "Availability", value: (c) => c.avail },
      { label: "Shift preference", value: (c) => list(c.shift) },
      {
        label: "Employment type",
        value: (c) =>
          c.empType +
          ((c.acceptedEmpTypes?.length ?? 0) > 1
            ? ` (+${(c.acceptedEmpTypes?.length ?? 1) - 1} accepted)`
            : ""),
      },
      { label: "Independent Contractor", value: (c) => yesNo(c.ic) },
    ],
  },
  {
    title: "Relevant Qualifications",
    rows: [
      { label: "Credential", value: (c) => c.credential || EMPTY },
      { label: "Certifications", value: (c) => list(c.certs), wrap: true },
    ],
  },
  {
    title: "Practical Fit",
    rows: [
      { label: "Open to working in", value: (c) => list(c.openToWorkingIn) },
      { label: "Location", value: (c) => c.loc },
      { label: "Relocation", value: (c) => c.relocation || "Not specified" },
      { label: "Own vehicle", value: (c) => yesNo(c.vehicle) },
      { label: "Driver's licence", value: (c) => yesNo(c.licence) },
    ],
  },
  {
    title: "Trust & Logistics",
    secondary: true,
    rows: [
      {
        label: "Confirmation recency",
        value: (c) =>
          `${c.confirmedDays} day${c.confirmedDays === 1 ? "" : "s"} ago`,
      },
    ],
  },
];

/* ---------- component ---------- */

export interface CandidateCompareProps {
  ids: string[];
  onRemove?: (id: string) => void;
  onClose?: () => void;
  /** Shows "Clear comparison" next to Close */
  onClear?: () => void;
  onViewProfile?: (id: string) => void;
  /** Header actions — each button only renders if its handler is provided */
  onReveal?: (c: Candidate) => void;
  onIntroduction?: (c: Candidate) => void;
  reveals?: string[];
  introduced?: string[];
}

export function CandidateCompare({
  ids,
  onRemove,
  onClose,
  onClear,
  onViewProfile,
  onReveal,
  onIntroduction,
  reveals = [],
  introduced = [],
}: CandidateCompareProps) {
  const reduce = useReducedMotion();

  const byId = new Map(FULL_CANDIDATES.map((c) => [c.id, c]));
  const candidates = ids
    .map((id) => byId.get(id))
    .filter((c): c is Candidate => c !== undefined);
  const shown = candidates.slice(0, MAX_COMPARE);

  const cols = `150px repeat(${shown.length || 1}, minmax(0, 1fr))`;
  const anyRevealed = shown.some((c) => reveals.includes(c.id));

  const note =
    shown.length === 0
      ? "Compare Professionals"
      : shown.length === 1
        ? `You have selected ${shown[0].id} for comparison. Select Compare on another candidate to compare them side by side.`
        : `${
            anyRevealed ? "Structured" : "Pre-Reveal"
          } comparison. Meaningful differences are emphasized; identical information stays quiet. Vetted does not rank, score or recommend a candidate — you decide.`;

  return (
    <
    >
      {/* head */}
      <div className="mb-1.5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-semibold">
            Compare professionals
          </h3>
          <div className="mt-1 text-[12.5px] text-[#8a8a84]">
            {shown.length === 1 ? "1 selected" : `${shown.length} selected`}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3.5">
          {onClear && shown.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer text-[12.5px] font-semibold text-forest underline underline-offset-2 hover:text-[#16260c]"
            >
              Clear comparison
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-ash bg-white px-4 py-[9px] text-[12.5px] font-semibold text-[#8a8a84] transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Close ✕
            </button>
          )}
        </div>
      </div>

      {/* note */}
      <div className="mb-5 mt-3.5 border-b border-ash pb-4 text-xs text-ink-soft">
        {note}
        {candidates.length > MAX_COMPARE &&
          ` Only the first ${MAX_COMPARE} candidates are shown.`}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ash bg-white p-12 text-center text-[13.5px] leading-[1.8] text-[#8a8a84]">
          Select Compare on candidate cards (or from a profile) to review
          professionals side by side. Selected professionals will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border border-ash bg-white [scrollbar-color:#b7bcc3_transparent] [scrollbar-width:thin]">
          <div style={{ minWidth: 150 + shown.length * 210 }}>
            {/* header row */}
            <div
              className="grid bg-[#16260c]"
              style={{ gridTemplateColumns: cols }}
            >
              <div className="sticky left-0 z-[3] bg-[#16260c]" />

              {shown.map((c, i) => {
                const authorized = reveals.includes(c.personId || c.id);
                const pendingIntro =
                  !!c.specialist && introduced.includes(c.id) && !authorized;
                const identityLine =
                  authorized && c.reveal?.name
                    ? `${c.reveal.name} · ${c.title} · ${c.loc}`
                    : `${c.title} · ${c.loc}`;

                const rvlLabel = c.specialist
                  ? pendingIntro
                    ? "Introduction requested ✓"
                    : authorized
                      ? "Introduced ✓"
                      : "Request introduction"
                  : authorized
                    ? "Revealed ✓"
                    : "Reveal";

                const rvlClass = c.specialist
                  ? pendingIntro
                    ? "border-[1.5px] border-[#d9a878] bg-white px-2.5 py-[6.5px] text-[10px] text-[#b8621a] hover:bg-[#fdf3e8]"
                    : authorized
                      ? "bg-[#B9D8A0] text-[#16260c] hover:bg-[#a8cc8a]"
                      : "bg-[#e0b579] px-2.5 py-[7px] text-[10px] text-[#3a2610] hover:bg-[#a8cc8a]"
                  : "bg-[#B9D8A0] text-[#16260c] hover:bg-[#a8cc8a]";

                const showReveal = c.specialist
                  ? !!onIntroduction || authorized
                  : !!onReveal;

                return (
                  <div
                    key={c.id}
                    className={`min-w-0 p-4 text-white ${
                      i < shown.length - 1 ? "border-r border-white/12" : ""
                    } ${c.specialist ? "shadow-[inset_0_4px_0_#c17a3a]" : ""}`}
                    style={
                      c.specialist
                        ? {
                            background:
                              "linear-gradient(180deg, rgba(193,122,58,.14) 0%, rgba(193,122,58,.03) 60%, transparent 100%), #16260c",
                          }
                        : undefined
                    }
                  >
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(c.id)}
                        aria-label={`Remove ${c.id} from comparison`}
                        className="mb-2.5 inline-block cursor-pointer border-none bg-transparent p-0 text-[10.5px] font-semibold text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Remove ✕
                      </button>
                    )}
                    <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[10.5px] text-white/55">
                      {c.id}
                      {c.specialist && (
                        <span className="font-sans text-[9px] font-bold uppercase tracking-[.04em] text-[#e0b579]">
                          Specialist
                        </span>
                      )}
                    </div>
                    <div
                      className="mb-2 truncate text-sm font-bold"
                      title={identityLine}
                    >
                      {identityLine}
                    </div>
                    <div className="flex flex-wrap gap-[7px]">
                      {onViewProfile && (
                        <button
                          type="button"
                          onClick={() => onViewProfile(c.id)}
                          className="cursor-pointer rounded-lg border-none bg-white/14 px-3 py-2 text-[11px] font-bold text-white hover:bg-white/22 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          View Profile
                        </button>
                      )}
                      {showReveal && (
                        <button
                          type="button"
                          onClick={() =>
                            c.specialist && !authorized
                              ? onIntroduction?.(c)
                              : onReveal?.(c)
                          }
                          className={`cursor-pointer rounded-lg border-none px-3 py-2 text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${rvlClass}`}
                        >
                          {rvlLabel}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* sections */}
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <div
                  className={`bg-[#fbf8f2] px-[18px] pb-[7px] pt-3.5 text-[9.5px] font-bold uppercase tracking-[.06em] ${
                    section.secondary
                      ? "mt-1 border-t border-ash text-[#8a8a84]"
                      : "text-forest"
                  }`}
                >
                  {section.title}
                </div>

                {section.rows.map((row) => {
                  const values = shown.map(row.value);
                  const allSame = values.every((v) => v === values[0]);
                  return (
                    <div
                      key={row.label}
                      className={`grid border-b border-[#f2efe6] last:border-b-0 ${
                        section.secondary ? "opacity-[.72]" : ""
                      }`}
                      style={{ gridTemplateColumns: cols }}
                    >
                      <div
                        className={`sticky left-0 z-[2] flex items-center border-r border-ash bg-cream px-[18px] py-[13px] font-bold uppercase tracking-[.05em] ${
                          section.secondary ? "text-[9px]" : "text-[9.5px]"
                        } ${
                          allSame
                            ? "text-[#8a8a84]"
                            : "text-forest shadow-[inset_3px_0_0_#2D5016]"
                        }`}
                      >
                        {row.label}
                      </div>

                      {values.map((v, i) => (
                        <div
                          key={shown[i].id}
                          className={`flex min-w-0 items-center px-[18px] py-[13px] ${
                            row.wrap ? "!items-start" : ""
                          } ${
                            allSame
                              ? "text-xs font-normal text-[#8a8a84]"
                              : "text-[13px] font-bold text-[#16260c]"
                          }`}
                        >
                          {row.wrap ? (
                            <div className="line-clamp-3 leading-[1.45]">
                              {v}
                            </div>
                          ) : (
                            v
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateCompare;