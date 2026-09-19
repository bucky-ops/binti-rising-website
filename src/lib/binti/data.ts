// =============================================================================
// BINTI RISING INITIATIVE - CONTENT & DATA LAYER
// -----------------------------------------------------------------------------
// DATA PRIVACY (Kenya DPA 2019):
//  - This file contains ONLY aggregated counts, percentages and county/area
//    level figures. No full names, no phone numbers, no national IDs.
//  - Person references use masked initials + area, e.g. "F.W. - Kibera".
//  - Source: SSK Master Monthly Aggregation (masked). The raw Excel file is
//    NEVER committed to git (.gitignore: *.xlsx, *.csv) and never displayed.
//  - In production these figures are served from Supabase (env-configured)
//    with RLS; this local dataset mirrors the exact aggregate shape.
// =============================================================================

export type SectionId = "home" | "work" | "dashboard" | "accountability" | "involved";

export const ORG = {
  name: "Binti Rising Initiative",
  tagline: "From Silence, She Rises.",
  mission:
    "Peer-led 8-session Journey to Wholeness (JTW) mentorship for 15-25-year-olds of ALL genders on SRH, Mental Health and Healthy Relationships. Co-created by 50 youth. Binti supports the She, and the He too.",
  regNo: "NC/SD/CBO/2026/0123",
  hotline: "1195",
  hotlineLabel: "Hotline 1195 GBV",
  whatsapp: "+254758919709",
  whatsappLink: "https://wa.me/254758919709",
  semaBy: "Sema na Me · WhatsApp chatbot by Shujaaz",
  address: "Laini Saba Centre, Kibera, Nairobi",
  paybill: "522522",
  paybillAccount: "Binti Rising",
  bank: "KCB Bank - Acc 1234567890",
  socials: "@bintirising",
  lastSync: "2 min ago",
} as const;

// ---------- HERO IMPACT STRIP (aggregated totals, count-up animated) ----------
export const IMPACT_STRIP = [
  { value: 4500, suffix: "+", label: "Alumni", note: "since 2023" },
  { value: 24, suffix: "", label: "Facilitators", note: "co-led in pairs of 2" },
  { value: 28, suffix: "", label: "Circles", note: "3 areas, Nairobi" },
  { value: 94, suffix: "%", label: "Data Quality", note: "audited sync" },
] as const;

// ---------- WHAT WE DO (4 pillars) ----------
export const WHAT_WE_DO = [
  {
    icon: "Heart",
    title: "SRH & Wellbeing",
    body: "8-session JTW curriculum covering sexual & reproductive health, emotions, consent and healthy relationships - co-created by 50 youth.",
    photo: "/nairobi-team/nairobi-06.webp",
    tag: "Peer-led",
  },
  {
    icon: "Users",
    title: "Sisterhood Circles",
    body: "Small safe circles in Laini Saba, Lindi and Mathare 4A. Every young person is met by a trained peer facilitator pair from their own community.",
    photo: "/nairobi-team/nairobi-10.webp",
    tag: "28 circles",
  },
  {
    icon: "ShieldCheck",
    title: "Safety & Referrals",
    body: "Safeguarding on standby, referral lists memorised by facilitators, LVCT Health & Nairobi County pathways. GBV hotline 1195.",
    photo: "/nairobi-team/nairobi-03.webp",
    tag: "Safeguarding",
  },
  {
    icon: "BarChart3",
    title: "Live Data & Accountability",
    body: "Every session and shilling is aggregated and published. 94% data quality, DATIM-ready exports, no-cash policy. Donor trust, first glance.",
    photo: "/nairobi-team/nairobi-14.webp",
    tag: "Audit-ready",
  },
] as const;

// ---------- JTW: JOURNEY TO WHOLENESS (8 SESSIONS, ALL GENDERS) ----------
// JTW is a session for all genders: Binti does not just support the She,
// but also the He. Boys and young men join the same 8-session journey.
export const JTW_INCLUSION = {
  title: "JTW is for all genders",
  body: "Binti does not just support the She, but also the He. Boys and young men sit in the same circle, learn consent and healthy relationships, and help break the silence together.",
  chip: "All genders · She & He",
} as const;

export type Risk = "Light" | "Medium" | "Heavy" | "Very Heavy";

export interface JtwSession {
  id: string;
  title: string;
  focus: string;
  duration: number; // minutes
  risk: Risk;
  activities: string[];
  homework: string;
  materials: string;
  photo: string;
  shujaaz?: string;
}

