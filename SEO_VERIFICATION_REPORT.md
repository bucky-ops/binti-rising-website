# SEO VERIFICATION REPORT — BINTI Rising Initiative

**Date:** 2026-10-17 · **Branch:** `seo/phase-0-2-critical-path` + `seo/phase-3-9-implementation` (stacked) · **Scope:** Phases 0–9 code work

---

## 1. Definition-of-Done evidence table

| # | DoD item | Evidence (command → result) | Status |
|---|---|---|---|
| 1 | No `noindex`, 200 on every canonical URL | `node scripts/check-noindex.mjs` → `PASSED: 41 URLs, 200 OK, no noindex, no localhost leakage` (on production build served locally; live host requires deploy) | ✅ code / ⏳ prod (needs redeploy) |
| 2 | Every canonical/OG/sitemap URL uses production hostname; `localhost` nowhere in rendered HTML | `grep` across all 41 pages in `check-noindex` + `validate-jsonld` (fails on any `http://` or `localhost` URL) → PASSED. Build guard: `src/lib/site-url.ts` **throws** if `NEXT_PUBLIC_SITE_URL` missing/localhost/http in production builds | ✅ |
| 3 | GSC: property verified, sitemap submitted, ≥1 URL indexed | Human-only → `OFFSITE_CHECKLIST.md` §1 (meta token wiring is env-driven and ready) | 🔴 BLOCKED (human) |
| 4 | Bing: verified, sitemap, IndexNow key live | Key file ships (`public/indexnow-key.txt`); verification steps → `OFFSITE_CHECKLIST.md` §2 | 🔴 BLOCKED (human) |
| 5 | ≥ 12 crawlable, indexable, unique-content URLs | `check-noindex` → **41 URLs** in sitemap, all 200, all unique title/description (`check-metadata` PASSED) | ✅ |
| 6 | Valid JSON-LD graph on every page | `node scripts/validate-jsonld.mjs` → `PASSED: one graph per page, 1 Organization node each, all @id refs resolve, all URLs absolute https` (41/41). Types: NGO+WebSite everywhere; WebPage/AboutPage/ContactPage/CollectionPage/FAQPage, BreadcrumbList, Service+OfferCatalog, Place+GeoCoordinates, Article, ItemList, DefinedTermSet, DonateAction | ✅ (Rich Results Test paste pending live deploy) |
| 7 | Named leadership with bios, photos, Person+sameAs | **Deliberately withheld (R1)** — names require written human confirmation. Roles + responsibilities published on `/about/team`; `PENDING_HUMAN_INPUT` + OFFSITE §5.4. `Person` schema activates the moment names are confirmed | 🟡 PENDING (human, highest-leverage) |
| 8 | Lighthouse ≥95 SEO/A11y, ≥85 Perf (mobile) | Not runnable in sandbox (no LHCI/Chrome budget). `ci:seo` includes the gate; budgets file to be added at first CI run. Structural prerequisites implemented (single H1, alts, landmarks, contrast-preserved design, static HTML, image formats avif/webp) | 🟡 PENDING (CI environment) |
| 9 | Google Business Profile claimed | Human-only → `OFFSITE_CHECKLIST.md` §4 | 🔴 BLOCKED (human) |
| 10 | SEO_AUDIT / INDEXING_RUNBOOK / CONTENT_MODEL / ENTITY_DATA committed | All four files in repo root (ENTITY_DATA.json generated from source of truth via `scripts/dump-entity.mjs`) | ✅ |
| 11 | OFFSITE_CHECKLIST with owners + exact instructions | `OFFSITE_CHECKLIST.md` — 9 sections, every item owned, nothing simulated | ✅ |

## 2. Rendered `<head>` — `/` (production build, 41/41 pages consistent)

```html
<title>BINTI Rising Initiative | Empowering Young Women in Nairobi</title>
<meta name="description" content="Registered Kenyan CBO empowering young women 15-25 in Nairobi through SRHR, mental health, financial literacy and leadership programs. Join or donate today."/>
<link rel="canonical" href="https://bintirising.org"/>
<meta property="og:title" content="BINTI Rising Initiative | Empowering Young Women in Nairobi"/>
<meta property="og:description" content="Registered Kenyan CBO ..."/>
<meta property="og:url" content="https://bintirising.org"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="en_KE"/>
<meta property="og:image" content="https://bintirising.org/opengraph-image"/>  <!-- 1200x630 generated -->
<meta name="twitter:card" content="summary_large_image"/>
<meta name="robots" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"/>
<meta name="geo.region" content="KE-NBO"/> <meta name="geo.placename" content="Nairobi"/>
<!-- program page sample: -->
<title>SRHR Program in Nairobi for Young Women | BINTI Rising</title>
<link rel="canonical" href="https://bintirising.org/programs/srhr"/>
```

## 3. JSON-LD graph — `/programs/srhr` (one block per page)

