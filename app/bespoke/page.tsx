import React from "react";
import HeroSection from "./components/Hero";
import Navigation from "../components/Navigation";
import Capabilities from "./components/Capabilities";
import Engage from "./components/Engage";

export default function page() {
  return (
    <div>
      <HeroSection />
      <Capabilities />
      <Engage />
    </div>
  );
}
