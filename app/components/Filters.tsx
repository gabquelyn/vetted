"use client"
import React, { useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

const FILTER_COUNTS: Record<number, number> = {
  0: 188,
  1: 74,
  2: 24,
  3: 89,
  4: 51,
  5: 23,
  6: 70,
  7: 77,
};

export default function Filters() {
  // Tailwind equivalent of .toggle-sw / .toggle-sw.on (the little switch pill,
  // including its ::before knob) as a single class-string builder.
  const toggleSwClasses = (on: boolean) =>
    `w-[46px] h-[26px] rounded-full relative shrink-0 cursor-pointer transition-[background] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 before:content-[''] before:absolute before:top-[3px] before:w-5 before:h-5 before:rounded-full before:bg-white before:shadow-[0_1px_3px_rgba(0,0,0,0.2)] before:transition-[left] before:duration-200 ${
      on
        ? "bg-forest before:left-[23px]"
        : "bg-ash before:left-[3px]"
    }`;

  const [vehicleOn, setVehicleOn] = useState(false);
  const [nightsOn, setNightsOn] = useState(false);
  const [availableOn, setAvailableOn] = useState(false);
  const filterMask =
    (vehicleOn ? 1 : 0) | (nightsOn ? 2 : 0) | (availableOn ? 4 : 0);
  const matchCount = FILTER_COUNTS[filterMask];

  const toggleSwitchKeyHandler =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setter((v) => !v);
      }
    };
  return (
    <div className="">
      <section className="max-w-350 mx-auto px-12 pt-32.5 pb-17.5">
        <div className="text-center max-w-160 mx-auto mb-20">
          <div className="text-[11.5px] font-medium tracking-[0.08em] uppercase text-forest mb-4">
            Search &amp; filters
          </div>
          <h2 className="font-serif font-semibold text-[clamp(34px,4vw,48px)] leading-[1.18] text-ink mb-4">
            As broad or as specific as the role requires.
          </h2>
          <p className="text-[17px] font-light text-ink-soft leading-[1.55]">
            Search by profession, specialty, availability, shift, work
            environment and more — using structured fields built for healthcare
            hiring.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1.1fr] gap-17.5 items-center mb-27.5 max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          <div>
            <h3 className="font-['Cormorant_Garamond',serif] text-[clamp(30px,3.2vw,42px)] font-medium leading-[1.15] mb-4.5">
              Filter for the{" "}
              <span className="text-forest font-semibold">
                details that matter
              </span>
              .
            </h3>
            <p className="text-base text-ink-soft leading-[1.6] max-w-100">
              Availability, shift preference, mobility and more — structured
              upfront, narrow the pool and vet the fit before deciding who to
              contact.
            </p>
            <div
              className={`mt-7 pt-5.5 border-t border-ash transition-[opacity,transform] duration-400 ease motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${
                true
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2.5"
              }`}
            >
              <div className="text-[14.5px] font-semibold text-ink mb-2">
                Also hiring independent contractors?
              </div>
              <p className="text-[13px] text-ink-soft leading-[1.55] max-w-90 mb-2.5">
                Find healthcare professionals who indicate they are open to
                direct contracts. You contact and contract with them yourself.
              </p>
              <a
                href="employer.html#independent-contractors"
                className="text-[12.5px] font-semibold text-forest no-underline border-b border-transparent transition-[border-color] duration-150 hover:border-b-forest"
              >
                Learn about independent-contractor profiles →
              </a>
            </div>
          </div>
          <div className="bg-white border border-ash rounded-xl px-10 py-9 shadow-[0_20px_50px_rgba(45,80,22,0.06)]">
            <div className="text-[10.5px] font-bold tracking-[0.07em] uppercase text-ink-soft mb-5.5">
              Live Filter
            </div>
            <div className="flex items-center justify-between py-4 border-b border-ash text-[17px] text-ink last-of-type:border-b-0">
              Own Vehicle
              <div
                className={toggleSwClasses(vehicleOn)}
                role="switch"
                aria-checked={vehicleOn}
                tabIndex={0}
                aria-label="Own Vehicle"
                onClick={() => setVehicleOn((v) => !v)}
                onKeyDown={toggleSwitchKeyHandler(setVehicleOn)}
              ></div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-ash text-[17px] text-ink last-of-type:border-b-0">
              Open to Nights
              <div
                className={toggleSwClasses(nightsOn)}
                role="switch"
                aria-checked={nightsOn}
                tabIndex={0}
                aria-label="Open to Nights"
                onClick={() => setNightsOn((v) => !v)}
                onKeyDown={toggleSwitchKeyHandler(setNightsOn)}
              ></div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-ash text-[17px] text-ink last-of-type:border-b-0">
              Available Immediately
              <div
                className={toggleSwClasses(availableOn)}
                role="switch"
                aria-checked={availableOn}
                tabIndex={0}
                aria-label="Available Immediately"
                onClick={() => setAvailableOn((v) => !v)}
                onKeyDown={toggleSwitchKeyHandler(setAvailableOn)}
              ></div>
            </div>
            <div className="mt-5.5 bg-cream rounded-xl px-4.5 py-4 text-[14.5px] text-ink-soft">
              Showing{" "}
              <b id="matchCount" className="text-forest text-[17px]">
                {matchCount}
              </b>{" "}
              candidates who match
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-y-11 gap-x-8 pt-12.5 border-t border-ash">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 12h6M12 9v6" />
              </svg>
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Profession &amp; Specialty
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Down to sub-specialty
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5Z" />
              </svg>
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Certifications
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Searchable, not just listed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Availability
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Immediate, notice, or passive
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Shift Preference
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Days, nights, weekends, more
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M4 21V9l8-6 8 6v12" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Work Environments
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                LTC, retirement, hospital, more
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <IoCarSportOutline size={20} />
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Vehicle Access
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Shown when true
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-light flex items-center justify-center shrink-0 text-forest">
              <MdOutlineLocationOn size={20} />
            </div>
            <div className="text-[15.5px] text-ink font-medium">
              Location &amp; Mobility
              <span className="block text-[11.5px] text-ink-soft mt-0.5 font-normal">
                Radius, relocation, rural, travel / fly-in
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 text-[13.5px] text-ink-soft text-center">
          Build the search around the role you need:{" "}
          <b className="text-forest">
            RPN + Nights + Toronto + Own Vehicle.
          </b>
        </div>
        <div className="mt-5.5 text-[13.5px] text-ink-soft text-center">
          <a
            href="employer.html"
            className="text-forest font-semibold no-underline border-b border-transparent transition-[border-color] duration-150 hover:border-b-forest"
          >
            See how employer access works →
          </a>
        </div>
      </section>
    </div>
  );
}
