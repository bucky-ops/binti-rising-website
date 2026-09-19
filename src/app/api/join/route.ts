import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sbInsert, supabaseConfigured } from "@/lib/binti/supabase";

/**
 * POST /api/join - Join Circle form (For Youth)
 * DATA PRIVACY (Kenya DPA 2019):
 *  - Accepts initials only (≤ 4 chars) - full names are REJECTED server-side.
 *  - Age validated to 15–25; guardian consent REQUIRED for 15–17.
 *  - Phone optional, only stored when consentDpa is true; never rendered.
 *  - Production target: Supabase table `join_requests` with RLS
 *    (service-role write only) - env-configured, no hardcoded keys.
 *  - Supabase write is attempted first when configured; the local Prisma
 *    store is the automatic fallback so no signup is ever lost.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const displayName = String(body.displayName ?? "").trim();
    const age = Number(body.age);
    const area = String(body.area ?? "").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const consentDpa = Boolean(body.consentDpa);
    const guardianConsent = Boolean(body.guardianConsent);

    // Reject full names: allow letters, dots, spaces up to 4 chars total
    if (displayName.length === 0 || displayName.length > 4) {
      return NextResponse.json(
        { error: "Initials only (max 4 characters). Privacy first - never your full name." },
        { status: 400 }
      );
    }
    if (!Number.isInteger(age) || age < 15 || age > 25) {
      return NextResponse.json({ error: "Age must be 15-25" }, { status: 400 });
    }
    const ALLOWED_AREAS = ["Kibera", "Mathare", "Kawangware", "Other"];
    if (!ALLOWED_AREAS.includes(area)) {
      return NextResponse.json({ error: "Choose your area" }, { status: 400 });
    }
    if (!consentDpa) {
      return NextResponse.json({ error: "DPA 2019 consent is required" }, { status: 400 });
    }
    if (age < 18 && !guardianConsent) {
      return NextResponse.json({ error: "Guardian consent is required for ages 15-17" }, { status: 400 });
    }

    const record = {
      displayName,
      age,
      area,
      phone: consentDpa ? phone : null,
      consentDpa,
      guardianConsent: age < 18 ? guardianConsent : false,
    };

    // 1) Supabase (production path, RLS-protected)
    if (supabaseConfigured) {
      const id = crypto.randomUUID();
      const ok = await sbInsert("join_requests", { id, ...record });
      if (ok) {
        return NextResponse.json({
          ok: true,
          id,
          message:
            "Karibu Binti! Circle starts Monday 2pm Laini Saba. Sema na Me chatbot on WhatsApp +254758919709",
        });
      }
    }

    // 2) Fallback: local Prisma store
    const saved = await db.joinRequest.create({ data: record });

    return NextResponse.json({
      ok: true,
      id: saved.id,
      message:
        "Karibu Binti! Circle starts Monday 2pm Laini Saba. Sema na Me chatbot on WhatsApp +254758919709",
    });
  } catch (e) {
    console.error("[join] error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
  }
}
