"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { RxChevronRight } from "react-icons/rx";

export default function RolesHero({
  name,
  caption,
  sub,
}: {
  name: string;
  caption: React.ReactNode;
  sub: string;
}) {
  return (
    <section className="relative pt-20 min-h-screen flex items-center overflow-hidden">
      {/* Orb */}
      <div className="absolute -top-20 -right-40 w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(45,80,22,0.07)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 w-full">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-[#6b6b64] mb-6 flex items-center gap-2"
        >
          <Link href="/findwork" className="text-[#2D5016] font-medium">
            Find Work
          </Link>
          <span>
            <RxChevronRight />
          </span>
          <span>{name}</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#2D5016] mb-6"
        >
          <span className="w-6 h-px bg-[#2D5016]" />
          {name} · Ontario
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-6xl font-light leading-tight text-[#1a1a18] max-w-2xl mb-6"
        >
          {caption}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base text-[#6b6b64] leading-relaxed max-w-xl mb-10"
        >
          {sub}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 flex-wrap"
        >
          <Link
            href="/join"
            className="px-7 py-3.5 bg-[#2D5016] text-white rounded-lg text-sm font-medium hover:bg-[#3d6b1f] transition hover:-translate-y-0.5 shadow-md"
          >
            Join the Registry →
          </Link>

          <Link
            href="/find-work"
            className="px-6 py-3.5 border border-[#e2e4dc] rounded-lg text-sm text-[#6b6b64] hover:text-[#1a1a18] hover:border-[#3a3a36] transition"
          >
            Browse all roles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
