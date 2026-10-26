import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import React from "react";

export default function Preview({
  c,
  onViewProfile,
  onRemove,
  removeLabel = "Remove",
  meta,
  reveals,
  introduced,
  onIntroduction,
  onReveal,
}: {
  c: string;
  onViewProfile: () => void;
  onRemove?: (id: string) => void;
  /** e.g. "Restore" for the Hidden list */
  removeLabel?: string;
  /** Override the meta line (the default matches the Saved list) */
  meta?: string;
  reveals: string[];
  introduced: string[];
  onIntroduction: (c: Candidate) => void;
  onReveal: (c: Candidate) => void;
}) {
  const candidate = FULL_CANDIDATES.find((can) => can.id == c);
  if (!candidate) return null;

  const intro = introduced.includes(candidate.id);
  const revealed = reveals.includes(candidate.id);
  const { name, email, phone } = candidate.reveal;

  const metaLine =
    meta ??
    `${candidate.snapshot || candidate.env?.[0] || ""} · ${candidate.years} yr${
      candidate.years === 1 ? "" : "s"
    } exp · ${candidate.avail} · Confirmed ${candidate.confirmedDays}d ago`;

  // .fdd-row-actions button (+ .primary)
  const actionBase =
    "flex-1 cursor-pointer rounded-[7px] p-[7px] text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
  const secondaryBtn = `${actionBase} border border-ash bg-white text-ink hover:border-forest`;
  const primaryBtn = `${actionBase} border-none bg-forest text-white hover:border-forest`;
  const requestedBtn = `${actionBase} cursor-default border-[1.5px] border-[#d9a878] bg-white text-[#b8621a] hover:bg-[#fdf3e8]`;

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-ash bg-white px-[15px] py-[13px]">
      {/* top: identity + remove */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] text-[#8a8a84]">
            {candidate.id}
            {revealed && (
              <span className="ml-1 font-bold text-forest">✓ Revealed</span>
            )}
          </div>
          <div className="text-[13.5px] font-bold text-ink">
            {revealed && name ? `${name} — ` : ""}
            {candidate.title} · {candidate.loc}
          </div>
        </div>

        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(candidate.id)}
            className="cursor-pointer border-none bg-transparent p-0 text-[10.5px] text-[#8a8a84] hover:text-ink"
          >
            {removeLabel}
          </button>
        )}
      </div>

      {/* meta */}
      <div className="text-xs text-ink-soft">{metaLine}</div>

      {/* revealed contact */}
      {revealed && (email || phone) && (
        <div className="mt-0.5 rounded-[7px] bg-forest-light px-[9px] py-1.5 text-xs font-semibold text-ink">
          {email}
          {email && phone ? " · " : ""}
          {phone}
        </div>
      )}

      {/* actions */}
      <div className="mt-1 flex gap-[7px]">
        <button type="button" onClick={onViewProfile} className={secondaryBtn}>
          View Profile
        </button>

        {candidate.specialist ? (
          <button
            type="button"
            disabled={intro}
            onClick={() => onIntroduction(candidate)}
            className={intro ? requestedBtn : primaryBtn}
          >
            {intro ? "Introduction requested ✓" : "Request introduction"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onReveal(candidate)}
            className={primaryBtn}
          >
            {revealed ? "Revealed ✓" : "Reveal"}
          </button>
        )}
      </div>
    </div>
  );
}