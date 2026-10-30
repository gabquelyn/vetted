'use client'
import type { ReactNode } from "react";
import { motion } from "motion/react";

/*
  Registry intro + hiring options. Same token map as RegistrySection:
    forest #2d5016 · forest-deep #16260c · forest-light #e8f0e0
    ink #1a1a18 · ink-soft #5c5c58 · ink-faint #8a8a84 · border #e5e2da · amber #b8722c
*/

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const BoltIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

export default function RegistryHiringOptions() {
  return (
    <section id="urgent" className="bg-gradient-to-b from-[#2d5016]/5 to-[#2d5016]/[0.08] pb-[96px] pt-24 font-['DM_Sans',sans-serif] text-[#1a1a18] antialiased">
      {/* head */}
      <Reveal className="mx-auto max-w-[680px] px-8 pb-14 text-center">
        <div className="mb-4 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#2d5016]">The Registry</div>
        <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.2]">
          From a hiring need to a shortlist,{" "}
          <span className="font-semibold italic text-[#2d5016]">in minutes.</span>
        </h2>
        <p className="text-base leading-[1.6] text-[#5c5c58]">
          A clearer way to find healthcare talent. Explore professionals across Ontario with the information you need
          upfront — experience, availability, work preferences and more — so you can focus on the people who make sense
          for your role <b>without the resume pile.</b>
        </p>
      </Reveal>

      {/* cards */}
      <Reveal className="mx-auto max-w-[1040px] px-8">
        <div className="grid grid-cols-1 items-stretch gap-[22px] min-[861px]:grid-cols-2">
          {/* Urgent Hiring — dark forest card */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#16260c] p-8 text-white shadow-[0_18px_44px_rgba(28,52,16,0.18)]">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#b9d8a0]">
                <BoltIcon />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#b9d8a0]">Urgent Hiring</span>
            </div>
            <h3 className="mb-3 font-['Cormorant_Garamond',serif] text-[28px] font-semibold leading-[1.2]">
              Need to hire someone by tomorrow?
            </h3>
            <p className="mb-6 text-[14.5px] leading-[1.65] text-white/70">
              Create an Urgent Post. Healthcare professionals who meet your selected criteria are notified right away by
              text and email. Responses appear together for you to review and sort. Set your hiring timeline — ASAP, a
              specific start date, or particular shifts when needed.
            </p>
            <div className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#f2c879]/40 bg-black/25 px-3.5 py-2 text-[12px] font-bold text-[#f2c879]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#f2c879]" />
              2 Urgent Posts included every month
            </div>
          </article>

          {/* Flexible Hiring — light card */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[#e9e9e6] bg-white p-8 shadow-[0_14px_30px_rgba(20,20,18,0.06)]">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f0e0] text-[#2d5016]">
                <BriefcaseIcon />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#2d5016]">Flexible Hiring</span>
            </div>
            <h3 className="mb-3 font-['Cormorant_Garamond',serif] text-[28px] font-semibold leading-[1.2] text-[#1a1a18]">
              Independent Contractors
            </h3>
            <p className="text-[14.5px] leading-[1.65] text-[#5c5c58]">
              Find professionals who indicate they work independently and are open to single shifts or short contracts —
              then contact and contract with them directly.
            </p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}