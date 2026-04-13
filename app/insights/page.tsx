import React from "react";
import InsightsHero from "./components/Hero";
import TalentIndex from "./components/TalentIndex";
import InsightsGrid from "./components/Insights";

export default function page() {
  return (
    <div>
      <InsightsHero />
      <TalentIndex/>
      <InsightsGrid/>
    </div>
  );
}
