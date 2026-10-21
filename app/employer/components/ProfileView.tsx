"use client";
import { Candidate } from "@/app/data/registry";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Divider from "./Divider";
import Pill from "./Pill";
import ExperienceList from "./ExperienceList";
import { IoMdStarOutline } from "react-icons/io";
import { MdArrowRightAlt } from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import RevealedContact from "./RevealedContact";
import { GiCheckMark } from "react-icons/gi";

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
  closed: boolean;
  onIntroduction: (c: Candidate) => void;
  introduced: string[];
}) {
  const candidate = results.find((c) => c.id == viewing) || results[0];
  const intro = introduced.includes(candidate.id);

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

  // Destructured after the guard so an empty result set can't throw here.
  const { name, email, phone } = candidate.reveal;

  return (
    <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-5 md:grid-cols-[clamp(11rem,17vw,16rem)_minmax(0,1fr)]">
      {/* Side panel */}
      <div className="hidden md:flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-ash bg-cream px-2 py-5 text-[.7rem] md:col-span-1">
        <p className="mb-4 shrink-0 text-[.6rem] font-semibold uppercase tracking-widest text-ink-soft">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>

        {/* left/top padding leaves room for the selected card's left shadow */}
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto py-1 pl-2 pr-1">
          {results.map((c) => (
            <div
              key={c.id}
              className={`flex min-w-0 shrink-0 cursor-pointer flex-col gap-1 break-words rounded-xl border px-4 py-3 transition-all ${
                viewing === c.id
                  ? "border-forest bg-forest-pale shadow-[-6px_0_14px_-4px] shadow-forest/50"
                  : "border-ash bg-white hover:border-forest/60"
              }`}
              onClick={() => setView(c.id)}
            >
              {c.specialist && (
                <span className="mb-1 self-start rounded-full bg-highlight/15 px-2 py-0.5 text-[.5rem] font-semibold uppercase tracking-wide text-highlight">
                  Specialist
                </span>
              )}

              <p className="text-xs font-semibold leading-snug text-forest">
                {c.title}
              </p>
              <p className="text-[.55rem] uppercase tracking-wider text-ink-soft">
                {c.code}
              </p>
              <p className="leading-relaxed text-ink-mid">{c.loc}</p>

              <p className="flex items-center gap-2 text-forest">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {c.activeAgo}
              </p>
              <p className="text-ink-soft">Confirmed {c.confirmedDays}d ago</p>

              {reveals.includes(c.id) && (
                <p className="flex items-center gap-1 text-xs text-ink-soft">
                  Revealed <GiCheckMark size={8} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile results */}
      <div className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto rounded-2xl border border-ash bg-white gap-1 p-3 text-sm text-ink sm:p-5 md:col-span-1 lg:p-10">
        <div className="flex justify-between items-start">
          {/* Header */}
          <div className="flex shrink-0 flex-col gap-2 pb-5 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-col text-xs">
              <h2 className="wrap-break-word font-serif text-xl mb-1 font-semibold leading-tight text-ink">
                {candidate.title} · {candidate.loc}
              </h2>
              <p className="text-[.65rem] font-semibold uppercase tracking-widest text-ink-soft">
                {candidate.id}
              </p>
              <p className="text-[.65rem] font-semibold uppercase text-ink-soft">
                {candidate.snapshot}
              </p>

              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 text-xs text-forest-mid">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  {candidate.activeAgo}
                </p>

                <p className="text-xs text-ink-soft">
                  Confirmed {candidate.confirmedDays}d ago
                </p>
              </div>
              {reveals.includes(candidate.id) && (
                <RevealedContact
                  values={[name, email, phone]}
                  active={closed}
                />
              )}
            </div>

            <div className="flex min-w-0 shrink-0 flex-col items-start gap-2 md:items-end">
              <div className="flex flex-wrap gap-1.5">
                {candidate.specialist && (
                  <p className="text-highlight border rounded-full px-2 p-1 border-highlight text-[.6rem]">
                    Specialist
                  </p>
                )}

                {candidate.ic && (
                  <p className="text-highlight border rounded-full px-2 p-1 border-highlight text-[.6rem]">
                    Independent contractor
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Back button */}
          <div className="mb-3 flex shrink-0 justify-end text-xs font-semibold text-forest underline">
            <button
              className="flex items-center gap-2 rounded-full"
              onClick={onClose}
            >
              <FaArrowLeft />
              <p>Back to results</p>
            </button>
          </div>
        </div>

        <div className="max-w-[80%] mb-2 text-ink-mid">
          <p>{candidate.summary}</p>
        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex gap-2 flex-col">
            {/* Experience */}
            <Section title="Experience">
              <Divider />
              {/* key resets the expanded state when switching candidates */}
              <ExperienceList key={candidate.id} roles={candidate.exp} />
            </Section>
            {/* Skills and specialties */}
            <Section title="Key Skills">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((s) => (
                  <Pill key={s} s={s} />
                ))}
              </div>
            </Section>
            <Section title="credentials & Certifications">
              <div className="flex flex-wrap gap-2">
                {candidate.certs.map((c) => (
                  <Pill key={c} s={c} />
                ))}
              </div>
            </Section>

            <Section title="EMR systems">
              <div className="flex flex-wrap gap-2">
                {candidate.emr.map((c) => (
                  <Pill key={c} s={c} />
                ))}
              </div>
            </Section>
          </div>
          <div>
            <Section title="Availability & practical fit">
              <div className="bg-forest-light flex flex-col gap-2 p-3 px-4 text-xs text-forest rounded-2xl">
                <Fact label="Availability" value={candidate.avail} />
                <Divider />
                <Fact label="Shift" value={candidate.shift.join(", ")} />
                <Divider />
                <Fact
                  label="Open to working in"
                  value={candidate.openToWorkingIn[0]}
                />
                <Divider />
                <Fact label="Employment" value={candidate.empType} />
                <Divider />
                <Fact
                  label="Own vehicle"
                  value={candidate.vehicle ? "Yes" : "No"}
                />
                <Divider />
                <Fact
                  label="Licence"
                  value={candidate.licence ? "Yes" : "No"}
                />
                <Divider />
                <Fact label="Credential" value={candidate.credential} />
                <Divider />
                <Fact label="Rural roles" value={candidate.rural} />
                <Divider />
                <Fact
                  label="Travel/Fly in"
                  value={candidate.travelOpen ? "Open" : "Not open"}
                />
                <Divider />
                <Fact
                  label="Relocation"
                  value={candidate.relocation ? "Open" : "Not open"}
                />
              </div>
            </Section>

            <div className="text-ink-soft pt-5 text-xs space-y-2">
              <p className="mb-3 text-[.65rem] font-semibold uppercase tracking-widest text-ink-soft">
                Additional profile details
              </p>
              {candidate.professionalRegistration && (
                <div className="border-l-4 border-forest-dark pl-3 space-y-1">
                  <p className="text-xs mb-1">Professional registration</p>
                  <p className="font-semibold text-ink-mid">
                    {candidate.professionalRegistration?.[0]?.regulator}{" "}
                    <span>
                      ({candidate.professionalRegistration[0].regulatorShort})
                    </span>
                  </p>
                  <div>
                    {!candidate.professionalRegistration?.[0]
                      ?.candidateReported ? (
                      <div>
                        <p>Registration details not provided </p>
                        <p className="text-xs italic">
                          Employer should verify current standing with CNO
                        </p>
                      </div>
                    ) : (
                      "Candidate standing confirmed"
                    )}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs mb-1">Education</p>
                <p className="font-semibold text-ink-mid">{candidate.edu}</p>
              </div>

              <div className=" flex items-center justify-between">
                <p className="text-xs mb-1">Language</p>
                <p className="font-semibold text-ink-mid">
                  {candidate.lang.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <div className="h-px w-full bg-ash" />

          <div className="my-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap justify-between md:justify-center gap-2">
              <button
                className={`cursor-pointer flex items-center gap-1 rounded-md border px-4 py-2 ${
                  saved.includes(candidate.id)
                    ? "border-highlight bg-highlight/10 text-highlight"
                    : "border-ash text-ink-mid"
                }`}
                onClick={() => onSave(candidate.id)}
              >
                <IoMdStarOutline className="shrink-0" />
                {saved.includes(candidate.id) ? "Saved" : "Save"}
              </button>

              <button
                className={`cursor-pointer rounded-md flex items-center gap-1 border px-4 py-2 ${
                  compare.includes(candidate.id)
                    ? "border-highlight bg-highlight/10 text-highlight"
                    : "border-ash text-ink-mid"
                }`}
                onClick={() => onCompare(candidate.id)}
              >
                <FiCheckSquare className="shrink-0" />
                {compare.includes(candidate.id) ? "In compare" : "Compare"}
              </button>
            </div>

            {candidate.specialist ? (
              <button
                className={`cursor-pointer flex items-center gap-1 justify-center w-40 rounded-lg px-4 font-semibold py-2 ${intro ? "text-highlight border-highlight border" : "text-white bg-highlight"}`}
                onClick={() => onIntroduction(candidate)}
                disabled={intro}
              >
                {intro ? "Requested" : "Request introduction"}
              </button>
            ) : (
              <button
                className={`cursor-pointer flex items-center gap-1 justify-center w-40 rounded-lg px-4 py-2 disabled:cursor-not-allowed ${
                  reveals.includes(candidate.id)
                    ? "border border-forest bg-transparent text-forest-dark"
                    : "bg-forest text-white"
                }`}
                onClick={() => setReveal(candidate)}
                disabled={reveals.includes(candidate.id)}
              >
                {reveals.includes(candidate.id) ? "Revealed" : "Reveal"}
                {reveals.includes(candidate.id) ? (
                  <GiCheckMark />
                ) : (
                  <MdArrowRightAlt />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-[.65rem] font-semibold uppercase tracking-widest text-ink-soft">
        {title}
      </h3>

      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-forest">{label}</p>
      <p className="text-xs font-semibold text-ink-mid">{value}</p>
    </div>
  );
}
