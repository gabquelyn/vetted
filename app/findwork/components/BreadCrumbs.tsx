import { Fragment } from "react";

interface CrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: CrumbItem[] }) {
  return (
    <nav
      className="mb-5.5 flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-soft max-[860px]:text-[11.5px]"
      aria-label="Breadcrumb"
    >
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && (
              <span className="text-[#e5e2da]" aria-hidden="true">
                /
              </span>
            )}
            {isLast || !it.href ? (
              <span className="font-medium text-ink" aria-current={isLast ? "page" : undefined}>
                {it.label}
              </span>
            ) : (
              <a
                href={it.href}
                className="text-ink-soft transition-colors duration-150 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                {it.label}
              </a>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}