export const JTW: JtwSession[] = [
  {
    id: "S1",
    title: "Beginning",
    focus: "Meet the circle. Set group agreements, expectations and the sisterhood contract.",
    duration: 90,
    risk: "Light",
    activities: ["Opening circle & name games", "Group agreements - HAKI YETU!", "What is JTW? Map of the 8 steps"],
    homework: "Share one hope for the journey with a trusted friend.",
    materials: "JTW Guide S1, name cards, circle charter poster",
    photo: "/nairobi-team/nairobi-04.webp",
  },
  {
    id: "S2",
    title: "Gender Toss Ball",
    focus: "See how gender roles are learned - and choose which ones to keep or drop.",
    duration: 90,
    risk: "Light",
    activities: ["Toss-ball icebreaker on roles", "Who taught me? Story pairs", "Keep / Drop wall of norms"],
    homework: "Notice one gender norm at home this week.",
    materials: "Soft ball, Keep/Drop cards, flip chart",
    photo: "/nairobi-team/nairobi-05.webp",
  },
  {
    id: "S3",
    title: "Emotions",
    focus: "Name feelings, carry them, and put some down. The stone exercise.",
    duration: 90,
    risk: "Medium",
    activities: ["Emotion vocabulary wheel", "Remember the stone… carry & release exercise", "Breathing & grounding practice"],
    homework: "Practice 3-minute grounding each evening.",
    materials: "Stones, emotion wheel cards, quiet corner",
    photo: "/nairobi-team/nairobi-07.webp",
    shujaaz: "Shujaaz comic - 'Simu Yanga' emotions special",
  },
  {
    id: "S4",
    title: "Breaking Silence",
    focus: "The hardest step: speaking about violence, and building the Web of Support.",
    duration: 120,
    risk: "Very Heavy",
    activities: ["Breaking silence circles (voluntary share)", "Web of Support activity: draw 3 circles - Self, Trusted, Services", "Referral lists memorised by every facilitator", "Safeguarding focal point on standby · mandatory team debrief"],
    homework: "Complete your personal Web of Support card.",
    materials: "Referral cards (LVCT, County health, GBV rescue), web-of-support sheets",
    photo: "/nairobi-team/nairobi-09.webp",
  },
  {
    id: "S5",
    title: "Relationships",
    focus: "Consent, boundaries, and spotting healthy vs unhealthy relationship signs.",
    duration: 90,
    risk: "Heavy",
    activities: ["Consent is a favourite 'yes' - scenarios", "Red flag / green flag gallery walk", "Boundary sentences practice"],
    homework: "Write one boundary sentence and use it once.",
    materials: "Flag cards, scenario deck, JTW Guide S5",
    photo: "/nairobi-team/nairobi-11.webp",
  },
  {
    id: "S6",
    title: "Media Reflection",
    focus: "Read the media around you: what is it selling about being a girl?",
    duration: 90,
    risk: "Medium",
    activities: ["Media Reflection Box - analyse ads, songs, memes", "Rewrite the message challenge", "Shujaaz Special comic reading circle"],
    homework: "Bring one media example that shaped you.",
    materials: "Media Reflection Box, Shujaaz Special comics, watermarked prints",
    photo: "/nairobi-team/nairobi-13.webp",
    shujaaz: "Shujaaz Special - 'Binti x Kibera' edition",
  },
  {
    id: "S7",
    title: "Repair",
    focus: "Mend what broke: apologies, forgiveness and community restoration.",
    duration: 90,
    risk: "Heavy",
    activities: ["Letters never sent (private)", "Apology languages role-play", "Community repair map"],
    homework: "Take one small repair action this week.",
    materials: "Letter paper & envelopes, repair map poster",
    photo: "/nairobi-team/nairobi-08.webp",
  },
  {
    id: "S8",
    title: "Closing",
    focus: "Celebrate the journey, certify the graduates, and pass the light forward.",
    duration: 120,
    risk: "Light",
    activities: ["Journey timeline walk S1→S8", "Certificates & rising-sun pins", "Alumni wall handprint - join the 4,500+", "Sema na Me WhatsApp onboarding"],
    homework: "Mentor one new sister entering S1.",
    materials: "Certificates, pins, alumni wall canvas",
    photo: "/nairobi-team/nairobi-02.webp",
  },
];

// ---------- LIVE IMPACT DASHBOARD (aggregated only) ----------
export const DASH_LAST_SYNC = "2 min ago";

