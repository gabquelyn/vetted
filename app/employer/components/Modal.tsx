'use client'

import React, { ReactNode, useEffect, useId, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const subscribeNoop = () => () => {}

interface ModalProps {
  /** Defaults to true so `<Modal onClose={...}>` works when you render it conditionally */
  open?: boolean
  onClose: () => void
  title?: string | ReactNode
  children: React.ReactNode
  /** Extra classes for the panel, e.g. "max-w-3xl" */
  className?: string
  /** Close when the blurred backdrop is clicked (default true) */
  closeOnBackdrop?: boolean
  /** Hide the built-in close button (default false) */
  hideCloseButton?: boolean
  banner?: string
}

export default function Modal({
  open = true,
  onClose,
  title,
  children,
  className = '',
  closeOnBackdrop = true,
  hideCloseButton = false,
  banner
}: ModalProps) {
  const reduce = useReducedMotion()
  const titleId = useId()
  // portal target only exists on the client: false on the server, true in the browser
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  // Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // lock page scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const content = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4">
          {/* blurred backdrop */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={`relative z-10 flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-white text-ink shadow-2xl ${className}`}
          >
            {(title || !hideCloseButton) && (
              <div className={`flex items-center justify-between gap-4 border-b border-ash px-5 py-3.5 ${banner || "bg-forest-dark"}`}>
                {title ? (
                  <div id={titleId}>
                    {title}
                  </div>
                ) : (
                  <span />
                )}

                {!hideCloseButton && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close"
                    onClick={onClose}
                    className="rounded-md p-1 text-ink-soft transition-colors hover:bg-ash/60 hover:text-ink"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M5 5l10 10M15 5L5 15" />
                    </svg>
                  </motion.button>
                )}
              </div>
            )}

            <div className="overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Portal to <body> once on the client; until then (server render / hydration) render
  // inline instead of returning null, so the modal can never silently disappear.
  return mounted ? createPortal(content, document.body) : content
}