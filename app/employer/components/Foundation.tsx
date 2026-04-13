"use client";
import { motion } from "motion/react";
import { TbFilterSearch } from "react-icons/tb";
import { GrPowerCycle } from "react-icons/gr";
import { PiPlugsConnectedDuotone } from "react-icons/pi";
import { PiLightningDuotone } from "react-icons/pi";

const features = [
  {
    icon: <PiPlugsConnectedDuotone />,
    title: "Opt-in by design",
    desc: "Everyone in the registry chose to be here. They confirmed availability and consented to visibility. When you reach out, they're expecting it — because they signed up for exactly this.",
  },
  {
    icon: <GrPowerCycle />,
    title: "45-day re-verification",
    desc: "Every 45 days, each professional confirms they're still open. No response — profile hides automatically. You always see the last verified date before spending a credit. No guessing.",
  },
  {
    icon: <TbFilterSearch />,
    title: "Filters that reflect reality",
    desc: "Candidates fill in structured fields at signup — not free-text resumes scraped by a keyword engine. Filter for a role, get that role.",
  },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dayName = tomorrow.toLocaleDateString("en-US", {
  weekday: "long",
});

export default function FoundationSection() {
  return (
    <section className="px-6 md:px-12 py-20 bg-forest-pale">
      <div className="max-w-275 mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* LEFT (sticky) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:sticky md:top-24"
          >
            <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-forest mb-4">
              What Makes Vetted Different
            </div>

            <h2 className="font-serif text-[clamp(30px,3.2vw,42px)] font-normal leading-[1.15] text-ink mb-5">
              Four things built
              <br />
              into the <em className="italic text-forest">foundation.</em>
            </h2>

            <p className="text-sm font-light leading-[1.7] text-ink-soft max-w-sm">
              Not features added on top. Decisions made from the start — about
              how data is collected, how profiles stay fresh, and how employers
              connect.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="flex flex-col gap-3"
          >
            {/* Feature cards */}
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group bg-white border border-ash rounded-xl p-6 md:p-8 grid grid-cols-[48px_1fr] gap-5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all"
              >
                {/* icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl bg-forest-pale border border-forest-light group-hover:scale-105 transition">
                  {f.icon}
                </div>

                {/* text */}
                <div>
                  <div className="text-[15px] font-medium text-ink mb-2">
                    {f.title}
                  </div>
                  <div className="text-[13px] font-light leading-[1.7] text-ink-soft">
                    {f.desc}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* DARK FEATURE CARD */}
     
            <motion.div
            //   href="#short-notice"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="group relative block bg-ink rounded-xl p-8 md:p-10 overflow-hidden border border-white/5 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all"
            >
              {/* glow */}
              <div className="absolute -top-10 -right-10 w-50 h-50 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.3)_0%,transparent_70%)] pointer-events-none" />

              {/* top */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#8fb86a]/15 border text-amber-200 border-[#8fb86a]/30 text-xl">
                  <PiLightningDuotone />
                </div>

                <div>
                  <div className="text-[16px] font-semibold text-white mb-1">
                    Short-notice & IC availability
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-semibold px-3 py-0.75 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                      Short-notice
                    </span>
                    <span className="text-[11px] font-semibold px-3 py-0.75 rounded-full bg-[#8fb86a]/15 text-[#8fb86a] border border-[#8fb86a]/30">
                      IC · Own Insurance
                    </span>
                  </div>
                </div>
              </div>

              {/* body */}
              <p className="text-[13px] font-light leading-[1.75] text-white/60 mb-6">
                Need coverage for {dayName}?
                Professionals signal short-notice, contract, and single-shift
                availability — including independent contractors with their own
                liability insurance.{" "}
                <span className="text-white/90 font-medium">
                  No other registry tracks this.
                </span>
              </p>

              {/* bottom */}
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-medium text-[#8fb86a] tracking-wide">
                  See how it works →
                </div>

                <div className="hidden md:flex gap-3 text-[11px] text-white/30">
                  <span>Dedicated filter</span>
                  <span>·</span>
                  <span>Card tags</span>
                  <span>·</span>
                  <span>IC badge</span>
                </div>
              </div>

              {/* hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-[#8fb86a]/10 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
