"use client";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ExperienceList from "./ExperienceList";
import RevealedContact from "./RevealedContact";
import Chip from "./Chip";
import Highlight from "./Highlight";

// Show the "scroll to bottom" button only when more than this many px remain
const SCROLL_BUTTON_THRESHOLD = 40;
// Post-Reveal highlight timing (glide to top, then flash for ~2.2s)
const REVEAL_SCROLL_SETTLE_MS = 420;
const REVEAL_FLASH_MS = 2200;

const BlockLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`mb-3.5 text-[10px] font-bold uppercase tracking-[.06em] text-[#8a8a84] ${className}`}
  >
    {children}
  </div>
);

const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-[7px] block text-[10px] font-semibold text-[#8a8a84]">
    {children}
  </span>
);

const Muted = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-[#8a8a84]">{children}</span>
);

const SideRow = ({
  label,
  children,
  variant = "primary",
}: {
  label: string;
  children: React.ReactNode;
  variant?: "primary" | "quiet";
}) =>
  variant === "primary" ? (
    <div className="flex justify-between border-b border-forest/15 py-2 text-[12.5px] last:border-b-0">
      <span className="text-forest">{label}</span>
      <span className="text-right font-semibold text-ink">{children}</span>
    </div>
  ) : (
    <div className="flex justify-between border-b border-ash py-1.5 text-[11.5px] text-ink-soft last:border-b-0">
      <span className="text-[#8a8a84]">{label}</span>
      <span className="text-right font-semibold">{children}</span>
    </div>
  );

const CarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-[5px] inline-block align-[-2px] text-ink-soft"
  >
    <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    <circle cx="7.5" cy="14.5" r="1" />
    <circle cx="16.5" cy="14.5" r="1" />
  </svg>
);

const utilBtn =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-[13px] py-2 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const utilIdle =
  "border-ash bg-white text-ink-soft hover:border-[#8a8a84] hover:text-ink";
const utilActive = "border-[#e8c9a3] bg-[#fbf1e2] text-[#b8722c]";

