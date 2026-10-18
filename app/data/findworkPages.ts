/* ============================================================
   VETTED FIND WORK — PAGE HELPERS (pure functions, no HTML)
   Route resolution, static params, SEO copy, CTA / empty-state copy,
   opportunity filtering and related-link lists for the role and
   location pages. Everything here is plain data in / plain data out,
   so it works in server components, client components and generateMetadata.
   ============================================================ */
import {
  PROFESSIONS,
  OPPORTUNITIES,
  SEEDED_PROFESSION_CITY_PAGES,
  SEEDED_SPECIALTY_CITY_PAGES,
  INDEXABLE_SPECIALTY_PAGES,
  getProfession,
  getCity,
  getCluster,
  findSpecialty,
  professionLabel,
  buildDestination,
  buildJoinDestination,
  isSpecialtyPageIndexable,
  isProfessionCityIndexable,
  isProfessionCitySpecialtyIndexable,
} from "./findwork";
import type { Profession, City, Cluster, Specialty, Opportunity } from "./findwork";
import { SPECIALTY_INTRO } from "./findworkFaqs";

export type RouteKind = "profession" | "profession-city" | "specialty" | "specialty-city";

export interface RoleRoute {
  kind: RouteKind;
  cluster: Cluster;
  profession: Profession;
  specialty: Specialty | null;
  city: City | null;
}

/* ---------- route resolution (replaces the hash-router switch) ---------- */

/**
 * Resolves /roles/{cluster}/{profession}/...rest to a validated route, or null
 * (→ notFound()). Only seeded / approved combinations resolve; everything else
 * is a 404, exactly as in the original router.
 *
 *   rest = []                                → profession
 *   rest = ["city", c]                       → profession-city
 *   rest = ["specialty", s]                  → specialty
 *   rest = ["specialty", s, "city", c]       → specialty-city
 */
export function resolveRoleRoute(clusterSlug: string, profSlug: string, rest: string[] = []): RoleRoute | null {
  const cluster = getCluster(clusterSlug);
  const profession = getProfession(profSlug);
  if (!cluster || !profession || profession.cluster !== clusterSlug) return null;

  let specSlug: string | null = null;
  let citySlug: string | null = null;
  if (rest.length === 0) {
    /* base profession page */
  } else if (rest.length === 4 && rest[0] === "specialty" && rest[2] === "city") {
    specSlug = rest[1];
    citySlug = rest[3];
  } else if (rest.length === 2 && rest[0] === "specialty") {
    specSlug = rest[1];
  } else if (rest.length === 2 && rest[0] === "city") {
    citySlug = rest[1];
  } else {
    return null;
  }

  const specialty = specSlug ? findSpecialty(profession, specSlug) : null;
  if (specSlug && !specialty) return null;
  const city = citySlug ? getCity(citySlug) : null;
  if (citySlug && !city) return null;

  if (specialty && city) {
    return isProfessionCitySpecialtyIndexable(profession, specialty, city)
      ? { kind: "specialty-city", cluster, profession, specialty, city }
      : null;
  }
  if (specialty) {
    return isSpecialtyPageIndexable(profession.slug, specialty.slug)
      ? { kind: "specialty", cluster, profession, specialty, city: null }
      : null;
  }
  if (city) {
    return isProfessionCityIndexable(profession, city)
      ? { kind: "profession-city", cluster, profession, specialty: null, city }
      : null;
  }
  return { kind: "profession", cluster, profession, specialty: null, city: null };
}

/** Every permanent role URL, for generateStaticParams. */
export function roleStaticParams(): { cluster: string; profession: string; rest?: string[] }[] {
  const out: { cluster: string; profession: string; rest?: string[] }[] = [];
  PROFESSIONS.forEach(p => out.push({ cluster: p.cluster, profession: p.slug }));
  SEEDED_PROFESSION_CITY_PAGES.forEach(([p, c]) => {
    const prof = getProfession(p);
    if (prof) out.push({ cluster: prof.cluster, profession: p, rest: ["city", c] });
  });
  INDEXABLE_SPECIALTY_PAGES.forEach(([p, s]) => {
    const prof = getProfession(p);
    if (prof) out.push({ cluster: prof.cluster, profession: p, rest: ["specialty", s] });
  });
  SEEDED_SPECIALTY_CITY_PAGES.forEach(([p, s, c]) => {
    const prof = getProfession(p);
    if (prof) out.push({ cluster: prof.cluster, profession: p, rest: ["specialty", s, "city", c] });
  });
  return out;
}

/* ---------- SEO + page copy ---------- */

export interface RoleCopy {
  h1: string;
  intro: string;
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  canonical: string;
}

