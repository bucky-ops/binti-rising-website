import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/newsletter — donor & community newsletter opt-in.
 * Privacy (Kenya DPA 2019):
 *  - email stored ONLY for sending the newsletter;
 *  - explicit consent checkbox is mandatory (consentDpa must be true);
 *  - we do NOT store IPs, names or any other identifier;
 *  - the email is never rendered by any public UI surface.
 * Duplicate opt-ins are idempotent (upsert) so re-subscribing never errors.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const consentDpa = Boolean(body.consentDpa);
    const source = String(body.source ?? "footer-form").slice(0, 40);

    // RFC-ish light validation — enough to catch typos without storing bad data
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!consentDpa) {
      return NextResponse.json(
        { error: "DPA 2019 consent is required to subscribe" },
        { status: 400 }
      );
    }

    await db.newsletter.upsert({
      where: { email },
      create: { email, consentDpa, source },
      update: { consentDpa, source },
    });

    return NextResponse.json({ ok: true, message: "Subscribed. Karibu!" });
  } catch (e) {
    console.error("[newsletter] error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
