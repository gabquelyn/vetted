import React from "react";
import HeroSection from "./components/HeroSection";
import JoinForm from "./components/JoinForm";
import HowItWorks from "./components/HowItWorks";
import TrustBar from "../components/TrustBar";

export default function JoinPage() {
  return (
    <div className="">
      <HeroSection>
        <JoinForm/>
      </HeroSection>
      <TrustBar/>
      <HowItWorks/>
    </div>
  );
}
