# SEO AUDIT — BINTI Rising Initiative (Phase 0)

**Audit date:** 2026-10-17 · **Auditor:** Technical SEO + Next.js platform engineer (per brief) · **Production target:** Option A — `bintirising.org` (see 0.3)

---

## 0.1 Response-header forensics (live production, 2026-10-17)

```
$ for u in / /sitemap.xml /robots.txt /api/contact /nonexistent-page; do
    echo "== $u"; curl -sI "https://binti-rising-initiative.vercel.app$u"
    | grep -iE 'HTTP/|x-robots-tag|cache-control|x-vercel|content-type|link:|location'; done

== /
HTTP/2 200
cache-control: public, max-age=0, must-revalidate
content-type: text/html; charset=utf-8
x-vercel-cache: HIT
== /sitemap.xml
HTTP/2 404                      ← BROKEN: sitemap 404s on production
== /robots.txt
HTTP/2 200 (text/plain)         ← static file only
== /api/contact                 404 on GET (POST route; expected)
== /nonexistent-page            404 (plain; no custom 404 with nav at the time)
```

**No `x-robots-tag: noindex` found on `/`.** The site is crawlable but effectively invisible (see 0.5).

## 0.2 Vercel project settings — BLOCKER (human access required)

Cannot be verified from code. Required human actions are in `OFFSITE_CHECKLIST.md` §0:
- Confirm Deployment Protection → Vercel Authentication = **Disabled** for production.
- Confirm `binti-rising-initiative.vercel.app` is a **production alias** (not a preview; previews carry `noindex`).
- Record which hostnames are `Production` in Settings → Domains.

## 0.3 Canonical-host decision

**DECISION: A (recommended, pending owner execution)** — point `bintirising.org` + `www` at Vercel as the single production domain, 308-redirect `binti-rising-initiative.vercel.app` → `https://bintirising.org`.

Rationale: `*.vercel.app` subdomains are crawl-throttled, carry no brand/entity equity, and cannot back GBP/citation NAP. Requires registrar DNS (A `76.76.21.21` / CNAME `cname.vercel-dns.com` — verify against current Vercel docs at deploy time) and `NEXT_PUBLIC_SITE_URL=https://bintirising.org` in Vercel env. **If neither option is authorised, the site runs on Option B** — the codebase now derives every URL from `NEXT_PUBLIC_SITE_URL`, so flipping hosts is an env-var change, not a code change.

The deployed production snapshot is **stale relative to repo `main`** (rendered title `Binti Rising Initiative · From Silence, She Rises.` vs. repo's newer metadata; og:url pointed at the vercel.app host). Redeploy of `main` alone (before this branch) would not have fixed findability — there was nothing to index.

## 0.4 Inventory (before)

| Route | Count |
|---|---|
| `src/app/page.tsx` | 1 (single-page site, all sections as `#anchors`) |
| `src/app/sitemap.ts` | 7 URLs — **all hash-anchors** (`/#about` etc.), all pointing at `/`, all `lastModified: new Date()` |
| `src/app/api/*` | 4 route handlers (contact, indexnow, seo/ping, health) |
| Indexable unique URLs | **1** |
| Sitemap on production | **404** (not deployed / not generated) |

## 0.5 Metadata forensics (live `/`, before)

| Item | Finding |
|---|---|
| `<title>` | Present but generic brand-only |
| meta description | Present |
| canonical link | **MISSING** |
| `og:url` | `https://binti-rising-initiative.vercel.app` (wrong host for brand) |
| H1 count | 1 |
| JSON-LD | **0 blocks** on the deployed version (repo `main` had 3 unvalidated blobs incl. FAQPage on every page + placeholder GSC token `your-google-verification-code`) |
| `localhost` leakage | none on prod |
| Image alt coverage | partial |

## 0.6 Keyword/intent map

→ `KEYWORD_MAP.md` (44 queries across informational / local / donation / partnership / crisis intent, each mapped to a post-implementation URL).

## 0.7 Entity gap analysis

**Exists externally, not linked or marked up on-site (before):**
- Press: The Nation (nation.africa), Citizen TV coverage of the founder and org
- Social: Facebook, Instagram, X/Twitter (handles used in old markup: `bintirising`), TikTok (handle unverified)
- Founder publicly identified in press as Esther Gitaranga (Founder & Executive Director)

**Now handled in code:** `sameAs` graph seeded with the three verifiable social URLs; TikTok/LinkedIn/YouTube + press URLs listed as PENDING in `PENDING_HUMAN_INPUT` and `OFFSITE_CHECKLIST.md` §6. Press citations are to be attached as `citation`/`mentions` on Articles once URLs are supplied (not `sameAs`).

## Trust/inventory violations found (R1) and remediated

| Violation on old site | Action in this branch |
|---|---|
| M-Pesa Paybill **123456** (placeholder) | Removed; "contact us to give" flow + visible pending notice |
| KCB bank details (unverified) | Removed; pending finance confirmation |
| Phone **+254 700 000 000** (placeholder) | Removed everywhere; no phone in schema until confirmed |
| Anonymous leadership cards with LinkedIn buttons linking nowhere | Roles kept with real responsibilities; names/photos pending written confirmation; dead LinkedIn buttons removed |
| Video section embedding **`dQw4w9WgXcQ`** (a Rick Astley placeholder) + invented stats "2.5K views / 12 mins / 4.8/5" | Removed; "video coming soon" state; `VideoObject` withheld until a real URL exists |
| Six full-name testimonials with no consent trail | Converted to **anonymised** accounts (age band + ward), visible anonymisation note + takedown contact |
| "Nairobi County Government" listed as partner (endorsement risk) | Replaced with descriptive ecosystem categories |
| GSC token placeholder `your-google-verification-code` | Removed; verification meta injected only from env |
| `SearchAction` in WebSite schema (no site search exists) | Removed per spec 4.2 |
| `numberOfEmployees 5-10` (invented) | Removed |
