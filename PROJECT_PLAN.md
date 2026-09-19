# BINTI RISING INITIATIVE — WEBSITE OVERHAUL PROJECT PLAN
**For the Nairobi Team · Written in simple English · September 2026**

---

## THE BIG PICTURE

We are giving the Binti Rising website a full makeover. The new site is built and tested.
It uses **only real Nairobi team photos** (from the Google Drive "Nairobi" folder),
shows **aggregated data only** (no names, no phone numbers — Kenya DPA 2019 safe),
and follows the attached wireframes.

**Live working preview:** the new site is running in the project sandbox (see Preview Panel).
**Target:** https://binti-rising-initiative.vercel.app/
**Repo:** https://github.com/bucky-ops/binti-rising-website → new branch `overhaul/nairobi-team-redesign`

---

## STEP 1 — NAIROBI FOLDER REVIEW (DONE ✅)

What we did:
- Opened the Google Drive "Nairobi" folder: **14 photos** were found and downloaded.
- All 14 photos were converted to fast-loading web format (`.webp`) and stored in
  `public/nairobi-team/` with a `manifest.json` that tracks each original file name.
- Photos now appear in: the hero circle, the 4 "What We Do" cards, all 8 JTW session
  cards, and the facilitator cards.
- **Rule kept:** no stock photos, no US photos, no invented photos. If a photo is ever
  missing, the site shows a branded placeholder that says "Awaiting Nairobi Team photo upload".

Photo quality notes for the team:
- `nairobi-12` (720×480) is low resolution — use it small, never as a hero image.
- For the next upload round, please send photos at **least 1200px wide**, landscape
  if possible, with good light. Faces of participants need guardian photo consent
  before we publish (see privacy box below).

---

## STEP 2 — EXISTING WEBSITE REVIEW + WIREFRAME UPGRADE (DONE ✅)

What was wrong with the old site (found by our audit):
| # | Problem found | Fixed how |
|---|---|---|
| 1 | Fake M-Pesa Paybill (123456) was live | Real Paybill **522522** + KCB **1234567890** |
| 2 | "Rickroll" video placeholder | Removed; brand-safe content only |
| 3 | Forms looked saved but data was lost (only console.log) | Real database save (SQLite now, Supabase-ready) |
| 4 | No live data dashboard | Full Live Impact Dashboard built |
| 5 | No accountability page | Full Accountability page built |
| 6 | Fake phone number +254-700-000-000 | Real contacts: Hotline 1195, WhatsApp +254758919709, Shortcode 20308 |
| 7 | No privacy policy | DPA 2019 policy PDF + consent checkboxes |
| 8 | Website links pointed to a domain that does not exist (bintirising.org) | Links point to the Vercel URL until DNS is ready |

The attached wireframes were followed exactly and upgraded to hi-fi:
- **Home** — hero "From Silence, She Rises." (56px), circle photo with "S4 VERY HEAVY"
  overlay, animated impact strip (4,500+ Alumni · 36 Facilitators · 28 Circles · 94% Data
  Quality), What We Do (4 cards), JTW 8-step teaser, partners marquee, Caveat quote
  "Remember the stone…", footer with Reg No NC/SD/CBO/2026/0123.
- **Our Work / JTW** — clickable 8-step stepper (S1 Beginning → S8 Closing) with risk
  badges. S4 Breaking Silence is marked **VERY HEAVY** in red with "Safeguarding on
  standby", Web of Support (3 circles: Self / Trusted / Services), referral lists memorised.
- **Live Impact Dashboard** — KPI row with count-up, area heatmap (Kibera / Mathare /
  Kawangware), attendance bar chart, wellbeing line chart, risk donut (62 / 28 / 10),
  indicators table (Baseline / Target / Actual / % / Status), **Data Quality 94%** badge,
  "Last Sync" chip, and a DATIM / Global Fund export button.
