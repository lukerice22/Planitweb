import { useMemo, useState } from "react";
import { geocodeCity, fetchPOIs } from "./api";
import { toActivities, buildItineraryDynamic, mapsLinkByCoords } from "./engine";
import type { Budget, Pace, Block, Prefs } from "./types";
import {
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiZap,
  FiMap,
  FiClipboard,
  FiDownload,
  FiExternalLink,
  FiCompass,
  FiSunrise,
  FiSun,
  FiSunset,
} from "react-icons/fi";

/* ------------ Component ------------ */

export default function App() {
  const [city, setCity] = useState("San Diego");
  const [days, setDays] = useState(3 as number);
  const [budget, setBudget] = useState<Budget>("mid");
  const [pace, setPace] = useState<Pace>("balanced");
  const [interests, setInterests] = useState<string[]>(["food", "nature", "museums", "views"]);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  type ActivityT = ReturnType<typeof toActivities>[number];
  const [result, setResult] = useState<{
    cityName: string;
    center: { lat: number; lon: number };
    plan: { day: number; slots: { block: Block; activity: ActivityT | null }[] }[];
  } | null>(null);

  const interestOptions = useMemo(
    () => ["food", "nature", "museums", "nightlife", "views", "culture", "hidden"],
    []
  );

  function toggleInterest(tag: string) {
    setInterests((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  async function generate() {
    const trimmed = city.trim();
    if (!trimmed) {
      setError("Please enter a city.");
      return;
    }
    const clampedDays = Math.max(1, Math.min(7, Number(days) || 1));

    setError(null);
    setToast(null);
    setLoading(true);

    try {
      const geo = await geocodeCity(trimmed);
      const pois = await fetchPOIs(geo.lat, geo.lon, 12000);
      const activities = toActivities(pois).filter((a) => a.tags.length > 0);

      if (activities.length < 3) {
        setError("Could not find enough places for that city. Try a different city or run again.");
        setResult(null);
        return;
      }

      const prefs: Prefs = { interests, budget, pace };
      const plan = buildItineraryDynamic(activities, prefs, clampedDays, geo.lat, geo.lon);

      setResult({
        cityName: geo.name,
        center: { lat: geo.lat, lon: geo.lon },
        plan,
      });

      setToast("Itinerary ready");
      setTimeout(() => setToast(null), 1400);
    } catch (e: any) {
      setResult(null);
      setError(e?.message || "Something went wrong—try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyText() {
    if (!result) return;
    const lines: string[] = [];
    lines.push(`TripWhisper Plan for ${result.cityName}`);
    lines.push("");
    for (const day of result.plan) {
      lines.push(`Day ${day.day}`);
      for (const slot of day.slots) {
        const label = cap(slot.block);
        if (slot.activity) {
          lines.push(`  ${label}: ${slot.activity.name} — ${slot.activity.blurb}`);
        } else {
          lines.push(`  ${label}: Open block`);
        }
      }
      lines.push("");
    }
    await navigator.clipboard.writeText(lines.join("\n"));
    setToast("Copied to clipboard");
    setTimeout(() => setToast(null), 1000);
  }

  function printPDF() {
    window.print();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      generate();
    }
  }

  return (
  <div style={page}>
    {/* Full-width blue top bar (hide on print) */}
    <div className="no-print" style={topBar}>
      <div style={topInner}>
        <div style={brandBadge}>
          TripBuilder: Built by Luke Rice | riceluke@msu.edu
        </div>
        <h1 style={h1}>Instantly build an itinerary for your trip</h1>
        <p style={subtitle}>
          Itinerary builder using open data. Works for any city. Private and free.
        </p>
      </div>
    </div>

    {/* Content container */}
    <div style={shell}>
      <section style={grid}>
        {/* SETTINGS CARD (hide on print) */}
        <div className="no-print">
          <Card>
            <h2 style={cardTitle}>
              <span style={iconWrap}><FiCompass /></span> Trip Settings
            </h2>

            <div style={inputGroup}>
              <label style={label} htmlFor="city">
                <span style={iconWrapSm}><FiMapPin /></span> Destination
              </label>
              <input
                id="city"
                value={city}
                onKeyDown={onKeyDown}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city, like Paris or New York"
                style={input}
                aria-label="Destination city"
              />
            </div>

            <div style={inputGroup}>
              <label style={label} htmlFor="days">
                <span style={iconWrapSm}><FiCalendar /></span> Days (1–7)
              </label>
              <input
                id="days"
                type="number"
                min={1}
                max={7}
                value={days}
                onChange={(e) =>
                  setDays(Math.max(1, Math.min(7, Number(e.target.value) || 1)))
                }
                style={numberInput}
                aria-label="Number of days"
              />
            </div>

            <div style={twoCol}>
              <div style={inputGroup}>
                <label style={label}>
                  <span style={iconWrapSm}><FiDollarSign /></span> Budget
                </label>
                <div style={row}>
                  {(["low", "mid", "high"] as const).map((b) => (
                    <Pill key={b} active={budget === b} onClick={() => setBudget(b)}>
                      {cap(b)}
                    </Pill>
                  ))}
                </div>
              </div>

              <div style={inputGroup}>
                <label style={label}>
                  <span style={iconWrapSm}><FiZap /></span> Pace
                </label>
                <div style={row}>
                  {(["chill", "balanced", "packed"] as const).map((p) => (
                    <Pill key={p} active={pace === p} onClick={() => setPace(p)}>
                      {cap(p)}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <div style={inputGroup}>
              <label style={label}>Interests</label>
              <div style={wrap}>
                {interestOptions.map((t) => (
                  <Tag
                    key={t}
                    active={interests.includes(t)}
                    onClick={() => toggleInterest(t)}
                  >
                    {cap(t)}
                  </Tag>
                ))}
              </div>
            </div>

            <button onClick={generate} style={primaryBtn} disabled={loading}>
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>

            <p style={muted}>
              Uses OpenStreetMap data. Results vary by city/time.
            </p>

            {error && <div style={errorBox}>{error}</div>}
          </Card>
        </div>

        {/* ITINERARY CARD (print only this) */}
        <div id="printable-itinerary">
          <Card>
            <div style={cardHeader} className="no-print">
              <h2 style={cardTitle}>
                <span style={iconWrap}><FiMap /></span> Your Itinerary
              </h2>
              <div style={buttonGroup}>
                <button style={ghostBtn} onClick={copyText} disabled={!result}>
                  <FiClipboard /> <span style={{ marginLeft: 6 }}>Copy</span>
                </button>
                <button style={ghostBtn} onClick={printPDF} disabled={!result}>
                  <FiDownload /> <span style={{ marginLeft: 6 }}>Export</span>
                </button>
              </div>
            </div>

            {!result && <EmptyState />}

            {result && (
              <div style={itineraryContent} className="itinerary-scroll">
                <div style={banner}>
                  <div style={cityName}>{result.cityName}</div>
                  <div style={mutedSmall}>
                    Center {result.center.lat.toFixed(3)}, {result.center.lon.toFixed(3)}
                  </div>
                </div>

                <div style={daysContainer}>
                  {result.plan.map((day) => (
                    <div key={day.day} style={dayCard} className="day-card">
                      <h3 style={dayTitle}>Day {day.day}</h3>
                      <div style={slotsGrid}>
                        {day.slots.map((slot) => (
                          <div key={slot.block} style={slotCard}>
                            <div style={slotHeader}>
                              <span style={slotLabel}>
                                {slot.block === "morning" && <FiSunrise style={{ marginRight: 6 }} />}
                                {slot.block === "afternoon" && <FiSun style={{ marginRight: 6 }} />}
                                {slot.block === "evening" && <FiSunset style={{ marginRight: 6 }} />}
                                {cap(slot.block)}
                              </span>
                            </div>
                            {slot.activity ? (
                              <div style={activityContent}>
                                <div style={activityName}>{slot.activity.name}</div>
                                <div style={activityBlurb}>{slot.activity.blurb}</div>
                                <a
                                  href={mapsLinkByCoords(
                                    slot.activity.lat,
                                    slot.activity.lon,
                                    slot.activity.name
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={mapsLink}
                                >
                                  <FiExternalLink style={{ marginRight: 6 }} />
                                  Open in Maps
                                </a>
                              </div>
                            ) : (
                              <div style={openBlock}>
                                <span>Open block</span>
                                <span style={mutedSmall}>Perfect for spontaneous discoveries</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>

    {toast && <Toast>{toast}</Toast>}
  </div>
);
}

/* ------------ UI Bits ------------ */

function Card({ children }: { children: React.ReactNode }) {
  return <div style={card}>{children}</div>;
}

function EmptyState() {
  return (
    <div style={empty}>
      <FiCompass size={44} />
      <div style={emptyTitle}>Ready for your next adventure?</div>
      <div style={emptyText}>
        Choose a destination and preferences, then generate your personalized plan.
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...pill,
        background: active ? "#49d331ff" : "white",
        color: active ? "white" : "#111827",
        borderColor: active ? "#119f2bff" : "#e5e7eb",
      }}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Tag({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...tag,
        background: active ? "#e6f0ff" : "white",
        borderColor: active ? "#3b82f6" : "#e5e7eb",
        color: "#0f172a",
      }}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Toast({ children }: { children: React.ReactNode }) {
  return <div style={toastBox}>{children}</div>;
}

/* ------------ Helpers & Styles ------------ */

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ---------- Styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100dvh",
  background: "#f6f7fb",
  display: "flex",
  flexDirection: "column",
};

/* Full-width blue header */
const topBar: React.CSSProperties = {
  width: "100%",
  background: "#0ea5e9",
  color: "white",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};
const topInner: React.CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "20px 16px",
};
const brandBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "rgba(255,255,255,.15)",
  border: "1px solid rgba(255,255,255,.3)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.3,
};
const h1: React.CSSProperties = {
  margin: "8px 0 4px",
  fontSize: "clamp(22px, 4vw, 34px)",
  fontWeight: 800,
  letterSpacing: -0.4,
};
const subtitle: React.CSSProperties = {
  margin: 0,
  color: "rgba(255,255,255,.95)",
  maxWidth: 820,
  fontSize: 14,
  lineHeight: 1.5,
};

const shell: React.CSSProperties = {
  maxWidth: 1280,
  width: "100%",
  margin: "0 auto",
  padding: "16px",
  flex: 1,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginTop: 16,
  transition: "background 0.2s ease, transform 0.1s ease",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  padding: 16,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const cardTitle: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: 18,
  fontWeight: 800,
  color: "#0f172a",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const iconWrap: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 6,
  background: "#e0f2fe",
  color: "#0ea5e9",
};
const iconWrapSm: React.CSSProperties = { ...iconWrap, width: 20, height: 20, borderRadius: 4 };

const cardHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
  gap: 8,
  flexWrap: "wrap",
};

const buttonGroup: React.CSSProperties = { display: "flex", gap: 8 };

const inputGroup: React.CSSProperties = {
  marginBottom: 12,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: 12,
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  color: "#334155",
  marginBottom: 6,
  fontWeight: 700,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14,
  background: "#ffffff",
  color: "#0f172a",
  caretColor: "#0ea5e9",
};

const numberInput: React.CSSProperties = {
  ...input,
  width: 120,
};

const row: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };

const twoCol: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const wrap: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #2f64d6ff",
  background: "#399de5ff",
  color: "white",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "white",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
  color: "#0f172a",
};

const muted: React.CSSProperties = {
  color: "#64748b",
  fontSize: 12,
  marginTop: 10,
  textAlign: "center",
};

const mutedSmall: React.CSSProperties = { color: "#94a3b8", fontSize: 12 };

const errorBox: React.CSSProperties = {
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
  padding: 10,
  borderRadius: 10,
  marginTop: 10,
  fontSize: 13,
};

const banner: React.CSSProperties = {
  background: "#f8fafc",
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  border: "1px solid #e2e8f0",
};

const cityName: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 16,
  color: "#0f172a",
  marginBottom: 2,
};

const itineraryContent: React.CSSProperties = {
  maxHeight: 560,
  overflowY: "auto",
  paddingRight: 4,
};

const daysContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const dayCard: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 10,
  padding: 12,
  border: "1px solid #e2e8f0",
};

const dayTitle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 16,
  fontWeight: 800,
  color: "#0f172a",
};

const slotsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 8,
};

const slotCard: React.CSSProperties = {
  background: "#f8fafc",
  borderRadius: 10,
  padding: 12,
  border: "1px solid #e5e7eb",
};

const slotHeader: React.CSSProperties = { marginBottom: 6 };

const slotLabel: React.CSSProperties = {
  fontWeight: 200,
  color: "#3b3b3bff",
  fontSize: 13,
  display: "inline-flex",
  alignItems: "center",
};

const activityContent: React.CSSProperties = { display: "grid", gap: 6 };

const activityName: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 15,
  color: "#0f172a",
};

const activityBlurb: React.CSSProperties = {
  color: "#64748b",
  fontSize: 13,
  lineHeight: 1.45,
};

const mapsLink: React.CSSProperties = {
  color: "#0ea5e9",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
};

const openBlock: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  color: "#64748b",
  fontSize: 13,
};

const pill: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 13,
  background: "white",
};

const tag: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  fontSize: 13,
  cursor: "pointer",
  fontWeight: 700,
  background: "white",
  color: "#0f172a",
};

const empty: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  gap: 8,
  padding: "32px 12px",
  textAlign: "center",
  color: "#0f172a",
};

const emptyTitle: React.CSSProperties = { fontWeight: 700, fontSize: 16 };
const emptyText: React.CSSProperties = {
  color: "#64748b",
  fontSize: 13,
  lineHeight: 1.4,
  maxWidth: 320,
};

const toastBox: React.CSSProperties = {
  position: "fixed",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#111827",
  color: "white",
  padding: "8px 12px",
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  zIndex: 50,
};

/* ---------- Responsive tweaks (optional via index.css)
@media (max-width: 900px) {
  section { grid-template-columns: 1fr !important; }
}
---------- */
