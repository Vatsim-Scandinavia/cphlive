"use client"
import React, { useMemo, useState, useEffect, useRef } from "react";
import Papa from "papaparse";

/**
 * Copenhagen Live – Controller Dashboard
 * ------------------------------------------------------------
 * What it does
 * - Lets you upload/paste the provided CSV (semicolon or comma separated)
 * - Parses into a schedule: positions × time (30‑min) with controller names
 * - Forward‑fills coverage so each slot shows who is in charge until handover
 * - Highlights the current time + shows each position’s next handover time
 * - Filters by position and controller name; quick jump to a position
 * - Exports expanded, forward‑filled schedule as CSV (for printing/sharing)
 *
 * Expected CSV headers (case‑insensitive):
 *   Timeframe OR Time, then one column per position (e.g., EKCH_DEL, EKCH_A_GND, ...)
 *   Rows are times like 06:00, 06:30, 07:00, ... up to 00:00
 */

// —— Utilities ——
const parseTimeToMinutes = (t: string): number => {
  // Accept HH:MM or HH:MM:SS
  const m = /^\s*(\d{1,2}):(\d{2})(?::(\d{2}))?\s*$/.exec(t || "");
  if (!m) return NaN;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  return hh * 60 + mm;
};

const minutesToHHMM = (m: number): string => {
  const hh = Math.floor(m / 60) % 24;
  const mm = m % 60;
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
};

type RawRow = Record<string, string>;

// Build a default timeline from 06:00 to 00:00 (inclusive) in 30‑minute steps
const buildDefaultTimeline = (): string[] => {
  const start = 6 * 60; // 06:00
  const end = 24 * 60;  // 00:00 (next day)
  const out: string[] = [];
  for (let m = start; m <= end; m += 30) out.push(minutesToHHMM(m));
  return out;
};

// Forward‑fill each position across the timeline
function forwardFill(schedule: Record<string, Record<string, string>>, times: string[]) {
  const result: Record<string, Record<string, string>> = {};
  for (const pos of Object.keys(schedule)) {
    result[pos] = {};
    let current = "";
    for (const t of times) {
      const val = (schedule[pos] && schedule[pos][t]) || "";
      if (val && val.trim()) current = val.trim();
      result[pos][t] = current || "";
    }
  }
  return result;
}

// Deduce unique ordered positions from CSV headers
const getPositionsFromHeaders = (headers: string[]): string[] => {
  const timeKeys = new Set(["time", "timeframe"]);
  return headers.filter(h => !timeKeys.has(h.toLowerCase()));
};

// —— Demo template (appears until a file is loaded/pasted) ——
const DEMO_CSV = `Timeframe;EKCH_DEL;EKCH_A_GND;EKCH_C_TWR;EKCH_W_APP;EKDK_E_CTR\n06:00;Kenneth Hald;Rasmus Kleffel;;;;\n08:00;Daniel Dahl Andersen;Mikkel Petersen;;;;\n09:30;;Martin Thorsteinsson;;;;\n11:00;;Kristoffer Michelsen;;;;\n12:30;;Nicolas Zielinski;;;;\n14:00;;Tias Runberg;;;;\n15:30;;David Mortensen;;;;\n17:00;;Lasse Ostersen;;;;\n18:30;;Benjamin Jørgensen;;;;\n20:00;;Kristoffer Michelsen;;;;\n22:00;;;;;\n00:00;;;;;`;

// —— UI Bits ——
const Badge: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <span title={title} className="inline-flex items-center rounded-2xl px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-800/70">
    {children}
  </span>
);

const Pill: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <span className={`whitespace-nowrap rounded-xl px-2 py-1 text-xs font-medium ${active ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700"}`}>
    {children}
  </span>
);

// Sticky column header cell — always opaque and above the grid
const StickyCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`sticky left-0 top-[3.6rem] z-30 bg-white dark:bg-slate-950 px-3 py-2 font-medium border-r border-slate-200 dark:border-slate-800 ${className || ""}`}>{children}</div>
);

