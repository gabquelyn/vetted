"use client";

import { motion } from "motion/react";

export default function FounderNote() {
  return (
    <section className="border-y border-ash bg-white px-6 md:px-12 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-sm leading-relaxed text-ink-soft"
        >
          Built by a healthcare recruiter with 6 years placing PSWs, RNs,
          and clinic staff across Ontario. Vetted exists because every
          existing tool was built for volume — not signal.
        </motion.p>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {/* Avatar placeholder */}
          <div className="h-9 w-9 rounded-full bg-forest/10 flex items-center justify-center text-xs font-medium text-forest">
            BG
          </div>

          <div className="text-xs text-ink-soft">
            <span className="block font-medium text-ink">
              Beverly George
            </span>
            Founder
          </div>
        </motion.div>
      </div>
    </section>
  );
}