"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { LuPlus, LuClock, LuZap } from "react-icons/lu";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
// Adjust to wherever CITY_COORDS / haversineKm / resolveCity live

import PlacementRequestForm from "./PlacementForm";
import Modal from "./Modal";
import ResponseCard, { ResponseMeta } from "./ResponseCard";
import { distanceBetweenCitiesKm } from "@/app/utils/geo";

const MAX_REQUESTS = 2;
const RESPONSES_PER_REQUEST = 6;
const FIRST_RESPONSE_MS = 1500;
const NEXT_RESPONSE_MS: [number, number] = [10_000, 6000];
const NEW_BADGE_MS = 30_000;
const EARLIEST_START = ["Today", "Tomorrow", "In 2 days", "Next week"];

const CANDIDATES_BY_ID = new Map(FULL_CANDIDATES.map((c) => [c.id, c]));

// Whatever the form hands back on submit
type RequestValues = Parameters<
  React.ComponentProps<typeof PlacementRequestForm>["onSubmit"]
>[0];

type Response = ResponseMeta & { candidateId: string };

export type UrgentRequest = {
  id: string;
  createdAt: string;
  values: RequestValues;
  /** every candidate that will respond (demo plan) */
  plannedIds: string[];
  /** responses received so far, newest first */
  responses: Response[];
};

const randomBetween = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const humanize = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

function summarize(values: unknown) {
  return Object.entries((values ?? {}) as Record<string, unknown>)
    .filter(
      ([, v]) =>
        ["string", "number", "boolean"].includes(typeof v) &&
        String(v).trim() !== "",
    )
    .slice(0, 6)
    .map(([k, v]) => ({
      label: humanize(k),
      value: typeof v === "boolean" ? (v ? "Yes" : "No") : String(v),
    }));
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
 * DEMO ONLY: decides which candidates will respond to a request.
 * Picks randomly among candidates whose title matches the requested
 * profession (regex, case-insensitive, any significant word). If there
 * aren't enough matches, the rest is topped up with non-matching candidates.
 * Replace with the real responders.
 */
function planDemoResponders(values: unknown, exclude: string[]): string[] {
  const profession = String(
    (values as { profession?: unknown } | null)?.profession ?? "",
  ).trim();

  // "Registered Nurse" -> /\b(registered|nurse)/i
  const words = profession.split(/[\s/,&-]+/).filter((w) => w.length > 2);
  const professionRe = words.length
    ? new RegExp(`\\b(${words.map(escapeRegExp).join("|")})`, "i")
    : null;

  const pool = FULL_CANDIDATES.filter((c) => !exclude.includes(c.id));

  const matching = professionRe
    ? pool.filter((c) => c.title && professionRe.test(c.title))
    : [];
  // const others = pool.filter((c) => !matching.includes(c));

  return (
    [...shuffle(matching)]
      // return [...shuffle(matching), ...shuffle(others)]
      .slice(0, RESPONSES_PER_REQUEST)
      .map((c) => c.id)
  );
}

/** DEMO ONLY: the details a real response would carry. */
function makeDemoResponse(
  candidate: { id: string; loc: string },
  postLocation: string,
): Response {
  return {
    candidateId: candidate.id,
    respondedAt: new Date().toISOString(),
    earliestStart:
      EARLIEST_START[Math.floor(Math.random() * EARLIEST_START.length)],
    // Real straight-line distance; random fallback only if a city isn't in CITY_COORDS
    distanceKm:
      distanceBetweenCitiesKm(postLocation, candidate.loc) ||
      randomBetween(2, 45),
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
}: {
  onViewProfile?: (c: Candidate) => void;
  requests: UrgentRequest[];
  setRequests: React.Dispatch<React.SetStateAction<UrgentRequest[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const now = useNow();

  // Pending "response arrives" timers per request, so they can be cancelled
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>[]>());
  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((handles) => handles.forEach(clearTimeout));
  }, []);

  const atLimit = requests.length >= MAX_REQUESTS;
  // Fall back to the first request, so no effect is needed to keep a valid selection
  const selected = requests.find((r) => r.id === selectedId) ?? requests[0];

  const openCreate = () => {
    if (atLimit) {
      return toast.info(
        `You can have up to ${MAX_REQUESTS} urgent requests at a time. Remove one to create another.`,
      );
    }
    setOpen(true);
  };

  // Simulates responses trickling in: the first after a short wait, then one
  // every few seconds. Replace with websocket / polling updates in a real app.
  const scheduleResponses = (
    requestId: string,
    candidateIds: string[],
    postLocation: string,
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
            r.id === requestId
              ? {
                  ...r,
                  responses: [
                    makeDemoResponse(candidate, postLocation),
                    ...r.responses,
                  ],
                }
              : r,
          ),
        );
      }, delay);
    });
    timers.current.set(requestId, handles);
  };

  const handleSubmit = (values: RequestValues) => {
    if (atLimit) {
      setOpen(false);
      return toast.info(`Only ${MAX_REQUESTS} urgent requests are allowed.`);
    }

    const id = uuid();
    const plannedIds = planDemoResponders(
      values,
      requests.flatMap((r) => r.plannedIds),
    );

    setRequests((prev) => [
      {
        id,
        createdAt: new Date().toISOString(),
        values,
        plannedIds,
        responses: [],
      },
      ...prev,
    ]);
    setSelectedId(id);
    scheduleResponses(id, plannedIds, getPostLocation(values));
    setOpen(false);
    toast.success("Urgent request created");
  };

  //   const removeRequest = (id: string) => {
  //     timers.current.get(id)?.forEach(clearTimeout);
  //     timers.current.delete(id);
  //     setRequests((prev) => prev.filter((r) => r.id !== id));
  //   };

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
            aria-disabled={atLimit}
            title={
              atLimit
                ? `Limit of ${MAX_REQUESTS} requests reached`
                : "Create request"
            }
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              atLimit
                ? "cursor-not-allowed bg-ash/60 text-ink-soft"
                : "cursor-pointer bg-forest text-white hover:bg-forest-dark"
            }`}
          >
            <LuPlus />
            Create request
          </button>
          <p className="text-[.65rem] text-ink-soft">
            {requests.length} of {MAX_REQUESTS} requests used
          </p>
        </div>
      </div>

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
                const summary = summarize(r.values).slice(0, 6);

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
                            {r.responses.length}{" "}
                            {r.responses.length === 1
                              ? "response"
                              : "responses"}
                          </span>
                        </div>

                        {/* Remove button (re-enable together with removeRequest and the LuTrash2 import)
                        <button
                          type="button"
                          aria-label="Remove request"
                          title="Remove request"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRequest(r.id);
                          }}
                          className="cursor-pointer rounded-md p-1.5 text-ink-soft opacity-0 transition-opacity hover:bg-gray-100 focus-visible:opacity-100 group-hover:opacity-100"
                        >
                          <LuTrash2 className="h-3.5 w-3.5" />
                        </button> */}
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
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {selected.responses.length} professionals have responded
                  </p>
                </div>

                <p className="flex items-center gap-2 text-xs font-semibold text-forest">
                  {listening ? (
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
              <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 content-start gap-4 overflow-y-auto overscroll-contain p-1 pr-2 xl:grid-cols-2">
                <AnimatePresence initial={false}>
                  {selected.responses.map((resp) => {
                    const candidate = CANDIDATES_BY_ID.get(resp.candidateId);
                    if (!candidate) return null;

                    return (
                      <motion.div
                        key={resp.candidateId}
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
            </section>
          )}
        </div>
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
                Create urgent request
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
        <PlacementRequestForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}