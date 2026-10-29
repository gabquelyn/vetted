import type { MouseEvent } from "react";
import { Candidate } from "@/app/data/registry";
import {
  fieldLabel,
  findCandidateMatches,
  matchText,
  pickDisplayMatch,
} from "@/app/utils/search";
import Highlight from "./Highlight";

const PinIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="shrink-0 opacity-55"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b6b64">
    <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    <circle cx="7.5" cy="14.5" r="1" />
    <circle cx="16.5" cy="14.5" r="1" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    className="shrink-0 opacity-90"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-2.75 w-2.75"
  >
    <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.3l-5.4 3.1 1-6.1-4.4-4.3 6.1-.9L12 3.5Z" />
  </svg>
);

const HideIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-2.75 w-2.75"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);

/* ---- small building blocks ---- */
const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-0.75 text-[9px] font-semibold uppercase tracking-[.04em] text-[#8a8a84]">
    {children}
  </div>
);

const Field = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label>{name}</Label>
    <div className="text-[12.5px] font-semibold text-ink">{children}</div>
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-forest-light px-2 py-[2.5px] text-[9.5px] font-semibold text-forest">
    {children}
  </span>
);

const utilBtn =
  "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-white/15 bg-black/20 text-white/80 transition-colors hover:bg-black/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B9D8A0]";

