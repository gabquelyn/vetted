"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type FAQ = {
  id: string;
  q: string;
  a: string;
};

  const faqs: FAQ[] = [
    { id: 'verification', q: 'How are candidates verified?',
      a: 'Every candidate confirms their availability every 45 days by clicking a single button in an email. If they don\'t respond after three reminders, their profile is hidden automatically. The "Verified X days ago" date on every card reflects their most recent confirmation.' },
    { id: 'reveal', q: 'What does "unlock" mean?',
      a: 'Before you unlock, you see the candidate\'s role, location, experience, availability, and skills — but not their name or contact details. Unlocking uses one credit and reveals their full name, email, phone number, and resume. You then contact them directly outside Vetted.' },
    { id: 'exclusive', q: 'Are candidates exclusive to one employer?',
      a: 'No. Candidates can be unlocked by multiple employers. This is intentional — it gives candidates the best chance of finding the right fit. Vetted is a curated registry, not a placement service. You compete on who reaches out first and how you engage.' },
    { id: 'credits', q: 'Do credits expire?',
      a: 'One-time pack credits never expire as long as your workspace access is active ($9/month after the free 30-day period). If your workspace lapses, credits freeze — they reinstate the moment you reactivate. Enterprise credits reset monthly with no rollover.' },
    { id: 'specialist', q: 'What is a Specialist profile?',
      a: 'Advanced practice roles — Nurse Practitioners, Occupational Therapists, and similar — are marked Specialist. They unlock at a flat $25 per reveal rather than deducting a credit from your pack. You\'ll see the Specialist gate before any charge is applied.' },
    { id: 'ic', q: 'What is IC / short-notice availability?',
      a: 'IC stands for Independent Contractor. These candidates are available for same-day, 12-hour, 24-hour, or 48-hour call. Many carry their own liability insurance. Filter specifically for IC candidates and their notice window using the IC filter in the registry.' },
  ]


export default function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 bg-[#1a1a18] border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        {/* Label */}
        <div className="text-white/30 text-sm mb-2 uppercase tracking-wider">
          FAQ
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(28px,3vw,38px)]  text-ash mb-12 leading-tight">
          Common questions.
        </h2>

        {/* FAQ List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map(({ id, q, a }) => {
            const isOpen = expandedFaq === id;

            return (
              <div key={id}>
                {/* Question */}
                <button
                  onClick={() =>
                    setExpandedFaq(isOpen ? null : id)
                  }
                  className="w-full flex items-center justify-between py-5 text-left hover:text-white text-white/80 transition"
                >
                  <span className="text-sm md:text-base">{q}</span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl"
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-sm text-white/70 leading-relaxed">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}