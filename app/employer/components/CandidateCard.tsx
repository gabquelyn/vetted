"use client";
import Active from "@/app/components/Active";
import { motion } from "motion/react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaCarRear } from "react-icons/fa6";
import { PiLightningDuotone } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineShield } from "react-icons/md";
import { HiArrowUturnUp } from "react-icons/hi2";
import { PiStarDuotone } from "react-icons/pi";

import clsx from "clsx";

const Divider = () => {
  return <hr className="border-px border-ash/40 my-1.5" />;
};

const Title = ({ label }: { label: string }) => {
  return <p className="text-ink-soft uppercase font-medium mb-1 ">{label}</p>;
};

export default function CandidateCard({
  c,
  ui,
  onUnlock,
  toggleCompare, // <- new prop
}: {
  c: Candidate;
  ui?: UICompare;
  onUnlock: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const fitScore = Math.min(98, 70 + c.exp * 2 + (c.activeNow ? 5 : 0));
  const unlocked = ui?.unlocked[c.id];
  const inCompare = ui?.compare.includes(c.id);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={clsx(
        "relative w-72 rounded-2xl text-[.6rem] border bg-white p-4 shadow-sm hover:shadow-md transition",
        c.specialist ? "border-yellow-500" : " border-ash",
      )}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {c.specialist && (
        <p className="absolute  p-1 px-2 top-0 flex items-center gap-1 right-8 rounded-bl-lg rounded-br-lg bg-amber-800 text-yellow-50">
          <PiStarDuotone />
          <span>Specialist</span>
        </p>
      )}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className={`${flipped ? "hidden" : "block"}`}>
          {/* Header */}

          {/* Compare toggle */}
          <div className=" flex items-center gap-1 mb-2  text-ink-soft">
            <input
              type="checkbox"
              checked={inCompare}
              className="accent-forest cursor-pointer"
              onChange={() => toggleCompare(c.id)}
            />
            <p> Compare</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-[9px] uppercase text-ink-soft">{c.code}</p>
              <p className="text-xs font-semibold text-ink">{c.label}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Active active={c.activeNow} />
              {c.verified && (
                <span className="tag-green flex items-center gap-1">
                  <MdOutlineVerified /> verified
                </span>
              )}
            </div>
          </div>

          <Divider />
          <div>
            <Title label="Location" />
            <div className=" text-ink flex items-center gap-3 ">
              <p className="flex items-center gap-1">
                <IoLocationSharp />
                <span>{c.loc}</span>
              </p>
              <span>
                <LuDot />
              </span>
              <p>
                <span>{c.vehicle && <FaCarRear />}</span>
              </p>
            </div>
          </div>
          <Divider />

          <div>
            <Title label="Experience" />
            <div className="flex gap-2 items-center">
              <p className="text-ink ">{c.exp} years</p>
              {c.notice && (
                <p className="tag-yellow flex gap-1 items-center">
                  <PiLightningDuotone /> {c.notice}
                </p>
              )}
            </div>
          </div>

          <Divider />
          <div>
            <Title label="Skills" />
            <div className="flex flex-wrap gap-1 mb-3">
              {c.skills.split("·").map((s: string, i: number) => (
                <span key={i} className="tag-green">
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
          <Divider />

          {/* Tags */}
          <div>
            <Title label="Status" />
            <div className="flex flex-wrap gap-1 ">
              {c.ic && (
                <span className="tag-yellow flex items-center gap-1">
                  <PiLightningDuotone /> Ic
                </span>
              )}
              {c.insured && (
                <span className="tag-blue flex items-center gap-1">
                  <MdOutlineShield /> Insured
                </span>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <Title label="Education" />
            <p className="truncate  text-ink">{c.edu}</p>
          </div>

          <Divider />
          <div className="flex justify-end">
            <p>
              Verified {c.verified} day{c.verified > 1 && "s"} ago
            </p>
          </div>
          {/* <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 10,
              fontWeight: 600,
              background: "#1a1a18",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 20,
            }}
          >
            {fitScore}% fit
          </div> */}

          {/* Actions */}
          {/* <div className="flex justify-end">
            <button
              onClick={() => setFlipped(true)}
              className=" text-ink-soft/80 flex gap-1 mt-3 items-center hover:text-ink"
            >
              More info <HiArrowUturnUp />
            </button>
          </div> */}

          <button
            onClick={() => onUnlock(c.id)}
            className={clsx(
              "mt-2 w-full rounded-md flex items-center justify-center py-2 border cursor-pointer  transition",
              c.specialist
                ? "bg-yellow-100 hover:text-yellow-100 hover:bg-yellow-800 text-yellow-800 border-yellow-800"
                : "bg-ink text-white",
            )}
          >
            {c.specialist ? (
              <p className="flex items-center gap-2">
                <PiStarDuotone />
                <span>Specialist Unlock</span>
              </p>
            ) : (
              <p>Reveal profile</p>
            )}
          </button>
        </div>

        {/* BACK */}


        {/* <div
          className={`absolute h-30 bg-white inset-0 ${flipped ? "block" : "hidden"}`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-2  text-ink-soft">
                <input
                  type="checkbox"
                  checked={inCompare}
                  onChange={() => toggleCompare(c.id)}
                />
                <p> Compare</p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div>
                  <p className="text-[9px] uppercase text-ink-soft">{c.code}</p>
                  <p className="text-sm font-semibold text-ink">{c.label}</p>
                </div>

                <div>
                  <Title label="Certifications" />
                  <p className="">{c.certs || "No certifications listed"}</p>
                </div>

                <div>
                  <Title label="Shift Preference" />
                  <p className="">Shift: {c.shifts.join(", ")}</p>
                </div>

                <div>
                  <Title label="Travel Willingness" />
                  <p className="">{c.travel}</p>
                </div>

                <div className="p-3 rounded-lg border border-yellow-600 bg-yellow-50 ">
                  {c.summary}
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setFlipped(false)}
                className=" text-ink-soft hover:text-ink"
              >
                ← Back
              </button>
            </div>
          </div>
        </div> */}
      </motion.div>
    </motion.div>
  );
}
