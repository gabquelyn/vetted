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
    confirmed = [],
  } = filters;

  const filtered = candidates.filter((c) => {
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
      !hasAny([...c.env], environment)
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

    // Mobility: AND
    if (!mobility.every((key) => MOBILITY_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    // Profile: AND
    if (!profile.every((key) => PROFILE_CHECKS[key]?.(c) ?? true)) {
      return false;
    }

    // Confirmed
    if (confirmed.length > 0) {
      const maxDays = Number(confirmed[0]);
      if (!(c.confirmedDays <= maxDays)) return false;
    }

    return true;
  });

  return filtered;
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


export function dedupeByPerson(list: Candidate[]): Candidate[] {
  const seen = new Set<string>();
  return list.filter((c) => {
    if (c.personId == null) return true;
    if (seen.has(c.personId)) return false;
    seen.add(c.personId);
    return true;
  });
}