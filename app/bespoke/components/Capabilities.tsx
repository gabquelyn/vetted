"use client";
import React, { useCallback, useState } from "react";
interface ProofSlide {
  category: string;
  statement: string;
  desc: string;
  meta: string;
}
const proofSlides: ProofSlide[] = [
  {
    category: "Large-Scale Workforce Mobilization",
    statement:
      '<span class="proof-num">373</span> healthcare professionals mobilized for the opening of a new 632-bed long-term care home.',
    desc: "Built and executed the recruitment operation across RNs, RPNs and PSWs — from sourcing and structured screening through credential verification, offers, onboarding and workforce readiness.",
    meta: "373 professionals · 632 beds · 5 months",
  },
  {
    category: "Province-Wide Workforce Strategy",
    statement:
      "Recruitment strategy designed for a large-scale Nurse Practitioner workforce requirement across Ontario.",
    desc: "Built a province-wide sourcing approach spanning talent networks, professional associations, direct sourcing, referrals, digital platforms and passive-candidate engagement.",
    meta: "Province-wide sourcing · Specialized talent · Scalable recruitment",
  },
  {
    category: "Specialized & Difficult-to-Fill Recruitment",
    statement:
      "Targeted recruitment for specialized and regulated healthcare professionals where broad applicant generation is not enough.",
    desc: "Search strategy has included Nurse Practitioners, Clinical Psychologists and other specialized clinical professionals, using role-specific sourcing, market mapping and direct outreach.",
    meta: "Specialized healthcare · Targeted sourcing · Direct outreach",
  },
  {
    category: "Complex & Location-Specific Workforce Needs",
    statement: "Recruitment built around the realities of the market.",
    desc: "Supported healthcare workforce requirements where geography, candidate availability and specialized service needs made conventional recruitment insufficient — using targeted sourcing, direct outreach and multiple recruitment channels to expand the available talent pool and adapt the recruitment approach to the market.",
    meta: "Regional hiring · Multi-channel sourcing · Workforce response",
  },
  {
    category: "Recruitment Infrastructure & Operating Model",
    statement:
      "Designed the systems behind healthcare recruitment — not only the candidate search.",
    desc: "Built and improved recruitment workflows spanning sourcing, structured screening, credential verification, documentation, offers, onboarding, reporting and workforce readiness.",
    meta: "Process design · Recruitment operations · Workforce infrastructure",
  },
];
export default function Capabilities() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const total = proofSlides.length;

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const goToSlide = useCallback(
    (newIdx: number) => {
      if (newIdx < 0 || newIdx > total - 1) return;
      setPanelVisible(false);
      window.setTimeout(() => {
        setSlideIdx(newIdx);
        setPanelVisible(true);
      }, 160);
    },
    [total],
  );
  const activeSlide = proofSlides[slideIdx];

  const isPrevDisabled = slideIdx === 0;
  const isNextDisabled = slideIdx === total - 1;

  function handlePrevClick() {
    goToSlide(slideIdx - 1);
  }
  function handleNextClick() {
    goToSlide(slideIdx + 1);
  }

  function handlePrevKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide(slideIdx - 1);
    }
  }

  function handleNextKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide(slideIdx + 1);
    }
  }

  return (
    <section className="bg-white pt-22 px-12 pb-0 max-[760px]:px-5">
      <div className="max-w-280 mx-auto">
        <div className="mb-12">
          <p className="h_top">Bespoke Capabilities</p>
        </div>

        <div className="grid grid-cols-2 gap-x-22 gap-y-19 max-[900px]:grid-cols-1 max-[900px]:gap-y-12">
          <div
            className={`grid grid-cols-[160px_1fr] max-[600px]:grid-cols-1 gap-8 max-[600px]:gap-2.5 items-start
          transition-all duration-500 ease-out
          ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
          >
            <h2 className="font-['Cormorant_Garamond',serif] font-semibold text-xl leading-[1.32] text-[#2D5016] tracking-[-0.005em]">
              Hiring Systems &amp; Process Design
            </h2>
            <p className="text-sm font-light leading-[1.66] text-[#5c5c58] max-w-[320px] max-[900px]:max-w-130]">
              When hiring volume grows, teams expand or existing recruitment
              processes stop supporting the organization effectively, Vetted can
              assess the hiring operation and redesign how it works. This may
              mean rebuilding a fragmented recruitment process, creating the
              infrastructure for growth, or designing a more scalable hiring
              model across teams, locations or business units.
            </p>
          </div>

          <div
            className={`grid grid-cols-[160px_1fr] max-[600px]:grid-cols-1 gap-8 max-[600px]:gap-2.5 items-start
          transition-all duration-500 ease-out
          ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
          >
            <h2 className="font-['Cormorant_Garamond',serif] font-semibold text-xl leading-[1.32] text-[#2D5016] tracking-[-0.005em]">
              Recruitment Technology
            </h2>
            <p className="text-sm font-light leading-[1.66] text-[#5c5c58] max-w-[320px] max-[900px]:max-w-130]">
              For organizations selecting, replacing or implementing an ATS,
              HRIS or other recruitment technology, Vetted can help define the
              operational and technical requirements the system needs to
              support, evaluate the right solution, and guide implementation
              around the realities of the organization&apos;s hiring operation.
              We can also support organizations whose existing technology is
              underperforming, poorly implemented or no longer suited to the
              scale and complexity of their hiring.
            </p>
          </div>

          <div
            className={`grid grid-cols-[160px_1fr] max-[600px]:grid-cols-1 gap-8 max-[600px]:gap-2.5 items-start
          transition-all duration-500 ease-out
          ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
          >
            <h2 className="font-['Cormorant_Garamond',serif] font-semibold text-xl leading-[1.32] text-[#2D5016] tracking-[-0.005em]">
              Recruitment &amp; Workforce Advisory
            </h2>
            <p className="text-sm font-light leading-[1.66] text-[#5c5c58] max-w-[320px] max-[900px]:max-w-130]">
              For healthcare organizations making consequential decisions about
              how they recruit, scale or structure their workforce, Vetted
              provides senior-level recruitment and workforce advisory grounded
              in operating experience. Engagements can support periods of
              growth, persistent hiring challenges, changes to the recruitment
              model, new market or location expansion, or organizations
              reassessing how their internal recruitment function should
              operate.
            </p>
          </div>

          <div
            className={`grid grid-cols-[160px_1fr] max-[600px]:grid-cols-1 gap-8 max-[600px]:gap-2.5 items-start
          transition-all duration-500 ease-out
          ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
          >
            <h2 className="font-['Cormorant_Garamond',serif] font-semibold text-xl leading-[1.32] text-[#2D5016] tracking-[-0.005em]">
              Workforce Mobilization &amp; Special Projects
            </h2>
            <p className="text-sm font-light leading-[1.66] text-[#5c5c58] max-w-[320px] max-[900px]:max-w-130]">
              For major healthcare openings, expansions, mass recruitment,
              urgent workforce requirements or other complex hiring initiatives
              where the existing recruitment function may not have the capacity
              or infrastructure to deliver at the required scale. Vetted can
              help organizations stand up the recruitment operation needed for
              the initiative — and, where appropriate, support the project
              through implementation and mobilization.
            </p>
          </div>
        </div>

        <div
          className={`max-w-280 mx-auto mt-22 pt-12 pb-24 border-t border-ink/8
        transition-all duration-500 ease-out
        ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
        >
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#2D5016] mb-4.5">
            Built from direct operating experience
          </div>
        

          <div className="bg-[#22160B] rounded-lg px-8 pt-6.5 pb-5.5 max-[760px]:px-5.5 max-[760px]:pt-5.5 max-[760px]:pb-4.5">
            <div
              className="w-full"
              role="region"
              aria-roledescription="carousel"
              aria-label="Bespoke proof examples"
            >
              <div
                className="min-h-47.5 max-[760px]:min-h-62.5 transition-opacity duration-200 ease-out"
                id="proofPanel"
                aria-live="polite"
              >
                <div
                  className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-3.5"
                  id="proofCategory"
                >
                  {activeSlide.category}
                </div>
                <p
                  className="font-['Cormorant_Garamond',serif] font-medium text-xl leading-[1.38] text-white max-w-195 max-[760px]:max-w-full mb-3.5 [&_.proof-num]:text-[#A6C384] [&_.proof-num]:font-semibold"
                  id="proofStatement"
                  dangerouslySetInnerHTML={{ __html: activeSlide.statement }}
                />
                <p
                  className="text-[14.5px] font-light leading-[1.65] text-white/68 max-w-195 max-[760px]:max-w-full mb-4"
                  id="proofDesc"
                >
                  {activeSlide.desc}
                </p>
                <div
                  className="text-[11px] font-semibold tracking-[0.06em] uppercase text-white/48"
                  id="proofMeta"
                >
                  {activeSlide.meta}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="w-7.5 h-7.5 rounded-full flex items-center justify-center bg-white/8 text-white text-[13px] transition-colors duration-150 ease-out hover:bg-[#A6C384]/20 hover:text-[#A6C384] disabled:opacity-[0.28] disabled:cursor-default disabled:pointer-events-none"
                  id="proofPrev"
                  aria-label="Previous case study"
                  disabled={isPrevDisabled}
                  onClick={handlePrevClick}
                  onKeyDown={handlePrevKeyDown}
                >
                  ←
                </button>
                <div
                  className="text-[11px] font-semibold tracking-[0.06em] text-white/48 tabular-nums"
                  id="proofIndicator"
                >
                  {pad(slideIdx + 1)} / {pad(total)}
                </div>
                <button
                  type="button"
                  className="w-7.5 h-7.5 rounded-full flex items-center justify-center bg-white/8 text-white text-[13px] transition-colors duration-150 ease-out hover:bg-[#A6C384]/20 hover:text-[#A6C384] disabled:opacity-[0.28] disabled:cursor-default disabled:pointer-events-none"
                  id="proofNext"
                  aria-label="Next case study"
                  disabled={isNextDisabled}
                  onClick={handleNextClick}
                  onKeyDown={handleNextKeyDown}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