export const KPIS = [
  { label: "Total Youth (YTD)", value: 1248, delta: "+8.2%", sub: "enrolled across 3 areas" },
  { label: "Facilitators", value: 24, delta: "✓ trained", sub: "Surround Sound model · co-led in pairs" },
  { label: "Referral Closure", value: 87, suffix: "%", delta: "+5.4%", sub: "LVCT + County pathways" },
  { label: "Alumni", value: 4500, suffix: "+", delta: "↑ 2.3%", sub: "4,500+ and rising" },
] as const;

export const AREAS = [
  { name: "Kibera", circles: 12, youth: 612, sessions: 96, attendance: 93 },
  { name: "Mathare", circles: 9, youth: 394, sessions: 72, attendance: 90 },
  { name: "Kawangware", circles: 7, youth: 242, sessions: 58, attendance: 89 },
] as const;

export const ATTENDANCE_BY_MONTH = [
  { month: "Apr", Kibera: 91, Mathare: 87, Kawangware: 84 },
  { month: "May", Kibera: 92, Mathare: 88, Kawangware: 86 },
  { month: "Jun", Kibera: 94, Mathare: 89, Kawangware: 88 },
  { month: "Jul", Kibera: 95, Mathare: 91, Kawangware: 89 },
  { month: "Aug", Kibera: 94, Mathare: 92, Kawangware: 90 },
  { month: "Sep", Kibera: 95, Mathare: 93, Kawangware: 90 },
];

export const WELLBEING_LINE = [
  { month: "Apr", score: 61 },
  { month: "May", score: 64 },
  { month: "Jun", score: 68 },
  { month: "Jul", score: 71 },
  { month: "Aug", score: 74 },
  { month: "Sep", score: 77 },
];

export const RISK_DONUT = [
  { name: "Low", value: 62, color: "#22c55e" },
  { name: "Medium", value: 28, color: "#f59e0b" },
  { name: "High → Referred", value: 10, color: "#ef4444" },
];

export const INDICATORS = [
  { indicator: "Retention Rate", baseline: 68, target: 90, actual: 94 },
  { indicator: "Attendance Rate", baseline: 70, target: 85, actual: 91 },
  { indicator: "Referral Closure", baseline: 45, target: 80, actual: 87 },
  { indicator: "Wellbeing Score", baseline: 52, target: 75, actual: 77 },
  { indicator: "SRH Knowledge", baseline: 48, target: 80, actual: 83 },
  { indicator: "GBV Reporting Confidence", baseline: 35, target: 70, actual: 74 },
  { indicator: "Youth per facilitator", baseline: 60, target: 55, actual: 52 },
];

export const DATA_QUALITY = 94;

// ---------- SSK CURRENT CYCLE (Apr-Jun 2026) - masked aggregates ----------
// Source: SSK All-Cohorts master workbook (aggregates only, Kenya DPA 2019).
// Facilitator pair labels are ANONYMISED ("Pair 01".."Pair 12", sorted by
// achievement). Only counts and percentages are published - never names.
export const SSK_CYCLE = {
  label: "SSK Cycle",
  window: "Apr-Jun 2026",
  registrations: 962,
  preTests: 952,
  submissions: 4334,
  postTests: 796,
  pairs: 12,
  targetPerPair: 440,
  onTrackThreshold: 75,
  gender: { female: 527, male: 433, other: 2 }, // share of 962 registrations
  age15to17: { count: 487, pct: 50.6 },
  cohorts: [
    { name: "Cohort 1 · Jun 7-13", total: 1117 },
    { name: "Cohort 2 · Jun 14-20", total: 1295 },
    { name: "Other", total: 11 },
  ],
  pairAchievement: [94.8, 93, 90.7, 85.2, 82.5, 82, 78.6, 76.6, 74.3, 72.5, 70.9, 64.5],
} as const;

// ---------- ACCOUNTABILITY ----------
export const FINANCE_FY2425 = [
  { line: "Programme Delivery (circles, materials)", pct: 62, kes: "KES 3.72M", note: "24 facilitators in 12 pairs, 28 circles" },
  { line: "Facilitator Stipends", pct: 18, kes: "KES 1.08M", note: "peer-led model" },
  { line: "Monitoring, Evaluation & Data", pct: 7, kes: "KES 0.42M", note: "94% data quality" },
  { line: "Admin & Rent (Laini Saba)", pct: 8, kes: "KES 0.48M", note: "board-capped" },
  { line: "Fundraising & Audit", pct: 5, kes: "KES 0.30M", note: "external audit FY24" },
] as const;

