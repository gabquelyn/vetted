import React from "react";

export default function CTA() {
  return (
    <div>
      <h2 className="mb-7 max-w-95 font-serif text-[clamp(27px,3vw,37px)] font-semibold leading-tight text-ink">
        One profile.{" "}
        <span className="font-semibold italic text-forest">
          Another way to be found.
        </span>
      </h2>
      <div className="pt-0.5">
        <div className="flex gap-4 border-t border-ash py-4.25 first:border-t-0 first:pt-0">
          <div className="w-4 shrink-0 pt-0.5 font-mono text-2.75 font-bold text-forest">
            01
          </div>
          <div>
            <h4 className="mb-0.75 text-sm font-bold text-ink">
              Be discoverable without constantly applying
            </h4>
            <p className="max-w-92.5 text-[12.5px] leading-[1.55] text-ink-soft">
              Your profile can surface when employers search for your
              profession, experience and preferences.
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-t border-ash py-4.25 first:border-t-0 first:pt-0">
          <div className="w-4 shrink-0 pt-0.5 font-mono text-2.75 font-bold text-forest">
            02
          </div>
          <div>
            <h4 className="mb-0.75 text-sm font-bold text-ink">
              Keep your identity protected while employers search
            </h4>
            <p className="max-w-92.5 text-[12.5px] leading-[1.55] text-ink-soft">
              Your name and contact information are shared only once an employer
              completes a Reveal on your profile.
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-t border-ash py-4.25 first:border-t-0 first:pt-0">
          <div className="w-4 shrink-0 pt-0.5 font-mono text-2.75 font-bold text-forest">
            03
          </div>
          <div>
            <h4 className="mb-0.75 text-sm font-bold text-ink">
              Choose how you want to be discoverable
            </h4>
            <p className="max-w-92.5 text-[12.5px] leading-[1.55] text-ink-soft">
              Join the Registry, the Directory, or both based on how open you
              are to opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
