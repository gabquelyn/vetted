import HeroSection from "./components/HeroSection";
import TrustBar from "./components/TrustBar";
import WhatSection from "./components/WhatSection";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import Urgent from "./components/Urgent";
import WayIn from "./components/WayIn";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar
        items={[
          "30-Day Profile Review",
          "Last Confirmation Date Visible",
          "Structured Profiles Only",
          "Contact Professionals Directly",
        ]}
      />
      <WhatSection />
      <TrustBar
        items={[
          "Structured healthcare criteria",
          "Search beyond job titles",
          "Consistent candidate comparison",
        ]}
      />

      <Filters />
      <Urgent />
      <WayIn/>
    </main>
  );
}
