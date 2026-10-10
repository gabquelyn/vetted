import React, { useState } from "react";

export default function Success() {
  const [successShareLabel, setSuccessShareLabel] = useState<React.ReactNode>(
    <>
      Share Vetted <span aria-hidden="true">→</span>
    </>,
  );
  const [successCopyLabel, setSuccessCopyLabel] = useState("Copy link");
  const PAGE_URL = window.location.href
  function shareVetted(
    setLabel: React.Dispatch<React.SetStateAction<React.ReactNode>>,
    original: React.ReactNode,
  ) {
    if (navigator.share) {
      navigator
        .share({
          title: "Vetted — Ontario Healthcare Talent Registry",
          url: PAGE_URL,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(PAGE_URL);
      setLabel("Link copied ✓");
      setTimeout(() => setLabel(original), 1800);
    }
  }
  function copyVettedLink(
    setLabel: React.Dispatch<React.SetStateAction<string>>,
    original: string,
  ) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PAGE_URL).then(() => {
        setLabel("Copied ✓");
        setTimeout(() => setLabel(original), 1800);
      });
    }
  }
  return (
    <div className="px-1.5 py-6 text-center">
      <div className="mx-auto mb-4 flex h-11.5 w-11.5 items-center justify-center rounded-full bg-forest-light text-xl text-forest">
        ✓
      </div>
      <h3 className="mb-2 font-serif text-[21px] font-semibold text-ink">
        You are on the list.
      </h3>
      <p className="mb-5 text-3.25 leading-[1.6] text-ink-soft">
        We have received your details. We wll be in touch when Vetted is live.
      </p>
      <div className="flex justify-center gap-5.5">
        <button
          type="button"
          onClick={() =>
            shareVetted(
              setSuccessShareLabel,
              <>
                Share Vetted <span aria-hidden="true">→</span>
              </>,
            )
          }
          className="inline-flex items-center gap-1.75 border-b-[1.5px] border-[rgba(45,80,22,0.35)] pb-0.5 text-[13.5px] font-bold text-forest transition-[border-color,color,opacity] duration-150 hover:border-forest"
        >
          {successShareLabel}
        </button>
        <button
          type="button"
          onClick={() => copyVettedLink(setSuccessCopyLabel, "Copy link")}
          className="inline-flex items-center gap-1.75 border-b border-ash pb-0.5 text-3.25 font-semibold text-ink-soft transition-[border-color,color,opacity] duration-150 hover:border-forest hover:text-forest"
        >
          {successCopyLabel}
        </button>
      </div>
    </div>
  );
}
