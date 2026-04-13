"use client";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ash bg-cream px-6 md:px-12 pt-41 pb-20">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-195">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label mb-5"
        >
          Beverly George · Consulting Practice
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-[clamp(40px,5vw,68px)] font-light leading-[1.05] text-ink mb-7"
        >
          I help teams build <br />
          hiring systems that actually{" "}
          <em className="text-forest not-italic">work.</em>
        </motion.h1>

        {/* Paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4 max-w-155 text-lg font-light leading-[1.75] text-ink-soft"
        >
          This is my consulting practice — separate from the Vetted platform,
          and built on six years of placing healthcare professionals across
          Ontario.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10 max-w-155 text-lg font-light leading-[1.75] text-ink-soft"
        >
          I work directly with your team — not as a recruiter, but as someone
          who designs the system behind your hiring so your team can run it with
          clarity and speed.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
        >
          Work with me →
        </motion.a>
      </div>
    </section>
  );
}
