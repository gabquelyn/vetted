import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import { locationMatch } from "@/app/utils/geo";

export const MATCH_RADIUS_KM = 25;
export const RESPONSES_PER_REQUEST = 3;

/**
 * DEMO ONLY: picks which candidates will "respond" to a request.
 * Eligible = own profession and within 25 km, or listed relocation city.
 * Responders = the 3 newest confirmed, so identical requests give identical results.
 * Pure function (no React), so it can be unit-tested directly.
 */
export function planDemoResponders(
  values: { profession?: unknown; location?: unknown },
  candidates: Candidate[] = FULL_CANDIDATES,
): { eligibleCount: number; eligibleIds: string[]; plannedIds: string[] } {
  const location = String(values.location ?? "");

  const matching = candidates.filter(
    (c) =>
      c.discoverable !== false &&
      c.title === values.profession &&
      // Within the 25 km radius, or confirmed willing to relocate to the request's city
      // (relocationReach). Not the generic "Open to relocation" answer, and never the
      // travel flag.
      locationMatch(c, location, MATCH_RADIUS_KM) !== null,
  );

  // Dedupe by id in case the data contains the same candidate twice
  const unique = [...new Map(matching.map((c) => [c.id, c])).values()];

  // Deterministic: newest confirmed first (fewest days since confirmation), id as the tie-break.
  const ordered = [...unique].sort(
    (a, b) => a.confirmedDays - b.confirmedDays || a.id.localeCompare(b.id),
  );

  return {
    eligibleCount: ordered.length,
    eligibleIds: ordered.map((c) => c.id),
    plannedIds: ordered.slice(0, RESPONSES_PER_REQUEST).map((c) => c.id),
  };
}