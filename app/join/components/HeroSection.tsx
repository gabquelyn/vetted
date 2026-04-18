"use client"
import { motion } from "motion/react";
import React from "react";

export default function HeroSection({ children }:{children: React.ReactNode}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-24 pt-32">
      <div className="max-w-xl text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-widest text-xs text-forest mb-4">
            Join the Registry
          </p>

          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-ink mb-4">
            Your profile,<br />
            working while you <span className="italic text-forest">sleep.</span>
          </h1>

          <p className="text-ink-soft mb-8">
            Upload your resume. We build your verified profile.
          </p>
        </motion.div>

        {children}
      </div>
    </section>
  );
}