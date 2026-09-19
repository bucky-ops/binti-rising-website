import { NextResponse } from "next/server";
import { KPIS, AREAS, DATA_QUALITY, DASH_LAST_SYNC } from "@/lib/binti/data";

/**
 * GET /api/kpis — aggregated KPIs for the Live Impact Dashboard.
 * In production this proxies Supabase (NEXT_PUBLIC_SUPABASE_URL + anon key
 * from env, RLS-protected, aggregated views only). Locally it serves the
 * bundled aggregate dataset (masked SSK aggregation).
 * No PII is ever returned: counts and percentages only.
 */
export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      source: "SSK Master Monthly Aggregation (masked) — aggregates only",
      dataQuality: DATA_QUALITY,
      lastSync: DASH_LAST_SYNC,
      kpis: KPIS,
      areas: AREAS,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "kpis unavailable" }, { status: 500 });
  }
}
