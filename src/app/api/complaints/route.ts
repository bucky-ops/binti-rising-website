import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/complaints — Anonymous Complaints Box (Accountability)
 * Privacy: fully anonymous. We store only the message + category.
 * We do NOT store IPs, emails or names. A random reference is returned
 * so the reporter can follow up without revealing identity.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? "").trim();
    const category = String(body.category ?? "other");
    const hasVoiceNote = Boolean(body.hasVoiceNote);

    if (message.length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }
    const ALLOWED = ["safeguarding", "fraud", "data", "other"];
    if (!ALLOWED.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Anonymous reference, e.g. BRI-2026-0042
    const count = await db.complaint.count();
    const reference = `BRI-2026-${String(count + 1).padStart(4, "0")}`;

    await db.complaint.create({
      data: { reference, category, message, hasVoiceNote },
    });

    return NextResponse.json({ ok: true, reference, status: "received" });
  } catch (e) {
    console.error("[complaints] error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not submit. Try WhatsApp +254758919709." }, { status: 500 });
  }
}
