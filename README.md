# Binti Rising Initiative — Website (Overhaul)

> **From Silence, She Rises.** Peer-led Journey to Wholeness (JTW) mentorship for
> 15–25 AGYW in Kibera, Mathare & Kawangware, Nairobi. Data-driven, audited, DPA 2019 compliant.

**Production:** https://binti-rising-initiative.vercel.app/
**Overhaul branch:** `overhaul/nairobi-team-redesign`
**Full project plan:** see [PROJECT_PLAN.md](./PROJECT_PLAN.md) (simple-English, for the Nairobi team)

---

## The 5 sections (single route `/`, hash deep-links)

| Section | Hash | What's inside |
|---|---|---|
| Home | `#home` | 56px hero, animated impact strip, What We Do ×4, JTW teaser, partners marquee, quote, Brand Book (mood boards + UI kit) |
| Our Work / JTW | `#work` | Interactive S1–S8 stepper, session details, Very Heavy safeguards, Web of Support |
| Live Dashboard | `#dashboard` | KPI count-ups, attendance bars, wellbeing line, risk donut, area heatmap, indicators table, DATIM export |
| Accountability | `#accountability` | FY24/25 finance, segregation of duties, policy PDFs, anonymous complaints box |
| Get Involved | `#involved` | Join Circle (DPA consent + guardian 15–17), Donate M-Pesa 522522 / KCB, Partner MOU |

## Nairobi photo rule

ALL imagery comes from the Google Drive **"Nairobi"** folder only
(`public/nairobi-team/nairobi-01..14.webp` + `manifest.json` for traceability).
No stock photos. No invented photos. If a photo file is missing, the UI shows
**"Awaiting Nairobi Team photo upload"** — never a fake substitute.

## Data privacy (Kenya DPA 2019)

- Aggregates only on public surfaces; masked names ("F.W. — Kibera").
- `*.xlsx`, `*.csv`, `*.lnk` and `.env*` are git-ignored — raw data never lands in git.
- Join form accepts **initials only** (server rejects full names); guardian consent
  auto-required for ages 15–17; phone optional + consent-gated, never displayed.
- Complaints are anonymous (random reference `BRI-2026-XXXX`, no IP/name/email stored).

## Env setup (never hardcode tokens)

Create `.env.local` (already git-ignored):

```bash
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon key (RLS on)
SUPABASE_SERVICE_ROLE_KEY=       # server-only, never expose
VERCEL_TOKEN=                    # deploy automation
GITHUB_TOKEN=                    # push automation
DATABASE_URL=file:./db/custom.db # local dev (SQLite via Prisma)
```

> ⚠️ Any token shared in chat must be **rotated** after handover.

## Run locally

```bash
bun install
bun run db:push        # create tables (JoinRequest, Complaint, KpiMonthly)
bun scripts/binti-seed.ts   # seed aggregate KPI rows + generate nothing else
bun run dev            # http://localhost:3000
bun run lint           # 0 errors
```

## API surface

| Route | Method | Purpose |
|---|---|---|
| `/api/join` | POST | Join Circle (validates initials ≤4 chars, age 15–25, DPA + guardian consent) |
| `/api/complaints` | POST | Anonymous complaint → returns reference |
| `/api/kpis` | GET | Aggregated KPIs for the dashboard |
| `/api/reports/datim` | GET | DATIM / Global Fund CSV export (no PII) |

## Deploy

1. Push to branch `overhaul/nairobi-team-redesign`.
2. Vercel preview deploy → review by PM + Design + Safeguarding.
3. Merge to `main` → production.

---
© 2026 Binti Rising Initiative · Reg No NC/SD/CBO/2026/0123 · KRA PIN P051823456K
Hotline 1195 (GBV) · WhatsApp +254758919709 · Shortcode 20308 (Sema na Me)
