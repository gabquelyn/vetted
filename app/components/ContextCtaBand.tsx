import React from "react";
import Link from "next/link";

export interface ContextCtaBandProps {
  headline?: string;
  body: string;
  href: string;
  buttonLabel?: string;
  /** Tighter top margin (used on the /findwork home page). */
  tight?: boolean;
}

/**
 * Dark "Join the Vetted Registry" band. In the original app this was filled in
 * after render by applyCta() poking the DOM; here the copy and href are plain
 * props (build them with computeCta() from findworkPages).
 */
export default function ContextCtaBand({
  headline = "Join the Vetted Registry",
  body,
  href,
  buttonLabel = "Join the Registry →",
  tight = false,
}: ContextCtaBandProps) {
  return (
    <section
      className={`bg-[#16260c] px-5 py-12 font-serif text-white antialiased min-[860px]:px-12 min-[860px]:py-16 ${
        tight ? "mt-6" : "mt-14"
      }`}
    >
      <div className="mx-auto max-w-140 text-center">
        <h2 className="mb-3.5 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-[1.22]">
          {headline}
        </h2>
        <p className="mb-6.5 text-[14.5px] leading-[1.55] text-white/75">{body}</p>
        <Link
          href={href}
          className="inline-block rounded-[10px] bg-white px-6.5 py-3.5 text-[14px] font-semibold text-[#16260c] no-underline transition-colors duration-150 hover:bg-[#e8f0e0]"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
