"use client";

import { useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import CircularProgress from "./CircularProgress";

export default function WhatSection() {
  function useRevealOnScroll<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [threshold]);

    return { ref, visible };
  }
  const featureReveal = useRevealOnScroll<HTMLDivElement>(0.15);
  const verifyReveal = useRevealOnScroll<HTMLDivElement>(0.15);
  const lowerItem1Reveal = useRevealOnScroll<HTMLDivElement>(0.15);
  const lowerItem2Reveal = useRevealOnScroll<HTMLDivElement>(0.15);
  const tfNoteReveal = useRevealOnScroll<HTMLDivElement>(0.2);

  // Tailwind equivalent of the old .reveal / .reveal.in classes, including
  // the prefers-reduced-motion behavior via the motion-reduce: variant.
  const revealTransition =
    "transition-[opacity,transform] duration-[450ms] ease motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0";
  const revealState = (visible: boolean) =>
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[14px]";

  return (
    <section id="how-it-works">
      <div className="mx-auto max-w-160 px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-20 sm:pb-14 lg:px-8 lg:pt-32.5 lg:pb-17.5">
        <div className="text-[11.5px] font-medium tracking-[0.08em] uppercase text-forest mb-4">
          What is Vetted
        </div>
        <h2 className="mb-3.75 font-serif text-[clamp(30px,5vw,42px)] font-semibold leading-[1.2] text-ink">
          Everything you can ask on a first call — already organized.
        </h2>
        <p className="text-[15px] font-light leading-[1.55] text-ink-soft sm:text-[16.5px]">
          Search healthcare professionals by what actually matters, see the
          details before you reach out, and compare the ones worth a call.
        </p>
      </div>

      <div
        className={`mx-auto mb-16 grid max-w-325 grid-cols-1 items-center gap-8 px-4 sm:px-6 sm:mb-20 sm:gap-10 lg:mb-26.25 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8 xl:gap-18 ${revealTransition} ${revealState(
          featureReveal.visible,
        )}`}
        ref={featureReveal.ref}
      >
        <div className="text-left max-lg:text-center">
          <h3 className="mb-3.75 font-serif text-[clamp(30px,4.5vw,42px)] leading-[1.2] text-ink">
            Review the <span className="text-forest font-semibold">fit</span>{" "}
            first.
          </h3>
          <p className="mb-4 max-w-110 text-[15px] leading-[1.65] text-ink-soft sm:text-[16.5px] max-lg:mx-auto">
            Every Vetted profile is healthcare-specific, structured, and
            organized consistently from one candidate to the next.
          </p>
          <p className="mb-4 max-w-110 text-[15px] leading-[1.65] text-ink-soft last:mb-0 sm:text-[16.5px] max-lg:mx-auto">
            Review the information that determines fit at a glance, then open
            the structured profile for experience, certifications, work
            environments, mobility, and other role-specific details{" "}
            <b className="text-ink font-semibold">
              —before needing to open a single resume.
            </b>
          </p>
        </div>
        <div>
          <div className="relative mx-auto w-full max-w-110 pb-8.5">
            <div className="absolute bottom-0 left-3.5 right-3.5 flex h-16 items-end justify-around gap-2 rounded-b-2xl bg-forest px-2 pb-3 sm:px-4.5">
              <span className="text-center text-[9px] font-semibold text-[#b9d8a0] sm:text-[10.5px]">
                Experience
              </span>
              <span className="text-center text-[9px] font-semibold text-[#b9d8a0] sm:text-[10.5px]">
                Certifications
              </span>
              <span className="text-center text-[9px] font-semibold text-[#b9d8a0] sm:text-[10.5px]">
                Work Environments
              </span>
            </div>
            <div className="relative bg-white border border-ash rounded-[20px] shadow-[0_30px_70px_rgba(28,52,16,0.12)] overflow-hidden transition-[transform,box-shadow] duration-300 ease hover:-translate-y-1 hover:shadow-[0_40px_84px_rgba(28,52,16,0.18)]">
              <div className="bg-forest px-4 py-4 text-white sm:px-5.5 sm:py-4.5">
                <div className="flex justify-between items-center mb-3.5">
                  <div className="flex items-center gap-1.75 text-xs text-white/65">
                    <div className="w-3.5 h-3.5 border-[1.3px] border-white/50 rounded-0.75"></div>
                    Compare
                  </div>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-white/60">
                    <div className="w-1.75 h-1.75 rounded-full bg-forest-light"></div>
                    Active today
                  </div>
                </div>
                <div className="mb-0.5 text-[14px] font-bold text-white sm:text-base">
                  Developmental Services Worker
                </div>
                <div className="font-mono font-semibold text-xs text-white/65">
                  DSW-142
                </div>
              </div>
              <div className="px-4 py-4 sm:px-5.5 sm:py-5">
                <div className="mb-3.5 flex flex-wrap items-center gap-1.75 border-b border-ash pb-3.5 text-[12px] text-ink-soft sm:text-[13px]">
                  <CiLocationOn size={12} />
                  Kingston, ON
                  <span style={{ margin: "0 2px" }}>·</span>
                  <div className="flex items-center gap-1.25 text-ink font-semibold">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#1a1a18"
                    >
                      <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                      <circle cx="7.5" cy="14.5" r="1" />
                      <circle cx="16.5" cy="14.5" r="1" />
                    </svg>
                    Own vehicle
                  </div>
                </div>
                <div className="text-[11.5px] text-forest font-semibold mb-3.5">
                  ✓ Confirmed · 2 days ago
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                  <div>
                    <div className="text-[9.5px] font-semibold tracking-[0.04em] uppercase text-ink-mid mb-0.75">
                      Experience
                    </div>
                    <div className="text-[13.5px] font-semibold text-ink">
                      5 years
                    </div>
                  </div>
                  <div>
                    <div className="text-[9.5px] font-semibold tracking-[0.04em] uppercase text-ink-mid mb-0.75">
                      Availability
                    </div>
                    <div className="text-[13.5px] font-semibold text-ink">
                      Immediate
                    </div>
                  </div>
                  <div>
                    <div className="text-[9.5px] font-semibold tracking-[0.04em] uppercase text-ink-mid mb-0.75">
                      Shift Preference
                    </div>
                    <div className="text-[13.5px] font-semibold text-ink">
                      Days
                    </div>
                  </div>
                  <div>
                    <div className="text-[9.5px] font-semibold tracking-[0.04em] uppercase text-ink-mid mb-0.75">
                      Employment Type
                    </div>
                    <div className="text-[13.5px] font-semibold text-ink">
                      Full-Time
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[9.5px] font-semibold tracking-[0.04em] uppercase text-ink-mid mb-2">
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="text-[11px] font-semibold bg-forest-light text-forest px-2.75 py-1.25 rounded-full">
                      Behavioural Support
                    </div>
                    <div className="text-[11px] font-semibold bg-forest-light text-forest px-2.75 py-1.25 rounded-full">
                      Crisis Intervention
                    </div>
                    <div className="text-[11px] font-semibold bg-forest-light text-forest px-2.75 py-1.25 rounded-full">
                      Dual Diagnosis
                    </div>
                    <div className="text-[11px] font-semibold bg-forest-light text-forest px-2.75 py-1.25 rounded-full">
                      Residential Support
                    </div>
                  </div>
                </div>

                <div className="text-[12.5px] text-ink-soft pt-3.5 border-t border-ash mb-4">
                  <b className="text-ink">DSW Diploma</b>
                </div>

                <div className="flex flex-col gap-2 min-[380px]:flex-row">
                  <div className="flex-1 text-center p-3.25 rounded-[10px] text-[13.5px] font-bold transition-[background] duration-200 bg-white text-ink border border-ash hover:bg-white hover:border-ink">
                    View Profile
                  </div>
                  <div className="flex-1 bg-forest text-white text-center p-3.25 rounded-[10px] text-[13.5px] font-bold transition-[background] duration-200 hover:bg-[#3d6b1f]">
                    Reveal →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative mx-auto mb-20 max-w-325 px-4 sm:mb-24 sm:px-6 lg:mb-32.5 lg:px-8 ${revealTransition} ${revealState(
          verifyReveal.visible,
        )}`}
        ref={verifyReveal.ref}
      >
        <div
          className="absolute top-1/2 left-20 w-85 h-85 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.1)_0%,rgba(45,80,22,0)_68%)] pointer-events-none z-0"
          aria-hidden="true"
        ></div>

        <div className="relative mx-auto grid max-w-220 grid-cols-1 items-center gap-7 text-center sm:gap-10 lg:grid-cols-[auto_1fr] lg:gap-14 lg:px-4 lg:text-left">
          <div className="mx-auto">
            <CircularProgress />
          </div>
          <div>
            <div className="relative z-[1] mb-3 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-forest lg:mx-0">
              30-Day Profile Review
            </div>
            <h3 className="font-serif text-[clamp(28px,3vw,38px)] font-medium text-ink leading-[1.2] mb-3 relative z-1">
              See who is still{" "}
              <span className="text-forest font-semibold">open to work.</span>
            </h3>
            <p className="relative z-[1] mx-auto max-w-120 text-[15px] leading-[1.6] text-ink-soft sm:text-[15.5px] lg:mx-0">
              Every professional reconfirms whether they are still open to work
              during the 30-day profile review. If they stop responding,{" "}
              <b className="text-ink font-bold">their profile is hidden</b> —
              not left visible for months.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-325 grid-cols-1 gap-12 px-4 pb-14 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-20 xl:gap-14">
        <div
          className={`text-left ${revealTransition} ${revealState(
            lowerItem1Reveal.visible,
          )}`}
          ref={lowerItem1Reveal.ref}
        >
          <div className="group flex gap-2.5 sm:gap-3.5">
            <div className="flex-1 bg-white border border-ash rounded-[14px] p-5.5 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease group-hover:-translate-y-0.75 group-hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)]">
              <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-ink-mid mb-3.5">
                Before
              </div>
              <div
                className="bg-ash h-2.25 rounded-1.25 mb-2.25"
                style={{ width: "80%" }}
              ></div>
              <div
                className="bg-ash h-2.25 rounded-1.25 mb-2.25"
                style={{ width: "60%" }}
              ></div>
              <div
                className="bg-ash h-2.25 rounded-1.25 mb-2.25"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="flex-1 bg-forest border border-forest text-white rounded-[14px] p-5.5 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease group-hover:-translate-y-0.75 group-hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)]">
              <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#b9d8a0] mb-3.5">
                After reveal
              </div>
              <div className="mb-2.5 wrap-break-word text-[11px] sm:text-[12.5px]">
                <b className="block text-[14.5px]">Cathy Thompson</b>
                cathy.thompson@email.com
              </div>
              <div className="mb-2.5 wrap-break-word text-[11px] sm:text-[12.5px]">
                <b className="block text-[14.5px]">(604) 555-1234</b>
                Resume ready to download
              </div>
            </div>
          </div>
          <h4 className="text-center md:text-left mb-2.75 mt-6 font-serif text-[clamp(23px,3vw,27px)] font-semibold sm:mt-7.5">
            Full contact info in a click
          </h4>
          <p className="text-center md:text-left max-w-110 text-[14px] leading-[1.6] text-ink-soft sm:text-[14.5px]">
            Reach out directly—no placement fee.{" "}
            <b className="text-forest font-bold">
              You contact the professional yourself.
            </b>
          </p>
        </div>

        <div
          className={`text-left ${revealTransition} ${revealState(
            lowerItem2Reveal.visible,
          )}`}
          ref={lowerItem2Reveal.ref}
        >
          <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-3">
            <div className="min-w-0 rounded-[13px] border-[1.5px] border-forest bg-white p-3 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)] sm:p-4.5">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="mb-3 wrap-break-word font-mono text-[12px] font-bold sm:text-[14px]">
                RPN-014
              </div>
              <div className="flex flex-col justify-between gap-0.5 border-t border-ash py-1.25 text-[10px] text-ink-soft min-[400px]:flex-row min-[400px]:gap-2 sm:text-[11px]">
                <span>Experience</span>
                <span className="font-semibold text-ink">6 yrs</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Availability</span>
                <span className="wrap-break-word font-semibold text-ink">
                  Immediate
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Specialty</span>
                <span className="font-semibold text-ink">Wound Care</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Shift</span>
                <span className="font-semibold text-ink">Nights</span>
              </div>
            </div>
            <div className="min-w-0 rounded-[13px] border-[1.5px] border-forest bg-white p-3 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)] sm:p-4.5">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="mb-3 wrap-break-word font-mono text-[12px] font-bold sm:text-[14px]">
                RPN-027
              </div>
              <div className="flex flex-col justify-between gap-0.5 border-t border-ash py-1.25 text-[10px] text-ink-soft min-[400px]:flex-row min-[400px]:gap-2 sm:text-[11px]">
                <span>Experience</span>
                <span className="font-semibold text-ink">3 yrs</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Availability</span>
                <span className="font-semibold text-ink">2 Weeks</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Specialty</span>
                <span className="font-semibold text-ink">Palliative</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Shift</span>
                <span className="font-semibold text-ink">Nights</span>
              </div>
            </div>
            <div className="min-w-0 rounded-[13px] border-[1.5px] border-forest bg-white p-3 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)] sm:p-4.5">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="mb-3 wrap-break-word font-mono text-[12px] font-bold sm:text-[14px]">
                RPN-058
              </div>
              <div className="flex flex-col justify-between gap-0.5 border-t border-ash py-1.25 text-[10px] text-ink-soft min-[400px]:flex-row min-[400px]:gap-2 sm:text-[11px]">
                <span>Experience</span>
                <span className="font-semibold text-ink">9 yrs</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Availability</span>
                <span className="wrap-break-word font-semibold text-ink">
                  Immediate
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Specialty</span>
                <span className="font-semibold text-ink">IPAC</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Shift</span>
                <span className="font-semibold text-ink">Nights</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-2.75 mt-6 font-serif text-[clamp(23px,3vw,27px)] font-semibold sm:mt-7.5">
              Compare side by side
            </h4>
            <p className="max-w-110 text-[14px] leading-[1.6] text-ink-soft sm:text-[14.5px]">
              Decide who is worth contacting first —{" "}
              <b className="text-forest font-bold">
                without opening a dozen tabs.
              </b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
