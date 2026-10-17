# INDEXING RUNBOOK — BINTI Rising Initiative

Operational runbook for getting (and keeping) the site indexed on Google,
Bing/Yandex/Seznam/Naver (IndexNow → also DuckDuckGo/ChatGPT/Copilot), and
the AI answer engines. Off-site click-paths live in `OFFSITE_CHECKLIST.md`;
this file covers everything machine-side.

## 1. Preconditions (already in the repo)

| Requirement | Where | Status |
|---|---|---|
| Canonical host derived from one env var | `src/lib/site-url.ts` (build throws on localhost/http in production) | ✅ |
| Generated robots.txt | `src/app/robots.ts` → allow `/`, disallow `/api/`, points at sitemap | ✅ |
| Sitemap from typed registry | `src/app/sitemap.ts` → 41 URLs, git-sourced lastmod | ✅ |
| One JSON-LD graph per page | `<JsonLdGraph nodes={fullPageGraph(...)}/>` | ✅ |
| IndexNow key file | `public/indexnow-key.txt` (`binti-2026-rise-key`) | ✅ |
| Deploy-time ping hook | `POST/GET /api/cron/indexnow` (CRON_SECRET), diffs vs `IndexPing` table | ✅ |
| RSS 2.0 | `/rss.xml` | ✅ |

## 2. Deploy checklist (every production deploy)

```bash
# 1. CI gates (must be green before merge):
npm run ci:seo        # lint → typecheck → build → check-noindex → validate-jsonld
                      # → check-internal-links → check-metadata

# 2. Post-deploy smoke (replace host):
for u in / /sitemap.xml /robots.txt /rss.xml /binti-2026-rise-key.txt; do
  curl -sI "https://bintirising.org$u" | head -1
done
# expect: 200 everywhere, no x-robots-tag: noindex

# 3. Trigger IndexNow diff (or wait for the daily Vercel Cron at 03:00 UTC):
curl -X POST "https://bintirising.org/api/cron/indexnow" \
  -H "x-cron-secret: $CRON_SECRET"
# expect: {"success":true,"submitted":N,...}
```

## 3. Sitemap maintenance

- Adding a page: add a `RouteEntry` to `src/lib/seo/routes.ts` (or the data module) with unique title/description. The sitemap, RSS, link checker and metadata checker pick it up automatically.
- lastmod: run `npm run seo:sync-lastmod` before committing content changes (rewrites `src/lib/seo/lastmod.json` from git history). **Never** hand-set `new Date()`.
- URL count > 50: split into `/sitemaps/{pages,programs,communities,learn,stories}.xml` behind `/sitemap.xml` index (spec 1.4). Implement before the 51st URL.

## 4. IndexNow automation

- Vercel Cron (configured in `vercel.json`): `0 3 * * *` → `/api/cron/indexnow`.
- Manual ping of specific URLs:
```bash
curl -X POST https://api.indexnow.org/IndexNow \
  -H "Content-Type: application/json" \
  -d '{"host":"https://bintirising.org","key":"binti-2026-rise-key",
       "keyLocation":"https://bintirising.org/binti-2026-rise-key.txt",
       "urlList":["https://bintirising.org/learn/<new-slug>"]}'
```
- Failures are logged per-URL in the `IndexPing` table; the API response includes an `alert` field on non-2xx. Wire the alert to email/Slack when a notification channel exists.

## 5. Weekly monitoring (15 min)

1. GSC → Performance: exported queries vs `KEYWORD_MAP.md` targets.
2. GSC → Indexing: Pages report. Triage:
   - `Discovered – currently not indexed` → internal links/crawl budget: add links from hub pages; request indexing.
   - `Crawled – currently not indexed` → content depth/uniqueness: expand or merge.
   - `Duplicate without user-selected canonical` → check `metadataBase`/canonical output (`npm run seo:check-metadata`).
   - `Soft 404` → thin/empty page: fix or 301.
3. Bing Webmaster → Index Explorer + crawl stats.
4. Broken links: `npm run seo:check-internal-links` (also catches orphans + >3-click depth).
5. Log results to `reports/seo-weekly-YYYY-MM-DD.md`.

## 6. AI answer-engine visibility (monthly)

Run the 20-prompt probe set (OFFSITE_CHECKLIST §9), record citations and
which URLs were used. Priority fixes when uncited:
- Add `DefinedTerm` entries (they are heavily extracted) to `/learn` articles.
- Ensure the answer paragraph (first 40-60 words) directly answers the prompt.
- Confirm the page's JSON-LD validates (schema drift breaks extraction).

## 7. Change control

- Never delete a live URL: 301 via `next.config.ts` `redirects()`.
- Slug changes: add redirect + update registry + IndexNow ping in the same PR.
- Every PR touching routes must keep `npm run ci:seo` green.
