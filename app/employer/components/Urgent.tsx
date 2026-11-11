"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { LuPlus, LuClock, LuZap } from "react-icons/lu";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";

import PlacementRequestForm, { PlacementRequestValues } from "./PlacementForm";
import Modal from "./Modal";
import UrgentTopUp, { TOP_UP_AMOUNT } from "./UrgentTopUp";
import ResponseCard, { ResponseMeta } from "./ResponseCard";
import { distanceBetweenCitiesKm, locationMatch } from "@/app/utils/geo";

/** Requests included before any (simulated) top-up */
export const INCLUDED_REQUESTS = 2;
const RESPONSES_PER_REQUEST = 3;
const FIRST_RESPONSE_MS = 1500;
const NEXT_RESPONSE_MS: [number, number] = [10_000, 6000];
const NEW_BADGE_MS = 30_000;
const MATCH_RADIUS_KM = 25;
const DISCLOSURE =
  "These are sample professionals and simulated responses, shown for demonstration only. No real professionals have been contacted.";

const CANDIDATES_BY_ID = new Map(FULL_CANDIDATES.map((c) => [c.id, c]));

// Whatever the form hands back on submit
type RequestValues = Parameters<
  React.ComponentProps<typeof PlacementRequestForm>["onSubmit"]
>[0];

// responseId is unique per response, so React keys never collide
type Response = ResponseMeta & { responseId: string; candidateId: string };

export type UrgentRequest = {
  id: string;
  createdAt: string;
  values: RequestValues;
  /** how many sample professionals match this request (before the response cap) */
  eligibleCount?: number;
  /** every candidate that will respond (demo plan, capped at RESPONSES_PER_REQUEST) */
  plannedIds: string[];
  /** responses received so far, newest first */
  responses: Response[];
};

const randomBetween = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

const asText = (v: unknown) =>
  Array.isArray(v) ? v.join(", ") : String(v ?? "").trim();

/** The shifts the request asked for; drives the coverage label on each response card. */
const getRequestShifts = (values: unknown): string[] => {
  const s = (values as { shifts?: unknown } | null)?.shifts;
  if (Array.isArray(s)) return s.map(String).filter(Boolean);
  return typeof s === "string" && s.trim() ? [s.trim()] : [];
};

/**
 * Request summary: profession, city, radius, shift and requested start.
 * Optional fields (About the setting, Work) are never listed, so leaving them blank is fine.
 * Field names (profession, location, shifts, startTiming) must match PlacementRequestForm.
 */
function summarize(v: PlacementRequestValues) {
  return [
    { label: "Profession", value: asText(v.profession) },
    { label: "City", value: asText(v.location) },
    { label: "Radius", value: `${MATCH_RADIUS_KM} km` },
    { label: "Shift", value: asText(v.shifts) },
    { label: "Requested start", value: asText(v.startTiming) },
  ].filter((row) => row.value !== "");
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/** The post's location, read from the form values. Change `location` if your field is named differently. */
const getPostLocation = (values: unknown): string =>
  String((values as { location?: unknown } | null)?.location ?? "").trim();

/**
 * DEMO ONLY: picks which candidates will "respond" to a request.
 * Eligible = own profession and within 25 km, or listed relocation city.
 * Responders = the 3 newest confirmed, so identical requests give identical results.
 */
function planDemoResponders(values: PlacementRequestValues): {
  eligibleCount: number;
  plannedIds: string[];
} {
  const location = values.location;

  const matching = FULL_CANDIDATES.filter(
    (c) =>
      c.discoverable !== false &&
      c.title === values.profession &&
      // Within the 25 km radius, or confirmed willing to relocate to the request's city
      // (relocationReach). Not the generic "Open to relocation" answer, and never the
      // travel flag.
      locationMatch(c, location, MATCH_RADIUS_KM) !== null,
  );

  // Dedupe by id in case the data contains the same candidate twice
  const unique = [...new Map(matching.map((c) => [c.id, c])).values()];

  return {
    eligibleCount: unique.length,
    // Deterministic: the same request always gets the same responders.
    // Newest confirmed first (fewest days since confirmation), id as the tie-break.
    plannedIds: [...unique]
      .sort(
        (a, b) =>
          a.confirmedDays - b.confirmedDays || a.id.localeCompare(b.id),
      )
      .slice(0, RESPONSES_PER_REQUEST)
      .map((c) => c.id),
  };
}

const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

/** Requests created before eligibleCount existed (or built elsewhere) fall back to the planned count. */
const eligibleOf = (r: { eligibleCount?: number; plannedIds: string[] }) =>
  r.eligibleCount ?? r.plannedIds.length;

const START_TIMINGS = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible",
];

