import { NextResponse } from "next/server";
import { KPIS, AREAS, DATA_QUALITY, DASH_LAST_SYNC, SSK_CYCLE } from "@/lib/binti/data";
import { sbSelect, supabaseConfigured } from "@/lib/binti/supabase";

/**
 * GET /api/kpis - aggregated KPIs for the Live Impact Dashboard.
 * Order of service:
 *  1. Supabase `kpi_aggregates` (latest row) when env keys are configured -
 *     RLS-protected, aggregates only, no PII.
 *  2. Fallback: bundled aggregate dataset (masked SSK aggregation), which
 *     keeps the dashboard fully donor-ready with zero infrastructure.
 * No PII is ever returned: counts and percentages only.
 */
interface KpiRow {
  payload: {
    dataQuality: number;
    lastSync: string;
    kpis: typeof KPIS;
    areas: typeof AREAS;
    cycle?: typeof SSK_CYCLE;
  };
  synced_at?: string;
}

export async function GET() {
  try {
    if (supabaseConfigured) {
      const rows = await sbSelect<KpiRow>(
        "kpi_aggregates",
        "?select=payload,synced_at&order=synced_at.desc&limit=1"
      );
      const payload = rows?.[0]?.payload;
      if (payload) {
        return NextResponse.json({
          ok: true,
          source: "Supabase kpi_aggregates (masked) - aggregates only",
          dataQuality: payload.dataQuality ?? DATA_QUALITY,
          lastSync: payload.lastSync ?? DASH_LAST_SYNC,
          kpis: payload.kpis ?? KPIS,
          areas: payload.areas ?? AREAS,
          cycle: payload.cycle ?? SSK_CYCLE,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      source: "SSK Master Monthly Aggregation (masked) - aggregates only",
      dataQuality: DATA_QUALITY,
      lastSync: DASH_LAST_SYNC,
      kpis: KPIS,
      areas: AREAS,
      cycle: SSK_CYCLE,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "kpis unavailable" }, { status: 500 });
  }
}
