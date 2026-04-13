"use client";

import { motion } from "motion/react";

const stats = [
  {
    num: "10",
    span: "k",
    desc: "Pre-screened professionals already in the registry, built over 6 years of healthcare recruitment",
  },
  {
    num: "45",
    span: "d",
    desc: "Verification cycle — every profile is re-confirmed or hidden automatically",
  },
  {
    num: "$",
    span: "0",
    desc: "Placement fees. Ever. You pay to connect, not per hire",
  },
];

export default function WhatSection() {
  return (
    <section
      id="how-it-works"
      className="px-12 py-28 max-w-275 mx-auto grid md:grid-cols-2 gap-20 items-center"
    >
      {/* LEFT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {/* Label */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-forest mb-5"
        >
          What is vetted?
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="font-serif text-[clamp(32px,3.5vw,46px)] font-normal leading-[1.15] text-ink mb-6"
        >
          Not a job board. <br />
          Not a recruiter. <br />
          <em className="italic text-forest">A registry.</em>
        </motion.h2>

        {/* Text */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-[15px] font-light leading-[1.75] text-ink-soft mb-8"
        >
          Vetted is a curated talent registry. Employers browse verified
          professional profiles and pay only to unlock contact details. No job
          postings. No application floods. No agency fees.
        </motion.p>

        {/* List */}
        <motion.ul
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-col gap-3"
        >
          {[
            "Post a job and wait",
            "Pay placement fees per hire",
            "Filter unqualified applicants",
          ].map((item, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-3 text-sm text-ink-mid"
            >
              <span className="text-forest text-base">✕</span>
              <span className="line-through text-ink-soft font-light">
                {item}
              </span>
            </motion.li>
          ))}

          {/* Positive */}
          <motion.li
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex items-center gap-3 text-sm text-ink-mid"
          >
            <span className="text-forest text-base">✓</span>
            Browse. Filter. Unlock. Contact directly.
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="bg-ink rounded-2xl p-12 text-white"
      >
        {/* Label */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-[11px] tracking-[0.14em] uppercase text-white/40 mb-8"
        >
          Built on real experience
        </motion.div>

        {/* Stats */}
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`pb-8 mb-8 ${idx < 2 ? "border-b border-white/10" : ""}`}
          >
            <div className="font-serif text-5xl font-light leading-none mb-1">
              {stat.num}
              <span className="text-[#8fb86a]">{stat.span}</span>
            </div>

            <p className="text-[13px] text-white/50 font-light leading-relaxed">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
