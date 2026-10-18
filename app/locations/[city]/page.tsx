import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Your existing components.
import Breadcrumbs from "@/app/findwork/components/BreadCrumbs";
import FaqBlock from "@/app/findwork/components/FaqBlock";
import OpportunitiesSection from "@/app/findwork/components/OpportunitiesSection";

import BrowseByProfession from "@/app/findwork/components/BrowseByProfession";
import ContextCtaBand from "@/app/components/ContextCtaBand";

import { CITIES, getCity, getProfession, buildDestination, buildJoinDestination } from "@/app/data/findwork";
import { computeCta, locationCopy, opportunitiesForContext } from "@/app/data/findworkPages";
import { faqsForLocation } from "@/app/data/findworkFaqs";

/** /locations/{city} — the "everything in this city" hub. Only the known cities exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const copy = locationCopy(city);
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: `/locations/${city.slug}` },
  };
}

const POPULAR_PROFESSIONS = ["registered-nurse", "registered-practical-nurse", "personal-support-worker"];

export default async function LocationHubPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const copy = locationCopy(city);
  const opps = opportunitiesForContext(null, city.slug, []);
  const emptyCtx = {
    headline: `No current opportunities in ${city.name} right now`,
    body: `Join Vetted so employers can find you when opportunities matching your profile become available.`,
    joinHref: buildJoinDestination({ city }),
    onward: { href: "/findwork", label: "See other professions on Find Work" },
  };
  const popular = POPULAR_PROFESSIONS.map(getProfession).filter((p): p is NonNullable<typeof p> => !!p);
  const cta = computeCta({ profession: null, specialties: [], city });
  const faqs = faqsForLocation(city);

  const shell =
    "mx-auto max-w-[880px] px-5 pt-28 pb-2 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:pt-28";

  return (
    <>
      <div className={shell}>
        <Breadcrumbs items={[{ label: "Find Work", href: "/findwork" }, { label: city.name }]} />
        <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(30px,4vw,42px)] font-semibold leading-[1.14] text-[#1a1a18]">
          {copy.h1}
        </h1>
        <p className="mt-3.5 max-w-160 text-[16px] font-light leading-[1.55] text-[#5c5c58]">{copy.intro}</p>

        <div className="mt-12">
          <OpportunitiesSection opps={opps} emptyCtx={emptyCtx} joinCtx={{ city }} treatment="full" />
        </div>

        <section className="mt-12">
          <h2 className="mb-1.5 font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-[#1a1a18]">
            Popular searches in {city.name}
          </h2>
          <div className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-2.5 min-[460px]:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
            {popular.map(p => (
              <Link
                key={p.slug}
                href={buildDestination({ profession: p, specialties: [], city })}
                className="border-b border-[#e5e2da] py-1.5 text-[13.5px] text-[#1a1a18] no-underline transition-colors duration-150 hover:text-[#2D5016]"
              >
                {p.name} jobs in {city.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Browse by profession, with this city carried into every link */}
      <BrowseByProfession city={city} />

      <ContextCtaBand headline={cta.headline} body={cta.body} href={cta.href} buttonLabel={cta.buttonLabel} />

      <div className={shell}>{faqs && <FaqBlock items={faqs} />}</div>
    </>
  );
}
