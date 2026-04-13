"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-2 pt-16 relative">
      {/* EMPLOYER */}

      <div className="group relative flex flex-col justify-center px-16 py-20 min-h-[calc(100vh-64px)] cursor-pointer overflow-hidden bg-ink border-r border-white/10">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(45,80,22,0.3)_0%,transparent_70%)]" />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-7 text-[11px] uppercase tracking-[0.14em] text-white/40"
        >
          <span className="w-6 h-px bg-white/30" />
          For Employers
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif text-[clamp(38px,4.5vw,58px)] font-light leading-[1.1] mb-6 tracking-[-0.01em] text-white"
        >
          The right hire <br />
          isn&apos;t in your <br />
          <em className="italic text-[#8fb86a]">inbox.</em>
        </motion.h1>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[15px] font-light leading-[1.65] mb-11 max-w-95 text-white/55"
        >
          Stop waiting for applications. Browse a curated registry of verified
          professionals and pay only when you want to connect.
        </motion.p>

        {/* CTA */}
        <Link href="/employer">
          <motion.p
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.75 rounded-lg text-sm font-medium bg-forest text-white border border-forest shadow-none hover:shadow-[0_8px_24px_rgba(45,80,22,0.4)] hover:bg-[#3d6b1f] transition-all"
          >
            I&apos;m Hiring →
          </motion.p>
        </Link>
        {/* Bottom badges */}
        {/* <div className="flex flex-col gap-1 absolute">
          {[
            "No placement fees",
            "Verified profiles only",
            "Pay only to connect",
          ].map((text) => (
            <div
              key={text}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/60 border border-white/10"
            >
              {text}
            </div>
          ))}

          <Link href="/employer#short-notice">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
              ⚡ Short-notice & IC filter
            </div>
          </Link>
        </div> */}
      </div>

      {/* CENTER BADGE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-ash bg-cream font-garamond text-lg font-semibold text-ink tracking-wide">
          V
        </div>
      </div>

      {/* CANDIDATE */}

      <div className="group relative flex flex-col justify-center px-16 py-20 min-h-[calc(100vh-64px)] cursor-pointer overflow-hidden bg-cream">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(45,80,22,0.08)_0%,transparent_70%)]" />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-2 mb-7 text-[11px] uppercase tracking-[0.14em] text-ink-soft"
        >
          <span className="w-6 h-px bg-ink-soft" />
          For Professionals
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-serif text-[clamp(38px,4.5vw,58px)] font-light leading-[1.1] mb-6 tracking-[-0.01em] text-ink"
        >
          Let the right <br />
          employers find <br />
          <em className="italic text-forest">you.</em>
        </motion.h1>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-[15px] font-light leading-[1.65] mb-11 max-w-95 text-ink-softbg-ink-soft"
        >
          Join the registry once. Stay verified. Get discovered by employers
          looking for exactly your experience.
        </motion.p>

        {/* CTA */}
        <Link href="/candidate">
          <motion.p
            onClick={(e) => e.stopPropagation()}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.75 rounded-lg text-sm font-medium bg-ink text-white border border-ink hover:bg-ink-mid hover:shadow-[0_8px_24px_rgba(26,26,24,0.2)] transition-all"
          >
            Join the Registry →
          </motion.p>
        </Link>
        {/* Bottom badges */}
        {/* <div className="absolute bottom-16 left-16 flex flex-col gap-2.5">
          {[
            "No job hunting",
            "Profile stays private",
            "Employers come to you",
          ].map((text) => (
            <div
              key={text}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-forest-pale text-ink-softbg-ink-soft border border-ash"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8fb86a]" />
              {text}
            </div>
          ))}

          <a href="/candidate#independent-contractors">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-forest-pale text-forest border border-forest-light">
              ⚡ Independent contractors welcome
            </div>
          </a>
        </div> */}
      </div>
    </section>
  );
}
