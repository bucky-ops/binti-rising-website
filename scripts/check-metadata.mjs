#!/usr/bin/env node
/**
 * check-metadata.mjs (spec 8.2): asserts every route in the registry has a
 * unique title + description + canonical, rendered into the HTML, and that
 * content pages carry >= 300 words of visible text.
 */
import { BASE_URL, ensureServer } from "./lib/server.mjs";

const stop = await ensureServer();

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

try {
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemap = await sitemapRes.text();
  const canonicalUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const pairs = canonicalUrls.map((u) => ({
    canonical: u,
    local: `${BASE_URL}${new URL(u).pathname === "/" ? "" : new URL(u).pathname}`,
  }));

  console.log(`[check-metadata] auditing ${pairs.length} pages\n`);
  const errors = [];
  const titles = new Map();
  const descriptions = new Map();

  for (const { canonical: url, local } of pairs) {
    const res = await fetch(local);
    const html = await res.text();

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical) errors.push(`${url}: no canonical link`);
    else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, ""))
      errors.push(`${url}: canonical ${canonical} != sitemap URL ${url}`);

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    if (!title) errors.push(`${url}: no <title>`);
    else {
      titles.set(title, (titles.get(title) || 0) + 1);
      if (title.length > 65) errors.push(`${url}: title too long (${title.length} chars): ${title}`);
    }

    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (!desc) errors.push(`${url}: no meta description`);
    else {
      descriptions.set(desc, (descriptions.get(desc) || 0) + 1);
      if (desc.length < 100) errors.push(`${url}: description too short (${desc.length} chars)`);
    }

    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    if (!ogUrl) errors.push(`${url}: no og:url`);
    else if (ogUrl.replace(/\/$/, "") !== url.replace(/\/$/, ""))
      errors.push(`${url}: og:url ${ogUrl} != sitemap URL ${url}`);

    const words = visibleText(html).split(/\s+/).filter(Boolean).length;
    if (words < 300) errors.push(`${url}: only ${words} words of visible text (< 300)`);
    console.log(`  ${words} words | ${title?.slice(0, 60)} | ${url}`);
  }

  for (const [t, n] of titles) if (n > 1) errors.push(`duplicate title used on ${n} pages: "${t}"`);
  for (const [d, n] of descriptions) if (n > 1) errors.push(`duplicate description used on ${n} pages: "${d.slice(0, 60)}..."`);

  if (errors.length) {
    console.error(`\n[check-metadata] FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.error("  - " + e));
    process.exit(1);
  }
  console.log("\n[check-metadata] PASSED: unique titles/descriptions/canonicals, OG URLs consistent, >= 300 words per page");
} finally {
  stop();
}