export const SEGREGATION = [
  { role: "Board", detail: "Unpaid volunteers. Approve budgets. Sign-off with ED.", icon: "Landmark" },
  { role: "Executive Director", detail: "Cannot sign payments alone - needs one Board signatory.", icon: "UserRound" },
  { role: "Finance Officer", detail: "Not related to the ED. Keeps records, reconciles monthly.", icon: "Calculator" },
  { role: "Safeguarding Lead", detail: "Independent. No financial authority. Reports to Board.", icon: "ShieldCheck" },
] as const;

export const POLICIES = [
  { title: "Constitution - Non-Profit Clause", file: "/policies/binti-constitution.pdf", size: "PDF · 3 KB" },
  { title: "Safeguarding Policy", file: "/policies/binti-safeguarding-policy.pdf", size: "PDF · 3 KB" },
  { title: "DPA 2019 Data Protection Policy", file: "/policies/binti-dpa-2019-privacy.pdf", size: "PDF · 3 KB · Encrypted storage" },
  { title: "Finance Manual - Segregation of Duties", file: "/policies/binti-finance-manual.pdf", size: "PDF · 3 KB" },
  { title: "Donor One-Pager FY24/25 - Statement of Need", file: "/policies/binti-donor-onepager.pdf", size: "PDF · 1 page" },
] as const;

export const PARTNERS = [
  "LVCT Health",
  "Shujaaz Inc",
  "Nairobi County Health",
  "Malala Sisterhood",
  "Mastercard Foundation",
  "Global Fund",
  "USAID",
  "PATH",
] as const;

// Trusted-by strip (hero): the three names the client wants shown first.
export const TRUSTED_BY = ["Shuga", "PATH", "Shujaaz"] as const;

// ---------- GET INVOLVED ----------
export const AREA_OPTIONS = ["Kibera", "Mathare", "Kawangware", "Other"] as const;

export const DONATE_TIERS = [
  { amount: 500, label: "KES 500", impact: "Materials for 1 girl for 1 session" },
  { amount: 2500, label: "KES 2,500", impact: "Full JTW session for a circle of 12" },
  { amount: 10000, label: "KES 10,000", impact: "One girl - the full 8-session journey" },
] as const;

// Facilitator cards (masked names only, DPA 2019)
// 24 trained facilitators co-facilitate EVERY session in pairs of 2.
// Showing 3 of the 12 pairs below.
export const FACILITATORS = [
  { name: "M. A.", area: "Kibera", role: "Lead Facilitator", pair: "Pair 1 · Kibera", sessions: "S1–S8", photo: "/nairobi-team/nairobi-01.webp" },
  { name: "B. K.", area: "Kibera", role: "Co-Facilitator (pair)", pair: "Pair 1 · Kibera", sessions: "S1–S8", photo: "/nairobi-team/nairobi-10.webp" },
  { name: "A. N.", area: "Mathare", role: "Safeguarding Focal Point", pair: "Pair 2 · Mathare", sessions: "S4, S7", photo: "/nairobi-team/nairobi-12.webp" },
  { name: "P. A.", area: "Mathare", role: "Co-Facilitator (pair)", pair: "Pair 2 · Mathare", sessions: "S4, S7", photo: "/nairobi-team/nairobi-03.webp" },
  { name: "F. W.", area: "Kawangware", role: "Lead Facilitator", pair: "Pair 3 · Kawangware", sessions: "S2, S3, S6", photo: "/nairobi-team/nairobi-13.webp" },
  { name: "N. M.", area: "Kawangware", role: "Co-Facilitator (pair)", pair: "Pair 3 · Kawangware", sessions: "S2, S3, S6", photo: "/nairobi-team/nairobi-11.webp" },
] as const;

export const FACILITATOR_NOTE = "24 trained facilitators co-facilitate every session in pairs of 2. Showing 3 of the 12 pairs.";

// Masked testimonial quote (hero) - DPA 2019: initials + area only
export const HERO_QUOTE = {
  text: "Remember the stone… you carried it, and you put it down.",
  author: "Binti, 19, Mathare",
  detail: "S4 Graduate",
};

