"use client";

import { motion } from "motion/react";

type CircularProgressProps = {
  percent?: number;
  size?: number;
};

export default function CircularProgress({
  percent = 76,
  size = 160,
}: CircularProgressProps) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#faf9f6"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />

        {/* Animated progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="font-mono text-[32px] font-bold text-forest">
          23
        </div>

        <div className="mt-0.5 text-[10px] uppercase tracking-[0.06em] text-forest-mid">
          of 30 days
        </div>
      </div>
    </div>
  );
}