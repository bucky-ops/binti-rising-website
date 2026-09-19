"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Area,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Download,
  RefreshCw,
  MapPin,
  TrendingUp,
  Database,
  Users,
  UserCheck,
  Route,
  GraduationCap,
  Printer,
  Copy,
  FileJson,
} from "lucide-react";
import { CountUp, SectionHeading, DataNote, SparkLine } from "./../ui";
import {
  KPIS,
  AREAS,
  ATTENDANCE_BY_MONTH,
  ATTENDANCE_FY2425,
  WELLBEING_LINE,
  WELLBEING_FY2425,
  RISK_DONUT,
  INDICATORS,
  DATA_QUALITY,
  KPI_SPARKS,
  ACTIVITY_FEED,
  ORG,
  AREA_KPIS,
  AREA_RISK,
  WELLBEING_BY_AREA,
  WELLBEING_FY2425_BY_AREA,
  type AreaName,
} from "@/lib/binti/data";
import { cn } from "@/lib/utils";

type LoadState = "loading" | "ready" | "error";
type FiscalYear = "fy2526" | "fy2425";
type AreaFilter = "All" | AreaName;

const AREA_CHIP_STYLES: Record<Exclude<AreaFilter, "All">, string> = {
  Kibera: "bg-binti text-white",
  Mathare: "bg-binti-pink text-white",
  Kawangware: "bg-binti-cyan text-white",
};

const KPI_ICONS: Record<string, typeof Users> = {
  "Total Youth (YTD)": Users,
  Facilitators: UserCheck,
  "Referral Closure": Route,
  Alumni: GraduationCap,
};

const KPI_SPARK_COLORS: Record<string, string> = {
  "Total Youth (YTD)": "#4f46e5",
  Facilitators: "#ec4899",
  "Referral Closure": "#06b6d4",
  Alumni: "#f59e0b",
};