export function roleCopy(
  kind: RouteKind,
  profession: Profession,
  specialty: Specialty | null,
  city: City | null
): RoleCopy {
  const profBase = `/roles/${profession.cluster}/${profession.slug}`;
  const label = professionLabel(profession);
  const root = { label: "Find Work", href: "/findwork" };

  if (kind === "specialty-city" && specialty && city) {
    return {
      h1: `${specialty.short} ${label} Jobs in ${city.name}, Ontario`,
      intro: SPECIALTY_INTRO[specialty.slug] || `${profession.name}s with ${specialty.name.toLowerCase()} experience, discoverable to employers across Ontario.`,
      title: `${specialty.short} ${label} Jobs in ${city.name}, Ontario | Vetted`,
      description: `${specialty.short} ${profession.name.toLowerCase()} opportunities in ${city.name}, Ontario. Join the Vetted Registry so employers can find you.`.slice(0, 160),
      crumbs: [root, { label: profession.name, href: profBase }, { label: specialty.short, href: `${profBase}/specialty/${specialty.slug}` }, { label: city.name }],
      canonical: `${profBase}/specialty/${specialty.slug}/city/${city.slug}`,
    };
  }
  if (kind === "specialty" && specialty) {
    const intro = SPECIALTY_INTRO[specialty.slug] || `${profession.name}s with ${specialty.name.toLowerCase()} experience, discoverable to employers across Ontario.`;
    return {
      h1: `${specialty.short} ${label} Jobs in Ontario`,
      intro,
      title: `${specialty.short} ${label} Jobs in Ontario | Vetted`,
      description: (SPECIALTY_INTRO[specialty.slug] || `${profession.name} opportunities in this area of practice.`).slice(0, 160),
      crumbs: [root, { label: profession.name, href: profBase }, { label: specialty.short }],
      canonical: `${profBase}/specialty/${specialty.slug}`,
    };
  }
  if (kind === "profession-city" && city) {
    return {
      h1: `${profession.name} Jobs in ${city.name}, Ontario`,
      intro: profession.blurb,
      title: `${profession.name} Jobs in ${city.name}, Ontario | Vetted`,
      description: `${profession.name} opportunities in ${city.name}, Ontario. Join the Vetted Registry so employers can find you.`.slice(0, 160),
      crumbs: [root, { label: profession.name, href: profBase }, { label: city.name }],
      canonical: `${profBase}/city/${city.slug}`,
    };
  }
  return {
    h1: `${profession.name} Opportunities in Ontario`,
    intro: profession.blurb,
    title: `${profession.name} Jobs in Ontario | Vetted`,
    description: `${profession.blurb} Join the Vetted Registry so employers can find you.`.slice(0, 160),
    crumbs: [root, { label: profession.name }],
    canonical: profBase,
  };
}

/* ---------- query-state helpers (base profession page) ---------- */

export function parseSpecialtyList(profession: Profession, raw?: string | null): Specialty[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .map(slug => findSpecialty(profession, slug))
    .filter((s): s is Specialty => !!s);
}

/* ---------- opportunities ---------- */

export function opportunitiesForContext(
  profSlug: string | null,
  citySlug: string | null,
  specSlugs: string[]
): Opportunity[] {
  return OPPORTUNITIES.filter(o => {
    if (profSlug && o.profession !== profSlug) return false;
    if (citySlug && o.city !== citySlug) return false;
    if (specSlugs.length && !specSlugs.includes(o.specialty ?? "")) return false;
    return true;
  });
}

/* ---------- empty-state + CTA copy (plain text — React escapes it) ---------- */

export interface EmptyCtx {
  headline: string;
  body: string;
  joinHref: string;
  onward: { href: string; label: string };
}

export function computeEmptyCtx(args: {
  profession: Profession;
  specialties: Specialty[];
  city: City | null;
}): EmptyCtx {
  const { profession, city } = args;
  const specList = (args.specialties || []).filter(Boolean);
  let headline: string;
  let body: string;
  if (specList.length === 1) {
    const label = `${specList[0].short} ${professionLabel(profession)}`;
    headline = city ? `No current ${label} opportunities in ${city.name}` : `No current ${label} opportunities right now`;
    body = `Join the Vetted Registry and add ${specList[0].short} to your areas of practice so employers looking for ${profession.name.toLowerCase()}s with your background can find you.`;
  } else if (specList.length > 1) {
    headline = city
      ? `No current ${profession.name} opportunities matching your selected areas in ${city.name}`
      : `No current ${profession.name} opportunities matching your selected areas`;
    body = `Join Vetted so employers can find you when opportunities matching your profile become available.`;
  } else {
    headline = city ? `No current ${profession.name} opportunities in ${city.name}` : `No current ${profession.name} opportunities right now`;
    body = `Join Vetted so employers can find you when opportunities matching your profile become available.`;
  }
  const joinHref = buildJoinDestination({ profession, specialties: specList, city });
  let onward: { href: string; label: string };
  if (city) {
    onward = {
      href: buildDestination({ profession, specialties: specList.length === 1 ? specList : [], city: null }),
      label: specList.length === 1
        ? `Explore ${specList[0].short} opportunities in other Ontario locations`
        : `Explore ${professionLabel(profession)} opportunities in other Ontario locations`,
    };
  } else if (specList.length) {
    onward = { href: `/roles/${profession.cluster}/${profession.slug}`, label: `Explore other ${professionLabel(profession)} areas of practice` };
  } else {
    onward = { href: `/findwork/opportunities`, label: `See all current opportunities` };
  }
  return { headline, body, joinHref, onward };
}

