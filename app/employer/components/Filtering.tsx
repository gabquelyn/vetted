"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { LuFilter } from "react-icons/lu";
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

type StringState = React.Dispatch<React.SetStateAction<string[]>>;

export default function Filtering({
  onApply,
  onClear,
  parties,
  setParties,
  setShifts,
  setMobility,
  setProfile,
  environment,
  setEnvironment,
  setEmployment,
  mobility,
  profile,
  shifts,
  employment,
  count,
}: {
  onApply: () => void;
  onClear: () => void;
  parties: string[];
  mobility: string[];
  profile: string[];
  setParties: StringState;
  setEnvironment: StringState;
  setShifts: StringState;
  setEmployment: StringState;
  setMobility: StringState;
  setProfile: StringState;
  environment: string[];
  shifts: string[];
  employment: string[];
  count: number;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- open / close helpers (hover works across the portal gap) ---
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openPanel = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // --- position the panel under the button ---
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

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  // --- click outside + Escape ---
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const panel = (
    <AnimatePresence>
      {open && (
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
          <div className="text-xs flex flex-col gap-2 rounded-xl border border-ash bg-white p-4 shadow-lg">
            <p className="uppercase text-forest font-semibold">
              Search and Filter
            </p>
            <Divider />

            <div>
              <p className="text-ink-soft font-bold mb-2">Primary Search</p>
              <MultiSelect
                value={parties}
                onChange={setParties}
                className="relative inline-block w-20 overflow-y-auto"
                options={PROFESSIONS.map((p) => ({ label: p[1], value: p[0] }))}
                allowSearch
              />
            </div>

            <div>
              <p className="text-ink-soft font-bold mb-2">
                Experienced environment
              </p>
              <MultiSelect
                value={environment}
                onChange={setEnvironment}
                className="relative inline-block w-20 overflow-y-auto"
                options={ENVIRONMENT.map((e) => ({ label: e, value: e }))}
                allowSearch
              />
            </div>

            <div>
              <p className="text-ink-soft font-bold mb-2">Shifts</p>
              <MultiSelect
                value={shifts}
                onChange={setShifts}
                className="relative inline-block w-20 overflow-y-auto"
                options={SHIFTS.map((e) => ({ label: e, value: e }))}
              />
            </div>

            <div>
              <p className="text-ink-soft font-bold mb-2">Employment</p>
              <MultiSelect
                value={employment}
                onChange={setEmployment}
                className="relative inline-block w-20 overflow-y-auto"
                options={EMPLOYMENT.map((e) => ({ label: e, value: e }))}
              />
            </div>

            <div>
              <p className="text-ink-soft font-bold mb-2">Mobility</p>
              <MultiSelect
                value={mobility}
                onChange={setMobility}
                className="relative inline-block w-20 overflow-y-auto"
                options={MOBILITY.map((e) => ({ label: e[1], value: e[0] }))}
              />
            </div>

            <div>
              <p className="text-ink-soft font-bold mb-2">Profile</p>
              <MultiSelect
                value={profile}
                onChange={setProfile}
                className="relative inline-block w-20 overflow-y-auto"
                options={PROFILE.map((e) => ({ label: e[1], value: e[0] }))}
              />
            </div>

            {/* actions */}
            <div className="flex items-center justify-between">
              <button
                className="cursor-pointer text-forest bg-forest-light p-2 rounded-md"
                onClick={onApply}
              >
                Apply filters
              </button>
              <button className="cursor-pointer" onClick={onClear}>
                Clear filters
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onMouseEnter={openPanel}
        onMouseLeave={scheduleClose}
        // Touch / pen: tap toggles. Mouse relies on hover so a click doesn't fight it.
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") {
            cancelClose();
            setOpen((o) => !o);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="text-xs cursor-pointer flex items-center gap-2 border border-ash rounded-xl text-ink-soft p-2 px-3 relative"
      >
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="absolute right-0 -top-2 h-4 w-4 flex items-center justify-center rounded-full bg-forest text-white text-[.5rem]"
          >
            {count}
          </motion.span>
        )}
        <span className="text-ink">Filters</span>
        <LuFilter />
      </button>

      {/* Rendered on document.body so no ancestor stacking context or overflow can clip or cover it */}
      {typeof document !== "undefined" && createPortal(panel, document.body)}
    </div>
  );
}