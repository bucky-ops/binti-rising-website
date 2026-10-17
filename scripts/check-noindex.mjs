#!/usr/bin/env node
/**
 * check-noindex.mjs (spec 1.5): fetches every sitemap URL and fails if any
 * response contains `noindex` (X-Robots-Tag header or meta tag) or is not
 * HTTP 200. Usage: node scripts/check-noindex.mjs (after build + BASE_URL).
 */
import { BASE_URL, ensureServer } from "./lib/server.mjs";

const stop = await ensureServer();

try {
  // Build URL list from sitemap.xml so the check tests reality, not the registry.
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) throw new Error(`/sitemap.xml returned ${sitemapRes.status}`);
  const sitemap = await sitemapRes.text();
  const canonicalUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // Fetch each path on the locally-served build (the build bakes in the
  // canonical host, e.g. bintirising.org, while we serve on BASE_URL).
  const urls = canonicalUrls.map((u) => {
    const p = new URL(u).pathname;
    return `${BASE_URL}${p === "/" ? "" : p}`;
  });

  if (canonicalUrls.length < 12) {
    throw new Error(`Sitemap only exposes ${canonicalUrls.length} URLs - need >= 12 (spec DoD #5).`);
  }

  console.log(`[check-noindex] auditing ${urls.length} URLs on ${BASE_URL}\n`);

  const failures = [];
  for (const [i, url] of urls.entries()) {
    const res = await fetch(url, { redirect: "manual" });
    const xRobots = (res.headers.get("x-robots-tag") || "").toLowerCase();
    const body = res.ok ? await res.text() : "";
    const metaNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(body);

    const problems = [];
    if (res.status !== 200) problems.push(`HTTP ${res.status}`);
    if (xRobots.includes("noindex")) problems.push(`x-robots-tag: ${xRobots}`);
    if (metaNoindex) problems.push("meta robots noindex");
    if (/localhost(:\d+)?/.test(body) && process.env.ALLOW_LOCALHOST !== "1")
      problems.push("rendered HTML contains localhost");

    if (problems.length) failures.push({ url: canonicalUrls[i], problems });
    console.log(`  ${res.status === 200 && problems.length === 0 ? "PASS" : "FAIL"}  ${canonicalUrls[i]}${problems.length ? " -> " + problems.join("; ") : ""}`);
  }

  if (failures.length) {
    console.error(`\n[check-noindex] FAILED: ${failures.length} URL(s) with noindex/status problems`);
    process.exit(1);
  }
  console.log(`\n[check-noindex] PASSED: ${urls.length} URLs, 200 OK, no noindex, no localhost leakage`);
} finally {
  stop();
}
