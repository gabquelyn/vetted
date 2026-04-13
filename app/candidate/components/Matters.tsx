"use client";
import { motion } from "motion/react";
import { FiMail, FiLock, FiRefreshCw } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const truths = [
  {
    icon: FiMail,
    title: "Discovery without applying",
    desc: "The right opportunity doesn't always get posted. Vetted puts your profile in front of employers searching for your exact experience — no application required.",
  },
  {
    icon: FiLock,
    title: "Private until you're chosen",
    desc: "Your name and contact details stay hidden until an employer pays to unlock your profile. Visible to the right people. Not the whole internet.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Verified status works for you",
    desc: "Employers see your last verified date. Being on Vetted signals you're serious, current, and reachable — before they even reach out.",
    dark: true,
  },
  {
    icon: FiRefreshCw,
    title: "No platform to manage daily",
    desc: "Set up your profile once. Confirm availability every 45 days. That's it. Vetted works while you work.",
  },
];

export default function WhyItMatters() {
  return (
    <section className="bg-white px-6 md:px-[15%] py-25">
      <div className="flex items-center justify-center flex-col">
        
        {/* LEFT TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-forest mb-4">
            Why It Matters
          </div>

          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-light leading-[1.05] text-ink mb-6">
            Qualified. 
            Experienced. <br/>
            <em className="text-forest not-italic">Just not visible.</em>
          </h2>

          <p className="text-[15px] md:text-[16px] font-light leading-[1.75] text-ink-soft md:max-w-2xl">
            The hiring system wasn&apos;t built for professionals who are already
            working. Job boards are designed for active job seekers. Vetted is
            built for professionals who want to be found — without disrupting
            what they&apos;re already doing.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {truths.map(({ icon: Icon, title, desc, dark }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-2xl border px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                ${
                  dark
                    ? "bg-ink border-ink text-white"
                    : "bg-cream border-ash"
                }`}
            >
              {/* icon */}
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg
                ${
                  dark
                    ? "bg-white/10 text-white"
                    : "bg-forest/10 text-forest"
                }`}
              >
                <Icon size={18} />
              </div>

              {/* title */}
              <div
                className={`text-[14px] font-semibold mb-2 ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                {title}
              </div>

              {/* desc */}
              <p
                className={`text-[13px] font-light leading-[1.65] ${
                  dark ? "text-white/60" : "text-ink-soft"
                }`}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}