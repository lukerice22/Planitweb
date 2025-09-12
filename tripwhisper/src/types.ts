// src/types.ts

// Trip preferences
export type Budget = "low" | "mid" | "high";
export type Pace = "chill" | "balanced" | "packed";
export type Block = "morning" | "afternoon" | "evening";

export type Prefs = {
  interests: string[];        // examples: food, nature, museums, nightlife, views, culture, hidden
  budget: Budget;             // used lightly for now
  pace: Pace;                 // controls how many blocks per day
};

// Geocoding result
export type CityGeo = {
  name: string;               // display name from Nominatim
  lat: number;
  lon: number;
};

// Raw Overpass element we care about
export type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

// Normalized POI used internally before activity shaping
export type Poi = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  tags: Record<string, string>;
};

// App level activity object
export type Activity = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  tags: string[];             // normalized categories that match Prefs.interests
  best_time: Block[];         // when this activity fits best
  blurb: string;              // short human friendly description
};

// Itinerary structures
export type Slot = {
  block: Block;
  activity: Activity | null;
};

export type DayPlan = {
  day: number;      // 1-based day index
  slots: Slot[];
};

export type Itinerary = DayPlan[];

// API function shapes
export type GeocodeFn = (city: string) => Promise<CityGeo>;
export type FetchPoisFn = (lat: number, lon: number, radius?: number) => Promise<Poi[]>;

// Engine function shapes
export type BuildItineraryStaticFn = (
  activities: Activity[],
  prefs: Prefs,
  days: number
) => Itinerary;

export type BuildItineraryDynamicFn = (
  activities: Activity[],
  prefs: Prefs,
  days: number,
  cityLat: number,
  cityLon: number
) => Itinerary;

// Utility
export type MapsLinkFn = (nameOrLat: string | number, maybeLon?: number) => string;
