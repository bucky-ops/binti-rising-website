#!/usr/bin/env node
/**
 * sync-lastmod.mjs: rewrites src/lib/seo/lastmod.json from git history so
 * sitemap lastModified values track real content changes (spec 1.4) and are
 * NEVER new Date(). Route -> representative file mapping lives here.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const ROUTE_FILES = {
  "/": "src/app/page.tsx",
  "/about": "src/app/(site)/about/page.tsx",
  "/about/team": "src/app/(site)/about/team/page.tsx",
  "/about/governance": "src/app/(site)/about/governance/page.tsx",
  "/programs": "src/app/(site)/programs/page.tsx",
  "/programs/srhr": "src/lib/data/programs.ts",
  "/programs/mental-health": "src/lib/data/programs.ts",
  "/programs/financial-freedom": "src/lib/data/programs.ts",
  "/programs/leadership": "src/lib/data/programs.ts",
  "/communities": "src/app/(site)/communities/page.tsx",
  "/communities/kayole": "src/lib/data/communities.ts",
  "/communities/dandora": "src/lib/data/communities.ts",
  "/communities/mathare": "src/lib/data/communities.ts",
  "/communities/kibera": "src/lib/data/communities.ts",
  "/stories": "src/app/(site)/stories/page.tsx",
  "/stories/learning-my-reproductive-health-rights-kayole": "src/lib/data/stories.ts",
  "/learn": "src/app/(site)/learn/page.tsx",
  "/learn/srhr-rights-in-kenya-for-young-women": "src/lib/data/learn.ts",
  "/learn/what-does-consent-actually-mean": "src/lib/data/learn.ts",
  "/learn/how-to-recognise-gender-based-violence": "src/lib/data/learn.ts",
  "/learn/mental-health-support-for-young-women-in-nairobi": "src/lib/data/learn.ts",
  "/learn/budget-and-save-on-irregular-income-kenya": "src/lib/data/learn.ts",
  "/learn/menstrual-health-myths-and-facts": "src/lib/data/learn.ts",
  "/resources": "src/app/(site)/resources/page.tsx",
  "/events": "src/app/(site)/events/page.tsx",
  "/get-involved/volunteer": "src/app/(site)/get-involved/volunteer/page.tsx",
  "/get-involved/partner": "src/app/(site)/get-involved/partner/page.tsx",
  "/get-involved/donate": "src/app/(site)/get-involved/donate/page.tsx",
  "/contact": "src/app/(site)/contact/page.tsx",
  "/faqs": "src/app/(site)/faqs/page.tsx",
};

function gitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: "utf8" });
    const d = out.trim();
    return d ? d.slice(0, 10) : null;
  } catch {
    return null;
  }
}

const existing = JSON.parse(readFileSync("src/lib/seo/lastmod.json", "utf8"));
const next = { ...existing };

for (const [route, file] of Object.entries(ROUTE_FILES)) {
  const d = gitDate(file);
  if (d) next[route] = d;
}

writeFileSync("src/lib/seo/lastmod.json", JSON.stringify(next, null, 2) + "\n");
console.log("[sync-lastmod] updated src/lib/seo/lastmod.json from git history");
