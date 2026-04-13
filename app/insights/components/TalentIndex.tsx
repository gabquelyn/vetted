"use client";
import { motion } from "motion/react";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const stats = [
  { num: "94%", label: "of Vetted profiles verified within the last 30 days" },
  { num: "18d", label: "median time from registry search to first contact" },
  { num: "3.2x", label: "more IC-tagged professionals added in Q1 vs Q4 2025" },
  { num: "67%", label: "of PSW searches filtered for short-notice availability" },
];

export default function TalentIndex() {
  return (
    <section className="border-b border-ash bg-white px-6 md:px-12 py-16">
      <div className="mx-auto max-w-245">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.09em] text-forest">
              Vetted Healthcare Talent Index
            </div>
            <div className="font-serif text-[22px] font-light text-ink">
              Q1 2026 — Ontario & British Columbia
            </div>
          </div>

          <div className="rounded-lg border border-ash bg-cream px-4 py-2 text-[11px] font-light text-ink-soft">
            Updated quarterly · Based on active Vetted registry data
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl border border-ash bg-white px-5 py-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-forest/5 to-transparent rounded-xl" />

              <div className="relative font-serif text-[34px] font-light text-forest leading-none mb-2">
                {num}
              </div>

              <p className="relative text-[12px] font-light leading-normal text-ink-soft">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-4 rounded-xl bg-cream px-5 py-4 border border-ash"
        >
          {/* icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-light bg-forest-pale text-forest shrink-0">
            <HiOutlineInformationCircle size={16} />
          </div>

          {/* text */}
          <p className="text-[13px] font-light leading-[1.65] text-ink-soft">
            The Vetted Talent Index draws from anonymised activity data within
            the Vetted registry. It is updated quarterly and reflects verified,
            active profiles only — not job postings, applications, or inactive
            accounts. Data covers Ontario and British Columbia for Q1 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}