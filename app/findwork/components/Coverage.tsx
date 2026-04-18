"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ONTARIO_CITIES = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Markham",
  "Vaughan",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Pickering",
  "Newmarket",
  "Aurora",
  "Milton",
  "Halton Hills",
  "Caledon",
  "Hamilton",
  "St. Catharines",
  "Niagara Falls",
  "Welland",
  "Ottawa",
  "Kingston",
  "Belleville",
  "Cornwall",
  "Peterborough",
  "Barrie",
  "Orillia",
  "Collingwood",
  "Midland",
  "London",
  "Windsor",
  "Sarnia",
  "Chatham-Kent",
  "Woodstock",
  "Brantford",
  "St. Thomas",
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Guelph",
  "Sudbury",
  "Thunder Bay",
  "Sault Ste. Marie",
  "North Bay",
  "Timmins",
];

export function OntarioCoverage() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-forest mb-4">
            Coverage
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1a1a18] leading-tight mb-5">
            Built for <br />
            <span className="italic text-forest">all of Ontario.</span>
          </h2>

          <div>
            <p className="text-base md:text-lg text-ink-soft max-w-xl leading-relaxed mb-10">
              From the GTA to Northern Ontario, Vetted is actively building
              coverage across every region where healthcare is delivered.
              Wherever you work in Ontario, your profile travels with you.
            </p>
          </div>

          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white rounded-lg text-sm font-medium hover:bg-[#3d6b1f] hover:-translate-y-0.5 hover:shadow-xl transition"
          >
            Join Today For Free →
          </Link>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {ONTARIO_CITIES.map((city) => (
            <motion.span
              key={city}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-[#e2e4dc] bg-[#faf9f6] text-ink-soft hover:bg-[#e8f0e0] hover:text-forest transition"
            >
              {city}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* subtle note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="text-xs text-forest mt-8 flex items-center gap-2 max-w-6xl mx-auto"
      >
        <span className="w-4 h-px bg-forest" />
        Expanding continuously across Ontario
      </motion.p>
    </section>
  );
}
