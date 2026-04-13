"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function EmployerHero() {
  return (
    <section className="relative min-h-screen md:px-[15%] flex items-center px-6 pt-24 bg-ink overflow-hidden">
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none 
        bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-size-[60px_60px]"
      />

      {/* GLOW */}
      <div
        className="absolute -top-20 -right-20 w-100 h-100 rounded-full 
        bg-[radial-gradient(circle,rgba(45,80,22,0.25)_0%,transparent_70%)] 
        pointer-events-none"
      />

      {/* CONTENT */}
      <div className="relative z-10 md:max-w-4xl">
        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.14em] text-white/40 mb-6 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-white/30" />
          For Employers
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-[clamp(40px,5vw,64px)] font-light leading-[1.05] text-white mb-6 tracking-tight"
        >
          The right hire <br />
          was never in <br />
          your <em className="italic text-[#8fb86a]">inbox.</em>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] leading-relaxed text-white/55 md:max-w-xl mb-10"
        >
          The best professionals are not applying to job posts. They are already
          working. Vetted is where you find them — verified, available, and
          contactable directly.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <Link
            href="#early-access"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
            bg-[#2D5016] text-white text-sm font-medium border border-[#2D5016]
            hover:bg-[#3d6b1f] hover:-translate-y-px 
            hover:shadow-[0_8px_24px_rgba(45,80,22,0.4)]
            transition-all duration-200"
          >
            Get Employer Early Access →
          </Link>

          <Link
            href="#how-it-works"
            className="inline-flex items-center px-6 py-3 rounded-lg 
            border border-white/15 text-white/70 text-sm font-medium
            hover:bg-white/5 hover:text-white transition-all"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* SECONDARY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="#short-notice"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition"
          >
            Need short-notice or IC coverage?
            <span className="text-[#8fb86a] font-medium underline underline-offset-4">
              See the IC filter →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
