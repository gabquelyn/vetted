"use client";

import { Joyride } from "react-joyride";
import type { Step } from "react-joyride";
import { VETTED_TOUR_STEPS, type VettedTourSurface } from "./TourSteps";

type VettedTourProps = {
  surface: VettedTourSurface;
  run?: boolean;
  steps?: Step[];
  onTourEnd?: () => void;
};

export function VettedTour({
  surface,
  run = false,
  steps,
  onTourEnd,
}: VettedTourProps) {
  return (
    <Joyride
      run={run}
      steps={steps ?? VETTED_TOUR_STEPS[surface]}
      continuous
      //   showProgress
      onEvent={(event) => {
        if (event.type === "tour:end") {
          onTourEnd?.();
        }
      }}
      options={{
        primaryColor: "#3a5d23",
        backgroundColor: "#fffdf8",
        textColor: "#3d3d39",
        zIndex: 9999,
        arrowColor: "#fffdf8",
        overlayColor: "rgba(28, 28, 20, 0.48)",
        spotlightPadding: 7,
        scrollDuration: 300,
        scrollOffset: 80,
        buttons: ["skip", "back", "close", "primary"],
      }}
      styles={{
        tooltip: {
          border: "1px solid #ece7da",
          borderRadius: 14,
          padding: 16,
          boxShadow: "0 16px 40px rgba(28, 28, 20, 0.12)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          maxWidth: 340,
        },
        tooltipTitle: {
          color: "#252820",
          fontFamily: "var(--font-serif), serif",
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.3,
          paddingRight: 20,
          marginBottom: 4,
        },
        tooltipContent: {
          color: "#55574e",
          fontSize: 12,
          lineHeight: 1.65,
          padding: "6px 0 12px",
        },
        buttonPrimary: {
          borderRadius: 7,
          backgroundColor: "#3a5d23",
          color: "#fffdf8",
          fontSize: 12,
          fontWeight: 600,
          padding: "8px 13px",
          marginLeft: 6,
        },
        buttonBack: {
          color: "#55574e",
          fontSize: 11,
          padding: "7px 9px",
          marginRight: 2,
        },
        buttonSkip: {
          color: "#8a8a84",
          fontSize: 11,
          padding: "7px 8px",
          marginRight: 2,
        },
        buttonClose: {
          color: "#8a8a84",
          padding: "10px",
         
        },
      }}
    />
  );
}
