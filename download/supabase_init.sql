-- =============================================================================
-- BINTI RISING INITIATIVE - Supabase initial schema (run once in SQL Editor)
-- How to run:
--   1. Create a free Supabase project (org "bucky-ops's Org" currently has
--      0 free slots: 2-project limit. Upgrade to Pro, or pause/delete one of
--      the existing projects (DukaFlow Production / peerlink) first).
--   2. Open Supabase Studio > SQL Editor, paste this whole file, Run.
--   3. Copy Project URL + service_role key into:
--      - local: .env.local  (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
--      - Vercel: Project Settings > Environment Variables (same names)
--   4. Redeploy. The site auto-detects the keys and starts reading KPIs from
--      Supabase and writing form submissions there (local SQLite fallback
--      stays available automatically).
-- Privacy (Kenya DPA 2019): aggregated KPIs only for public reads; form
-- tables are service-role write only (RLS enabled, no anon policies).
-- Column names are quoted camelCase on purpose: the app's JSON payloads then
-- pass through PostgREST unchanged (zero mapping code).
-- =============================================================================

create extension if not exists "pgcrypto";

-- 1) Aggregated KPIs (public reads allowed: aggregates only, no PII)
create table if not exists public.kpi_aggregates (
  id        uuid primary key default gen_random_uuid(),
  payload   jsonb not null,
  synced_at timestamptz not null default now()
);
alter table public.kpi_aggregates enable row level security;
drop policy if exists "anon can read aggregates" on public.kpi_aggregates;
create policy "anon can read aggregates"
  on public.kpi_aggregates for select
  to anon, authenticated
  using (true);

-- 2) Join Circle requests (initials only, 15-25, guardian consent 15-17)
create table if not exists public.join_requests (
  id               uuid primary key default gen_random_uuid(),
  "displayName"    text not null check (char_length("displayName") between 1 and 4),
  age              int  not null check (age between 15 and 25),
  area             text not null,
  phone            text,
  "consentDpa"     boolean not null default false,
  "guardianConsent" boolean not null default false,
  "createdAt"      timestamptz not null default now()
);
alter table public.join_requests enable row level security;

-- 3) Partner inquiries (institutional contacts, honeypot handled in app)
create table if not exists public.partner_inquiries (
  id            uuid primary key default gen_random_uuid(),
  reference     text unique not null,
  "orgName"     text not null,
  "contactName" text not null,
  role          text,
  email         text not null,
  "orgType"     text not null,
  interests     text not null,
  message       text,
  "consentDpa"  boolean not null default false,
  status        text not null default 'new',
  "createdAt"   timestamptz not null default now()
);
alter table public.partner_inquiries enable row level security;

-- 4) Anonymous complaints box (no PII by design; voice note = base64, capped 400KB)
create table if not exists public.complaints (
  id             uuid primary key default gen_random_uuid(),
  reference      text unique not null,
  category       text not null check (category in ('safeguarding','fraud','data','other')),
  message        text not null,
  "hasVoiceNote" boolean not null default false,
  "voiceNote"    text,
  status         text not null default 'received',
  "createdAt"    timestamptz not null default now()
);
alter table public.complaints enable row level security;

-- 5) Newsletter (email + mandatory DPA consent, idempotent upsert)
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text unique not null,
  "consentDpa" boolean not null default false,
  source       text not null default 'footer-form',
  "createdAt"  timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;

-- -----------------------------------------------------------------------------
-- Seed: latest site aggregates (matches the live dashboard, 24 facilitators
-- in 12 pairs). Re-run this INSERT after every dashboard data update.
-- -----------------------------------------------------------------------------
insert into public.kpi_aggregates (payload) values (
  '{
    "dataQuality": 94,
    "lastSync": "2 min ago",
    "kpis": [
      { "label": "Total Youth (YTD)", "value": 1248, "delta": "+8.2%", "sub": "enrolled across 3 areas" },
      { "label": "Facilitators", "value": 24, "delta": "✓ trained", "sub": "Surround Sound model · co-led in pairs" },
      { "label": "Referral Closure", "value": 87, "suffix": "%", "delta": "+5.4%", "sub": "LVCT + County pathways" },
      { "label": "Alumni", "value": 4500, "suffix": "+", "delta": "↑ 2.3%", "sub": "4,500+ and rising" }
    ],
    "areas": [
      { "name": "Kibera", "circles": 12, "youth": 612, "sessions": 96, "attendance": 93 },
      { "name": "Mathare", "circles": 9, "youth": 394, "sessions": 72, "attendance": 90 },
      { "name": "Kawangware", "circles": 7, "youth": 242, "sessions": 58, "attendance": 89 }
    ]
  }'::jsonb
);

-- Done. Verify with:
-- select synced_at, payload->'kpis' from public.kpi_aggregates order by synced_at desc limit 1;
