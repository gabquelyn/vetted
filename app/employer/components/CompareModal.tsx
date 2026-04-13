import { DBWithCluster } from "@/app/data/candidate";
import CandidateCard from "./CandidateCard";
import { TfiClose } from "react-icons/tfi";

export default function CompareModal({
  ui,
  setUI,
}: {
  ui: UICompare;
  setUI: React.Dispatch<React.SetStateAction<UICompare>>;
}) {
  const candidates = ui.compare.map((id: string) =>
    DBWithCluster.find((c) => c.id === id),
  );

  const toggleFromComparison = (id: string) => {
    setUI(prev => ({...prev, compare: prev.compare.filter(p => p !== id)}))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="bg-cream p-12 rounded-2xl min-w-fit">
        <div className="flex justify-end">
          <button className= "cursor-pointer" onClick={() => setUI((s) => ({ ...s, compareOpen: false }))}>
            <TfiClose />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-2xl">Side-by-side comparison</p>
          <p className="text-ink-soft text-sm">
            Pre-reveal view. Full contact details, resume, and certifications
            unlocked after reveal.
          </p>
        </div>
        <div className="flex gap-2">
          {candidates.map((profile) => {
            if (profile)
              return (
                <CandidateCard
                  key={profile.id}
                  c={profile}
                  ui={ui}
                  toggleCompare={() => toggleFromComparison(profile.id)}
                  onUnlock={() => {}}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
}
