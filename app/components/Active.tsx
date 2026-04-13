import React from "react";
import clsx from "clsx";
export default function Active({ active }: { active?: boolean }) {
  return (
    <div
      className={clsx(
        active
          ? "bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]"
          : "bg-ink-soft/30 shadow-[0_0_0_3px_rgba(225,225,225,0.2)]",
        "h-2 w-2 rounded-full",
      )}
    />
  );
}
