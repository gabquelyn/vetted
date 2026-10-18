import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";

const MAX_COMPARE = 3;
const EMPTY = "—";

/* ---------- row / section definitions ---------- */

interface Row {
  label: string;
  /** Plain string used to detect differences between candidates */
  value: (c: Candidate) => string;
  /** Optional richer rendering; falls back to the plain value */
  render?: (c: Candidate) => React.ReactNode;
}

interface Section {
  title: string;
  rows: Row[];
}

const list = (v?: string[]) => (v && v.length ? v.join(", ") : EMPTY);
const yesNo = (v?: boolean) => (v === undefined ? EMPTY : v ? "Yes" : "No");

/** ProfessionalRegistration shape isn't known here: join its string/number values */
const describeRecord = (r: unknown): string => {
  if (typeof r === "string") return r;
  if (r && typeof r === "object") {
    return Object.values(r as Record<string, unknown>)
      .filter(
        (x): x is string | number =>
          typeof x === "string" || typeof x === "number",
      )
      .join(" · ");
  }
  return "";
};

const Chips = ({ items }: { items?: string[] }) =>
  items && items.length ? (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-full bg-forest-pale px-2 py-0.5 text-xs font-medium text-forest"
        >
          {i}
        </span>
      ))}
    </div>
  ) : (
    <span className="text-ink-soft">{EMPTY}</span>
  );

const SECTIONS: Section[] = [
  {
    title: "Overview",
    rows: [
      { label: "Role", value: (c) => c.title },
      { label: "Location", value: (c) => c.loc },
      {
        label: "Experience",
        value: (c) => `${c.years} ${c.years === 1 ? "year" : "years"}`,
      },
      { label: "Availability", value: (c) => c.avail },
      { label: "Last active", value: (c) => c.activeAgo },
      { label: "Snapshot", value: (c) => c.snapshot },
    ],
  },
  {
    title: "Work preferences",
    rows: [
      { label: "Preferred employment", value: (c) => c.empType },
      {
        label: "Accepted employment types",
        value: (c) => list(c.acceptedEmpTypes),
        render: (c) => <Chips items={c.acceptedEmpTypes} />,
      },
      {
        label: "Shifts",
        value: (c) => list(c.shift),
        render: (c) => <Chips items={c.shift} />,
      },
      {
        label: "Current environment",
        value: (c) => list(c.env),
        render: (c) => <Chips items={c.env} />,
      },
      {
        label: "Open to working in",
        value: (c) => list(c.openToWorkingIn),
        render: (c) => <Chips items={c.openToWorkingIn} />,
      },
      {
        label: "Independent contractor",
        value: (c) =>
          c.ic
            ? ["Yes", c.icShiftType, c.icNotice].filter(Boolean).join(" · ")
            : c.ic === false
              ? "No"
              : EMPTY,
      },
    ],
  },
  {
    title: "Logistics",
    rows: [
      { label: "Confirmed days / week", value: (c) => String(c.confirmedDays) },
      { label: "Vehicle", value: (c) => yesNo(c.vehicle) },
      { label: "Driver's licence", value: (c) => yesNo(c.licence) },
      { label: "Rural / remote", value: (c) => c.rural || EMPTY },
      {
        label: "Relocation",
        value: (c) =>
          [
            c.relocation,
            c.relocationReach?.length
              ? `(${c.relocationReach.join(", ")})`
              : "",
          ]
            .filter(Boolean)
            .join(" ") || EMPTY,
      },
      { label: "Float pool", value: (c) => c.float || EMPTY },
    ],
  },
  {
    title: "Skills & credentials",
    rows: [
      {
        label: "Skills",
        value: (c) => list(c.skills),
        render: (c) => <Chips items={c.skills} />,
      },
      {
        label: "Specialties",
        value: (c) => list(c.specialties),
        render: (c) => <Chips items={c.specialties} />,
      },
      { label: "Credential", value: (c) => c.credential || EMPTY },
      {
        label: "Professional registration",
        value: (c) =>
          c.professionalRegistration?.length
            ? c.professionalRegistration
                .map(describeRecord)
                .filter(Boolean)
                .join("; ")
            : EMPTY,
        render: (c) =>
          c.professionalRegistration?.length ? (
            <ul className="list-disc space-y-0.5 pl-4">
              {c.professionalRegistration.map((r, i) => (
                <li key={i}>{describeRecord(r) || EMPTY}</li>
              ))}
            </ul>
          ) : (
            <span className="text-ink-soft">{EMPTY}</span>
          ),
      },
      { label: "Education", value: (c) => c.edu || EMPTY },
      {
        label: "Certifications",
        value: (c) => list(c.certs),
        render: (c) => <Chips items={c.certs} />,
      },
      {
        label: "EMR systems",
        value: (c) => list(c.emr),
        render: (c) => <Chips items={c.emr} />,
      },
      {
        label: "Languages",
        value: (c) => list(c.lang),
        render: (c) => <Chips items={c.lang} />,
      },
    ],
  },
];

