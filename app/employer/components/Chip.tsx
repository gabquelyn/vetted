import React from "react";

export default function Chip({children}: {children: React.ReactNode}) {
  return (
    <span className="rounded-full bg-forest-light px-2 py-[2.5px] text-[9.5px] font-semibold text-forest">
      {children}
    </span>
  );
}