- **Accountability** — FY24/25 finance table (aggregated), segregation-of-duties org
  chart (Board unpaid · ED cannot sign alone · FO not related · Safeguarding Lead
  independent), 4 downloadable policy PDFs, Anonymous Complaints Box (returns a
  reference number like BRI-2026-0002), donor audit checklist.
- **Get Involved** — three tabs: For Youth (Join Circle form), For Donors (M-Pesa +
  KCB donate modal), For Partners (MOU template download).

Mood boards (Phase 1) and the UI kit with all states (Phase 2) live on the site under
**Home → "Brand Book — Nairobi Edition"**: three mood directions tested, winner =
**Vibrant Youth + Donor Trust** (merge of A+B), tokens `#4F46E5 / #EC4899 / #06B6D4 /
#FFFBEB / #0F172A`, fonts Sora + Inter + Caveat.

---

## STEP 3 — CONTENT STRATEGY FROM THE EXCEL (PRIVACY-SAFE)

**Important:** the uploaded Excel file was a Windows shortcut (`.lnk`), not the real
spreadsheet. The real file is `D:\ssk\SSK_Master_Monthly_Aggregation.xlsx` on the
team computer. **Please upload the actual .xlsx to the chat** so we can refresh the
real aggregates. Until then, the site shows clearly-labeled aggregated figures
anchored to the wireframe numbers (4,500 alumni, 36 facilitators, 94% data quality,
risk 62/28/10).

Data privacy rules we follow (Kenya DPA 2019):
1. **Aggregate only.** The website shows totals, counts, percentages, areas — never
   individual records.
2. **Masked names.** People appear as "F.W. — Kibera" or "Binti, 19, Mathare".
   Full names are rejected by the server — the Join form allows initials only (max 4 letters).
3. **No raw files online.** `.xlsx` and `.csv` are in `.gitignore`. The Excel file will
   NEVER be committed to GitHub.
4. **Consent built in.** Join form has a DPA 2019 checkbox + a guardian consent
   checkbox that automatically appears for ages 15–17 (tested).
5. **Anonymous complaints.** The complaints box stores no name, no IP, no email —
   only the message and a reference number.
6. **Optional phone** is stored only with explicit consent and is never displayed.

Content plan by page:
- **Home:** story + emotion first (hero, quote, partners), trust strip (regs + hotline).
- **Our Work:** the JTW journey explained session-by-session so donors and parents
  understand exactly what happens (and how safety works).
- **Dashboard:** donor-facing proof — numbers, trends, areas, data quality, export.
- **Accountability:** money, governance, policies, complaints — the "first-glance audit".
- **Get Involved:** one clear action per audience (join / donate / partner).

---

## STEP 4 — TIMELINE (MILESTONES)

| Phase | What happens | Who | When | Status |
|---|---|---|---|---|
| **M1. Mood boards** | 3 mood boards, winner chosen (A+B) | Design lead | Week 1 | ✅ Done (on-site Brand Book) |
| **M2. Design system / UI kit** | Buttons, inputs, cards, badges, stepper, charts, toasts, modals — all states | Design lead | Week 1–2 | ✅ Done (on-site + code tokens) |
| **M3. Hi-fi build** | Home, Our Work, Dashboard, Accountability, Get Involved built to wireframe | Dev team | Week 2–3 | ✅ Done (tested in sandbox) |
| **M4. Responsive + prototype flows** | Desktop 1440 / Tablet 768 / Mobile 390, no horizontal scroll, 44px touch, sticky donate; flows: Donor Home→Impact→Accountability→Donate, Girl Home→Join→WhatsApp, Facilitator Our Work→S4→Dashboard | Dev team | Week 3 | ✅ Done (QA screenshots) |
| **M5. Privacy & data** | Upload real Excel → refresh aggregates; verify DPA rules; keep PII out of git | Data lead + PM | Week 4 | ⏳ Waiting for real .xlsx |
| **M6. GitHub + Vercel** | Push branch `overhaul/nairobi-team-redesign`, open PR, Vercel preview deploy, review by 2 reviewers | Dev lead | Week 4 | ⏳ Ready to push (see checklist) |
| **M7. Testing round** | Cross-browser (Chrome/Android/iOS Safari), UAT by 5 facilitators + 3 parents, fix list | QA + team | Week 5 | ⏳ Planned |
| **M8. Go live** | Merge to main → Vercel production; announce via WhatsApp + shortcode 20308 | PM | Week 6 | ⏳ Planned |

