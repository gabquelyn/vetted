"use client";

import Active from "@/app/components/Active";
import { motion } from "motion/react";
import { FaCarRear } from "react-icons/fa6";
import {
  FiZap,
  FiShield,
  FiList,
  FiLock,
  FiCopy,
  FiShare2,
} from "react-icons/fi";
import { MdOutlineShield, MdOutlineVerified } from "react-icons/md";
import { PiLightningDuotone } from "react-icons/pi";

export default function IndependentContractors() {
  return (
    <section
      id="independent-contractors"
      className="bg-cream px-6 md:px-12 py-20"
    >
      <div className="mx-auto max-w-275 space-y-14">
        {/* TAG STRIP */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[rgba(143,184,106,0.15)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-forestborder border-[rgba(143,184,106,0.3)]">
            Independent Contractors
          </span>

          <span className="rounded-full bg-yellow-100 px-4 py-2 text-[12px] font-semibold text-yellow-800 border border-yellow-200">
            Short-notice
          </span>

          <span className="rounded-full bg-forest-pale px-4 py-2 text-[12px] font-semibold text-forestborder border-forest-light">
            IC · Own Insurance
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-[12px] font-semibold text-blue-600 border border-blue-200">
            🛡 Insurance Verified
          </span>

          <span className="text-[12px] text-ink-soft">
            Your tags. Your search advantage.
          </span>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-[clamp(34px,4vw,54px)] font-light leading-[1.05] text-ink mb-6">
              Your own practice. <br />
              Your own <em className="text-forestnot-italic">availability.</em>
            </h2>

            <p className="text-[15px] font-light leading-[1.75] text-ink-softmb-5">
              Independent contractors can signal availability with more
              precision than any other platform offers. Tell employers exactly
              how fast you can start, what shift types you accept, and which
              days you are free this week.
            </p>

            <p className="text-[15px] font-light leading-[1.75] text-ink-softmb-8">
              Facilities building their own on-call bench search specifically
              for IC professionals. Your profile appears at the top — no
              recruiter in the middle, no agency cut.
            </p>

            {/* SIGNALS */}
            <div className="space-y-3 mb-8">
              {[
                {
                  icon: FiZap,
                  title: "Notice window — real-time availability control",
                  desc: "Same day, 12h, 24h, 48h. Employers filter directly.",
                },
                {
                  icon: FiShield,
                  title: "Insurance Verified badge",
                  desc: "Upload once. Employers can verify after unlock.",
                },
                {
                  icon: FiList,
                  title: "Shift type preference",
                  desc: "Single, short contract, extended, or flexible.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-xl border border-ash bg-white p-4"
                >
                  <div className="mt-1 text-forest">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-ink mb-1">
                      {title}
                    </div>
                    <div className="text-[12px] font-light text-ink-softleading-[1.6]">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-lg bg-forest px-6 py-3 text-[14px] font-medium text-white hover:shadow-lg transition"
            >
              Join as an Independent Contractor →
            </a>
          </motion.div>

          {/* RIGHT MOCK */}
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-softmb-4">
              How your profile appears
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-ash bg-white p-6 shadow-sm"
            >
              <div className="flex justify-between mb-3">
                <span className="text-[11px] text-ink-soft">
                  RPN-047 · Profile
                </span>
                <div className="flex flex-col items-end gap-2">
                  <Active active />
                  <span className="tag-green flex items-center gap-1">
                    <MdOutlineVerified /> verified
                  </span>
                </div>
              </div>

              <h3 className="text-[16px] font-medium text-ink mb-2">
                Registered Practical Nurse
              </h3>

              <p className="text-[13px] flex items-center gap-2 text-ink-softmb-4">
                Mississauga · 6 yrs ·{" "}
                <span>
                  <FaCarRear />
                </span>{" "}
                {/* Vehicle
                <span className="text-ink font-medium">Same day</span> */}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-yellow-100 text-yellow-800 text-[11px] px-3 py-1 rounded-full">
                  Short-notice
                </span>
                <span className="tag-yellow flex items-center gap-1">
                  <PiLightningDuotone /> Ic
                </span>
                <span className="tag-blue flex items-center gap-1">
                  <MdOutlineShield /> Insured
                </span>
              </div>

              <div className="flex  text-xs mb-2 justify-end">
                <p>Verified 4 days ago</p>
              </div>

              <div className="rounded-lg bg-ink text-white text-center py-3 text-sm font-medium">
                🔒 Unlock Profile — 1 credit
              </div>
            </motion.div>

            <div className="mt-4 rounded-xl bg-forest-pale border border-forest-light p-4 text-[13px] text-ink-softleading-[1.6]">
              Employers see availability, shift type, and insurance status
              before unlocking — ensuring better matches, faster.
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: FiZap,
              title: "Same-day availability",
              desc: "Appear first when urgent shifts open.",
            },
            {
              icon: FiShield,
              title: "Insurance Verified",
              desc: "Proof handled once, visible always.",
            },
            {
              icon: FiList,
              title: "Shift preferences",
              desc: "Only relevant opportunities reach you.",
            },
            {
              icon: FiLock,
              title: "Still private",
              desc: "Contact hidden until employer unlocks.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-ash bg-white p-5"
            >
              <Icon className="text-forestmb-3" size={18} />
              <div className="text-[13px] font-medium mb-1">{title}</div>
              <div className="text-[12px] text-ink-softleading-[1.6]">
                {desc}
              </div>
            </div>
          ))}
        </div>

        {/* SHARE */}
        <div className="flex flex-wrap justify-between items-center gap-4 rounded-xl border border-ash bg-white p-5">
          <div>
            <div className="text-[13px] font-medium mb-1">
              Know another healthcare professional?
            </div>
            <div className="text-[12px] text-ink-softmax-w-[520px]">
              Share Vetted with colleagues. It costs nothing to join and
              increases visibility instantly.
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-white text-[12px]">
              <FiShare2 /> Share
            </button>

            <button
              onClick={() =>
                navigator.clipboard
                  .writeText("https://getvetted.ca/candidates")
                  .then(() => alert("Copied!"))
              }
              className="flex items-center gap-2 rounded-lg border border-ash bg-cream px-4 py-2 text-[12px]"
            >
              <FiCopy /> Copy link
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
