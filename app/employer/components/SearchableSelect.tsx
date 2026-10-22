'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type SelectOption = string | { value: string; label: string }

interface SearchableSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  /** Pass the same id you give to <Field htmlFor> so the label is linked */
  id?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
}

const normalize = (o: SelectOption) => (typeof o === 'string' ? { value: o, label: o } : o)

const inputClass =
  'w-full rounded-md border bg-white py-2 pl-3 pr-9 text-sm text-ink placeholder:text-ink-soft transition-colors focus:outline-none focus:ring-1 focus:ring-highlight/30 disabled:cursor-not-allowed disabled:opacity-60'

export default function SearchableSelect({
  options,
  value,
  onChange,
  id,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyText = 'No matches found.',
  disabled = false,
  invalid = false,
  className = '',
}: SearchableSelectProps) {
  const reduce = useReducedMotion()
  const uid = useId()
  const inputId = id ?? `${uid}-input`
  const listId = `${uid}-list`

  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo(() => options.map(normalize), [options])
  const selected = items.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((o) => o.label.toLowerCase().includes(q)) : items
  }, [items, query])

  const openList = () => {
    if (disabled || open) return
    setQuery('')
    const idx = items.findIndex((o) => o.value === value)
    setActive(idx >= 0 ? idx : 0)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  const choose = (v: string) => {
    onChange(v)
    close()
    inputRef.current?.focus()
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // Keep the active option in view
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) return openList()
        setActive((i) => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) return openList()
        setActive((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActive(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActive(Math.max(filtered.length - 1, 0))
        }
        break
      case 'Enter':
        if (open) {
          e.preventDefault() // keep Enter from submitting the parent form
          if (filtered[active]) choose(filtered[active].value)
        }
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          close()
        }
        break
      case 'Tab':
        if (open) close()
        break
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={invalid || undefined}
        aria-activedescendant={open && filtered[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        disabled={disabled}
        value={open ? query : selected?.label ?? ''}
        placeholder={open ? searchPlaceholder : placeholder}
        onFocus={openList}
        onClick={openList}
        onChange={(e) => {
          if (!open) setOpen(true)
          setQuery(e.target.value)
          setActive(0)
        }}
        onKeyDown={onKeyDown}
        className={`${inputClass} ${
          invalid ? 'border-highlight-dark' : 'border-ash focus:border-highlight'
        } ${!open && !selected ? 'cursor-pointer' : ''}`}
      />

      <button
        type="button"
        tabIndex={-1}
        aria-label={open ? 'Close options' : 'Open options'}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => (open ? close() : (inputRef.current?.focus(), openList()))}
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-ink-soft hover:text-highlight-dark disabled:opacity-60"
      >
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.15 }}
        >
          <path d="M5 8l5 5 5-5" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.12 }}
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-ash bg-white py-1 shadow-lg"
          >
            {filtered.length === 0 ? (
              <li role="presentation" className="px-3 py-2 text-sm text-ink-soft">
                {emptyText}
              </li>
            ) : (
              filtered.map((o, i) => {
                const isSelected = o.value === value
                const isActive = i === active
                return (
                  <li
                    key={o.value}
                    id={`${listId}-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={isSelected}
                    // keep focus in the input so blur/keyboard behaviour stays intact
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(o.value)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm transition-colors ${
                      isActive ? 'bg-highlight/10 text-highlight-dark' : 'text-ink-mid'
                    } ${isSelected ? 'font-medium' : ''}`}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="shrink-0"
                      >
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                    )}
                  </li>
                )
              })
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}