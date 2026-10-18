"use client"
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "motion/react";

/*
  Pricing & Employer Early Access. Same token map as the other Registry components:
    forest #2d5016 · forest-deep #16260c · forest-light #e8f0e0 · hover green #3d6b1f
    ink #1a1a18 · ink-soft #5c5c58 · ink-faint #8a8a84 · border #e5e2da · cream #faf9f6 · amber #b8722c
  The original pricing-* / plan-* / f-* / pi-* rules weren't supplied, so styles are built
  from the existing card, chip, form-field and dropdown language.
*/

type Plan = "standard" | "custom";
type PlanInterest = "" | "not_sure" | "standard" | "custom";

export type EarlyAccessPayload = {
  name: string;
  email: string;
  organization: string;
  profession: string;
  location: string;
  planInterest: Exclude<PlanInterest, "">;
};

const PLAN_OPTIONS: { value: Exclude<PlanInterest, "">; label: string }[] = [
  { value: "not_sure", label: "Not sure yet" },
  { value: "standard", label: "Standard workspace" },
  { value: "custom", label: "Custom plan" },
];

const ADDONS: { label: string; price: string; specialist?: boolean }[] = [
  { label: "10 reveal top-up", price: "$25" },
  { label: "25 reveal top-up", price: "$49" },
  { label: "Additional seat / month", price: "$19" },
  { label: "Additional Urgent Post", price: "$40" },
  { label: "Specialist introduction — recruiter-assisted", price: "from $[TBD]", specialist: true },
];

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-[3px] shrink-0 text-[#2d5016]">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Feat = ({ children }: { children: ReactNode }) => (
  <div className="flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-[#1a1a18]">
    <Check />
    <span>{children}</span>
  </div>
);

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mb-5">
    <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8a8a84]">{title}</div>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

const fieldInput =
  "w-full rounded-lg border border-[#d8d3c2] bg-white px-3 py-[10.5px] font-[inherit] text-[13px] text-[#1a1a18] outline-none transition placeholder:text-[#8a8a84] focus:border-[#2d5016] focus:shadow-[0_0_0_3px_#e8f0e0]";

const FieldLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="mb-[5px] block text-[11px] font-semibold text-[#5c5c58]">
    {children}
  </label>
);

type Props = {
  onSubmit?: (payload: EarlyAccessPayload) => void | Promise<void>;
};

