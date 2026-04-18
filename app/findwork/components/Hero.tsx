"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative flex items-center min-h-[75vh] pt-16 overflow-hidden bg-[#faf9f6]">
      {/* Orb */}
      <div className="absolute -top-20 -right-40 w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#2D5016] mb-6"
        >
          <span className="w-6 h-px bg-[#2D5016]" />
          Ontario curated registry
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-7xl font-light leading-[1.05] text-[#1a1a18] max-w-3xl mb-6"
        >
          Work that <span className="italic text-[#2D5016]">finds you.</span>
          <br />
          Across all of Ontario.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-base md:text-lg text-[#6b6b64] max-w-xl leading-relaxed mb-10"
        >
          One verified profile. No applications. No agencies. When employers
          across Ontario are looking for your role, your credentials, your
          experience — they come to you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/join"
            className="px-7 py-4 bg-[#2D5016] text-white rounded-lg text-sm font-medium border border-[#2D5016] hover:bg-[#3d6b1f] hover:-translate-y-px transition-all shadow-md hover:shadow-xl"
          >
            Join the Registry →
          </Link>

          <Link
            href="/candidate"
            className="px-6 py-4 border border-[#e2e4dc] text-[#6b6b64] rounded-lg text-sm hover:text-[#1a1a18] hover:border-[#3a3a36] transition"
          >
            How it works
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-[#e2e4dc]"
        >
          {[
            { num: "40+", label: "Healthcare roles covered" },
            { num: "45+", label: "Ontario cities & regions" },
            { num: "$0", label: "Cost to candidates" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-serif text-3xl text-[#1a1a18]">
                {stat.num}
              </div>
              <div className="text-xs text-[#6b6b64] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
