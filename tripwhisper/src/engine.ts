// src/engine.ts
import type {
  Activity,
  Block,
  Itinerary,
  Poi,
  Prefs
} from "./types";

/** Map raw OSM tags to your normalized interests */
export function classifyTags(tags: Record<string, string>): string[] {
  const out = new Set<string>();

  // Attractions / culture
  if (tags.tourism === "museum") out.add("museums");
  if (tags.tourism === "gallery") out.add("museums");
  if (tags.tourism === "attraction") out.add("views");
  if (tags.tourism === "viewpoint") out.add("views");
  if (tags.historic) out.add("culture");

  // Nature / outdoors
  if (tags.leisure === "park") out.add("nature");
  if (tags.natural) out.add("nature");

  // Food / nightlife
  if (["restaurant", "cafe", "fast_food", "food_court"].includes(tags.amenity ?? "")) {
    out.add("food");
  }
  if (tags.amenity === "bar" || tags.amenity === "pub" || tags.amenity === "nightclub") {
    out.add("nightlife");
  }

  // Hidden-ish vibe
  if (tags["tourism"] === "artwork" || tags["man_made"] === "works") out.add("hidden");

  return Array.from(out);
}

/** Rough guess for best time-of-day from tags */
export function bestTimes(tags: Record<string, string>): Block[] {
  if (tags.tourism === "viewpoint") return ["evening"]; // sunset bias
  if (tags.leisure === "park" || tags.natural) return ["morning", "afternoon"];
  if (tags.tourism === "museum" || tags.tourism === "gallery") return ["morning", "afternoon"];
  if (["restaurant", "cafe", "fast_food", "food_court", "bar", "pub", "nightclub"].includes(tags.amenity ?? "")) {
    return ["afternoon", "evening"];
  }
  return ["morning", "afternoon", "evening"];
}

/** Small human-readable blurb from tags */
export function readableBlurb(tags: Record<string, string>): string {
  if (tags.tourism === "museum" || tags.tourism === "gallery") return "Museum or gallery";
  if (tags.leisure === "park" || tags.natural) return "Park or green space";
  if (tags.tourism === "viewpoint") return "Scenic viewpoint";
  if (tags.historic) return "Historic site or monument";
  if (tags.amenity === "restaurant") return "Local restaurant";
  if (tags.amenity === "cafe") return "Cafe or coffee spot";
  if (tags.amenity === "bar" || tags.amenity === "pub" || tags.amenity === "nightclub") return "Nightlife spot";
  return "Local point of interest";
}

/** Convert POIs to internal Activity objects */
export function toActivities(pois: Poi[]): Activity[] {
  return pois.map((p) => ({
    id: String(p.id),
    name: p.name,
    lat: p.lat,
    lon: p.lon,
    tags: classifyTags(p.tags),
    best_time: bestTimes(p.tags),
    blurb: readableBlurb(p.tags),
  }));
}

/** Blocks per pace setting */
export function blocksForPace(pace: Prefs["pace"]): Block[] {
  if (pace === "chill") return ["morning", "evening"];
  if (pace === "packed") return ["morning", "afternoon", "evening"];
  return ["morning", "afternoon"]; // balanced
}

/** Simple distance (degree space) to bias toward center */
function centerBias(lat: number, lon: number, cityLat: number, cityLon: number): number {
  const d = Math.hypot(lat - cityLat, lon - cityLon);
  // reward items within ~3km of center (very rough, degree-based)
  return d < 0.03 ? 1 : 0;
}

/** Score an activity for a given block and prefs */
export function scoreActivity(
  act: Activity,
  prefs: Prefs,
  block: Block,
  cityLat: number,
  cityLon: number
): number {
  let s = 0;
  if (act.best_time.includes(block)) s += 2;
  s += act.tags.filter((t) => prefs.interests.includes(t)).length;
  // budget lightly ignored for now (no reliable OSM price data)
  s += centerBias(act.lat, act.lon, cityLat, cityLon);
  return s;
}

/** Build a multi-day plan from a pool of activities (dynamic city mode) */
export function buildItineraryDynamic(
  activities: Activity[],
  prefs: Prefs,
  days: number,
  cityLat: number,
  cityLon: number
): Itinerary {
  const plan: Itinerary = [];
  const used = new Set<string>();

  for (let d = 1; d <= days; d++) {
    const dayBlocks = blocksForPace(prefs.pace);
    const slots = dayBlocks.map((block) => {
      const pick =
        activities
          .filter((a) => !used.has(a.id))
          .sort(
            (a, b) =>
              scoreActivity(b, prefs, block, cityLat, cityLon) -
              scoreActivity(a, prefs, block, cityLat, cityLon)
          )[0] ?? null;

      if (pick) used.add(pick.id);
      return { block, activity: pick };
    });

    plan.push({ day: d, slots });
  }

  return plan;
}

/** Build a plan from a static activity list (if you ever use local data) */
export function buildItineraryStatic(
  activities: Activity[],
  prefs: Prefs,
  days: number
): Itinerary {
  // Use center 0,0 for neutral bias
  return buildItineraryDynamic(activities, prefs, days, 0, 0);
}

/** Maps helpers */
export function mapsLinkByName(name: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(name)}`;
}
export function mapsLinkByCoords(lat: number, lon: number, name?: string): string {
  const q = name ? `${name} ${lat},${lon}` : `${lat},${lon}`;
  return `https://maps.google.com/?q=${encodeURIComponent(q)}`;
}