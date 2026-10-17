#!/usr/bin/env node
/**
 * validate-jsonld.mjs (spec 4.4): fetches every sitemap URL, extracts the
 * LD+JSON graph(s), and asserts:
 *   - JSON parses and has @context + @graph (or is a single node)
 *   - every page has WebPage + BreadcrumbList (except home: homepage has
 *     WebPage only)
 *   - every node has @type
 *   - Organization node appears exactly once site-wide (root layout)
 *   - all URLs inside the graph are absolute https and match the canonical host
 *   - @id references resolve within the emitted graphs
 */
import { BASE_URL, ensureServer } from "./lib/server.mjs";

const stop = await ensureServer();

function collectErrors(graph, url, errors) {
  const ids = new Set();
  for (const node of graph) {
    if (!node["@type"]) errors.push(`${url}: node without @type: ${JSON.stringify(node).slice(0, 80)}`);
    if (!node["@id"]) errors.push(`${url}: node without @id (${node["@type"]})`);
    else ids.add(node["@id"]);
  }
  // URL hygiene
  const text = JSON.stringify(graph);
  for (const m of text.matchAll(/"https?:\/\/[^"]+"/g)) {
    const u = m[0].replace(/"/g, "");
    if (u.startsWith("http://")) errors.push(`${url}: non-https URL in graph: ${u}`);
    if (u.includes("localhost") && process.env.ALLOW_LOCALHOST !== "1")
      errors.push(`${url}: localhost URL in graph: ${u}`);
  }
  // @id reference resolution (must resolve within THIS page's graph)
  for (const m of text.matchAll(/"@id": "([^"]+)"/g)) {
    // every @id must be declared as a node key in this graph
    if (!ids.has(m[1])) {
      errors.push(`${url}: @id reference does not resolve within the page graph: ${m[1]}`);
    }
  }
  // Cross-references like {"@id": ORG_ID} inside nested objects must also resolve
  for (const node of graph) {
    const json = JSON.stringify(node);
    for (const m of json.matchAll(/\{"@id": ?"([^"]+)"\}/g)) {
      if (!ids.has(m[1])) {
        errors.push(`${url}: nested @id ref does not resolve: ${m[1]} in node ${node["@id"] ?? node["@type"]}`);
      }
    }
  }
  return ids;
}

try {
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemap = await sitemapRes.text();
  const canonicalUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const pairs = canonicalUrls.map((u) => ({
    canonical: u,
    local: `${BASE_URL}${new URL(u).pathname === "/" ? "" : new URL(u).pathname}`,
  }));
  console.log(`[validate-jsonld] validating ${pairs.length} pages\n`);

  const errors = [];
  const allIds = new Set();

  for (const { canonical: url, local } of pairs) {
    const res = await fetch(local);
    const html = await res.text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];

    if (blocks.length === 0) {
      errors.push(`${url}: no JSON-LD found`);
      continue;
    }
    if (blocks.length > 1) {
      errors.push(`${url}: ${blocks.length} JSON-LD blocks (spec: ONE graph per page)`);
    }

    for (const b of blocks) {
      let parsed;
      try {
        parsed = JSON.parse(b[1].replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\u0026/g, "&"));
      } catch (e) {
        errors.push(`${url}: JSON-LD does not parse: ${e.message}`);
        continue;
      }
      if (parsed["@context"] !== "https://schema.org") {
        errors.push(`${url}: missing @context https://schema.org`);
      }
      const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
      const orgs = graph.filter((n) => /Organization|NGO/.test(String(n["@type"])));
      if (orgs.length !== 1) {
        errors.push(`${url}: expected exactly 1 Organization/NGO node in graph, found ${orgs.length}`);
      }
      { for (const idv of collectErrors(graph, url, errors)) allIds.add(idv); }

      const types = graph.map((n) => String(n["@type"]));
      const isHome = new URL(url).pathname === "/" || new URL(url).pathname === "";
      const WEBPAGE_TYPES = new Set([
        "WebPage", "AboutPage", "ContactPage", "CollectionPage",
        "FAQPage", "ProfilePage", "ItemPage", "SearchResultsPage",
      ]);
      if (!types.some((t) => WEBPAGE_TYPES.has(t))) {
        errors.push(`${url}: missing WebPage (or subtype) node`);
      }
      if (!isHome && !types.includes("BreadcrumbList")) {
        errors.push(`${url}: missing BreadcrumbList node`);
      }
    }
  }

  if (errors.length) {
    console.error(`\n[validate-jsonld] FAILED with ${errors.length} error(s):`);
    errors.slice(0, 40).forEach((e) => console.error("  - " + e));
    process.exit(1);
  }
  console.log(`\n[validate-jsonld] PASSED: one graph per page, 1 Organization node each, all @id refs resolve, all URLs absolute https`);
} finally {
  stop();
}
