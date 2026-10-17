/**
 * Typed route registry (spec 1.4) - the single inventory of every indexable,
 * unique-content URL on the site. Consumed by:
 *   - src/app/sitemap.ts          (sitemap generation)
 *   - scripts/check-metadata.mjs  (unique title/description/canonical audit)
 *   - scripts/check-internal-links.mjs (orphan / broken-link detection)
 *   - src/app/rss.xml/route.ts    (RSS feed)
 *
 * lastModified values come from src/lib/seo/lastmod.json, which is generated
 * from git history by `scripts/sync-lastmod.mjs`. NEVER use `new Date()` here:
 * a resetting lastmod destroys the freshness signal (spec 1.4).
 */
import lastmod from "./lastmod.json";

export type RouteKind =
  | "home"
  | "about"
  | "team"
  | "person"
  | "governance"
  | "programs"
  | "program"
  | "communities"
  | "community"
  | "stories"
  | "story"
  | "learn"
  | "article"
  | "resources"
  | "events"
  | "event"
  | "volunteer"
  | "partner"
  | "donate"
  | "contact"
  | "faqs";

export interface RouteEntry {
  path: string;
  kind: RouteKind;
  /** Unique title (<= 58 chars, keyword front-loaded) */
  title: string;
  /** Unique meta description (140-155 chars) */
  description: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  /** true = include in sitemap. Event/person pages are only added when data exists. */
  indexable: boolean;
  /** Internal-link label used by the hub-and-spoke checker. */
  navLabel?: string;
  /** Cluster this route belongs to (hub-and-spoke internal linking). */
  cluster?: "about" | "programs" | "communities" | "learn" | "stories" | "get-involved" | "utility";
}

