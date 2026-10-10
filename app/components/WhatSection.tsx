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
      <div className="max-w-160 mx-auto px-8 pt-32.5 pb-17.5 text-center">
        <div className="text-[11.5px] font-medium tracking-[0.08em] uppercase text-forest mb-4">
          What is Vetted
        </div>
        <h2 className="font-serif font-semibold text-[42px] leading-[1.2] mb-3.75 text-ink">
          Everything you can ask on a first call — already organized.
        </h2>
        <p className="text-[16.5px] font-light text-ink-soft leading-[1.55]">
          Search healthcare professionals by what actually matters, see the
          details before you reach out, and compare the ones worth a call.
        </p>
      </div>

      <div
        className={`max-w-325 mx-auto mb-26.25 px-12 grid grid-cols-[1fr_1.05fr] gap-18 items-center max-[960px]:grid-cols-1 max-[960px]:gap-11 ${revealTransition} ${revealState(
          featureReveal.visible,
        )}`}
        ref={featureReveal.ref}
      >
        <div className="text-left max-[960px]:text-center">
          <h3 className="font-serif text-[42px] leading-[1.2] mb-3.75 text-ink">
            Review the <span className="text-forest font-semibold">fit</span>{" "}
            first.
          </h3>
          <p className="text-[16.5px] text-ink-soft leading-[1.65] max-w-110 mb-4 max-[960px]:mx-auto">
            Every Vetted profile is healthcare-specific, structured, and
            organized consistently from one candidate to the next.
          </p>
          <p className="text-[16.5px] text-ink-soft leading-[1.65] max-w-110 mb-4 last:mb-0 max-[960px]:mx-auto">
            Review the information that determines fit at a glance, then open
            the structured profile for experience, certifications, work
            environments, mobility, and other role-specific details{" "}
            <b className="text-ink font-semibold">
              —before needing to open a single resume.
            </b>
          </p>
        </div>
        <div>
          <div className="relative max-w-110 mx-auto pb-8.5">
            <div className="absolute bottom-0 left-3.5 right-3.5 h-16 bg-forest rounded-b-2xl flex items-end justify-around px-4.5 pb-3">
              <span className="text-[10.5px] text-[#b9d8a0] font-semibold">
                Experience
              </span>
              <span className="text-[10.5px] text-[#b9d8a0] font-semibold">
                Certifications
              </span>
              <span className="text-[10.5px] text-[#b9d8a0] font-semibold">
                Work Environments
              </span>
            </div>
            <div className="relative bg-white border border-ash rounded-[20px] shadow-[0_30px_70px_rgba(28,52,16,0.12)] overflow-hidden transition-[transform,box-shadow] duration-300 ease hover:-translate-y-1 hover:shadow-[0_40px_84px_rgba(28,52,16,0.18)]">
              <div className="bg-forest px-5.5 py-4.5 text-white">
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
                <div className="text-base font-bold text-white mb-0.5">
                  Developmental Services Worker
                </div>
                <div className="font-mono font-semibold text-xs text-white/65">
                  DSW-142
                </div>
              </div>
              <div className="px-5.5 py-5">
                <div className="flex items-center gap-1.75 text-[13px] text-ink-soft pb-3.5 mb-3.5 border-b border-ash">
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

                <div className="flex gap-2">
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
        className={`max-w-325 mx-auto mb-32.5 px-12 ${revealTransition} ${revealState(
          verifyReveal.visible,
        )}`}
        ref={verifyReveal.ref}
      >
        <div
          className="absolute top-1/2 left-20 w-85 h-85 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.1)_0%,rgba(45,80,22,0)_68%)] pointer-events-none z-0"
          aria-hidden="true"
        ></div>
        <div className="relative max-w-220 mx-auto grid grid-cols-[auto_1fr] gap-14 items-center max-[960px]:grid-cols-1 max-[960px]:text-center max-[960px]:px-8">
          <CircularProgress />
          <div>
            <div className="text-[11.5px] font-semibold tracking-[0.06em] uppercase text-forest mb-3 relative z-1 max-[960px]:mx-auto">
              30-Day Profile Review
            </div>
            <h3 className="font-serif text-[clamp(28px,3vw,38px)] font-medium text-ink leading-[1.2] mb-3 relative z-1">
              See who is still{" "}
              <span className="text-forest font-semibold">open to work.</span>
            </h3>
            <p className="text-[15.5px] text-ink-soft leading-[1.6] max-w-120 relative z-1 max-[960px]:mx-auto">
              Every professional reconfirms whether they are still open to work
              during the 30-day profile review. If they stop responding,{" "}
              <b className="text-ink font-bold">their profile is hidden</b> —
              not left visible for months.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-325 mx-auto px-12 pb-20 grid grid-cols-2 gap-14 max-[960px]:grid-cols-1 max-[960px]:gap-16">
        <div
          className={`text-left ${revealTransition} ${revealState(
            lowerItem1Reveal.visible,
          )}`}
          ref={lowerItem1Reveal.ref}
        >
          <div className="group flex gap-3.5">
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
              <div className="text-[12.5px] mb-2.5">
                <b className="block text-[14.5px]">Cathy Thompson</b>
                cathy.thompson@email.com
              </div>
              <div className="text-[12.5px] mb-2.5">
                <b className="block text-[14.5px]">(604) 555-1234</b>
                Resume ready to download
              </div>
            </div>
          </div>
          <h4 className="font-serif text-[27px] font-semibold mb-2.75 mt-7.5">
            Full contact info in a click
          </h4>
          <p className="text-[14.5px] text-ink-soft leading-[1.6] max-w-110">
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
          <div className="flex gap-3">
            <div className="flex-1 bg-white border-[1.5px] border-forest rounded-[13px] p-4.5 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)]">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="font-mono font-bold text-[14px] mb-3">
                RPN-014
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash first-of-type:border-t-0">
                <span>Experience</span>
                <span className="font-semibold text-ink">6 yrs</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Availability</span>
                <span className="font-semibold text-ink">Immediate</span>
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
            <div className="flex-1 bg-white border-[1.5px] border-forest rounded-[13px] p-4.5 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)]">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="font-mono font-bold text-[14px] mb-3">
                RPN-027
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash first-of-type:border-t-0">
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
            <div className="flex-1 bg-white border-[1.5px] border-forest rounded-[13px] p-4.5 shadow-[0_14px_34px_rgba(28,52,16,0.06)] transition-[transform,box-shadow] duration-300 ease hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(28,52,16,0.1)]">
              <div className="w-4 h-4 rounded-sm bg-forest text-white flex items-center justify-center text-[10px] mb-3">
                ✓
              </div>
              <div className="font-mono font-bold text-[14px] mb-3">
                RPN-058
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash first-of-type:border-t-0">
                <span>Experience</span>
                <span className="font-semibold text-ink">9 yrs</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-soft py-1.25 border-t border-ash">
                <span>Availability</span>
                <span className="font-semibold text-ink">Immediate</span>
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
          <h4 className="font-serif text-[27px] font-semibold mb-2.75 mt-7.5">
            Compare side by side
          </h4>
          <p className="text-[14.5px] text-ink-soft leading-[1.6] max-w-110">
            Decide who is worth contacting first —{" "}
            <b className="text-forest font-bold">
              without opening a dozen tabs.
            </b>
          </p>
        </div>
      </div>
    </section>
  );
}
