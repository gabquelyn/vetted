"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="footer-logo">
            Vetted
          </Link>
          <p className="text-sm text-white/40 tracking-wide leading-relaxed">
            Ontario&apos;s curated registry.
            <br />
            Built for professionals who deserve to be found.
          </p>
          <p className="text-xs text-white/30 mt-4">
            © 2025 Vetted. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-12 md:gap-24">
          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase mb-3">
              Platform
            </h4>
            <ul className="flex flex-col gap-2">
              {["For Employers", "For Professionals", "Pricing"].map(
                (link, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={`/${link.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-sm "
                    >
                      {link}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase mb-3">
              Features
            </h4>
            <ul className="flex flex-col gap-2">
              <motion.li whileHover={{ x: 4 }}>
                <Link
                  href="/employer#short-notice"
                  className="flex items-center gap-2 text-sm"
                >
                  Short-Notice & IC Filter
                </Link>
              </motion.li>
              {["45-Day Verification", "Pay-to-Reveal"].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 4 }}>
                  <Link href="/employer" className="text-sm ">
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase mb-3">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              {["Privacy", "Terms", "Contact"].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 4 }}>
                  <Link href="#" className="text-sm ">
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
