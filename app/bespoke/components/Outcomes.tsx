"use client";
import { motion } from "motion/react";

const steps = [
  "Identify where your pipeline is breaking down",
  "Restructure how candidates are screened and prioritised",
  "Define a clear, role-specific hiring workflow",
  "Align your team on decision-making and evaluation",
  "Remove bottlenecks slowing down hiring",
  "Transition full ownership to your internal team",
];

export default function Outcomes() {
  return (
    <section className="border-b border-ash bg-white px-6 md:px-12 py-22">
      <div className="mx-auto grid max-w-245 grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label mb-5 uppercase text-xs text-forest"
          >
            What you leave with
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-[clamp(26px,3vw,40px)] font-light leading-[1.1] text-ink mb-5"
          >
            A process your team can move through with{" "}
            <em className="text-ink not-italic relative">
              speed and confidence.
              <span className="absolute left-0 bottom-0 w-full h-1.5 bg-ink/10 rounded-full -z-10" />
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-light leading-[1.75] text-ink-soft max-w-105"
          >
            In the first phase I focus on immediate clarity. Then I build and
            hand off. My goal is your independence — not your reliance on me.
          </motion.p>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col gap-5">
          {/* subtle vertical line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-ash" />

          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative flex items-start gap-4 group"
            >
              {/* Number */}
              <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-forest-light bg-forest-pale text-[11px] font-semibold text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                {i + 1}
              </div>

              {/* Text */}
              <div className="pt-1 text-sm font-light leading-[1.65] text-ink">
                {item}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
