"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const CG = Cormorant_Garamond({
  weight: ["300","700"],
});
const painPoints = [
  {
    num: "01",
    title: "Filters that don't filter",
    desc: "You search for one role, you get another. Relocation-ready candidates who moved back months ago. Keyword-matched profiles that miss the point entirely. Dirty data in, noise out.",
  },
  {
    num: "02",
    title: "No opt-in. No intent.",
    desc: "Most sourcing platforms surface people who uploaded a resume two years ago for a different job. They weren't expecting your call — which is exactly why they don't pick up.",
  },
  {
    num: "03",
    title: "Stale profiles, no signal",
    desc: "A profile from last week looks identical to one from 18 months ago. No freshness indicator. No way to know if they're still open. You find out when they don't respond.",
  },
];

export default function ProblemSection() {
  return (
    <section id="the-problem" className="px-6 md:px-[15%] py-28">
      {/* TOP GRID */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
        {/* LEFT */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-forest mb-5">
            The Problem
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-[clamp(32px,3.5vw,48px)] leading-[1.1] font-light text-ink"
          >
            Sourcing tools <br />
            built for volume <br />
            <em className="italic text-forest">fail at signal.</em>
          </motion.h2>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <p className="text-base font-light leading-relaxed text-ink-soft mb-5">
            Most platforms flood you with profiles. Finding the right one —
            someone actually available, actually qualified, actually expecting
            your call — takes hours you do not have.
          </p>
          <p className="text-base font-light leading-relaxed text-ink-soft">
            That is the gap Vetted fills.
          </p>
        </motion.div>
      </div>

      {/* PAIN GRID */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid md:grid-cols-3 gap-px bg-ash border-ash border rounded-xl overflow-hidden"
      >
        {painPoints.map((item, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -6,
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}
            className="p-8 bg-white"
          >
            <div
              className={`text-7xl font-thin text-forest-mid/10 mb-5 ${CG.className}`}
            >
              {item.num}
            </div>

            <div className="text-sm font-semibold text-ink mb-2">
              {item.title}
            </div>

            <p className="text-sm text-ink-soft leading-relaxed font-light">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CONSEQUENCE BOX */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 bg-ink rounded-2xl px-8 py-10 text-center"
      >
        <div className="font-serif text-xl font-light text-white leading-snug mb-6">
          The right professionals are out there. <br />
          They are just not <em className="italic text-[#8fb86a]">looking</em> —
          they are waiting <br />
          to be found by someone who knows where to look.
        </div>

        <Link
          href="#eLinkrly-access"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
          bg-[#2D5016] text-white text-sm font-medium border border-[#2D5016]
          hover:bg-[#3d6b1f] hover:-translate-y-px 
          hover:shadow-[0_8px_24px_rgba(45,80,22,0.4)]
          transition-all"
        >
          Find them on Vetted →
        </Link>
      </motion.div>
    </section>
  );
}
