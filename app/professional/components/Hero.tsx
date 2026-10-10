"use client";
import { useRef, useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
export default function HeroAndModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCandidate, setModalCandidate] = useState<"NP" | "PSW" | null>(
    null,
  );
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  function openModal(candidate: "NP" | "PSW", trigger: HTMLElement) {
    lastTriggerRef.current = trigger;
    setModalCandidate(candidate);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    lastTriggerRef.current?.focus();
  }
  return (
    <>
      <header className="relative overflow-hidden bg-[linear-gradient(180deg,#faf7f0_0%,#f2ece0_100%)] px-12 pt-28 pb-15 max-[600px]:px-5 max-[600px]:pt-13 max-[600px]:pb-11">
        {/* decorative radial wash — was .hero::before */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-50 -top-52.5 h-155 w-155 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.09),transparent_68%)]"
        />

        <div className="relative z-1 mx-auto grid max-w-340 grid-cols-[0.82fr_1.18fr] items-center gap-11 max-[960px]:grid-cols-1 max-[960px]:gap-9">
          <div className="reveal">
            <div className="mb-4.5 flex items-center gap-2.25 text-[.6rem] font-semibold uppercase tracking-widest text-forest">
              <span aria-hidden="true" className="h-px w-4 bg-forest" />
              For healthcare professionals
            </div>

            <h1 className="mb-5 font-serif text-[clamp(34px,3.9vw,52px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">
              Be discoverable{" "}
              <span className="font-semibold italic text-forest">
                on your terms.
              </span>
            </h1>

            <p className="mb-6.5 max-w-110 text-base font-normal leading-[1.62] text-ink-soft">
              Vetted gives Ontario healthcare employers another way to find you.
              Set up your professional profile once.
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-6.5">
              <a
                href="#join"
                className="inline-flex items-center gap-2.25 rounded-full bg-forest px-6.75 py-3.75 text-sm font-bold text-white transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#3d6b1f] hover:shadow-[0_14px_28px_rgba(45,80,22,0.22)]"
              >
                Join Vetted <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-1.75 border-b-[1.5px] border-[rgba(45,80,22,0.35)] pb-0.5 text-[13.5px] font-bold text-forest transition-[border-color,color,opacity] duration-150 hover:border-forest"
              >
                See How It Works <span aria-hidden="true">→</span>
              </a>
            </div>

            <a
              href="#ic"
              className="border-b border-ash pb-px text-[12.5px] font-semibold text-ink-soft transition-colors duration-150 hover:border-forest hover:text-forest"
            >
              Independent contractor? See IC &amp; short-notice options →
            </a>
          </div>

          <div className="relative max-[960px]:order-1">
            <div className="rounded-xl border border-[rgba(184,160,130,0.28)] bg-[#fdfaf5] px-7.5 pb-7 pt-8.5 shadow-[0_30px_70px_rgba(60,45,20,0.05)] max-[960px]:px-5 max-[960px]:pb-5 max-[960px]:pt-6">
              <div className="mb-5 flex items-center gap-2.25 font-sans text-[.6rem] font-semibold uppercase tracking-[0.06em] text-forest">
                <span
                  aria-hidden="true"
                  className="h-px w-4 shrink-0 bg-forest"
                />
                Vetted Registry · Professional Profiles
              </div>

              <div className="group relative mx-auto grid max-w-180  grid-cols-2 items-start gap-5.5 max-[960px]:max-w-100 max-[600px]:max-w-[320px] max-[600px]:grid-cols-1">
                {/* decorative hover glow — was .hero-cards::before */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-9 z-0 rounded-[36px] bg-[radial-gradient(ellipse_68%_68%_at_50%_40%,rgba(45,80,22,0.14),transparent_72%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                />

                {/* Candidate 1: NP-115 */}
                <div className="relative z-1 transition-transform duration-300 ease-out hover:-translate-y-0.75">
                  <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(184,98,26,0.38)] border-t-[2.5px] border-t-[rgba(184,98,26,0.62)] bg-white shadow-[0_24px_52px_rgba(28,52,16,0.13)]">
                    <div className="absolute -right-1 top-3 z-3 rounded-l-1.25 bg-[#8a5a1f] py-1 pl-2.5 pr-2.75 text-[.6rem] font-bold uppercase tracking-[0.05em] text-[#f5e6cc] shadow-[-2px_2px_6px_rgba(0,0,0,0.15)]">
                      Specialist
                    </div>

                    <div className="relative border-b border-white/8  bg-ink px-4.5 pb-3.25 pt-3.75 text-white">
                      <div className="mb-0.5 font-mono text-[10.5px] font-semibold tracking-[0.02em] text-white/50">
                        NP-115
                      </div>
                      <div className="text-[15.5px] font-bold leading-[1.2] text-white">
                        Nurse Practitioner
                      </div>
                      <div className="mt-1.75 flex items-center justify-end">
                        <div className="flex items-center gap-1.5 text-[.5rem] font-semibold text-white/55">
                          <div className="h-1.5 w-1.5 rounded-full bg-forest-mid" />
                          Active 4 days ago
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col px-4.5 pb-3.5 pt-4">
                      <div className="mb-2.5 flex flex-wrap items-center gap-1.5 border-b border-ash pb-2.5 text-[.6rem] text-ink-soft">
                      <MdOutlineLocationOn/>
                        Barrie, ON
                        <span className="ml-auto flex items-center gap-1.25 font-medium text-ink-soft">
                          <IoCarSportOutline />
                          Own vehicle
                        </span>
                      </div>

                      <div className="mb-2.5 text-[.6rem] font-semibold leading-[1.4] text-ink">
                        Clinic · ~800-patient panel
                      </div>

                      <div className="mb-2.75 grid grid-cols-2 gap-x-3.5 gap-y-2.25">
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Availability
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            2 Weeks Notice
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Experience
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            7 years
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Shift preference
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            Days
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Employment type
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            Full-Time
                          </div>
                        </div>
                      </div>

                      <div className="mb-2.5">
                        <div className="mb-1.25 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                          Skills
                        </div>
                        <div className="flex flex-wrap gap-1.25">
                          <div className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                            Primary Care
                          </div>
                          <div className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                            Chronic Disease Mgmt
                          </div>
                          <div className="rounded-full bg-transparent px-2.5 py-0.75 text-[9.5px] font-semibold text-ink-soft">
                            +2
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.25 border-t border-ash pt-2.25 text-[11.5px] text-ink-soft">
                        <b className="font-semibold text-ink">
                          Master of Nursing (NP)
                        </b>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.25 text-[10.5px] font-bold text-ink-soft">
                        ✓ Confirmed · 4 days ago
                      </div>
                    </div>

                    <div className="px-4 pb-3.5 pt-2">
                      <button
                        type="button"
                        className="block w-full rounded-1.75 border border-ash bg-white py-2.25 text-center text-[11.5px] font-bold text-ink transition-colors duration-150 hover:border-forest hover:bg-forest-light rounded-md hover:text-forest"
                        onClick={(e) => openModal("NP", e.currentTarget)}
                      >
                        View Profile →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Candidate 2: PSW-188 */}
                <div className="relative z-1 mt-2 transition-transform duration-300 ease-out hover:-translate-y-0.75 max-[960px]:mt-0">
                  <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#e9e9e6] bg-white shadow-[0_24px_52px_rgba(28,52,16,0.13)]">
                    <div className="relative border-b border-white/8 bg-ink px-4.5 pb-3.25 pt-3.75 text-white">
                      <div className="mb-0.5 font-mono text-[10.5px] font-semibold tracking-[0.02em] text-white/50">
                        PSW-188
                      </div>
                      <div className="text-[15.5px] font-bold leading-[1.2] text-white">
                        Personal Support Worker
                      </div>
                      <div className="mt-1.75 flex items-center justify-end">
                        <div className="flex items-center gap-1.5 text-[.5rem] font-semibold text-white/55">
                          <div className="h-1.5 w-1.5 rounded-full bg-forest-mid" />
                          Active 4 days ago
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col px-4.5 pb-3.5 pt-4">
                      <div className="mb-2.5 flex flex-wrap items-center gap-1.5 border-b border-ash pb-2.5 text-[.6rem] text-ink-soft">
                      <MdOutlineLocationOn/>
                        Burlington, ON
                        <span className="ml-auto flex items-center gap-1.25 font-medium text-ink-soft">
                          <IoCarSportOutline />
                          Own vehicle
                        </span>
                      </div>

                      <div className="mb-2.5 text-[.6rem] font-semibold leading-[1.4] text-ink">
                        LTC · Secured dementia unit
                      </div>

                      <div className="mb-2.75 grid grid-cols-2 gap-x-3.5 gap-y-2.25">
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Availability
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            Immediate
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Experience
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            13 years
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Shift preference
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            Days, Evenings
                          </div>
                        </div>
                        <div>
                          <div className="mb-0.5 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                            Employment type
                          </div>
                          <div className="text-[12.5px] font-semibold text-ink">
                            Full-Time
                          </div>
                        </div>
                      </div>

                      <div className="mb-2.5">
                        <div className="mb-1.25 text-[.6rem] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                          Skills
                        </div>
                        <div className="flex flex-wrap gap-1.25">
                          <div className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                            Dementia Care
                          </div>
                          <div className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                            Personal Care
                          </div>
                          <div className="rounded-full bg-transparent px-2.5 py-0.75 text-[9.5px] font-semibold text-ink-soft">
                            +2
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.25 border-t border-ash pt-2.25 text-[11.5px] text-ink-soft">
                        <b className="font-semibold text-ink">
                          Personal Support Worker Certificate
                        </b>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.25 text-[10.5px] font-bold text-ink-soft">
                        ✓ Confirmed · 6 days ago
                      </div>
                    </div>

                    <div className="px-4 pb-3.5 pt-2">
                      <button
                        type="button"
                        className="block w-full rounded-1.75 border border-ash bg-white py-2.25 text-center text-[11.5px] font-bold text-ink transition-colors duration-150 hover:border-forest hover:bg-forest-light hover:text-forest"
                        onClick={(e) => openModal("PSW", e.currentTarget)}
                      >
                        View Profile →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-5.5 flex max-w-120 items-start justify-center gap-1.75 text-left text-[.6rem] leading-noraml text-ink-soft">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-px shrink-0 opacity-70"
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <span>
                Employers see your professional profile first. Your name and
                contact details stay private until Reveal.
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= PROFILE MODAL — opens on "View Profile", never shifts page layout =================
          Display is driven by conditional classes (flex/hidden) rather than the [hidden]
          attribute + CSS override the source used, since with Tailwind utilities applied
          inline there's no separate stylesheet rule left to out-specificity the
          attribute's default UA style. */}
      <div
        id="modalOverlay"
        hidden={!modalOpen}
        onClick={closeModal}
        className={`fixed inset-0 z-500 items-center justify-center overflow-y-auto bg-[rgba(22,38,12,0.5)] px-7 py-9 backdrop-blur-0.75 max-[720px]:items-start max-[720px]:p-0 ${
          modalOpen ? "flex" : "hidden"
        }`}
      >
        <div
          id="modalBox"
          ref={modalBoxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Professional profile"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto my-auto w-full max-w-260 rounded-4.5 bg-white shadow-[0_40px_90px_rgba(0,0,0,0.28)] max-[720px]:m-0 max-[720px]:min-h-screen max-[720px]:max-w-full max-[720px]:rounded-none"
        >
          <button
            type="button"
            id="modalClose"
            aria-label="Close profile"
            onClick={closeModal}
            className="absolute right-3.5 top-3.5 z-2 flex h-8 w-8 items-center justify-center rounded-full border border-ash bg-cream text-3.25 text-ink-soft transition-colors duration-150 hover:bg-forest-light hover:text-forest"
          >
            ✕
          </button>

          <div
            id="modalNP"
            hidden={modalCandidate !== "NP"}
            className="px-11.5 pb-8.5 pt-8 max-[720px]:px-5 max-[720px]:pb-7 max-[720px]:pt-6.5"
          >
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#fbe8d6] px-2.25 py-1 text-[9.5px] font-bold uppercase tracking-[0.03em] text-[#b8621a]">
                Specialist
              </span>
            </div>
            <div className="font-serif text-[22px] font-semibold text-ink">
              Nurse Practitioner · Barrie, ON
            </div>
            <div className="mb-1.5 mt-0.5 font-mono text-[.6rem] font-semibold tracking-[0.02em] text-ink-soft">
              NP-115
            </div>
            <div className="mb-2.75 flex flex-wrap items-center gap-3.25">
              <span className="flex items-center gap-1.25 text-[11.5px] font-semibold text-forest">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-light" />
                Active 4 days ago
              </span>
              <span className="flex items-center gap-1.25 text-[11.5px] font-medium text-ink-soft">
                ✓ Confirmed · 4 days ago
              </span>
            </div>

            <div className="mt-1.5 grid grid-cols-[1.3fr_1fr] gap-13 max-[720px]:grid-cols-1 max-[720px]:gap-6">
              <div>
                <div className="mb-4 border-b border-ash pb-4 text-[13.5px] leading-[1.58] text-[#3d3d39]">
                  Seven years in primary care and chronic disease management
                  across family medicine and community health, following an
                  earlier career as a Registered Nurse.
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Experience
                </div>
                <div className="mb-4 mt-3 max-w-110 rounded-r-lg border-l-2 border-forest bg-cream px-3.5 py-2.25">
                  <div className="mb-1 text-xs font-bold uppercase tracking-[0.06em] text-forest">
                    Your experience, in context
                  </div>
                  <div className="text-[.6rem] leading-normal text-ink-soft">
                    Your profile shows the professional summary, work history,
                    settings and experience you bring.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Nurse Practitioner
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Clinic · Barrie, ON · 2021 - Present · 4 yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    Interdisciplinary family health team, independent panel of
                    roughly 800 patients with a chronic-disease focus.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Nurse Practitioner
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Community Health Centre · Barrie, ON · 2018 - 2021 · 3 yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    Community health centre serving an underinsured and
                    marginalized-housing-adjacent patient population.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Registered Nurse
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Hospital · Toronto, ON · 2016 - 2018 · 2 yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    General internal medicine unit, patient assessment and
                    discharge care coordination.
                  </div>
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Key skills
                </div>
                <div className="mb-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Primary Care
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Chronic Disease Management
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Prescribing
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Diagnostics
                  </span>
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Certifications
                </div>
                <div className="mb-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    CPR-HCP
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Advanced Health Assessment
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-2 mt-0 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Availability &amp; practical fit
                </div>
                <div className="mb-4 mt-3 max-w-110 rounded-r-lg border-l-2 border-forest bg-cream px-3.5 py-2.25">
                  <div className="text-[.6rem] leading-noraml text-ink-soft">
                    Your availability, shift preferences, work settings and
                    mobility can be visible before an employer reaches out.
                  </div>
                </div>
                <div className="mb-4 rounded-2.5 bg-forest-light px-3.75 py-px">
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Availability</span>
                    <span className="text-right font-semibold text-ink">
                      2 Weeks Notice
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Shift preference</span>
                    <span className="text-right font-semibold text-ink">
                      Days
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Employment preference</span>
                    <span className="text-right font-semibold text-ink">
                      Full-Time
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Also open to</span>
                    <span className="text-right font-semibold text-ink">
                      Part-Time
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Open to working in</span>
                    <span className="text-right font-semibold text-ink">
                      Clinic, Community Health Centre
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Own vehicle</span>
                    <span className="text-right font-semibold text-ink">
                      <svg
                        className="mr-1 inline-flex align-[-2px] text-ink-soft"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                      </svg>
                      Yes
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Driver&apos;s licence</span>
                    <span className="text-right font-semibold text-ink">
                      Yes
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Rural roles</span>
                    <span className="text-right font-medium text-ink-soft">
                      Not open
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Travel / fly-in</span>
                    <span className="text-right font-medium text-ink-soft">
                      Not open
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Relocation</span>
                    <span className="text-right font-semibold text-ink">
                      Within Ontario
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Specialist status</span>
                    <span className="text-right font-semibold text-ink">
                      Specialist
                    </span>
                  </div>
                </div>
                <div className="mb-2.25 mt-4 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-px w-3.5 shrink-0 bg-forest"
                  />
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-forest">
                    Your professional details, together
                  </span>
                </div>
                <div className="mb-4 border-l-0.75 border-forest pl-2.75">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-soft">
                    Professional registration
                  </span>
                  <div className="text-3.5 font-bold leading-[1.4] text-ink">
                    College of Nurses of Ontario (CNO)
                  </div>
                  <div className="mt-1 text-[10.5px] font-medium text-ink-soft">
                    Registered · Candidate-reported · Number on file
                  </div>
                </div>
                <div className="mb-0 border-l-0.75 border-ash pl-2.75">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-soft">
                    Education
                  </span>
                  <div className="text-3.5 font-bold leading-[1.4] text-ink">
                    Master of Nursing (NP)
                  </div>
                  <div className="mt-px text-[11.5px] leading-[1.4] text-ink-soft">
                    University of Toronto · 2018
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="modalPSW"
            hidden={modalCandidate !== "PSW"}
            className="px-11.5 pb-8.5 pt-8 max-[720px]:px-5 max-[720px]:pb-7 max-[720px]:pt-6.5"
          >
            <div className="mt-6.25 font-serif text-[22px] font-semibold text-ink">
              Personal Support Worker · Burlington, ON
            </div>
            <div className="mb-1.5 mt-0.5 font-mono text-[.6rem] font-semibold tracking-[0.02em] text-ink-soft">
              PSW-188
            </div>
            <div className="mb-2.75 flex flex-wrap items-center gap-3.25">
              <span className="flex items-center gap-1.25 text-[11.5px] font-semibold text-forest">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-light" />
                Active 4 days ago
              </span>
              <span className="flex items-center gap-1.25 text-[11.5px] font-medium text-ink-soft">
                ✓ Confirmed · 6 days ago
              </span>
            </div>

            <div className="mt-1.5 grid grid-cols-[1.3fr_1fr] gap-13 max-[720px]:grid-cols-1 max-[720px]:gap-6">
              <div>
                <div className="mb-4 border-b border-ash pb-4 text-[13.5px] leading-[1.58] text-[#3d3d39]">
                  Thirteen years of dementia care and mobility support
                  experience across LTC, retirement and home care settings in
                  Halton and Hamilton.
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Experience
                </div>
                <div className="mb-4 mt-3 max-w-110 rounded-r-lg border-l-2 border-forest bg-cream px-3.5 py-2.25">
                  <div className="mb-1 text-xs font-bold uppercase tracking-[0.06em] text-forest">
                    Your experience, in context
                  </div>
                  <div className="text-[.6rem] leading-normal text-ink-soft">
                    Your profile shows the professional summary, work history,
                    settings and experience you bring.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Personal Support Worker
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Long-Term Care (LTC) · Burlington, ON · 2019 - Present · 6
                    yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    Secured dementia care unit supporting residents with
                    moderate-to-advanced cognitive impairment.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Personal Support Worker
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Retirement Home · Burlington, ON · 2016 - 2018 · 2 yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    Retirement home resident care combined with supporting the
                    recreation team on group programming.
                  </div>
                </div>
                <div className="border-t border-ash py-2.75 first:border-t-0 first:pt-0">
                  <div className="mb-0.5 text-[13.5px] font-bold text-ink">
                    Personal Support Worker
                  </div>
                  <div className="mb-1.5 text-[.6rem] text-ink-soft">
                    Long-Term Care (LTC) · Hamilton, ON · 2014 - 2016 · 2 yrs
                  </div>
                  <div className="text-[12.5px] leading-[1.52] text-[#3d3d39]">
                    Long-term care unit providing personal care alongside
                    palliative support for end-of-life residents.
                  </div>
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Key skills
                </div>
                <div className="mb-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Dementia Care
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Personal Care
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Mobility Assistance
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Medication Support
                  </span>
                </div>
                <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Certifications
                </div>
                <div className="mb-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Safe Patient Handling
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    WHMIS
                  </span>
                  <span className="rounded-full bg-forest-light px-2.5 py-0.75 text-[9.5px] font-semibold text-forest">
                    Medication Administration
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-2 mt-0 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                  Availability &amp; practical fit
                </div>
                <div className="mb-4 mt-3 max-w-110 rounded-r-lg border-l-2 border-forest bg-cream px-3.5 py-2.25">
                  <div className="text-[.6rem] leading-normal text-ink-soft">
                    Your availability, shift preferences, work settings and
                    mobility can be visible before an employer reaches out.
                  </div>
                </div>
                <div className="mb-4 rounded-2.5 bg-forest-light px-3.75 py-px">
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Availability</span>
                    <span className="text-right font-semibold text-ink">
                      Immediate
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Shift preference</span>
                    <span className="text-right font-semibold text-ink">
                      Days, Evenings
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Employment preference</span>
                    <span className="text-right font-semibold text-ink">
                      Full-Time
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Also open to</span>
                    <span className="text-right font-semibold text-ink">
                      Part-Time
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Open to working in</span>
                    <span className="text-right font-semibold text-ink">
                      Long-Term Care (LTC), Home Care
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Own vehicle</span>
                    <span className="text-right font-semibold text-ink">
                      <svg
                        className="mr-1 inline-flex align-[-2px] text-ink-soft"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                      </svg>
                      Yes
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Driver&apos;s licence</span>
                    <span className="text-right font-semibold text-ink">
                      Yes
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Rural roles</span>
                    <span className="text-right font-medium text-ink-soft">
                      Not open
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Travel / fly-in</span>
                    <span className="text-right font-medium text-ink-soft">
                      Not open
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(45,80,22,0.14)] py-1.75 text-[.6rem] last:border-b-0">
                    <span className="text-forest">Relocation</span>
                    <span className="text-right font-medium text-ink-soft">
                      Not open
                    </span>
                  </div>
                </div>
                <div className="mb-2.25 mt-4 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-px w-3.5 shrink-0 bg-forest"
                  />
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-forest">
                    Your professional details, together
                  </span>
                </div>
                <div className="mb-4 border-l-0.75 border-forest pl-2.75">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-soft">
                    Professional registration
                  </span>
                  <div className="text-3.5 font-bold leading-[1.4] text-ink">
                    HSCPOA (voluntary PSW registry)
                  </div>
                  <div className="mt-1 text-[10.5px] font-medium text-ink-soft">
                    Registered · Candidate-reported · Number on file
                  </div>
                </div>
                <div className="mb-0 border-l-0.75 border-ash pl-2.75">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-soft">
                    Education
                  </span>
                  <div className="text-3.5 font-bold leading-[1.4] text-ink">
                    Personal Support Worker Certificate
                  </div>
                  <div className="mt-px text-[11.5px] leading-[1.4] text-ink-soft">
                    Mohawk College · 2011
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
