"use client";
import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Upload your resume",
    body: "PDF or Word. Under a minute. We handle everything from here.",
  },
  {
    num: "02",
    title: "We build your profile",
    body: "Your experience, certifications, and skills are extracted and mapped. You review it before anything goes live.",
  },
  {
    num: "03",
    title: "Employers find you",
    body: "Your profile becomes searchable. Employers pay to connect — no applications needed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white border-t border-ash py-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-forest mb-3">
            What happens after you upload
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
            Three steps. Zero{" "}
            <span className="italic text-forest">effort.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {steps.map((step) => (
            <StepCard key={step.num} {...step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StepCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="bg-cream p-10 md:p-12 transition"
    >
      {/* Big faded number */}
      <div className="font-serif text-5xl text-forest/10 mb-4">
        {num}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-ink mb-3">
        {title}
      </h3>

      {/* Body */}
      <p className="text-sm text-ink-soft leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}