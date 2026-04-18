"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type FAQ = {
  q: string;
  a: string;
};

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#faf9f6] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-forest mb-4">
            Questions
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-ink leading-tight">
            Everything you need <br />
            <span className="italic text-forest">
              before joining.
            </span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-12 divide-y divide-ash">
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="text-base md:text-lg text-ink-mid group-hover:text-forest transition">
                    {faq.q}
                  </span>

                  {/* Plus icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="text-forest text-xl shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mb-4"
                    >
                      <p className="pb-6 text-sm md:text-base text-ink-soft leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* subtle footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center gap-2 text-xs text-forest"
        >
          <span className="w-4 h-px bg-forest" />
          Still have questions? Reach out anytime.
        </motion.div>
      </div>
    </section>
  );
}