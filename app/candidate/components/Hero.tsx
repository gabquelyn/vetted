"use client";
import { DBWithCluster } from "@/app/data/candidate";
import CandidateCard from "@/app/employer/components/CandidateCard";
import { motion } from "motion/react";
import { LuBookLock } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-25 min-h-screen items-center bg-cream px-6 md:px-[15%]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.015) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* label */}
        <div className="text-[11px] font-semibold uppercase tracking-widest text-forest mb-4">
          For Professionals
        </div>

        {/* headline */}
        <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-light leading-[1.05] text-ink mb-6">
          Be found <br />
          by the employers <br />
          worth <em className="text-forest not-italic">working for.</em>
        </h1>

        {/* subtext */}
        <p className="text-[15px] md:text-[16px] font-light leading-[1.75] text-ink-soft max-w-130 mb-6">
          You&apos;re qualified. You&apos;re experienced. But the right
          opportunities don&apos;t always find you — because the right employers
          aren&apos;t posting jobs, they&apos;re searching registries.
        </p>

        {/* note */}
        <div className="flex items-center gap-2 mb-8 text-[13px] text-ink-soft">
          <span className="h-2 w-2 rounded-full bg-forest" />
          Join once. Stay verified. Let employers come to you.
        </div>

        {/* buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#join"
            className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-white transition hover:shadow-lg hover:-translate-y-0.5"
          >
            Join the Registry →
          </a>

          <a
            href="#how-it-works"
            className="rounded-full border border-ash bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-cream"
          >
            See How It Works
          </a>
        </div>

        {/* IC link */}
        <div className="mt-6">
          <a
            href="#independent-contractors"
            className="inline-flex items-center gap-2 text-[13px] text-ink-soft"
          >
            <span>
              Independent contractor?{" "}
              <span className="text-forest font-medium underline underline-offset-4">
                See IC & short-notice tags →
              </span>
            </span>
          </a>
        </div>
      </motion.div>

      {/* RIGHT */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full relative max-w-105"
        >
          {/* floating glow */}
          <div className="absolute -inset-6 bg-[radial-gradient(circle_at_top,rgba(94,137,50,0.2),transparent_60%)] blur-2xl" />
          {/* card */}

          <div className="w-80">
            <CandidateCard
              c={DBWithCluster[0]}
              onUnlock={() => {}}
              toggleCompare={() => {}}
            />
          </div>
          <div className="absolute right-0 w-80 top-4">
            <CandidateCard
              c={DBWithCluster[2]}
              onUnlock={() => {}}
              toggleCompare={() => {}}
            />
          </div>
          <p className="mt-12 text-center text-ink-soft font-serif text-sm italic flex gap-2 items-center justify-center">
            <span>
              <LuBookLock />
            </span>{" "}
            You stay private until an employer unlocks you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
