"use client";
import { motion } from "motion/react";

const steps = [
  {
    num: "01",

    title: "Browse the Registry",
    desc: "Filter by role, location, experience, availability, and more. Every profile is structured for fast comparison — no resume pile to sort through.",
  },
  {
    num: "02",

    title: "Preview Before You Pay",
    desc: "See credentials, years of experience, availability, and last verified date before spending a credit. You decide who's worth unlocking.",
  },
  {
    num: "03",

    title: "Unlock & Contact Directly",
    desc: "Use a credit to reveal full contact details, resume, and profile. Reach out directly — no middleman, no placement fee, no delays.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-[15%] py-24 bg-forest-pale">
      <div className="max-w-275 mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-forest mb-4">
            How It Works
          </div>

          <h2 className="font-serif text-[clamp(32px,3.5vw,46px)] font-normal leading-[1.15] text-ink mb-4">
            Search. Preview. <em className="italic text-forest">Unlock.</em>
          </h2>

          <p className="text-[15px] font-light text-ink-soft max-w-120 mx-auto leading-[1.65]">
            Three steps between you and a direct hire. No intermediaries. No
            contracts. No waiting.
          </p>
        </motion.div>

        {/* STEPS */}
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
          className="grid md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white/70 backdrop-blur-sm border border-ash rounded-2xl p-6 md:p-7 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* TOP */}
              <div>
                {/* number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-medium tracking-[0.12em] text-ink-soft">
                    {step.num}
                  </span>
                </div>

                {/* title */}
                <div className="text-[15px] font-semibold text-ink mb-2">
                  {step.title}
                </div>

                {/* desc */}
                <div className="text-[13px] text-ink-soft leading-[1.6] font-light">
                  {step.desc}
                </div>
              </div>

              {/* ARROW (except last) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block text-ink-soft/40 text-lg">
                  →
                </div>
              )}

              {/* subtle gradient hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-linear-to-br from-forest/5 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
