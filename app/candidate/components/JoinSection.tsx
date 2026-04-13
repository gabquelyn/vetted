"use client";

import Input from "@/app/components/Input";
import { motion } from "motion/react";
import { useState } from "react";

export default function JoinSection() {
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    experience: "",
    location: "",
    linkedin: "",
    isIC: "",
    hasInsurance: "",
    shortNotice: "",
    contractWork: "",
  });

  return (
    <section id="join" className="px-6 md:px-12 py-[100px]">
      <div className="mx-auto max-w-[760px]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-forest mb-4">
            Join the Registry
          </div>

          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light leading-[1.1] text-ink">
            Be discovered by <br />
            employers looking for{" "}
            <em className="text-forest not-italic">you.</em>
          </h2>

          <p className="text-[15px] text-ink-soft mt-4 leading-[1.7] max-w-[520px] mx-auto">
            Apply to join the Vetted professional registry. We&apos;ll review
            your profile and confirm your spot.
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-ash bg-white p-6 md:p-8 shadow-sm"
        >
          <form className="space-y-6">
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInput}
                placeholder="Sarah"
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInput}
                placeholder="Lawson"
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                type="email"
                placeholder="you@email.com"
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInput}
                placeholder="Toronto, ON"
              />

              <Select
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleInput}
                options={[
                  "Registered Nurse",
                  "RPN",
                  "Personal Support Worker",
                  "Health Care Aide",
                  "Medical Office Assistant",
                  "Nurse Practitioner",
                  "Occupational Therapist",
                  "Other",
                ]}
              />

              <Select
                label="Years of Experience"
                name="experience"
                value={formData.experience}
                onChange={handleInput}
                options={["0–2 years", "2–5 years", "5–10 years", "10+ years"]}
              />

              <div className="md:col-span-2">
                <Input
                  label="LinkedIn or Resume (optional)"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInput}
                  placeholder="linkedin.com/in/yourname"
                />
              </div>
            </div>

            {/* IC SECTION */}
            <div className="rounded-xl border border-ash bg-white p-5">
              <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-forest mb-4">
                Independent Contractor (optional)
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Are you an independent contractor?"
                  name="isIC"
                  value={formData.isIC}
                  onChange={handleInput}
                  options={[
                    "Yes — I work independently",
                    "No — looking for employment",
                    "Open to both",
                  ]}
                />

                <Select
                  label="Do you carry liability insurance?"
                  name="hasInsurance"
                  value={formData.hasInsurance}
                  onChange={handleInput}
                  options={[
                    "Yes — I have my own coverage",
                    "No",
                    "In progress",
                  ]}
                />

                <Select
                  label="Available for short-notice work?"
                  name="shortNotice"
                  value={formData.shortNotice}
                  onChange={handleInput}
                  options={[
                    "Same day / next day",
                    "24–48 hours notice",
                    "Planned roles only",
                  ]}
                />

                <Select
                  label="Open to contract / per-shift work?"
                  name="contractWork"
                  value={formData.contractWork}
                  onChange={handleInput}
                  options={["Yes", "Permanent only", "Either"]}
                />
              </div>
            </div>

            {/* CONSENT */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                onChange={handleInput}
                required
                className="mt-1"
              />
              <p className="text-[12px] text-ink-soft leading-[1.6]">
                I consent to my profile being visible to verified employers.
                Contact details are only shared when unlocked.
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-forest text-white py-3.5 rounded-lg text-[14px] font-medium hover:opacity-90 transition"
            >
              Apply to Join the Registry →
            </button>

            {/* NOTE */}
            <p className="text-center text-[12px] text-ink-soft leading-[1.6]">
              Your details stay private until an employer unlocks your profile.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  options: string[];
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>
      <label className="text-[12px] text-ink-soft mb-1 block">{label}</label>
      <select
        {...props}
        required
        className="w-full rounded-lg border border-ash bg-white px-3 py-2.5 text-[13px] outline-none focus:border-forest"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
