# CONTENT MODEL — BINTI Rising Initiative

Two layers, one source of truth. **Nothing renders from a second copy.**

## Layer 1 — Typed data registry (renders the public site)

Vercel-safe, zero database dependency, prerendered static HTML (R3).

```
src/lib/data/
  organization.ts   ← ORG const + PENDING_HUMAN_INPUT + types
                       (legalName, address, contactPoint, sameAs, founder,
                        board/staff roles, helplines, sdgs, knowsAbout)
  programs.ts       ← PROGRAMS: 4 pillars (sessions, outcomes/targets, sdgs)
  communities.ts    ← COMMUNITIES: 11 Nairobi wards (subCounty, geo, description)
  stories.ts        ← STORIES: 6 anonymised participant accounts
  faqs.ts           ← FAQS: 10 Q&As (+ HOME_FAQ_TEASER subset)
  learn.ts          ← LEARN_ARTICLES: 6 editorial guides as typed Blocks
src/lib/seo/
  routes.ts         ← RouteEntry registry (title/description/priority/cluster)
  all-routes.ts     ← merges core routes + data-driven routes
  lastmod.json      ← git-sourced lastModified (sync-lastmod.mjs); never new Date()
  schema.ts         ← JSON-LD node builders (@id-anchored)
  metadata.ts       ← buildMetadata() — the only place titles/OG are composed
```

Rules:
- Every page imports entity data from `src/lib/data/*` (R7) — no string literals.
- New content type ⇒ add a typed module + registry entry + sitemap inclusion.
- `PENDING_HUMAN_INPUT` fields render a visible `data-q-a="pending"` marker.

## Layer 2 — Prisma content store (editorial + automation)

`prisma/schema.prisma` — seeded from Layer 1 via `bun prisma/seed.ts`.

| Model | Purpose | Notes |
|---|---|---|
| `Person` | Leadership directory | `publish=false` until written consent (R1) |
| `Program` | Pillar records | sessions/outcomes stored as JSON |
| `Location` | Ward records | geo + sub-county |
| `Story` | Participant stories | `anonymised=true`, `consentId` FK to consent |
| `Event` | Workshops/launches | `status=draft` until confirmed; /events/[slug] generates only published events |
| `Faq` | FAQ records | orderable |
| `Resource` | Toolkits | `fileUrl` only when a real file exists |
| `MediaAsset` | Logo/video registry | video URL pending |
| `ConsentRecord` | Consent trail | stories/photos/names — required before de-anonymising |
| `ImpactMetric` | KPI baselines/endlines | `verified=false` blocks publication (R1) |
| `IndexPing` | IndexNow diff state | used by /api/cron/indexnow |

## URL → schema map (41 indexable URLs)

| URL pattern | Type nodes (beyond site-level NGO + WebSite) |
|---|---|
| `/` | WebPage, BreadcrumbList |
| `/about` | AboutPage + Breadcrumb |
| `/about/team` | CollectionPage + Breadcrumb |
| `/about/governance` | AboutPage + Breadcrumb |
| `/programs` | CollectionPage + OfferCatalog + ItemList + Breadcrumb |
| `/programs/[slug]` | Service (audience 15-25, areaServed Nairobi County) + Breadcrumb |
| `/communities` | CollectionPage + ItemList + Breadcrumb |
| `/communities/[ward]` | Place + GeoCoordinates + Breadcrumb |
| `/stories` | CollectionPage + ItemList + Breadcrumb |
| `/stories/[slug]` | Article + Breadcrumb |
| `/learn` | CollectionPage + ItemList + DefinedTermSet + Breadcrumb |
| `/learn/[slug]` | Article + Breadcrumb |
| `/resources` | CollectionPage + Breadcrumb |
| `/events` | CollectionPage + Breadcrumb (Event pages when first event publishes) |
| `/get-involved/{volunteer,partner}` | WebPage + Breadcrumb |
| `/get-involved/donate` | WebPage + DonateAction + Breadcrumb |
| `/contact` | ContactPage + Breadcrumb |
| `/faqs` | WebPage + FAQPage (10 visible Q&As) + Breadcrumb |

Deliberately withheld: `Person` (names unconfirmed), `VideoObject` (no real video URL), `Event` (no confirmed events), verified `Dataset`/impact figures (M&E pending).
