"use client";
import React, { useCallback, useRef, useState } from "react";
const challengeOptions: string[] = [
  "Hiring Systems & Process Design",
  "Recruitment Technology",
  "Recruitment & Workforce Advisory",
  "Workforce Mobilization & Special Projects",
  "Something Else",
];
export default function Engage() {
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const dropdownWrapRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const openDropdown = useCallback(() => {
    setDropdownOpen(true);
    const selectedIdx = challengeOptions.findIndex(
      (o) => o === selectedChallenge,
    );
    setActiveOptionIndex(selectedIdx >= 0 ? selectedIdx : 0);
  }, [selectedChallenge]);

  const closeDropdown = useCallback((returnFocus: boolean) => {
    setDropdownOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedChallenge) {
      triggerRef.current?.click();
      return;
    }
    setSubmitted(true);
  }
  function handleTriggerClick() {
    if (!dropdownOpen) openDropdown();
    else closeDropdown(false);
  }

  const selectOption = useCallback((i: number) => {
    const opt = challengeOptions[i];
    if (!opt) return;
    setSelectedChallenge(opt);
  }, []);
  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!dropdownOpen) openDropdown();
      else
        setActiveOptionIndex((i) =>
          Math.min(i + 1, challengeOptions.length - 1),
        );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!dropdownOpen) openDropdown();
      else setActiveOptionIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!dropdownOpen) openDropdown();
      else {
        selectOption(activeOptionIndex);
        closeDropdown(true);
      }
    } else if (e.key === "Escape") {
      if (dropdownOpen) closeDropdown(true);
    } else if (e.key === "Tab") {
      if (dropdownOpen) closeDropdown(false);
    }
  }

  function handleOptionClick(i: number) {
    selectOption(i);
    closeDropdown(true);
  }
  function handleOptionMouseEnter(i: number) {
    setActiveOptionIndex(i);
  }
  return (
    <section
      className="bg-cream pt-26 px-12 pb-30 max-[1024px]:px-12 max-[600px]:px-5"
      id="inquiry"
    >
      <div className="max-w-305 mx-auto grid grid-cols-[1fr_580px] gap-20 items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-13">
        <div
          className={`transition-all duration-500 ease-out
        ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
        >
          <div className="text-[11.5px] font-semibold tracking-widest uppercase text-forest mb-5">
            Discuss a Bespoke Engagement
          </div>
          <p className="text-[17px] text-ink-soft leading-[1.75] max-w-115">
            Bespoke engagements are individually scoped around the organization,
            the complexity of the challenge and the level of involvement
            required. Vetted may work in an advisory capacity, lead the design
            and implementation of a new approach, or support a defined workforce
            initiative through mobilization where appropriate.
          </p>
        </div>

        <div
          className={`bg-white rounded-[10px] px-10 pt-10 pb-9 shadow-[0_14px_28px_-10px_rgba(26,26,24,0.12),0_2px_6px_rgba(26,26,24,0.04)]
        max-[1024px]:max-w-145
        max-[600px]:px-6 max-[600px]:py-7.5 max-[600px]:max-w-none
        transition-all duration-500 ease-out
        ${true ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
        >
          <div className="mb-7.5">
            <h3 className="font-['Cormorant_Garamond',serif] font-semibold text-[22px] text-ink mb-1.5">
              Tell us what you&apos;re working through.
            </h3>
            <p className="text-[13.5px] text-ink-soft">
              We&apos;ll take it from there.
            </p>
          </div>

          {!submitted ? (
            <>
              {/* DEMO ONLY — this form currently does not transmit or store inquiries.
              Connect to the production inquiry endpoint before deployment. */}
              <form id="bespokeForm" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-5 mb-5 max-[600px]:grid-cols-1">
                  <div>
                    <label
                      htmlFor="bqName"
                      className="block text-[10.5px] font-semibold text-ink-mid mb-2.25 uppercase tracking-[0.04em]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="bqName"
                      name="name"
                      required
                      className="w-full bg-ink/4 border-none rounded-lg px-3.75 py-3.5 text-[15px] text-ink font-sans outline-none transition-colors duration-180 ease-out placeholder:text-ink-mid focus:bg-forest/8"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bqOrg"
                      className="block text-[10.5px] font-semibold text-ink-mid mb-2.25 uppercase tracking-[0.04em]"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="bqOrg"
                      name="organization"
                      required
                      className="w-full bg-ink/4 border-none rounded-lg px-3.75 py-3.5 text-[15px] text-ink font-sans outline-none transition-colors duration-180 ease-out placeholder:text-ink-mid focus:bg-forest/8"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <div>
                    <label
                      htmlFor="bqEmail"
                      className="block text-[10.5px] font-semibold text-ink-mid mb-2.25 uppercase tracking-[0.04em]"
                    >
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="bqEmail"
                      name="email"
                      required
                      className="w-full bg-ink/4 border-none rounded-lg px-3.75 py-3.5 text-[15px] text-ink font-sans outline-none transition-colors duration-180 ease-out placeholder:text-ink-mid focus:bg-forest/8"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <div>
                    <label
                      id="bqChallengeLabel"
                      className="block text-[10.5px] font-semibold text-ink-mid mb-2.25 uppercase tracking-[0.04em]"
                    >
                      Type of Challenge
                    </label>
                    <div
                      className="relative"
                      id="bqChallengeSelect"
                      ref={dropdownWrapRef}
                    >
                      <button
                        type="button"
                        className="w-full flex items-center justify-between gap-2.5 text-left bg-ink/4 border-none rounded-lg px-3.75 py-3.5 text-[15px] font-sans text-ink cursor-pointer transition-colors duration-180 ease-out hover:bg-ink/6 aria-expanded:bg-forest/8"
                        id="bqChallengeTrigger"
                        ref={triggerRef}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                        aria-labelledby="bqChallengeLabel bqChallengeTrigger"
                        aria-activedescendant={
                          dropdownOpen && activeOptionIndex >= 0
                            ? `cs-opt-${activeOptionIndex}`
                            : undefined
                        }
                        onClick={handleTriggerClick}
                        onKeyDown={handleTriggerKeyDown}
                      >
                        <span
                          className={selectedChallenge ? "" : "text-ink-mid"}
                        >
                          {selectedChallenge || "Select one"}
                        </span>
                        <span
                          className={`text-[11px] text-ink-mid shrink-0 transition-transform duration-180 ease-out ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                      <ul
                        className="list-none absolute z-30 top-[calc(100%+6px)] left-0 right-0 bg-white rounded-lg shadow-[0_16px_36px_rgba(26,26,24,0.1)] p-1.5 m-0"
                        role="listbox"
                        id="bqChallengeMenu"
                        aria-labelledby="bqChallengeLabel"
                        hidden={!dropdownOpen}
                      >
                        {challengeOptions.map((opt, i) => (
                          <li
                            key={opt}
                            role="option"
                            id={`cs-opt-${i}`}
                            data-value={opt}
                            aria-selected={opt === selectedChallenge}
                            className={`px-3.5 py-3 text-[15px] text-ink rounded-md cursor-pointer transition-colors duration-120 ease-out hover:bg-forest/[0.07] aria-selected:font-semibold ${
                              i === activeOptionIndex ? "bg-forest/[0.07]" : ""
                            }`}
                            ref={(el) => {
                              optionRefs.current[i] = el;
                            }}
                            onClick={() => handleOptionClick(i)}
                            onMouseEnter={() => handleOptionMouseEnter(i)}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                      <input
                        type="hidden"
                        id="bqChallenge"
                        name="challenge"
                        value={selectedChallenge}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div>
                    <label
                      htmlFor="bqDetail"
                      className="block text-[10.5px] font-semibold text-ink-mid mb-2.25 uppercase tracking-[0.04em]"
                    >
                      Tell us what you&apos;re working through
                    </label>
                    <textarea
                      id="bqDetail"
                      name="detail"
                      placeholder="Share any context you think would be helpful."
                      className="w-full bg-ink/4 border-none rounded-lg px-3.75 py-3.5 text-[15px] text-ink font-sans outline-none resize-y min-h-24 leading-[1.55] transition-colors duration-180 ease-out placeholder:text-ink-soft focus:bg-forest/8"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-7 max-[600px]:justify-start">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 text-[12.5px] font-medium tracking-[0.04em] uppercase pb-2.25 border-b border-current text-forest transition-[gap] duration-250 ease-out hover:gap-3.25 [&_.arrow]:inline-block [&_.arrow]:transition-transform [&_.arrow]:duration-250 [&_.arrow]:ease-out hover:[&_.arrow]:translate-x-0.5"
                  >
                    Send inquiry <span className="arrow">→</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="block py-2" id="bespokeSuccess">
              <h4 className="font-['Cormorant_Garamond',serif] font-semibold text-xl text-ink mb-2">
                Thank you.
              </h4>
              <p className="text-[13.5px] text-ink-soft leading-normal">
                We&apos;ve received your inquiry and will follow up directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
