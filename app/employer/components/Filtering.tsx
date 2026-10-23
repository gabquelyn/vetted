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
import { LuFilter, LuX } from "react-icons/lu";
import { GoPin } from "react-icons/go";
import Divider from "./Divider";
import MultiSelect from "./MultiSelect";
import {
  EMPLOYMENT,
  ENVIRONMENT,
  MOBILITY,
  PROFESSIONS,
  PROFILE,
  SHIFTS,
} from "@/app/data/professions";

const PANEL_WIDTH = 288; // w-72
const VIEWPORT_GUTTER = 8;
const CLOSE_DELAY_MS = 120;

/** Subscribes to a media query without setting state from an effect. */
function useMediaQuery(query: string) {
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

type CardMode = "floating" | "pinned" | "sheet";

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

  // Measure the trigger and place the floating panel under it. Only called
  // from event handlers and external-event subscriptions, never from an
  // effect body, so it doesn't cause cascading renders.
  const updatePosition = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxLeft = window.innerWidth - PANEL_WIDTH - VIEWPORT_GUTTER;
    setPos({
      top: rect.bottom,
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
  // Desktop only. Pure subscription: setState happens inside the callback.
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
  // On mobile the sheet stays until the user closes it (backdrop, ✕ or
  // "Show results"), so a stray tap inside a nested dropdown can't dismiss it.
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

  // --- the card itself, shared by the floating, pinned and sheet modes ---
  const renderCard = (mode: CardMode) => (
    <div
      className={`text-xs flex flex-col gap-2 bg-[#FCFAF5] p-4 overflow-y-auto overscroll-contain [&>*]:shrink-0 ${
        mode === "sheet"
          ? "rounded-t-2xl border-t border-ash pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,.18)]"
          : mode === "floating"
            ? "rounded-xl border border-ash shadow-lg"
            : "rounded-xl border border-ash"
      }`}
      style={{
        maxHeight:
          mode === "sheet"
            ? "85vh"
            : mode === "pinned"
              ? "calc(100vh - 2rem)"
              : // floating: cap to the space below the trigger
                `max(15rem, calc(100vh - ${pos.top}px - 1.5rem))`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="uppercase">Search and Filter</p>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="h-4 min-w-4 px-1 flex items-center justify-center rounded-full bg-forest text-white text-[.55rem]"
            >
              {count}
            </motion.span>
          )}
        </div>

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
            aria-label={pinned ? "Unpin filters" : "Pin filters"}
            title={pinned ? "Unpin filters" : "Pin filters"}
            className={`cursor-pointer p-2 px-3 rounded-lg border transition-colors ${
              pinned
                ? "bg-forest text-white border-forest"
                : "bg-white text-ink border-ash hover:border-gray-300"
            }`}
          >
            <motion.span
              className="block"
              animate={{
                rotate: pinned ? 0 : 45,
                scale: pinned ? [1, 1.25, 1] : 1,
              }}
              transition={{
                rotate: { type: "spring", stiffness: 400, damping: 18 },
                // keyframe arrays can't use springs, so the pop is a tween
                scale: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <GoPin />
            </motion.span>
          </button>
        )}
      </div>
      <Divider />

      <div>
        <p className="text-ink-soft font-bold mb-2">Primary Search</p>
        <MultiSelect
          value={filters.profession}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, profession: val }))
          }
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={PROFESSIONS.map((p) => ({ label: p[1], value: p[0] }))}
          allowSearch
        />
      </div>

      <div>
        <p className="text-ink-soft font-bold mb-2">Experienced environment</p>
        <MultiSelect
          value={filters.environment}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, environment: val }))
          }
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={ENVIRONMENT.map((e) => ({ label: e, value: e }))}
          allowSearch
        />
      </div>

      <div>
        <p className="text-ink-soft font-bold mb-2">Shifts</p>
        <MultiSelect
          value={filters.shift}
          onChange={(val) => setFilters((prev) => ({ ...prev, shift: val }))}
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={SHIFTS.map((e) => ({ label: e, value: e }))}
        />
      </div>

      <div>
        <p className="text-ink-soft font-bold mb-2">Employment</p>
        <MultiSelect
          value={filters.employment}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, employment: val }))
          }
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={EMPLOYMENT.map((e) => ({ label: e, value: e }))}
        />
      </div>

      <div className="w-full">
        <p className="text-ink-soft font-bold mb-2">Mobility</p>
        <MultiSelect
          value={filters.mobility}
          onChange={(val) => setFilters((prev) => ({ ...prev, mobility: val }))}
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={MOBILITY.map((e) => ({ label: e[1], value: e[0] }))}
        />
      </div>

      <div>
        <p className="text-ink-soft font-bold mb-2">Profile</p>
        <MultiSelect
          value={filters.profile}
          onChange={(val) => setFilters((prev) => ({ ...prev, profile: val }))}
          className="relative inline-block w-20 overflow-y-auto bg-white "
          options={PROFILE.map((e) => ({ label: e[1], value: e[0] }))}
        />
      </div>

      {/* actions */}
      {mode === "sheet" ? (
        <div className="flex items-center justify-between gap-3 pt-1">
          <button className="cursor-pointer text-ink-soft" onClick={onClear}>
            Clear filters
          </button>
          <button
            className="cursor-pointer rounded-full bg-forest px-5 py-2 font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Show results
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <button className="cursor-pointer" onClick={onClear}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );

  // --- desktop floating popup (portaled so no ancestor can cover or clip it) ---
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
          className="pt-2" // invisible hover bridge between button and panel
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
    <div className="relative">
      {/* When pinned, the card takes the button's place in the layout as a block */}
      <AnimatePresence mode="wait" initial={false}>
        {pinned ? (
          <motion.div
            key="pinned"
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
              className={`relative cursor-pointer border border-ash bg-white text-xs ${
                isMobile
                  ? "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-ink"
                  : "flex flex-col items-center gap-2 rounded-xl p-4 uppercase text-ink-soft"
              }`}
            >
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className={`absolute flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[.5rem] text-white ${
                    isMobile ? "-right-1 -top-1.5" : "-right-1.5 -top-2"
                  }`}
                >
                  {count}
                </motion.span>
              )}
              <LuFilter />
              {/* desktop: vertical-rl + rotate-180 reads bottom-to-top */}
              <span
                className={
                  isMobile
                    ? ""
                    : "text-ink tracking-wide [writing-mode:vertical-rl] rotate-180"
                }
              >
                Filters
              </span>
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