export interface CtaCopy { headline: string; body: string; href: string; buttonLabel: string }

export function computeCta(args: {
  profession?: Profession | null;
  specialties?: Specialty[];
  city?: City | null;
}): CtaCopy {
  const profession = args.profession || null;
  const city = args.city || null;
  const specList = (args.specialties || []).filter(Boolean);
  const href = buildJoinDestination({ profession, specialties: specList, city });
  let body: string;
  if (profession && specList.length === 1) {
    body = `Add your ${specList[0].name} experience to your profile so employers looking for ${profession.name.toLowerCase()}s with your background can find you.`;
  } else if (profession && specList.length > 1) {
    body = `Add your experience in ${specList.map(s => s.short).join(", ")} to your profile so employers looking for your specific background can find you.`;
  } else if (profession && city) {
    body = `You've been looking at ${profession.name.toLowerCase()} opportunities in ${city.name}. Add your experience and preferences so employers there can find you.`;
  } else if (profession) {
    body = `You've been looking at ${profession.name.toLowerCase()} opportunities on Vetted. Add your experience, areas of practice and preferred locations so employers looking for your background can find you.`;
  } else if (city) {
    body = `You've been looking at opportunities in ${city.name}. Add your profession, experience and preferences so employers hiring there can find you.`;
  } else {
    body = `You've explored where Vetted is building healthcare opportunity coverage. Add your profession, experience, areas of practice and preferred locations so employers looking for your background can find you when relevant opportunities arise.`;
  }
  return { headline: "Join the Vetted Registry", body, href, buttonLabel: "Join the Registry →" };
}

/* ---------- related navigation ---------- */

export function seededCitySlugsForProfession(profSlug: string): string[] {
  return [...new Set(SEEDED_PROFESSION_CITY_PAGES.filter(([p]) => p === profSlug).map(([, c]) => c))];
}
export function seededCitySlugsForSpecialty(profSlug: string, specSlug: string): string[] {
  return [...new Set(SEEDED_SPECIALTY_CITY_PAGES.filter(([p, s]) => p === profSlug && s === specSlug).map(([, , c]) => c))];
}

export interface LinkItem { name: string; href: string }

/** "Opportunities in other locations" list (specialty, specialty-city, profession-city pages). */
export function relatedLocations(
  profession: Profession,
  specialty: Specialty | null,
  currentCity: City | null
): { heading: string; links: LinkItem[] } | null {
  const slugs = specialty
    ? seededCitySlugsForSpecialty(profession.slug, specialty.slug)
    : seededCitySlugsForProfession(profession.slug);
  const links = slugs
    .map(getCity)
    .filter((c): c is City => !!c)
    .filter(c => !currentCity || c.slug !== currentCity.slug)
    .slice(0, 6)
    .map(c => ({ name: c.name, href: buildDestination({ profession, specialties: specialty ? [specialty] : [], city: c }) }));
  if (!links.length) return null;
  return {
    heading: specialty ? `${specialty.short} opportunities in other locations` : `${profession.name} opportunities in other locations`,
    links,
  };
}

/** "Explore X opportunities by location" chips (Ontario-wide specialty page). */
export function specialtyLocations(profession: Profession, specialty: Specialty): { heading: string; links: LinkItem[] } | null {
  const links = seededCitySlugsForSpecialty(profession.slug, specialty.slug)
    .map(getCity)
    .filter((c): c is City => !!c)
    .map(c => ({ name: c.name, href: buildDestination({ profession, specialties: [specialty], city: c }) }));
  if (!links.length) return null;
  return {
    heading: `Explore ${specialty.short} ${professionLabel(profession)} opportunities by location`,
    links,
  };
}

/** Location hub metadata. */
export function locationCopy(city: City) {
  return {
    h1: `Healthcare opportunities in ${city.name}`,
    intro: `Find your profession below and add ${city.name} as a preferred location — whether or not you already live here.`,
    title: `Healthcare Jobs in ${city.name}, Ontario | Vetted`,
    description: `Find healthcare opportunities in ${city.name} across every profession Vetted covers. Join the Registry so local employers can find you.`,
  };
}
