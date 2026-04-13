import React from "react";
import EmployerHero from "./components/EmployerHero";
import TrustBar from "../components/TrustBar";
import ProblemSection from "./components/ProblemSection";
import HowItWorks from "./components/HowItWorks";
import SectionDivider from "../components/SectionDivider";
import FoundationSection from "./components/Foundation";
import ShortNoticeSection from "./components/ShortNoticeSection";
import PricingSection from "./components/PricingSection";
import FounderNote from "./components/FounderNote";
import EarlyAccessSection from "./components/EarlyAccessSection";
import DemoExplore from "./components/DemoExplore";
import FAQSection from "./components/Faq";

export default function EmployerPage() {
  return (
    <div>
      <EmployerHero />
      <TrustBar />
      <ProblemSection />
      <SectionDivider />
      <div className="-mt-5">
        <HowItWorks />
      </div>
      <FoundationSection/>
      <ShortNoticeSection/>
      <PricingSection/>
      <FounderNote/>
      <EarlyAccessSection/>
      <DemoExplore/>
      <FAQSection/>
    </div>
  );
}