/** DEMO ONLY: the details a real response would carry. */
const URGENT_TIMERS = new Map<string, ReturnType<typeof setTimeout>[]>();

/**
 * Display order: local candidates first, "Open to relocation" ones at the back;
 * within each group, newest confirmed first (fewest days since confirmation).
 */
function sortResponses(responses: Response[]): Response[] {
  const rank = (r: Response) => (r.locationMatch === "relocation" ? 1 : 0);
  const days = (r: Response) =>
    CANDIDATES_BY_ID.get(r.candidateId)?.confirmedDays ??
    Number.MAX_SAFE_INTEGER;
  return [...responses].sort((a, b) => rank(a) - rank(b) || days(a) - days(b));
}

/** Small stable string hash (FNV-1a), so demo values never change between runs. */
function stableHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeDemoResponse(
  candidate: Candidate,
  postLocation: string,
  requestedStart: string,
): Response {
  const seed = stableHash(`${candidate.id}|${requestedStart}`);
  return {
    // Not within the request radius = responding because they're open to relocating
    locationMatch:
      locationMatch(candidate, postLocation, MATCH_RADIUS_KM) === "local"
        ? "local"
        : "relocation",
    responseId: uuid(),
    candidateId: candidate.id,
    respondedAt: new Date().toISOString(),
    // Deterministic per candidate and requested start, so identical requests give
    // identical cards. Belongs to this request only; profile availability is untouched.
    earliestStart: START_TIMINGS[seed % START_TIMINGS.length],
    // Real straight-line distance; stable fallback only if a city isn't in CITY_COORDS
    distanceKm:
      distanceBetweenCitiesKm(postLocation, candidate.loc) || 2 + (seed % 44),
  };
}