// ---------- STORIES OF RISE (masked, DPA 2019 - initials + age + area only) ----------
export const STORIES = [
  {
    initials: "A. N.",
    age: 17,
    area: "Mathare",
    session: "S4 · Breaking Silence",
    quote:
      "In S4 I spoke for the first time about what happened to me. The Web of Support card has three numbers I now know by heart.",
    photo: "/nairobi-team/nairobi-09.webp",
    tag: "Referral closed in 48h",
  },
  {
    initials: "F. W.",
    age: 19,
    area: "Kibera",
    session: "S8 · Closing",
    quote:
      "I joined in silence. I left with a certificate, a pin, and my little sister's hand - I mentor her circle now.",
    photo: "/nairobi-team/nairobi-02.webp",
    tag: "Alumni → mentor",
  },
  {
    initials: "M. A.",
    age: 22,
    area: "Kawangware",
    session: "S6 · Media Reflection",
    quote:
      "The Media Box taught me to read the ads that were reading me. Now I rewrite the message - and my story.",
    photo: "/nairobi-team/nairobi-13.webp",
    tag: "Shujaaz Special featured",
  },
] as const;

// ---------- DONOR FAQ (accordion) ----------
export const FAQS = [
  {
    q: "Where exactly does my donation go?",
    a: "62% funds programme delivery (circles, materials, referrals), 18% peer-facilitator stipends, 7% monitoring & data, 8% admin (board-capped) and 5% fundraising & audit. Every line is published in aggregate on the Accountability page.",
  },
  {
    q: "Is my gift eligible for a tax receipt?",
    a: "Yes. Every M-Pesa or bank gift auto-generates a receipt for your records. We operate a strict no-cash policy: money never touches our hands.",
  },
  {
    q: "How is girls' data protected?",
    a: "Kenya DPA 2019 compliant end-to-end: initials only on forms, guardian consent for 15-17, encrypted storage, aggregates-only reporting. The masked Excel master never leaves the encrypted store and is never committed to any repository.",
  },
  {
    q: "What makes S4 'Very Heavy'?",
    a: "Session 4, Breaking Silence, is where young people of all genders speak about violence. Safeguarding focal points are on standby, referral lists are memorised by every facilitator pair, and the team holds a mandatory debrief the same day.",
  },
  {
    q: "Can donors visit a circle?",
    a: "Yes - with a 2-week notice and our safeguarding escort protocol. Donor observation never includes photography of youth without DPA consent from guardians.",
  },
  {
    q: "How do referrals actually close?",
    a: "Facilitator pairs memorise the LVCT Health and Nairobi County referral lists. A case is opened the day it is disclosed and tracked until the service confirms attendance, currently 87% closure.",
  },
] as const;

// ---------- DONATE: impact preview map + frequency copy ----------
export const DONATE_IMPACT: Record<number, string> = {
  500: "Materials for 1 girl for 1 session",
  2500: "A full JTW session for a circle of 12",
  10000: "One girl - the complete 8-session journey",
};

// ---------- DASHBOARD EXTRAS: sparklines + YoY comparison (aggregates only) ----------
export const KPI_SPARKS: Record<string, number[]> = {
  "Total Youth (YTD)": [820, 878, 942, 1030, 1118, 1248],
  Facilitators: [12, 14, 17, 19, 22, 24],
  "Referral Closure": [64, 68, 73, 79, 82, 87],
  Alumni: [3600, 3850, 4020, 4210, 4380, 4500],
};

export const ATTENDANCE_FY2425 = [
  { month: "Oct", Kibera: 88, Mathare: 84, Kawangware: 81 },
  { month: "Nov", Kibera: 89, Mathare: 85, Kawangware: 83 },
  { month: "Dec", Kibera: 87, Mathare: 83, Kawangware: 80 },
  { month: "Jan", Kibera: 89, Mathare: 86, Kawangware: 84 },
  { month: "Feb", Kibera: 90, Mathare: 87, Kawangware: 85 },
  { month: "Mar", Kibera: 91, Mathare: 87, Kawangware: 86 },
];

export const WELLBEING_FY2425 = [
  { month: "Oct", score: 52 },
  { month: "Nov", score: 54 },
  { month: "Dec", score: 53 },
  { month: "Jan", score: 56 },
  { month: "Feb", score: 58 },
  { month: "Mar", score: 61 },
];

// ---------- IMPACT CALCULATOR (donor conversion tool) ----------
// Unit costs from FY24/25 aggregate: KES 500 = 1 girl's materials for a
// session · KES 2,500 = one JTW session for a circle of 12 · KES 10,000 =
// one girl's full 8-session journey.
export const CALC_UNIT_COSTS = {
  materials: 500,
  session: 2500,
  journey: 10000,
} as const;

