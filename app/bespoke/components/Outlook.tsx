"use client";
import { motion } from "motion/react";

const weeks = [
  {
    week: "Week 1",
    title: "Diagnose, align, and clarify",
    desc: "I start by understanding how hiring is actually functioning today — not how it's documented. This usually involves conversations with whoever owns hiring in your organisation and a review of your current process.",
    tags: [
      "Review hiring workflow and team structure",
      "Identify inconsistencies and decision gaps",
      "Assess sourcing channels and bottlenecks",
      "Clarify role expectations and must-haves",
      "Identify team alignment gaps",
    ],
    close: "This phase removes the fog.",
  },
  {
    week: "Week 2",
    title: "Build the system and equip the team",
    desc: "I don't hand over a document and disappear. I build alongside your team so the system is actually usable from day one.",
    tags: [
      "Build role-specific hiring process",
      "Define screening and evaluation criteria",
      "Create candidate prioritisation frameworks",
      "Establish interview and decision standards",
      "Train internal team on how to operate within it",
    ],
    close: "This is where your team stops improvising and starts executing.",
  },
  {
    week: "Week 3+",
    title: "Implement, refine, and transition",
    desc: "I stay involved through early execution to make sure the system holds when it meets real candidates and real pressure.",
    tags: [
      "Support early-stage execution",
      "Refine workflows based on real candidate flow",
      "Introduce tracking and reporting structure",
      "Strengthen team consistency",
      "Hand full ownership to your team",
    ],
    close: "You own it. I'm available if you ever need me again.",
  },
];

export default function Outlook() {
  return (
    <section className="border-b border-ash bg-cream px-6 md:px-12 py-22">
      <div className="mx-auto max-w-195">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label mb-5 text-center"
        >
          How it works
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center font-serif text-[clamp(26px,3vw,40px)] font-light leading-[1.1] text-ink mb-12"
        >
          What working with me <br />
          actually{" "}
          <em className="text-forest not-italic relative">
            looks like.
            <span className="absolute left-0 bottom-0 w-full h-1.5 bg-forest/10 rounded-full -z-10" />
          </em>
        </motion.h2>

        {/* Timeline */}
        <div className="relative flex flex-col gap-8">
          {/* vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-ash" />

          {weeks.map(({ week, title, desc, tags, close }, i) => (
            <motion.div
              key={week}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              {/* timeline marker */}
              <div className="relative z-10 flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-forest text-xl font-serif text-white font-semibold shadow-sm">
                {i + 1}
              </div>

              {/* card */}
              <div className="group relative w-full rounded-2xl border border-ash bg-white p-6 md:p-7 transition-all duration-300 hover:shadow-xl">
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-forest/5 to-transparent rounded-2xl" />

                {/* header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-[11px] font-semibold text-forest">
                    {week}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-ink">
                    {title}
                  </h3>
                </div>

                {/* desc */}
                <p className="text-[14px] font-light leading-[1.7] text-ink-soft mb-4">
                  {desc}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-cream px-3 py-1 text-[12px] font-light text-ink border border-transparent group-hover:border-ash transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* close */}
                <p className="mt-4 text-[13px] italic font-medium text-forest">
                  {close}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