const RAW_ROUTES: RouteEntry[] = [
  // ── Home ────────────────────────────────────────────────────────────────
  {
    path: "/",
    kind: "home",
    title: "BINTI Rising Initiative | Empowering Young Women in Nairobi",
    description:
      "Registered Kenyan CBO empowering young women 15-25 in Nairobi through SRHR, mental health, financial literacy and leadership programs. Join or donate today.",
    changeFrequency: "weekly",
    priority: 1,
    indexable: true,
    navLabel: "Home",
    cluster: "about",
  },
  // ── About hub ───────────────────────────────────────────────────────────
  {
    path: "/about",
    kind: "about",
    title: "About BINTI Rising | Registered CBO in Nairobi, Kenya",
    description:
      "Learn about BINTI Rising Initiative: our 2024 founding, mission, vision, values and the four pillars empowering young women aged 15-25 across Nairobi.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "About Us",
    cluster: "about",
  },
  {
    path: "/about/team",
    kind: "team",
    title: "Our Team & Leadership | BINTI Rising Initiative",
    description:
      "Meet the team and governance roles behind BINTI Rising Initiative, a registered CBO empowering young women in Nairobi, Kenya.",
    changeFrequency: "monthly",
    priority: 0.7,
    indexable: true,
    navLabel: "Our Team",
    cluster: "about",
  },
  {
    path: "/about/governance",
    kind: "governance",
    title: "Governance & Transparency | BINTI Rising Initiative",
    description:
      "Registration, governance structure, policies and accountability at BINTI Rising Initiative, a registered community-based organisation in Nairobi, Kenya.",
    changeFrequency: "monthly",
    priority: 0.7,
    indexable: true,
    navLabel: "Governance",
    cluster: "about",
  },
  // ── Programs hub & spokes ───────────────────────────────────────────────
  {
    path: "/programs",
    kind: "programs",
    title: "Programs for Young Women in Nairobi | BINTI Rising",
    description:
      "Four free program pillars for young women 15-25 in Nairobi: SRHR, mental health, financial freedom and leadership. 26 sessions over 6 months.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "Programs",
    cluster: "programs",
  },
  {
    path: "/programs/srhr",
    kind: "program",
    title: "SRHR Program in Nairobi for Young Women | BINTI Rising",
    description:
      "Free 8-session SRHR education for young women in Nairobi: body autonomy, consent, family planning, STI prevention and GBV awareness. Learn more.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "SRHR",
    cluster: "programs",
  },
  {
    path: "/programs/mental-health",
    kind: "program",
    title: "Mental Health Support for Young Women | BINTI Rising",
    description:
      "Free 6-session mental health and wellbeing program for young women in Nairobi: stress management, coping skills and emotional resilience. See sessions.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "Mental Health",
    cluster: "programs",
  },
  {
    path: "/programs/financial-freedom",
    kind: "program",
    title: "Financial Literacy Training in Nairobi | BINTI Rising",
    description:
      "Free 6-session financial literacy program for young women in Nairobi: budgeting, saving, entrepreneurship and starting a business with little capital.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "Financial Freedom",
    cluster: "programs",
  },
  {
    path: "/programs/leadership",
    kind: "program",
    title: "Women's Leadership Program in Nairobi | BINTI Rising",
    description:
      "Free 6-session leadership and empowerment program for young women in Nairobi: self-advocacy, public speaking and community engagement. View curriculum.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "Leadership",
    cluster: "programs",
  },
  // ── Communities (local landing pages) ───────────────────────────────────
  {
    path: "/communities",
    kind: "communities",
    title: "Communities We Serve in Nairobi | BINTI Rising",
    description:
      "BINTI Rising works with young women in 11 Nairobi communities including Kayole, Dandora, Mathare, Kasarani, Embakasi and Kibera. Find your area.",
    changeFrequency: "monthly",
    priority: 0.8,
    indexable: true,
    navLabel: "Communities",
    cluster: "communities",
  },
  // ward pages are generated from src/lib/data/communities.ts
  // ── Stories ─────────────────────────────────────────────────────────────
  {
    path: "/stories",
    kind: "stories",
    title: "Stories of Change | BINTI Rising Initiative",
    description:
      "Anonymised stories from young women in Nairobi whose lives changed through BINTI Rising's SRHR, mental health, financial literacy and leadership programs.",
    changeFrequency: "weekly",
    priority: 0.7,
    indexable: true,
    navLabel: "Stories",
    cluster: "stories",
  },
  // story slugs generated from src/lib/data/stories.ts
  // ── Learn hub & articles ────────────────────────────────────────────────
  {
    path: "/learn",
    kind: "learn",
    title: "Learn: SRHR, Mental Health & Money Guides | BINTI Rising",
    description:
      "Free, practical guides for young women in Kenya on SRHR rights, mental health, consent, GBV support, menstrual health and managing money on irregular income.",
    changeFrequency: "weekly",
    priority: 0.8,
    indexable: true,
    navLabel: "Learn",
    cluster: "learn",
  },
  // article slugs generated from src/lib/data/learn.ts
  // ── Resources ───────────────────────────────────────────────────────────
  {
    path: "/resources",
    kind: "resources",
    title: "Free Toolkits & Session Materials | BINTI Rising",
    description:
      "Session curricula, workshop outlines and toolkits from BINTI Rising's programs for young women in Nairobi. Request materials by email.",
    changeFrequency: "monthly",
    priority: 0.6,
    indexable: true,
    navLabel: "Resources",
    cluster: "learn",
  },
  // ── Get involved ────────────────────────────────────────────────────────
  {
    path: "/get-involved/volunteer",
    kind: "volunteer",
    title: "Volunteer With Us in Nairobi | BINTI Rising",
    description:
      "Volunteer with BINTI Rising: facilitate sessions, mentor young women, support M&E or communications in Nairobi. Apply online, response within 48 hours.",
    changeFrequency: "monthly",
    priority: 0.8,
    indexable: true,
    navLabel: "Volunteer",
    cluster: "get-involved",
  },
  {
    path: "/get-involved/partner",
    kind: "partner",
    title: "Partner With BINTI Rising | NGOs & Companies",
    description:
      "Partner with BINTI Rising Initiative: fund a cohort, co-deliver programs, provide venues or in-kind support for young women in Nairobi, Kenya.",
    changeFrequency: "monthly",
    priority: 0.8,
    indexable: true,
    navLabel: "Partner",
    cluster: "get-involved",
  },
  {
    path: "/get-involved/donate",
    kind: "donate",
    title: "Donate to Empower Young Women | BINTI Rising",
    description:
      "Support BINTI Rising Initiative. KES 1,000 funds a session for a young woman in Nairobi. Contact us to give via M-Pesa or bank transfer today.",
    changeFrequency: "monthly",
    priority: 0.9,
    indexable: true,
    navLabel: "Donate",
    cluster: "get-involved",
  },
  // ── Contact / FAQs ──────────────────────────────────────────────────────
  {
    path: "/contact",
    kind: "contact",
    title: "Contact BINTI Rising Initiative | Nairobi, Kenya",
    description:
      "Contact BINTI Rising Initiative in Nairobi, Kenya: email info@bintirising.org or send a message. We respond to general, volunteer and partner queries.",
    changeFrequency: "monthly",
    priority: 0.8,
    indexable: true,
    navLabel: "Contact",
    cluster: "utility",
  },
  {
    path: "/faqs",
    kind: "faqs",
    title: "FAQs: Programs, Volunteering & Donations | BINTI Rising",
    description:
      "Answers about BINTI Rising Initiative: who we serve (young women 15-25 in Nairobi), program cost (free), locations, impact measurement and how to help.",
    changeFrequency: "monthly",
    priority: 0.7,
    indexable: true,
    navLabel: "FAQs",
    cluster: "utility",
  },
  // ── Events (only indexable when a real event exists; currently none) ────
  {
    path: "/events",
    kind: "events",
    title: "Events & Workshops | BINTI Rising Initiative",
    description:
      "Upcoming workshops, launches and community sessions by BINTI Rising Initiative for young women across Nairobi, Kenya.",
    changeFrequency: "weekly",
    priority: 0.5,
    indexable: false, // flip to true when the first real event is published
    navLabel: "Events",
    cluster: "get-involved",
  },
];

/** Static routes (wards, learn articles, stories are appended from data modules). */
export const CORE_ROUTES: RouteEntry[] = RAW_ROUTES;

function lastModifiedFor(path: string, fallback: string): Date {
  const key = path === "/" ? "/" : path;
  const value = (lastmod as Record<string, string>)[key];
  return new Date(value ?? fallback);
}

/** Content freeze date used as fallback for entries not yet in git history. */
export const CONTENT_EPOCH = "2026-10-17";

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: RouteEntry["changeFrequency"];
  priority: number;
}

/**
 * Full sitemap inventory: core routes + generated ward/story/learn pages.
 * Populated by src/lib/seo/all-routes.ts (which merges data modules).
 */
export function routesForSitemap(entries: RouteEntry[]): SitemapUrl[] {
  return entries
    .filter((r) => r.indexable)
    .map((r) => ({
      url: r.path,
      lastModified: lastModifiedFor(r.path, CONTENT_EPOCH),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }));
}
