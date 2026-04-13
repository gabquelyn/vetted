"use client";
import { motion } from "motion/react";
import { FiCheckCircle, FiRefreshCw, FiPhone } from "react-icons/fi";

const steps = [
  {
    num: "01",
    icon: FiCheckCircle,
    title: "Create Your Profile",
    desc: "Fill in your role, experience, availability, and credentials. Upload your resume. It takes 10 minutes and you won't need to touch it again.",
  },
  {
    num: "02",
    icon: FiRefreshCw,
    title: "Stay Verified",
    desc: "Every 45 days you'll receive a simple confirmation email. One click keeps your profile active and visible. Miss it and your profile hides automatically.",
  },
  {
    num: "03",
    icon: FiPhone,
    title: "Employers Come to You",
    desc: "When an employer pays to unlock your profile, they get your contact details. You hear from employers who specifically chose you — not a broadcast.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink px-6 md:px-[15%] py-25">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-160 mb-14"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-4">
            How It Works
          </div>

          <h2 className="font-serif text-[clamp(30px,4vw,54px)] font-light leading-[1.05] text-white mb-6">
            Set it up once. <br />
            <em className="text-[#8fb86a] not-italic">Let it work for you.</em>
          </h2>

          <p className="text-[15px] md:text-[16px] font-light leading-[1.75] text-white/60 max-w-130">
            No job hunting. No platform to manage daily. Just a profile that
            puts you in front of employers actively looking for your experience.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="relative space-y-10">
          
          {/* vertical line */}
          <div className="absolute left-4.5 top-0 bottom-0 w-px bg-white/10" />

          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              {/* number badge */}
              <div className="relative z-10 flex shrink-0 font-serif  h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white text-[12px] font-semibold backdrop-blur">
                {num}
              </div>

              {/* card */}
              <div className="group w-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:-translate-y-1">
                
                {/* icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#8fb86a]">
                  <Icon size={18} />
                </div>

                {/* title */}
                <h3 className="mb-2 text-[16px] font-medium text-white">
                  {title}
                </h3>

                {/* desc */}
                <p className="text-[13px] font-light leading-[1.7] text-white/60">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}