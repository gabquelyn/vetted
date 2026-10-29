"use client";
import { useEffect, useId, useRef, useState } from "react";
import { MdOutlineLocationOn, MdKeyboardArrowDown, MdCheck } from "react-icons/md";

export const LOCATIONS = [
  "Barrie, ON",
  "Brampton, ON",
  "Burlington, ON",
  "Cornwall, ON",
  "Goderich, ON",
  "Guelph, ON",
  "Hamilton, ON",
  "Kingston, ON",
] as const;

export default function LocationSelect({
  value,
  onChange,
  placeholder = "Any location",
  disabled,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Options: "" clears the filter
  const options = ["", ...LOCATIONS];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const select = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(Math.max(0, options.indexOf(value)));
        return;
      }
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
    }
    if ((e.key === "Enter" || e.key === " ") && open && active >= 0) {
      e.preventDefault();
      select(options[active]);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <MdOutlineLocationOn className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-ink-soft" />

      <button
        type="button"
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent pl-6 text-left outline-none disabled:cursor-default"
      >
        <span className={value ? "text-ink" : "text-ink-soft"}>
          {value || placeholder}
        </span>
        <MdKeyboardArrowDown
          className={`shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl"
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            return (
              <li key={opt || "any"} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    select(opt);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-black/3 ${
                    active === i ? "bg-black/3" : ""
                  }`}
                >
                  <MdOutlineLocationOn className="shrink-0 text-ink-soft" />
                  <span
                    className={`flex-1 text-xs ${opt ? "text-ink" : "text-ink-soft"}`}
                  >
                    {opt || placeholder}
                  </span>
                  {selected && <MdCheck className="shrink-0 text-forest" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}