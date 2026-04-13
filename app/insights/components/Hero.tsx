"use client";
import { motion } from "motion/react";

export default function InsightsHero() {
  return (
    <section className="relative overflow-hidden border-b border-ash bg-cream px-6 md:px-12 pt-30 pb-14">
      
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* soft radial fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(94,137,50,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-245">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label mb-4 text-sm uppercase"
        >
          Insights
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-[clamp(36px,4.5vw,58px)] font-light leading-[1.05] text-ink mb-5 max-w-405"
        >
          Healthcare talent intelligence <br />
          and{" "}
          <em className="italic relative text-forest-mid">
            hiring resources.
            <span className="absolute left-0 bottom-0 w-full h-1.5 bg-forest-mid/10 rounded-full -z-10" />
          </em>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-140 text-base font-light leading-[1.75] text-ink-soft"
        >
          Data from the Vetted registry, analysis on healthcare staffing
          trends, and practical guides for employers and professionals.
        </motion.p>
      </div>
    </section>
  );
}