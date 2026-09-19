import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sbInsert, supabaseConfigured } from "@/lib/binti/supabase";

/**
 * POST /api/complaints - Anonymous Complaints Box (Accountability)
 * Privacy: fully anonymous. We store only the message + category.
 * We do NOT store IPs, emails or names. A random reference is returned
 * so the reporter can follow up without revealing identity.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? "").trim();
    const category = String(body.category ?? "other");
    let voiceNote: string | null =
      typeof body.voiceNote === "string" && body.voiceNote.startsWith("data:audio/")
        ? body.voiceNote
        : null;

    if (message.length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }
    const ALLOWED = ["safeguarding", "fraud", "data", "other"];
    if (!ALLOWED.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Voice note: hard size cap (~400 KB base64 ≈ 300 KB audio ≈ ~60-90 s opus/webm).
    // Stored for the Safeguarding Lead ONLY - never returned by any API or UI.
    if (voiceNote && voiceNote.length > 400_000) {
      voiceNote = null; // too large - drop silently, complaint still accepted
    }
    const hasVoiceNote = Boolean(body.hasVoiceNote) || !!voiceNote;

    // Anonymous reference, e.g. BRI-2026-0042
    const count = await db.complaint.count();
    const reference = `BRI-2026-${String(count + 1).padStart(4, "0")}`;

    const record = { reference, category, message, hasVoiceNote, voiceNote };

    // 1) Supabase (production path, RLS-protected, service-role write only)
    if (supabaseConfigured) {
      const ok = await sbInsert("complaints", { id: crypto.randomUUID(), ...record });
      if (ok) {
        return NextResponse.json({ ok: true, reference, status: "received" });
      }
    }

    // 2) Fallback: local Prisma store (never lose a safeguarding report)
    await db.complaint.create({ data: record });

    return NextResponse.json({ ok: true, reference, status: "received" });
  } catch (e) {
    console.error("[complaints] error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not submit. Try WhatsApp +254758919709." }, { status: 500 });
  }
}