export default function ProfileView({
  results,
  viewing,
  setView,
  onSave,
  onCompare,
  compare,
  saved,
  onClose,
  setReveal,
  reveals,
  activeView,
  closed,
  onIntroduction,
  introduced,
  onHide,
  onOpenSibling,
  hidden,
  onPageChange,
  total,
  page,
  totalPages,
  terms,
}: {
  results: Candidate[];
  viewing?: string;
  setView: (id: string) => void;
  onSave: (id: string) => void;
  onCompare: (id: string) => void;
  compare: string[];
  saved: string[];
  onClose: () => void;
  setReveal: (c: Candidate) => void;
  reveals: string[];
  activeView: ActiveView;
  /** True once the reveal modal has closed — the highlight fires at that point. */
  closed: boolean;
  onIntroduction: (c: Candidate) => void;
  introduced: string[];
  /** Optional. When provided, a "Hide" action appears beside Save / Compare. */
  onHide?: (id: string) => void;
  /** Optional. Opens a sibling profile. Defaults to setView(c.id). */
  onOpenSibling?: (c: Candidate) => void;
  hidden: string[];
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
  page: number;
  terms: string[];
}) {
  const candidate =
    results.find((c) => c.id == viewing) ||
    FULL_CANDIDATES.find((c) => c.id == viewing);

  const candidateId = candidate?.id;
  const revealedNow = candidate
    ? reveals.includes(candidate?.personId || candidate.id)
    : false;

  // rail ref
  const railRef = useRef<HTMLDivElement>(null);
  const goToPage = (p: number) => {
    onPageChange?.(p);
    railRef.current?.scrollTo({ top: 0 });
  };

  // --- scroll-to-bottom button ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showDown, setShowDown] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    const meaningfullyLong = el.scrollHeight > el.clientHeight * 1.25;
    setShowDown(meaningfullyLong && remaining > SCROLL_BUTTON_THRESHOLD);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Reset scroll whenever the selected candidate changes
    el.scrollTo({ top: 0, behavior: "instant" });

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));

    return () => ro.disconnect();
  }, [updateScrollState, candidate?.id]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  // --- post-Reveal highlight (the HTML's .ve-just-revealed) ---
  // When the profile being viewed goes from not-revealed to revealed, and the
  // reveal modal has closed: glide the pane to the top, then flash the header.
  // Stored as the candidate id so switching candidates hides it automatically.
  const [flashId, setFlashId] = useState<string | null>(null);
  const revealTrackRef = useRef<{ id?: string; revealed: boolean } | null>(
    null,
  );
  const pendingRevealRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const prev = revealTrackRef.current;
    revealTrackRef.current = { id: candidateId, revealed: revealedNow };

    // First run, or a different candidate: just record state, never flash.
    if (!prev || prev.id !== candidateId) {
      pendingRevealRef.current = false;
      return;
    }
    if (!prev.revealed && revealedNow) pendingRevealRef.current = true;
    if (!pendingRevealRef.current || !closed) return;
    pendingRevealRef.current = false;

    const pane = scrollRef.current;
    const alreadyAtTop = !pane || pane.scrollTop <= 2;
    if (pane && !alreadyAtTop) pane.scrollTo({ top: 0, behavior: "smooth" });

    const id = candidateId ?? null;
    timersRef.current.push(
      setTimeout(
        () => {
          setFlashId(id);
          timersRef.current.push(
            setTimeout(() => setFlashId(null), REVEAL_FLASH_MS),
          );
        },
        alreadyAtTop ? 0 : REVEAL_SCROLL_SETTLE_MS,
      ),
    );
  }, [candidateId, revealedNow, closed]);

  if (!candidate) {
    return (
      <div className="mt-5 flex flex-col items-center text-xs text-ink-mid">
        <p>No profile to view</p>
        {activeView === "reveals" ? (
          <p>Reveal professionals</p>
        ) : (
          <p>Clear filter and try again</p>
        )}
      </div>
    );
  }

  const intro = introduced.includes(candidate.id);
  const revealed = revealedNow;
  const justRevealed = flashId === candidate.id;
  const isSaved = saved.includes(candidate.id);
  const inCompare = compare.includes(candidate.id);
  const inHidden = hidden.includes(candidate.id);
  const { name, email, phone } = candidate.reveal;
  const reg = candidate.professionalRegistration?.[0];

  // Other discoverable profiles belonging to the same person.
  const personKey = candidate.personId ?? candidate.id;
  const otherProfiles = Object.values(
    FULL_CANDIDATES as Record<string, Candidate> | Candidate[],
  ).filter(
    (x) =>
      (x.personId ?? x.id) === personKey &&
      x.id !== candidate.id &&
      x.discoverable !== false,
  );
  const reloc = candidate.relocation as unknown;
  const relocOpen = !!reloc && reloc !== "Not open";

  const fitRows: [string, React.ReactNode][] = (
    [
      [
        "Availability",
        <Highlight key={"availability"} text={candidate.avail} terms={terms} />,
      ],
      [
        "Shift preference",
        <Highlight
          key={"shift preference"}
          text={candidate.shift.join(", ")}
          terms={terms}
        />,
      ],
      [
        "Employment preference",
        <Highlight
          key={"Employment preference"}
          text={candidate.empType}
          terms={terms}
        />,
      ],
      candidate.acceptedEmpTypes && candidate.acceptedEmpTypes.length > 1
        ? [
            "Also open to",
            <Highlight
              key={"Also open to"}
              text={candidate.acceptedEmpTypes
                .filter((t) => t !== candidate.empType)
                .join(" · ")}
              terms={terms}
            />,
          ]
        : null,
      [
        "Open to working in",
        <Highlight
          key={"Open to working in"}
          text={candidate.openToWorkingIn?.join(", ")}
          terms={terms}
        />,
      ],
      [
        "Own vehicle",
        candidate.vehicle ? (
          <>
            <CarIcon />
            Yes
          </>
        ) : (
          <Muted>No</Muted>
        ),
      ],
      ["Driver's licence", candidate.licence ? "Yes" : <Muted>No</Muted>],
      [
        "Rural roles",
        candidate.rural && candidate.rural !== "No" ? (
          candidate.rural
        ) : (
          <Muted>Not open</Muted>
        ),
      ],
      [
        "Travel / fly-in",
        candidate.travelOpen ? "Open" : <Muted>Not open</Muted>,
      ],
      [
        "Relocation",
        relocOpen ? (
          typeof reloc === "string" ? (
            reloc
          ) : (
            "Open"
          )
        ) : (
          <Muted>Not open</Muted>
        ),
      ],
    ] as ([string, React.ReactNode] | null)[]
  ).filter((r): r is [string, React.ReactNode] => !!r && !!r[1]);

  const revealBtnBase =
    "w-full max-w-[220px] flex-1 cursor-pointer rounded-[7px] px-4 py-1.5 text-center text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default";
  return (
    <div
      className={`grid h-full min-h-0 min-w-0 grid-cols-1 gap-5.5 ${
        activeView == "urgent" ? "" : "md:grid-cols-[220px_minmax(0,1fr)]"
      }`}
    >
      {/* ---------- Candidate rail ---------- */}
      {activeView != "urgent" && (
        <div
          className="hidden min-h-0 min-w-0 flex-col overflow-y-auto rounded-[14px] border border-ash bg-cream p-1.5 md:flex"
          ref={railRef}
        >
          <div className="px-2 py-1 text-[10px] font-semibold tracking-[.01em] text-ink-soft">
            Showing {results.length} of {total ?? results.length} matching ·
            Page {page}
          </div>

          {totalPages > 1 && (
            <div className="mb-2 flex items-center justify-between text-[10px] text-ink-soft">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                aria-label="Previous page"
                className="cursor-pointer rounded-[7px] border border-ash bg-white px-[9px] py-[3px] text-[10px] font-semibold text-forest enabled:hover:border-forest disabled:cursor-default disabled:border-ash disabled:text-[#8a8a84] disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                ‹ Prev
              </button>
              <span className="whitespace-nowrap">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                aria-label="Next page"
                className="cursor-pointer rounded-[7px] border border-ash bg-white px-[9px] py-[3px] text-[10px] font-semibold text-forest enabled:hover:border-forest disabled:cursor-default disabled:border-ash disabled:text-[#8a8a84] disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                Next ›
              </button>
            </div>
          )}

          {results.map((c) => {
            const isActive = viewing === c.id;
            const isRevealed = reveals.includes(c.personId || c.id);
            return (
              <div
                key={c.id}
                role="button"
                tabIndex={0}
                onClick={() => setView(c.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setView(c.id);
                  }
                }}
                className={`mb-1 min-w-0 cursor-pointer rounded-[10px] border border-l-[3px] px-3.5 py-3 transition-[border-color,box-shadow] duration-100 last:mb-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest ${
                  isActive
                    ? "border-forest border-l-forest bg-forest-light"
                    : "border-ash border-l-transparent bg-white hover:border-forest hover:shadow-[0_2px_8px_rgba(28,52,16,.08)]"
                }`}
              >
                <div className="mb-0.75 flex items-center justify-between gap-1.5">
                  <span
                    className={`text-xs font-bold leading-tight ${
                      isActive ? "text-[#16260c]" : "text-ink"
                    }`}
                  >
                    {isRevealed && c.reveal?.name ? c.reveal.name : c.title}
                  </span>
                  {c.specialist && (
                    <span className="shrink-0 rounded-[5px] bg-[#fbe8d6] px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[.02em] text-[#b8621a]">
                      Specialist
                    </span>
                  )}
                </div>
                <div className="mb-1 font-mono text-[10px] text-[#8a8a84]">
                  {isRevealed ? `${c.title} · ${c.id}` : c.id}
                </div>
                <div className="mb-[3px] text-[11.5px] text-ink-soft">
                  {c.loc}
                </div>
                <div className="flex flex-wrap items-center gap-[7px] text-[10.5px] font-semibold text-ink-soft">
                  <span className="flex items-center gap-1 font-bold text-forest">
                    <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-[#22c55e]" />
                    {c.activeAgo}
                  </span>
                  <span className="text-[#8a8a84]">
                    Confirmed {c.confirmedDays}d
                  </span>
                  {isRevealed && (
                    <span className="font-bold text-forest">✓ Revealed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- Profile pane (relative wrapper so the scroll button floats) ---------- */}
      <div className="relative h-full min-h-0 min-w-0" data-tour="profile-pane">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="h-full min-h-0 min-w-0 overflow-y-auto rounded-2xl border border-ash bg-white text-ink shadow-[0_18px_44px_rgba(28,52,16,.09)]"
        >
          <div
            className={`px-5 py-6 md:px-10 md:py-[34px] ${
              candidate.specialist
                ? "border-t-[2.5px] border-t-[#b8621a] md:pt-[31.5px]"
                : ""
            }`}
          >
            {/* Head — flashes stone-tan right after a Reveal (.ve-just-revealed) */}
            <div
              className={`mb-[18px] flex flex-wrap items-start justify-between gap-3.5 rounded-[10px] transition-[background-color,box-shadow] duration-700 ease-in-out motion-reduce:transition-none ${
                justRevealed
                  ? "bg-[#DDD6BC] shadow-[0_0_0_8px_#DDD6BC]"
                  : "bg-transparent shadow-[0_0_0_0_transparent]"
              }`}
            >
              <div className="min-w-0">
                <h2 className="font-serif text-[19px] font-semibold text-ink">
                  {revealed && name ? `${name} — ` : ""}
                  {candidate.title} · {candidate.loc}
                </h2>
                <div className="mb-0.5 font-mono text-[11px] font-semibold tracking-[.02em] text-[#8a8a84]">
                  {candidate.id}
                </div>
                {candidate.snapshot && (
                  <div className="mb-1.5 mt-0.5 text-[12.5px] text-ink-soft">
                    <Highlight text={candidate.snapshot} terms={terms} />
                  </div>
                )}

                {revealed && (
                  <div className="mb-1.5">
                    <RevealedContact
                      values={[name, email, phone]}
                      active={closed}
                    />
                  </div>
                )}

                <div className="mt-1.5 flex flex-wrap items-center gap-3.5">
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-forest">
                    <span
                      className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                        revealed ? "bg-forest" : "bg-[#22c55e]"
                      }`}
                    />
                    {candidate.activeAgo}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#8a8a84]">
                    ✓ Confirmed · {candidate.confirmedDays} day
                    {candidate.confirmedDays === 1 ? "" : "s"} ago
                  </span>
                  {candidate.confirmedDays >= 25 && (
                    <span className="rounded-full bg-[#f7ead9] px-2 py-0.5 text-[10.5px] font-semibold text-[#b8722c]">
                      Reconfirmation due soon
                    </span>
                  )}
                </div>

                {(candidate.ic || candidate.specialist || revealed) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {candidate.ic && (
                      <span className="inline-flex items-center rounded-md bg-[#f7ead9] px-[9px] py-1 text-[9.5px] font-bold uppercase tracking-[.03em] text-[#b8722c]">
                        Independent Contractor
                      </span>
                    )}
                    {candidate.specialist && (
                      <span className="inline-flex items-center rounded-md bg-[#fbe8d6] px-[9px] py-1 text-[9.5px] font-bold uppercase tracking-[.03em] text-[#b8621a]">
                        Specialist
                      </span>
                    )}
                    {revealed && !candidate.specialist && (
                      <span className="inline-flex items-center rounded-md bg-forest-light px-[9px] py-1 text-[9.5px] font-bold uppercase tracking-[.03em] text-forest">
                        ✓ Revealed
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                data-tour="profile-back"
                onClick={onClose}
                className="inline-flex cursor-pointer items-center gap-[5px] rounded-[3px] py-1 text-[12.5px] font-bold text-forest hover:text-[#1e3a0f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M4.5 1L1 4.5l3.5 3.5M1 4.5h9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to results
              </button>
            </div>

            {/* Summary */}
            <p className="mb-6.5 max-w-190 border-b border-ash pb-6.5 text-[14.5px] leading-[1.7] text-[#3d3d39]">
              <Highlight text={candidate.summary} terms={terms} />
            </p>

            {/* Also available on Vetted as */}
            {otherProfiles.length > 0 && (
              <div className="mb-4 rounded-[10px] border border-ash bg-cream px-3.5 py-[11px]">
                <span className="mb-1.75 block text-[9.5px] font-bold uppercase tracking-[.05em] text-[#8a8a84]">
                  Also available on Vetted as
                </span>
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
                      {reveals.includes(op.personId || op.id)
                        ? " · Already revealed"
                        : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenSibling ? onOpenSibling(op) : setView(op.id)
                      }
                      className="cursor-pointer whitespace-nowrap rounded-[7px] border border-forest bg-transparent px-2.25 py-1 text-[10.5px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    >
                      View {op.code} →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Two columns */}
            <div className="grid grid-cols-1 gap-9 min-[820px]:grid-cols-[1.3fr_1fr]">
              {/* Left column */}
              <div className="min-w-0">
                <BlockLabel>Experience</BlockLabel>
                {/* key resets the expanded state when switching candidates */}
                <ExperienceList
                  key={candidate.id}
                  roles={candidate.exp}
                  terms={terms}
                />

                <BlockLabel className="mt-[22px]">Key skills</BlockLabel>
                <div className="mb-2 mt-2 flex flex-wrap gap-1.5">
                  {candidate.skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>

                <BlockLabel className="mt-[22px]">
                  Credentials and Certificates
                </BlockLabel>
                <div className="mb-2 mt-2 flex flex-wrap gap-1.5">
                  {candidate.certs.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>

                {candidate.emr?.length > 0 && (
                  <div className="mt-0.5">
                    <MicroLabel>EMR &amp; clinical systems</MicroLabel>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {candidate.emr.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="min-w-0">
                <BlockLabel>Availability &amp; Practical Fit</BlockLabel>
                <div className="rounded-[10px] bg-forest-light px-3.5 py-0.5">
                  {fitRows.map(([label, value]) => (
                    <SideRow key={label} label={label}>
                      {value}
                    </SideRow>
                  ))}
                </div>

                <BlockLabel className="mt-6 !text-[#c9c4b0]">
                  Additional Profile Detail
                </BlockLabel>

                {reg && (
                  <div className="mb-3.5 mt-0.5 border-l-[3px] border-forest pl-2.5">
                    <MicroLabel>Professional registration</MicroLabel>
                    <div className="text-[13.5px] font-semibold text-ink">
                      {reg.regulator}
                      {reg.regulatorShort &&
                        reg.regulatorShort !== reg.regulator &&
                        ` (${reg.regulatorShort})`}
                    </div>
                    <div
                      className={`mt-[3px] text-xs leading-[1.4] ${
                        reg.candidateReported
                          ? "font-medium text-ink-soft"
                          : "font-medium text-[#8a8a84]"
                      }`}
                    >
                      {reg.candidateReported
                        ? "Candidate-reported"
                        : "Registration details not provided"}
                    </div>
                    <div className="mt-[3px] text-[10.5px] italic leading-[1.4] text-[#8a8a84]">
                      Employer should verify current standing with{" "}
                      {reg.regulatorShort || reg.regulator}.
                    </div>
                  </div>
                )}

                {candidate.edu && (
                  <div className="mt-0.5">
                    <MicroLabel>Education</MicroLabel>
                    <div className="text-[13px] font-semibold leading-[1.4] text-ink">
                      {candidate.edu}
                    </div>
                  </div>
                )}

                {candidate.lang?.length > 0 && (
                  <div className="mt-2.5">
                    <SideRow label="Languages" variant="quiet">
                      <Highlight
                        key={"Language"}
                        text={candidate.lang.join(", ")}
                        terms={terms}
                      />
                    </SideRow>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6.5 flex flex-wrap items-center justify-end gap-3.5 border-t border-ash pt-[22px]">
              <div
                className="mr-auto flex flex-wrap gap-2"
                data-tour="profile-actions"
              >
                <button
                  type="button"
                  aria-pressed={isSaved}
                  onClick={() => onSave(candidate.id)}
                  className={`${utilBtn} ${isSaved ? utilActive : utilIdle}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={isSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.3l-5.4 3.1 1-6.1-4.4-4.3 6.1-.9L12 3.5Z" />
                  </svg>
                  {isSaved ? "Saved" : "Save"}
                </button>

                <button
                  type="button"
                  aria-pressed={inCompare}
                  onClick={() => onCompare(candidate.id)}
                  className={`${utilBtn} ${inCompare ? utilActive : utilIdle}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  {inCompare ? "In Compare" : "Compare"}
                </button>

                {onHide && (
                  <button
                    type="button"
                    onClick={() => {
                      onHide(candidate.id);
                      setView(results[0].id);
                    }}
                    className={`${utilBtn} ${inHidden ? utilActive : utilIdle}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                    >
                      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                      <path d="M9 9l6 6M15 9l-6 6" />
                    </svg>
                    Hide
                  </button>
                )}
              </div>

              {candidate.specialist ? (
                <div className="flex max-w-[220px] flex-1 flex-col">
                  <button
                    type="button"
                    disabled={intro}
                    onClick={() => onIntroduction(candidate)}
                    className={`${revealBtnBase} focus-visible:outline-[#b8621a] ${
                      intro
                        ? "border-[1.5px] border-[#d9a878] bg-white text-[#b8621a]"
                        : "border-none bg-[#b8621a] text-white hover:bg-[#96500f]"
                    }`}
                  >
                    {intro
                      ? "Introduction requested ✓"
                      : "Request introduction"}
                  </button>
                  <div className="mt-2 text-center text-[10.5px] text-[#8a8a84]">
                    Specialist · recruiter-assisted
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  data-tour="profile-reveal"
                  // disabled={revealed}
                  onClick={() => setReveal(candidate)}
                  className={`${revealBtnBase} focus-visible:outline-[#16260c] ${
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

        {/* Scroll to bottom — centered over the pane */}
        <AnimatePresence>
          {showDown && (
            <motion.button
              key="scroll-down"
              type="button"
              aria-label="Scroll down for more profile detail"
              title="Scroll to bottom"
              initial={{ opacity: 0, y: 8, x: "-50%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={scrollToBottom}
              className="absolute bottom-[18px] left-1/2 z-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#16260c] text-white shadow-[0_6px_18px_rgba(22,38,12,.28)] transition-colors hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M12 4v14M6 12l6 6 6-6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
