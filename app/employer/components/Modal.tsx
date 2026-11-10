'use client'

import React, { ReactNode, useEffect, useId, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const subscribeNoop = () => () => {}

// Open modals, newest last. Only the topmost one traps focus and answers Escape.
const modalStack: symbol[] = []

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'

const focusablesIn = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.getClientRects().length > 0
  )

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

  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  // Focus management: move focus into the dialog, keep Tab inside it, restore it on close.
  useEffect(() => {
    if (!open) return
    const id = Symbol('modal')
    modalStack.push(id)
    const opener = document.activeElement as HTMLElement | null
    const isTop = () => modalStack[modalStack.length - 1] === id

    // Initial focus: first control in the content, else the close button, else the panel
    const focusInitial = () => {
      const panel = panelRef.current
      if (!panel) return
      const first =
        panel.querySelector<HTMLElement>('[data-autofocus]') ??
        focusablesIn(panel.querySelector<HTMLElement>('[data-modal-body]') ?? panel)[0] ??
        focusablesIn(panel)[0]
      ;(first ?? panel).focus({ preventScroll: true })
    }
    const raf = requestAnimationFrame(focusInitial)

    const onKey = (e: KeyboardEvent) => {
      if (!isTop()) return
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const items = focusablesIn(panel)
      if (items.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const inside = !!active && panel.contains(active)
      if (e.shiftKey && (!inside || active === first || active === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault()
        first.focus()
      }
    }

    // If focus lands anywhere outside the dialog, bring it back
    const onFocusIn = (e: FocusEvent) => {
      if (!isTop()) return
      const panel = panelRef.current
      if (panel && e.target instanceof Node && !panel.contains(e.target)) {
        focusInitial()
      }
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocusIn)
      const at = modalStack.indexOf(id)
      if (at !== -1) modalStack.splice(at, 1)
      // Return focus to whatever opened the dialog (if it is still on the page)
      if (opener && opener.isConnected && typeof opener.focus === 'function') {
        opener.focus({ preventScroll: true })
      }
    }
  }, [open])

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
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={`relative z-10 flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white text-ink shadow-2xl outline-none ${className}`}
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

            <div data-modal-body className="overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Portal to <body> once on the client; until then (server render / hydration) render
  // inline instead of returning null, so the modal can never silently disappear.
  return mounted ? createPortal(content, document.body) : content
}