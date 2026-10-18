'use client'

import React, { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type CompensationType = 'Negotiable' | 'Fixed'

export interface IntroductionRequestValues {
  environment: string
  location: string
  days: string[]
  shifts: string[]
  compensationType: CompensationType
  /** Only used when compensationType is "Fixed" */
  compensationAmount: string
  startWindow: string
  duties: string
  nonNegotiables: string
  jobDescription: string
  attachment: File | null
}

interface IntroductionRequestFormProps {
  onSubmit: (values: IntroductionRequestValues) => void
  /** Receives the current values so the parent can keep them when going back */
  onBack: (values: IntroductionRequestValues) => void
  initialValues?: Partial<IntroductionRequestValues>
  environments?: string[]
  submitting?: boolean
  submitLabel?: string
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SHIFTS = ['Days', 'Evenings', 'Nights', 'Rotating']
const START_WINDOWS = ['ASAP', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Flexible']
const DEFAULT_ENVIRONMENTS = [
  'Long-Term Care (LTC)',
  'Retirement Home',
  'Hospital',
  'Home Care',
  'Clinic / Community',
]

const DUTIES_MAX = 300
const NON_NEG_MAX = 150

const inputClass =
  'w-full rounded-md border border-ash bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft transition-colors focus:border-highlight-mid focus:outline-none focus:ring-2 focus:ring-highlight-pale'

/* ---------- small building blocks ---------- */

function Field({
  label,
  htmlFor,
  optional,
  error,
  hint,
  counter,
  children,
}: {
  label: string
  htmlFor?: string
  optional?: boolean
  error?: string
  hint?: string
  counter?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
          {label}
          {optional && <span className="ml-1 text-xs font-normal text-ink-soft">(optional)</span>}
        </label>
        {counter}
      </div>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-1.5 text-xs text-ink-mid"
          >
            <span className="font-semibold text-highlight">Required:</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Counter({ value, max }: { value: number; max: number }) {
  return (
    <span className={`text-xs tabular-nums ${value >= max ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
      {value}/{max}
    </span>
  )
}

function ChipToggle({
  options,
  selected,
  onToggle,
  label,
}: {
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected.includes(o)
        return (
          <motion.button
            key={o}
            type="button"
            aria-pressed={on}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(o)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              on
                ? 'border-highlight bg-highlight text-white'
                : 'border-ash bg-white text-ink-mid hover:border-highlight-mid hover:text-highlight'
            }`}
          >
            {o}
          </motion.button>
        )
      })}
    </div>
  )
}

/* ---------- form ---------- */

export default function IntroductionRequestForm({
  onSubmit,
  onBack,
  initialValues,
  environments = DEFAULT_ENVIRONMENTS,
  submitting = false,
  submitLabel = 'Continue',
}: IntroductionRequestFormProps) {
  const reduce = useReducedMotion()
  const uid = useId()
  const fileRef = useRef<HTMLInputElement>(null)
  const id = (n: string) => `${uid}-${n}`

  const [values, setValues] = useState<IntroductionRequestValues>({
    environment: '',
    location: '',
    days: [],
    shifts: [],
    compensationType: 'Negotiable',
    compensationAmount: '',
    startWindow: '',
    duties: '',
    nonNegotiables: '',
    jobDescription: '',
    attachment: null,
    ...initialValues,
  })
  const [attempted, setAttempted] = useState(false)

  const set = <K extends keyof IntroductionRequestValues>(k: K, v: IntroductionRequestValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }))

  const toggle = (k: 'days' | 'shifts', v: string) =>
    setValues((s) => ({
      ...s,
      [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v],
    }))

  const errors = {
    environment: !values.environment ? 'Choose a work environment.' : '',
    location: !values.location.trim() ? 'Enter a location.' : '',
    days: values.days.length === 0 ? 'Select at least one day.' : '',
    shifts: values.shifts.length === 0 ? 'Select at least one shift pattern.' : '',
    compensation:
      values.compensationType === 'Fixed' && !values.compensationAmount.trim()
        ? 'Enter the fixed compensation.'
        : '',
    startWindow: !values.startWindow ? 'Choose a start window.' : '',
    duties: !values.duties.trim() ? 'Describe the main duties.' : '',
  }
  const hasErrors = Object.values(errors).some(Boolean)
  const show = (k: keyof typeof errors) => (attempted ? errors[k] : '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!hasErrors) onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 text-ink">
      <Field label="Work environment / setting" htmlFor={id('env')} error={show('environment')}>
        <select
          id={id('env')}
          value={values.environment}
          onChange={(e) => set('environment', e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          {environments.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Location" htmlFor={id('loc')} error={show('location')}>
        <input
          id={id('loc')}
          type="text"
          value={values.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="City, Province"
          className={inputClass}
        />
      </Field>

      <Field label="Schedule — days" error={show('days')}>
        <ChipToggle
          label="Schedule days"
          options={DAYS}
          selected={values.days}
          onToggle={(v) => toggle('days', v)}
        />
      </Field>

      <Field label="Shift pattern" error={show('shifts')}>
        <ChipToggle
          label="Shift pattern"
          options={SHIFTS}
          selected={values.shifts}
          onToggle={(v) => toggle('shifts', v)}
        />
      </Field>

      <Field
        label="Compensation"
        error={show('compensation')}
        hint="Not shown to the Specialist — held for recruiter brokering only."
      >
        <div className="flex items-center gap-3">
          <div role="radiogroup" aria-label="Compensation type" className="inline-flex rounded-lg border border-ash bg-ash/30 p-0.5">
            {(['Negotiable', 'Fixed'] as CompensationType[]).map((t) => {
              const on = values.compensationType === t
              return (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => set('compensationType', t)}
                  className={`relative rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                    on ? 'text-white' : 'text-ink-mid hover:text-highlight'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId={id('comp-pill')}
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 36 }}
                      className="absolute inset-0 rounded-md bg-highlight"
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence initial={false}>
            {values.compensationType === 'Fixed' && (
              <motion.input
                key="amount"
                type="text"
                inputMode="decimal"
                aria-label="Fixed compensation amount"
                value={values.compensationAmount}
                onChange={(e) => set('compensationAmount', e.target.value)}
                placeholder="e.g. $35/hr"
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className={`${inputClass} max-w-[10rem]`}
              />
            )}
          </AnimatePresence>
        </div>
      </Field>

      <Field label="Start window" htmlFor={id('start')} error={show('startWindow')}>
        <select
          id={id('start')}
          value={values.startWindow}
          onChange={(e) => set('startWindow', e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          {START_WINDOWS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Duties"
        htmlFor={id('duties')}
        error={show('duties')}
        counter={<Counter value={values.duties.length} max={DUTIES_MAX} />}
      >
        <textarea
          id={id('duties')}
          rows={4}
          maxLength={DUTIES_MAX}
          value={values.duties}
          onChange={(e) => set('duties', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field
        label="Non-negotiables"
        htmlFor={id('nonneg')}
        counter={<Counter value={values.nonNegotiables.length} max={NON_NEG_MAX} />}
      >
        <textarea
          id={id('nonneg')}
          rows={2}
          maxLength={NON_NEG_MAX}
          value={values.nonNegotiables}
          onChange={(e) => set('nonNegotiables', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field label="Job description" htmlFor={id('jd')} optional>
        <textarea
          id={id('jd')}
          rows={4}
          value={values.jobDescription}
          onChange={(e) => set('jobDescription', e.target.value)}
          className={`${inputClass} resize-none`}
        />

        <div className="mt-2 flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => set('attachment', e.target.files?.[0] ?? null)}
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => fileRef.current?.click()}
            className="rounded-md border border-ash bg-white px-3 py-1.5 text-sm text-ink-mid transition-colors hover:border-highlight-mid hover:text-highlight"
          >
            Attach a file <span className="text-ink-soft">(demo only)</span>
          </motion.button>

          {values.attachment && (
            <span className="flex min-w-0 items-center gap-1.5 text-xs text-ink-mid">
              <span className="truncate">{values.attachment.name}</span>
              <button
                type="button"
                aria-label="Remove attachment"
                onClick={() => {
                  set('attachment', null)
                  if (fileRef.current) fileRef.current.value = ''
                }}
                className="text-ink-soft hover:text-ink"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </Field>

      <div className="flex items-center justify-between border-t border-ash pt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onBack(values)}
          disabled={submitting}
          className="rounded-md border border-ash bg-white px-4 py-2 text-sm text-ink-mid transition-colors hover:border-highlight-mid hover:text-highlight disabled:opacity-60"
        >
          Back
        </motion.button>

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={reduce || submitting ? undefined : { scale: 1.02 }}
          whileTap={reduce || submitting ? undefined : { scale: 0.97 }}
          className="rounded-md bg-highlight px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-highlight-mid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : submitLabel}
        </motion.button>
      </div>
    </form>
  )
}