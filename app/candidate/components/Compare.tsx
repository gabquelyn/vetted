"use client";

import { motion } from "motion/react";
import {
  FiCheck,
  FiX,
  FiPlus,
} from "react-icons/fi";
import {
  HiOutlineUserGroup,
  HiOutlineClipboardDocument,
  HiOutlineHeart,
} from "react-icons/hi2";

export default function Compare() {
  const roles = [
    { icon: HiOutlineHeart, label: "Registered Nurses" },
    { icon: HiOutlineClipboardDocument, label: "RPNs" },
    { icon: HiOutlineUserGroup, label: "Personal Support Workers" },
    { icon: HiOutlineHeart, label: "Health Care Aides" },
    { icon: HiOutlineClipboardDocument, label: "Medical Office Assistants" },
    { icon: HiOutlineHeart, label: "Nurse Practitioners" },
    { icon: HiOutlineUserGroup, label: "Occupational Therapists" },
    { icon: FiPlus, label: "More verticals coming" },
  ];

  return (
    <section className="bg-white px-6 md:px-12 py-25">
      <div className="mx-auto max-w-[980px]">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-[11px] font-semibold uppercase tracking-widest text-forect mb-4">
            Who Vetted Is For
          </div>

          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-light leading-[1.1] text-ink">
            Professionals who are <br />
            good at what they do —{" "}
            <em className="text-forect not-italic">
              and know it.
            </em>
          </h2>
        </motion.div>

        {/* ROLE PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {roles.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 rounded-full border border-ash bg-cream px-4 py-2 text-[13px] text-ink"
            >
              <Icon size={14} className="text-forect" />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* FOR / NOT FOR */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* FOR */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-ash bg-cream p-6"
          >
            <h3 className="text-[15px] font-medium text-ink mb-4">
              Vetted is for you if
            </h3>

            <ul className="space-y-3">
              {[
                "You want visibility without job hunting",
                "You're open to opportunities but not actively searching",
                "You want employers to contact you directly",
                "You want your profile private until you're chosen",
                "You don't want another platform to manage daily",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-forest-pale text-forect">
                    <FiCheck size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NOT FOR */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-ash bg-white p-6"
          >
            <h3 className="text-[15px] font-medium text-ink mb-4">
              Vetted is not
            </h3>

            <ul className="space-y-3">
              {[
                "A job board you need to browse",
                "A platform that shares your info publicly",
                "A recruiter who takes a cut of your salary",
                "Something you need to maintain daily",
                "Another platform that emails you constantly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <FiX size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}