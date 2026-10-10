import React from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoBuildOutline } from "react-icons/io5";
import AddressAutocomplete from "@/app/components/AutoComplete";

export default function QueryBar() {
  return (
    <section className="flex items-end gap-5 mb-3">
      <div className="w-300 border-b grid grid-cols-[60%_40%] text-sm items-center  border-b-ash  focus-within:border-b-forest transition-all py-3 px-4">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-1/2 text-ink-soft" />
          <input
            className="bg-transparent border-none outline-none w-full pl-8"
            placeholder="Search by profession, clinical experience, skill..."
          />
        </div>
        <div className="flex items-center gap-5">
          <button className="rounded-full border border-ash text-ink-soft py-1 px-2 flex items-center gap-1">
            <FaRegCircleQuestion />
            <p className="font-semibold text-xs">Help</p>
          </button>

          <div className="h-5 w-px bg-ash"></div>

          <AddressAutocomplete />
        </div>
      </div>
      <div className="shrink-0">
        <button className="flex gap-2 items-center bg-forest-light p-2 px-4 text-xs font-semibold rounded-full">
          <IoBuildOutline />
          <p>Build from job description</p>
        </button>
      </div>
    </section>
  );
}
