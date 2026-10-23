"use client";
import Link from "next/link";
import React from "react";

export default function WayIn() {
  return (
    <div>
      {/* Transition heading */}
      <div className="max-w-360 mx-auto px-12 pt-32.5 pb-11 text-center">
        <div className="flex items-center justify-center gap-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-ink-soft mb-4.5">
          <span className="inline-block w-7 h-px bg-ink-soft" />
          Two ways in
          <span className="inline-block w-7 h-px bg-ink-soft" />
        </div>
        <h2 className="font-serif font-semibold text-[clamp(34px,4vw,48px)] leading-[1.18] text-ink mb-4">
          Whichever side you are on<br/>
          <em className="text-forest">Vetted meets you there.</em>
        </h2>
      </div>

      {/* Card frame */}
      <div className="max-w-360 mx-auto mb-25 px-12">
        <div className="rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(26,26,24,0.14)] relative">
          <section className="grid grid-cols-2 max-[860px]:grid-cols-1 relative">
            {/* EMPLOYER HALF */}
            <div className="group relative flex flex-col justify-center px-14 py-17.5] min-h-115 cursor-pointer transition-[background] duration-400 ease overflow-hidden max-[860px]:min-h-120 max-[860px]:px-8 max-[860px]:py-16 bg-ink border-r border-white/8 max-[860px]:border-r-0">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(ellipse_at_30%_50%,rgba(45,80,22,0.3)_0%,transparent_70%)]" />

              <div className="relative text-[11px] font-medium tracking-[0.14em] uppercase mb-7 flex items-center gap-2 text-white/40">
                <span className="inline-block w-6 h-px bg-white/30" />
                For Employers
              </div>

              <h1 className="relative font-serif text-[2rem] font-light leading-[1.1] mb-6 tracking-[-0.01em] text-white">
                Start finding healthcare <br /> professionals{" "}
                <em className="italic font-light text-[#8fb86a]">
                  differently.
                </em>
              </h1>

              <p className="relative text-[15px] font-light leading-[1.65] mb-11 max-w-95 text-white/55">
                Browse structured Ontario healthcare profiles, review the
                details that matter, and contact professionals directly. Use
                Vetted alongside your existing hiring channels — or instead of
                them.
              </p>

              <Link className="group/btn relative inline-flex items-center gap-2.5 px-7 py-3.75 rounded-lg text-sm font-medium tracking-[0.01em] no-underline transition-all duration-250 self-start bg-forest text-white border border-forest hover:bg-forest-light hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(45,80,22,0.4)]" href="/employer">
                Explore for Employers{" "}
                <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
                  →
                </span>
              </Link>

              <div className="relative mt-4 text-[12.5px] text-white/40">
                Employer workspace: $249/month or $2,490/year.
              </div>
            </div>

            {/* DIVIDER BADGE */}
            <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-0 max-[860px]:hidden">
              <div className="bg-cream border border-ash rounded-full w-12 h-12 flex items-center justify-center font-serif text-4.5 font-semibold text-ink tracking-[0.05em]">
                V
              </div>
            </div>

            {/* CANDIDATE HALF */}
            <div
              className="group relative flex flex-col justify-center px-14 py-17.5 min-h-115 cursor-pointer transition-[background] duration-400 ease overflow-hidden max-[860px]:min-h-120 max-[860px]:px-8 max-[860px]:py-16 bg-cream"
             
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(ellipse_at_70%_50%,rgba(45,80,22,0.08)_0%,transparent_70%)]" />

              <div className="relative text-[11px] font-medium tracking-[0.14em] uppercase mb-7 flex items-center gap-2 text-ink-soft">
                <span className="inline-block w-6 h-px bg-ink-soft" />
                For Professionals
              </div>

              <h1 className="relative font-serif text-[2rem] font-light leading-[1.1] mb-6 tracking-[-0.01em] text-ink">
                Let the right employers <br /> find {" "}
                <em className="italic font-light text-forest">you.</em>
              </h1>

              <p className="relative text-[15px] font-light leading-[1.65] mb-11 max-w-95 text-ink-soft">
                Join the Registry once. Keep your profile current. Get
                discovered by employers looking for your experience — without
                applying to every role.
              </p>

              <Link
                className="group/btn relative inline-flex items-center gap-2.5 px-7 py-3.75 rounded-lg text-sm font-medium tracking-[0.01em] no-underline transition-all duration-250 self-start bg-ink text-white border border-ink hover:bg-ink-mid hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(26,26,24,0.2)]"
                onClick={(e) => e.stopPropagation()}
                href="/professional"
              >
                Join the Registry{" "}
                <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
