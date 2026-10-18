import React from "react";
import FindWorkHero from "./components/Hero";
import BrowseByProfession from "./components/BrowseByProfession";
import BrowseByLocation from "./components/BrowseByLocation";
import ContextCtaBand from "../components/ContextCtaBand";
import OpportunitiesSection from "./components/OpportunitiesSection";
import { OPPORTUNITIES } from "../data/findwork";
export default function FindWorkPage() {
  return (
    <div>
      <FindWorkHero />
      <BrowseByProfession />
      <BrowseByLocation />
      <div className="mx-auto max-w-280 px-5 py-11 font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:py-14">
        <OpportunitiesSection opps={OPPORTUNITIES} treatment="market" />
      </div>
    </div>
  );
}
