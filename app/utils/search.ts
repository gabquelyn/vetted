// app/utils/search.ts
import type { Candidate } from "@/app/data/registry";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // "é" -> "e"

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
  { weight: 4, get: (c) => c.acceptedEmpTypes },
  { weight: 4, get: (c) => c.empType },
  { weight: 4, get: (c) => c.specialties },
  { weight: 3, get: (c) => [c.env, c.openToWorkingIn] },
  { weight: 3, get: (c) => c.exp }, // clinical experience
  { weight: 2, get: (c) => [c.credential, c.certs, c.emr] },
  { weight: 2, get: (c) => c.professionalRegistration },
  { weight: 2, get: (c) => [c.snapshot, c.summary] },
  { weight: 1, get: (c) => [c.edu, c.eduChips, c.eduRecords] },
  { weight: 1, get: (c) => [c.lang, c.loc] },
];

// Words that carry no search intent and would match almost everything
const STOPWORDS = new Set([
  "of",
  "in",
  "the",
  "and",
  "a",
  "an",
  "for",
  "to",
  "with",
  "on",
  "at",
  "or",
]);

// Fraction of (non-stopword) terms a candidate must match to be returned
const MIN_COVERAGE = 0.5;

// Bonus multiplier when the full multi-word query appears as an exact phrase
const PHRASE_BONUS = 3;

// Build each candidate's searchable text once, not on every keystroke
const indexCache = new WeakMap<Candidate, { weight: number; text: string }[]>();

const getIndex = (c: Candidate) => {
  let idx = indexCache.get(c);
  if (!idx) {
    idx = FIELDS.map((f) => ({
      weight: f.weight,
      text: norm(toText(f.get(c))),
    }));
    indexCache.set(c, idx);
  }
  return idx;
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Match only at the start of a word, so "nurs" matches "nursing" but
// "in" no longer matches inside "Scheduling" or "Administration"
const regexCache = new Map<string, RegExp>();
const wordStartRegex = (term: string) => {
  let re = regexCache.get(term);
  if (!re) {
    re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(term)}`, "gu");
    regexCache.set(term, re);
  }
  return re;
};

const countOccurrences = (text: string, term: string) =>
  (text.match(wordStartRegex(term)) ?? []).length;

export function searchCandidates(
  candidates: Candidate[],
  query: string[],
): Candidate[] {
  const terms = [
    ...new Set(
      query
        .flatMap((q) => norm(q).split(/\s+/))
        .filter((t) => t && !STOPWORDS.has(t)),
    ),
  ];
  if (!terms.length) return candidates;

  // Full phrases (stopwords kept) for exact-phrase boosting, e.g. "bachelor of science in nursing"
  const phrases = query
    .map((q) => norm(q).trim())
    .filter((p) => p.includes(" "));

  const minMatched = Math.max(1, Math.ceil(terms.length * MIN_COVERAGE));
  const scored: { c: Candidate; score: number }[] = [];

  for (const c of candidates) {
    const index = getIndex(c);
    let total = 0;
    let matched = 0;

    for (const term of terms) {
      let termScore = 0;
      for (const field of index) {
        termScore += countOccurrences(field.text, term) * field.weight;
      }
      if (termScore > 0) {
        matched++;
        total += termScore;
      }
    }

    // Must match enough of the query's meaningful terms
    if (matched < minMatched) continue;

    // Reward an exact phrase hit, scaled by the field's weight
    for (const phrase of phrases) {
      for (const field of index) {
        if (field.text.includes(phrase)) total += PHRASE_BONUS * field.weight;
      }
    }

    // Prefer candidates who match more of the query's terms
    total *= matched / terms.length;

    scored.push({ c, score: total });
  }

  return scored.sort((a, b) => b.score - a.score).map(({ c }) => c);
}

type CandidateMatch = {
  key: string;
  value: unknown;
  term: string;
};

export function findCandidateMatches(
  candidate: Candidate,
  terms: string[],
): CandidateMatch[] {
  const normalizedTerms = [
    ...new Set(terms.map((term) => term.trim().toLowerCase()).filter(Boolean)),
  ];

  if (!normalizedTerms.length) return [];

  const matches: CandidateMatch[] = [];

  function search(value: unknown, key: string): void {
    if (value == null) return;

    if (typeof value === "string" || typeof value === "number") {
      const text = String(value).toLowerCase();

      for (const term of normalizedTerms) {
        if (text.includes(term)) {
          matches.push({ key, value, term });
        }
      }

      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => search(item, key));
      return;
    }

    if (typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(
        ([childKey, childValue]) => {
          search(childValue, childKey);
        },
      );
    }
  }

  Object.entries(candidate).forEach(([key, value]) => {
    search(value, key);
  });

  return matches;
}

export interface SearchField {
  key: string;
  label: string;
  /** Show the matched term instead of the full value (long free-text fields) */
  showTerm?: boolean;
  get: (c: Candidate) => unknown;
}

// Most important first. Position in this array is the display rank.
export const SEARCH_FIELDS: SearchField[] = [
  { key: "title", label: "Title", get: (c) => [c.title, c.code] },
  { key: "skills", label: "Skills", get: (c) => c.skills },
  { key: "empType", label: "Employment type", get: (c) => c.empType },
  {
    key: "acceptedEmpTypes",
    label: "Employment preference",
    get: (c) => c.acceptedEmpTypes,
  },
  { key: "specialties", label: "Specialties", get: (c) => c.specialties },
  { key: "env", label: "Environment", get: (c) => c.env },
  {
    key: "openToWorkingIn",
    label: "Open to working in",
    get: (c) => c.openToWorkingIn,
  },
  {
    key: "context",
    label: "Past experience",
    showTerm: true,
    get: (c) => c.exp?.map((e) => e.context),
  },
  {
    key: "experience",
    label: "Experience",
    showTerm: true,
    get: (c) => c.exp?.map(({ context, ...rest }) => rest),
  },
  { key: "credential", label: "Credential", get: (c) => c.credential },
  { key: "certs", label: "Certified", get: (c) => c.certs },
  { key: "emr", label: "EMR & clinical systems", get: (c) => c.emr },
  {
    key: "registration",
    label: "Professional registration",
    get: (c) => c.professionalRegistration,
  },
  {
    key: "summary",
    label: "Profile summary",
    showTerm: true,
    get: (c) => c.summary,
  },
  {
    key: "snapshot",
    label: "Snapshot",
    showTerm: true,
    get: (c) => c.snapshot,
  },
  {
    key: "education",
    label: "Education",
    get: (c) => [c.edu, c.eduChips, c.eduRecords],
  },
  { key: "languages", label: "Languages", get: (c) => c.lang },
  { key: "location", label: "Location", get: (c) => c.loc },
];

const FIELD_INDEX = new Map(SEARCH_FIELDS.map((f, i) => [f.key, i]));

export const fieldLabel = (key: string) =>
  SEARCH_FIELDS[FIELD_INDEX.get(key) ?? -1]?.label ?? key;

/** The match whose field appears earliest in SEARCH_FIELDS. */
export const pickDisplayMatch = <T extends { key: string }>(
  matches: T[],
): T | undefined =>
  matches
    .filter((m) => FIELD_INDEX.has(m.key))
    .sort((a, b) => FIELD_INDEX.get(a.key)! - FIELD_INDEX.get(b.key)!)[0];

export const matchText = (m: { key: string; term: string; value: unknown }) =>
  SEARCH_FIELDS[FIELD_INDEX.get(m.key) ?? -1]?.showTerm ? m.term : `${m.value}`;
