export default function HowProfessionsDual() {
  return (
    <>
      <section
        id="how"
        className="reveal bg-white px-12 pb-16 pt-20 max-[860px]:px-5 max-[860px]:pb-17.5 max-[860px]:pt-16"
      >
        <div className="mx-auto max-w-280">
          <div className="mx-auto max-w-155 px-8 pb-12 text-center">
            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-forest">
              How it works
            </div>
            <h2 className="mb-3 font-serif text-[clamp(28px,3.4vw,38px)] font-semibold leading-[1.2] text-ink">
              <span className="font-semibold text-forest">Set it up once.</span>{" "}
              Let it work in the background.
            </h2>
            <p className="text-[15.5px] font-light leading-[1.6] text-ink-soft">
              Your experience, preferences and availability — all captured in
              one professional profile for healthcare employers to search.
            </p>
          </div>

          <div className="grid grid-cols-3 rounded-[18px] border border-ash bg-cream p-10 max-[860px]:grid-cols-1 max-[860px]:gap-7.5 max-[860px]:px-7.5 max-[860px]:py-9">
            <div className="border-l border-ash px-7.5 first:border-l-0 max-[860px]:border-l-0 max-[860px]:border-t max-[860px]:px-0 max-[860px]:pt-6 max-[860px]:first:border-t-0 max-[860px]:first:pt-0">
              <div className="mb-3.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-forest-light font-mono text-xs font-bold text-forest">
                01
              </div>
              <h3 className="mb-2.25 font-serif text-xl font-semibold text-ink">
                Create your profile
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-ink-soft">
                Share your experience, credentials and the kinds of
                opportunities you are open to. That becomes the profile
                employers actually search against.
              </p>
            </div>
            <div className="border-l border-ash px-7.5 first:border-l-0 max-[860px]:border-l-0 max-[860px]:border-t max-[860px]:px-0 max-[860px]:pt-6 max-[860px]:first:border-t-0 max-[860px]:first:pt-0">
              <div className="mb-3.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-forest-light font-mono text-xs font-bold text-forest">
                02
              </div>
              <h3 className="mb-2.25 font-serif text-xl font-semibold text-ink">
                Keep it current
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-ink-soft">
                <b className="font-bold text-ink">Every 30 days,</b> we will ask
                you to confirm that your Registry profile is still current. It
                only takes a moment — confirm what is still accurate, update
                anything that is changed, and stay discoverable. If you do not
                confirm, your Registry profile is hidden until you do.
              </p>
            </div>
            <div className="border-l border-ash px-7.5 first:border-l-0 max-[860px]:border-l-0 max-[860px]:border-t max-[860px]:px-0 max-[860px]:pt-6 max-[860px]:first:border-t-0 max-[860px]:first:pt-0">
              <div className="mb-3.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-forest-light font-mono text-xs font-bold text-forest">
                03
              </div>
              <h3 className="mb-2.25 font-serif text-xl font-semibold text-ink">
                Let employers find you
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-ink-soft">
                Employers search for professionals who match what they need.
                When one wants to reach you, Vetted&apos;s Reveal shares your
                identity then — not before.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-140 border-t-[1.5px] border-[rgba(45,80,22,0.3)] pt-6.5 text-center">
            <div className="mb-2.5 flex items-center justify-center gap-2 text-[12.5px] font-bold uppercase tracking-widest text-forest">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.75 w-3.75 shrink-0"
              >
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              A quick note about staying discoverable
            </div>
            <p className="inline-block max-w-full rounded-2.5 bg-[#faf6ef] px-6.5 py-3.5 text-sm leading-[1.64] text-ink">
              Vetted is built around current availability.{" "}
              <b className="font-bold text-forest underline decoration-[rgba(45,80,22,0.35)] underline-offset-[3px]">
                Every 30 days,
              </b>{" "}
              we will ask you to reconfirm your Registry profile so employers
              know the professionals they are finding are still open to
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HEALTHCARE PROFESSIONS / BREADTH ================= */}
      <section
        id="professions"
        className="reveal bg-white px-12 pb-26 max-[860px]:px-5 max-[860px]:pb-19"
      >
        <div className="mx-auto max-w-260">
          <div className="mx-auto max-w-155 px-8 pb-9 text-center">
            <div className="mb-4.5 text-3.25 font-bold uppercase tracking-[0.07em] text-forest">
              Join Ontario&apos;s healthcare workforce on Vetted
            </div>
            <p className="text-[15.5px] font-light leading-[1.6] text-ink-soft">
              Build your professional presence alongside healthcare
              professionals working across long-term care, clinics, community
              care, hospitals and more.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-x-10 gap-y-11 border-t border-ash pt-7 max-[860px]:grid-cols-2 max-[860px]:gap-x-7 max-[860px]:gap-y-9 max-[520px]:grid-cols-1 max-[520px]:gap-7.5">
            <div>
              <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.07em] text-forest">
                Clinical nursing
              </div>
              <ul className="list-none">
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Registered Nurse
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Registered Practical Nurse
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Nurse Practitioner
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.07em] text-forest">
                Care &amp; support
              </div>
              <ul className="list-none">
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Personal Support Worker
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Unregulated Care Provider
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Developmental Services Worker
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.07em] text-forest">
                Allied &amp; mental health
              </div>
              <ul className="list-none">
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Registered Social Worker
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Registered Social Service Worker
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Child &amp; Youth Care Practitioner
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.07em] text-forest">
                Operations &amp; care environment
              </div>
              <ul className="list-none">
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Medical Office Administrator
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Scheduling Coordinator
                </li>
                <li className="py-1.5 font-serif text-[17px] font-medium leading-[1.35] text-ink transition-colors duration-150 hover:text-forest">
                  Dietary Aide &amp; Cook
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/findwork"
              className="inline-flex items-center gap-1.75 border-b-[1.5px] border-[rgba(45,80,22,0.35)] pb-0.5 text-[13.5px] font-bold text-forest transition-[border-color,color,opacity] duration-150 hover:border-forest"
            >
              Explore all healthcare professions{" "}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= DIRECTORY + INDEPENDENT CONTRACTOR ================= */}
      <section className="reveal bg-white px-12 pb-26 max-[860px]:px-5 max-[860px]:pb-19">
        <div className="mx-auto grid max-w-270 grid-cols-2 gap-5.5 max-[860px]:grid-cols-1">
          <div className="rounded-2xl border border-ash bg-cream px-9 py-9.5 max-[860px]:px-6.5 max-[860px]:py-8">
            <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.08em] text-forest">
              The Directory
            </div>
            <h3 className="mb-3.25 font-serif text-[clamp(22px,2.2vw,26px)] font-semibold leading-[1.2] text-ink">
              A standing presence, not a job hunt.
            </h3>
            <p className="mb-5 max-w-95 text-[13.5px] leading-[1.62] text-ink-soft">
              Stay open to the right opportunity without actively searching.
              Employers can send you a structured opportunity first, and you
              decide whether you want to engage.
            </p>
            <a
              href="/directory"
              className="inline-flex items-center gap-1.75 border-b-[1.5px] border-[rgba(45,80,22,0.35)] pb-0.5 text-[13.5px] font-bold text-forest transition-[border-color,color,opacity] duration-150 hover:border-forest"
            >
              Explore the Directory <span aria-hidden="true">→</span>
            </a>
          </div>

          <div
            id="ic"
            className="rounded-2xl bg-ink px-9 py-9.5 text-white max-[860px]:px-6.5 max-[860px]:py-8"
          >
            <div className="mb-3.75 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#B9D8A0]">
              Independent contractors
            </div>
            <h3 className="mb-3.25 font-serif text-[clamp(22px,2.2vw,26px)] font-semibold leading-[1.2]">
              Your own practice. Your own availability.
            </h3>
            <p className="mb-5 max-w-95 text-[13.5px] leading-[1.62] text-white/72">
              If you work independently, your profile can reflect that — so
              employers looking for contract or short-notice coverage understand
              how you work before they reach out.
            </p>
            <ul className="mb-5.5 list-none">
              <li className="flex items-start gap-2.5 border-t border-white/12 py-2.5 text-[12.5px] text-white/88 first:border-t-0 first:pt-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-[#B9D8A0]"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                Minimum notice window — from same-day to a few weeks, your
                choice
              </li>
              <li className="flex items-start gap-2.5 border-t border-white/12 py-2.5 text-[12.5px] text-white/88 first:border-t-0 first:pt-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-[#B9D8A0]"
                >
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M4 11h16" />
                </svg>
                One-off shifts or ongoing contracts — whichever suits you
              </li>
              <li className="flex items-start gap-2.5 border-t border-white/12 py-2.5 text-[12.5px] text-white/88 first:border-t-0 first:pt-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-[#B9D8A0]"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Liability insurance — self-attested
              </li>
            </ul>
            <a
              href="#join"
              className="inline-flex items-center gap-1.75 border-b-[1.5px] border-white/40 pb-0.5 text-[13.5px] font-bold text-white transition-[border-color,color,opacity] duration-150 hover:border-white"
            >
              Join as an Independent Contractor{" "}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