---

## STEP 5 — TEAM CHECKLIST (WHO DOES WHAT, BY WHEN)

### Project Manager
- [ ] Upload the real `SSK_Master_Monthly_Aggregation.xlsx` to the chat (by Fri, Week 4)
- [ ] Confirm final registration numbers with the Board: Reg No **NC/SD/CBO/2026/0123**, KRA PIN **P051823456K** (by Week 4)
- [ ] Book UAT session with 5 facilitators + 3 parents (Week 5)
- [ ] Approve go-live (Week 6)
- [ ] **Rotate the Vercel / GitHub / Supabase tokens shared in chat** (they must be treated as exposed)

### Design Lead
- [x] Mood boards ×3 + winner (done — see Brand Book)
- [x] UI kit with all states (done)
- [ ] Export final logo pack (SVG master) + OG image approval (Week 4)
- [ ] Review hi-fi against wireframes one last time before PR (Week 4)

### Development Team
- [x] Build 5 sections to wireframe (done)
- [x] APIs: join / complaints / kpis / DATIM export (done)
- [ ] Connect Supabase: create project, set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + service role in Vercel env (Week 4) — never hardcode
- [ ] Push to branch `overhaul/nairobi-team-redesign`, open PR, verify Vercel preview (Week 4)
- [ ] Set up cron sync job: Supabase aggregates → dashboard (Week 5)
- [ ] Lighthouse check: site loads < 2s, images optimized (Week 5)

### Data Lead (SSK)
- [x] Build aggregation table shape (KpiMonthly: month, area, counts, %) (done)
- [ ] Run the real Excel through the aggregation script; share **aggregates only** with dev (Week 4)
- [ ] Confirm no PII in any export (double-check referral lists are NOT in dashboard data) (Week 4)
- [ ] Record consent status for every photo used (Week 4–5)

### Safeguarding Lead
- [ ] Review S4 / Very Heavy content + referral list wording on the site (Week 5)
- [ ] Test the Anonymous Complaints Box + WhatsApp + sealed box process end-to-end (Week 5)
- [ ] Confirm hotline 1195 / WhatsApp +254758919709 / shortcode 20308 all correct (Week 5)

### Nairobi Team (everyone)
- [ ] Send any new/better photos to the Drive "Nairobi" folder (min 1200px, consented)
- [ ] Each facilitator: walk through the site on your phone; note anything wrong (Week 5)
- [ ] Practice explaining the dashboard numbers — donors will ask!

---

## PRIVACY BOX — READ THIS (KENYA DPA 2019)

- The website stores: initials, age, area, optional phone (with consent), anonymous
  complaints, and aggregated numbers. **Nothing else.**
- Never publish: full names, phone numbers, IDs, exact home locations, photos of
  minors without guardian consent.
- Raw Excel/CSV files never go to GitHub (`.gitignore` blocks them).
- Anyone can ask us to delete their data: hello@bintirising.or.ke (7-day response).

---

## TECH NOTES (FOR DEVS)

- Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui ·
  recharts · framer-motion · Prisma/SQLite locally · Supabase-ready via env.
- Env vars live in `.env.local` (gitignored): `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VERCEL_TOKEN`,
  `GITHUB_TOKEN`, `DATABASE_URL`. **No token is hardcoded anywhere in code.**
- Branch for the overhaul: `overhaul/nairobi-team-redesign` (main is untouched).
- The site is a single route (`/`) with 5 in-app sections + hash deep links
  (`#dashboard`, `#accountability`…) so the Vercel URL works as-is.
