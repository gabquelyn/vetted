import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface RadiusSelectProps {
  /** Current radius in km (controlled). */
  value: number;
  onChange: (km: number) => void;
  /** Disables the control, e.g. until a supported city is selected. */
  disabled?: boolean;
  /** Tooltip shown on the trigger while disabled. */
  disabledReason?: string;
  /** Quick-pick distances shown above "Custom distance". */
  presets?: number[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

type ActiveKey = number | "custom";

const SLIDER_BASE =
  // track
  "m-0 h-[3px] w-full cursor-pointer appearance-none rounded-full outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "[&::-moz-range-track]:bg-transparent " +
  // webkit thumb
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-[#b3ae9f] " +
  "[&::-webkit-slider-thumb]:bg-[linear-gradient(160deg,#fdfdfc,#d8d5cb)] " +
  "[&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(40,38,30,0.22)] " +
  "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-100 " +
  "hover:[&::-webkit-slider-thumb]:scale-110 " +
  "focus-visible:[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_#e8f0e0] " +
  // firefox thumb
  "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer " +
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-solid " +
  "[&::-moz-range-thumb]:border-[#b3ae9f] [&::-moz-range-thumb]:bg-[linear-gradient(160deg,#fdfdfc,#d8d5cb)] " +
  "[&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(40,38,30,0.22)] " +
  "focus-visible:[&::-moz-range-thumb]:shadow-[0_0_0_3px_#e8f0e0]";

function deriveActiveKey(value: number, presets: number[]): ActiveKey {
  return presets.includes(value) ? value : "custom";
}

export default function RadiusSelect({
  value,
  onChange,
  disabled = false,
  disabledReason = "Select a supported city to enable distance search",
  presets = [25, 50, 100],
  min = 5,
  max = 100,
  step = 5,
  className = "",
}: RadiusSelectProps) {
  const [open, setOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<ActiveKey>(() =>
    deriveActiveKey(value, presets),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  // Keep the highlighted option in sync if the parent changes the value externally.
  useEffect(() => {
    setActiveKey((prev) =>
      prev === "custom" && customOpen ? deriveActiveKey(value, presets) : deriveActiveKey(value, presets),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const close = useCallback(() => setOpen(false), []);

  // Close when disabled flips on.
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  // Outside click + Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const pickPreset = (km: number) => {
    setCustomOpen(false);
    setActiveKey(km);
    onChange(km);
    close();
  };

  const showCustom = () => {
    setCustomOpen(true);
    setActiveKey("custom");
  };

  const onSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const km = Number(e.target.value);
    setActiveKey(deriveActiveKey(km, presets));
    onChange(km);
  };

  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #9a978d 0%, #9a978d ${pct}%, #e3ded0 ${pct}%, #e3ded0 100%)`,
  };

  const optionClass = (active: boolean) =>
    [
      "w-full rounded-[7px] px-2.5 py-2 text-left text-[12.5px] font-semibold transition-colors",
      "hover:bg-[#e8f0e0] hover:text-[#2d5016] focus-visible:bg-[#e8f0e0] focus-visible:text-[#2d5016] focus-visible:outline-none",
      active ? "bg-[#e8f0e0] font-bold text-[#2d5016]" : "bg-transparent text-[#5c5c58]",
    ].join(" ");

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: [0.2, 0.7, 0.3, 1] as const };

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={disabled}
        title={disabled ? disabledReason : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={[
          "flex w-full disabled:cursor-not-allowed! cursor-pointer items-center gap-[7px] border-none bg-transparent py-1.5 text-left font-[inherit] text-[12.5px] font-medium",
          "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d5016]",
          "disabled:cursor-not-allowed disabled:text-[#8a8a84]",
          disabled ? "" : "text-[#1a1a18]",
        ].join(" ")}
      >
        <span>
          Within <span>{value}</span> km
        </span>
        <svg
          className="ml-auto shrink-0 text-[#8a8a84]"
          width="9"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
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

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={panelTransition}
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-[calc(100%+8px)] z-[60] w-[230px] rounded-xl border border-[#e5e2da] bg-white p-2.5 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
          >
            <div className="flex flex-col gap-0.5">
              {presets.map((km) => (
                <button
                  key={km}
                  type="button"
                  className={optionClass(activeKey === km)}
                  onClick={() => pickPreset(km)}
                >
                  {km} km
                </button>
              ))}
              <button
                type="button"
                className={optionClass(activeKey === "custom")}
                onClick={showCustom}
              >
                Custom distance
              </button>
            </div>

            <AnimatePresence initial={false}>
              {customOpen && (
                <motion.div
                  key="custom"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={panelTransition}
                  className="overflow-hidden"
                >
                  <div className="mt-2 border-t border-[#e5e2da] px-0.5 pb-1 pt-2.5">
                    <div className="mb-[9px] flex items-center justify-between text-[10.5px] font-bold uppercase tracking-[0.04em] text-[#8a8a84]">
                      <span>Custom distance</span>
                      <span className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[11.5px] font-bold normal-case tracking-normal text-[#2d5016]">
                        {value} km
                      </span>
                    </div>
                    <div className="px-0.5 pb-2 pt-1">
                      <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        disabled={disabled}
                        onChange={onSlide}
                        aria-label="Custom distance in kilometres"
                        style={trackStyle}
                        className={SLIDER_BASE}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Usage

import { useState } from "react";
import RadiusSelect from "./RadiusSelect";

export function Example({ cityResolved }: { cityResolved: boolean }) {
  const [radius, setRadius] = useState(25);
  return (
    <RadiusSelect
      value={radius}
      onChange={setRadius}
      disabled={!cityResolved}
    />
  );
}
*/