# OFFSITE CHECKLIST — human-only actions

Every item below requires credentials, DNS, money, or a real person's
identity. **None of these can be executed from code.** Each has owner, exact
click-path, and status. Update status inline; do not fake completion.

---

## 0. Vercel project hygiene — OWNER: Founder/ops · Status: BLOCKED (awaiting access)

- [ ] Settings → Deployment Protection → **Vercel Authentication: Disabled** for production.
- [ ] Confirm `binti-rising-initiative.vercel.app` is a **production alias**, not a preview (previews are noindexed by Vercel by design).
- [ ] Settings → Domains: record production hostnames.
- [ ] Add env var `NEXT_PUBLIC_SITE_URL=https://bintirising.org` (Production + Preview + Development scopes).
- [ ] Add env vars `CRON_SECRET` (generate: `openssl rand -hex 32`), `INDEXNOW_KEY=binti-2026-rise-key`.
- [ ] Redeploy after merge so the new build (41 URLs) goes live.

## 1. Google Search Console — OWNER: Founder · Status: BLOCKED

- [ ] **Property A (Domain):** create Domain property `bintirising.org` → registrar DNS TXT record (`google-site-verification=<token>`) → verify.
- [ ] **Property B (URL-prefix):** `https://binti-rising-initiative.vercel.app/` → HTML meta tag method → copy token into Vercel env `GOOGLE_SITE_VERIFICATION` → redeploy (layout injects it) → verify.
- [ ] Submit sitemap `https://bintirising.org/sitemap.xml` to both properties.
- [ ] URL Inspection → Request Indexing on: `/`, `/about`, `/about/governance`, all 4 `/programs/*`, `/impact` (when live), `/contact`, top 5 `/learn/*`, top 3 `/stories/*`, top 3 `/communities/*`.
- [ ] Link GSC ↔ GA4 (or install Plausible/Fathom — recommended for donor privacy; needs a paid plan decision).

## 2. Bing Webmaster Tools + IndexNow — OWNER: Founder · Status: PARTIALLY BLOCKED

- [ ] Import site from GSC or verify via meta/XML at Bing Webmaster Tools.
- [ ] Submit `https://bintirising.org/sitemap.xml`.
- [ ] Confirm IndexNow key file serves: `curl https://bintirising.org/binti-2026-rise-key.txt` → expect `binti-2026-rise-key` with `Content-Type: text/plain`. (Ships in this branch at `public/indexnow-key.txt`.)
- [ ] Smoke test:
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://api.indexnow.org/indexnow?url=https://bintirising.org/&key=binti-2026-rise-key"
# expect 200 or 202
```
- [ ] (Covers Bing, Yandex, Seznam, Naver, Yep → and DuckDuckGo/ChatGPT/Copilot via Bing. Google still needs §1.)

## 3. Canonical domain (Option A) — OWNER: Founder (registrar) · Status: BLOCKED

- [ ] Add `bintirising.org` + `www.bintirising.org` in Vercel → Settings → Domains.
- [ ] At registrar: `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com` (verify against current Vercel docs at deploy time).
- [ ] Wait for DNS (24–48h) → confirm certificate issued.
- [ ] Set `binti-rising-initiative.vercel.app` to 308-redirect to `https://bintirising.org`.
- [ ] Re-verify both GSC properties post-move; update GBP website link.

## 4. Google Business Profile — OWNER: Founder · Status: BLOCKED (needs verified address + phone)

- [ ] Create profile: name exactly as legally registered; primary category **Non-profit organisation**; secondary: Community centre / Health education centre (as accurate).
- [ ] Service areas = the 11 wards in `/communities`.
- [ ] Description ≤ 750 chars (draft in `ENTITY_DATA.json` → ORG.description).
- [ ] Website → canonical URL; booking/donation link → `/get-involved/donate`.
- [ ] Photos: logo, program sessions (consented), events. Hours. Monthly posts.

## 5. Human-input blockers (R1) — each unblocks site features

| # | Input needed | Unblocks | Owner |
|---|---|---|---|
| 5.1 | CBO registration number + certificate scan | schema `identifier`, /about/governance, directory NAP | Ops |
| 5.2 | Street address + postal code | NGO schema, GBP, citations | Ops |
| 5.3 | Monitored phone/WhatsApp number | schema `telephone`, /contact, helpline page | Founder |
| 5.4 | Written confirmation + consent: founder & staff names/bios/photos (press reports name Esther Gitaranga as Founder & Executive Director — must be confirmed in writing before publication) | /about/team person pages, `Person` + `sameAs` schema | Founder + each person |
| 5.5 | Verified M-Pesa Paybill / bank details + receipt process | /get-involved/donate direct rails, `PaymentMethod` markup | Finance |
| 5.6 | Real YouTube URL of the SRHR guide (+ transcript if exists) | VideoObject markup, /learn transcript page | Communications |
| 5.7 | TikTok / LinkedIn / YouTube profile URLs | `sameAs` completion | Communications |
| 5.8 | Nation + Citizen TV article URLs | `citation`/`mentions` on Articles, Digital PR §7 | Communications |
| 5.9 | Verified baseline/endline KPI figures + methodology + sample sizes | /impact page + `Dataset` markup | M&E Lead |
| 5.10 | Signed consent records for existing stories (or keep anonymised permanently) | optional de-anonymisation | Programs |

## 6. Social profiles — link back to canonical site (NAP consistency)

- [ ] Instagram bio → `https://bintirising.org` (verify handle @bintirising is correct)
- [ ] Facebook page info → canonical URL
- [ ] X/Twitter bio → canonical URL
- [ ] TikTok bio → canonical URL (create if absent)
- [ ] LinkedIn company page (create/claim) → canonical URL

## 7. Citations & directories (NAP-perfect — only after 5.1/5.2/5.3)

- [ ] ngos.ke (Kenya NGO Portal) · [ ] Kenya NGO Coordination Board listing · [ ] Devex profile · [ ] GlobalGiving / Give2Asia applications · [ ] Charity Navigator / GreatNonprofits (if eligible) · [ ] local Kenya charity directories
- Every listing: identical name/address/phone + canonical URL.

## 8. Digital PR (convert existing coverage into links)

- [ ] Ask Nation + Citizen TV contacts for a dofollow link to the site.
- [ ] Pitch follow-up story with a strong hook (impact data once 5.9 lands).
- [ ] Get listed on partner CBO pages; speaker/event listings; university noticeboards.
- Target: 15 referring domains / 90 days, all editorially earned. **No PBNs, no paid links, no comment spam.**

## 9. AI-visibility tracking (monthly, 30 min)

- [ ] Run the 20-prompt probe set across ChatGPT/Gemini/Perplexity/Copilot (prompts in `reports/ai-visibility-YYYY-MM.md` template), record citations + source URLs, iterate schema/content on gaps.
