"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SearchableSelect from "./SearchableSelect";
import { PROFESSIONS } from "@/app/data/professions";
import LocationSelect from "./LocationSelect";

export interface PlacementRequestValues {
  profession: string;
  shifts: string[];
  startTiming: string;
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

/** One choice only. "Multiple" covers requests that need more than one shift pattern. */
const SHIFTS = ["Day", "Evening", "Night", "Weekend", "Flexible", "Multiple"];
const START_TIMINGS = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible",
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

function ChipSelect({
  options,
  selected,
  onSelect,
  label,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected === o;
        return (
          <motion.button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(o)}
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
  professions = PROFESSIONS.map((p) => p[1]),
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

  // Single choice. The value stays an array of one so Urgent and ResponseCard keep working.
  const selectShift = (v: string) => setValues((s) => ({ ...s, shifts: [v] }));

  const errors = {
    profession: !values.profession ? "Choose a profession." : "",
    shifts: values.shifts.length === 0 ? "Select a shift." : "",
    startTiming: !values.startTiming ? "Choose a start timing." : "",
    location: !values.location.trim() ? "Select Location" : "",
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
        <LocationSelect
          value={values.location}
          onChange={() => {}}
          onResolvedChange={(v) => set("location", v || "")}
          resolved={false}
          className={"py-2 bg-cream/80"}
        
        />

        {attempted && !values.location ? <p className="text-highlight my-2">Select location</p> : null}
      </Field>

      <Field label="Shift" error={show("shifts")}>
        <ChipSelect
          label="Shift"
          options={SHIFTS}
          selected={values.shifts[0] ?? ""}
          onSelect={selectShift}
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
        label="About the setting"
        htmlFor={id("about")}
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