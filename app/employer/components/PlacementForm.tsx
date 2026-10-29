"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  DEMO_ONLY_ONTARIO_MUNICIPALITIES,
  PROFESSIONS,
} from "@/app/professional/components/data";
import SearchableSelect from "./SearchableSelect";

export interface PlacementRequestValues {
  profession: string;
  shifts: string[];
  startTiming: string;
  responseWindow: string;
  aboutSetting: string;
  work: string;
  location: string;
}

interface PlacementRequestFormProps {
  onSubmit: (values: PlacementRequestValues) => void;
  /** Receives the current values so the parent can keep them when going back */
  onBack?: (values: PlacementRequestValues) => void;
  initialValues?: Partial<PlacementRequestValues>;
  professions?: string[];
  submitting?: boolean;
  submitLabel?: string;
}

const SHIFTS = ["Days", "Evenings", "Nights", "Rotating"];
const START_TIMINGS = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible",
];
const RESPONSE_WINDOWS = [
  "Within 24 hours",
  "Within 48 hours",
  "Within 3 days",
  "Within 1 week",
];

const ABOUT_MAX = 300;
const WORK_MAX = 300;

const inputClass =
  "w-full rounded-md border border-ash bg-white px-3 py-2 text-xs text-ink placeholder:text-ink-soft transition-colors focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight/30";

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
  label: string;
  htmlFor?: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  counter?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-xs font-medium text-ink">
          {label}
          {optional && (
            <span className="ml-1 text-xs font-normal text-ink-soft">
              (optional)
            </span>
          )}
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
            <span className="font-semibold text-highlight-dark">Required:</span>{" "}
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Counter({ value, max }: { value: number; max: number }) {
  return (
    <span
      className={`text-xs tabular-nums ${value >= max ? "font-semibold text-ink" : "text-ink-soft"}`}
    >
      {value}/{max}
    </span>
  );
}

function ChipToggle({
  options,
  selected,
  onToggle,
  label,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <motion.button
            key={o}
            type="button"
            aria-pressed={on}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(o)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              on
                ? "border-highlight bg-highlight/10 text-highlight-dark"
                : "border-ash bg-white text-ink-mid hover:border-highlight hover:text-highlight-dark"
            }`}
          >
            {o}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ---------- form ---------- */

export default function PlacementRequestForm({
  onSubmit,
  onBack,
  initialValues,
  professions = PROFESSIONS,
  submitting = false,
  submitLabel = "Continue",
}: PlacementRequestFormProps) {
  const reduce = useReducedMotion();
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  const [values, setValues] = useState<PlacementRequestValues>({
    profession: "",
    shifts: [],
    startTiming: "",
    responseWindow: "",
    aboutSetting: "",
    work: "",
    location: "",
    ...initialValues,
  });
  const [attempted, setAttempted] = useState(false);

  const set = <K extends keyof PlacementRequestValues>(
    k: K,
    v: PlacementRequestValues[K],
  ) => setValues((s) => ({ ...s, [k]: v }));

  const toggleShift = (v: string) =>
    setValues((s) => ({
      ...s,
      shifts: s.shifts.includes(v)
        ? s.shifts.filter((x) => x !== v)
        : [...s.shifts, v],
    }));

  const errors = {
    profession: !values.profession ? "Choose a profession." : "",
    shifts: values.shifts.length === 0 ? "Select at least one shift." : "",
    startTiming: !values.startTiming ? "Choose a start timing." : "",
    responseWindow: !values.responseWindow ? "Choose a response window." : "",
    aboutSetting: !values.aboutSetting.trim()
      ? "Tell us about the setting."
      : "",
    work: !values.work.trim() ? "Describe the work." : "",
    location: !values.location.trim() ? "Select Location" : ""
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const show = (k: keyof typeof errors) => (attempted ? errors[k] : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!hasErrors) onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 p-6 py-8 text-xs text-ink-mid"
    >
      <Field label="Profession" htmlFor={id("prof")} error={show("profession")}>
        <SearchableSelect
          id={id("prof")}
          options={professions}
          value={values.profession}
          onChange={(v) => set("profession", v)}
          placeholder="Select…"
          searchPlaceholder="Search professions…"
          invalid={!!show("profession")}
        />
      </Field>
      <Field
        label="Location"
        htmlFor={id("location")}
        //  error={show('location')}
      >
        <SearchableSelect
          id={id("loc")}
          options={DEMO_ONLY_ONTARIO_MUNICIPALITIES.map((demo) => demo.city)}
          value={values.location}
          onChange={(v) => set("location", v)}
          placeholder="Select…"
          searchPlaceholder="Search Location…"
          invalid={!!show("location")}
        />
      </Field>

      <Field label="Shift" error={show("shifts")}>
        <ChipToggle
          label="Shift"
          options={SHIFTS}
          selected={values.shifts}
          onToggle={toggleShift}
        />
      </Field>

      <Field
        label="Start timing"
        htmlFor={id("start")}
        error={show("startTiming")}
      >
        <select
          id={id("start")}
          value={values.startTiming}
          onChange={(e) => set("startTiming", e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          {START_TIMINGS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Response window"
        htmlFor={id("resp")}
        error={show("responseWindow")}
      >
        <select
          id={id("resp")}
          value={values.responseWindow}
          onChange={(e) => set("responseWindow", e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          {RESPONSE_WINDOWS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="About the setting"
        htmlFor={id("about")}
        error={show("aboutSetting")}
        counter={<Counter value={values.aboutSetting.length} max={ABOUT_MAX} />}
      >
        <textarea
          id={id("about")}
          rows={4}
          maxLength={ABOUT_MAX}
          value={values.aboutSetting}
          onChange={(e) => set("aboutSetting", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field
        label="Work"
        htmlFor={id("work")}
        error={show("work")}
        counter={<Counter value={values.work.length} max={WORK_MAX} />}
      >
        <textarea
          id={id("work")}
          rows={4}
          maxLength={WORK_MAX}
          value={values.work}
          onChange={(e) => set("work", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="flex items-center justify-between border-t border-ash pt-4">
        {onBack ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onBack(values)}
            disabled={submitting}
            className="rounded-md border border-ash bg-white px-4 py-2 text-xs text-ink-mid transition-colors hover:border-highlight hover:text-highlight-dark disabled:opacity-60"
          >
            Back
          </motion.button>
        ) : (
          <span />
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={reduce || submitting ? undefined : { scale: 1.02 }}
          whileTap={reduce || submitting ? undefined : { scale: 0.97 }}
          className="rounded-md bg-forest-dark w-full p-4 text-xs font-semibold text-white transition-colors hover:bg-highlight-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </motion.button>
      </div>
    </form>
  );
}