/* ---------- component ---------- */

export interface CandidateCompareProps {
  ids: string[];
  onRemove?: (id: string) => void;
  onClose?: () => void;
  onViewProfile?: (id: string) => void;
}

export function CandidateCompare({
  ids,
  onRemove,
  onClose,
  onViewProfile,
}: CandidateCompareProps) {
  const byId = new Map(FULL_CANDIDATES.map((c) => [c.id, c]));

  const candidates = ids
    .map((id) => byId.get(id))
    .filter((c): c is Candidate => c !== undefined);

  const [highlightDiffs, setHighlightDiffs] = useState(false);
  const reduce = useReducedMotion();
  const shown = useMemo(() => candidates.slice(0, MAX_COMPARE), [candidates]);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
      };

  if (shown.length === 0) {
    return (
      <motion.div
        {...fade}
        className="rounded-xl border border-ash p-8 text-center text-sm text-ink-soft"
      >
        Select candidates to compare (up to {MAX_COMPARE}).
      </motion.div>
    );
  }

  const isDifferent = (row: Row) => {
    if (shown.length < 2) return false;
    const first = row.value(shown[0]);
    return shown.some((c) => row.value(c) !== first);
  };

  let rowIndex = 0;

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-ink"
    >
      {/* toolbar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          Compare candidates{" "}
          <span className="text-sm font-normal text-ink-soft">
            ({shown.length}/{MAX_COMPARE})
          </span>
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={highlightDiffs}
            onClick={() => setHighlightDiffs((v) => !v)}
            className="flex items-center gap-2 text-sm text-ink-mid"
          >
            <span
              className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-200 ${
                highlightDiffs
                  ? "bg-forest justify-end"
                  : "bg-ash justify-start"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="h-4 w-4 rounded-full bg-white shadow"
              />
            </span>
            Highlight differences
          </button>

          {onClose && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="rounded-md border border-ash bg-white px-3 py-1.5 text-sm text-ink-mid hover:border-forest-mid hover:text-forest"
            >
              Close
            </motion.button>
          )}
        </div>
      </div>

      {candidates.length > MAX_COMPARE && (
        <p className="mb-2 text-xs text-ink-soft">
          Only the first {MAX_COMPARE} candidates are shown.
        </p>
      )}

      {/* table */}
      <div className="overflow-x-auto rounded-xl border border-ash">
        <table className="w-full min-w-160 table-fixed border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-44 border-b border-ash bg-white p-3" />
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map((c) => (
                  <motion.th
                    key={c.id}
                    layout
                    {...fade}
                    className="border-b border-r border-ash bg-forest-pale/40 p-3 text-left align-top"
                  >
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-forest">
                          {c.title}
                        </div>
                        <div className="mt-0.5 text-xs font-normal text-ink-soft">
                          {c.loc} · {c.id}
                        </div>
                        {c.discoverable === false && (
                          <span className="mt-1.5 inline-block rounded-full bg-ash px-2 py-0.5 text-[11px] font-medium text-ink-mid">
                            Not in Registry discovery
                          </span>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1 text-xs">
                        {onViewProfile && (
                          <button
                            type="button"
                            onClick={() => onViewProfile(c.id)}
                            className="font-medium text-forest-mid text-xs underline hover:text-forest hover:underline cursor-pointer"
                          >
                            View
                          </button>
                        )}

                        {onRemove && (
                          <button
                            type="button"
                            aria-label={`Remove ${c.id} from comparison`}
                            onClick={() => onRemove(c.id)}
                            className="text-ink-soft text-xs cursor-pointer hover:text-inkcs hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.th>
                ))}
              </AnimatePresence>
            </tr>
          </thead>

          <tbody>
            {SECTIONS.map((section) => (
              <React.Fragment key={section.title}>
                <tr>
                  <td
                    colSpan={shown.length + 1}
                    className="border-b border-ash bg-ash/40 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-mid"
                  >
                    {section.title}
                  </td>
                </tr>

                {section.rows.map((row) => {
                  const diff = highlightDiffs && isDifferent(row);
                  const i = rowIndex++;
                  return (
                    <motion.tr
                      key={row.label}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: Math.min(i * 0.02, 0.4),
                        duration: 0.25,
                      }}
                    >
                      <th
                        scope="row"
                        className="sticky left-0 z-10 border-b border-ash bg-white p-3 text-left text-sm font-medium text-ink-mid"
                      >
                        <span className="flex items-center gap-2">
                          <AnimatePresence>
                            {diff && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-mid"
                              />
                            )}
                          </AnimatePresence>
                          {row.label}
                        </span>
                      </th>

                      {shown.map((c) => (
                        <td
                          key={c.id}
                          className={`wrap-break-word border-b border-ash p-3 align-top text-sm text-ink transition-colors duration-300 ${
                            diff ? "bg-forest-pale/60" : "bg-white"
                          }`}
                        >
                          {row.render ? row.render(c) : row.value(c)}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

export default CandidateCompare;
