import { Candidate } from "@/app/data/registry";
import { TfiLocationPin } from "react-icons/tfi";
import { FaCarRear } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import Divider from "./Divider";
import { TiStarOutline } from "react-icons/ti";
import { LuBookmark, LuEyeOff } from "react-icons/lu";

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

export default function CanCard({
  c,
  onSave,
  onCompare,
  saved,
  onProfileView,
  onReveal,
  reveals,
  onIntroduction,
}: {
  c: Candidate;
  onSave: (id: string) => void;
  onCompare: (id: string) => void;
  saved: string[];
  onProfileView: () => void;
  onReveal: (candidate: Candidate) => void;
  reveals: string[];
  onIntroduction: (c: Candidate) => void;
}) {
  return (
    <div className="group rounded-2xl text-slate-100 text-sm overflow-hidden border border-ash shadow-sm">
      {/* top */}
      <div className="relative bg-ink/95 text-white p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{c.title}</p>

          <div
            className={`flex items-center gap-1 transition-opacity duration-150 focus-within:opacity-100 group-hover:opacity-100 ${
              saved.includes(c.id) ? "opacity-100" : "opacity-0"
            } ${c.specialist ? "mr-8" : ""}`}
          >
            <button
              onClick={() => {
                onSave(c.id);
              }}
              className="cursor-pointer rounded-md p-1.5 hover:bg-white/15"
            >
              <LuBookmark
                className={`h-3.5 w-3.5 ${saved.includes(c.id) ? "fill-blue-500" : ""}`}
              />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-200">{c.code}</p>

        <div className="flex text-[.7rem] justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="peer h-3.5 w-3.5 shrink-0 cursor-pointer appearance-none rounded border border-gray-400 bg-transparent bg-center bg-no-repeat transition-colors hover:border-gray-300 checked:border-forest checked:bg-forest checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3.5%208.5l3%203%206-6.5%22%2F%3E%3C%2Fsvg%3E')] checked:bg-[length:80%] focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              onClick={() => onCompare(c.id)}
            />
            <p>Compare</p>
          </label>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-500" />
            <p>{c.activeAgo}</p>
          </div>
        </div>

        {c.specialist && (
          <div className="absolute bg-highlight p-2 right-0 rounded-bl-sm rounded-tl-sm">
            <TiStarOutline />
          </div>
        )}
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

        <Divider />

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

        <Divider />

        <div>
          <Item name="Credential" val={c.credential} />
        </div>

        <div className="flex items-center gap-4 font-semibold">
          <button
            className="px-3 w-full p-2 rounded-lg border border-ash "
            onClick={onProfileView}
          >
            View profile
          </button>
          {c.specialist ? (
            <button
              className="px-3 w-full p-2 rounded-lg bg-highlight text-white cursor-pointer"
              onClick={() => onIntroduction(c)}
            >
              Request
            </button>
          ) : (
            <button
              className={`px-3 w-full p-2 rounded-lg ${reveals.includes(c.id) ? "border-ash border text-ink-soft" : "bg-forest text-white"}`}
              onClick={() => onReveal(c)}
            >
              {reveals.includes(c.id) ? "Revealed" : "Reveal"}
            </button>
          )}
        </div>

        <div className="flex gap-1 items-center justify-end text-[.6rem] text-forest">
          <IoMdCheckmark />
          <p>
            Confirmed {c.confirmedDays} {c.confirmedDays > 1 ? "days" : "day"}{" "}
            ago
          </p>
        </div>
      </div>
    </div>
  );
}
