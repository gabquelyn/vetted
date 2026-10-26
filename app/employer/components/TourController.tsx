"use client";

import { useEffect, useState } from "react";
import { VettedTour } from "./VettedTour";
import type { VettedTourSurface } from "./TourSteps";
import { useMediaQuery } from "./Filtering";

export type ActiveView =
  | "compare"
  | "requests"
  | "registry"
  | "directory"
  | "saved"
  | "searches"
  | "recent"
  | "reveals"
  | "urgent"
  | "hidden";

type TourControllerProps = {
  activeView: ActiveView;
  condition: boolean;
  surface?: VettedTourSurface;
};

const STORAGE_PREFIX = "vetted:tour-completed:";
const RESTART_EVENT = "vetted:tour-restart";

function isTourCompleted(surface: VettedTourSurface): boolean {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${surface}`) === "true";
  } catch {
    return false;
  }
}

/**
 * Restart every tour, even ones completed before.
 * Call from anywhere (e.g. a "Replay tours" button): restartTour()
 */
export function restartTour() {
  try {
    // Iterate backwards because removing keys shifts indexes.
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Storage may be unavailable; the event below still restarts the mounted tour.
  }

  window.dispatchEvent(new Event(RESTART_EVENT));
}

export function TourController({
  activeView,
  condition,
  surface,
}: TourControllerProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <TourControllerForSurface
      key={`${activeView}-${surface ?? "none"}`}
      activeView={activeView}
      condition={condition}
      surface={surface}
      isMobile={isMobile}
    />
  );
}

function TourControllerForSurface({
  activeView,
  condition,
  surface = "results",
  isMobile,
}: TourControllerProps & { isMobile: boolean }) {
  const [completed, setCompleted] = useState(() =>
    surface ? isTourCompleted(surface) : false,
  );
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    function handleRestart() {
      setCompleted(false);
      setRunId((id) => id + 1);
    }

    window.addEventListener(RESTART_EVENT, handleRestart);
    return () => window.removeEventListener(RESTART_EVENT, handleRestart);
  }, []);

  if (!surface) return null;

  const run = condition && !isMobile && !completed;

  function handleTourEnd() {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${surface}`, "true");
    } catch {
      // Storage may be unavailable.
    }

    setCompleted(true);
  }

  return (
    <VettedTour
      key={`${activeView}-${surface}-${runId}`}
      surface={surface}
      run={run}
      onTourEnd={handleTourEnd}
    />
  );
}
