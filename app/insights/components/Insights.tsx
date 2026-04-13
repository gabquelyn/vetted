"use client";
import { motion } from "motion/react";
import Input from "@/app/components/Input";
import { useState } from "react";
const ARTICLES: Article[] = [
  {
    tag: "Talent Report",
    tagClass: "report",
    title: "PSW Availability in Ontario: Where the Gaps Are Widest",
    sub: "A breakdown of active PSW profiles by city, shift preference, and IC status — and what it means for facilities hiring in 2026.",
    date: "February 2026",
    read: "5 min read",
  },
  {
    tag: "Analysis",
    tagClass: "analysis",
    title:
      'What "Verified" Actually Means — and Why It Matters More Than Resume Date',
    sub: "The difference between a candidate who last updated their resume six months ago and one who confirmed availability two days ago. Why freshness is the signal most platforms don't track.",
    date: "January 2026",
    read: "4 min read",
  },
  {
    tag: "Guide",
    tagClass: "guide",
    title: "How to Build Your On-Call Bench Before You Need It",
    sub: "A practical framework for LTC directors and clinic managers: how many IC professionals to have on file, how to maintain contact, and how Vetted fits in.",
    date: "March 2026",
    read: "6 min read",
  },
  {
    tag: "Analysis",
    tagClass: "analysis",
    title: "RPN Supply in the GTA: A Registry View vs a Job Board View",
    sub: "The same search run on a job board and on a curated registry returns different candidates, different signals, and different outcomes. Here's what the data shows.",
    date: "February 2026",
    read: "5 min read",
  },
  {
    tag: "Guide",
    tagClass: "guide",
    title:
      "Independent Contractor Compliance for Facilities: What You Need to Know",
    sub: 'Before you hire an IC, what documentation do you need? What does "Insurance Verified" mean in practice? A plain-language guide for HR teams and facility managers.',
    date: "January 2026",
    read: "7 min read",
  },
  {
    tag: "Talent Report",
    tagClass: "report",
    title:
      "The 45-Day Signal: What Verification Recency Tells You About a Candidate",
    sub: "Candidates verified within 7 days respond at 2.4x the rate of those verified 30+ days ago. Why the date on the card matters more than anything on the resume.",
    date: "December 2025",
    read: "4 min read",
  },
  {
    tag: "Guide",
    tagClass: "guide",
    title:
      "For Healthcare Professionals: How to Make Your Profile Work While You Sleep",
    sub: "You joined Vetted. Now what? The fields that move the needle, the signals employers actually filter for, and why your profile summary matters more than you think.",
    date: "December 2025",
    read: "5 min read",
  },
  {
    tag: "Analysis",
    tagClass: "analysis",
    title: "Why Staffing Agencies Still Win at 11pm — and How That Changes",
    sub: "The agency model thrives on urgency and the absence of alternatives. What a pre-built bench looks like in practice, and the economics of switching from reactive to proactive coverage.",
    date: "November 2025",
    read: "6 min read",
  },
];

export default function InsightsGrid() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-cream px-6 md:px-12 py-16">
      <div className="mx-auto max-w-245">
        {/* Label */}
        <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-soft">
          Latest
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="group cursor-pointer rounded-2xl bg-ink p-10 text-white transition-all duration-300 hover:shadow-2xl">
            <span className="inline-block mb-4 rounded-full border border-[#2d5016]/50 bg-[#2d5016]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#8fb86a]">
              Talent Report
            </span>

            <h3 className="mb-4 font-serif text-[28px] font-light leading-[1.2]">
              The Short-Notice Staffing Gap:
              <br />
              Why LTC Facilities Are Still Calling Agencies at 11pm
            </h3>

            <p className="mb-6 text-[14px] font-light leading-[1.7] text-white/60 max-w-170">
              Independent contractors with same-day availability exist in every
              major Ontario city. Most facilities don&apos;t have a system to
              find them before the phone call to an agency.
            </p>

            <div className="flex items-center gap-3 text-[11px] text-white/40">
              <span>March 2026</span>
              <span className="h-0.75 w-0.75 rounded-full bg-white/40" />
              <span>8 min read</span>
            </div>
          </div>
        </motion.div>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {ARTICLES.slice(0, 2).map(
            ({ tag, title, sub, date, read }, i: number) => (
              <motion.a
                key={title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-3 rounded-xl border border-ash bg-white p-6 transition-all hover:shadow-lg"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-forest">
                  {tag}
                </span>

                <h4 className="font-serif text-[22px] leading-tight text-ink">
                  {title}
                </h4>

                <p className="text-[13px] font-light leading-[1.65] text-ink-soft">
                  {sub}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-ink-soft">
                  <span>{date}</span>
                  <span className="h-o.75 w-o.75 rounded-full bg-ink-soft" />
                  <span>{read}</span>
                </div>
              </motion.a>
            ),
          )}
        </div>



        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-white"
        >
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#8fb86a]">
              Talent Index
            </div>

            <h3 className="font-serif text-[26px] font-light leading-[1.2] mb-2">
              Get the quarterly report in your inbox.
            </h3>

            <p className="text-[14px] font-light leading-[1.6] text-white/60">
              Registry data, hiring trends, and practical analysis — no noise.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-3 min-w-70"
          >
            <input
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="bg-white/5 text-white border-white/10 placeholder:text-white/40 p-2 px-4 rounded-3xl focus:ring-forest focus:ring-2 outline-0"
            />

            <button
              type="submit"
              className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg"
            >
              Subscribe →
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
