/**
 * Full route inventory: core static routes + data-driven routes
 * (community wards, learn articles, stories). Used by sitemap.ts, RSS,
 * check-internal-links.mjs and check-metadata.mjs.
 */
import { CORE_ROUTES, type RouteEntry } from "./routes";
import { COMMUNITIES } from "@/lib/data/communities";
import { PROGRAMS } from "@/lib/data/programs";
import { LEARN_ARTICLES } from "@/lib/data/learn";
import { STORIES } from "@/lib/data/stories";
import lastmod from "./lastmod.json";

const CONTENT_EPOCH = "2026-10-17";

function lm(path: string): string {
  return (lastmod as Record<string, string>)[path] ?? CONTENT_EPOCH;
}

/** Ward pages (spec Phase 3 - local landing pages). */
export const COMMUNITY_ROUTES: RouteEntry[] = COMMUNITIES.map((w) => ({
  path: `/communities/${w.slug}`,
  kind: "community" as const,
  title: `Youth Programs in ${w.name}, Nairobi | BINTI Rising`,
  description: `BINTI Rising runs free SRHR, mental health, financial literacy and leadership programs for young women in ${w.name}, Nairobi. See sessions near you.`,
  changeFrequency: "monthly" as const,
  priority: 0.7,
  indexable: true,
  navLabel: w.name,
  cluster: "communities" as const,
}));

/** Learn articles. */
export const LEARN_ROUTES: RouteEntry[] = LEARN_ARTICLES.map((a) => ({
  path: `/learn/${a.slug}`,
  kind: "article" as const,
  title: a.title.length <= 58 ? a.title : a.title.slice(0, 55) + "...",
  description: a.metaDescription,
  changeFrequency: "monthly" as const,
  priority: 0.7,
  indexable: true,
  navLabel: a.title,
  cluster: "learn" as const,
}));

/** Anonymised participant stories. */
export const STORY_ROUTES: RouteEntry[] = STORIES.map((s) => ({
  path: `/stories/${s.slug}`,
  kind: "story" as const,
  title: `${s.attribution} | ${s.pillar} story`,
  description: `A young woman from ${s.ward} shares how BINTI Rising's ${s.pillar} program changed her outlook. Read her anonymised story of change.`,
  changeFrequency: "monthly" as const,
  priority: 0.6,
  indexable: true,
  navLabel: s.attribution,
  cluster: "stories" as const,
}));

export const ALL_ROUTES: RouteEntry[] = [
  ...CORE_ROUTES,
  ...COMMUNITY_ROUTES,
  ...LEARN_ROUTES,
  ...STORY_ROUTES,
];

/** Program metadata used across pages (titles/descriptions for spokes). */
export const PROGRAM_ROUTE_META: Record<
  string,
  { title: string; description: string }
> = Object.fromEntries(
  PROGRAMS.map((p) => [
    p.slug,
    {
      title: `${p.name} Program for Young Women in Nairobi | BINTI Rising`,
      description: p.summary.slice(0, 155),
    },
  ])
);

export { lm as lastModFor };
