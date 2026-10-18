// app/utils/search.ts
import type { Candidate } from "@/app/data/registry";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // "é" -> "e"

// Flatten any value (string, array, nested object) into searchable text.
// Used for `exp`, `professionalRegistration`, `eduRecords`, whose shapes I can't see.
const toText = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return v.map(toText).join(" ");
  if (typeof v === "object") return Object.values(v).map(toText).join(" ");
  return "";
};

// Higher weight = a hit in this field matters more for ranking
const FIELDS: { weight: number; get: (c: Candidate) => unknown }[] = [
  { weight: 5, get: (c) => [c.title, c.code] },
  { weight: 4, get: (c) => c.skills },
  { weight: 4, get: (c) => c.specialties },
  { weight: 3, get: (c) => [c.env, c.openToWorkingIn] },
  { weight: 3, get: (c) => c.exp }, // clinical experience
  { weight: 2, get: (c) => [c.snapshot, c.summary] },
  { weight: 2, get: (c) => [c.credential, c.certs, c.emr] },
  { weight: 2, get: (c) => c.professionalRegistration },
  { weight: 1, get: (c) => [c.edu, c.eduChips, c.eduRecords] },
  { weight: 1, get: (c) => [c.lang, c.loc] },
];

// Build each candidate's searchable text once, not on every keystroke
const indexCache = new WeakMap<Candidate, { weight: number; text: string }[]>();

const getIndex = (c: Candidate) => {
  let idx = indexCache.get(c);
  if (!idx) {
    idx = FIELDS.map((f) => ({ weight: f.weight, text: norm(toText(f.get(c))) }));
    indexCache.set(c, idx);
  }
  return idx;
};

const countOccurrences = (text: string, term: string) => {
  let count = 0;
  let i = text.indexOf(term);
  while (i !== -1) {
    count++;
    i = text.indexOf(term, i + term.length);
  }
  return count;
};

export function searchCandidates(candidates: Candidate[], query: string): Candidate[] {
  const terms = norm(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return candidates;

  const scored: { c: Candidate; score: number }[] = [];

  for (const c of candidates) {
    const index = getIndex(c);
    let total = 0;
    let matchesAll = true;

    for (const term of terms) {
      let termScore = 0;
      for (const field of index) {
        termScore += countOccurrences(field.text, term) * field.weight;
      }
      if (termScore === 0) {
        matchesAll = false; // every word must match somewhere
        break;
      }
      total += termScore;
    }

    if (matchesAll) scored.push({ c, score: total });
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.c);
}