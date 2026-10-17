import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ALL_ROUTES } from "@/lib/seo/all-routes";
import { SITE_URL, siteUrlFor } from "@/lib/site-url";

/**
 * Deploy-time indexing hook (spec 8.1): POST /api/cron/indexnow
 * Protected by CRON_SECRET (header `x-cron-secret` or `?secret=`).
 *
 * Flow:
 *  1. reads the route registry (same source as /sitemap.xml),
 *  2. diffs against previously submitted URLs (IndexPing table),
 *  3. POSTs added/updated URLs to IndexNow in batches of <= 10,000,
 *  4. logs status per URL.
 *
 * Schedule via Vercel Cron or an external GitHub Action:
 *   0 3 * * *  (daily)
 */
const prisma = new PrismaClient();

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-cron-secret");
  const query = req.nextUrl.searchParams.get("secret");
  return header === secret || query === secret;
}

export async function POST(req: NextRequest) {
  return runIndexNow(req);
}

/** Vercel Cron issues GET requests; support both verbs. */
export async function GET(req: NextRequest) {
  return runIndexNow(req);
}

async function runIndexNow(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY || "binti-2026-rise-key";
  const host = SITE_URL;

  try {
    const urls = ALL_ROUTES.filter((r) => r.indexable).map((r) => siteUrlFor(r.path));

    const previous = await prisma.indexPing.findMany();
    const previousMap = new Map(previous.map((p) => [p.url, p]));
    const toSubmit = urls.filter((u) => !previousMap.has(u));

    if (toSubmit.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new or changed URLs to submit.",
        totalTracked: urls.length,
      });
    }

    // IndexNow accepts batches up to 10,000 URLs; we chunk defensively.
    const batches: string[][] = [];
    for (let i = 0; i < toSubmit.length; i += 100) {
      batches.push(toSubmit.slice(i, i + 100));
    }

    const results: { batch: number; status: number; count: number }[] = [];
    let allOk = true;

    for (const [i, batch] of batches.entries()) {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host,
          key,
          keyLocation: `${host}/${key}.txt`,
          urlList: batch,
        }),
      });
      results.push({ batch: i + 1, status: res.status, count: batch.length });
      if (!res.ok) allOk = false;

      for (const url of batch) {
        await prisma.indexPing.upsert({
          where: { url },
          update: {
            status: res.ok ? "submitted" : "failed",
            responseCode: res.status,
            updatedAt: new Date(),
          },
          create: {
            url,
            status: res.ok ? "submitted" : "failed",
            responseCode: res.status,
          },
        });
      }
    }

    return NextResponse.json({
      success: allOk,
      submitted: toSubmit.length,
      totalTracked: urls.length,
      results,
      alert: allOk
        ? undefined
        : "ALERT: one or more IndexNow batches failed (non-2xx). Check INDEXNOW_KEY and key file hosting.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to run IndexNow diff-and-ping." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
