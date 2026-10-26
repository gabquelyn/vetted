import type { Step } from "react-joyride";

const target = (id: string) => `[data-tour="${id}"]`;

const resultSteps: Step[] = [
  {
    target: target("search"),
    title: "Search",
    content:
      "Search for healthcare experience, specialties, or skills to find relevant professionals.",
    placement: "bottom",
  },
  {
    target: target("filters"),
    title: "Filters",
    content:
      "Narrow your results using structured criteria to find professionals who fit your needs.",
    placement: "bottom",
  },
  {
    target: target("card-row"),
    title: "Candidate card",
    content:
      "Each card gives you a quick, preliminary view. Save or hide candidates as you review.",
    placement: "auto",
  },
  {
    target: target("first-card"),
    title: "View profile",
    content:
      "Open a candidate's full profile to review their experience, specialties, credentials, and practical fit.",
    placement: "right",
  },
  {
    target: target("compare"),
    title: "Compare",
    content: "Select Compare on candidates you want to evaluate side by side.",
    placement: "bottom",
  },
];

const pinnedResultSteps: Step[] = [
  {
    target: target("filters-heading"),
    title: "Your filters",
    content:
      "Your structured filters are open here. Adjust them to refine the candidate list.",
    placement: "right",
  },
];

function createProfileSteps(revealedList = false): Step[] {
  return [
    {
      target: target("profile-back"),
      title: "Back to results",
      content: revealedList
        ? "Return to your Revealed Professionals list whenever you need to."
        : "Return to your candidate list. Your search and filters can stay as you left them.",
      placement: "top",
    },
    {
      target: target("profile-pane"),
      title: "Profile overview",
      content:
        "Review the candidate's experience, specialties, credentials, and practical-fit information.",
      placement: "auto",
    },
    {
      target: target("profile-reveal"),
      title: "Reveal",
      content:
        "Reveal gives you access to this candidate's revealed information and contact pathway.",
      placement: "left",
      spotlightTarget: target("profile-reveal"),
    },
    {
      target: target("profile-actions"),
      title: "Profile actions",
      content: "Save, compare, or hide this candidate from here.",
      placement: "bottom",
    },
  ];
}

export type VettedTourSurface =
  | "results"
  | "results-pinned"
  | "profile"
  | "profile-revealed";

export const VETTED_TOUR_STEPS: Record<VettedTourSurface, Step[]> = {
  results: resultSteps,
  "results-pinned": pinnedResultSteps,
  profile: createProfileSteps(false),
  "profile-revealed": createProfileSteps(true),
};
