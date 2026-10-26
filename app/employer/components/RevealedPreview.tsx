import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import React from "react";

export default function RevealedPreview({
  c,
  reveals,
  onViewProfile,
  onViewSibling,
}: {
  /** id of the primary (revealed) profile to show */
  c: string;
  reveals: string[];
  /** "View profile" / "View RN profile" — opens the primary profile */
  onViewProfile: () => void;
  /** Optional. Called when an "Also revealed as" link is clicked. Defaults to nothing. */
  onViewSibling?: (sibling: Candidate) => void;
}) {
  const primary = FULL_CANDIDATES.find((can) => can.id == c);
  if (!primary) return null;

  // All revealed, discoverable profiles of this person (personId is optional,
  // so fall back to the candidate's own id)
  const personKey = primary.personId ?? primary.id;
  const profiles = FULL_CANDIDATES.filter(
    (x) =>
      (x.personId ?? x.id) === personKey &&
      reveals.includes(x.id) &&
      x.discoverable !== false,
  );
  const others = profiles.filter((x) => x.id !== primary.id);

  const { name, email, phone } = primary.reveal;
  const snapshot =
    primary.snapshot ||
    `${primary.env?.[0] ?? ""} · ${primary.years} years experience`;

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-l-[3px] border-ash border-l-forest bg-white px-[15px] py-[13px]">
      {/* top: id + revealed tag, then name — title · location */}
      <div>
        <div className="font-mono text-[10px] text-[#8a8a84]">
          {primary.id}{" "}
          <span className="font-bold text-forest">✓ Revealed</span>
        </div>
        <div className="text-[13.5px] font-bold text-ink">
          {name ? `${name} — ` : ""}
          {primary.title} · {primary.loc}
        </div>
      </div>

      {/* meta */}
      <div className="text-xs text-ink-soft">{snapshot}</div>
      <div className="text-xs text-ink-soft">
        {primary.years} yr{primary.years === 1 ? "" : "s"} exp ·{" "}
        {primary.avail} · Confirmed {primary.confirmedDays}d ago
      </div>

      {/* contact */}
      {(email || phone) && (
        <div className="mt-0.5 rounded-[7px] bg-forest-light px-[9px] py-1.5 text-xs font-semibold text-ink">
          {email}
          {email && phone ? " · " : ""}
          {phone} ·{" "}
          <span className="font-semibold text-[#16260c]">Resume included</span>
        </div>
      )}

      {/* other revealed profiles of the same person */}
      {others.length > 0 && (
        <div className="text-[11px] italic text-[#8a8a84]">
          Also revealed as:{" "}
          {others.map((o, i) => (
            <React.Fragment key={o.id}>
              {i > 0 && " · "}
              <button
                type="button"
                onClick={() => onViewSibling?.(o)}
                className="cursor-pointer border-none bg-transparent p-0 text-[11px] font-semibold not-italic text-forest underline underline-offset-2 hover:text-[#1e3a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                {o.title}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* action */}
      <div className="mt-1 flex gap-[7px]">
        <button
          type="button"
          onClick={onViewProfile}
          className="flex-1 cursor-pointer rounded-[7px] border-none bg-forest p-[7px] text-[11px] font-bold text-white transition-colors hover:bg-[#3d6b1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          {profiles.length > 1
            ? `View ${primary.code} profile`
            : "View profile"}
        </button>
      </div>
    </div>
  );
}