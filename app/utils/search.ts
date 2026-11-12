// app/utils/search.ts
import type { Candidate } from "@/app/data/registry"; // adjust Filters to wherever it lives
import { PROFESSIONS } from "../data/professions";
// Dictionary-backed lemmatizer (WordNet). Only real words are lemmatised, so fragments
// like "nurs" or "manag" are left alone. Needs: npm i wink-lemmatizer (see wink-lemmatizer.d.ts)
import { noun as lemmaNoun, verb as lemmaVerb, adjective as lemmaAdjective } from "wink-lemmatizer";

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

/** Answers that say "not open" carry no searchable evidence ("Rural & fly-in: No" must not match "no"). */
const NO_ANSWERS = new Set(["no", "not open", "within my region"]);
const answered = (v: string | undefined) =>
  v && !NO_ANSWERS.has(v.trim().toLowerCase()) ? v : undefined;

/** The degree part of the display string "BScN · Institution · 2022". */
const degreeLabel = (edu: string | undefined) => edu?.split(" · ")[0];

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
  // Preference evidence: what the candidate confirmed about shifts, notice, relocation,
  // rural / fly-in work and resource-pool experience. "No" answers are never indexed.
  { key: "shift", label: "Shift", get: (c) => c.shift },
  { key: "availability", label: "Availability", get: (c) => c.avail },
  { key: "relocation", label: "Relocation", get: (c) => answered(c.relocation) },
  { key: "rural", label: "Rural & fly-in", get: (c) => answered(c.rural) },
  { key: "float", label: "Resource pool", get: (c) => answered(c.float) },
  {
    key: "specialties",
    label: "Specialties",
    // structured ids ("paediatrics") are searched by their label ("Paediatrics")
    get: (c) => c.specialties?.map((id) => BY_ID.get(id)?.label ?? id),
  },
  { key: "env", label: "Environment", get: (c) => c.env },
  // { key: "openToWorkingIn", label: "Open to working in", get: (c) => c.openToWorkingIn },
  { key: "context", label: "Past experience", showTerm: true, get: (c) => c.exp?.map((e) => e.context) },
  {
    key: "experience",
    label: "Experience",
    showTerm: true,
    // everything except context and dates, with the comma-separated skills split into
    // separate items. Dates are not searchable, so "2016" never matches a work history.
    get: (c) =>
      c.exp?.flatMap(({ context, skills, dates, ...rest }) => [
        ...Object.values(rest),
        ...(typeof skills === "string" ? skills.split(", ") : []),
      ]),
  },
  { key: "credential", label: "Credential", get: (c) => c.credential },
  { key: "certs", label: "Certification", get: (c) => c.certs },
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
  { key: "snapshot", label: "Snapshot", showTerm: true, get: (c) => c.snapshot },
  {
    key: "education",
    label: "Education",
    // Degree wording only. Institution, country and year are deliberately not searchable,
    // so "Toronto", "McMaster" or "2016" never match through a school.
    get: (c) => [
      c.eduChips,
      c.eduRecords?.map(({ degree, fieldOfStudy, status }) => [
        degree,
        fieldOfStudy,
        status,
      ]),
      degreeLabel(c.edu), // "BScN" from "BScN · Toronto Metropolitan University · 2022"
    ],
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

/* ------------------------------------------------------------------ *
 * Word forms: bounded grammatical inflection
 *
 * A query word matches an evidence word only if they are regular inflected forms of
 * the same dictionary word (plural, -s/-es, -ed, -ing, -er/-est, with the usual
 * spelling changes: car/cars, plan/planning, run/running, disability/disabilities,
 * manage/managing). Never fragments ("car" is not "care"), never different words,
 * derivations ("nurse" is not "nursery") or abbreviation inflections ("ICU" is not "ICUs").
 * Irregular forms (ran, children) are not expanded.
 * ------------------------------------------------------------------ */

// Abbreviations are exact-only: no plural/inflection is ever applied to them.
const ABBREVIATIONS = new Set([
  ...PROFESSIONS.map(([code]) => code.trim().toLowerCase()),
  "ltc", "icu", "picu", "nicu", "pacu", "chc", "emr", "msw", "nswoc", "ed", "er", "ic",
]);

const isCVC = (w: string) => /[^aeiou][aeiou][^aeiouwxy]$/.test(w);

/** Every regular surface form of a base word, including spelling changes. */
const regularForms = (base: string): Set<string> => {
  const f = new Set<string>([base + "s", base + "es", base + "ed", base + "ing", base + "er", base + "est"]);
  if (/[^aeiou]y$/.test(base)) {
    const b = base.slice(0, -1); // disability -> disabilities, carry -> carried
    ["ies", "ied", "ier", "iest"].forEach((x) => f.add(b + x));
  }
  if (base.endsWith("e")) {
    const b = base.slice(0, -1); // care -> caring, cared
    f.add(b + "ing");
    ["d", "r", "st"].forEach((x) => f.add(base + x));
  }
  if (isCVC(base)) {
    const d = base + base[base.length - 1]; // plan -> planned, planning; run -> running
    ["ed", "ing", "er", "est"].forEach((x) => f.add(d + x));
  }
  return f;
};

const formsCache = new Map<string, ReadonlySet<string>>();
/**
 * The word plus its dictionary base form(s). The base is accepted only if the word is a
 * regular inflection of it, so "wound" is never "wind" and "ran" is never "run".
 */
const wordForms = (word: string, exactOnly = false): ReadonlySet<string> => {
  if (exactOnly || word.length < 4 || ABBREVIATIONS.has(word)) return new Set([word]);
  let out = formsCache.get(word);
  if (!out) {
    const forms = new Set([word]);
    for (const base of [lemmaNoun(word), lemmaVerb(word), lemmaAdjective(word)]) {
      if (base !== word && !ABBREVIATIONS.has(base) && regularForms(base).has(word)) {
        forms.add(base);
      }
    }
    out = forms;
    formsCache.set(word, out);
  }
  return out;
};

interface Tok {
  start: number;
  end: number;
  word: string;
  forms: ReadonlySet<string>;
}

const WORD = /[a-z0-9]+(?:'[a-z0-9]+)*/g;

/** Words of a folded text with their offsets. `raw` is the same text before folding. */
const tokenize = (folded: string, raw: string): Tok[] =>
  [...folded.matchAll(WORD)].map((m) => {
    const start = m.index!;
    const end = start + m[0].length;
    // ALL-CAPS words in the evidence (BLS, ACLS, IPAC) are abbreviations: exact only
    const acronym = /^[A-Z][A-Z0-9]+$/.test(raw.slice(start, end));
    return { start, end, word: m[0], forms: wordForms(m[0], acronym) };
  });

/** A query phrase prepared for matching, one entry per word. */
interface Phrase {
  text: string;
  words: string[];
  forms: ReadonlySet<string>[];
  /** quoted terms: literal words, no inflection */
  exact: boolean;
}

const preparePhrase = (text: string, exact = false): Phrase => {
  const words = text.split(/\s+/).filter(Boolean);
  return { text, words, exact, forms: words.map((w) => wordForms(w, exact)) };
};

const sharesForm = (a: ReadonlySet<string>, b: ReadonlySet<string>) => {
  for (const x of a) if (b.has(x)) return true;
  return false;
};

// What may sit between two words of one phrase in the evidence: spaces and the joiners
// used in labels ("Long-Term", "Residential / Supported", "Perioperative & OR", "(LTC)").
// A comma, full stop or any other punctuation ends the phrase: "medical, surgical" is a
// list of two things, not "medical-surgical".
const PHRASE_GAP = /^[\s\-\u2010-\u2015/&()+]+$/;

/**
 * Whole-word phrase match: consecutive words, each query word matching an inflected form
 * of itself, joined only by PHRASE_GAP characters in the original text. Words are never
 * matched independently.
 */
function* phraseHits(tokens: Tok[], raw: string, phrase: Phrase) {
  const n = phrase.words.length;
  for (let i = 0; i + n <= tokens.length; i++) {
    let ok = true;
    for (let k = 0; k < n && ok; k++) {
      const t = tokens[i + k];
      ok = phrase.exact
        ? t.word === phrase.words[k]
        : sharesForm(t.forms, phrase.forms[k]);
      if (ok && k > 0) ok = PHRASE_GAP.test(raw.slice(tokens[i + k - 1].end, t.start));
    }
    if (ok) yield { start: tokens[i].start, end: tokens[i + n - 1].end };
  }
}

/* ------------------------------------------------------------------ *
 * 3. Negation guard ("no ICU experience" must not count as ICU)
 * ------------------------------------------------------------------ */
const NEGATIONS = new Set([
  "no",
  "not",
  "without",
  "never",
  "none",
  "lacking",
  "lacks",
  "haven't",
  "hasn't",
  "doesn't",
  "don't",
  "isn't",
  "wasn't",
  "didn't",
]);

// A negation marker among the 4 words before the match, in the same sentence
const isNegated = (text: string, at: number) => {
  const start =
    Math.max(
      text.lastIndexOf(".", at - 1),
      text.lastIndexOf("!", at - 1),
      text.lastIndexOf("?", at - 1),
    ) + 1;
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
  /** Filter group this concept feeds; omit for search-only concepts */
  filter?: keyof Filters | "specialty";
  /** Value stored in that filter group when it differs from the label */
  value?: string;
  /**
   * Structured evidence only: the exact leaf is matched in this one source field
   * ("env", "specialties") and never expanded to a broader umbrella.
   */
  scope?: string;
  /** Every alias is the leaf (environments). Otherwise only the label and `strictAliases` are. */
  strictAll?: boolean;
  strictAliases?: string[];
}

const ENV = "env";
const SPEC = "specialties";

const TERMINOLOGY: Concept[] = [
  /* ---- Experience environments: every label and alias promotes to the green chip ---- */
  {
    id: "ltc",
    label: "Long-Term Care (LTC)",
    aliases: ["ltc", "long term care"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "hospital",
    label: "Hospital",
    aliases: ["hospitals"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "clinic",
    label: "Clinic",
    aliases: ["clinics", "outpatient clinic"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "diagnostic_laboratory",
    label: "Laboratory",
    aliases: ["laboratories", "diagnostic laboratory", "diagnostic lab"],
    value: "Laboratory",
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "private_practice",
    label: "Private Practice",
    aliases: [],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "community_based_services_outreach",
    label: "Community-Based Services / Outreach",
    aliases: ["community based services", "outreach program", "community agency"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "residential_supported_living",
    label: "Residential / Supported Living",
    aliases: ["residential support", "supported living", "group home", "supportive housing"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "residential_hospice",
    label: "Residential Hospice",
    aliases: ["hospice", "hospice unit", "hospice facility"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "retirement_home",
    label: "Retirement Home",
    aliases: ["retirement settings", "retirement residence"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "home_care",
    label: "Home Care",
    aliases: ["in home care"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },
  {
    id: "community_health_centre",
    label: "Community Health Centre",
    aliases: ["community health center"],
    filter: "environment",
    scope: ENV,
    strictAll: true,
  },

  /* ---- Specialties. Leaves (filter "specialty") are matched against the candidate's
         structured specialties by their exact label; broad terms and aliases are
         keyword-scope and never resolve to a leaf or the other way round. ---- */
  {
    id: "emergency_domain",
    label: "Emergency",
    aliases: ["ed", "er", "emergency department", "emergency room"],
    descendants: ["emergency_trauma"],
  },
  {
    id: "emergency_trauma",
    label: "Emergency & Trauma",
    aliases: ["emergency and trauma"],
    filter: "specialty",
    
    // strictAliases: ["emergency trauma"],
  },

  {
    id: "critical_care_icu",
    label: "Critical Care / ICU",
    aliases: ["icu", "intensive care", "critical care"],
    descendants: [
      "icu_critical_care_adult",
      "icu_critical_care_paediatric",
      "neonatal_nicu",
    ],
  },
  {
    id: "icu_critical_care_adult",
    label: "ICU Critical Care Adult",
    aliases: ["adult icu"],
    filter: "specialty",
    strictAliases: ["icu critical care adult"],
  },
  {
    id: "icu_critical_care_paediatric",
    label: "ICU Critical Care Paediatric / PICU",
    aliases: ["picu", "paediatric icu", "pediatric icu"],
    filter: "specialty",
    strictAliases: ["icu critical care paediatric"],
  },
  {
    id: "neonatal_nicu",
    label: "Neonatal NICU",
    aliases: ["nicu", "neonatal"],
    filter: "specialty",
  },

  // Med-surg has no structured specialty in the data: keyword scope, whole phrase only
  {
    id: "medsurg",
    label: "Medical-Surgical",
    aliases: ["med surg", "merd-surg"],
  },
  {
    id: "periop_or",
    label: "Perioperative & OR",
    aliases: ["operating room", "perioperative"],
    filter: "specialty",
  },
  {
    id: "perianesthesia_pacu",
    label: "PeriAnesthesia & PACU",
    aliases: ["pacu", "perianesthesia", "peri anesthesia", "recovery room"],
    filter: "specialty",
    
  },
  {
    id: "cardiac_domain",
    label: "cardiac",
    aliases: ["cardiovascular"],
    filter: "specialty",
    descendants: ["cardiovascular_cardiac"],
  },
  {
    id: "cardiovascular_cardiac",
    label: "Cardiovascular & Cardiac",
    aliases: ["cardiovascular cardiac", "cardiovascular and cardiac"],
    filter: "specialty",
    
  },
  {
    id: "obstetrics_labour",
    label: "Obstetrics & Labour",
    aliases: ["obstetrics", "labour and delivery", "labor and delivery", "l&d"],
    filter: "specialty",
    
    // strictAliases: ["l&d"],
  },
  {
    id: "perinatal",
    label: "Perinatal",
    aliases: [],
    filter: "specialty",
  },
  {
    id: "maternal_newborn",
    label: "Maternal-Newborn",
    aliases: [],
    filter: "specialty",
  },
  {
    // Broad term: keyword scope. "hospice" is an environment, not an alias of this.
    id: "palliative_domain",
    label: "Palliative Care",
    aliases: ["palliative", "hospice palliative"],
  },
  {
    id: "mental_health_domain",
    label: "Mental Health",
    aliases: ["psychiatric"],
    descendants: ["mental_health_psychiatric"],
  },
  {
    id: "mental_health_psychiatric",
    label: "Mental Health & Psychiatric",
    aliases: [],
    filter: "specialty",
  },
  {
    id: "addictions_concurrent",
    label: "Addictions & Concurrent Disorders",
    aliases: ["addictions", "substance use", "concurrent disorders"],
    filter: "specialty",
  },
  {
    id: "paediatric_domain",
    label: "Paediatric",
    aliases: ["pediatrics", "pediatric"],
    descendants: ["paediatrics"],
    filter: "specialty",
  },

  // Wound care and ostomy are related, not equivalent: no cross-expansion
  { id: "wound_care", label: "Wound Care", aliases: [] },
  {
    id: "ostomy",
    label: "Ostomy / Stoma Care",
    aliases: ["ostomy", "stoma care", "ostomy care"],
  },
  {
    id: "wound_care_ostomy",
    label: "Wound Care & Ostomy",
    aliases: ["wound care and ostomy"],
  },
  {
    id: "nswoc",
    label: "NSWOC",
    aliases: ["wound ostomy continence nurse"],
  },
  {
    id: "wound_care_certification",
    label: "Wound Care Certification",
    aliases: ["wound certification"],
  },

  {
    id: "msw",
    label: "Master of Social Work",
    aliases: ["msw", "masters of social work", "master s of social work"],
  },
  { id: "ic", label: "Independent Contractor", aliases: ["ic"] },
  {
    id: "immediate",
    label: "Immediate",
    aliases: ["immediate", "immediately", "immediate availability"],
    filter: "availability",
  }, // must equal your c.avail option text

  /* ---- Employment type: promoted into the Employment filter (value = the option text) ---- */
  {
    id: "part_time",
    label: "Part-Time",
    aliases: ["part time", "parttime"],
    filter: "employment" as keyof Filters,
    value: "Part-Time",
  },
  {
    id: "full_time",
    label: "Full-Time",
    aliases: ["full time", "fulltime"],
    filter: "employment" as keyof Filters,
    value: "Full-Time",
  },
  {
    id: "casual_",
    label: "Casual",
    aliases: ["casual"],
    filter: "employment" as keyof Filters,
    value: "Casual",
  },
];
const BY_ID = new Map(TERMINOLOGY.map((c) => [c.id, c]));
const BY_PHRASE = new Map<string, Concept[]>();
TERMINOLOGY.forEach((c) =>
  [c.label, ...c.aliases, ...(c.strictAliases ?? [])].forEach((a) => {
    const k = normQuery(a);
    BY_PHRASE.set(k, [...(BY_PHRASE.get(k) ?? []), c]);
  }),
);

/** The exact wordings of a leaf: the ones that resolve to it and nothing broader. */
const strictPhrases = (c: Concept): Set<string> =>
  new Set(
    (c.strictAll
      ? [c.label, ...c.aliases]
      : [c.label, ...(c.strictAliases ?? [])]
    ).map(normQuery),
  );

/** The leaf a phrase names exactly (environment alias, or specialty label), if any. */
const leafFor = (phrase: string): Concept | undefined =>
  BY_PHRASE.get(phrase)?.find((c) => c.scope && strictPhrases(c).has(phrase));

// Alias phrases that contain the word "and" must survive AND-splitting
const PROTECTED_PHRASES = [...BY_PHRASE.keys()].filter((k) =>
  k.split(" ").includes("and"),
);

/* ------------------------------------------------------------------ *
 * 5. Compile a committed term into one phrase criterion
 * ------------------------------------------------------------------ */
const CONNECTORS = new Set(["and", "but", "or"]);

interface Variant extends Phrase {
  /** the concept whose wording this variant is (umbrella or descendant) */
  conceptId?: string;
  /** structured leaf: only this source field can satisfy it */
  scope?: string;
}
interface Compiled {
  term: string;
  variants: Variant[];
}

const variantsFor = (phrase: string): Variant[] => {
  // An exact leaf (environment, specialty label) is itself: no umbrella, no sibling wording,
  // and only its own structured field counts.
  const leaf = leafFor(phrase);
  if (leaf) {
    return [...strictPhrases(leaf)].map((text) => ({
      ...preparePhrase(text),
      conceptId: leaf.id,
      scope: leaf.scope,
    }));
  }
  const map = new Map<string, string | undefined>();
  for (const c of BY_PHRASE.get(phrase) ?? []) {
    [c.label, ...c.aliases].forEach((a) => map.set(normQuery(a), c.id));
    for (const id of c.descendants ?? []) {
      const d = BY_ID.get(id);
      if (d)
        [d.label, ...d.aliases].forEach((a) => map.set(normQuery(a), d.id)); // child wins
    }
  }
  if (!map.has(phrase)) map.set(phrase, undefined);
  return [...map].map(([text, conceptId]) => ({ ...preparePhrase(text), conceptId }));
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
    result = { term: raw, variants: [preparePhrase(phrase, true)] }; // literal: no expansion, no inflection
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
  tokens: Tok[];
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
      toLeaves(f.get(c)).map((raw) => {
        const text = fold(raw);
        return { key: f.key, raw, text, tokens: tokenize(text, raw) };
      }),
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
    for (const src of sources) {
      if (v.scope && src.key !== v.scope) continue;
      for (const m of phraseHits(src.tokens, src.raw, v)) {
        if (!isNegated(src.text, m.start)) {
          yield {
            src,
            start: m.start,
            len: m.end - m.start,
            conceptId: v.conceptId,
          };
        }
      }
    }
  }
}

const matchesTerm = (sources: Source[], term: Compiled) =>
  !hits(sources, term).next().done;

/**
 * Boolean eligibility, no scoring. Every committed term must be found as its own
 * phrase (or an approved alias/descendant); original order is preserved.
 */
export function searchCandidates(
  candidates: Candidate[],
  query: string[],
): Candidate[] {
  const terms = compileAll(query);
  if (!terms.length) return candidates;
  return candidates.filter((c) => {
    const sources = getSources(c);
    return terms.every((t) => matchesTerm(sources, t));
  });
}

export type SortMode = "confirmed" | "experience";

/** The HTML's two sorts (ranking was never part of search). */
export const sortCandidates = (
  list: Candidate[],
  mode: SortMode,
): Candidate[] =>
  [...list].sort(
    mode === "experience"
      ? (a, b) => b.years - a.years
      : (a, b) => a.confirmedDays - b.confirmedDays,
  );

/* ------------------------------------------------------------------ *
 * 8. Evidence: which field matched, shown with the candidate's own wording
 * ------------------------------------------------------------------ */
export type CandidateMatch = { key: string; value: unknown; term: string };

export function findCandidateMatches(
  candidate: Candidate,
  terms: string[],
): CandidateMatch[] {
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
export function findHighlightRanges(
  text: string,
  terms: string[],
  /** The field `text` belongs to; lets structured terms highlight only their own field */
  key?: string,
): [number, number][] {
  const folded = fold(text);
  const tokens = tokenize(folded, text);
  const ranges: [number, number][] = [];
  for (const t of compileAll(terms)) {
    for (const v of t.variants) {
      if (key && v.scope && v.scope !== key) continue;
      for (const m of phraseHits(tokens, text, v)) ranges.push([m.start, m.end]);
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
    const re = new RegExp(
      `(^|\\s)(${esc(phrase).replace(/ /g, "\\s+")})(?=\\s|$)`,
      "gi",
    );
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
    if (
      !inQuotes &&
      /^AND\s/i.test(work.slice(i)) &&
      (cur === "" || /\s$/.test(cur))
    ) {
      parts.push(cur.trim());
      cur = "";
      i += 2;
      continue;
    }
    cur += ch;
  }
  parts.push(cur.trim());

  if (inQuotes || parts.length === 1 || parts.some((p) => !p)) return [raw];
  return parts.map((p) =>
    [...held].reduce((acc, [k, v]) => acc.split(k).join(v), p),
  );
}

/**
 * Zero-result recovery: the first reduced query (one term dropped) that finds
 * candidates, or null. Offer it as a click, never apply it automatically.
 */
export function suggestBroadening(
  candidates: Candidate[],
  query: string[],
): string[] | null {
  if (query.length < 2 || searchCandidates(candidates, query).length)
    return null;
  for (let i = 0; i < query.length; i++) {
    const reduced = query.filter((_, j) => j !== i);
    if (searchCandidates(candidates, reduced).length) return reduced;
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * 10. Chip resolution: professions are promoted into the panel filter,
 *     terminology and free text stay search-only
 * ------------------------------------------------------------------ */
export interface ResolvedTerm {
  /** Chip text */
  label: string;
  /** Filter group this chip is promoted into (profession, environment, specialty, availability) */
  filter?: keyof Filters | "specialty";
  /** Value stored in that filter group */
  value?: string;
  /** Ambiguous wording ("PT"): show the prompt and apply nothing until one option is chosen */
  clarify?: { prompt: string; options: ResolvedTerm[] };
}

// "np" / "nurse practitioner" -> { code: "NP", name: "Nurse Practitioner" }
const PROFESSION_BY_PHRASE = new Map<string, { code: string; name: string }>();
PROFESSIONS.forEach(([code, name]) => {
  const entry = { code, name };
  PROFESSION_BY_PHRASE.set(normQuery(code), entry);
  PROFESSION_BY_PHRASE.set(normQuery(name), entry);
});
// "Physical Therapist" is a plain alias of Physiotherapist (no prompt)
const PHYSIO = PROFESSION_BY_PHRASE.get("pt");
if (PHYSIO) PROFESSION_BY_PHRASE.set("physical therapist", PHYSIO);
// RN(EC) is the Nurse Practitioner designation
const NP = PROFESSION_BY_PHRASE.get("np");
if (NP) {
  PROFESSION_BY_PHRASE.set(normQuery("RN(EC)"), NP);
  PROFESSION_BY_PHRASE.set(normQuery("Registered Nurse (Extended Class)"), NP);
}

// Exact names and codes only. Word forms never promote ("nurses", "rns" stay keywords).
const professionFor = (phrase: string) => PROFESSION_BY_PHRASE.get(phrase);

/** "PT" alone is ambiguous. Only this exact abbreviation prompts. */
const PT_PROMPT: ResolvedTerm = {
  label: "PT",
  clarify: {
    prompt: "PT could mean…",
    options: [
      {
        label: PHYSIO?.name ?? "Physiotherapist",
        filter: "profession",
        value: PHYSIO?.code ?? "PT",
      },
      { label: "Part-time", filter: "employment" as keyof Filters, value: "Part-Time" },
      { label: "PT" }, // keep as a plain keyword
    ],
  },
};

const fromConcept = (c: Concept, asLeaf: boolean): ResolvedTerm =>
  asLeaf && c.filter
    ? { label: c.label, filter: c.filter, value: c.value ?? c.label }
    : { label: c.label };

/**
 * A whole folded phrase -> profession, PT prompt, environment/specialty leaf (promoted),
 * or terminology label (search-only). Specialty aliases and broad terms never promote.
 */
const resolvePhrase = (phrase: string, text?: string): ResolvedTerm | undefined => {
  if (phrase === "pt") return PT_PROMPT;

  const p = professionFor(phrase);
  if (p) return { label: p.name, filter: "profession", value: p.code };

  const leaf = leafFor(phrase);
  if (leaf) return fromConcept(leaf, true);

  const c = BY_PHRASE.get(phrase)?.[0];
  if (c) {
    // availability and employment type keep their own promotion; every other filtered
    // concept reached by an alias stays keyword-scope
    // A broad alias of a structured leaf ("obstetrics" -> Obstetrics & Labour) keeps the
    // wording the user typed: the leaf's own label would search that one field only and
    // lose profiles that mention the word elsewhere (RN-511 "High-Risk Obstetrics").
    if (c.scope && text) return { label: text };
    return fromConcept(
      c,
      c.filter === "availability" || (c.filter as string) === "employment",
    );
  }
  return undefined;
};

/** One committed chip -> its label and, for approved terms, the filter it feeds. */
export function resolveTerm(raw: string): ResolvedTerm {
  const t = raw.trim();
  const quoted = t.length > 2 && t.startsWith('"') && t.endsWith('"');
  if (quoted) return { label: raw };
  return resolvePhrase(normQuery(t), t) ?? { label: raw };
}

export const termLabel = (raw: string) => resolveTerm(raw).label;

/**
 * Turns a committed entry into chips. The whole entry is checked literally first:
 *   "Mental Health First Aid", "wound care certification", "residential hospice"
 *   stay one chip, and an approved whole phrase ("Perioperative & OR") is one chip.
 * Only when every word of the entry belongs to approved terms is it split, longest phrase
 * first: "mental health np" -> [Mental Health, Nurse Practitioner (profession)].
 * Anything else stays together as one keyword chip. Quoted input is never split.
 */
export function parseQuery(raw: string): ResolvedTerm[] {
  const text = raw.trim();
  if (!text) return [];
  if (text.includes('"')) return [resolveTerm(text)];

  const whole = resolvePhrase(normQuery(text), text);
  if (whole) return [whole];

  const tokens = text.split(/\s+/);
  const folded = tokens.map(normQuery);
  const MAX_WORDS = 5;

  const out: ResolvedTerm[] = [];
  for (let i = 0; i < tokens.length; ) {
    if (CONNECTORS.has(folded[i])) {
      i++; // "mental health and np": the connector is not a chip
      continue;
    }
    let hit: ResolvedTerm | undefined;
    let len = 0;
    for (let n = Math.min(MAX_WORDS, tokens.length - i); n >= 1 && !hit; n--) {
      const phrase = folded.slice(i, i + n).filter(Boolean).join(" ");
      const found = phrase ? resolvePhrase(phrase, tokens.slice(i, i + n).join(" ")) : undefined;
      if (found) {
        hit = found;
        len = n;
      }
    }
    if (!hit) return [{ label: text }]; // not entirely approved terms: one literal chip
    out.push(hit);
    i += len;
  }
  return out;
}