/** One shared clock so "Responded 2 min ago" keeps updating. */
function useNow(intervalMs = 10_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export default function Urgent({
  onViewProfile,
  requests,
  setRequests,
  introduced,
  setIntroduction,
  revealed,
  onRevealing,
  allowance,
  onTopUp,
  selectedId,
  setSelectedId,
}: {
  onViewProfile?: (c: Candidate) => void;
  requests: UrgentRequest[];
  introduced: string[];
  setIntroduction: (c: Candidate) => void;
  setRequests: React.Dispatch<React.SetStateAction<UrgentRequest[]>>;
  revealed: string[];
  onRevealing: (c: Candidate) => void;
  /** Total urgent requests available (INCLUDED_REQUESTS + top-ups). Owned by the parent so it survives navigation. */
  allowance: number;
  /** Simulated purchase completed: the parent adds TOP_UP_AMOUNT to the allowance */
  onTopUp: () => void;
  /** Selected request, owned by the parent so it survives opening a profile and coming back */
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  // Set while the modal is editing an existing request instead of creating one
  const [editingId, setEditingId] = useState<string | null>(null);
  const now = useNow();

  // Pending "response arrives" timers per request, so they can be cancelled.
  // Module-level on purpose: leaving this view (e.g. to open a profile) must not
  // cancel responses that are still on their way.
  const timers = { current: URGENT_TIMERS };

  const atLimit = requests.length >= allowance;
  // Fall back to the first request, so no effect is needed to keep a valid selection
  const selected = requests.find((r) => r.id === selectedId) ?? requests[0];
  const editing = requests.find((r) => r.id === editingId);
  const noMatches = !!selected && eligibleOf(selected) === 0;

  const openCreate = () => {
    if (atLimit) return setTopUpOpen(true);
    setEditingId(null);
    setOpen(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setOpen(true);
  };

  // Simulates responses trickling in: the first after a short wait, then one
  // every few seconds. Replace with websocket / polling updates in a real app.
  const scheduleResponses = (
    requestId: string,
    candidateIds: string[],
    postLocation: string,
    requestedStart: string,
  ) => {
    let delay = 0;
    const handles = candidateIds.map((candidateId, i) => {
      delay +=
        i === 0
          ? FIRST_RESPONSE_MS
          : randomBetween(NEXT_RESPONSE_MS[0], NEXT_RESPONSE_MS[1]);
      return setTimeout(() => {
        const candidate = CANDIDATES_BY_ID.get(candidateId);
        if (!candidate) return;

        setRequests((prev) =>
          prev.map((r) =>
            r.id !== requestId ||
            // never add the same candidate twice to one request
            r.responses.some((x) => x.candidateId === candidateId)
              ? r
              : {
                  ...r,
                  responses: [
                    makeDemoResponse(candidate, postLocation, requestedStart),
                    ...r.responses,
                  ],
                },
          ),
        );
      }, delay);
    });
    timers.current.set(requestId, handles);
  };

  const handleSubmit = (values: RequestValues) => {
    const { eligibleCount, plannedIds } = planDemoResponders(values);

    // Editing: re-plan the same request in place and restart its responses
    if (editing) {
      timers.current.get(editing.id)?.forEach(clearTimeout);
      timers.current.delete(editing.id);

      setRequests((prev) =>
        prev.map((r) =>
          r.id === editing.id
            ? { ...r, values, eligibleCount, plannedIds, responses: [] }
            : r,
        ),
      );
      setSelectedId(editing.id);
      scheduleResponses(
        editing.id,
        plannedIds,
        getPostLocation(values),
        asText(values.startTiming),
      );
      setOpen(false);
      setEditingId(null);
      return toast.success("Urgent request updated");
    }

    if (atLimit) {
      setOpen(false);
      return setTopUpOpen(true);
    }

    const id = uuid();

    setRequests((prev) => [
      {
        id,
        createdAt: new Date().toISOString(),
        values,
        eligibleCount,
        plannedIds,
        responses: [],
      },
      ...prev,
    ]);
    setSelectedId(id);
    scheduleResponses(
      id,
      plannedIds,
      getPostLocation(values),
      asText(values.startTiming),
    );
    setOpen(false);
    toast.success("Urgent request created");
  };

  const listening =
    !!selected && selected.responses.length < selected.plannedIds.length;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Urgent requests
          </h1>
          <p className="mt-1 text-xs text-ink-soft">
            Create a request when you need a placement filled quickly.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <button
            type="button"
            onClick={openCreate}
            title={atLimit ? "Add more requests" : "Create request"}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-dark"
          >
            <LuPlus />
            {atLimit ? "Add more requests" : "Create request"}
          </button>
          <p className="text-[.65rem] text-ink-soft">
            {requests.length} of {allowance} requests used
          </p>
        </div>
      </div>

      {atLimit && requests.length > 0 && (
        <div
          role="status"
          className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e8c9a3] bg-[#fff4e6] px-4 py-2.5 text-xs font-semibold text-[#7a4a12]"
        >
          You&apos;ve used all {allowance} urgent requests.
          <button
            type="button"
            onClick={() => setTopUpOpen(true)}
            className="cursor-pointer border-none bg-transparent p-0 font-bold underline"
          >
            Add {TOP_UP_AMOUNT} more →
          </button>
        </div>
      )}

      {requests.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-ash bg-cream px-6 py-16 text-center">
          <p className="text-sm font-semibold text-ink-mid">
            No urgent requests yet
          </p>
          <p className="text-xs text-ink-soft">
            Requests you create will show up here, with the professionals who
            respond in real time.
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-2 cursor-pointer text-xs font-semibold text-forest underline"
          >
            Create your first request
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
          {/* Requests (pick one to see its responses) */}
          <ul className="flex flex-col gap-3 py-1 pl-2">
            <AnimatePresence initial={false}>
              {requests.map((r) => {
                const isSelected = r.id === selected?.id;
                const summary = summarize(r.values);

                return (
                  <motion.li
                    key={r.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(r.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(r.id);
                        }
                      }}
                      className={`group flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 text-xs transition-all ${
                        isSelected
                          ? "border-forest bg-forest-pale shadow-[-6px_0_14px_-4px] shadow-forest/50"
                          : "border-ash bg-white hover:border-forest/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-ink-soft">
                          <LuClock className="h-3.5 w-3.5" />
                          <p>{formatTime(r.createdAt)}</p>
                          <span className="rounded-full bg-forest-light px-2 py-0.5 text-[.65rem] font-semibold text-forest">
                            {eligibleOf(r) === 0
                              ? "No matches"
                              : plural(
                                  r.responses.length,
                                  "response",
                                  "responses",
                                )}
                          </span>
                        </div>
                      </div>

                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {summary.map(({ label, value }) => (
                          <div key={label} className="min-w-0">
                            <dt className="text-ink-soft">{label}</dt>
                            <dd className="wrap-break-word truncate font-semibold text-ink-mid">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {/* Responses for the selected request */}
          {selected && (
            <section className="flex max-h-[75vh] min-w-0 flex-col rounded-2xl border border-ash bg-cream p-4 sm:p-5">
              <div className="flex shrink-0 items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    Responses
                  </h2>
                  {!noMatches && (
                    <>
                      <p className="mt-0.5 text-xs font-semibold text-ink-mid">
                        {plural(
                          eligibleOf(selected),
                          "eligible sample professional",
                          "eligible sample professionals",
                        )}{" "}
                        ·{" "}
                        {plural(
                          selected.responses.length,
                          "illustrative response",
                          "illustrative responses",
                        )}
                      </p>
                      <p className="mt-1 max-w-prose text-[.7rem] leading-relaxed text-ink-soft">
                        {DISCLOSURE}
                      </p>
                    </>
                  )}
                </div>

                <p className="flex items-center gap-2 text-xs font-semibold text-forest">
                  {noMatches ? null : listening ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      Listening for responses
                    </>
                  ) : (
                    "All responses in"
                  )}
                </p>
              </div>

              {/* content-start stops the rows stretching to fill the fixed height;
                  p-1 keeps card shadows and the entry animation from being clipped */}
              {noMatches ? (
                <div className="mt-3 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-ash bg-white/60 px-6 py-12 text-center">
                  <p className="text-sm font-semibold text-ink-mid">
                    No matching sample professionals for this request.
                  </p>
                  <p className="text-xs text-ink-soft">
                    Try a different profession or location.
                  </p>
                  <button
                    type="button"
                    onClick={() => openEdit(selected.id)}
                    className="mt-2 cursor-pointer rounded-lg bg-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-dark"
                  >
                    Edit request
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 content-start gap-4 overflow-y-auto overscroll-contain p-1 pr-2 xl:grid-cols-2">
                  <AnimatePresence initial={false}>
                    {sortResponses(selected.responses).map((resp) => {
                      const candidate = CANDIDATES_BY_ID.get(resp.candidateId);
                      if (!candidate) return null;

                      return (
                        <motion.div
                          key={resp.responseId}
                          layout
                          initial={{ opacity: 0, y: -12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            layout: {
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            },
                          }}
                        >
                          <ResponseCard
                            candidate={candidate}
                            response={resp}
                            requestedShifts={getRequestShifts(selected.values)}
                            now={now}
                            isNew={
                              now - new Date(resp.respondedAt).getTime() <
                              NEW_BADGE_MS
                            }
                            onViewProfile={
                              onViewProfile
                                ? () => onViewProfile(candidate)
                                : undefined
                            }
                            introduced={introduced}
                            revealed={revealed}
                            onReveal={onRevealing}
                            onIntroduction={setIntroduction}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* placeholder while more responses are on the way */}
                  {listening && (
                    <div
                      aria-hidden
                      className="flex min-h-40 animate-pulse flex-col gap-3 rounded-2xl border border-dashed border-ash bg-white/60 p-4"
                    >
                      <div className="h-2.5 w-1/4 rounded bg-ash/60" />
                      <div className="h-3.5 w-2/3 rounded bg-ash/60" />
                      <div className="h-2.5 w-1/2 rounded bg-ash/60" />
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <div className="h-6 rounded bg-ash/50" />
                        <div className="h-6 rounded bg-ash/50" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* Simulated top-up */}
      {topUpOpen && (
        <UrgentTopUp
          allowance={allowance}
          used={requests.length}
          onComplete={onTopUp}
          onClose={() => setTopUpOpen(false)}
        />
      )}

      {/* Create-request modal */}
      <Modal
        title={
          <div className="flex items-start gap-4 p-4 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <LuZap className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[.65rem] font-semibold uppercase tracking-widest text-forest-light">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-highlight" />
                </span>
                Demo · Urgent
              </p>

              {/* <p>, not a heading: the Modal may already wrap the title in one */}
              <p className="mt-1.5 font-serif text-2xl font-semibold leading-tight">
                {editing ? "Edit urgent request" : "Create urgent request"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#E8F0E0]">
                Tell us what you need and we&apos;ll send it to professionals to
                respond immediately.
              </p>
            </div>
          </div>
        }
        open={open}
        onClose={() => setOpen(false)}
      >
        <PlacementRequestForm
          key={editing?.id ?? "new"}
          initialValues={editing?.values}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}