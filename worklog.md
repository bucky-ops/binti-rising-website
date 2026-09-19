# Binti Rising Initiative — Website Overhaul Worklog

---
Task ID: 1-a
Agent: Drive photo fetcher
Task: Download Nairobi Team photos from Google Drive folder into public/nairobi-team/

Work Log:
- Read worklog.md first: did not exist (I am the first agent), so no prior work to build on.
- Fetched the shared folder via the embeddedfolderview trick: curl "https://drive.google.com/embeddedfolderview?id=14cMsoPt6oLAr5BNGCVyvzv836WW_g-K5#grid" — this returned a clean HTML list. Folder title is "Nairobi"; it contains 14 image files directly, NO subfolders (no separate "Nairobi Team" subfolder exists), so per the client rule I used exactly these photos.
- Extracted all 14 file IDs + original names from the HTML (regex on flip-entry id / flip-entry-title). Files: 12.38.20.jpeg, 12.39.54.jpeg, IMG-20260601-WA0006/0009/0015.jpg, IMG-20260602-WA0002…WA0010.jpg.
- Downloaded originals with curl "https://drive.usercontent.google.com/download?id=FILE_ID&export=download" (full-resolution worked; no virus-scan interstitials encountered). Note: first loop attempt silently only downloaded 1 file (stdin/fd quirk with curl inside while-read); fixed by redirecting curl stdin from /dev/null and fd 3 for read — all 14 then downloaded, exit 0.
- Verified every downloaded file with `file`: all are real JPEG image data (resolutions 4032x2268 down to 720x480); zero HTML error pages, so nothing was discarded and all 14 kept (under the 15-photo cap).
- Created /home/z/my-project/public/nairobi-team/ and wrote /home/z/convert-1a.ts (kept OUTSIDE the Next.js project per the "no code in project" rule); ran it with `cd /home/z/my-project && bun /home/z/convert-1a.ts` using the project's sharp 0.34.5.
- Converted all 14 to webp: EXIF-rotated, resized to max width 1600 (no enlargement), quality 82; named nairobi-01.webp … nairobi-14.webp; wrote manifest.json with [{file, source, originalName, driveFileId}].
- Verified with `file`: all outputs are valid Web/P VP8 images; sizes 44 KB–308 KB (total ~2.1 MB). No files in the Next.js project were touched other than public/nairobi-team/*.

Stage Summary:
- 14 of 14 photos downloaded from the public "Nairobi" Drive folder (no subfolder; photos were directly in the shared folder) and saved as webp assets in /home/z/my-project/public/nairobi-team/: nairobi-01.webp (12.38.20.jpeg), nairobi-02.webp (12.39.54.jpeg), nairobi-03.webp (IMG-20260601-WA0006.jpg), nairobi-04.webp (IMG-20260601-WA0009.jpg), nairobi-05.webp (IMG-20260601-WA0015.jpg), nairobi-06.webp (IMG-20260602-WA0002.jpg), nairobi-07.webp (IMG-20260602-WA0003.jpg), nairobi-08.webp (IMG-20260602-WA0004.jpg), nairobi-09.webp (IMG-20260602-WA0005.jpg), nairobi-10.webp (IMG-20260602-WA0006.jpg), nairobi-11.webp (IMG-20260602-WA0007.jpg), nairobi-12.webp (IMG-20260602-WA0008.jpg), nairobi-13.webp (IMG-20260602-WA0009.jpg), nairobi-14.webp (IMG-20260602-WA0010.jpg). Mapping incl. Drive file IDs is in public/nairobi-team/manifest.json. Placeholders are NOT needed — real photos are ready to use.

---
Task ID: 1-b
Agent: Repo analyzer
Task: Analyze existing binti-rising-website repo + live site (record re-created by orchestrator from agent report; original append was lost)

Work Log:
- Cloned https://github.com/bucky-ops/binti-rising-website (public, no token needed) to /tmp/binti-existing; scanned git ls-files + filesystem for privacy issues.
- Fetched live site https://binti-rising-initiative.vercel.app/ HTML and compared with repo main (in sync).

Stage Summary:
- Tech stack: Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui + framer-motion + Prisma 6/SQLite (schema unused) on Vercel. Only branch: main (HEAD 71e471a).
- Existing single-page site sections: Navbar, Hero (stats 500+/10+/26), About, Programs (4 pillars), Leadership, Impact, Stories, Video, FAQ, GetInvolved (donate/volunteer/partner tabs), Footer, ScrollToTop. APIs: /api/contact (console.logs PII, never persists), /api/indexnow, /api/seo/ping.
- Critical gaps found: fake M-Pesa Paybill 123456 live, KCB no account number, fake phone +254-700-000-000, rickroll video placeholder, generic leadership/stories, canonical domain bintirising.org does not resolve, forms do not persist, no impact data dashboard, no accountability content, README/VERCEL guide UTF-16 garbled, ignoreBuildErrors=true.
- Privacy: no Excel/CSV/.env committed (clean). Form PII console.logged only.
- Decision: rebuild locally per wireframe with 5 sections (Home, Our Work/JTW, Live Dashboard, Accountability, Get Involved), then push to new branch overhaul/nairobi-team-redesign (non-destructive).

---
Task ID: 2
Agent: Orchestrator (Z.ai Code)
Task: Full website overhaul build — design system, 5 sections, APIs, assets, privacy, QA

Work Log:
- Read worklog (Tasks 1-a, 1-b); extracted full design spec from uploaded wireframe Binti-Rising-Redesign.html (minified React artifact): JTW = Journey to Wholeness S1-S8, Paybill 522522 / KCB 1234567890, risk donut 62/28/10, 94% data quality, 36 facilitators, 4,500 alumni, masked-name style, "Karibu Binti!" success, Caveat/Sora/Inter fonts, brand colors #4F46E5/#EC4899/#06B6D4/#FFFBEB/#0F172A.
- Flagged SSK_Master_Monthly_Aggregation.lnk = Windows shortcut (points to D:\ssk\...xlsx) — actual Excel NOT uploaded; used wireframe-anchored aggregated dataset only, clearly labeled.
- .env.local created (gitignored) with Supabase/Vercel/GitHub tokens per client rule (env, never hardcoded); advised rotation. .gitignore extended: *.xlsx, *.csv, *.lnk, /upload/, /tool-results/, /public/nairobi-team/originals/.
- prisma/schema.prisma: JoinRequest (initials-only, DPA+guardian consent), Complaint (anonymous + reference), KpiMonthly (aggregated snapshots). db:push OK; seeded 24 aggregate rows via scripts/binti-seed.ts.
- Assets: bri-logo.jpg → public/binti-logo.jpg; generated og.png (1200x630), favicon.png (circular); 5 real PDFs (Constitution, Safeguarding, DPA 2019, Finance Manual, MOU template) via pdf-lib in public/policies/.
- Design system in globals.css: binti tokens (@theme), Sora/Inter/Caveat via next/font, marquee + pulse + lift + duotone + custom scrollbar + reduced-motion.
- Components (src/components/binti/): ui.tsx (BintiMark, wordmark, NairobiPhoto w/ "Awaiting Nairobi Team photo upload" fallback, CountUp, RiskBadge, SectionHeading, DataNote); chrome.tsx (TopBar regs, Navbar + mobile Sheet, Footer with Reg NC/SD/CBO/2026/0123 + Hotline 1195 + WhatsApp); sections/home.tsx (hero 56px + S4 overlay + impact strip count-up + 4 pillar cards + JTW teaser + partners marquee + quote + Brand Book mood boards A/B/WINNER A+B + UI kit states); sections/work.tsx (8-step stepper, session detail, Very Heavy alert, Web of Support diagram); sections/dashboard.tsx (KPI row, attendance bar, wellbeing line, risk donut, area heatmap, indicators table Baseline/Target/Actual/%/Status, Data Quality 94%, DATIM export, refresh); sections/accountability.tsx (FY24/25 finance table, segregation org chart, policy downloads, anonymous complaints box + donor audit checklist); sections/involved.tsx (Join Circle w/ initials-only, age 15-25, area dropdown, optional phone, DPA consent, guardian 15-17, Karibu Binti success; DonateModal M-Pesa 522522 + KCB; partners MOU tab); site.tsx (single-route app, hash deep links, skip-link, sticky mobile Donate).
- APIs: /api/join (rejects full names server-side, guardian enforcement, 200 verified), /api/complaints (anonymous ref BRI-2026-XXXX), /api/kpis, /api/reports/datim (CSV, no PII).
- Fixed: home.tsx ./ui → ../ui import; removed 2 unused eslint-disable; lint now clean (0 errors, 0 warnings).

Stage Summary:
- Site fully rebuilt per wireframe on single / route with 5 in-app sections; dev server 200; lint clean.
- QA via agent-browser (desktop 1280 + mobile 390): hero, photos (real Nairobi Drive images), count-up, charts, stepper, join flow (incl. guardian consent path + server rejection of full names), donate modal, anonymous complaint (ref BRI-2026-0002), mobile hamburger + sticky donate, no horizontal scroll, no console page errors; all 5 PDFs + og + favicon + webp assets 200.
- Artifacts: qa-*.png screenshots in project root (untracked). Known limitation: Excel .lnk contains no data — aggregated figures anchored to wireframe/prompt numbers, clearly labeled; Supabase env vars empty until client supplies project URL/keys.