// —— Main Component ——
const ControllerDashboard: React.FC = () => {
  const [rawCSV, setRawCSV] = useState<string>("");
  const [data, setData] = useState<RawRow[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>(buildDefaultTimeline());
  const [filterPos, setFilterPos] = useState<string>("ALL");
  const [query, setQuery] = useState<string>("");
  const [jump, setJump] = useState<string>("");
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [followLive, setFollowLive] = useState<boolean>(true);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Parse CSV whenever rawCSV changes
  useEffect(() => {
    if (!rawCSV) {
      // Load CSV from public folder
      (async () => {
        try {
          const res = await fetch('/schedule.csv');
          if (res.ok) {
            const text = await res.text();
            setRawCSV(text);
          } else {
            // fallback to demo if public file missing
            setRawCSV(DEMO_CSV);
          }
        } catch (e) {
          setRawCSV(DEMO_CSV);
        }
      })();
      return;
    }
  }, []);

  useEffect(() => {
    if (!rawCSV) return;
    // Auto‑detect delimiter ; or ,
    const delimiter = rawCSV.includes(";\n") || rawCSV.includes(";") ? ";" : ",";
    Papa.parse<RawRow>(rawCSV, {
      header: true,
      delimiter,
      skipEmptyLines: true,
      transformHeader: (h: string) => h.trim(),
      complete: (res: any) => {
        const rows = (res.data as RawRow[]).filter(Boolean);
        setData(rows as RawRow[]);
        if (rows.length) {
          const headers = Object.keys(rows[0] || {});
          const pos = getPositionsFromHeaders(headers).filter(p => !/_\d+/.test(p));
          setPositions(pos);
          // Build timeline from the data if present and sane
          const timeKey = headers.find(h => h.toLowerCase() === "time" || h.toLowerCase() === "timeframe") || "Timeframe";
          const times = Array.from(new Set(rows.map((r: RawRow) => (String(r[timeKey] || "")).slice(0,5))))
            .filter(Boolean)
            .sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b));
          setTimeline(times.length ? (times as string[]) : buildDefaultTimeline());
        }
      },
    });
  }, [rawCSV]);

  const timeKey = useMemo(() => {
    if (!data.length) return "Timeframe";
    const keys = Object.keys(data[0]);
    return keys.find(k => k.toLowerCase() === "time" || k.toLowerCase() === "timeframe") || "Timeframe";
  }, [data]);

  // Build schedule map: position -> time -> controller
  const schedule = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const pos of positions) map[pos] = {};
    for (const row of data) {
      const t = (row[timeKey] || "").toString().slice(0,5);
      for (const pos of positions) {
        // Some CSV parsers may return non-string values; coerce to string first.
        const raw = row[pos];
        const v = (raw === null || raw === undefined) ? "" : String(raw);
        const trimmed = v.trim();
        if (trimmed) map[pos][t] = trimmed;
      }
    }
    return map;
  }, [data, positions, timeKey]);

  // Forward‑filled view
  const filled = useMemo(() => forwardFill(schedule, timeline), [schedule, timeline]);

  // Determine next handover per position
  const nowMinutes = (() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  })();

  const nextHandover = useMemo(() => {
    const out: Record<string, { time: string; inMin: number; nextController: string } | null> = {};

    // Determine current minutes based on live time or manual selection
    let currentMinutes = nowMinutes;
    if (!followLive && manualIndex !== null && timeline.length > 0) {
      const idx = Math.max(0, Math.min(manualIndex, timeline.length - 1));
      currentMinutes = parseTimeToMinutes(timeline[idx]);
    }

    for (const pos of positions) {
      let last = "";
      let result: { time: string; inMin: number; nextController: string } | null = null;
      for (let i = 0; i < timeline.length; i++) {
        const t = timeline[i];
        const c = filled[pos]?.[t] || "";
        if (i === 0) { last = c; continue; }
        if (c !== last) {
          const min = parseTimeToMinutes(t) - currentMinutes;
          if (min >= 0) {
            result = { time: t, inMin: min, nextController: c };
            break;
          }
          last = c;
        }
      }
      out[pos] = result;
    }
    return out;
  }, [positions, timeline, filled, nowMinutes, manualIndex, followLive]);

  // Filtered positions
  const visiblePositions = useMemo(() => {
    let list = positions.slice();
    if (filterPos !== "ALL") list = list.filter(p => p === filterPos);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(pos => Object.values(filled[pos] || {}).some(name => name && name.toLowerCase().includes(q)));
    }
    return list;
  }, [positions, filterPos, query, filled]);

  // Scroll to a position row when jumping
  useEffect(() => {
    if (!jump) return;
    const id = `row-${CSS.escape(jump)}`;
    const el = document.getElementById(id);
    if (el && gridRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [jump]);

  // Export forward‑filled table
  const handleExport = () => {
    const rows: any[] = [];
    for (const t of timeline) {
      const row: any = { Time: t };
      for (const pos of positions) row[pos] = filled[pos]?.[t] || "";
      rows.push(row);
    }
    const csv = Papa.unparse(rows, { delimiter: ";" });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "controller_schedule_filled.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Current time as a vertical guide (nearest slot)
  const nearestSlot = useMemo(() => {
    const diffs = timeline.map(t => Math.abs(parseTimeToMinutes(t) - nowMinutes));
    const i = diffs.indexOf(Math.min(...diffs));
    return Math.max(0, i);
  }, [timeline, nowMinutes]);

  // When timeline changes, reset manual mode to follow live by default
  useEffect(() => {
    setManualIndex(null);
    setFollowLive(true);
  }, [timeline]);

  // Column widths (fixed) for a clean grid
  const colWidth = 140; // px per 30‑min slot

  // Compute which slot is displayed (live or manual)
  const displayedSlot = useMemo(() => (followLive ? nearestSlot : (manualIndex ?? 0)), [followLive, nearestSlot, manualIndex]);

  // Center the active column in the horizontal scrollable area when displayedSlot changes
  useEffect(() => {
    const container = scrollRef.current;
    const header = headerRef.current;
    if (!container || !header || timeline.length === 0) return;

  // Each column width matches colWidth; left fixed column width is 275px
  const slotWidth = colWidth;
  const sticky = 275;
    const targetIndex = Math.max(0, Math.min(displayedSlot, timeline.length - 1));

    // Calculate the x position of the center of the target column relative to the scroll container
    const xCenter = sticky + (targetIndex + 0.5) * slotWidth;
    const containerWidth = container.clientWidth;
    const scrollTo = Math.max(0, xCenter - containerWidth / 2);

    // Smooth scroll
    try {
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    } catch (e) {
      container.scrollLeft = scrollTo;
    }
  }, [displayedSlot, timeline, colWidth]);

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur">
        <div className="mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Copenhagen Live – Controller Dashboard</h1>
            <Badge title="Auto‑fills coverage & highlights handovers">v1</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm opacity-70">Time</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, timeline.length - 1)}
                  value={manualIndex ?? nearestSlot}
                  onChange={(e) => { setManualIndex(Number(e.target.value)); setFollowLive(false); }}
                  className="w-48"
                />
                <button onClick={() => { setManualIndex(null); setFollowLive(true); }} className="rounded-2xl px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">Auto</button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mx-auto px-4 pb-3">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className="ml-auto text-sm opacity-70">
              Local time: {minutesToHHMM(nowMinutes)}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: stacked cards (visible only on small screens) */}
  <div className="mx-auto px-4 py-6 block sm:hidden view-fade-slide mobile-view">
        {visiblePositions.map(pos => {
          const row = filled[pos] || {};
          const handover = nextHandover[pos];
          const nowName = row[timeline[displayedSlot]] || "";
          return (
            <div key={`card-${pos}`} className="mb-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{pos}</div>
                <div className="text-xs text-slate-500">Now: <span className="font-medium">{nowName || '—'}</span></div>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {handover ? (<span>Next {handover.time} — {handover.nextController || 'TBD'}</span>) : (<span>No upcoming handover</span>)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: fixed left column + horizontally scrollable timeline (desktop only) */}
  <div className="mx-auto px-4 py-6 hidden sm:block view-fade-slide desktop-view" ref={gridRef}>
  <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="w-full">
            <div ref={scrollRef} className="overflow-x-auto">
              <table className="w-max border-collapse" style={{ minWidth: `${(timeline.length + 1) * colWidth + 275 - colWidth}px` }}>
                <colgroup>
                  <col style={{ width: `275px` }} />
                  {timeline.map((_, i) => (
                    <col key={`col-${i}`} style={{ width: `${colWidth}px` }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th className="sticky left-0 top-[3.6rem] z-30 bg-white dark:bg-slate-900 px-3 py-3 font-medium border-r border-slate-200 dark:border-slate-800">Position</th>
                    {timeline.map((t) => (
                      <th key={`th-${t}`} className="sticky top-[3.6rem] z-10 border-l border-slate-100 dark:border-slate-800 px-3 py-3 text-xs text-slate-500 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-center">{t}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visiblePositions.map((pos) => {
                    const row = filled[pos] || {};
                    const handover = nextHandover[pos];
                    return (
                      <tr key={`row-${pos}`}>
                        <td id={`row-${pos}`} className="border-t border-slate-100 dark:border-slate-800 px-3 py-2 align-top sticky left-0 z-20 bg-white dark:bg-slate-950">
                          <div className="font-semibold">{pos}</div>
                          {handover ? (
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              Next handover <Pill>{handover.time}</Pill>
                              <span className="opacity-70">→</span>
                              <Pill>{handover.nextController || "TBD"}</Pill>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500">No upcoming handover</div>
                          )}
                        </td>
                        {timeline.map((t, idx) => {
                          const name = row[t] || "";
                          const isNow = idx === displayedSlot;
                          return (
                            <td key={`${pos}-${t}`} className={`border-t border-l border-slate-100 dark:border-slate-800 px-3 py-2 align-top ${isNow ? "bg-blue-50/60 dark:bg-blue-900/20" : ""}`}>
                              {name ? <Pill active={false}>{name}</Pill> : <span className="opacity-30 text-xs">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ControllerDashboard;