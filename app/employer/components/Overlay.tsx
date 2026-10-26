// app/components/Overlay.tsx
"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { LuX } from "react-icons/lu";

const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,   // client
    () => false   // server / hydration
  );

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Overlay({
  open,
  onClose,
  title,
  children,
  className = "",
}: OverlayProps) {
  const isClient = useIsClient();

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-9000">
          {/* Blurred backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={`absolute right-0 top-0 flex h-full w-full flex-col bg-cream shadow-2xl sm:w-[85%] md:w-[37%] lg:w-[27%] xl:w-[22%] ${className}`}
          >
            <header className="flex items-center justify-between border-b border-ash px-5 py-4">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="cursor-pointer rounded-md p-1.5 text-ink-soft hover:bg-gray-100"
              >
                <LuX className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}