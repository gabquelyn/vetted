"use client"
import React, { useMemo, useState } from "react";
import Link from "next/link";
/** Data + routing helpers live in @/app/data/findwork (real URL paths). */
import {
  CLUSTERS,
  FILTER_CATEGORIES,
  FEATURED_PROFESSION_SLUGS,
  PRESENTATION_GROUPS,
  getProfession,
  professionsInCluster,
  professionLabel,
  searchProfessions,
  buildDestination,
  hrefForSearchEntry,
  Profession,
  City,
} from "@/app/data/findwork";

export interface BrowseByProfessionProps {
  heading?: string;
  subheading?: string;
  /** Optional city context — carried into every profession link and search result. */
  city?: City;
  /**
   * Resolves a profession to its page URL. Defaults to buildDestination(), which
   * returns real paths: /roles/{cluster}/{profession}[/city/{city}]. Only seeded
   * combinations exist as pages (see app/roles/.../page.tsx); others 404.
   */
  buildHref?: (profession: Profession, city?: City) => string;
}

const defaultBuildHref = (profession: Profession, city?: City) =>
  buildDestination({ profession, specialties: [], city });

/* ---------- small pieces ---------- */

function ProfessionRow({
  profession,
  href,
}: {
  profession: Profession;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 border-b border-[#e5e2da] px-0.5 py-2.75 text-[14.5px] text-[#1a1a18] no-underline transition-[padding,color] duration-150 hover:pl-1.5 hover:text-[#2D5016]"
    >
      <span className="transition-colors duration-150 group-hover:text-[#2D5016]">
        {profession.name}
      </span>
      <span
        className="text-[#8a8a84] transition-colors group-hover:text-[#2D5016]"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}

function GroupRow({
  group,
  hrefFor,
}: {
  group: (typeof PRESENTATION_GROUPS)[number];
  hrefFor: (p: Profession) => string;
}) {
  const [open, setOpen] = useState(false);
  const children = group.childSlugs.map(getProfession).filter(Boolean);
  const panelId = `group-children-${group.key}`;

  return (
    <div className="col-span-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 border-0 border-b border-[#e5e2da] bg-transparent px-0.5 py-2.75 text-left text-[14.5px] text-[#1a1a18] transition-[padding,color] duration-150 hover:pl-1.5 hover:text-[#2D5016]"
      >
        <span>{group.label}</span>
        <span
          className={`text-[15px] text-[#5c5c58] transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          ›
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          className="flex flex-col gap-0.5 pb-2.5 pl-4 pr-0.5 pt-1.5"
        >
          {children
            .filter(
              (r: Profession | null | undefined): r is Profession => r != null,
            )
            .map((p) => (
              <Link
                key={p?.slug}
                href={hrefFor(p)}
                className="py-1.25 text-[13.5px] text-[#5c5c58] no-underline hover:text-[#2D5016]"
              >
                {p?.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

/* ---------- main component ---------- */

export default function BrowseByProfession({
  heading = "Browse by profession",
  subheading = "What kind of work do you do?",
  city = undefined,
  buildHref = defaultBuildHref,
}: BrowseByProfessionProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const hrefFor = (p: Profession) => buildHref(p, city);

  const searching = query.trim().length >= 2;
  const results = useMemo(
    () => (searching ? searchProfessions(query) : []),
    [query, searching],
  );

  const activeCategory =
    FILTER_CATEGORIES.find((f) => f.key === filter) || FILTER_CATEGORIES[0];
  const showFull = filter !== "all" || expanded;

  // Curated list: FEATURED_PROFESSION_SLUGS, with the marker replaced by the
  // Medical Imaging / Laboratory presentation groups.
  const curatedItems = useMemo(() => {
    const items: Array<
      | { kind: "profession"; profession: Profession }
      | { kind: "group"; group: (typeof PRESENTATION_GROUPS)[number] }
    > = [];
    FEATURED_PROFESSION_SLUGS.forEach((slug) => {
      if (slug === "__PRESENTATION_GROUPS__") {
        PRESENTATION_GROUPS.forEach((group) =>
          items.push({ kind: "group", group }),
        );
        return;
      }
      const profession = getProfession(slug);
      if (profession) items.push({ kind: "profession", profession });
    });
    return items;
  }, []);

  const visibleClusters = CLUSTERS.filter(
    (c) => !activeCategory.clusters || activeCategory.clusters.includes(c.slug),
  );

  return (
    <section className="mx-auto max-w-280 px-5 py-11 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:py-14">
      <h2 className="mb-1.5 font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-[#1a1a18]">
        {heading}
      </h2>
      <p className="mb-4.5 text-[13.5px] text-[#8a8a84]">{subheading}</p>

      <div className="relative">
        {/* Search */}
        <div className="relative mb-4 max-w-none min-[860px]:max-w-105">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search professions (e.g. RN, PSW, physio)"
            autoComplete="off"
            aria-label="Search professions"
            className="w-full rounded-[10px] border border-[#e5e2da] bg-white px-4 py-3 font-['DM_Sans',sans-serif] text-[14px] text-[#1a1a18] transition-colors placeholder:text-[#8a8a84] focus:border-[#2D5016] focus:outline-none"
          />
          {searching && (
            <div className="absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-85 overflow-y-auto rounded-[10px] border border-[#e5e2da] bg-white shadow-[0_12px_32px_rgba(20,30,15,0.10)]">
              {results.length ? (
                results.map((r, i: number) => (
                  <Link
                    key={`${r.type}-${r.professionSlug}-${r.specialtySlug ?? ""}-${i}`}
                    href={hrefForSearchEntry(r, { city })}
                    className="flex items-center justify-between gap-2.5 border-b border-[#e5e2da] px-4 py-2.75 text-[13.5px] no-underline last:border-b-0 hover:bg-[#faf9f6]"
                  >
                    <span className="font-medium text-[#1a1a18]">
                      {r.label}
                    </span>
                    <span className="text-[11.5px] text-[#8a8a84]">
                      {r.kind} · {r.context}
                    </span>
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

        {/* Category filter */}
        {!searching && (
          <div
            className="mb-5.5 flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Profession categories"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const on = cat.key === filter;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setFilter(cat.key)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.75 text-[12.5px] font-semibold transition-colors duration-150 ${
                    on
                      ? "border-[#2D5016] bg-[#2D5016] text-white"
                      : "border-[#e5e2da] bg-transparent text-[#5c5c58] hover:border-[#2D5016] hover:text-[#2D5016]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Curated (default) view */}
        {!searching && !showFull && (
          <>
            <div className="grid grid-cols-1 gap-x-10 min-[860px]:grid-cols-2">
              {curatedItems.map((item) =>
                item.kind === "group" ? (
                  <GroupRow
                    key={item.group.key}
                    group={item.group}
                    hrefFor={hrefFor}
                  />
                ) : (
                  <ProfessionRow
                    key={item.profession.slug}
                    profession={item.profession}
                    href={hrefFor(item.profession)}
                  />
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-4 inline-block cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-[#2D5016] hover:underline"
            >
              View all professions →
            </button>
          </>
        )}

        {/* Full view: every profession, grouped by cluster */}
        {!searching && showFull && (
          <>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 min-[860px]:grid-cols-2 min-[860px]:gap-y-9">
              {visibleClusters.map((cluster) => {
                const professions = professionsInCluster(cluster.slug);
                if (!professions.length) return null;
                return (
                  <div key={cluster.slug} data-cluster-block={cluster.slug}>
                    <div className="mb-1 border-b border-[#e5e2da] pb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#8a8a84]">
                      {cluster.name}
                    </div>
                    <div className="block">
                      {professions.map((p) => (
                        <ProfessionRow
                          key={p.slug}
                          profession={p}
                          href={hrefFor(p)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {filter === "all" && expanded && (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="mt-4 inline-block cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-[#2D5016] hover:underline"
              >
                Show fewer
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}