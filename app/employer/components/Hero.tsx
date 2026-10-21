"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-20 font-['DM_Sans',sans-serif] text-ink antialiased before:pointer-events-none before:absolute before:-right-55 before:-top-50 before:h-170 before:w-170 before:rounded-full before:bg-[radial-gradient(circle,rgba(45,80,22,0.09),transparent_68%)] before:content-[''] sm:px-8 sm:pt-28 sm:pb-24 xl:px-12">
      <div className="relative z-1 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
        {/* Copy */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2.25 text-[10px] font-semibold uppercase tracking-widest text-forest before:h-px before:w-4 before:shrink-0 before:bg-forest before:content-[''] sm:mb-5 sm:text-[11.5px]">
            For Ontario Healthcare Employers
          </div>

          <h1 className="mb-5 font-['Cormorant_Garamond',serif] text-[clamp(36px,7vw,58px)] font-medium leading-[1.08] tracking-[-0.01em] text-ink sm:leading-[1.14]">
            Find healthcare professionals to fit{" "}
            <span className="font-semibold italic text-forest">your role.</span>
          </h1>

          <p className="mb-3.5 max-w-122.5 text-[15px] font-normal leading-[1.7] text-ink-soft sm:text-[16.5px] sm:leading-[1.65]">
            Search thousands of structured profiles across Ontario and compare
            what matters for the role — profession, clinical experience,
            availability, shifts and more.
          </p>

          <p className="mb-7 max-w-117.5 text-[13.5px] font-normal leading-[1.7] text-[#8a8a84] sm:mb-8.5 sm:text-[14.5px] sm:leading-[1.65]">
            When the need is urgent, send a targeted request to professionals
            who meet your selected criteria.
          </p>

          <div className="flex flex-col items-stretch gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center sm:gap-3.5">
            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center gap-2.25 rounded-full border-none bg-forest px-5 py-3 text-sm font-bold text-white no-underline transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#3d6b1f] hover:shadow-[0_14px_30px_rgba(45,80,22,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-6.5 sm:py-3.75 sm:text-base"
            >
              Get Employer Early Access <span>→</span>
            </a>

            <Link
              href="/demo"
              className="inline-flex min-h-12 items-center justify-center gap-2.25 rounded-full border border-ash bg-white px-5 py-3 text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:border-forest hover:text-forest sm:px-6.5 sm:py-3.75 sm:text-base"
            >
              Try the Registry
            </Link>
          </div>
        </div>

        {/* Registry preview */}
        <div className="relative order-first flex min-w-0 justify-center before:pointer-events-none before:absolute before:-inset-5 before:bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(45,80,22,0.08),transparent_72%)] before:content-[''] sm:before:-inset-7.5 lg:order-none">
          <div className="relative z-1 w-full min-w-0 max-w-140 translate-y-3.5 animate-[heroFrameIn_0.7s_0.15s_cubic-bezier(0.2,0.7,0.3,1)_forwards]">
            <div className="rounded-2xl border border-ash bg-white p-4 shadow-[0_24px_60px_rgba(28,52,16,0.12)] sm:rounded-[20px] sm:px-5.5 sm:py-6 sm:shadow-[0_40px_90px_rgba(28,52,16,0.14)]">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.06em] text-forest sm:text-[10.5px]">
                Hiring for
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {[
                  "Medical Office Assistant",
                  "Evenings",
                  "Casual",
                  "Etobicoke",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="max-w-full rounded-full bg-[#e8f0e0] px-2.5 py-1.25 text-[10px] font-semibold leading-relaxed text-forest sm:text-[12.5px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex items-center gap-3 border-b border-ash pb-4 sm:mb-4.5 sm:pb-4.5">
                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                  <svg
                    className="block max-w-full"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <span className="font-mono text-xl font-bold text-ink sm:text-[21px]">
                    8
                  </span>{" "}
                  <span className="text-xs leading-relaxed text-ink-soft sm:text-[12.5px]">
                    professionals match your criteria
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: "MOA-052", meta: "Etobicoke, ON · Immediate" },
                  { id: "MOA-114", meta: "Mississauga, ON · Immediate" },
                  { id: "MOA-098", meta: "Brampton, ON · Immediate" },
                ].map((r) => (
                  <div
                    key={r.id}
                    className="flex min-w-0 items-start gap-2.5 rounded-[11px] border border-ash bg-[#faf9f6] px-2.5 py-3 sm:items-center sm:px-3"
                  >
                    <div className="mt-1 h-1.75 w-1.75 shrink-0 rounded-full bg-forest-mid shadow-[0_0_6px_rgba(34,197,94,0.5)] sm:mt-0" />

                    <div className="w-15.5 shrink-0 font-mono text-[10px] font-bold text-ink sm:text-[11.5px]">
                      {r.id}
                    </div>

                    <div className="min-w-0 flex-1 text-[10px] leading-relaxed text-ink-soft sm:text-[11px]">
                      {r.meta}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
