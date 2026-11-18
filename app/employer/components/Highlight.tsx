import { Fragment } from "react";
import { findHighlightRanges } from "@/app/utils/search";

/**
 * Marks the evidence for the committed terms. Ranges come from the same matcher that
 * decides eligibility (whole words, approved aliases and regular inflections), so a term
 * like "ED" or "ER" never lights up the letters inside "educated" or "pediatric".
 */
export default function Highlight({
  text,
  terms,
  field,
}: {
  text?: string | null;
  terms: string[];
  /** The field the text belongs to; structured terms then highlight only their own field */
  field?: string;
}) {
  if (!text) return null;
  if (!terms.length) return <>{text}</>;

  const ranges = findHighlightRanges(text, terms, field);
  if (!ranges.length) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let at = 0;
  ranges.forEach(([start, end], i) => {
    if (start > at) parts.push(<Fragment key={`t${i}`}>{text.slice(at, start)}</Fragment>);
    parts.push(
      <mark key={`m${i}`} className="rounded-[3px] bg-[#e4d9bd] px-0.5 text-inherit">
        {text.slice(start, end)}
      </mark>,
    );
    at = end;
  });
  if (at < text.length) parts.push(<Fragment key="tail">{text.slice(at)}</Fragment>);
  return <>{parts}</>;
}