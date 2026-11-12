import React from "react";
import Link from "next/link";
import FindWorkHero from "./components/Hero";
import BrowseByProfession from "./components/BrowseByProfession";
import BrowseByLocation from "./components/BrowseByLocation";
import ContextCtaBand from "../components/ContextCtaBand";
import OpportunitiesSection from "./components/OpportunitiesSection";
import { OPPORTUNITIES } from "../data/findwork";

/*
 * Homepage supply preview: deliberate variety, not array-order sampling.
 * Each entry is a (profession slug, specialty slug | null) pair. Every city already
 * seeded for that market is pulled in. Editorial choice only; it does not change
 * routing or page approval.
 */
const HOMEPAGE_PREVIEW_MARKETS: [string, string | null][] = [
  ["nurse-practitioner", null],
  ["housekeeper", null],
  ["registered-social-worker", null],
  ["scheduling-coordinator", null],
  ["dietary-aide", null],
  ["developmental-services-worker", null],
  ["registered-nurse", "pacu"],
  ["registered-nurse", "labour-and-delivery"],
];

const liveOpps = OPPORTUNITIES.filter((o) => o.status === "live");
const buildingOpps = OPPORTUNITIES.filter((o) => o.status !== "live");
const curatedOpps = HOMEPAGE_PREVIEW_MARKETS.flatMap(([prof, spec]) =>
  buildingOpps.filter(
    (o) => o.profession === prof && (o.specialty ?? null) === spec,
  ),
);
const previewOpps = [...liveOpps, ...curatedOpps];

export default function FindWorkPage() {
  return (
    <div>
      <FindWorkHero />
      <BrowseByProfession />
      <BrowseByLocation />

      {/* Prototype #currentOppsSection: padding 32px 48px 20px (44px 20px under 860px) */}
      <div className="mx-auto max-w-280 px-5 py-11 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:pb-5 min-[860px]:pt-8">
        <OpportunitiesSection
          opps={previewOpps}
          treatment="homepage"
          flushTop
        />
        <Link
          href="/findwork/opportunities"
          className="mt-4 inline-block text-[13px] font-semibold leading-[normal] text-[#2D5016] hover:underline"
        >
          Explore all opportunities we&apos;re building for →
        </Link>
      </div>

      <ContextCtaBand tight />
    </div>
  );
}