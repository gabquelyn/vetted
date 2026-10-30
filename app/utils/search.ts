// app/utils/search.ts
import type { Candidate } from "@/app/data/registry";

/* ------------------------------------------------------------------ *
 * 1. Fields (display order = SEARCH_FIELDS order)
 * ------------------------------------------------------------------ */
export interface SearchField {
  key: string;
  label: string;
  /** Show the matched wording instead of the full value (long free-text fields) */
  showTerm?: boolean;
  get: (c: Candidate) => unknown;
}

// Most important first. Position in this array is the display rank.
export const SEARCH_FIELDS: SearchField[] = [
  { key: "title", label: "Title", get: (c) => [c.title, c.code] },
  { key: "skills", label: "Skills", get: (c) => c.skills },
  { key: "empType", label: "Employment type", get: (c) => c.empType },
  { key: "acceptedEmpTypes", label: "Employment preference", get: (c) => c.acceptedEmpTypes },
  { key: "specialties", label: "Specialties", get: (c) => c.specialties },
  { key: "env", label: "Environment", get: (c) => c.env },
  { key: "openToWorkingIn", label: "Open to working in", get: (c) => c.openToWorkingIn },
  { key: "context", label: "Past experience", showTerm: true, get: (c) => c.exp?.map((e) => e.context) },
  {
    key: "experience",
    label: "Experience",
    showTerm: true,
    // everything except context, with the comma-separated skills split into separate items
    get: (c) =>
      c.exp?.flatMap(({ context, skills, ...rest }) => [
        ...Object.values(rest),
        ...(typeof skills === "string" ? skills.split(", ") : []),
      ]),
  },
  { key: "credential", label: "Credential", get: (c) => c.credential },
  { key: "certs", label: "Certified", get: (c) => c.certs },
  { key: "emr", label: "EMR & clinical systems", get: (c) => c.emr },
  { key: "registration", label: "Professional registration", get: (c) => c.professionalRegistration },
  // { key: "summary", label: "Profile summary", showTerm: true, get: (c) => c.summary },
  { key: "snapshot", label: "Snapshot", showTerm: true, get: (c) => c.snapshot },
  { key: "education", label: "Education", get: (c) => [c.edu, c.eduChips, c.eduRecords] },
  { key: "languages", label: "Languages", get: (c) => c.lang },
  { key: "location", label: "Location", get: (c) => c.loc },
];

const FIELD_INDEX = new Map(SEARCH_FIELDS.map((f, i) => [f.key, i]));

export const fieldLabel = (key: string) =>
  SEARCH_FIELDS[FIELD_INDEX.get(key) ?? -1]?.label ?? key;

/** The match whose field appears earliest in SEARCH_FIELDS. */
export const pickDisplayMatch = <T extends { key: string }>(matches: T[]): T | undefined =>
  matches
    .filter((m) => FIELD_INDEX.has(m.key))
    .sort((a, b) => FIELD_INDEX.get(a.key)! - FIELD_INDEX.get(b.key)!)[0];

export const matchText = (m: { key: string; term: string; value: unknown }) =>
  SEARCH_FIELDS[FIELD_INDEX.get(m.key) ?? -1]?.showTerm ? m.term : `${m.value}`;

/* ------------------------------------------------------------------ *
 * 2. Normalization
 * ------------------------------------------------------------------ */
