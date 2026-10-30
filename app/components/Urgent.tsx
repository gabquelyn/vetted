import Link from "next/link";
import React from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
export default function Urgent() {
  return (
    <div className="bg-ink" id="#urgent">
      <section className="max-w-270 mx-auto px-8 pt-30 pb-32.5 text-center">
        {/* <div className="inline-flex items-center gap-1.75 text-[11.5px] font-bold tracking-[0.06em] uppercase text-[#e8a876] bg-[rgba(181,98,42,0.25)] px-3.5 py-1.5 rounded-full mb-5 before:content-['⚡']">
          Urgent hiring
        </div> */}
        <h2 className="font-serif font-semibold text-[38px] leading-[1.15] mb-3.5 text-white">
          Need to hire by tomorrow?
        </h2>
        <p className="text-base font-light text-[#c9d0c2] max-w-130 mx-auto mb-2.5 leading-[1.55]">
          Create an Urgent Post. Professionals who meet your selected criteria
          are notified right away by text and email. Responses appear together
          for you to review and sort.
        </p>
        <div className="text-[13px] text-[#8fb86a] font-semibold mb-12.5">
          2 Urgent Posts included every month
        </div>

        <div className="bg-cream border border-ash rounded-[20px] p-8 text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="mb-2 flex justify-between items-start flex-wrap gap-2.5">
            <div className="font-serif text-2xl font-semibold">
              RPN needed — Nights, Toronto
            </div>
            <div className="text-[12.5px] text-ink-soft flex gap-4 flex-wrap">
              <span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest-mid inline-block mr-1.25"></span>
                Posted 19 min ago
              </span>
              <span>
                <b style={{ color: "var(--ink)" }}>3</b> responses so far
              </span>
              <span>
                <b style={{ color: "var(--ink)" }}>71</b> matched professionals
                notified
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-6 mb-3.5 text-xs text-ink-mid">
            <div>
              Sort by: <b className="text-ink">Earliest start</b>
            </div>
            <div>Compare responses side by side</div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-1">
            <div className="bg-white border border-ash rounded-[15px] relative overflow-hidden border-forest shadow-[0_10px_30px_rgba(45,80,22,0.1)]">
              <div className="bg-forest text-white text-center text-[10.5px] font-bold tracking-[0.05em] uppercase p-1.75">
                Can start today
              </div>
              <div className="p-4.5">
                <div className="flex justify-between items-center text-[11.5px] text-ink mb-3">
                  <span>✓ Confirmed · 2d</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-mid"></span>
                </div>
                <div className="font-['IBM_Plex_Mono',monospace] font-bold text-[17px] mb-0.5">
                  RPN-014
                </div>
                <div className="text-xs text-ink-soft mb-3.25 pb-3.25 border-b border-ash">
                  Registered Practical Nurse
                </div>
                <div className="flex items-center gap-1.5 text-[11.5px] text-ink mb-2.75">
                  <MdOutlineLocationOn size={11} opacity={0.55} />
                  Toronto, ON
                  <span style={{ margin: "0 4px", color: "var(--ink-faint)" }}>
                    ·
                  </span>
                  <IoCarSportOutline size={15} />
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Responded</span>
                  <span className="font-semibold text-forest">4 min ago</span>
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Shift match</span>
                  <span className="font-semibold text-forest">✓ Nights</span>
                </div>
                <div className="flex gap-1.25 mt-2.75 mb-3.5 flex-wrap">
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    Wound Care
                  </span>
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    LTC
                  </span>
                </div>
                <div className="bg-forest text-white text-center p-2.75 rounded-[9px] text-[12.5px] font-bold">
                  Reveal →
                </div>
              </div>
            </div>

            <div className="bg-white border border-ash rounded-[15px] relative overflow-hidden">
              <div className="p-4.5">
                <div className="flex justify-between items-center text-[11.5px] text-ink mb-3">
                  <span>✓ Confirmed · 1d</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-mid"></span>
                </div>
                <div className="font-['IBM_Plex_Mono',monospace] font-bold text-[17px] mb-0.5">
                  RPN-027
                </div>
                <div className="text-xs text-ink-soft mb-3.25 pb-3.25 border-b border-ash">
                  Registered Practical Nurse
                </div>
                <div className="flex items-center gap-1.5 text-[11.5px] text-ink mb-2.75">
                  <MdOutlineLocationOn size={11} opacity={0.55} />
                  Mississauga, ON
                  <span style={{ margin: "0 4px", color: "var(--ink-faint)" }}>
                    ·
                  </span>
                  <IoCarSportOutline size={15} />
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Responded</span>
                  <span className="font-semibold text-ink">11 min ago</span>
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Reliable transport</span>
                  <span className="font-semibold text-forest">Yes</span>
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Shift match</span>
                  <span className="font-semibold text-forest">✓ Nights</span>
                </div>
                <div className="flex gap-1.25 mt-2.75 mb-3.5 flex-wrap">
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    Palliative Care
                  </span>
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    LTC
                  </span>
                </div>
                <div className="bg-forest text-white text-center p-2.75 rounded-2.25 text-[12.5px] font-bold">
                  Reveal →
                </div>
              </div>
            </div>

            <div className="bg-white border border-ash rounded-[15px] relative overflow-hidden">
              <div className="p-4.5">
                <div className="flex justify-between items-center text-[11.5px] text-ink mb-3">
                  <span>✓ Confirmed · 4d</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-mid"></span>
                </div>
                <div className="font-['IBM_Plex_Mono',monospace] font-bold text-[17px] mb-0.5">
                  RPN-058
                </div>
                <div className="text-xs text-ink-soft mb-3.25 pb-3.25 border-b border-ash">
                  Registered Practical Nurse
                </div>
                <div className="flex items-center gap-1.5 text-[11.5px] text-ink mb-2.75">
                  <MdOutlineLocationOn size={11} opacity={0.55} />
                  Scarborough, ON
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Responded</span>
                  <span className="font-semibold text-ink">12 min ago</span>
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Earliest start</span>
                  <span className="font-semibold text-ink">Tomorrow</span>
                </div>
                <div className="flex justify-between text-[11.5px] py-1.25">
                  <span className="text-ink-mid">Within</span>
                  <span className="font-semibold text-ink">14 km</span>
                </div>
                <div className="flex gap-1.25 mt-2.75 mb-3.5 flex-wrap">
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    Retirement
                  </span>
                  <span className="text-xs font-semibold bg-forest-light text-forest px-2.25 py-1 rounded-full">
                    Nights
                  </span>
                </div>
                <div className="bg-forest text-white text-center p-2.75 rounded-md text-[12.5px] font-bold">
                  Reveal →
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5.5 text-[12.5px] text-ink-mid">
            Responses update in real time as more candidates reply — no need to
            refresh or check back manually.
          </div>
        </div>
        <div className="text-center mt-6.5">
          <Link
            href="/demo"
            className="text-[#9FC47C] text-[13px] font-semibold no-underline border-b border-transparent transition-[border-color] duration-150 hover:border-b-[#9FC47C]"
          >
            Explore Urgent Hiring →
          </Link>
        </div>
      </section>
    </div>
  );
}
