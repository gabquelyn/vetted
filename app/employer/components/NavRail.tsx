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

type NavItemId =
  | "registry"
  | "directory"
  | "urgent"
  | "saved"
  | "searches"
  | "recent"
  | "revealed"
  | "requests"
  | "compare"
  | "hidden";

type SeparatorItem = {
  id: "sep1" | "sep2";
  sep: true;
};

type NavItem = {
  id: NavItemId;
  label: string;
  aria: string;
  icon: IconType;
};

type Counts = Partial<Record<NavItemId, number>>;

type NavRailProps = {
  active?: NavItemId;
  counts?: Counts;
  onSelect?: (id: NavItemId) => void;
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
    icon: FiSearch,
  },
  {
    id: "recent",
    label: "Recent",
    aria: "Recently Viewed",
    icon: FiClock,
  },
  {
    id: "revealed",
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
  {
    id: "hidden",
    label: "Hidden",
    aria: "Hidden candidates",
    icon: FiEyeOff,
  },
];

const itemBase =
  "relative text-ink-soft p-3 flex h-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-[9px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export default function NavRail({
  active = "registry",
  counts = {},
  onSelect,
}: NavRailProps) {
  return (
    <div className="shrink-0">
      <nav
        aria-label="Employer workspace navigation"
        className="flex gap-4 pt-6 h-full max-h-full shrink-0 flex-col items-center overflow-y-auto border-r border-ash px-3 py-1.5 pb-5"
      >
        {ITEMS.map((item) => {
          if ("sep" in item) {
            return (
              <div
                key={item.id}
                aria-hidden="true"
                className="my-1 h-px w-5.5 bg-ash"
              />
            );
          }

          const isActive = active === item.id;
          const count = counts[item.id] ?? 0;
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
                  ? "text-white bg-forest"
                  : "bg-transparent text-ink hover:bg-forest-light hover:text-forest"
              }`}
            >
              <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0"/>

              {count > 0 && (
                <span className="absolute top-px right-px flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-amber px-0.75 text-[9px] font-bold text-white shadow-[0_0_0_2px_#fff]">
                  {count}
                </span>
              )}

              <span className="text-[.7rem] leading-none font-semibold tracking-[.01em] whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
