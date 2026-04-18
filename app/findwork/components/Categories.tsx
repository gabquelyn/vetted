"use client";
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineClipboardDocument,
  HiOutlineBeaker,
} from "react-icons/hi2";

import {
  LuPill,
  LuLeaf,
  LuSparkles,
} from "react-icons/lu";
import Link from "next/link";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    slug: "nursing-care",
    title: "Nursing & Direct Care",
    roles: ["RN", "RPN", "NP", "PSW", "HCA", "HSW", "DSW"],
    desc: "Regulated and unregulated professionals at the front line of patient care.",
    icon: <HiOutlineUser className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "allied-health",
    title: "Allied Health & Therapy",
    roles: ["OT", "PT", "SLP", "RT", "RMT", "RKIN", "DC", "PTA/OTA", "PMD"],
    desc: "Specialists whose credentials are in high demand across clinical and community settings.",
    icon: <HiOutlineUserGroup className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "mental-health-social",
    title: "Mental Health & Social Services",
    roles: ["RSW", "RSSW", "MHW", "AC", "BT", "RP"],
    desc: "Professionals supporting individuals, families, and communities across Ontario.",
    icon: <HiOutlineHeart className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "medical-admin",
    title: "Medical Administration",
    roles: ["MOA", "MS", "HUC", "PRC"],
    desc: "The operational backbone of clinics, hospitals, and long-term care facilities.",
    icon: <HiOutlineClipboardDocument className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "diagnostics-lab",
    title: "Diagnostics & Lab",
    roles: ["MLT", "PHL", "LAB", "DIT", "UST", "XRT"],
    desc: "Precision professionals in laboratory science and diagnostic imaging.",
    icon: <HiOutlineBeaker className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "pharmacy",
    title: "Pharmacy",
    roles: ["RPH", "PHT", "PHA"],
    desc: "Regulated pharmacy professionals and support staff across retail and clinical settings.",
    icon: <LuPill className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "nutrition-dietary",
    title: "Nutrition & Dietary",
    roles: ["RD", "NUT", "DA"],
    desc: "Dietitians, nutritionists, and dietary aides serving healthcare and community settings.",
    icon: <LuLeaf className="w-6 h-6 text-[#2D5016]" />,
  },
  {
    slug: "specialized",
    title: "Specialized & Emerging",
    roles: ["PA", "MDRD", "ME", "Dental", "Midwife", "Audiologist"],
    desc: "Niche and emerging healthcare roles overlooked by general job boards.",
    icon: <LuSparkles className="w-6 h-6 text-[#2D5016]" />,
  },
];

export function Categories() {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#2D5016] mb-4">
            Browse by Profession
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1a1a18] max-w-xl leading-tight mb-14">
            Every type of healthcare worker.
            <br />
            <span className="italic text-[#2D5016]">One registry.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className=""
            >
              <Link
                href={`/roles/${cat.slug}`}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-[#e2e4dc] bg-[#faf9f6] hover:bg-white hover:border-ash hover:-translate-y-1 hover:shadow-lg transition-all h-80"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#e8f0e0] flex items-center justify-center">
                  {cat.icon}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-lg text-[#1a1a18]">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-[#6b6b64] mt-2">{cat.desc}</p>
                </div>

                {/* Roles */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.roles.slice(0, 5).map((r: string) => (
                    <span
                      key={r}
                      className="text-[11px] px-2 py-1 rounded-full bg-[#e8f0e0] text-[#2D5016]"
                    >
                      {r}
                    </span>
                  ))}

                  {cat.roles.length > 5 && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-[#e8f0e0] text-[#2D5016]">
                      +{cat.roles.length - 5} more
                    </span>
                  )}
                </div>

                {/* Arrow */}
                <div className="text-[#2D5016] text-lg mt-2 group-hover:translate-x-1 transition">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
