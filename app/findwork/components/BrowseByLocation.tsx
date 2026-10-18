"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  CITIES,
  FEATURED_CITY_SLUGS,
  getCity,
  hrefForCity,
  type City,
  type Profession,
  type Specialty,
} from "@/app/data/findwork";

export interface BrowseByLocationProps {
  heading?: string;
  subheading?: string;
  /** Optional context — carried into every city link, so a profession page can
   *  link to /roles/{cluster}/{profession}/city/{city} where that page exists. */
  profession?: Profession | null;
  specialties?: Specialty[];
  /** Override how a city resolves to a URL. Defaults to hrefForCity(). */
  buildHref?: (city: City) => string;
}

const cityLink =
  "text-ink no-underline transition-colors duration-150 hover:text-[#2D5016]";

export default function BrowseByLocation({
  heading = "Browse by location",
  subheading = "Where are you looking?",
  profession = null,
  specialties = [],
  buildHref,
}: BrowseByLocationProps) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const hrefFor = (c: City) =>
    buildHref ? buildHref(c) : hrefForCity(c, { profession, specialties });

  const searching = query.trim().length >= 2;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searching
      ? CITIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8)
      : [];
  }, [query, searching]);

  const featured = useMemo(
    () =>
      FEATURED_CITY_SLUGS.map((s) => getCity(s)).filter(
        (c): c is City => c != null,
      ),
    [],
  );

  // A–Z index of every city
  const index = useMemo(() => {
    const map = new Map<string, City[]>();
    [...CITIES]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((c) => {
        const L = c.name[0].toUpperCase();
        map.set(L, [...(map.get(L) || []), c]);
      });
    return Array.from(map.entries());
  }, []);

  const linkBtn =
    "mt-4 inline-block cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-[#2D5016] hover:underline";

  return (
    <section className="mx-auto max-w-280 px-5 py-11 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:py-14">
      <h2 className="mb-1.5 font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-ink">
        {heading}
      </h2>
      <p className="mb-4.5 text-[13.5px] text-[#8a8a84]">{subheading}</p>

      <div className="relative">
        <div className="relative mb-5 max-w-none min-[860px]:max-w-105">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cities (e.g. Toronto, Ottawa)"
            autoComplete="off"
            aria-label="Search cities"
            className="w-full rounded-[10px] border border-[#e5e2da] bg-white px-4 py-3 font-['DM_Sans',sans-serif] text-[14px] text-ink transition-colors placeholder:text-[#8a8a84] focus:border-[#2D5016] focus:outline-none"
          />
          {searching && (
            <div className="absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-85 overflow-y-auto rounded-[10px] border border-[#e5e2da] bg-white shadow-[0_12px_32px_rgba(20,30,15,0.10)]">
              {results.length ? (
                results.map((c) => (
                  <Link
                    key={c.slug}
                    href={hrefFor(c)}
                    className="flex items-center justify-between gap-2.5 border-b border-[#e5e2da] px-4 py-2.75 text-[13.5px] no-underline last:border-b-0 hover:bg-[#faf9f6]"
                  >
                    <span className="font-medium text-ink">{c.name}</span>
                    <span className="text-[11.5px] text-[#8a8a84]">Ontario</span>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3.5 text-[13px] text-[#8a8a84]">
                  No matches — try a different term.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Curated view */}
        {!searching && !showAll && (
          <>
            <div className="grid grid-cols-1 gap-x-10 gap-y-3 min-[861px]:grid-cols-2">
              {featured.map((c) => (
                <Link
                  key={c.slug}
                  href={hrefFor(c)}
                  className={`${cityLink} border-b border-[#e5e2da] py-2 text-[14.5px]`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <button type="button" onClick={() => setShowAll(true)} className={linkBtn}>
              View all locations →
            </button>
          </>
        )}

        {/* Full A–Z index */}
        {!searching && showAll && (
          <>
            <div>
              {index.map(([letter, cities]) => (
                <div
                  key={letter}
                  className="flex items-baseline gap-5 border-b border-[#e5e2da] py-2.5 max-[460px]:flex-col max-[460px]:gap-1.5"
                >
                  <span className="shrink-0 basis-5.5 font-['Cormorant_Garamond',serif] text-[17px] font-semibold text-[#2D5016]">
                    {letter}
                  </span>
                  <div className="flex flex-wrap gap-x-5.5 gap-y-1.5">
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={hrefFor(c)}
                        className={`${cityLink} text-[13.5px]`}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setShowAll(false)} className={linkBtn}>
              Show fewer
            </button>
          </>
        )}
      </div>
    </section>
  );
}