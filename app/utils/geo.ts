export type LatLng = [lat: number, lng: number];

// Same coordinates as the HTML's FD_CITY_COORDS. Keys match candidate.loc exactly.
export const CITY_COORDS: Record<string, LatLng> = {
  "Mississauga, ON": [43.589, -79.6441],
  "Oakville, ON": [43.4675, -79.6877],
  "Milton, ON": [43.5183, -79.8774],
  "Burlington, ON": [43.3255, -79.799],
  "Hamilton, ON": [43.2557, -79.8711],
  "Cornwall, ON": [45.0217, -74.7305],
  "St. Catharines, ON": [43.1594, -79.2469],
  "Niagara Falls, ON": [43.0896, -79.0849],
  "Barrie, ON": [44.3894, -79.6903],
  "Vaughan, ON": [43.8563, -79.5085],
  "Toronto, ON": [43.6532, -79.3832],
  "Ottawa, ON": [45.4215, -75.6972],
  "London, ON": [42.9849, -81.2453],
  "Kitchener, ON": [43.4516, -80.4925],
  "Waterloo, ON": [43.4643, -80.5204],
  "Guelph, ON": [43.5448, -80.2482],
  "Brampton, ON": [43.7315, -79.7624],
  "Markham, ON": [43.8561, -79.337],
  "Richmond Hill, ON": [43.8828, -79.4403],
  "Kingston, ON": [44.2312, -76.486],
  "Windsor, ON": [42.3149, -83.0364],
  "Goderich, ON": [43.7501, -81.7076],
  "Seaforth, ON": [43.5501, -81.3937],
  "Oshawa, ON": [43.8971, -78.8658],
};

export const haversineKm = (a: LatLng, b: LatLng) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

/** Exact, case-insensitive match against a supported city, else null. */
export const resolveCity = (input: string): string | null => {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  return Object.keys(CITY_COORDS).find((c) => c.toLowerCase() === q) ?? null;
};

export type LocationMatch = "local" | "relocation" | null;

/**
 * Same rules as the HTML's 'location' criterion:
 *  - resolved city  -> within radius (or relocationReach includes the city)
 *  - unresolved text -> substring match on candidate.loc
 */
export const locationMatch = (
  c: { loc: string; relocationReach?: string[] },
  location: string,
  radiusKm: number,
): LocationMatch => {
  if (!location.trim()) return "local";

  const origin = resolveCity(location);
  if (!origin) {
    return c.loc.toLowerCase().includes(location.trim().toLowerCase())
      ? "local"
      : null;
  }

  const from = CITY_COORDS[origin];
  const to = CITY_COORDS[c.loc];
  if (from && to && haversineKm(from, to) <= radiusKm) return "local";

  // Candidate-confirmed willingness to relocate there. Not the same as being local.
  if (c.relocationReach?.includes(origin)) return "relocation";

  return null;
};

export const distanceBetweenCitiesKm = (
  fromCity: string,
  toCity: string,
): number | undefined => {
  // Accept "Toronto" as well as "Toronto, ON"
  const resolve = (c: string) => resolveCity(c) ?? resolveCity(`${c}, ON`);

  const from = resolve(fromCity);
  const to = resolve(toCity);
  if (!from || !to) return undefined;

  // Same-city candidates come out as 0 (both use the city centroid), so show at least 1 km
  return Math.max(1, Math.round(haversineKm(CITY_COORDS[from], CITY_COORDS[to])));
};