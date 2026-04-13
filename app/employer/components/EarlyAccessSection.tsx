"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Input from "@/app/components/Input";
import { GiCheckMark } from "react-icons/gi";
export default function EarlyAccessSection() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    org: "",
    title: "",
    roles: "",
  });

  const inputHandler: InputFn = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section
      className="border-t border-ash bg-cream px-6 md:px-12 py-28"
      id="early-access"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">
            Early Access
          </p>

          <h2 className="mb-5 font-serif text-4xl md:text-5xl leading-tight text-ink">
            Stop posting. <br />
            <span className="text-forest">Start finding.</span>
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-ink-soft">
            Join employers already on the waitlist. Be first in when the
            platform launches with a curated pool of verified professionals.
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              "No long-term contracts — pay only for what you use",
              "Credits never expire",
              "30 days free workspace",
              "Direct contact — no recruiter fees",
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-sm text-ink-soft"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-forest-light bg-forest-pale text-xs text-forest">
                  <GiCheckMark />
                </div>
                {item}
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-6 flex gap-3 rounded-lg border border-ash bg-white p-4 text-xs text-ink-soft">
            <span>★</span>
            <p>
              Most profiles unlock with one credit. Specialist roles are $25
              flat — no credit deducted.
            </p>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-8 shadow-xl"
        >
          <h3 className="text-lg font-medium text-ink mb-1">
            Request early access
          </h3>
          <p className="text-sm text-ink-soft mb-6">
            We will notify you when we launch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Names */}
            <div className="grid grid-cols-2 gap-3">
              {["first_name", "last_name"].map((field) => (
                <Input
                  key={field}
                  label={field.replace("_", " ")}
                  value={form[field as keyof typeof form]}
                  onChange={inputHandler}
                  name={field}
                />
              ))}
            </div>

            <Input
              label="Work email"
              type="email"
              value={form.email}
              name="email"
              onChange={inputHandler}
            />

            <Input
              label="Organisation"
              value={form.org}
              onChange={inputHandler}
              name="org"
            />

            <Input
              label="Role / title"
              value={form.title}
              onChange={inputHandler}
              name="role"
            />

            {/* Select */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-ink-soft mb-1">
                Hiring roles
              </label>
              <select
                value={form.roles}
                onChange={(e) => setForm({ ...form, roles: e.target.value })}
                className="w-full rounded-lg border border-ash bg-cream px-3 py-2 text-sm outline-none focus:border-forest"
              >
                <option value="">Select role…</option>
                <option>PSW / HCA</option>
                <option>Registered Nurse</option>
                <option>Nurse Practitioner</option>
                <option>Medical Assistant</option>
                <option>Occupational Therapist</option>
                <option>Multiple roles</option>
              </select>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-lg bg-forest py-3 text-sm font-medium text-white transition hover:bg-forest/90"
            >
              Request Early Access →
            </motion.button>

            <p className="text-center text-xs text-ink-soft">
              By submitting, you agree to our{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
