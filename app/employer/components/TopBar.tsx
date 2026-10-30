import Link from "next/link";
import React, { RefObject } from "react";

function BoltIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

function RevealBalance({ remaining }: { remaining: number }) {
  if (remaining > 0) {
    return (
      <span
        className="inline-flex cursor-default items-center gap-1 text-[11.5px] font-semibold text-forest [text-shadow:0_0_10px_rgba(45,80,22,.18)]"
        title="15 added monthly · unused Reveals carry forward"
      >
        <span className="text-[12.5px] font-bold text-forest">{remaining}</span>
        {remaining === 1 ? "Reveal" : "Reveals"} available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-forest">
      <span className="text-[12.5px] font-bold text-ink-faint">0</span> Reveals
      available ·{" "}
      <a
        href="#pricing"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("pricing")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="font-semibold text-forest underline"
      >
        Add Reveals
      </a>
    </span>
  );
}

const TopBar = function TopBar({
  revealsRemaining,
  onUrgentHire,
  onClose,
  closeRef,
}: {
  revealsRemaining: number;
  onUrgentHire: () => void;
  onClose: () => void;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className="z-35 hidden md:flex shrink-0 flex-wrap  items-center justify-between gap-4 bg-cream pt-3.25 pb-2.75 shadow-[0_1px_0_var(--color-line)]">
      <div className="flex items-center gap-3.5">
        <div className="font-serif text-[21px] leading-none font-bold tracking-[.04em] text-forest-deep">
          VETTED
        </div>
        <div className="flex flex-col justify-center gap-0.5 border-l border-ash pl-3.5 leading-[1.3]">
          <div className="text-[12.5px] font-semibold tracking-[.01em] text-ink-soft">
            Try the Registry
          </div>
          <div className="text-[10.5px] font-medium tracking-[.02em] text-ink-faint">
            Interactive preview · Sample profiles
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <RevealBalance remaining={revealsRemaining} />
        <Link href="/employer#urgent">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-forest px-4 py-2.25 text-[12.5px] font-bold text-white transition-colors hover:bg-forest-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-deep"
          >
            <BoltIcon />
            Urgent Hire
          </button>
        </Link>

        <Link href="/employer">
          <button
            ref={closeRef}
            type="button"
            className="shrink-0 cursor-pointer rounded-full border border-ash bg-white px-4 py-2.25 text-[12.5px] font-semibold text-ink-faint transition-all hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Close ✕
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