export default function PricingSection({ onSubmit }: Props) {
  const [plan, setPlan] = useState<Plan>("standard");
  const [form, setForm] = useState({ name: "", email: "", organization: "", profession: "", location: "" });
  const [planInterest, setPlanInterest] = useState<PlanInterest>("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [planError, setPlanError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // close the custom select on outside click / Escape
  useEffect(() => {
    if (!selectOpen) return;
    const onDown = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) setSelectOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setSelectOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selectOpen]);

  const keyActivate = (e: KeyboardEvent, fn: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  const pickInterest = (v: Exclude<PlanInterest, "">) => {
    setPlanInterest(v);
    setPlanError(false);
    setSelectOpen(false);
  };

  const talkToUs = () => {
    pickInterest("custom");
    nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameRef.current?.focus({ preventScroll: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!planInterest) {
      setPlanError(true);
      return;
    }
    await onSubmit?.({ ...form, planInterest });
    setSubmitted(true);
  };

  const planLabel = PLAN_OPTIONS.find((o) => o.value === planInterest)?.label;

  return (
    <section id="pricing" className="bg-white py-24 font-['DM_Sans',sans-serif] text-[#1a1a18] antialiased">
      <div className="mx-auto max-w-290 px-8">
        {/* head */}
        <Reveal className="mx-auto mb-14 max-w-170 text-center">
          <div className="mb-4 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#2d5016]">
            Pricing &amp; Employer Early Access
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.2]">
            Everything you need to <span className="font-semibold italic text-[#2d5016]">get started.</span>
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 items-start gap-5.5 min-[961px]:grid-cols-[1.1fr_0.9fr]">
          {/* ===== price side ===== */}
          <div className="rounded-2xl border border-[#e9e9e6] bg-white p-8 shadow-[0_14px_30px_rgba(20,20,18,0.06)]">
            {/* plan switcher */}
            <div className="mb-7">
              <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8a8a84]">Choose a plan</div>
              <div role="tablist" aria-label="Choose a plan" className="inline-flex items-center gap-4 border-b border-[#e5e2da]">
                {(["standard", "custom"] as Plan[]).map((p, i) => (
                  <div key={p} className="flex items-center gap-4">
                    {i === 1 && <span aria-hidden className="h-4 w-px bg-[#e5e2da]" />}
                    <button
                      type="button"
                      role="tab"
                      id={`planBtn-${p}`}
                      aria-selected={plan === p}
                      aria-controls={`planPanel-${p}`}
                      onClick={() => setPlan(p)}
                      className={`-mb-px cursor-pointer border-b-2 bg-transparent px-0.5 pb-2.5 pt-1 text-sm capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d5016] ${
                        plan === p
                          ? "border-[#2d5016] font-bold text-[#2d5016]"
                          : "border-transparent font-semibold text-[#8a8a84] hover:text-[#1a1a18]"
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* standard */}
            {plan === "standard" && (
              <div id="planPanel-standard" role="tabpanel" aria-labelledby="planBtn-standard">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2d5016]">Standard</div>
                <div className="mb-3 font-['Cormorant_Garamond',serif] text-[26px] font-semibold leading-[1.2]">
                  Full access, one price
                </div>
                <div className="mb-7 flex flex-wrap items-baseline gap-2">
                  <span className="font-['Cormorant_Garamond',serif] text-[48px] font-semibold leading-none">$249</span>
                  <span className="text-sm text-[#5c5c58]">/ month</span>
                  <span className="rounded-full bg-[#fbf1e2] px-2.5 py-0.75 text-[10.5px] font-bold text-[#b8722c]">
                    ★ Launch price
                  </span>
                </div>

                <Group title="Registry & Directory access">
                  <Feat>Full Registry search and filters</Feat>
                  <Feat>Directory access</Feat>
                  <Feat>Compare and save candidates</Feat>
                  <Feat>15 pooled Reveals added monthly</Feat>
                </Group>
                <Group title="Urgent Hiring">
                  <Feat>2 Urgent Posts included monthly</Feat>
                  <Feat>Responses organized as professionals reply</Feat>
                </Group>
                <Group title="Employer workspace">
                  <Feat>Saved searches, notes and light team collaboration</Feat>
                  <Feat>Revealed professionals stay organized · one seat</Feat>
                  <Feat>Direct contact for standard Reveals · no placement fee</Feat>
                </Group>

                <div className="mb-2 rounded-[10px] bg-[#e8f0e0] px-3.5 py-3 text-[12.5px] leading-[1.55] text-[#16260c]">
                  15 pooled Reveals means fifteen standard profiles you can contact directly each month. Unused Reveals
                  carry forward.
                </div>
                <div className="mb-6 text-[12.5px] font-semibold text-[#5c5c58]">
                  $2,490 / year — annual billing available.
                </div>

                <div className="border-t border-[#e5e2da] pt-4">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8a8a84]">Add-ons</div>
                  {ADDONS.map((a) => (
                    <div
                      key={a.label}
                      className={`flex items-center justify-between gap-4 border-b border-[#e5e2da] py-2 text-[12.5px] last:border-b-0 ${
                        a.specialist ? "text-[#8a5a1f]" : "text-[#5c5c58]"
                      }`}
                    >
                      <span>{a.label}</span>
                      <b className={`shrink-0 font-bold ${a.specialist ? "text-[#8a5a1f]" : "text-[#1a1a18]"}`}>{a.price}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* custom */}
            {plan === "custom" && (
              <div id="planPanel-custom" role="tabpanel" aria-labelledby="planBtn-custom">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2d5016]">Custom plan</div>
                <div className="mb-3 font-['Cormorant_Garamond',serif] text-[26px] font-semibold leading-[1.2]">
                  Built around your team.
                </div>
                <p className="mb-6 text-[14.5px] leading-[1.65] text-[#5c5c58]">
                  For organizations with larger hiring volumes, multiple users, or needs beyond the Standard workspace,
                  Vetted can be configured around how your team hires.
                </p>
                <div className="mb-5.5 flex flex-col gap-2">
                  <Feat>Custom Reveal volume</Feat>
                  <Feat>Custom Urgent Hiring volume</Feat>
                  <Feat>Multiple seats / team access</Feat>
                  <Feat>Tailored workspace allowances</Feat>
                  <Feat>Pricing based on your requirements</Feat>
                </div>
                <div className="mb-4 font-['Cormorant_Garamond',serif] text-[20px] font-semibold italic text-[#2d5016]">
                  Pricing tailored to your requirements
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={talkToUs}
                  onKeyDown={(e) => keyActivate(e, talkToUs)}
                  className="inline-flex cursor-pointer items-center gap-1.5 border-b border-[#2d5016]/45 pb-0.5 text-sm font-bold text-[#2d5016] transition-colors hover:border-[#16260c] hover:text-[#16260c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d5016]"
                >
                  Talk to us about your team <span aria-hidden>→</span>
                </span>
              </div>
            )}
          </div>

          {/* ===== form side ===== */}
          <div className="rounded-2xl border border-[#e9e9e6] bg-[#faf9f6] p-8 shadow-[0_14px_30px_rgba(20,20,18,0.06)] min-[961px]:sticky min-[961px]:top-28">
            {!submitted ? (
              <div>
                <h3 className="mb-2.5 font-['Cormorant_Garamond',serif] text-[26px] font-semibold leading-[1.2]">
                  Request Employer Early Access
                </h3>
                <p className="mb-6 text-[13.5px] leading-[1.6] text-[#5c5c58]">
                  Vetted is preparing to launch for Ontario healthcare employers. Tell us what you are hiring for and
                  where, and we wll keep you updated on availability and let you know when employer access opens.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div>
                    <FieldLabel htmlFor="af-name">Full name</FieldLabel>
                    <input id="af-name" ref={nameRef} type="text" required placeholder="Jordan Reyes" value={form.name} onChange={set("name")} className={fieldInput} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="af-email">Work email</FieldLabel>
                    <input id="af-email" type="email" required placeholder="jordan@yourorganization.ca" value={form.email} onChange={set("email")} className={fieldInput} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="af-org">Organization</FieldLabel>
                    <input id="af-org" type="text" required placeholder="Organization name" value={form.organization} onChange={set("organization")} className={fieldInput} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="af-prof">What you are hiring for</FieldLabel>
                    <input id="af-prof" type="text" required placeholder="e.g. RPN, PSW, DSW" value={form.profession} onChange={set("profession")} className={fieldInput} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="af-loc">Primary hiring location</FieldLabel>
                    <input id="af-loc" type="text" required placeholder="City or region" value={form.location} onChange={set("location")} className={fieldInput} />
                  </div>

                  {/* custom select */}
                  <div>
                    <FieldLabel>Plan interest</FieldLabel>
                    <div ref={selectRef} className="relative">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={selectOpen}
                     
                        onClick={() => setSelectOpen((o) => !o)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3 py-[10.5px] text-left font-[inherit] text-[13px] transition focus-visible:outline-none ${
                          planError
                            ? "border-[#b8722c]"
                            : selectOpen
                              ? "border-[#2d5016] shadow-[0_0_0_3px_#e8f0e0]"
                              : "border-[#d8d3c2] hover:border-[#c9c5b8] focus-visible:border-[#2d5016] focus-visible:shadow-[0_0_0_3px_#e8f0e0]"
                        }`}
                      >
                        <span className={planLabel ? "text-[#1a1a18]" : "text-[#8a8a84]"}>
                          {planLabel ?? "Select plan interest"}
                        </span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className={`shrink-0 text-[#8a8a84] transition-transform ${selectOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {selectOpen && (
                        <div
                          role="listbox"
                          aria-label="Plan interest"
                          className="absolute left-0 right-0 top-[calc(100%+5px)] z-20 rounded-[10px] border border-[#e5e2da] bg-white p-1.25 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
                        >
                          {PLAN_OPTIONS.map((o) => (
                            <div
                              key={o.value}
                              role="option"
                              tabIndex={0}
                              aria-selected={planInterest === o.value}
                              onClick={() => pickInterest(o.value)}
                              onKeyDown={(e) => keyActivate(e, () => pickInterest(o.value))}
                              className={`cursor-pointer rounded-md px-2.75 py-2 text-[13px] leading-[1.4] hover:bg-[#e8f0e0] hover:text-[#2d5016] focus-visible:bg-[#e8f0e0] focus-visible:text-[#2d5016] focus-visible:outline-none ${
                                planInterest === o.value ? "font-bold text-[#2d5016]" : "text-[#1a1a18]"
                              }`}
                            >
                              {o.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {planError && (
                      <div role="alert" className="mt-1.5 text-[11.5px] font-semibold text-[#b8722c]">
                        Please select a plan interest.
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-1.5 inline-flex cursor-pointer items-center justify-center rounded-full border-none bg-[#2d5016] px-6.5 py-3.75 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#3d6b1f] hover:shadow-[0_14px_30px_rgba(45,80,22,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16260c] motion-reduce:hover:translate-y-0"
                  >
                    Request Employer Early Access
                  </button>
                  <div className="text-center text-[11.5px] text-[#8a8a84]">
                    No commitment — we wll contact you when employer access becomes available.
                  </div>
                </form>
              </div>
            ) : (
              <div role="status" className="flex flex-col items-center px-2 py-10 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2d5016] text-xl font-bold text-white">
                  ✓
                </div>
                <h4 className="mb-2.5 font-['Cormorant_Garamond',serif] text-[24px] font-semibold leading-[1.2]">
                  You are on the early access list.
                </h4>
                <p className="max-w-90 text-[13.5px] leading-[1.65] text-[#5c5c58]">
                  Thanks for your interest in Vetted. We wll keep your details on file and let you know when employer
                  access becomes available. If we can support your hiring needs sooner, we wll be in touch.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}