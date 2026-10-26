"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { LuX } from "react-icons/lu";
import MultiSelect from "./MultiSelect";
import {
  EMPLOYMENT,
  ENVIRONMENT,
  MOBILITY,
  PROFESSIONS,
  PROFILE,
  SHIFTS,
} from "@/app/data/professions";
import { AVAILABILITY } from "@/app/data/registry";

const PANEL_WIDTH = 288; // w-72
const VIEWPORT_GUTTER = 8;
const CLOSE_DELAY_MS = 120;

/** Subscribes to a media query without setting state from an effect. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false, // server snapshot: render the desktop layout first
  );
}

/** Number of selected values, whether the filter holds an array, a Set or a scalar. */
const selectedCount = (v: unknown): number =>
  Array.isArray(v) ? v.length : v instanceof Set ? v.size : v ? 1 : 0;

type CardMode = "floating" | "pinned" | "sheet";

/* ---------- small building blocks (mirror .fd-filters-core-label, .fd-more-label, .fd-group-toggle) ---------- */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-1.5 text-[10px] font-semibold text-[#8a8a84]">{children}</p>
);

function FilterGroup({
  title,
  count,
  open,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ash last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`flex w-full cursor-pointer select-none items-center gap-[7px] rounded-[3px] py-2.5 text-left text-xs hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
          count > 0 ? "font-bold text-[#16260c]" : "font-semibold text-ink"
        }`}
      >
        <span className="flex-1">{title}</span>
        {count > 0 && (
          <span className="shrink-0 rounded-full bg-forest-light px-[7px] py-0.5 text-[10px] font-bold text-forest">
            {count}
          </span>
        )}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`shrink-0 text-[#8a8a84] transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-2 pb-3">{children}</div>}
    </div>
  );
}

export default function Filtering({
  filters,
  count,
  setFilters,
  onClear,
  activatePanel,
  setActivatePanel, // toggles the pinned state in the parent
}: {
  onClear: () => void;
  count: number;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  activatePanel: boolean;
  setActivatePanel: () => void;
}) {
  // Below Tailwind's md breakpoint: small button + bottom sheet, no hover logic.
  const isMobile = useMediaQuery("(max-width: 767px)");
  // The inline pinned block is a desktop-only idea; mobile never uses it.
  const pinned = activatePanel && !isMobile;

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  // Clip only while the pinned block is animating its height, so inner
  // dropdowns (MultiSelect lists) aren't cut off once it has settled.
  const [clip, setClip] = useState(false);
  // Refine groups: 1 = Role & Setting, 2 = Location & Mobility, 3 = Profile & Status
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});
  const toggleGroup = (n: number) =>
    setOpenGroups((g) => ({ ...g, [n]: !g[n] }));

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- open / close helpers (desktop hover works across the portal gap) ---
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // Measure the trigger and place the floating panel over it (top-left aligned,
  // like the HTML dock). Only called from event handlers and external-event
  // subscriptions, never from an effect body.
  const updatePosition = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxLeft = window.innerWidth - PANEL_WIDTH - VIEWPORT_GUTTER;
    setPos({
      top: rect.top,
      left: Math.max(VIEWPORT_GUTTER, Math.min(rect.left, maxLeft)),
    });
  }, []);

  const openPanel = useCallback(() => {
    cancelClose();
    updatePosition();
    setOpen(true);
  }, [cancelClose, updatePosition]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Click / keyboard toggle for the trigger.
  const togglePanel = () => {
    cancelClose();
    updatePosition();
    setOpen((o) => !o);
  };

  // Pinning hands the panel over to the inline block, so dismiss the popup
  // in the same event that flips the pinned state.
  const handlePinToggle = () => {
    cancelClose();
    setOpen(false);
    setActivatePanel();
  };

  // --- keep the floating panel anchored while the page scrolls / resizes ---
  useEffect(() => {
    if (!open || pinned || isMobile) return;
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, pinned, isMobile, updatePosition]);

  // --- Escape closes both modes; outside-click closes the desktop popup only.
  useEffect(() => {
    if (!open || pinned) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    if (!isMobile) document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, pinned, isMobile]);

  // Lock page scroll behind the mobile sheet.
  useEffect(() => {
    if (!open || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  const roleCount =
    selectedCount(filters.environment) +
    selectedCount(filters.shift) +
    selectedCount(filters.employment);
  const mobilityCount = selectedCount(filters.mobility);
  const profileCount = selectedCount(filters.profile);

  const msClass = "relative inline-block w-20 overflow-y-auto bg-white ";

  // --- the card itself, shared by the floating, pinned and sheet modes ---
  const renderCard = (mode: CardMode) => (
    <div
      className={`flex flex-col bg-[#fcfaf5] p-4 text-xs overflow-y-auto overscroll-contain [scrollbar-color:#b7bcc3_transparent] [scrollbar-width:thin] [&>*]:shrink-0 ${
        mode === "sheet"
          ? "rounded-t-2xl border-t border-[#ece5d3] pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,.18)]"
          : mode === "floating"
            ? "rounded-2xl border border-[#ece5d3] shadow-[0_20px_48px_rgba(28,52,16,.16)]"
            : "rounded-2xl border border-[#ece5d3]"
      }`}
      style={{
        maxHeight:
          mode === "sheet"
            ? "85vh"
            : mode === "pinned"
              ? "calc(100vh - 2rem)"
              : // floating: cap to the space below the panel's top edge
                `max(15rem, calc(100vh - ${pos.top}px - 1rem))`,
      }}
    >
      {/* Header: "Search & Filter" + Pin / Collapse */}
      <div className="mb-2.5 flex items-center justify-between border-b border-ash pb-[9px]">
        <span className="text-[10px] font-bold uppercase tracking-[.05em] text-[#8a8a84]">
          Search &amp; Filter
        </span>

        {mode === "sheet" ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
            className="cursor-pointer rounded-full p-1.5 text-ink-soft hover:bg-forest-light hover:text-forest"
          >
            <LuX size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePinToggle}
            aria-pressed={pinned}
            aria-label={pinned ? "Collapse filters" : "Pin filters open"}
            title={pinned ? "Collapse filters" : "Pin filters open"}
            className={`flex cursor-pointer items-center gap-[5px] rounded-[7px] border px-2.5 py-1.5 text-[11px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              pinned
                ? "border-forest bg-forest text-white"
                : "border-ash bg-white text-ink-soft hover:border-forest hover:text-forest"
            }`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v8m0 0-4 2 1 3h6l1-3-4-2Zm0 10v4" />
            </svg>
            {pinned ? "Collapse" : "Pin"}
          </button>
        )}
      </div>

      {/* Primary Search */}
      <div>
        <div className="mb-[9px] text-[10px] font-bold uppercase tracking-[.05em] text-forest">
          Primary Search
        </div>
        <div className="grid grid-cols-1 gap-[9px]">
          <div>
            <FieldLabel>Profession</FieldLabel>
            <MultiSelect
              value={filters.profession}
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, profession: val }))
              }
              className={msClass}
              options={PROFESSIONS.map((p) => ({ label: p[1], value: p[0] }))}
              allowSearch
            />
          </div>
          <div>
            <FieldLabel>Availability</FieldLabel>
            <MultiSelect
              value={filters.availability}
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, availability: val }))
              }
              className={msClass}
              options={AVAILABILITY.map((a) => ({ label: a, value: a }))}
            />
          </div>
        </div>
      </div>

      {/* Refine */}
      <div className="mt-[18px] border-t border-ash pt-[15px] text-[9.5px] font-bold uppercase tracking-[.05em] text-[#8a8a84]">
        Refine
      </div>

      <FilterGroup
        title="Role & Setting"
        count={roleCount}
        open={!!openGroups[1]}
        onToggle={() => toggleGroup(1)}
      >
        <div>
          <FieldLabel>Experienced environment</FieldLabel>
          <MultiSelect
            value={filters.environment}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, environment: val }))
            }
            className={msClass}
            options={ENVIRONMENT.map((e) => ({ label: e, value: e }))}
            allowSearch
          />
        </div>
        <div>
          <FieldLabel>Shifts</FieldLabel>
          <MultiSelect
            value={filters.shift}
            onChange={(val) => setFilters((prev) => ({ ...prev, shift: val }))}
            className={msClass}
            options={SHIFTS.map((e) => ({ label: e, value: e }))}
          />
        </div>
        <div>
          <FieldLabel>Employment</FieldLabel>
          <MultiSelect
            value={filters.employment}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, employment: val }))
            }
            className={msClass}
            options={EMPLOYMENT.map((e) => ({ label: e, value: e }))}
          />
        </div>
      </FilterGroup>

      <FilterGroup
        title="Location & Mobility"
        count={mobilityCount}
        open={!!openGroups[2]}
        onToggle={() => toggleGroup(2)}
      >
        <div className="w-full">
          <FieldLabel>Mobility</FieldLabel>
          <MultiSelect
            value={filters.mobility}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, mobility: val }))
            }
            className={msClass}
            options={MOBILITY.map((e) => ({ label: e[1], value: e[0] }))}
          />
        </div>
      </FilterGroup>

      <FilterGroup
        title="Profile & Status"
        count={profileCount}
        open={!!openGroups[3]}
        onToggle={() => toggleGroup(3)}
      >
        <div>
          <FieldLabel>Profile</FieldLabel>
          <MultiSelect
            value={filters.profile}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, profile: val }))
            }
            className={msClass}
            options={PROFILE.map((e) => ({ label: e[1], value: e[0] }))}
          />
        </div>
      </FilterGroup>

      {/* actions */}
      {mode === "sheet" ? (
        <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-ash pt-3">
          <button
            type="button"
            className="cursor-pointer text-[11.5px] font-semibold text-forest hover:text-[#1e3a0f] hover:underline"
            onClick={onClear}
          >
            Clear filters
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full bg-forest px-5 py-2 font-semibold text-white hover:bg-[#3d6b1f]"
            onClick={() => setOpen(false)}
          >
            Show results
          </button>
        </div>
      ) : (
        <div className="mt-2.5 flex gap-[18px] border-t border-ash pt-3">
          <button
            type="button"
            className="cursor-pointer rounded-[3px] text-[11.5px] font-semibold text-forest transition-colors hover:text-[#1e3a0f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            onClick={onClear}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );

  // --- desktop floating popup (portaled so no ancestor can cover or clip it) ---
  // It opens directly over the strip, top-left aligned, so the pointer never
  // leaves the panel and no hover bridge is needed.
  const floatingPanel = (
    <AnimatePresence>
      {open && !pinned && !isMobile && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: PANEL_WIDTH,
            transformOrigin: "top left",
            zIndex: 9999,
          }}
          onMouseEnter={openPanel}
          onMouseLeave={scheduleClose}
        >
          {renderCard("floating")}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- mobile bottom sheet: stays open until explicitly closed ---
  const mobileSheet = (
    <AnimatePresence>
      {open && isMobile && (
        <motion.div
          key="backdrop"
          aria-hidden
          className="fixed inset-0 z-9998 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        />
      )}
      {open && isMobile && (
        <motion.div
          key="sheet"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className="fixed inset-x-0 bottom-0 z-9999"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {renderCard("sheet")}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative" data-tour="filters">
      {/* When pinned, the card takes the strip's place in the layout as a block */}
      <AnimatePresence mode="wait" initial={false}>
        {pinned ? (
          <motion.div
            key="pinned"
            data-tour="filters-heading"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onAnimationStart={() => setClip(true)}
            onAnimationComplete={() => setClip(false)}
            style={{
              width: PANEL_WIDTH,
              overflow: clip ? "hidden" : "visible",
            }}
          >
            {renderCard("pinned")}
          </motion.div>
        ) : (
          <motion.div
            key="trigger"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label="Open filters"
              // Desktop: hover opens, a click doesn't fight it. Mobile: plain click toggles.
              onMouseEnter={isMobile ? undefined : openPanel}
              onMouseLeave={isMobile ? undefined : scheduleClose}
              onClick={isMobile ? togglePanel : undefined}
              onPointerDown={(e) => {
                if (!isMobile && e.pointerType !== "mouse") togglePanel();
              }}
              onKeyDown={(e) => {
                if (isMobile) return; // Enter/Space already fire click on mobile
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePanel();
                }
              }}
              className={`relative cursor-pointer border border-ash bg-white text-ink-soft transition-colors hover:border-forest hover:text-forest focus-visible:border-forest focus-visible:text-forest focus-visible:outline-none ${
                isMobile
                  ? "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  : "flex w-[52px] flex-col items-center gap-[9px] rounded-[14px] px-1.5 py-3.5"
              }`}
            >
              {isMobile && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[9.5px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>

              {/* desktop: vertical-rl + rotate-180 reads bottom-to-top */}
              <span
                className={
                  isMobile
                    ? ""
                    : "text-[10px] font-bold uppercase tracking-[.09em] [writing-mode:vertical-rl] rotate-180"
                }
              >
                Filters
              </span>

              {!isMobile && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[9.5px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {typeof document !== "undefined" &&
        createPortal(
          <>
            {floatingPanel}
            {mobileSheet}
          </>,
          document.body,
        )}
    </div>
  );
}
