#!/usr/bin/env node
/**
 * check-internal-links.mjs (spec Phase 3): crawls every sitemap URL, follows
 * same-origin links, and fails on:
 *   - broken internal links (non-200)
 *   - orphan pages (not reachable within 3 clicks of home, excluding sitemap-only)
 */
import { BASE_URL, ensureServer } from "./lib/server.mjs";

const stop = await ensureServer();

async function main() {
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemap = await sitemapRes.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const origin = BASE_URL;
  // Fetch paths locally; bookkeep canonical URLs from the sitemap.
  const pathToCanonical = new Map(
    sitemapUrls.map((u) => [new URL(u).pathname.replace(/\/$/, "") || "/", u])
  );
  const localFor = (canonicalUrl) => {
    const p = new URL(canonicalUrl).pathname;
    return `${origin}${p === "/" ? "" : p}`;
  };

  console.log(`[check-internal-links] crawling from ${origin} over ${sitemapUrls.length} pages\n`);

  const linksFrom = new Map(); // canonicalUrl -> Set(path)
  const broken = [];

  for (const pageUrl of sitemapUrls) {
    const res = await fetch(localFor(pageUrl));
    if (!res.ok) {
      broken.push({ from: pageUrl, href: pageUrl, status: res.status });
      continue;
    }
    const html = await res.text();
    const links = [...html.matchAll(/<a[^>]+href="([^"]+)"/g)].map((m) => m[1]);
    const internal = new Set();

    for (const href of links) {
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
      let target;
      try {
        // Resolve against the canonical URL so relative hrefs map to sitemap paths.
        target = new URL(href, pageUrl);
      } catch {
        continue;
      }
      if (target.pathname.startsWith("/api/")) continue;
      let p = target.pathname.replace(/\/$/, "");
      if (p === "") p = "/";
      internal.add(p);
    }
    linksFrom.set(pageUrl.replace(/\/$/, "") || "/", internal);
  }

  // BFS from home to find click depth + unreachable pages
  const home = sitemapUrls.find((u) => new URL(u).pathname === "/") || sitemapUrls[0];
  const depth = new Map([[home, 0]]);
  const queue = [home];
  while (queue.length) {
    const cur = queue.shift();
    const d = depth.get(cur);
    const targets = linksFrom.get(cur.replace(/\/$/, "")) || linksFrom.get(cur) || new Set();
    for (const t of targets) {
      const pageUrl = pathToCanonical.get(t);
      if (!pageUrl) continue; // link to a non-sitemap page (e.g. #anchor) - fine
      if (!depth.has(pageUrl)) {
        depth.set(pageUrl, d + 1);
        queue.push(pageUrl);
      }
    }
  }

  const orphans = sitemapUrls.filter((u) => !depth.has(u));
  const tooDeep = sitemapUrls.filter((u) => (depth.get(u) ?? 99) > 3);

  if (broken.length) {
    console.error(`[check-internal-links] FAILED: ${broken.length} broken page(s):`);
    broken.forEach((b) => console.error(`  - ${b.from} -> ${b.href} (${b.status})`));
    process.exit(1);
  }

  if (orphans.length) {
    console.error(`[check-internal-links] FAILED: orphan page(s) not reachable by internal links from home:`);
    orphans.forEach((o) => console.error("  - " + o));
    process.exit(1);
  }

  if (tooDeep.length) {
    console.error(`[check-internal-links] FAILED: page(s) deeper than 3 clicks from home:`);
    tooDeep.forEach((o) => console.error(`  - ${o} (depth ${depth.get(o)})`));
    process.exit(1);
  }

  console.log(`[check-internal-links] PASSED: no broken pages, no orphans, all within 3 clicks of home`);
  console.log(`  click depths: ${[...depth.entries()].map(([u, d]) => `${new URL(u).pathname}=${d}`).join(", ")}`);
}

try {
  await main();
} finally {
  stop();
}
