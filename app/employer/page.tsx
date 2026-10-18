import React from "react";

import PricingSection from "./components/PricingSection";
import FAQSection from "./components/Faq";
import RegistryHiringOptions from "./components/RegistryHiringOptions";
import EmployerWorkspace from "./components/EmployerWorkspace";
import Hero from "./components/Hero";

export default function EmployerPage() {
  return (
    <div>
      <Hero />
      <RegistryHiringOptions/>
      <EmployerWorkspace/>
      <PricingSection />
      <FAQSection />
    </div>
  );
}
