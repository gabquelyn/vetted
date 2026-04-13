"use client";

import { motion } from "motion/react";

export default function Teaser() {
  return (
    <section className="relative text-white/80  overflow-hidden bg-ink-mid px-12 pb-20">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.2)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-275 mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* Tags */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-2 mb-5 flex-wrap"
          >
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
              Short-notice
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[rgba(45,80,22,0.25)] text-[#8fb86a] border border-[rgba(45,80,22,0.4)]">
              IC · Own Insurance
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[rgba(60,80,180,0.2)] text-[#a0b4f0] border border-[rgba(100,130,220,0.3)]">
              Insurance Verified
            </span>
            <span className="text-[11px] font-light text-white/45">
              Only on Vetted
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="font-serif text-[clamp(28px,3.5vw,44px)] font-light leading-[1.1] text-white mb-4"
          >
            Build your <br />
            <em className="text-[#8fb86a]">on-call bench.</em>
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[15px] font-light leading-[1.75] mb-4"
          >
            Agencies charge $3-50/hour and take 3-4 hours to fill a shift. Use
            Vetted to unlock 8-10 IC professionals in your area once — and have
            a direct, verified bench ready before you ever need it.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[15px] font-light leading-[1.75] mb-7"
          >
            IC candidates tell you their notice window — same day, 12h, 24h, or
            48h — and their shift type preference.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex gap-3 flex-wrap"
          >
            <a
              href="/employer#short-notice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2D5016] text-white text-sm font-medium border border-[#2D5016] hover:bg-[#3d6b1f] transition"
            >
              Build my bench →
            </a>

            <a
              href="/candidate#independent-contractors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-sm font-normal hover:text-white hover:border-white/30 transition"
            >
              Are you an IC? →
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col gap-3"
        >
          {/* CARD 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-[9px] uppercase tracking-wider">
                  PSW-204
                </div>
                <div className="text-sm font-semibold text-white">
                  Personal Support Worker
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
                  <span className="text-[9px] text-green-300 font-semibold">
                    Active
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[rgba(45,80,22,0.4)] text-[#8fb86a] border border-[rgba(45,80,22,0.6)]">
                  ✓ Verified
                </span>
              </div>
            </div>

            <div className="text-[11px] mb-2">
              Mississauga · 5 yrs · Same day
            </div>

            <div className="flex gap-1 flex-wrap mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-bold">
                IC
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200/30 text-blue-300">
                Ins. Verified
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-300">
                Available now
              </span>
            </div>

            <div className="text-[10px] italic mb-1">
              Experienced PSW specialising in dementia care
            </div>

            <div className="text-[10px]">Mobility · Dementia · Medication</div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between"
          >
            <div>
              <div className="text-[9px] uppercase">RN-091</div>
              <div className="text-sm font-semibold text-white">
                Registered Nurse
              </div>
              <div className="text-[11px]">Toronto · 9 yrs · Same day</div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-bold">
                Short-notice
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/30 text-green-300">
                IC · Flexible
              </span>
            </div>
          </motion.div>

          {/* HINT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8fb86a]" />
            <span className="text-xs font-light">
              Filter by notice window, shift type, and insurance status
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
