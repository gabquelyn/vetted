"use client";
import { motion } from "motion/react";

export default function SectionDivider({
  fill = "#faf9f6",
}: {
  fill?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden leading-none">
      <motion.svg
        viewBox="0 0 1440 120"
        className="w-full h-auto"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }} 
      >
        <motion.path
           d="M0,0 C360,20 1080,-20 1440,0 V120 H0 Z"
          fill={fill}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />
      </motion.svg>
    </div>
  );
}
