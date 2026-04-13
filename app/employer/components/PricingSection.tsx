"use client";

import { motion } from "motion/react";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const prices = {
    solo: { price: "$19", note: "7 reveals" },
    small: { price: "$29", note: "14 reveals" },
  };

  return (
    <section className="relative border-t border-ash bg-forest-pale px-6 md:px-12 py-28" id="pricing">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
            Pricing
          </p>
          <h2 className="text-4xl font-serif md:text-5xl text-ink">
            Simple, <span className="text-forest">transparent</span> pricing.
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            Pay per reveal — or subscribe for regular hiring.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div
          className={`grid gap-6 mx-auto mb-10  max-w-5xl md:grid-cols-3
          `}
        >
          {/* SOLO */}
          <PricingCard
            title="Solo Hire"
            price={prices.solo.price}
            note={prices.solo.note}
            features={[
              "7 candidate reveals",
              "Full profile on unlock",
              "30 days workspace",
              "Saved searches",
            ]}
          />

          {/* SMALL */}
          <PricingCard
            title="Small Team"
            price={prices.small.price}
            note={prices.small.note}
            features={[
              "14 candidate reveals",
              "Full profile on unlock",
              "30 days workspace",
              "Saved searches",
            ]}
          />

          <PricingCard
            featured
            title="Enterprise"
            price="$99"
            note="8 reveals/month"
            subnote="Billed monthly · cancel anytime"
            features={[
              "8 reveals monthly",
              "Workspace included",
              "Instant alerts",
              "Unlimited searches",
              "Analytics dashboard",
            ]}
          />
        </div>

        {/* Footnotes */}
        {/* <div className="grid gap-4 max-w-5xl mx-auto md:grid-cols-3">
          {[
            {
              icon: "🗂",
              title: "Workspace access",
              text: "Collaborate and manage hiring workflows.",
            },
            {
              icon: "🔒",
              title: "Credits never expire",
              text: "Use them whenever you need.",
            },
            {
              icon: "★",
              title: "Specialist profiles",
              text: "Advanced roles unlock at flat pricing.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg bg-cream p-4"
            >
              <div className="mb-1">{item.icon}</div>
              <p className="text-sm font-medium text-ink">{item.title}</p>
              <p className="text-xs text-ink-soft">{item.text}</p>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
