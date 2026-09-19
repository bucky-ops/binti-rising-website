import { NextResponse } from "next/server";
import { db, dbReady } from "@/lib/db";
import { sbInsert, sbSelect, supabaseConfigured } from "@/lib/binti/supabase";

/**
 * POST /api/partners - Partner Inquiry form (Get Involved → For Partners)
 * DATA PRIVACY (Kenya DPA 2019):
 *  - Partner inquiries are INSTITUTIONAL contacts (funders/NGO/government/
 *    corporate representatives), not beneficiary data. Data minimisation
 *    applies: only fields needed to start a partnership are stored.
 *  - consentDpa must be true (explicit notice on the form).
 *  - Honeypot field ("website") must stay empty - bots fill it, humans never
 *    see it (visually hidden, aria-hidden, tabIndex -1).
 *  - Reference code returned to the submitter is the only identifier we
 *    expose publicly (e.g. PTN-2026-740841) - mirrors complaint refs.
 */

const ORG_TYPES = ["funder", "ngo", "government", "corporate", "community"] as const;
const INTERESTS = ["funding", "referral", "content", "technical", "volunteering"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function makeReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `PTN-2026-${n}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: real users never fill this (visually-hidden field)
    if (String(body.website ?? "").trim().length > 0) {
      // Pretend success so bots don't probe - nothing is stored
      return NextResponse.json({ ok: true, reference: "PTN-2026-000000" });
    }

    const orgName = String(body.orgName ?? "").trim();
    const contactName = String(body.contactName ?? "").trim();
    const role = body.role ? String(body.role).trim().slice(0, 120) : null;
    const email = String(body.email ?? "").trim().toLowerCase();
    const orgType = String(body.orgType ?? "").trim();
    const interests = Array.isArray(body.interests)
      ? body.interests.map((i: unknown) => String(i)).filter((i: string) =>
          (INTERESTS as readonly string[]).includes(i)
        )
      : [];
    const message = body.message ? String(body.message).trim().slice(0, 2000) : null;
    const consentDpa = Boolean(body.consentDpa);

    if (orgName.length < 2 || orgName.length > 160) {
      return NextResponse.json({ error: "Please enter your organisation's name (2–160 characters)." }, { status: 400 });
    }
    if (contactName.length < 2 || contactName.length > 120) {
      return NextResponse.json({ error: "Please enter the contact person's name (2–120 characters)." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid work email address." }, { status: 400 });
    }
    if (!(ORG_TYPES as readonly string[]).includes(orgType)) {
      return NextResponse.json({ error: "Choose your organisation type." }, { status: 400 });
    }
    if (interests.length === 0) {
      return NextResponse.json({ error: "Select at least one way you'd like to partner." }, { status: 400 });
    }
    if (!consentDpa) {
      return NextResponse.json(
        { error: "DPA 2019 consent is required so we may store this inquiry." },
        { status: 400 }
      );
    }

    const reference = makeReference();
    const record = {
      reference,
      orgName,
      contactName,
      role,
      email,
      orgType,
      interests: interests.join(","),
      message,
      consentDpa,
    };

    // 1) Supabase (production path, RLS-protected)
    if (supabaseConfigured) {
      const ok = await sbInsert("partner_inquiries", { id: crypto.randomUUID(), ...record });
      if (ok) {
        return NextResponse.json({
          ok: true,
          reference,
          message:
            "Asante! Our partnerships lead replies within 3 working days. MOU template attached on this page - sign and bring it to Kibera.",
        });
      }
    }

    // 2) Fallback: local Prisma store
    await dbReady();
    const saved = await db.partnerInquiry.create({ data: record });

    return NextResponse.json({
      ok: true,
      reference: saved.reference,
      message:
        "Asante! Our partnerships lead replies within 3 working days. MOU template attached on this page - sign and bring it to Kibera.",
    });
  } catch (e) {
    console.error("[partners] error:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Could not send your inquiry. Please try again, or reach us on WhatsApp +254 758 919 709." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/partners?ref=PTN-2026-XXXXXX - reference status lookup.
 * PRIVACY (Kenya DPA 2019): returns ONLY the reference, a coarse status and
 * the received month. Never the org name, contact, email or message - so a
 * stolen/known reference leaks nothing useful. No PII in the response.
 */
const STATUS_LABELS: Record<string, string> = {
  new: "Received - with the partnerships team",
  in_review: "In review",
  replied: "Replied - check your inbox",
  closed: "Closed - thank you",
};

export async function GET(req: Request) {
  try {
    const ref = (new URL(req.url).searchParams.get("ref") ?? "").trim().toUpperCase();
    if (!/^PTN-2026-\d{6}$/.test(ref)) {
      return NextResponse.json(
        { ok: false, found: false, error: "Reference format is PTN-2026-XXXXXX (6 digits)." },
        { status: 400 }
      );
    }

    // 1) Supabase first (when configured)
    if (supabaseConfigured) {
      const rows = await sbSelect<{ reference: string; status: string; createdAt: string }>(
        "partner_inquiries",
        `?select=reference,status,createdAt&reference=eq.${encodeURIComponent(ref)}&limit=1`
      );
      if (rows && rows.length > 0) {
        const d = new Date(rows[0].createdAt);
        return NextResponse.json({
          ok: true,
          found: true,
          reference: ref,
          status: STATUS_LABELS[rows[0].status] ?? STATUS_LABELS.new,
          receivedAt: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
        });
      }
      return NextResponse.json({ ok: true, found: false, reference: ref }, { status: 404 });
    }

    // 2) Fallback: local Prisma store
    await dbReady();
    const row = await db.partnerInquiry.findUnique({ where: { reference: ref } });
    if (!row) {
      return NextResponse.json({ ok: true, found: false, reference: ref }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      found: true,
      reference: ref,
      status: STATUS_LABELS[row.status] ?? STATUS_LABELS.new,
      receivedAt: row.createdAt.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    });
  } catch (e) {
    console.error("[partners:lookup] error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, found: false, error: "Lookup failed. Try again." }, { status: 500 });
  }
}
