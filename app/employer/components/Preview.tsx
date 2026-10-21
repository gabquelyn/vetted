import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import RevealedContact from "./RevealedContact";

export default function Preview({
  c,
  onViewProfile,
  onRemove,
  reveals,
  introduced,
  onIntroduction,
  onReveal,
}: {
  c: string;
  onViewProfile: () => void;
  onRemove?: () => void;
  reveals: string[];
  introduced: string[];
  onIntroduction: (c: Candidate) => void;
  onReveal: (c: Candidate) => void;
}) {
  const candidate = FULL_CANDIDATES.find((can) => can.id == c);
  const intro = introduced.includes(candidate?.id || "");
  const revealed = reveals.includes(candidate?.id || "");
  if (candidate)
    return (
      <div className="bg-white p-3 px-5 space-y-1 text-xs text-ink-soft rounded-lg border border-ash">
        {onRemove && (
          <button className="text-xs text-ink-soft flex justify-end">
            Remove
          </button>
        )}
        <p>{candidate.id}</p>
        <p className="font-semibold text-ink text-sm">{candidate.title}</p>
        <p>{candidate.summary}</p>

        <div>
          {revealed && (
            <RevealedContact
              values={[
                candidate.reveal.name,
                candidate.reveal.email,
                candidate.reveal.phone,
              ]}
              active={true}
            />
          )}
        </div>

        <div className="flex mt-2 flex-col md:flex-row items-center justify-between gap-2">
          <button
            className="px-3 w-full p-2 rounded-lg border border-ash "
            onClick={onViewProfile}
          >
            View profile
          </button>
          {candidate.specialist ? (
            <button
              className={`px-3 w-full p-2 rounded-lg ${intro ? "border border-highlight text-highlight" : "bg-highlight text-white"} cursor-pointer`}
              onClick={() => onIntroduction(candidate)}
              disabled={!!intro}
            >
              {intro ? "Requested" : "Request"}
            </button>
          ) : (
            <button
              className={`px-3 w-full p-2 rounded-lg ${revealed ? "border-forest border text-forest hover:bg-forest-light" : "bg-forest text-white"}`}
              onClick={() => onReveal(candidate)}
            >
              {revealed ? (
                <p className="text-forest flex items-center gap-2 justify-center">
                  <span>Revealed</span> <GiCheckMark />
                </p>
              ) : (
                "Reveal"
              )}
            </button>
          )}
        </div>
      </div>
    );
}
