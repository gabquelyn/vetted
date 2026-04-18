"use client";

import { motion } from "motion/react";

type Role = {
  code: string;
  title: string;
  regulated: boolean;
  body?: string;
  note?: string;
};

export function Roles({ roles }: { roles: Role[] }) {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-forest mb-4">
            Covered Roles
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-ink leading-tight max-w-2xl">
            Lab and imaging professionals —{" "}
            <span className="italic text-forest">
              regulated and beyond.
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {roles.map((r, i) => (
            <motion.div
              key={r.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Card */}
              <div className="relative py-6 border-b border-ash/60">
                
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-[0.14em] text-forest">
                    {r.code}
                  </span>

                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      r.regulated ? "bg-forest" : "bg-ash"
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg text-ink leading-snug mb-2 group-hover:text-forest transition-colors duration-300">
                  {r.title}
                </h3>

                {/* Meta */}
                <p className="text-sm text-ink-soft leading-relaxed">
                  {r.regulated
                    ? `Regulated · ${r.body}`
                    : r.note || "Not regulated in Ontario"}
                </p>

                {/* subtle hover indicator (very soft) */}
                <div className="absolute left-0 bottom-0 h-px w-0 bg-forest/60 group-hover:w-1/3 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}