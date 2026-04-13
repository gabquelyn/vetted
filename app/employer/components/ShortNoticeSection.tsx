"use client";

import { PiLightningDuotone } from "react-icons/pi";
import { LuNotebookText } from "react-icons/lu";
import { FiShield } from "react-icons/fi";
import { motion } from "motion/react";
import Active from "@/app/components/Active";
import { useState } from "react";

const features = [
  {
    icon: <PiLightningDuotone />,
    title: "Notice window — filter by how fast they can start",
    desc: "Same day · 12 hours · 24 hours · 48 hours.",
  },
  {
    icon: <LuNotebookText />,
    title: "Shift type preference — single shift or contract",
    desc: "Filter out mismatched candidates instantly.",
  },
  {
    icon: <Active />,
    title: "Active right now — logged in within 24 hours",
    desc: "Know who will actually pick up today.",
  },
  {
    icon: <FiShield />,
    title: "Insurance Verified — ready to download",
    desc: "Verified ICs with documents on file.",
  },
];

export default function ShortNoticeSection() {
  const [selected, setSelected] = useState<string[]>([
    "Short-notice / Same-day",
    "Independent Contractor (IC)",
    "Insurance Verified",
  ]);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  return (
    <section className="relative overflow-hidden border-t border-ash bg-cream px-6 md:px-12 py-28" id = "short-notice">
      {/* Parallax grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[60px_60px]"
      />

      {/* Glow blob */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: 1, duration: 8, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -right-32 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.25)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Tag strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap items-center gap-2"
        >
          <span className="rounded-full border border-forest-light bg-forest-pale px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-forest">
            Only on Vetted
          </span>
          <span className="rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            Short-notice
          </span>
          <span className="rounded-full border border-forest-light bg-forest-pale px-3 py-1 text-xs font-semibold text-forest">
            IC · Own Insurance
          </span>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Insurance Verified
          </span>
          <span className="ml-1 text-xs text-ink-soft">
            These tags exist nowhere else.
          </span>
        </motion.div>

        <div className="grid gap-20 md:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 font-serif text-4xl md:text-5xl leading-tight text-ink">
              Build your <br />
              <em className="text-forest">on-call bench.</em>
            </h2>

            <p className="mb-6 text-[15px] leading-relaxed text-ink-soft">
              Short-notice coverage is the hardest staffing problem to solve.
              This replaces agencies with your own instant-response network.
            </p>

            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
              className="space-y-3"
            >
              {features.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -4 }}
                  className="group flex items-start gap-4 rounded-xl border border-ash bg-white p-4 transition-all hover:shadow-md"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10 text-forest group-hover:scale-110 transition">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-soft">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Glass panel */}
            <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-xl">
              <p className="mb-4 text-xs uppercase tracking-widest text-ink-soft">
                Live Filter
              </p>

              {/* Toggle filters */}
              <div className="space-y-2">
                {[
                  "Permanent / Full-time",
                  "Short-notice / Same-day",
                  "Independent Contractor (IC)",
                  "Insurance Verified",
                ].map((label) => {
                  const active = selected.includes(label);
                  return (
                    <div
                      key={label}
                      onClick={() => toggle(label)}
                      className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-black/5"
                    >
                      <span className="text-sm text-ink">{label}</span>

                      <motion.div
                        layout
                        className={`h-5 w-9 rounded-full flex items-center px-1 ${
                          active ? "bg-forest" : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          layout
                          className="h-3 w-3 rounded-full bg-white"
                          animate={{ x: active ? 14 : 0 }}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Result simulation */}
              <motion.div
                key={selected.length}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-lg border border-ash bg-white p-3 text-xs text-ink-soft"
              >
                Showing{" "}
                <span className="font-medium text-ink">
                  {8 + selected.length * 2} candidates
                </span>{" "}
                ready now
              </motion.div>
            </div>

            {/* Active */}
            <div className="flex items-center gap-3 rounded-xl border border-ash bg-white p-4 shadow-sm">
              <Active />
              <p className="text-sm text-ink-soft">
                <span className="font-medium text-ink">Active right now</span> —
                high response probability
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
