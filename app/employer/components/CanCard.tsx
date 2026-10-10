import { Candidate } from "@/app/data/registry";
import { TfiLocationPin } from "react-icons/tfi";
import { FaCarRear } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import Divider from "./Divider";

const Item = ({ name, val }: { name: string; val: string }) => {
  return (
    <div>
      <p className="">{name}</p>
      <p className="text-ink font-semibold">{val}</p>
    </div>
  );
};

const Pill = ({ val }: { val: string }) => {
  return (
    <div className="bg-forest-light text-ink-soft rounded-lg p-1 px-2">
      {val}
    </div>
  );
};

export default function CanCard({ c }: { c: Candidate }) {
  return (
    <div className="rounded-2xl text-slate-100 text-sm overflow-hidden border border-ash shadow-sm">
      {/* top */}
      <div className="bg-ink/95 text-white p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{c.title}</p>
          <div>{/* buttons */}</div>
        </div>
        <p className="text-xs text-slate-200">{c.code}</p>

        <div className="flex text-[.7rem] justify-between">
          <label className="flex items-center gap-2">
            <input
              className="accent-forest rounded-lg cursor-pointer"
              type="checkbox"
            />
            <p className="">Compare</p>
          </label>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-500" />
            <p>{c.activeAgo}</p>
          </div>
        </div>
      </div>
      {/* content */}

      <div className="text-ink-soft text-xs p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <TfiLocationPin />
            <p>{c.loc}</p>
          </div>
          {c.vehicle && (
            <div className="flex gap-1 items-center">
              <FaCarRear />
              <p>own vehicle</p>
            </div>
          )}
        </div>

        <Divider/>

        <p className="text-ink-mid font-semibold">{c.snapshot}</p>

        <div className="grid grid-cols-2 gap-2">
          <Item name="Availability" val={`${c.avail}`} />
          <Item name="Experience" val={`${c.years} years`} />
          <Item name="Shift Preference" val={c.shift.join(", ")} />
          <Item name="Employment Type" val={c.empType} />
        </div>

        <div>
          <p className="mb-2">Skills</p>
          <div className="flex gap-1 flex-wrap items-center">
            {c.skills.slice(0, 2).map((s) => (
              <Pill key={s} val={s} />
            ))}
            <p className="text-ink">
              + {c.skills.length - 2}{" "}
              {c.skills.length - 2 > 1 ? "skills" : "skill"}{" "}
            </p>
          </div>
        </div>

        <Divider/>

        <div>
          <Item name="Credential" val={c.credential} />
        </div>

        <div className="flex items-center gap-4 font-semibold">
          <button className="px-3 w-full p-2 rounded-lg border border-ash ">
            View profile
          </button>
          <button className="px-3 w-full p-2 rounded-lg bg-forest text-white">
            Reveal
          </button>
        </div>

        <div className="flex gap-1 items-center justify-end text-[.6rem] text-forest">
          <IoMdCheckmark />
          <p>Confirmed {c.confirmedDays} days ago</p>
        </div>
      </div>
    </div>
  );
}
