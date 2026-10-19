import React from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoBuildOutline } from "react-icons/io5";
import AddressAutocomplete from "@/app/components/AutoComplete";

export default function QueryBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
 <section className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-end">
  <div className="grid w-full min-w-0 grid-cols-1 items-center gap-4 border-b border-ash px-3 py-3 text-sm transition-all focus-within:border-forest sm:px-4 lg:flex-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-5">
    {/* Search */}
    <div className="relative min-w-0 w-full">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />

      <input
        className="w-full min-w-0 border-none bg-transparent pl-8 outline-none"
        placeholder="Search by profession, clinical experience, skill..."
        value={query}
        onChange={setQuery}
      />
    </div>

    {/* Help and location */}
    <div className="hidden md:flex min-w-0 flex-wrap items-center gap-3 sm:gap-5">
      <button className="flex shrink-0 items-center gap-1 rounded-full border border-ash px-2 py-1 text-ink-soft">
        <FaRegCircleQuestion />
        <p className="text-xs font-semibold">Help</p>
      </button>

      <div className="h-5 w-px shrink-0 bg-ash" />

      <div className="min-w-0 flex-1">
        <AddressAutocomplete />
      </div>
    </div>
  </div>

  {/* Build button */}
  <div className="hidden md:block w-full shrink-0 lg:w-auto">
    <button className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-light px-4 py-3 text-xs font-semibold sm:w-auto lg:py-2">
      <IoBuildOutline />
      <p>Build from job description</p>
    </button>
  </div>
</section>
  );
}
