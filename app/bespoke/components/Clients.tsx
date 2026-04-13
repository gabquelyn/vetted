"use client";
import { motion } from "motion/react";

const items = [
  "A unit opening or expansion with real hiring pressure",
  "Hundreds of applicants but no clear way to filter or evaluate",
  "Delays caused by unstructured or inconsistent processes",
  "Internal teams stretched too thin to hire well",
  "Urgency without a clear hiring plan or ownership",
];

export default function Clients() {
  return (
    <section className="border-b border-ash bg-white px-6 md:px-12 py-22">
      <div className="mx-auto grid max-w-245 grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
        
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label mb-5 uppercase text-xs text-forest"
          >
            Who I work with
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-[clamp(28px,3.2vw,42px)] font-light leading-[1.1] text-ink mb-5"
          >
            You are not starting <br />
            from{" "}
            <em className="text-forest not-italic relative">
              zero.
              {/* subtle underline accent */}
              <span className="absolute left-0 bottom-0 w-full h-1.5 bg-forest/10 rounded-full -z-10" />
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-light leading-[1.75] text-ink-soft max-w-105"
          >
            The teams I work with are usually dealing with one or more of these:
          </motion.p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 pt-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="group flex items-start gap-4 rounded-xl bg-cream px-5 py-4 transition-all duration-300 hover:shadow-md hover:bg-white"
            >
              {/* bullet */}
              <div className="mt-2 h-2 w-2 rounded-full bg-forest shrink-0 group-hover:scale-125 transition-transform" />

              {/* text */}
              <span className="text-sm font-light leading-[1.65] text-ink">
                {item}
              </span>
            </motion.div>
          ))}

          {/* Highlight block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mt-3 overflow-hidden rounded-r-lg border-l-[3px] border-forest bg-forest-pale px-5 py-4"
          >
            {/* subtle glow */}
            <div className="absolute inset-0 bg-linear-to-r from-forest/5 to-transparent pointer-events-none" />

            <p className="relative text-[15px] font-medium leading-[1.7] text-forest">
              This is rarely a sourcing problem. It is a systems problem — and
              that is exactly what I fix.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}