// ---------- CURRENCIES (international donors) ----------
// rate = KES per 1 unit, indicative interbank mid-rates (checked monthly,
// clearly labelled "indicative" in the UI). M-Pesa always charges KES.
export interface Currency {
  code: "KES" | "USD" | "EUR" | "GBP";
  symbol: string;
  rate: number; // KES per unit
  step: number; // slider step in this currency
}

export const CURRENCIES: Currency[] = [
  { code: "KES", symbol: "KSh ", rate: 1, step: 500 },
  { code: "USD", symbol: "$", rate: 129, step: 5 },
  { code: "EUR", symbol: "€", rate: 141, step: 5 },
  { code: "GBP", symbol: "£", rate: 165, step: 5 },
];

export const toKes = (amount: number, rate: number) => Math.round(amount * rate);
export const fromKes = (kes: number, rate: number, round5 = true) =>
  round5 ? Math.max(5, Math.round(kes / rate / 5) * 5) : Math.round(kes / rate);

// ---------- OUR STORY - milestone timeline 2023 → 2026 (aggregate facts) ----------
export const MILESTONES = [
  {
    year: "2023",
    title: "Fifty youth, one room in Laini Saba",
    body: "Binti Rising is born: 50 young women co-design the Journey to Wholeness curriculum in Kibera - because nothing about us, without us.",
    stat: "50 co-creators · 1 circle",
    tone: "indigo",
  },
  {
    year: "2024",
    title: "From one circle to a movement",
    body: "Sisterhood circles open across Mathare and Kawangware. First external audit, no-cash M-Pesa policy and the Finance Manual with segregation of duties.",
    stat: "28 circles · 3 areas · first audit",
    tone: "pink",
  },
  {
    year: "2025",
    title: "Data becomes our superpower",
    body: "The masked SSK master aggregation goes live: 94% data quality, Kenya DPA 2019 compliance, DATIM-ready exports. 24 peer facilitators certified (S1–S8), co-facilitating in 12 pairs.",
    stat: "24 facilitators · 12 pairs · 94% data quality",
    tone: "cyan",
  },
  {
    year: "2026",
    title: "JTW field-tested. Donors, you can watch it live.",
    body: "Oct 2025 – Mar 2026 cohort completes the 8-session journey. This donor dashboard, the accountability page and 4,500+ alumni - every number aggregated, every shilling receipted.",
    stat: "4,500+ alumni · live dashboard",
    tone: "amber",
  },
] as const;

// ---------- PER-AREA AGGREGATES (dashboard filter) ----------
// Everything below is area-level aggregation - no facility coords, no names.
export type AreaName = "Kibera" | "Mathare" | "Kawangware";

export const AREA_KPIS: Record<
  AreaName,
  { youth: number; facilitators: number; referralClosure: number; attendance: number }
> = {
  Kibera: { youth: 612, facilitators: 11, referralClosure: 89, attendance: 93 },
  Mathare: { youth: 394, facilitators: 8, referralClosure: 86, attendance: 90 },
  Kawangware: { youth: 242, facilitators: 5, referralClosure: 84, attendance: 89 },
};

// Risk split per area: [Low %, Medium %, High→Referred %]
export const AREA_RISK: Record<AreaName, [number, number, number]> = {
  Kibera: [64, 26, 10],
  Mathare: [61, 29, 10],
  Kawangware: [58, 31, 11],
};

// Wellbeing score per area per month (matches the org line, ±2 pts)
export const WELLBEING_BY_AREA: Record<AreaName, { month: string; score: number }[]> = {
  Kibera: [
    { month: "Apr", score: 63 },
    { month: "May", score: 66 },
    { month: "Jun", score: 70 },
    { month: "Jul", score: 73 },
    { month: "Aug", score: 76 },
    { month: "Sep", score: 79 },
  ],
  Mathare: [
    { month: "Apr", score: 60 },
    { month: "May", score: 63 },
    { month: "Jun", score: 67 },
    { month: "Jul", score: 70 },
    { month: "Aug", score: 73 },
    { month: "Sep", score: 76 },
  ],
  Kawangware: [
    { month: "Apr", score: 59 },
    { month: "May", score: 62 },
    { month: "Jun", score: 66 },
    { month: "Jul", score: 69 },
    { month: "Aug", score: 72 },
    { month: "Sep", score: 75 },
  ],
};

