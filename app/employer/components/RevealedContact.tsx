"use client";

import React from "react";

export default function RevealedContact({
  values,
  active = true,
}: {
  values: string[];

  active?: boolean;
}) {
  return (
    <div className="relative isolate mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-mid">
      {values.map((value, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="hidden h-4 w-px bg-ash sm:block" />
          )}
          <p className="break-all">{value}</p>
        </React.Fragment>
      ))}
    </div>
  );
}
