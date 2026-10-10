"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuCheck, LuChevronDown, LuSearch } from "react-icons/lu";

type Option = { value: string; label: string };

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  allowSearch?: boolean;
};

export default function MultiSelect({
  options,
  value,
  onChange,
  allowSearch,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className = "",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? options.filter((o) => o.label.toLowerCase().includes(q))
      : options;
  }, [options, query]);

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((o) => value.includes(o.value));

  // Close on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  const toggleAllFiltered = () => {
    const ids = filtered.map((o) => o.value);
    onChange(
      allFilteredSelected
        ? value.filter((v) => !ids.includes(v))
        : Array.from(new Set([...value, ...ids])),
    );
  };

  const label =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? (options.find((o) => o.value === value[0])?.label ?? placeholder)
        : `${value.length} selected`;

  return (
    <div ref={ref} className={`relative inline-block w-60 ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-ash bg-transparent px-3 py-2 text-left text-xs text-ink-soft transition-colors focus:border-forest cursor-pointer"
      >
        <span
          className={`truncate ${value.length === 0 ? "text-gray-400" : ""}`}
        >
          {label}
        </span>
        <LuChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-1 overflow-hidden rounded-xl bg-white"
          >
            {/* Search */}
            {allowSearch && (
              <div className="flex items-center gap-2 border-b border-ash py-2">
                <LuSearch className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-xs text-ink-soft placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            )}

            {/* Select all / clear */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-between border-b border-ash px-3 py-1.5 text-[.7rem]">
                <button
                  type="button"
                  onClick={toggleAllFiltered}
                  className="text-forest hover:underline"
                >
                  {allFilteredSelected ? "Deselect all" : "Select all"}
                </button>
                {value.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    className="text-ink-soft hover:underline"
                  >
                    Clear ({value.length})
                  </button>
                )}
              </div>
            )}

            {/* Options */}
            <ul
              role="listbox"
              aria-multiselectable
              className="max-h-40 overflow-y-auto py-1"
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-4 text-center text-xs text-gray-400">
                  No results found
                </li>
              ) : (
                filtered.map((o) => {
                  const checked = value.includes(o.value);
                  return (
                    <li
                      key={o.value}
                      role="option"
                      aria-selected={checked}
                      onClick={() => toggle(o.value)}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs text-ink-soft hover:bg-gray-50"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          checked
                            ? "border-forest bg-forest text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {checked && <LuCheck className="h-3 w-3" />}
                      </span>
                      <span className="truncate">{o.label}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
