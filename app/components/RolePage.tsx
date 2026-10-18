"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Your existing components (same props as in the original file).
import Breadcrumbs from "../findwork/components/BreadCrumbs";
import FaqBlock from "../findwork/components/FaqBlock";
import OpportunitiesSection from "../findwork/components/OpportunitiesSection";
import ContextCtaBand from "./ContextCtaBand";

import {
  CITIES,
  FEATURED_CITY_SLUGS,
  getCity,
  getProfession,
  findSpecialty,
  buildDestination,
  professionLabel,
} from "@/app/data/findwork";
import type { Specialty, City } from "@/app/data/findwork";
import {
  computeCta,
  computeEmptyCtx,
  opportunitiesForContext,
  relatedLocations,
  roleCopy,
  specialtyLocations,
} from "@/app/data/findworkPages";
import type { RouteKind } from "@/app/data/findworkPages";
import type { FaqItem } from "@/app/data/findworkFaqs";

export interface RolePageProps {
  kind: RouteKind;
  professionSlug: string;
  /** Set on permanent specialty / specialty-city pages. */
  specialtySlug?: string | null;
  /** Set on permanent profession-city / specialty-city pages. */
  citySlug?: string | null;
  faqs: FaqItem[] | null;
}

interface ViewProps extends RolePageProps {
  /** Selected areas of practice (query-state on the base page, fixed on permanent pages). */
  specialtySlugs: string[];
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export default function RolePage(props: RolePageProps) {
  const fixedSpecs = props.specialtySlug ? [props.specialtySlug] : [];

  // Permanent pages: everything comes from the URL path, no search params needed.
  if (props.kind !== "profession") {
    return <RolePageView {...props} specialtySlugs={fixedSpecs} />;
  }

  // Base profession page: specialty / location live in the query string
  // (?specialty=a,b&location=c). The static HTML is the no-query version;
  // the query-aware version takes over on the client.
  return (
    <Suspense fallback={<RolePageView {...props} specialtySlugs={[]} />}>
      <QueryAwareRolePage {...props} />
    </Suspense>
  );
}

function QueryAwareRolePage(props: RolePageProps) {
  const sp = useSearchParams();
  const specialtySlugs = (sp.get("specialty") || "").split(",").filter(Boolean);
  const loc = sp.get("location");
  const citySlug = loc && getCity(loc) ? loc : null;
  return (
    <RolePageView
      {...props}
      citySlug={citySlug}
      specialtySlugs={specialtySlugs}
    />
  );
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

function RolePageView({
  kind,
  professionSlug,
  citySlug,
  specialtySlugs,
  faqs,
}: ViewProps) {
  const router = useRouter();

  const profession = getProfession(professionSlug);
  if (!profession) return null; // validated on the server; defensive only

  const city: City | null = citySlug ? getCity(citySlug) : null;
  const specialties = specialtySlugs
    .map((s) => findSpecialty(profession, s))
    .filter((s): s is Specialty => !!s);
  const permanentSpecialty =
    (kind === "specialty" || kind === "specialty-city") && specialties.length
      ? specialties[0]
      : null;

  const copy = roleCopy(kind, profession, permanentSpecialty, city);
  const profBase = `/roles/${profession.cluster}/${profession.slug}`;

  const showsFullSpecialtySelector =
    (kind === "profession" || kind === "profession-city") &&
    profession.specialties &&
    profession.specialties.length > 0;
  const narrow = kind === "specialty" || kind === "specialty-city";

  const opps = opportunitiesForContext(
    profession.slug,
    city ? city.slug : null,
    specialties.map((s) => s.slug),
  );
  const emptyCtx = computeEmptyCtx({ profession, specialties, city });
  const cta = computeCta({ profession, specialties, city });

  const related =
    kind === "specialty" ||
    kind === "specialty-city" ||
    kind === "profession-city"
      ? relatedLocations(profession, permanentSpecialty, city)
      : null;
  const specialtyByLocation =
    kind === "specialty" && permanentSpecialty
      ? specialtyLocations(profession, permanentSpecialty)
      : null;

  const shell = `mx-auto px-5 pt-28 pb-2 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:pt-28 ${
    narrow ? "max-w-[640px]" : "max-w-[880px]"
  }`;
  const sectionHead =
    "mb-[6px] font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-ink";

  function toggleSpecialty(slug: string) {
    const next = specialtySlugs.includes(slug)
      ? specialtySlugs.filter((s) => s !== slug)
      : [...specialtySlugs, slug];
    const nextSpecs = next
      .map((s) => findSpecialty(profession!, s))
      .filter((s): s is Specialty => !!s);
    router.push(buildDestination({ profession, specialties: nextSpecs, city }));
  }
  function chooseCity(slug: string) {
    const picked = getCity(slug);
    if (picked)
      router.push(buildDestination({ profession, specialties, city: picked }));
  }

  return (
    <>
      <div className={shell}>
        <Breadcrumbs items={copy.crumbs} />

        <h1 className="font-['Cormorant_Garamond',serif] pt-8 text-[clamp(30px,4vw,42px)] font-semibold leading-[1.14] text-ink">
          {copy.h1}
        </h1>
        <p className="mt-3.5 max-w-160 text-[16px] font-light leading-[1.55] text-[#5c5c58]">
          {copy.intro}
        </p>

        {showsFullSpecialtySelector && (
          <section className="mt-12">
            <h2 className={sectionHead}>Areas of practice</h2>
            <p className="mb-4.5 text-[13.5px] text-[#8a8a84]">
              Select the areas that reflect your experience.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {profession.specialties?.map((s) => {
                const on = specialtySlugs.includes(s.slug);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleSpecialty(s.slug)}
                    className={`cursor-pointer rounded-full border-[1.5px] px-4 py-2.25 font-['DM_Sans',sans-serif] text-[13px] font-semibold transition-colors duration-150 ${
                      on
                        ? "border-transparent bg-[#2D5016] text-white"
                        : "border-transparent bg-[#e8f0e0] text-[#2D5016] hover:border-[#2D5016]"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {specialtyByLocation && (
          <section className="mt-12">
            <h2 className={sectionHead}>{specialtyByLocation.heading}</h2>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {specialtyByLocation.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full bg-[#e8f0e0] px-4 py-2.25 text-[13px] font-semibold text-[#2D5016] no-underline transition-colors duration-150 hover:bg-[#2D5016] hover:text-white"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <LocationPicker city={city} onSelect={chooseCity} />

        <div className="mt-12">
          <OpportunitiesSection
            opps={opps}
            emptyCtx={emptyCtx}
            joinCtx={{ profession, specialties, city }}
            treatment="market"
          />
        </div>

        {related && (
          <section className="mt-12">
            <h2 className={sectionHead}>{related.heading}</h2>
            <div className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-2.25 min-[460px]:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
              {related.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border-b border-[#e5e2da] py-1.5 text-[13.5px] text-ink no-underline transition-colors duration-150 hover:text-[#2D5016]"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <ContextCtaBand
        headline={cta.headline}
        body={cta.body}
        href={cta.href}
        buttonLabel={cta.buttonLabel}
      />

      <div className={shell}>
        {kind === "specialty-city" && permanentSpecialty && (
          <Link
            href={`${profBase}/specialty/${permanentSpecialty.slug}`}
            className="mt-4.5 block text-[13px] text-[#8a8a84] no-underline hover:text-[#2D5016]"
          >
            ← All {permanentSpecialty.short} {professionLabel(profession)}{" "}
            opportunities in Ontario
          </Link>
        )}
        {kind === "specialty" && (
          <Link
            href={profBase}
            className="mt-4.5 block text-[13px] text-[#8a8a84] no-underline hover:text-[#2D5016]"
          >
            ← All {profession.name} opportunities in Ontario
          </Link>
        )}
        {faqs && <FaqBlock items={faqs} />}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Preferred-location picker                                           */
/* ------------------------------------------------------------------ */

function LocationPicker({
  city,
  onSelect,
}: {
  city: City | null;
  onSelect: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const term = q.trim().toLowerCase();
  const matches: City[] =
    term.length < 2
      ? FEATURED_CITY_SLUGS.map(getCity).filter((c): c is City => !!c)
      : CITIES.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 8);

  return (
    <section className="mt-9">
      {!open && city && (
        <div className="text-[13.5px] text-[#5c5c58]">
          Preferred location:{" "}
          <b className="font-semibold text-ink">{city.name}</b>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-2 cursor-pointer border-0 bg-transparent p-0 text-[12.5px] font-semibold text-[#2D5016] hover:underline"
          >
            Change
          </button>
        </div>
      )}

      {!open && !city && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block cursor-pointer border-0 bg-transparent p-0 text-left font-['DM_Sans',sans-serif] text-[13.5px] leading-[1.6] text-[#5c5c58]"
        >
          Looking somewhere specific?
          <br />
          <span className="font-semibold text-[#2D5016]">
            Choose a preferred location ↓
          </span>
        </button>
      )}

      {open && (
        <div className="mt-[14px] max-w-[360px]">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Ontario cities"
            autoComplete="off"
            aria-label="Search Ontario cities"
            className="mb-3 w-full rounded-[9px] border border-[#e5e2da] bg-white px-[14px] py-[10px] font-['DM_Sans',sans-serif] text-[13.5px] text-ink focus:border-[#2D5016] focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {matches.length ? (
              matches.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => onSelect(c.slug)}
                  className="cursor-pointer rounded-full border-0 bg-[#e8f0e0] px-[14px] py-[7px] font-['DM_Sans',sans-serif] text-[12.5px] font-semibold text-[#2D5016] transition-colors duration-150 hover:bg-[#2D5016] hover:text-white"
                >
                  {c.name}
                </button>
              ))
            ) : (
              <div className="px-1 py-3.5 text-[13px] text-[#8a8a84]">
                No matches — try a different term.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
