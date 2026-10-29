import { Candidate } from "@/app/data/registry";
import { useState } from "react";
import Highlight from "./Highlight";

type EduRecord = NonNullable<Candidate["eduRecords"]>[number];

const RecordItem = ({ r, terms }: { r: EduRecord; terms: string[] }) => (
  <li className="border-l-[3px] border-ash pl-2.5">
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[13px] font-semibold leading-[1.4] text-ink">
        <Highlight
          text={[r.degree, r.fieldOfStudy].filter(Boolean).join(", ")}
          terms={terms}
        />
      </span>
      {r.primary && (
        <span className="rounded-md bg-forest-light px-[7px] py-[2px] text-[9px] font-bold uppercase tracking-[.03em] text-forest">
          Primary
        </span>
      )}
      {r.status && (
        <span className="rounded-md bg-[#f7ead9] px-[7px] py-[2px] text-[9px] font-bold uppercase tracking-[.03em] text-[#b8722c]">
          {r.status}
        </span>
      )}
    </div>
    <div className="mt-[2px] text-[11.5px] text-ink-soft">
      <Highlight text={r.institution} terms={terms} />
      {r.country && ` · ${r.country}`}
      {r.year && ` · ${r.year}`}
    </div>
  </li>
);

const EducationRecords = ({
  records,
  terms,
}: {
  records: Candidate["eduRecords"];
  terms: string[];
}) => {
  const [open, setOpen] = useState(false);

  if (!records || records.length === 0) return null;

  // Primary record first, otherwise keep the original order
  const sorted = [...records].sort(
    (a, b) => Number(!!b.primary) - Number(!!a.primary),
  );
  const [first, ...rest] = sorted;

  return (
    <div>
      <ul className="flex flex-col gap-2.5">
        <RecordItem r={first} terms={terms} />
        {open &&
          rest.map((r, i) => (
            <RecordItem
              key={`${r.institution}-${r.degree}-${r.year}-${i}`}
              r={r}
              terms={terms}
            />
          ))}
      </ul>

      {rest.length > 0 && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-2 cursor-pointer rounded-[3px] text-[11.5px] font-bold text-forest hover:text-[#1e3a0f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          {open ? "Show less" : `Show ${rest.length} more`}
        </button>
      )}
    </div>
  );
};

export default EducationRecords;