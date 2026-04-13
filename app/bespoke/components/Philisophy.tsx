"use client";
import { motion } from "motion/react";

export default function Philosophy() {
  return (
    <section className="relative border-b border-white/10 bg-ink px-6 md:px-12 py-22 overflow-hidden">
      
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(143,184,106,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-175 text-center">
        
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-[13px] font-medium uppercase tracking-widest text-white/40"
        >
          Beverly George
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 font-serif text-[clamp(26px,3.5vw,44px)] font-light leading-[1.2] text-white"
        >
          Six years placing healthcare professionals taught me one thing
          clearly:{" "}
          <em className="not-italic text-[#8fb86a] relative">
            most hiring problems aren&apos;t about candidates.
            {/* subtle highlight */}
            <span className="absolute left-0 bottom-0 w-full h-1.5 bg-[#8fb86a]/10 rounded-full -z-10" />
          </em>
        </motion.h2>

        {/* Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-base font-light leading-[1.75] text-white/60">
            They&apos;re about the absence of a system that people can actually follow
            under pressure.
          </p>

          <p className="text-base font-light leading-[1.75] text-white/60">
            I built Vetted to give employers better access to verified talent. I
            offer this consulting practice because access alone isn&apos;t enough —
            you also need a clear process for what you do once you have it.
          </p>

          <p className="text-base font-light leading-[1.75] text-white/60">
            Both things matter. I work on both.
          </p>
        </motion.div>
      </div>
    </section>
  );
}