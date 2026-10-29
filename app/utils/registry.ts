import { Candidate } from "../data/registry";

const norm = (s: string) => s.trim().toLowerCase();

const isAffirmative = (v?: string) => {
  if (!v) return false;
  const s = norm(v);
  return !["", "no", "none", "n/a", "na", "not open", "false"].some(
    (neg) => s === neg || s.startsWith("no "),
  );
};

const hasAny = (haystack: string[] | undefined, needles: string[]) => {
  if (!haystack?.length) return false;
  const set = new Set(haystack.map(norm));
  return needles.some((n) => set.has(norm(n)));
};

// Each mobility / profile key maps to a check on the candidate
const MOBILITY_CHECKS: Record<string, (c: Candidate) => boolean> = {
  vehicle: (c) => c.vehicle,
  licence: (c) => c.licence,
  travel: (c) => !!c.travelOpen,
  relocation: (c) =>
    isAffirmative(c.relocation) || (c.relocationReach?.length ?? 0) > 0,
};

const PROFILE_CHECKS: Record<string, (c: Candidate) => boolean> = {
  ic: (c) => !!c.ic,
  float: (c) => isAffirmative(c.float),
  specialist: (c) => !!c.specialist,
};

export function applyFilters(
  candidates: Candidate[],
  filters: Filters,
): Candidate[] {
  const {
    profession = [],
    environment = [],
    shift = [],
    employment = [],
    mobility = [],
    profile = [],
  } = filters;

  return candidates.filter((c) => {
    // Profession: OR within the group
    if (
      profession.length &&
      !profession.some((p) => norm(p) === norm(c.code))
    ) {
      return false;
    }
    // checking availability
    if (filters.availability.length && !filters.availability.includes(c.avail))
      return false;

    // Environment: matches current env or environments they're open to
    // !hasAny(c.openToWorkingIn, environment)
    if (environment.length && !hasAny(c.env, environment)) {
      return false;
    }

    // Shifts
    if (shift.length && !hasAny(c.shift, shift)) return false;

    // Employment type: primary or any accepted type
    if (
      employment.length &&
      !employment.some((e) => norm(e) === norm(c.empType)) &&
      !hasAny(c.acceptedEmpTypes, employment)
    ) {
      return false;
    }

    // Mobility: AND, candidate must satisfy every checked option
    if (!mobility.every((key) => MOBILITY_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    // Profile: AND as well
    if (!profile.every((key) => PROFILE_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    return true;
  });
}

export const matchesLocation = (c: Candidate, location: string) =>
  !location || norm(c.loc) === norm(location);