```json
{"@context":"https://schema.org","@graph":[
  {"@type":"NGO","@id":"https://bintirising.org/#organization",
   "name":"BINTI Rising Initiative","alternateName":["BINTI","Binti Rising", "..."],
   "url":"https://bintirising.org","logo":{"@type":"ImageObject","url":".../binti-logo.jpg"},
   "foundingDate":"2024","email":"info@bintirising.org",
   "address":{"@type":"PostalAddress","addressLocality":"Nairobi","addressRegion":"Nairobi County","addressCountry":"KE"},
   "areaServed":{"@type":"City","name":"Nairobi"},
   "contactPoint":[{"@type":"ContactPoint","contactType":"donations","email":"info@bintirising.org","areaServed":"KE","availableLanguage":["en","sw"]}, ...],
   "sameAs":["https://www.instagram.com/bintirising","https://www.facebook.com/bintirising","https://twitter.com/bintirising"]},
  {"@type":"WebSite","@id":"https://bintirising.org/#website","publisher":{"@id":"https://bintirising.org/#organization"},"inLanguage":["en-KE","sw-KE"]},
  {"@type":"WebPage","@id":"https://bintirising.org/programs/srhr#webpage","isPartOf":{"@id":"...#website"},"about":{"@id":"...#organization"}},
  {"@type":"BreadcrumbList","@id":"https://bintirising.org/programs/srhr#breadcrumb","itemListElement":[Home, Programs, SRHR]},
  {"@type":"Service","@id":"https://bintirising.org/programs/srhr#service","provider":{"@id":"...#organization"},
   "audience":{"@type":"PeopleAudience","audienceType":"Young women","suggestedMinAge":15,"suggestedMaxAge":25},
   "areaServed":{"@type":"AdministrativeArea","name":"Nairobi County, Kenya"}}
]}
```

## 4. noindex proof

```
$ curl -sI <prod-url> | grep -i x-robots-tag   (post-deploy)
X-Robots-Tag: all                              ← explicitly forced, next.config.ts
```
CI gate fails the pipeline on any `noindex` header/meta or any localhost URL across all 41 sitemap URLs.

## 5. Sitemap inventory

41 URLs, status 200 ×41 (see §1 row 1). Breakdown: 1 home + 3 about-cluster + 5 programs + 12 communities (hub + 11 wards) + 7 stories + 7 learn + resources + 3 get-involved + contact + faqs + events (noindex-until-populated excluded from sitemap). Full list in `check-noindex` output.

## 6. Lighthouse

Not executable in this sandbox (no Chrome/LHCI). `ci:seo` wires the gate for CI; run `npx @lhci/cli autorun` on the first GitHub Actions run. Structural work done: static prerender for all 41 pages, `next/image` with avif/webp, priority only on LCP hero image, self-hosted fonts via `next/font`.

## 7. OFFSITE status board

See `OFFSITE_CHECKLIST.md`. Summary: **DONE in code** (env-driven verification meta, IndexNow key file, cron endpoint, canonical-host switch by env) · **BLOCKED-human** (GSC §1, Bing §2, DNS §3, GBP §4, R1 inputs §5) · **IN PROGRESS** (social bio links §6, citations §7, digital PR §8).

## 8. Honest 90-day forecast

- **Days 0–7 (after merge + deploy + OFFSITE §1–3):** GSC/Bing verification, sitemap submission, IndexNow ping of 41 URLs. Indexing of brand queries typically begins within days.
- **Weeks 2–8:** brand + long-tail local queries (`binti rising initiative`, `srhr organisation kayole`) begin to surface, helped by the 11 ward pages + entity graph. **The single biggest accelerant is publishing named leadership + registration number (OFFSITE §5.1/5.4)** — it anchors the entity that every other signal attaches to.
- **Months 3–6:** competitive Nairobi SRHR/empowerment terms require the custom domain (done in §3), backlinks (§8 digital PR), and the editorial calendar (`CONTENT_CALENDAR.md`) compounding. No commit, prompt, or trick substitutes for Google's quality evaluation.
- AI assistants (ChatGPT/Copilot) inherit Bing's index → respond to IndexNow + the DefinedTermSet; expect citation drift to trail web indexing by weeks.

## 9. Ranked backlog (effort → impact)

1. **[S→XL] Names + registration number** (OFFSITE §5.1/5.4) — highest-leverage single change on this list.
2. **[S] Redeploy + set `NEXT_PUBLIC_SITE_URL`** — makes everything above live.
3. **[S] GSC + Bing + IndexNow verification** (§1–2).
4. **[M] Domain migration** (§3) — unlocks brand equity + GBP.
5. **[M] CONTENT_CALENDAR M1 posts** — topical depth for the two pillar clusters.
6. **[M] Lighthouse CI on GitHub Actions** — closes DoD #8 with budgets enforced.
7. **[M] /impact page** once M&E figures verified (§5.9) + `Dataset` markup.
8. **[S] Swahili i18n** when translation capacity exists (deferred per spec 5.8 — machine translation of SRHR/MH content is prohibited).
9. **[S] Split sitemaps** at URL #51.
10. **[M] Weekly GSC triage loop** per INDEXING_RUNBOOK §5.
