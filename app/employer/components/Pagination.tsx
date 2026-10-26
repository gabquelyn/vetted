import React from "react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Hidden when there's only one page, as in the HTML
  if (totalPages <= 1) return null;

  const btn =
    "h-7 min-w-7 cursor-pointer rounded-lg border border-ash bg-white px-2 text-xs font-semibold text-ink-soft transition-colors enabled:hover:border-forest enabled:hover:text-forest disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
  const btnActive =
    "h-7 min-w-7 cursor-pointer rounded-lg border border-forest bg-forest px-2 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-center gap-1.5 border-t border-ash pt-5"
    >
      <button
        type="button"
        className={btn}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          className={p === page ? btnActive : btn}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className={btn}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}