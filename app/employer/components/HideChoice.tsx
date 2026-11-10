"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import type { Candidate } from "@/app/data/registry";

/**
 * Hide acts on designations. A person with two or more discoverable designations
 * chooses which to hide. Hiding never changes Reveal history or entitlement.
 */
export default function HideChoice({
  options,
  initialId,
  reveals,
  onConfirm,
  onClose,
}: {
  /** The person's discoverable, not-yet-hidden designations (two or more) */
  options: Candidate[];
  /** The designation the employer clicked Hide on (pre-selected) */
  initialId: string;
  reveals: string[];
  onConfirm: (ids: string[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([initialId]);
  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <Modal
      onClose={onClose}
      title={
        <p className="font-serif text-xl font-semibold text-white">
          Which profile do you want to hide?
        </p>
      }
      className="max-w-md"
    >
      <form
        className="p-6 text-xs text-ink-mid"
        onSubmit={(e) => {
          e.preventDefault();
          if (selected.length) onConfirm(selected);
        }}
      >
        <fieldset>
          <legend className="mb-3 leading-relaxed">
            This professional has more than one profile. Choose which to hide from
            your Registry results. You can restore it from Hidden.
          </legend>

          <div className="space-y-2">
            {options.map((c, i) => {
              const id = `hide-${c.id}`;
              const revealed = reveals.includes(c.personId || c.id);
              return (
                <label
                  key={c.id}
                  htmlFor={id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-ash p-3 transition-colors hover:border-forest has-checked:border-forest has-checked:bg-forest-light"
                >
                  <input
                    id={id}
                    type="checkbox"
                    data-autofocus={c.id === initialId ? "" : undefined}
                    checked={selected.includes(c.id)}
                    onChange={() => toggle(c.id)}
                    className="mt-0.5 h-4 w-4 accent-forest"
                  />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-bold text-ink">
                      {c.title}
                      {revealed && c.reveal?.name ? ` — ${c.reveal.name}` : ""}
                    </span>
                    <span className="block font-mono text-[10.5px] text-[#8a8a84]">
                      {c.id}
                    </span>
                    <span className="block text-[11px] text-ink-soft">
                      {c.empType} · {c.avail}
                      {revealed ? " · Revealed" : ""}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <p className="mt-3 text-[11px] text-[#8a8a84]">
          Hiding does not affect Reveals: nothing is refunded or charged again, and
          revealed profiles stay in Revealed Professionals.
        </p>

        <div className="mt-5 flex items-center justify-end gap-3 border-t border-ash pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-ash bg-white px-4 py-2 text-xs text-ink-mid hover:border-highlight hover:text-highlight-dark"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={selected.length === 0}
            className="cursor-pointer rounded-md bg-forest-dark px-4 py-2 text-xs font-semibold text-white hover:bg-highlight-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            Hide {selected.length > 1 ? `${selected.length} profiles` : "profile"}
          </button>
        </div>
      </form>
    </Modal>
  );
}