export const WELLBEING_FY2425_BY_AREA: Record<AreaName, { month: string; score: number }[]> = {
  Kibera: [
    { month: "Oct", score: 54 },
    { month: "Nov", score: 56 },
    { month: "Dec", score: 55 },
    { month: "Jan", score: 58 },
    { month: "Feb", score: 60 },
    { month: "Mar", score: 63 },
  ],
  Mathare: [
    { month: "Oct", score: 51 },
    { month: "Nov", score: 53 },
    { month: "Dec", score: 52 },
    { month: "Jan", score: 55 },
    { month: "Feb", score: 57 },
    { month: "Mar", score: 60 },
  ],
  Kawangware: [
    { month: "Oct", score: 50 },
    { month: "Nov", score: 52 },
    { month: "Dec", score: 51 },
    { month: "Jan", score: 54 },
    { month: "Feb", score: 56 },
    { month: "Mar", score: 59 },
  ],
};

// ---------- LIVE ACTIVITY FEED (aggregate, privacy-safe) ----------
// Masked circle events - areas + counts only, NEVER names or identifiers.
export const ACTIVITY_FEED = [
  { id: "a1", area: "Mathare", event: "Circle completed S4 · Breaking Silence", meta: "12 present · 2 referrals opened", ago: "2 h ago" },
  { id: "a2", area: "Kibera", event: "Referral closed at LVCT Health", meta: "48 h turnaround", ago: "5 h ago" },
  { id: "a3", area: "Kawangware", event: "S6 Media Reflection Box session", meta: "Shujaaz Special comics read", ago: "yesterday" },
  { id: "a4", area: "Kibera", event: "New facilitator pair certified (S1–S8)", meta: "23 → 24 trained", ago: "yesterday" },
  { id: "a5", area: "Mathare", event: "Guardian consent drive", meta: "9 consents for next cohort", ago: "2 d ago" },
  { id: "a6", area: "Kawangware", event: "S8 Closing · certificates + pins", meta: "11 graduates joined alumni wall", ago: "3 d ago" },
] as const;

// ---------- SEMA NA ME - canned safe flows ----------
// Sema na Me is a chatbot BY SHUJAAZ, available ONLY on WhatsApp.
export const SEMA_FLOWS = {
  greet: "Karibu! I'm Sema na Me 💬, the WhatsApp chatbot by Shujaaz. What would you like to do today?",
  byline: "A chatbot by Shujaaz · on WhatsApp only",
  options: [
    { id: "join", label: "Join a circle" },
    { id: "safe", label: "I need help now" },
    { id: "jtw", label: "What is JTW?" },
    { id: "donate", label: "Donate / support" },
  ],
  replies: {
    join:
      "Wonderful! 💛 Joining takes 2 minutes: initials only (never your full name), age 15–25, your area, and a guardian's OK if you're 15–17. Tap \"Join a circle\" on the Get Involved page, or WhatsApp us on +254758919709.",
    safe:
      "You are not alone. ❤️ For immediate help call the FREE GBV Hotline 1195 (24/7, all networks). You can also WhatsApp +254758919709 and a trained safeguarding listener replies. If you're in danger right now, try to reach a trusted adult or the nearest health centre. Your message stays anonymous.",
    jtw:
      "JTW = Journey to Wholeness, our peer-led 8-session programme (S1–S8) for 15–25-year-olds of ALL genders (Binti supports the She, and the He too) on SRH, emotions, consent and healthy relationships. Session 4, Breaking Silence, is where the healing gets real, with safeguarding on standby throughout.",
    donate:
      "Asante sana! 🙏 Every shilling is M-Pesa-receipted and audit-logged: Paybill 522522, account \"Binti Rising\". KES 10,000 takes one girl through the full journey. Tap \"Donate M-Pesa\" any time.",
  } as Record<string, string>,
  fallback:
    "I can help with: joining a circle, immediate support, what JTW is, or donating. For anything else, WhatsApp +254758919709 or dial 1195 if you need help now.",
} as const;

// ---------- GALLERY - "Inside the Circles" --------------------------------
// Photos come ONLY from /public/nairobi-team/ (Drive manifest). Captions are
// activity-level and DPA-safe: NEVER names, never faces-identified claims.
export type GalleryKind = "Circle Session" | "Facilitator Training" | "Community Day";
export type GalleryItem = {
  src: string;
  area: AreaName;
  kind: GalleryKind;
  caption: string;
  session?: string; // JTW session label where relevant
};

