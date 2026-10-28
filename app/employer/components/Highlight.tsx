import React from "react";

export default function Highlight({
  text,
  terms,
}: {
  text: string;
  terms: string[];
}) {
  const matches = [
    ...new Set(terms.map((term) => term.trim()).filter(Boolean)),
  ].sort((a, b) => b.length - a.length);

  if (!matches.length) return <>{text}</>;

  const escaped = matches.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        matches.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
          <span
            key={index}
            className="rounded-[3px] bg-[#DDD6BC] px-1 py-px text-[#3d3d39] shadow-[inset_0_0_0_1px_rgba(61,61,57,.18)]"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
