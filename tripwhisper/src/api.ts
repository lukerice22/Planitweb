// src/api.ts
import type {
  CityGeo,
  OverpassElement,
  Poi,
  GeocodeFn,
  FetchPoisFn,
} from "./types";

/* ===========================
   Politeness & Caching
=========================== */

const geocodeCache = new Map<string, CityGeo>();
const poisCache = new Map<string, Poi[]>();
const searchCache = new Map<string, Poi[]>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const COMMON_HEADERS: HeadersInit = {
  "Accept-Language": "en",
  // A friendly User-Agent helps OSM operators; keep it non-commercial.
  "User-Agent": "TripWhisper/1.0 (student project; https://openstreetmap.org)",
};

/* ===========================
   Geocoding (Nominatim)
=========================== */

export const geocodeCity: GeocodeFn = async (city: string) => {
  const key = city.trim().toLowerCase();
  if (geocodeCache.has(key)) return geocodeCache.get(key)!;

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(city)}` +
    `&format=json&limit=1`;

  const res = await fetch(url, { headers: COMMON_HEADERS });
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);

  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    boundingbox?: [string, string, string, string]; // [south, north, west, east]
  }>;

  if (!data?.length) throw new Error("City not found");

  const { lat, lon, display_name } = data[0];
  const geo: CityGeo = {
    name: display_name,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };

  geocodeCache.set(key, geo);
  return geo;
};

/* ===========================
   Overpass (POIs)
   - mirrors for reliability
   - split queries (attractions vs food/nightlife)
=========================== */

const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
];

async function overpassRequest(body: string) {
  let lastErr: any;
  for (const url of OVERPASS_MIRRORS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          ...COMMON_HEADERS,
        },
        body,
      });
      if (res.ok) return res.json();
      lastErr = new Error(`Overpass ${url} failed (${res.status})`);
    } catch (e) {
      lastErr = e;
    }
    // small pause before trying next mirror
    await sleep(200);
  }
  throw lastErr ?? new Error("All Overpass mirrors failed");
}

function qAttractions(lat: number, lon: number, r: number) {
  return `
[out:json][timeout:60];
(
  node["tourism"~"attraction|museum|gallery|viewpoint"]["name"](around:${r},${lat},${lon});
  way["tourism"~"attraction|museum|gallery|viewpoint"]["name"](around:${r},${lat},${lon});
  relation["tourism"~"attraction|museum|gallery|viewpoint"]["name"](around:${r},${lat},${lon});

  node["historic"]["name"](around:${r},${lat},${lon});
  way["historic"]["name"](around:${r},${lat},${lon});
  relation["historic"]["name"](around:${r},${lat},${lon});

  node["leisure"~"park|garden"]["name"](around:${r},${lat},${lon});
  way["leisure"~"park|garden"]["name"](around:${r},${lat},${lon});
  relation["leisure"~"park|garden"]["name"](around:${r},${lat},${lon});
);
out center 300;
`;
}

function qFoodNightlife(lat: number, lon: number, r: number) {
  return `
[out:json][timeout:60];
(
  node["amenity"~"restaurant|cafe|fast_food|food_court|bar|pub|nightclub"]["name"](around:${r},${lat},${lon});
  way["amenity"~"restaurant|cafe|fast_food|food_court|bar|pub|nightclub"]["name"](around:${r},${lat},${lon});
  relation["amenity"~"restaurant|cafe|fast_food|food_court|bar|pub|nightclub"]["name"](around:${r},${lat},${lon});

  node["shop"="marketplace"]["name"](around:${r},${lat},${lon});
  way["shop"="marketplace"]["name"](around:${r},${lat},${lon});
  relation["shop"="marketplace"]["name"](around:${r},${lat},${lon});
);
out center 300;
`;
}

function normalizeElement(e: OverpassElement): Poi | null {
  const tags = e.tags ?? {};
  const name = tags["name"];
  if (!name) return null;
  const lat = e.lat ?? e.center?.lat;
  const lon = e.lon ?? e.center?.lon;
  if (typeof lat !== "number" || typeof lon !== "number") return null;

  return { id: e.id, name, lat, lon, tags };
}

export const fetchPOIs: FetchPoisFn = async (lat, lon, radius = 12000) => {
  const key = `${lat.toFixed(4)},${lon.toFixed(4)}:${radius}:v2`;
  if (poisCache.has(key)) return poisCache.get(key)!;

  await sleep(120); // be polite

  // Run two smaller category queries in parallel
  const [aJson, fJson] = await Promise.all([
    overpassRequest(qAttractions(lat, lon, radius)),
    overpassRequest(qFoodNightlife(lat, lon, radius)),
  ]);

  const elems = [
    ...(aJson?.elements ?? []),
    ...(fJson?.elements ?? []),
  ] as OverpassElement[];

  const pois: Poi[] = elems
    .map(normalizeElement)
    .filter((p): p is Poi => !!p)
    // de-dupe by name + rounded coords
    .filter((p, idx, arr) => {
      const sig = `${p.name}|${p.lat.toFixed(4)},${p.lon.toFixed(4)}`;
      return idx === arr.findIndex(
        (q) => `${q.name}|${q.lat.toFixed(4)},${q.lon.toFixed(4)}` === sig
      );
    });

  poisCache.set(key, pois);
  return pois;
};

/* ===========================
   Convenience: city -> POIs
=========================== */

export async function fetchCityAndPois(city: string, radius = 12000) {
  const geo = await geocodeCity(city);
  const pois = await fetchPOIs(geo.lat, geo.lon, radius);
  return { geo, pois };
}

/* ===========================
   Text Search for "Real Places" (no keys)
   - Uses Nominatim search bounded to the city viewbox
   - Great for validating user-typed names or offering suggestions
=========================== */

/**
 * Search for named places within a city's bounding box (Nominatim).
 * NOTE: This is lightweight lookup, not high-volume autocomplete.
 */
export async function searchPlacesInCity(
  city: string,
  query: string,
  limit = 8
): Promise<Poi[]> {
  const cacheKey = `${city.toLowerCase()}|${query.toLowerCase()}|${limit}`;
  if (searchCache.has(cacheKey)) return searchCache.get(cacheKey)!;

  // 1) geocode city to get its bounding box
  const urlCity =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(city)}` +
    `&format=json&limit=1&polygon_geojson=0&addressdetails=0`;

  const resCity = await fetch(urlCity, { headers: COMMON_HEADERS });
  if (!resCity.ok) throw new Error(`City lookup failed (${resCity.status})`);
  const arrCity = (await resCity.json()) as Array<{
    boundingbox?: [string, string, string, string]; // [south, north, west, east]
  }>;
  if (!arrCity?.length || !arrCity[0].boundingbox) return [];

  const [south, north, west, east] = arrCity[0].boundingbox.map((s) => parseFloat(s));

  // 2) do a bounded name search inside that box
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(query)}` +
    `&format=json&limit=${limit}` +
    `&viewbox=${west},${north},${east},${south}` +
    `&bounded=1`;

  await sleep(120); // be polite
  const res = await fetch(url, { headers: COMMON_HEADERS });
  if (!res.ok) throw new Error(`Search failed (${res.status})`);

  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  const pois: Poi[] = data.map((d, i) => ({
    id: i, // Nominatim doesn't give stable numeric ids here; ok for lookup list
    name: d.display_name,
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    tags: {}, // unknown; this is just for validating/choosing a place
  }));

  searchCache.set(cacheKey, pois);
  return pois;
}