// Length-preserving fold, so an index in the folded text is the same index in the
// original. Lowercases, strips accents, turns - – — / & ( ) , etc. into spaces,
// and keeps . ! ? ' for sentence/negation detection.
const fold = (s: string) =>
  s.replace(/[\s\S]/gu, (ch) => {
    const b = ch.normalize("NFD")[0].toLowerCase();
    return ch.length === 1 && /[\w\s.!?']/.test(b) ? b : " ".repeat(ch.length);
  });

// Query side: same fold, minus sentence punctuation
const normQuery = (s: string) =>
  fold(s).replace(/[.!?]/g, " ").replace(/\s+/g, " ").trim();

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole-word phrase match; hyphen/space tolerant (already folded) and each word
// tolerates a plural "s"/"es". Words are never matched independently.
const regexCache = new Map<string, RegExp>();
const phraseRegex = (variant: string) => {
  let re = regexCache.get(variant);
  if (!re) {
    const body = variant
      .split(/\s+/)
      .map((w) => esc(w) + "(?:es|s)?")
      .join("\\s+");
    re = new RegExp(`\\b(${body})\\b`, "g");
    regexCache.set(variant, re);
  }
  return re;
};

/* ------------------------------------------------------------------ *
 * 3. Negation guard ("no ICU experience" must not count as ICU)
 * ------------------------------------------------------------------ */
const NEGATIONS = new Set([
  "no", "not", "without", "never", "none", "lacking", "lacks",
  "haven't", "hasn't", "doesn't", "don't", "isn't", "wasn't", "didn't",
]);

// A negation marker among the 4 words before the match, in the same sentence
const isNegated = (text: string, at: number) => {
  const start =
    Math.max(text.lastIndexOf(".", at - 1), text.lastIndexOf("!", at - 1), text.lastIndexOf("?", at - 1)) + 1;
  return text
    .slice(start, at)
    .split(/\s+/)
    .filter(Boolean)
    .slice(-4)
    .some((w) => NEGATIONS.has(w.replace(/[^\w']/g, "")));
};

/* ------------------------------------------------------------------ *
 * 4. Terminology (compact subset of the HTML's FD_TERMINOLOGY)
 *    `descendants` = approved expansion: a broad term may match its children.
 *    Ambiguous terms ("PT", "OT", bare "OR") are deliberately absent.
 * ------------------------------------------------------------------ */
interface Concept {
  id: string;
  label: string;
  aliases: string[];
  descendants?: string[];
}

const TERMINOLOGY: Concept[] = [
  { id: "ltc", label: "Long-Term Care (LTC)", aliases: ["ltc", "long term care"] },
  { id: "retirement_home", label: "Retirement Home", aliases: ["retirement settings", "retirement residence"] },
  { id: "home_care", label: "Home Care", aliases: ["in home care"] },
  { id: "chc", label: "Community Health Centre", aliases: ["community health center"] },

  { id: "emergency", label: "Emergency", aliases: ["ed", "er", "emergency department", "emergency room", "emergency trauma"], descendants: ["emergency_trauma"] },
  { id: "emergency_trauma", label: "Emergency & Trauma", aliases: [] },

  { id: "critical_care_icu", label: "Critical Care / ICU", aliases: ["icu", "intensive care", "critical care"], descendants: ["icu_adult", "picu", "nicu"] },
  { id: "icu_adult", label: "ICU Critical Care Adult", aliases: ["adult icu"] },
  { id: "picu", label: "ICU Critical Care Paediatric / PICU", aliases: ["picu", "paediatric icu", "pediatric icu"] },
  { id: "nicu", label: "Neonatal NICU", aliases: ["nicu", "neonatal"] },

  { id: "medsurg", label: "Medical-Surgical", aliases: ["med surg"] },
  { id: "pacu", label: "PeriAnesthesia & PACU", aliases: ["pacu", "perianesthesia", "peri anesthesia", "recovery room"] },
  { id: "cardiac", label: "Cardiac", aliases: ["cardiovascular"], descendants: ["cardiovascular_cardiac"] },
  { id: "cardiovascular_cardiac", label: "Cardiovascular & Cardiac", aliases: [] },
  { id: "obstetrics", label: "Obstetrics & Labour", aliases: ["obstetrics", "labour and delivery", "labor and delivery"] },
  { id: "palliative", label: "Palliative Care", aliases: ["palliative", "hospice", "hospice palliative"] },
  { id: "mental_health", label: "Mental Health", aliases: ["psychiatric"], descendants: ["mental_health_psychiatric"] },
  { id: "mental_health_psychiatric", label: "Mental Health & Psychiatric", aliases: [] },
  { id: "addictions", label: "Addictions & Concurrent Disorders", aliases: ["addictions", "substance use", "concurrent disorders"] },
  { id: "paediatric", label: "Paediatric", aliases: ["paediatrics", "pediatrics", "pediatric"], descendants: ["paediatrics"] },
  { id: "paediatrics", label: "Paediatrics", aliases: [] },

  // Wound care and ostomy are related, not equivalent: no cross-expansion
  { id: "wound_care", label: "Wound Care", aliases: [] },
  { id: "ostomy", label: "Ostomy / Stoma Care", aliases: ["ostomy", "stoma care", "ostomy care"] },
  { id: "wound_care_ostomy", label: "Wound Care & Ostomy", aliases: ["wound care and ostomy"] },
  { id: "nswoc", label: "NSWOC", aliases: ["wound ostomy continence nurse"] },

  { id: "msw", label: "Master of Social Work", aliases: ["msw", "masters of social work"] },
  { id: "ic", label: "Independent Contractor", aliases: ["ic"] },
  { id: "immediate", label: "Immediate availability", aliases: ["immediate", "immediately"] },
];

const BY_ID = new Map(TERMINOLOGY.map((c) => [c.id, c]));
const BY_PHRASE = new Map<string, Concept[]>();
TERMINOLOGY.forEach((c) =>
  [c.label, ...c.aliases].forEach((a) => {
    const k = normQuery(a);
    BY_PHRASE.set(k, [...(BY_PHRASE.get(k) ?? []), c]);
  }),
);

// Alias phrases that contain the word "and" must survive AND-splitting
const PROTECTED_PHRASES = [...BY_PHRASE.keys()].filter((k) => k.split(" ").includes("and"));

// Regular inflections only (fall/falls/falling, nurse/nursing, therapy/therapies)
const morph = (t: string): string[] => {
  const out = new Set([t]);
  let root = t;
  if (t.length > 4) {
    if (t.endsWith("ies")) root = t.slice(0, -3) + "y";
    else if (t.endsWith("ing")) root = t.slice(0, -3);
    else if (t.endsWith("ed")) root = t.slice(0, -2);
    else if (t.endsWith("es")) root = t.slice(0, -2);
    else if (t.endsWith("s") && !t.endsWith("ss")) root = t.slice(0, -1);
  }
  if (root.length < 3) return [...out];
  [root, root + "s", root + "es", root + "ed", root + "ing"].forEach((v) => out.add(v));
  if (root.endsWith("e")) {
    const n = root.slice(0, -1);
    if (n.length >= 3) {
      out.add(n + "ing");
      out.add(n + "ed");
    }
  } else {
    out.add(root + "e");
  }
  return [...out].filter((v) => v.length >= 3);
};

/* ------------------------------------------------------------------ *
 * 5. Compile a committed term into one phrase criterion
 * ------------------------------------------------------------------ */
const CONNECTORS = new Set(["and", "but", "or"]);

interface Variant {
  text: string;
  /** the concept whose wording this variant is (umbrella or descendant) */
  conceptId?: string;
}
interface Compiled {
  term: string;
  variants: Variant[];
}

const variantsFor = (phrase: string): Variant[] => {
  const map = new Map<string, string | undefined>();
  for (const c of BY_PHRASE.get(phrase) ?? []) {
    [c.label, ...c.aliases].forEach((a) => map.set(normQuery(a), c.id));
    for (const id of c.descendants ?? []) {
      const d = BY_ID.get(id);
      if (d) [d.label, ...d.aliases].forEach((a) => map.set(normQuery(a), d.id)); // child wins
    }
  }
  if (!map.has(phrase)) map.set(phrase, undefined);
  if (!phrase.includes(" ")) morph(phrase).forEach((v) => !map.has(v) && map.set(v, undefined));
  return [...map].map(([text, conceptId]) => ({ text, conceptId }));
};

const compileCache = new Map<string, Compiled | null>();
const compile = (raw: string): Compiled | null => {
  if (compileCache.has(raw)) return compileCache.get(raw)!;
  const t = raw.trim();
  const quoted = t.length > 2 && t.startsWith('"') && t.endsWith('"');
  const phrase = normQuery(quoted ? t.slice(1, -1) : t);
  const words = phrase.split(" ").filter(Boolean);

  let result: Compiled | null;
  if (!words.length || (words.length === 1 && CONNECTORS.has(words[0]))) {
    result = null; // contributes no constraint
  } else if (quoted) {
    result = { term: raw, variants: [{ text: phrase }] }; // literal: no expansion
  } else {
    result = { term: raw, variants: variantsFor(phrase) };
  }
  compileCache.set(raw, result);
  return result;
};

const compileAll = (terms: string[]) =>
  terms.map(compile).filter((t): t is Compiled => t !== null);

/* ------------------------------------------------------------------ *
 * 6. Sources: every leaf string is its own field-scoped source
 * ------------------------------------------------------------------ */
interface Source {
  key: string;
  raw: string;
  text: string; // folded, same length as raw
}

const toLeaves = (v: unknown): string[] => {
  if (v == null) return [];
  if (typeof v === "string") return v ? [v] : [];
  if (typeof v === "number") return [String(v)];
  if (Array.isArray(v)) return v.flatMap(toLeaves);
  if (typeof v === "object") return Object.values(v).flatMap(toLeaves);
  return []; // booleans carry no searchable text
};

const sourceCache = new WeakMap<Candidate, Source[]>();
const getSources = (c: Candidate): Source[] => {
  let s = sourceCache.get(c);
  if (!s) {
    s = SEARCH_FIELDS.flatMap((f) =>
      toLeaves(f.get(c)).map((raw) => ({ key: f.key, raw, text: fold(raw) })),
    );
    sourceCache.set(c, s);
  }
  return s;
};

/* ------------------------------------------------------------------ *
 * 7. Matching
 * ------------------------------------------------------------------ */
function* hits(sources: Source[], term: Compiled) {
  for (const v of term.variants) {
    const re = phraseRegex(v.text);
    for (const src of sources) {
      for (const m of src.text.matchAll(re)) {
        if (!isNegated(src.text, m.index!)) {
          yield { src, start: m.index!, len: m[0].length, conceptId: v.conceptId };
        }
      }
    }
  }
}

const matchesTerm = (sources: Source[], term: Compiled) => !hits(sources, term).next().done;

/**
 * Boolean eligibility, no scoring. Every committed term must be found as its own
 * phrase (or an approved alias/descendant); original order is preserved.
 */
export function searchCandidates(candidates: Candidate[], query: string[]): Candidate[] {
  const terms = compileAll(query);
  if (!terms.length) return candidates;
  return candidates.filter((c) => {
    const sources = getSources(c);
    return terms.every((t) => matchesTerm(sources, t));
  });
}

export type SortMode = "confirmed" | "experience";

/** The HTML's two sorts (ranking was never part of search). */
export const sortCandidates = (list: Candidate[], mode: SortMode): Candidate[] =>
  [...list].sort(
    mode === "experience"
      ? (a, b) => b.years - a.years
      : (a, b) => a.confirmedDays - b.confirmedDays,
  );

/* ------------------------------------------------------------------ *
 * 8. Evidence: which field matched, shown with the candidate's own wording
 * ------------------------------------------------------------------ */
export type CandidateMatch = { key: string; value: unknown; term: string };

export function findCandidateMatches(candidate: Candidate, terms: string[]): CandidateMatch[] {
  const sources = getSources(candidate);
  const seen = new Set<string>();
  const out: CandidateMatch[] = [];
  for (const t of compileAll(terms)) {
    for (const h of hits(sources, t)) {
      const term = h.src.raw.slice(h.start, h.start + h.len); // original casing/wording
      const id = `${h.src.key}|${h.src.raw}|${term.toLowerCase()}`;
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ key: h.src.key, value: h.src.raw, term });
    }
  }
  return out;
}

/** Merged [start, end) ranges in `text`, so Highlight agrees with the matcher. */
export function findHighlightRanges(text: string, terms: string[]): [number, number][] {
  const folded = fold(text);
  const ranges: [number, number][] = [];
  for (const t of compileAll(terms)) {
    for (const v of t.variants) {
      for (const m of folded.matchAll(phraseRegex(v.text))) {
        ranges.push([m.index!, m.index! + m[0].length]);
      }
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}

/* ------------------------------------------------------------------ *
 * 9. Input helpers
 * ------------------------------------------------------------------ */
/**
 * Splits "wound care AND palliative" into separate criteria. Quote-aware, and keeps
 * alias phrases that contain "and" (e.g. "wound care and ostomy") intact. Malformed
 * input (open quote, leading/trailing/doubled AND) returns the raw string unsplit.
 * Commit each piece with the same handler you use for comma-separated terms.
 */
export function splitAndExpression(raw: string): string[] {
  const held = new Map<string, string>();
  let work = raw;
  PROTECTED_PHRASES.forEach((phrase, i) => {
    const re = new RegExp(`(^|\\s)(${esc(phrase).replace(/ /g, "\\s+")})(?=\\s|$)`, "gi");
    work = work.replace(re, (_m, lead: string, hit: string) => {
      const key = `\u0001${i}_${held.size}\u0001`;
      held.set(key, hit);
      return lead + key;
    });
  });

  const parts: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < work.length; i++) {
    const ch = work[i];
    if (ch === '"') inQuotes = !inQuotes;
    if (!inQuotes && /^AND\s/i.test(work.slice(i)) && (cur === "" || /\s$/.test(cur))) {
      parts.push(cur.trim());
      cur = "";
      i += 2;
      continue;
    }
    cur += ch;
  }
  parts.push(cur.trim());

  if (inQuotes || parts.length === 1 || parts.some((p) => !p)) return [raw];
  return parts.map((p) => [...held].reduce((acc, [k, v]) => acc.split(k).join(v), p));
}

/**
 * Zero-result recovery: the first reduced query (one term dropped) that finds
 * candidates, or null. Offer it as a click, never apply it automatically.
 */
export function suggestBroadening(candidates: Candidate[], query: string[]): string[] | null {
  if (query.length < 2 || searchCandidates(candidates, query).length) return null;
  for (let i = 0; i < query.length; i++) {
    const reduced = query.filter((_, j) => j !== i);
    if (searchCandidates(candidates, reduced).length) return reduced;
  }
  return null;
}