export default function CanCard({
  c,
  onSave,
  onCompare,
  saved,
  compared,
  onHide,
  onProfileView,
  onReveal,
  reveals,
  onIntroduction,
  highlightActive,
  setHighlightActive,
  introduced,
  terms,
}: {
  c: Candidate;
  onSave: (id: string) => void;
  onCompare: (id: string) => void;
  saved: string[];
  /** Pass `compare.includes(c.id)` so the checkbox reflects the real selection
   *  (it stays correct when the 3-candidate limit blocks a selection). */
  compared?: boolean;
  /** Optional. When provided, a "hide" button appears next to save on hover. */
  onHide?: (id: string) => void;
  onProfileView: () => void;
  onReveal: (candidate: Candidate) => void;
  reveals: string[];
  onIntroduction: (c: Candidate) => void;
  highlightActive: boolean;
  setHighlightActive: (id: string) => void;
  introduced: string[];
  terms: string[];
}) {
  const revealed = reveals.includes(c.personId || c.id);
  const intro = introduced.includes(c.id);
  const isSaved = saved.includes(c.id);
  const extraSkills = c.skills.length - 2;
  const stop = (e: MouseEvent) => e.stopPropagation();
  const matches = findCandidateMatches(c, terms)
  
  return (
    <div
      onClick={() => setHighlightActive(c.id)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_14px_30px_rgba(20,20,18,.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(28,52,16,.1)] motion-reduce:hover:translate-y-0 ${
        highlightActive
          ? "border-forest-dark shadow-[0_20px_46px_rgba(28,52,16,.14)]"
          : c.specialist
            ? "border-[rgba(184,98,26,.38)] border-t-[2.5px] border-t-[rgba(184,98,26,.62)] hover:shadow-[0_18px_42px_rgba(138,90,31,.18)]"
            : "border-[#e9e9e6] hover:border-[#c9c5b8]"
      }`}
    >
      {/* Specialist ribbon */}
      {c.specialist && (
        <div className="absolute -right-px top-3 z-3 rounded-l-[5px] bg-[#8a5a1f] py-1 pl-2.5 pr-2.75 text-[9px] font-bold uppercase tracking-[.05em] text-[#f5e6cc] shadow-[-2px_2px_6px_rgba(0,0,0,.15)]">
          Specialist
        </div>
      )}

      {/* Dark header */}
      <div className="relative border-b border-white/8 bg-[#16260c] px-4 pb-2.75 pt-3.25 text-white">
        {/* Save / hide: appear on hover or keyboard focus, stay visible once saved */}
        <div
          className={`absolute right-3 top-3 z-10 flex gap-1
    transition-opacity duration-150
    ${
      isSaved
        ? "opacity-100"
        : "opacity-0 group-hover:opacity-100 right-3 group-focus-within:opacity-100"
    } ${c.specialist ? "top-9" : " top-3"}`}
        >
          <button
            type="button"
            aria-label={isSaved ? "Remove from saved" : "Save candidate"}
            aria-pressed={isSaved}
            onClick={(e) => {
              e.stopPropagation();
              onSave(c.id);
            }}
            className={`${utilBtn} ${
              isSaved
                ? "border-[rgba(242,200,121,.4)]! bg-black/30! text-[#f2c879]!"
                : ""
            }`}
          >
            <StarIcon filled={isSaved} />
          </button>
          {onHide && (
            <button
              type="button"
              aria-label="Hide from my results"
              onClick={(e) => {
                e.stopPropagation();
                onHide(c.id);
              }}
              className={utilBtn}
            >
              <HideIcon />
            </button>
          )}
        </div>

        <div className="text-[15.5px] font-bold leading-[1.22] text-white">
          {revealed && c.reveal?.name ? (
            c.reveal.name
          ) : (
            <Highlight text={c.title} terms={terms} />
          )}
        </div>
        <div className="mb-0.5 font-mono text-[10.5px] font-semibold tracking-[.02em] text-white/50">
          {revealed ? `${c.title} · ${c.id}` : c.id}
        </div>

        <div className="mt-1.75 flex items-center justify-between">
          <label
            onClick={stop}
            className="flex cursor-pointer select-none items-center gap-1.75 text-[11px] text-white/60"
          >
            <input
              type="checkbox"
              className="peer sr-only"
              {...(compared !== undefined ? { checked: compared } : {})}
              onChange={() => onCompare(c.id)}
            />
            <span className="flex h-3.25 w-3.25 items-center justify-center rounded-[3px] border-[1.3px] border-white/50 text-[8.5px] text-transparent transition-all peer-checked:border-[#B9D8A0] peer-checked:bg-[#B9D8A0] peer-checked:text-[#16260c] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#B9D8A0]">
              ✓
            </span>
            Compare
          </label>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/55">
            <span className="h-1.75 w-1.75 rounded-full bg-[#22c55e]" />
            {c.activeAgo}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col px-4 py-3.5">
        {/* Location + vehicle */}
        <div className="mb-1.75 flex flex-wrap items-center gap-1.5 border-b border-ash pb-2.25 text-xs text-ink-soft">
          <PinIcon />
          {c.loc}
          {c.vehicle && (
            <span className="ml-auto flex items-center gap-1.25 font-medium text-[#8a8a84]">
              <CarIcon />
              Own vehicle
            </span>
          )}
        </div>

        {c.snapshot && (
          <div className="mb-1.75 text-[11.5px] font-semibold leading-[1.4] text-ink">
            <Highlight text={c.snapshot} terms={terms} />
          </div>
        )}

        {/* occourence */}

        {(() => {
          const match = pickDisplayMatch(matches);
          if (!match) return null;

          return (
            <div className="mb-1.75 flex items-center gap-1 text-[11px] text-ink-soft/80">
              <p className="font-semibold">{fieldLabel(match.key)}</p>·
              <p className="truncate whitespace-nowrap rounded-sm border border-[#C0BAA4] bg-[#ddd6bc] px-0.5 p-px text-ink-mid">
                {matchText(match)}
              </p>
            </div>
          );
        })()}

        {/* Key facts */}
        <div className="mb-1.75 grid grid-cols-2 gap-x-3 gap-y-2">
          <Field name="Availability">{c.avail}</Field>
          <Field name="Experience">{c.years} years</Field>
          <Field name="Shift preference">{c.shift.join(", ")}</Field>
          <div>
            <Label>Employment type</Label>
            <div className="text-[12.5px] font-semibold text-ink">
              {c.empType}
            </div>
            {c.ic && (
              <div
                className="mt-0.75 flex items-center gap-1 text-[9.5px] font-semibold text-[#b8722c]"
                aria-label="Independent contractor available"
              >
                <BagIcon />
                <span aria-hidden="true">Available independently</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-1.75">
          <Label>Skills</Label>
          <div className="mt-1.25 flex flex-wrap gap-1.25">
            {c.skills.slice(0, 2).map((s) => (
              <Chip key={s}>
                <Highlight text={s} terms={terms} />
              </Chip>
            ))}
            {extraSkills > 0 && (
              <span className="px-2 py-[2.5px] text-[9.5px] font-semibold text-[#8a8a84]">
                +{extraSkills} skill{extraSkills === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>

        {/* Credential */}
        <div className="mb-1.75.5 border-t border-ash pt-2.5 text-[11.5px] text-ink-soft">
          <b className="text-ink">
            <Highlight text={c.credential} terms={terms} />
          </b>
        </div>

        {/* Confirmed */}
        <div className="mb-3 mt-0.5 flex items-center gap-1.25 text-[10.5px] font-bold text-ink-soft">
          ✓ Confirmed · {c.confirmedDays} day{c.confirmedDays === 1 ? "" : "s"}{" "}
          ago
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-1.75 pt-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onProfileView();
            }}
            className="flex-[.9] cursor-pointer rounded-[7px] border border-ash bg-white p-1.5 text-center text-[11px] font-bold text-ink transition-colors hover:border-forest hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            data-tour="first-card"
          >
            View Profile
          </button>

          {c.specialist ? (
            <button
              type="button"
              disabled={intro}
              onClick={(e) => {
                e.stopPropagation();
                onIntroduction(c);
              }}
              className={`flex-[1.2] rounded-[7px] p-1.5 text-center text-[11px] font-bold transition-colors ${
                intro
                  ? "cursor-default border-[1.5px] border-[#d9a878] bg-white text-[#b8621a]"
                  : "cursor-pointer border-none bg-[#b8621a] text-white hover:bg-[#96500f]"
              }`}
            >
              {intro ? "Introduction requested ✓" : "Request introduction"}
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReveal(c);
              }}
              className={`flex-[1.2] cursor-pointer rounded-[7px] p-1.5 text-center text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16260c] ${
                revealed
                  ? "border-[1.5px] border-forest bg-white text-forest hover:bg-forest-light"
                  : "border-none bg-forest text-white hover:bg-[#3d6b1f]"
              }`}
            >
              {revealed ? "Revealed ✓" : "Reveal →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
