"use client";
import { useEffect, useRef } from "react";
import {
  FiArchive,
  FiClock,
  FiEye,
  FiEyeOff,
  FiGrid,
  FiSearch,
  FiStar,
  FiUsers,
  FiZap,
  FiCheckSquare,
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
    icon: FiArchive,
  },
  // {
  //   id: "urgent",
  //   label: "Urgent",
  //   aria: "Urgent Hiring",
  //   icon: FiZap,
  // },
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
    icon: FiSearch,
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
  },
  // {
  //   id: "hidden",
  //   label: "Hidden",
  //   aria: "Hidden candidates",
  //   icon: FiEyeOff,
  // },
];

/* Mobile: icon + label side by side in a pill, in a top menu bar.
   lg+: icon stacked above label, in the vertical sidebar rail. */
const itemBase =
  "relative flex h-10 shrink-0 snap-start cursor-pointer flex-row items-center justify-center gap-1.5 rounded-full px-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest lg:h-12 lg:w-full lg:flex-col lg:gap-1 lg:rounded-[9px] lg:p-3";

export default function NavRail({
  active = "registry",
  counts,
  onSelect,
}: NavRailProps) {
  const navRef = useRef<HTMLElement>(null);

  // Keep the active tab visible when the mobile bar is scrolled sideways.
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-0 z-30 w-full min-w-0 shrink-0 bg-white lg:static lg:z-auto lg:h-full lg:w-auto">
      <nav
        ref={navRef}
        aria-label="Employer workspace navigation"
        className="
          flex w-full max-w-full snap-x snap-proximity flex-row items-center gap-2
          overflow-x-auto overflow-y-hidden overscroll-x-contain
          border-b border-ash px-3 py-2
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          lg:h-full lg:max-h-full lg:snap-none lg:flex-col lg:items-stretch lg:gap-4
          lg:overflow-x-hidden lg:overflow-y-auto
          lg:border-b-0 lg:border-r lg:px-3 lg:py-1.5 lg:pb-5 lg:pt-6
        "
      >
        {ITEMS.map((item) => {
          if ("sep" in item) {
            return (
              <div
                key={item.id}
                aria-hidden="true"
                className="mx-1 h-5 w-px shrink-0 bg-ash lg:mx-0 lg:my-1 lg:h-px lg:w-5.5 lg:self-center"
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
              className={`${itemBase} ${
                isActive
                  ? "bg-forest text-white"
                  : "bg-transparent text-ink-soft hover:bg-forest-light hover:text-forest"
              }`}
            >
              <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />

              <span className="whitespace-nowrap text-[.75rem] font-semibold leading-none tracking-[.01em] lg:text-[.7rem]">
                {item.label}
              </span>

              {count > 0 && (
                <span className="flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-highlight px-0.75 text-[9px] font-bold text-white lg:absolute lg:right-px lg:top-px">
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