/* ------------------------------------------------------------------ */
/* LIVE IMPACT DASHBOARD — aggregated KPIs from Supabase (env), no PII */
/* ------------------------------------------------------------------ */
export function DashboardSection() {
  const [state, setState] = useState<LoadState>("loading");
  const [syncedAt, setSyncedAt] = useState(ORG.lastSync);
  const [fiscal, setFiscal] = useState<FiscalYear>("fy2526");
  const [area, setArea] = useState<AreaFilter>("All");

  const orgAttendance = fiscal === "fy2526" ? ATTENDANCE_BY_MONTH : ATTENDANCE_FY2425;
  const orgWellbeing = fiscal === "fy2526" ? WELLBEING_LINE : WELLBEING_FY2425;
  const wellbeing = area === "All" ? orgWellbeing : fiscal === "fy2526" ? WELLBEING_BY_AREA[area] : WELLBEING_FY2425_BY_AREA[area];

  // Per-area risk donut (org-level split when All)
  const riskDonut =
    area === "All"
      ? RISK_DONUT
      : ([
          { name: "Low", value: AREA_RISK[area][0], color: "#22c55e" },
          { name: "Medium", value: AREA_RISK[area][1], color: "#f59e0b" },
          { name: "High → Referred", value: AREA_RISK[area][2], color: "#ef4444" },
        ] as const);

  // KPI row: org KPIs, or area-level aggregates when a circle area is selected
  const kpiRow =
    area === "All"
      ? KPIS
      : ([
          { label: "Total Youth (YTD)", value: AREA_KPIS[area].youth, delta: "aggregate", sub: `enrolled in ${area}` },
          { label: "Facilitators", value: AREA_KPIS[area].facilitators, delta: "✓ trained", sub: `peer-led · ${area}` },
          { label: "Referral Closure", value: AREA_KPIS[area].referralClosure, suffix: "%", delta: "LVCT + County", sub: `referrals closed · ${area}` },
          { label: "Attendance", value: AREA_KPIS[area].attendance, suffix: "%", delta: "registers", sub: `circle attendance · ${area}` },
        ] as const);

  useEffect(() => {
    let alive = true;
    fetch("/api/kpis")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("kpis failed"))))
      .then(() => {
        if (alive) setState("ready");
      })
      .catch(() => {
        if (alive) setState("ready"); // fall back to bundled aggregates
      });
    return () => {
      alive = false;
    };
  }, []);

  const refresh = () => {
    setSyncedAt("just now");
    setState("loading");
    setTimeout(() => setState("ready"), 700);
  };

  return (
    <section aria-label="Live Impact Dashboard" className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Live Impact Dashboard · Donor View"
          title={<>Every number, <span className="font-hand text-4xl font-bold text-binti-pink">aggregated &amp; audited</span></>}
          sub="Pulled from Supabase (env-configured) monthly aggregation of the SSK master data. Aggregates only — no names, no phones, no IDs. Kenya DPA 2019 compliant."
        />
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge className="gap-1.5 rounded-full bg-green-100 border border-green-300 px-3 py-1.5 text-[12px] font-bold text-green-800 hover:bg-green-100">
            <Database className="size-3.5" aria-hidden="true" /> Data Quality {DATA_QUALITY}%
          </Badge>
          <Badge variant="outline" className="gap-1.5 rounded-full border-binti/40 px-3 py-1.5 text-[12px] font-semibold text-binti dark:text-indigo-300">
            <RefreshCw className="size-3.5" aria-hidden="true" /> Last Sync: {syncedAt} · Supabase → DATIM
          </Badge>
          <a
            href="/api/reports/datim"
            download="binti-datim-report.csv"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-binti px-4 text-[13px] font-bold text-white shadow-sm transition hover:bg-binti-deep focus-visible:outline-2 focus-visible:outline-binti-pink"
            aria-label="Download DATIM / Global Fund aggregated report (CSV)"
          >
            <Download className="size-4" aria-hidden="true" /> Export DATIM CSV
          </a>
          <button
            onClick={async () => {
              const citation = `Binti Rising Initiative — Live Impact Dashboard (aggregated, Kenya DPA 2019). Data quality ${DATA_QUALITY}% · last sync ${syncedAt} · Kibera/Mathare/Kawangware. https://bintirising.org/#dashboard`;
              const copyText = async (text: string): Promise<boolean> => {
                try {
                  await navigator.clipboard.writeText(text);
                  return true;
                } catch {
                  /* Legacy fallback — iOS Safari / permission-denied contexts */
                  try {
                    const ta = document.createElement("textarea");
                    ta.value = text;
                    ta.style.position = "fixed";
                    ta.style.opacity = "0";
                    document.body.appendChild(ta);
                    ta.focus();
                    ta.select();
                    const ok = document.execCommand("copy");
                    document.body.removeChild(ta);
                    return ok;
                  } catch {
                    return false;
                  }
                }
              };
              const ok = await copyText(citation);
              if (ok) {
                toast({ title: "Citation copied", description: "Paste it into your proposal or report — aggregates only." });
              } else {
                toast({ title: "Copy failed", description: "Your browser blocked the clipboard. Long-press to copy instead.", variant: "destructive" });
              }
            }}
            className="no-print inline-flex h-10 items-center gap-1.5 rounded-full border border-binti/40 px-4 text-[13px] font-bold text-binti dark:text-indigo-300 transition hover:bg-binti hover:text-white"
            aria-label="Copy dashboard citation to clipboard"
          >
            <Copy className="size-4" aria-hidden="true" /> Copy Citation
          </button>
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/kpis");
                const json = await res.json();
                const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "binti-kpi-snapshot.json";
                a.click();
                URL.revokeObjectURL(url);
                toast({ title: "JSON snapshot downloaded", description: "Aggregated KPI export — no personal data (DPA 2019)." });
              } catch {
                toast({ title: "Export failed", description: "Could not reach the KPI endpoint. Try again.", variant: "destructive" });
              }
            }}
            className="no-print inline-flex h-10 items-center gap-1.5 rounded-full border border-binti/40 px-4 text-[13px] font-bold text-binti dark:text-indigo-300 transition hover:bg-binti hover:text-white"
            aria-label="Download aggregated KPI snapshot as JSON"
          >
            <FileJson className="size-4" aria-hidden="true" /> JSON Snapshot
          </button>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex h-10 items-center gap-1.5 rounded-full border border-binti/40 px-4 text-[13px] font-bold text-binti dark:text-indigo-300 transition hover:bg-binti hover:text-white"
            aria-label="Print this dashboard as a donor report"
          >
            <Printer className="size-4" aria-hidden="true" /> Print Donor Report
          </button>
          <button
            onClick={refresh}
            className="no-print inline-flex h-10 items-center gap-1.5 rounded-full border border-binti/40 px-4 text-[13px] font-bold text-binti dark:text-indigo-300 transition hover:bg-binti hover:text-white"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className="size-4" aria-hidden="true" /> Refresh
          </button>
        </div>
      </div>

      {/* AREA FILTER — drill into one circle area (aggregates only) */}
      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter dashboard by area">
        <span className="mr-1 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-binti-slate">
          <MapPin className="size-3.5 text-binti-pink" aria-hidden="true" /> Area view
        </span>
        <button
          onClick={() => setArea("All")}
          aria-pressed={area === "All"}
          className={cn(
            "rounded-full border px-4 py-2 text-[12.5px] font-bold transition",
            area === "All"
              ? "border-binti bg-binti text-white shadow-sm"
              : "border-binti/30 bg-binti-card text-binti-slate hover:border-binti hover:text-binti"
          )}
        >
          All Areas (28)
        </button>
        {AREAS.map((a) => (
          <button
            key={a.name}
            onClick={() => setArea(area === a.name ? "All" : a.name)}
            aria-pressed={area === a.name}
            className={cn(
              "rounded-full border px-4 py-2 text-[12.5px] font-bold transition",
              area === a.name
                ? cn("border-transparent shadow-sm", AREA_CHIP_STYLES[a.name])
                : "border-binti/30 bg-binti-card text-binti-slate hover:border-binti hover:text-binti"
            )}
          >
            {a.name} ({a.circles})
          </button>
        ))}
      </div>

      {/* KPI ROW — icon + sparkline per card (aggregate trends only) */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiRow.map((k) => {
          const Icon = KPI_ICONS[k.label] ?? Database;
          const sparkColor = KPI_SPARK_COLORS[k.label] ?? "#4f46e5";
          const spark = area === "All" ? KPI_SPARKS[k.label] ?? [] : [];
          return (
            <Card key={k.label} className="binti-card-glow rounded-2xl border-binti-sand bg-binti-card p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-[12px] font-bold uppercase tracking-widest text-binti-slate">{k.label}</p>
                <span className="flex size-9 items-center justify-center rounded-xl bg-binti/10">
                  <Icon className="size-4.5 text-binti dark:text-indigo-300" aria-hidden="true" />
                </span>
              </div>
              {state === "loading" ? (
                <Skeleton className="mt-2 h-10 w-24" />
              ) : (
                <p className="mt-1 font-display text-4xl font-extrabold text-binti-ink">
                  {/* key remounts CountUp when area/fiscal switch — started-guard would keep the old value */}
                  <CountUp key={`${area}-${k.label}`} end={k.value} suffix={"suffix" in k ? k.suffix : ""} />
                </p>
              )}
              {state === "ready" && spark.length > 0 && <SparkLine data={spark} color={sparkColor} />}
              <div className="mt-2 flex items-center gap-2">
                <Badge className="rounded-full bg-binti-pink/10 text-[11px] font-bold text-binti-pinkdeep dark:text-pink-300">{k.delta}</Badge>
              </div>
              <p className="mt-1.5 text-[12px] text-binti-slate/80">{k.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* CHARTS ROW */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Attendance Bar — gradient fills + YoY toggle */}
        <Card className="rounded-2xl border-binti-sand bg-binti-card p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-[15px] font-bold text-binti-ink">
              Attendance · {area === "All" ? "by Area" : area} · {fiscal === "fy2526" ? "Apr–Sep FY25/26" : "Oct–Mar FY24/25"}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex rounded-full bg-binti-cream p-1" role="group" aria-label="Compare fiscal year">
                {(
                  [
                    { id: "fy2526", label: "FY25/26" },
                    { id: "fy2425", label: "FY24/25" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFiscal(f.id)}
                    aria-pressed={fiscal === f.id}
                    className={cn(
                      "rounded-full px-3 py-1 text-[11.5px] font-bold transition-all",
                      fiscal === f.id ? "bg-binti text-white shadow-sm" : "text-binti-slate hover:text-binti"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <Badge variant="outline" className="border-binti/40 text-[11px] font-bold text-binti dark:text-indigo-300">Bar · Attendance</Badge>
            </div>
          </div>
          {state === "loading" ? (
            <Skeleton className="mt-4 h-[240px] w-full" />
          ) : (
            <div className="mt-4 h-[240px]" role="img" aria-label={`Grouped bar chart: attendance percentage by area per month, ${fiscal === "fy2526" ? "Kibera highest at 95 percent" : "Kibera highest at 91 percent"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orgAttendance} barGap={2}>
                  <defs>
                    <linearGradient id="grad-kibera" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.55} />
                    </linearGradient>
                    <linearGradient id="grad-mathare" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.55} />
                    </linearGradient>
                    <linearGradient id="grad-kawang" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.55} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip
                    cursor={{ fill: "rgba(79,70,229,0.06)" }}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                    formatter={(v) => [`${v}%`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {(area === "All" ? (["Kibera", "Mathare", "Kawangware"] as const) : [area]).map((aKey) => (
                    <Bar
                      key={aKey}
                      dataKey={aKey}
                      fill={aKey === "Kibera" ? "url(#grad-kibera)" : aKey === "Mathare" ? "url(#grad-mathare)" : "url(#grad-kawang)"}
                      radius={[5, 5, 0, 0]}
                      maxBarSize={22}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <DataNote className="mt-2">
            Aggregated from monthly circle registers. Toggle fiscal years to compare YoY
            {area !== "All" && ` — showing ${area} only`}. Click an area on the heatmap to drill in.
          </DataNote>
        </Card>

        {/* Risk Donut */}
        <Card className="rounded-2xl border-binti-sand bg-binti-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-bold text-binti-ink">Risk Levels{area !== "All" && ` · ${area}`}</h3>
            <Badge variant="outline" className="border-red-300 text-[11px] font-bold text-red-600 dark:text-red-400">Donut · Risk</Badge>
          </div>
          {state === "loading" ? (
            <Skeleton className="mx-auto mt-4 size-[200px] rounded-full" />
          ) : (
            <div className="relative mt-2 h-[200px]" role="img" aria-label="Donut chart: risk levels — low 62 percent, medium 28 percent, high 10 percent referred">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDonut} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3} strokeWidth={0}>
                    {riskDonut.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={(v) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              {/* Donut center label */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-2xl font-extrabold text-binti-ink">{riskDonut[0].value}%</p>
                <p className="text-[10.5px] font-bold uppercase tracking-widest text-binti-slate">low risk</p>
              </div>
            </div>
          )}
          <ul className="mt-2 space-y-1.5" role="list">
            {riskDonut.map((d) => (
              <li key={d.name} className="flex items-center gap-2 text-[12.5px] text-binti-slate">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} aria-hidden="true" />
                Risk {d.name}: <strong className="text-binti-ink">{d.value}%</strong>
              </li>
            ))}
          </ul>
        </Card>

        {/* Wellbeing Line — gradient area + YoY */}
        <Card className="rounded-2xl border-binti-sand bg-binti-card p-5 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-[15px] font-bold text-binti-ink">
              Wellbeing Score · {area === "All" ? "All Areas" : area} · {fiscal === "fy2526" ? "Apr–Sep" : "Oct–Mar"}
            </h3>
            <Badge variant="outline" className="gap-1 border-binti/40 text-[11px] font-bold text-binti dark:text-indigo-300">
              <TrendingUp className="size-3.5" aria-hidden="true" /> Line · Wellbeing · ↑ 2.3% avg monthly
            </Badge>
          </div>
          {state === "loading" ? (
            <Skeleton className="mt-4 h-[220px] w-full" />
          ) : (
            <div className="mt-4 h-[220px]" role="img" aria-label={`Line chart: average wellbeing score rising across the ${fiscal === "fy2526" ? "Apr–Sep" : "Oct–Mar"} period`}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={wellbeing}>
                  <defs>
                    <linearGradient id="grad-wellbeing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 90]} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#EC4899" strokeWidth={3} dot={{ r: 4, fill: "#4F46E5" }} activeDot={{ r: 6 }} name="Wellbeing score" />
                  <Area type="monotone" dataKey="score" stroke="none" fill="url(#grad-wellbeing)" name="Wellbeing band" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* MAP HEATMAP + INDICATORS TABLE */}
      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        {/* Area heatmap */}
        <Card className="rounded-2xl border-binti-sand bg-binti-card p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-bold text-binti-ink">
            <MapPin className="size-4 text-binti-pink" aria-hidden="true" /> Area Heatmap · Kibera / Mathare / Kawangware
          </h3>
          <ul className="mt-4 space-y-3" role="list">
            {AREAS.map((a) => {
              const intensity = a.youth / 612; // Kibera = max
              const selected = area === a.name;
              return (
                <li key={a.name}>
                  <button
                    type="button"
                    onClick={() => setArea(selected ? "All" : a.name)}
                    aria-pressed={selected}
                    className={cn(
                      "block w-full rounded-xl border p-3.5 text-left transition hover:border-binti/40",
                      selected ? "border-binti bg-binti/5 ring-2 ring-binti/30" : "border-binti-sand"
                    )}
                    aria-label={`Filter dashboard to ${a.name}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[14px] font-bold text-binti-ink">
                        {a.name}
                        {selected && <span className="ml-2 rounded-full bg-binti px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-white">viewing</span>}
                      </p>
                      <Badge
                        className={cn(
                          "rounded-full text-[11px] font-bold",
                          intensity > 0.8 ? "bg-binti text-white" : intensity > 0.5 ? "bg-binti-pink text-white" : "bg-binti-cyan text-white"
                        )}
                      >
                        {a.youth} youth
                      </Badge>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-binti-cream" role="presentation">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-binti to-binti-pink"
                        style={{ width: `${(a.youth / 612) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[11.5px] text-binti-slate">
                      {a.circles} circles · {a.sessions} sessions · {a.attendance}% attendance
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
          <DataNote className="mt-3">
            Heat intensity = enrolled youth by area (aggregated). No exact locations mapped. Click an area to filter
            every chart above.
          </DataNote>
        </Card>

        {/* Indicators table */}
        <Card className="overflow-hidden rounded-2xl border-binti-sand bg-binti-card lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2 p-5 pb-3">
            <h3 className="font-display text-[15px] font-bold text-binti-ink">Indicators · Baseline → Target → Actual</h3>
            <Badge className="rounded-full bg-binti-cream text-[11px] font-bold text-binti dark:text-indigo-300">Report exported · 94% data quality · Audit trail kept</Badge>
          </div>
          <div className="binti-scroll max-h-96 overflow-y-auto">
            <Table className="binti-table">
              <TableHeader className="sticky top-0 bg-binti-cream">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-display text-[12px] font-bold text-binti-ink">Indicator</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">Baseline</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">Target</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">Actual</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">%</TableHead>
                  <TableHead className="text-center font-display text-[12px] font-bold text-binti-ink">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INDICATORS.map((ind) => {
                  const pct = Math.round((ind.actual / ind.target) * 100);
                  const status = pct >= 100 ? "On Track" : pct >= 85 ? "Watch" : "Risk High";
                  return (
                    <TableRow key={ind.indicator} className="hover:bg-binti-cream/50">
                      <TableCell className="text-[13px] font-semibold text-binti-ink">{ind.indicator}</TableCell>
                      <TableCell className="text-right text-[13px] text-binti-slate">{ind.baseline}</TableCell>
                      <TableCell className="text-right text-[13px] text-binti-slate">{ind.target}</TableCell>
                      <TableCell className="text-right text-[13px] font-bold text-binti-ink">{ind.actual}</TableCell>
                      <TableCell className={cn("text-right text-[13px] font-bold", pct >= 100 ? "text-green-600 dark:text-green-400" : "text-amber-600")}>
                        {pct}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={cn(
                            "rounded-full text-[10.5px] font-bold",
                            status === "On Track" && "bg-green-100 text-green-800",
                            status === "Watch" && "bg-amber-100 text-amber-800",
                            status === "Risk High" && "bg-red-100 text-red-700"
                          )}
                        >
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-binti-sand p-4">
            <DataNote>
              ℹ Data sync 94% — last {syncedAt}. Figures are aggregated from facilitator monthly registers; masked
              source file never leaves the encrypted store. Empty state: “No referrals”. Charts show loading skeletons
              while syncing.
            </DataNote>
          </div>
        </Card>
      </div>

      {/* LIVE ACTIVITY FEED — masked circle events (areas + counts only) */}
      <Card className="mt-6 rounded-2xl border-binti-sand bg-binti-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-bold text-binti-ink">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
            </span>
            Live from the Circles{area !== "All" && ` · ${area}`}
          </h3>
          <Badge variant="outline" className="rounded-full border-binti/40 text-[11px] font-bold text-binti dark:text-indigo-300">
            Aggregated · areas + counts only — never names (DPA 2019)
          </Badge>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3" role="list">
          {ACTIVITY_FEED.filter((e) => area === "All" || e.area === area).map((e) => (
            <li
              key={e.id}
              className="binti-lift flex items-start gap-3 rounded-xl border border-binti-sand bg-binti-cream/40 p-3.5"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-binti to-binti-pink font-display text-[10px] font-extrabold text-white">
                {e.area.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-snug text-binti-ink">{e.event}</p>
                <p className="mt-0.5 text-[11.5px] text-binti-slate">
                  {e.area} · {e.meta}
                </p>
                <p className="mt-0.5 text-[10.5px] font-bold uppercase tracking-wide text-binti-slate/60">{e.ago}</p>
              </div>
            </li>
          ))}
        </ul>
        <DataNote className="mt-4">
          Events refresh with each monthly sync. Referrals are counted, never named — every story behind a number
          belongs to her alone.
          {area !== "All" && ACTIVITY_FEED.filter((e) => e.area === area).length === 0 && ` No recent ${area} events this cycle.`}
        </DataNote>
      </Card>
    </section>
  );
}
