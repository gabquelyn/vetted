"use client";
import { motion } from "motion/react";
import Input from "@/app/components/Input"; // adjust path if needed
import React, { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    description: "",
  });
  const genericInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {};

  return (
    <section id="contact" className="bg-white px-6 md:px-12 py-22">
      <div className="mx-auto max-w-130 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          Work with Beverly
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-[clamp(28px,3.5vw,44px)] font-light leading-[1.1] text-ink mb-3"
        >
          Ready to build something that actually holds?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-base font-light leading-[1.7] text-ink-soft"
        >
          Send me a note with a brief description of your situation. I’ll follow
          up within 48 hours to see if it’s a good fit.
        </motion.p>

        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col gap-3 text-left"
        >
          <Input
            placeholder="Your name (first and last)"
            value={form.name}
            onChange={genericInputHandler}
            label="Full name"
            name="name"
            type="text"
          />

          <Input
            placeholder="Organisation / company"
            value={form.company}
            name="company"
            onChange={genericInputHandler}
            label="Organization / Company"
          />

          <Input
            type="email"
            placeholder="Work email"
            value={form.email}
            onChange={genericInputHandler}
            label="Email address"
            name="email"
          />

          <textarea
            placeholder="Briefly describe your hiring challenge (optional)"
            rows={3}
            value={form.description}
            onChange={genericInputHandler}
            name="description"
            className="w-full rounded-xl border border-ash bg-cream px-4 py-3 text-sm font-light text-ink outline-none transition focus:border-forest focus:bg-white resize-y"
          />

          {/* CTA */}
          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
          >
            Get in touch →
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
