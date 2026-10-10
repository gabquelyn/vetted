"use client";

export default function Hero({ onTryRegistry }: { onTryRegistry: () => void }) {
  return (
    <section className="relative overflow-hidden px-12 pt-28 pb-24 font-['DM_Sans',sans-serif] text-ink antialiased before:pointer-events-none before:absolute before:-right-55 before:-top-50 before:h-170 before:w-170 before:rounded-full before:bg-[radial-gradient(circle,rgba(45,80,22,0.09),transparent_68%)] before:content-[''] max-[600px]:px-5 max-[600px]:pt-20 max-[600px]:pb-16">
      <div className="relative z-1 mx-auto grid max-w-7xl grid-cols-[1.05fr_0.95fr] items-center gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-13">
        {/* ---------- copy ---------- */}
        <div>
          <div className="mb-5 flex items-center gap-2.25 text-[11.5px] font-semibold uppercase tracking-widest text-forest before:h-px before:w-4 before:bg-forest before:content-['']">
            For Ontario Healthcare Employers
          </div>

          <h1 className="mb-5.5 font-['Cormorant_Garamond',serif] text-[clamp(36px,4.3vw,58px)] font-medium leading-[1.14] tracking-[-0.01em] text-ink">
            Find healthcare professionals
            <br />
            to fit{" "}
            <span className="font-semibold italic text-forest">your role.</span>
          </h1>

          <p className="mb-3.5 max-w-122.5 text-[16.5px] font-normal leading-[1.65] text-ink-soft">
            Search thousands of structured profiles across Ontario and compare
            what matters for the role — profession, clinical experience,
            availability, shifts and more.
          </p>
          <p className="mb-8.5 max-w-117.5 text-[14.5px] font-normal leading-[1.65] text-[#8a8a84]">
            When the need is urgent, send a targeted request to professionals
            who meet your selected criteria.
          </p>

          <div className="flex flex-wrap gap-3.5 max-[600px]:flex-col max-[600px]:items-stretch">
            <a
              href="#pricing"
              className="inline-flex cursor-pointer items-center gap-2.25 rounded-full border-none bg-forest px-6.5 py-3.75 text-3.5 font-bold text-white no-underline transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#3d6b1f] hover:shadow-[0_14px_30px_rgba(45,80,22,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Get Employer Early Access <span>→</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTryRegistry();
              }}
              className="inline-flex items-center gap-2.25 rounded-full border border-ash bg-white px-6.5 py-3.75 text-3.5 font-semibold text-ink no-underline transition-colors duration-200 hover:border-forest hover:text-forest"
            >
              Try the Registry
            </a>
          </div>
        </div>

        {/* ---------- visual ---------- */}
        <div className="relative flex justify-center before:pointer-events-none before:absolute before:-inset-7.5 before:bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(45,80,22,0.08),transparent_72%)] before:content-[''] max-[960px]:-order-1">
          <div className="relative z-1 w-full max-w-140 translate-y-3.5 animate-[heroFrameIn_0.7s_0.15s_cubic-bezier(0.2,0.7,0.3,1)_forwards] max-[960px]:max-w-75">
            <div className="rounded-[20px] border border-ash bg-white px-4.5 py-6 shadow-[0_40px_90px_rgba(28,52,16,0.14)]">
              <div className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.06em] text-forest">
                Hiring for
              </div>

              <div className="mb-5 flex flex-nowrap gap-1 max-[1000px]:flex-wrap">
                {[
                  "Medical Office Assistant",
                  "Evenings",
                  "Casual",
                  "Etobicoke",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="shrink-0 whitespace-nowrap rounded-full bg-[#e8f0e0] px-2.25 py-1.25 text-[12.5px] font-semibold text-forest max-[1000px]:whitespace-normal"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mb-4.5 flex items-center gap-3 border-b border-ash pb-4.5">
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
                <div>
                  <span className="font-mono text-[21px] font-bold text-ink">
                    8
                  </span>{" "}
                  <span className="text-[12.5px] text-ink-soft">
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
                    className="flex items-center gap-2.5 rounded-[11px] border border-ash bg-[#faf9f6] px-3 py-2.5"
                  >
                    <div className="h-1.75 w-1.75 shrink-0 rounded-full bg-forest-mid shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                    <div className="w-15.5 shrink-0 font-mono text-[11.5px] font-bold text-ink">
                      {r.id}
                    </div>
                    <div className="flex-1 text-[11px] text-ink-soft">
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
