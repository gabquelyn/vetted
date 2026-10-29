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
  travel: (c) => c.travelOpen === true,
  rural: (c) => c.ruralOpen === true,
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
    openTo = [],
    availability = [],
  } = filters;

  return candidates.filter((c) => {
    // Profession: OR within the group
    if (
      profession.length &&
      !profession.some((p) => norm(p) === norm(c.code))
    ) {
      return false;
    }

    // Availability
    if (availability.length && !availability.includes(c.avail)) {
      return false;
    }

    // Candidate is open to any work environment
    const acceptsAnyEnvironment = c.openToWorkingIn.some(
      (env) => norm(env) === norm("Any work environment"),
    );

    // Environment: current experience or willingness to work there
    if (
      environment.length &&
      !acceptsAnyEnvironment &&
      !hasAny([...c.env, ...c.openToWorkingIn], environment)
    ) {
      return false;
    }

    // Open-to environment
    if (
      openTo.length &&
      !acceptsAnyEnvironment &&
      !hasAny(c.openToWorkingIn, openTo)
    ) {
      return false;
    }

    // Shifts
    if (shift.length && !hasAny(c.shift, shift)) {
      return false;
    }

    // Employment type: primary or any accepted type
    if (
      employment.length &&
      !employment.some((e) => norm(e) === norm(c.empType)) &&
      !hasAny(c.acceptedEmpTypes ?? [], employment)
    ) {
      return false;
    }

    // Mobility: AND — candidate must satisfy every checked option
    if (!mobility.every((key) => MOBILITY_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    // Profile: AND
    if (!profile.every((key) => PROFILE_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    return true;
  });
}

export const withMobilityFlags = (c: Candidate): Candidate => {
  const r = (c.rural ?? "").toLowerCase();
  return {
    ...c,
    ruralOpen:
      r.toLowerCase().includes("rural") || r.toLowerCase().includes("anywhere"),
    travelOpen: r.toLowerCase().includes("fly-in"),
  };
};

export const matchesLocation = (c: Candidate, location: string) =>
  !location || norm(c.loc) === norm(location);
