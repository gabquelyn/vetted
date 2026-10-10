"use client";
import { motion } from "motion/react";
import { GiCheckMark } from "react-icons/gi";


export default function TrustBar({ items = [] }: { items?: string[] }) {
  return (
    <div className="bg-[#faf9f6] border-t border-b border-ash px-12 py-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="max-w-275 mx-auto flex items-center justify-center gap-12 flex-wrap"
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-2 text-xs font-normal text-ink-mid"
          >
            {/* 🔥 POPPING CHECK ICON */}
            <motion.span
              variants={{
                hidden: { scale: 0, rotate: -30 },
                visible: {
                  scale: [0, 1.2, 1],
                  rotate: [-30, 10, 0],
                },
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-[#2D5016] flex items-center"
            >
              <GiCheckMark />
            </motion.span>

            {item}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="h-px w-full bg-border origin-left"
      />
    </div>
  );
}
