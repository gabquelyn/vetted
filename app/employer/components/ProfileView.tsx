import { Candidate } from "@/app/data/registry";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { TiStarOutline } from "react-icons/ti";

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
}) {
  const candidate = results.find((c) => c.id == viewing) || results[0];
  const { name, email, phone } = candidate?.reveal;
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
  return (
    <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-4 py-3 sm:py-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:px-7">
      {/* Side panel */}
      <div className="hidden md:flex min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-ash bg-cream p-3 text-xs lg:col-span-1">
        <p className="mb-2 shrink-0 font-semibold text-ink-mid">
          Showing {results.length} results
        </p>

        <div className="flex min-h-0 gap-2 overflow-x-auto overflow-y-hidden pb-1 lg:flex-1 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0">
          {results.map((c) => (
            <div
              key={c.id}
              className={`relative flex w-56 shrink-0 cursor-pointer flex-col gap-1 rounded-md border p-2 hover:border-forest sm:w-64 lg:w-full lg:p-4 ${
                viewing === c.id
                  ? "border-forest bg-forest-pale"
                  : "border-ash bg-white"
              }`}
              onClick={() => setView(c.id)}
            >
              {c.specialist && (
                <div className="absolute rounded-bl-md rounded-tl-md text-[.6rem] right-0 p-2 text-highlight bg-highlight/30 uppercase">
                  Specialist
                </div>
              )}

              <p className="pr-5 font-semibold text-forest">{c.title}</p>
              <p className="text-[.55rem] text-ink-soft">{c.code}</p>
              <p className="text-ink-mid">{c.loc}</p>

              <p className="flex items-center gap-2 text-forest">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                {c.activeAgo}
              </p>

              <p className="text-ink-mid">Confirmed {c.confirmedDays}d</p>
            </div>
          ))}
        </div>
      </div>

      {/* Profile results */}
      <div className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto rounded-md border border-ash bg-white p-4 text-sm text-ink sm:p-5 lg:col-span-1 lg:p-6">
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

        {/* Header */}
        <div className="flex shrink-0 flex-col gap-4 border-b border-ash pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[.65rem] font-semibold uppercase tracking-widest text-ink-soft">
              {candidate.code}
            </p>

            <h2 className="break-words font-serif text-2xl font-semibold leading-tight text-forest sm:text-3xl">
              {candidate.title}
            </h2>

            <p className="text-ink-mid">
              {candidate.loc} · {candidate.years} yrs experience
            </p>

            {reveals.includes(candidate.id) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-mid">
                {[name, email, phone].map((value, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="hidden h-4 w-px bg-ash sm:block"
                      />
                    )}
                    <p className="break-all">{value}</p>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-w-0 shrink-0 flex-col items-start gap-2 md:items-end">
            <p className="flex items-center gap-2 text-xs text-forest-mid">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
              Active {candidate.activeAgo}
            </p>

            <p className="text-xs text-ink-soft">
              Confirmed {candidate.confirmedDays}d ago
            </p>

            <div className="flex flex-wrap gap-1.5">
              {candidate.specialist && (
                <p className="rounded-full bg-highlight px-3 py-2 text-xs font-bold text-white">
                  Specialist
                </p>
              )}

              {candidate.ic && (
                <Chip tone="outline">Independent contractor</Chip>
              )}
            </div>
          </div>
        </div>

        {/* Key facts */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          <Fact label="Availability" value={candidate.avail} />
          <Fact label="Employment" value={candidate.empType} />
          <Fact label="Shift" value={candidate.shift.join(", ")} />
          <Fact label="Credential" value={candidate.credential} />
          <Fact label="Vehicle" value={candidate.vehicle ? "Yes" : "No"} />
          <Fact label="Licence" value={candidate.licence ? "Yes" : "No"} />
          <Fact label="Rural" value={candidate.rural} />
          <Fact label="Float" value={candidate.float} />
        </div>

        {/* Snapshot and summary */}
        <Section title="Snapshot">
          <p className="rounded-lg bg-forest-pale px-4 py-3 font-medium text-forest">
            {candidate.snapshot}
          </p>

          <p className="mt-3 leading-relaxed text-ink-mid">
            {candidate.summary}
          </p>
        </Section>

        {/* Skills and specialties */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((s) => (
              <Chip key={s} tone="soft">
                {s}
              </Chip>
            ))}
          </div>

          {candidate.specialties && candidate.specialties.length > 0 && (
            <>
              <p className="mb-2 mt-4 text-xs font-semibold text-ink-mid">
                Specialties
              </p>

              <div className="flex flex-wrap gap-2">
                {candidate.specialties.map((s) => (
                  <Chip key={s} tone="solid">
                    {s}
                  </Chip>
                ))}
              </div>
            </>
          )}
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <div className="flex flex-col gap-4 border-l-2 border-forest-light pl-5">
            {candidate.exp.map((e, i) => (
              <div key={i} className="relative min-w-0">
                <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-forest" />

                <p className="break-words font-semibold text-ink">{e.role}</p>

                <p className="text-xs text-ink-soft">
                  {e.expLoc} · {e.dates}
                </p>

                {e.skills && (
                  <p className="mt-1 break-words leading-relaxed text-ink-mid">
                    {e.skills}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Education, certifications, EMR, languages */}
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <Section title="Education">
            <p className="text-ink-mid">{candidate.edu}</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.eduChips.map((c) => (
                <Chip key={c} tone="outline">
                  {c}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Certifications">
            <div className="flex flex-wrap gap-2">
              {candidate.certs.map((c) => (
                <Chip key={c} tone="outline">
                  {c}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="EMR systems">
            <div className="flex flex-wrap gap-2">
              {candidate.emr.map((c) => (
                <Chip key={c} tone="soft">
                  {c}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Languages">
            <div className="flex flex-wrap gap-2">
              {candidate.lang.map((c) => (
                <Chip key={c} tone="soft">
                  {c}
                </Chip>
              ))}
            </div>
          </Section>
        </div>

        {/* Environments and mobility */}
        <Section title="Environments">
          <p className="mb-2 text-xs font-semibold text-ink-mid">
            Experienced in
          </p>

          <div className="flex flex-wrap gap-2">
            {candidate.env.map((c) => (
              <Chip key={c} tone="soft">
                {c}
              </Chip>
            ))}
          </div>

          <p className="mb-2 mt-4 text-xs font-semibold text-ink-mid">
            Open to working in
          </p>

          <div className="flex flex-wrap gap-2">
            {candidate.openToWorkingIn.map((c) => (
              <Chip key={c} tone="outline">
                {c}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Relocation and travel */}
        <Section title="Relocation & travel">
          <p className="text-xs text-ink-mid">{candidate.relocation}</p>

          {candidate.relocationReach &&
            candidate.relocationReach.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {candidate.relocationReach.map((c) => (
                  <Chip key={c} tone="outline">
                    {c}
                  </Chip>
                ))}
              </div>
            )}

          <div className="mt-3 flex flex-wrap gap-2">
            {candidate.ruralOpen && <Chip tone="soft">Open to rural</Chip>}
            {candidate.travelOpen && <Chip tone="soft">Open to travel</Chip>}
          </div>
        </Section>

        {/* Actions */}
        <div className="mt-auto">
          <div className="h-px w-full bg-ash" />

          <div className="my-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap justify-between md:justify-center gap-2">
              <button
                className={`cursor-pointer rounded-md border px-4 py-2 ${
                  saved.includes(candidate.id)
                    ? "border-highlight bg-highlight/10 text-highlight"
                    : "border-ash text-ink-mid"
                }`}
                onClick={() => onSave(candidate.id)}
              >
                {saved.includes(candidate.id) ? "Saved" : "Save"}
              </button>

              <button
                className={`cursor-pointer rounded-md border px-4 py-2 ${
                  compare.includes(candidate.id)
                    ? "border-highlight bg-highlight/10 text-highlight"
                    : "border-ash text-ink-mid"
                }`}
                onClick={() => onCompare(candidate.id)}
              >
                {compare.includes(candidate.id) ? "In compare" : "Compare"}
              </button>
            </div>

            <button
              className={`cursor-pointer rounded-lg px-4 py-2 disabled:cursor-not-allowed ${
                reveals.includes(candidate.id)
                  ? "border border-ash bg-transparent text-ink-mid"
                  : "bg-forest text-white"
              }`}
              onClick={() => setReveal(candidate)}
              disabled={reveals.includes(candidate.id)}
            >
              {reveals.includes(candidate.id) ? "Revealed" : "Reveal"}
            </button>
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
    <div className="rounded-lg border border-ash bg-cream px-3 py-2.5">
      <p className="text-[.6rem] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-medium text-ink">{value}</p>
    </div>
  );
}

function Chip({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "solid" | "outline";
}) {
  const styles = {
    soft: "bg-forest-pale text-forest",
    solid: "bg-forest text-white",
    outline: "border border-forest-light text-forest-mid",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
