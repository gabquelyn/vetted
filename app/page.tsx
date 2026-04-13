import HeroSection from "./components/HeroSection";
import SectionDivider from "./components/SectionDivider";
import Teaser from "./components/Teaser";
import TrustBar from "./components/TrustBar";
import WhatSection from "./components/WhatSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <WhatSection />
      <SectionDivider fill="#3a3a36" />
      <div className="-mt-5">
        <Teaser />
      </div>
      
    </main>
  );
}
