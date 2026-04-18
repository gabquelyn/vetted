"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import clsx from "clsx";


export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname()

  const links = [
    { href: "/candidate#how-it-works", label: "How It Works" },
    { href: "/insights", label: "Insights" },
    { href: "/employer", label: "For Employers" },
    { href: "/candidate#join", label: "Join the Registry" },
    { href: "/bespoke", label: "Bespoke" },
    { href: "/employer#pricing", label: "Pricing" },
    { href: "/findwork", label: "Find Work" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-ash bg-cream/90 backdrop-blur-md">
      <div className="px-[10%] py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-semibold uppercase font-serif text-ink">
          Vetted
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-6 text-[14px] text-ink-soft">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx("hover:text-ink transition", pathname == link.href && "text-forest font-bold")}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* CTA */}
          <li>
            <Link
              href="/employer#early-access"
              className="ml-2 bg-forest text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Get Early Access
            </Link>
          </li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-ash bg-cream"
          >
            <div className="flex flex-col px-6 py-6 gap-4 text-[15px] text-ink">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-forest transition"
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/employer#early-access"
                onClick={() => setOpen(false)}
                className="mt-2 bg-forest text-white px-4 py-3 rounded-lg text-center font-medium"
              >
                Get Early Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}