export const GALLERY: GalleryItem[] = [
  { src: "/nairobi-team/nairobi-02.webp", area: "Kibera", kind: "Circle Session", caption: "Opening round - every voice heard before the session begins", session: "S1 · Welcome" },
  { src: "/nairobi-team/nairobi-04.webp", area: "Mathare", kind: "Circle Session", caption: "Body mapping exercise - naming emotions without shame", session: "S3 · My Body" },
  { src: "/nairobi-team/nairobi-05.webp", area: "Kawangware", kind: "Facilitator Training", caption: "Facilitators rehearse referral scripts before every heavy session" },
  { src: "/nairobi-team/nairobi-07.webp", area: "Kibera", kind: "Community Day", caption: "Guardians' open day - families tour the circle space" },
  { src: "/nairobi-team/nairobi-08.webp", area: "Mathare", kind: "Circle Session", caption: "Web of Support - each thread is a person she can call", session: "S4 · Breaking Silence" },
  { src: "/nairobi-team/nairobi-09.webp", area: "Kawangware", kind: "Community Day", caption: "Shujaaz comics distribution - learning between sessions" },
  { src: "/nairobi-team/nairobi-10.webp", area: "Kibera", kind: "Facilitator Training", caption: "Monthly data huddle - registers checked, no names on paper" },
  { src: "/nairobi-team/nairobi-12.webp", area: "Mathare", kind: "Circle Session", caption: "Media Reflection Box - unpacking what the feeds tell us", session: "S6 · Media" },
  { src: "/nairobi-team/nairobi-13.webp", area: "Kawangware", kind: "Circle Session", caption: "Money heist skit - practising savings goals with laughter", session: "S7 · Money" },
  { src: "/nairobi-team/nairobi-14.webp", area: "Kibera", kind: "Community Day", caption: "Closing circle - certificates, pins and proud guardians", session: "S8 · Closing" },
  { src: "/nairobi-team/nairobi-03.webp", area: "Mathare", kind: "Facilitator Training", caption: "New cohort training - 24 facilitators co-led in 12 pairs" },
  { src: "/nairobi-team/nairobi-11.webp", area: "Kawangware", kind: "Circle Session", caption: "Trust game - the quiet half of the room speaks first", session: "S2 · Trust" },
];

export const GALLERY_KINDS: GalleryKind[] = ["Circle Session", "Facilitator Training", "Community Day"];

// ---------- ALUMNI WALL - masked initials only (DPA 2019) ----------------
// Style matches STORIES: "F.F - Kibera". No names, no faces, no contacts.
// consentNote: every alum listed gave written consent for initials-only use.
export type AlumniTile = {
  initials: string;
  area: AreaName;
  cohort: string; // graduation year
  now: string; // aggregate-status line, never identifying
  tone: "indigo" | "pink" | "cyan" | "amber";
};

export const ALUMNI_WALL: AlumniTile[] = [
  { initials: "F. W.", area: "Kibera", cohort: "2025", now: "Mentors her sister's circle", tone: "pink" },
  { initials: "A. N.", area: "Mathare", cohort: "2025", now: "Peer facilitator · cohort 7", tone: "indigo" },
  { initials: "M. A.", area: "Kawangware", cohort: "2024", now: "Shujaaz Special contributor", tone: "cyan" },
  { initials: "C. K.", area: "Kibera", cohort: "2024", now: "County youth rep · SRH forum", tone: "amber" },
  { initials: "P. A.", area: "Mathare", cohort: "2025", now: "Saved KES 8,400 in circle bank", tone: "indigo" },
  { initials: "N. M.", area: "Kawangware", cohort: "2026", now: "First in family to sit KCSE", tone: "pink" },
  { initials: "S. O.", area: "Kibera", cohort: "2026", now: "Referral closed · now a buddy", tone: "cyan" },
  { initials: "J. N.", area: "Mathare", cohort: "2024", now: "Runs a market produce stall", tone: "amber" },
  { initials: "E. W.", area: "Kawangware", cohort: "2025", now: "Alumni hub volunteer · Fridays", tone: "indigo" },
  { initials: "G. A.", area: "Kibera", cohort: "2026", now: "Debate club captain · school", tone: "pink" },
  { initials: "R. M.", area: "Mathare", cohort: "2026", now: "Guardian- approved peer educator", tone: "cyan" },
  { initials: "B. K.", area: "Kawangware", cohort: "2024", now: "4.5 years on the alumni wall", tone: "amber" },
];
