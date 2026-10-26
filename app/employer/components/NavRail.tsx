"use client";
import { useEffect, useRef } from "react";
import {
  FiBook,
  FiBookmark,
  FiCheckSquare,
  FiClock,
  FiEye,
  FiEyeOff,
  FiGrid,
  FiStar,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type SeparatorItem = {
  id: "sep1" | "sep2";
  sep: true;
};

type NavItem = {
  id: ActiveView;
  label: string;
  aria: string;
  icon: IconType;
  data_tour?: string;
};

type Counts = Partial<Record<ActiveView, number>>;

type NavRailProps = {
  active?: ActiveView;
  counts?: Counts;
  onSelect?: (id: ActiveView) => void;
};

type Item = NavItem | SeparatorItem;

const ITEMS: Item[] = [
  {
    id: "registry",
    label: "Registry",
    aria: "Registry — Find professionals",
    icon: FiGrid,
  },
  {
    id: "directory",
    label: "Directory",
    aria: "Directory — Search the broader professional network",
    icon: FiBook,
  },
  {
    id: "urgent",
    label: "Urgent",
    aria: "Urgent Hiring",
    icon: FiZap,
  },
  {
    id: "sep1",
    sep: true,
  },
  {
    id: "saved",
    label: "Saved",
    aria: "Saved Candidates",
    icon: FiStar,
  },
  {
    id: "searches",
    label: "Searches",
    aria: "Saved Searches",
    icon: FiBookmark,
  },
  {
    id: "recent",
    label: "Recent",
    aria: "Recently Viewed",
    icon: FiClock,
  },
  {
    id: "reveals",
    label: "Revealed",
    aria: "Revealed Professionals",
    icon: FiEye,
  },
  {
    id: "requests",
    label: "Requests",
    aria: "Requests — pending Specialist requests",
    icon: FiUsers,
  },
  {
    id: "sep2",
    sep: true,
  },
  {
    id: "compare",
    label: "Compare",
    aria: "Compare selected professionals",
    icon: FiCheckSquare,
    data_tour: "compare",
  },
  {
    id: "hidden",
    label: "Hidden",
    aria: "Hidden candidates",
    icon: FiEyeOff,
  },
];

/* Mobile: icon + label side by side in a pill, in a top menu bar.
   lg+: the HTML rail item — 54×48, icon stacked above a 9.5px label, 9px radius. */
const itemBase =
  "relative flex h-10 shrink-0 snap-start cursor-pointer flex-row items-center justify-center gap-1.5 rounded-full px-3.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest lg:h-12 lg:w-[54px] lg:flex-col lg:gap-1 lg:rounded-[9px] lg:p-0";

export default function NavRail({
  active = "registry",
  counts,
  onSelect,
}: NavRailProps) {
  const navRef = useRef<HTMLElement>(null);

  // Keep the active tab visible when the mobile bar is scrolled sideways.
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );
    el?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="sticky top-0 z-30 w-full min-w-0 shrink-0 lg:static lg:z-auto lg:h-full lg:w-auto">
      <nav
        ref={navRef}
        aria-label="Employer workspace navigation"
        className="
          flex w-full max-w-full snap-x snap-proximity flex-row items-center gap-2
          overflow-x-auto overflow-y-hidden overscroll-x-contain
          border-b border-ash bg-transparent px-3 py-2
          [scrollbar-color:#b7bcc3_transparent] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          lg:h-full lg:max-h-full lg:snap-none lg:flex-col lg:items-center lg:gap-5
          lg:overflow-x-hidden lg:overflow-y-auto lg:[scrollbar-width:thin]
          lg:rounded-none lg:border-b-0 lg:border-r lg:px-3 lg:py-1.5
        "
      >
        {ITEMS.map((item) => {
          if ("sep" in item) {
            return (
              <div
                key={item.id}
                aria-hidden="true"
                className="mx-1 h-5 w-px shrink-0 bg-ash lg:mx-0 lg:my-1 lg:h-px lg:w-[22px]"
              />
            );
          }

          const isActive = active === item.id;
          const count = counts?.[item.id] ?? 0;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              title={item.aria}
              aria-label={item.aria}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
              data-tour={item?.data_tour}
              className={`${itemBase} ${
                isActive
                  ? "bg-[#16260c] text-white lg:shadow-[inset_3px_0_0_#B9D8A0]"
                  : "bg-transparent text-ink hover:bg-forest-light hover:text-forest"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
                className="h-3.75 w-3.75 shrink-0 lg:h-5 lg:w-5"
              />

              <span className="whitespace-nowrap text-[.75rem] font-semibold leading-none tracking-[.01em] lg:text-[9.5px]">
                {item.label}
              </span>

              {count > 0 && (
                <span className="flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-[#b8722c] px-[3px] text-[9px] font-bold text-white lg:absolute lg:right-px lg:top-px lg:ring-2 lg:ring-white">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
