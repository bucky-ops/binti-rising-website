import { INDICATORS, FINANCE_FY2425, AREAS, DATA_QUALITY } from "@/lib/binti/data";

/**
 * GET /api/reports/datim - DATIM / Global Fund report export (CSV).
 * Aggregated indicators ONLY - no PII (Kenya DPA 2019).
 * In production this can be swapped for the PDF generator backed by
 * Supabase aggregation views; CSV shape is DATIM-friendly.
 */
export async function GET() {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const rows: string[] = [];
  rows.push("# Binti Rising Initiative - DATIM / Global Fund Aggregated Report");
  rows.push(`# Reg No: NC/SD/CBO/2026/0123 | Data Quality: ${DATA_QUALITY}%`);
  rows.push("# Privacy: aggregated data only, no personal identifiers (Kenya DPA 2019)");
  rows.push("");
  rows.push("section,indicator,baseline,target,actual,percent_of_target,status");

  for (const i of INDICATORS) {
    const pct = Math.round((i.actual / i.target) * 100);
    const status = pct >= 100 ? "On Track" : pct >= 85 ? "Watch" : "Risk High";
    rows.push([`indicators`, esc(i.indicator), i.baseline, i.target, i.actual, `${pct}%`, status].join(","));
  }

  rows.push("");
  rows.push("section,line_item,share_percent,amount_kes");
  for (const f of FINANCE_FY2425) {
    rows.push(["finance_fy2425", esc(f.line), f.pct, esc(f.kes)].join(","));
  }

  rows.push("");
  rows.push("section,area,circles,youth_enrolled,sessions_held,attendance_percent");
  for (const a of AREAS) {
    rows.push(["areas", esc(a.name), a.circles, a.youth, a.sessions, a.attendance].join(","));
  }

  const csv = rows.join("\n");
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="binti-datim-report.csv"',
      "Cache-Control": "no-store",
    },
  });
}
