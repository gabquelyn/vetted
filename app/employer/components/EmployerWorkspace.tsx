"use client"
import type { ReactNode } from "react";
import { motion } from "motion/react";


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

const blockBase =
  "rounded-2xl border border-[#e9e9e6] bg-white px-5 py-4 shadow-[0_14px_30px_rgba(20,20,18,0.06)]";

type BlockHeadProps = { title: string; note?: string };
const BlockHead = ({ title, note }: BlockHeadProps) => (
  <div className="mb-1 flex items-baseline justify-between gap-3">
    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8a8a84]">{title}</span>
    {note && <span className="text-[11px] font-semibold text-[#5c5c58]">{note}</span>}
  </div>
);

type RowProps = { label: ReactNode; value?: ReactNode; italic?: boolean };
const Row = ({ label, value, italic = false }: RowProps) => (
  <div className="flex items-center justify-between gap-4 py-2 text-[12.5px]">
    <span className={`text-[#1a1a18] ${italic ? "italic leading-normal text-[#5c5c58]" : "font-medium"}`}>{label}</span>
    {value && <span className="shrink-0 font-semibold text-[#2d5016]">{value}</span>}
  </div>
);

const Toggle = ({ on = true }: { on?: boolean }) => (
  <span
    role="switch"
    aria-checked={on}
    className={`relative inline-block h-4.5 w-8 rounded-full transition-colors ${on ? "bg-[#2d5016]" : "bg-[#e5e2da]"}`}
  >
    <span
      className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all ${on ? "left-4" : "left-0.5"}`}
    />
  </span>
);

export default function EmployerWorkspace() {
  return (
    <section className="bg-white py-24 font-['DM_Sans',sans-serif] text-[#1a1a18] antialiased">
      <div className="mx-auto grid max-w-300 grid-cols-1 items-start gap-14 px-8 min-[961px]:grid-cols-[0.9fr_1.1fr] min-[961px]:gap-16">
        {/* copy */}
        <Reveal className="min-[961px]:sticky min-[961px]:top-28">
          <div className="mb-4 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#2d5016]">
            Employer Workspace
          </div>
          <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.2]">
            Vetted keeps working after you close the tab.
          </h2>
          <p className="max-w-115 text-base leading-[1.6] text-[#5c5c58]">
            Save a search and turn on alerts when newly confirmed professionals meet your criteria. Saved candidates,
            team notes and revealed professionals stay organized in your workspace.
          </p>
        </Reveal>

        {/* panel */}
        <div className="flex flex-col gap-3.5">
          {/* primary block: saved search + new match */}
          <Reveal>
            <div className="rounded-2xl border border-[#2d5016]/15 bg-[#e8f0e0] px-5 py-2 shadow-[0_18px_44px_rgba(28,52,16,0.09)]">
              <div className="border-b border-[#2d5016]/[0.14] py-3">
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13.5px] font-bold text-[#16260c]">Saved search</span>
                  <span className="text-[11.5px] font-semibold text-[#2d5016]">RPN · Halton · Immediate</span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-[12.5px]">
                  <span className="font-medium text-[#5c5c58]">Alerts on</span>
                  <Toggle on />
                </div>
              </div>
              <div className="py-3">
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13.5px] font-bold text-[#16260c]">New match</span>
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2d5016]">
                    <span className="h-1.75 w-1.75 rounded-full bg-[#22c55e]" />
                    Today
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-[12.5px]">
                  <span className="font-medium text-[#1a1a18]">RPN-076 · Oakville · newly confirmed</span>
                  <span className="font-semibold text-[#2d5016]">→</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* saved candidate */}
          <Reveal>
            <div className={blockBase}>
              <BlockHead title="Saved candidate" note="1 added" />
              <Row label="RPN-076 · Confirmed 1 day ago" value={<span className="text-[#b8722c]">★</span>} />
            </div>
          </Reveal>

          {/* team note */}
          <Reveal>
            <div className={blockBase}>
              <BlockHead title="Team note" note="Private to your workspace" />
              <Row italic label={"\u201CGood fit for the weekend rotation — flagged for Priya to call.\u201D"} />
            </div>
          </Reveal>

          {/* high-value pair */}
          <div className="grid grid-cols-1 gap-3.5 min-[641px]:grid-cols-2">
            <Reveal>
              <div className={`${blockBase} h-full`}>
                <BlockHead title="Revealed professionals" />
                <Row label="Stay organized in one view, ready when you need them again." />
              </div>
            </Reveal>
            <Reveal>
              <div className={`${blockBase} h-full`}>
                <BlockHead title="Share Shortlist" />
                <Row label="Send a view-only shortlist to a colleague — no seat required." />
              </div>
            </Reveal>
          </div>

          {/* footer: invite team */}
          <Reveal>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#e5e2da] bg-[#faf9f6] px-5 py-4">
              <span className="text-[12.5px] font-semibold text-[#1a1a18]">
                Invite your team — shared visibility, private notes
              </span>
              <div className="flex shrink-0 items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#faf9f6] bg-[#2d5016] text-[12px] font-bold text-white">
                  B
                </div>
                <button
                  type="button"
                  aria-label="Invite a teammate"
                  className="-ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-[#8a8a84] bg-white text-[14px] font-semibold text-[#8a8a84] transition-colors hover:border-[#2d5016] hover:text-[#2d5016] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d5016]"
                >
                  +
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}