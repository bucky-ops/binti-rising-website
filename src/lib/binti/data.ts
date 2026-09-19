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
    "Peer-led 8-session Journey to Wholeness (JTW) mentorship for 15-25 AGYW on SRH, Mental Health and Healthy Relationships. Co-created by 50 youth.",
  regNo: "NC/SD/CBO/2026/0123",
  kraPin: "P051823456K",
  cboReg: "CBO/NAI/2024/0147",
  pboStatus: "PBO Pending",
  email: "hello@bintirising.or.ke",
  hotline: "1195",
  hotlineLabel: "Hotline 1195 GBV",
  whatsapp: "+254758919709",
  whatsappLink: "https://wa.me/254758919709",
  shortcode: "20308",
  shortcodeLabel: "Sema na Me",
  address: "Laini Saba Centre, Kibera, Nairobi",
  paybill: "522522",
  paybillAccount: "Binti Rising",
  bank: "KCB Bank — Acc 1234567890",
  socials: "@bintirising",
  lastSync: "2 min ago",
} as const;

// ---------- HERO IMPACT STRIP (aggregated totals — count-up animated) ----------
export const IMPACT_STRIP = [
  { value: 4500, suffix: "+", label: "Alumni", note: "since 2023" },
  { value: 36, suffix: "", label: "Facilitators", note: "peer-led, trained" },
  { value: 28, suffix: "", label: "Circles", note: "3 areas, Nairobi" },
  { value: 94, suffix: "%", label: "Data Quality", note: "audited sync" },
] as const;

// ---------- WHAT WE DO (4 pillars) ----------
export const WHAT_WE_DO = [
  {
    icon: "Heart",
    title: "SRH & Wellbeing",
    body: "8-session JTW curriculum covering sexual & reproductive health, emotions, consent and healthy relationships — co-created by 50 youth.",
    photo: "/nairobi-team/nairobi-06.webp",
    tag: "Peer-led",
  },
  {
    icon: "Users",
    title: "Sisterhood Circles",
    body: "Small safe circles in Laini Saba, Lindi and Mathare 4A. Every girl is met by a trained peer facilitator from her own community.",
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

// ---------- JTW: JOURNEY TO WHOLENESS — 8 SESSIONS ----------
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
    activities: ["Opening circle & name games", "Group agreements — HAKI YETU!", "What is JTW? Map of the 8 steps"],
    homework: "Share one hope for the journey with a trusted friend.",
    materials: "JTW Guide S1, name cards, circle charter poster",
    photo: "/nairobi-team/nairobi-04.webp",
  },
  {
    id: "S2",
    title: "Gender Toss Ball",
    focus: "See how gender roles are learned — and choose which ones to keep or drop.",
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
    shujaaz: "Shujaaz comic — 'Simu Yanga' emotions special",
  },
  {
    id: "S4",
    title: "Breaking Silence",
    focus: "The hardest step: speaking about violence, and building the Web of Support.",
    duration: 120,
    risk: "Very Heavy",
    activities: ["Breaking silence circles (voluntary share)", "Web of Support activity: draw 3 circles — Self, Trusted, Services", "Referral lists memorised by every facilitator", "Safeguarding focal point on standby · mandatory team debrief"],
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
    activities: ["Consent is a favourite 'yes' — scenarios", "Red flag / green flag gallery walk", "Boundary sentences practice"],
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
    activities: ["Media Reflection Box — analyse ads, songs, memes", "Rewrite the message challenge", "Shujaaz Special comic reading circle"],
    homework: "Bring one media example that shaped you.",
    materials: "Media Reflection Box, Shujaaz Special comics, watermarked prints",
    photo: "/nairobi-team/nairobi-13.webp",
    shujaaz: "Shujaaz Special — 'Binti x Kibera' edition",
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
    focus: "Celebrate the journey, certify the sisters, and pass the light forward.",
    duration: 120,
    risk: "Light",
    activities: ["Journey timeline walk S1→S8", "Certificates & rising-sun pins", "Alumni wall handprint — join the 4,500+", "Sema na Me WhatsApp onboarding"],
    homework: "Mentor one new sister entering S1.",
    materials: "Certificates, pins, alumni wall canvas",
    photo: "/nairobi-team/nairobi-02.webp",
  },
];

// ---------- LIVE IMPACT DASHBOARD (aggregated only) ----------
export const DASH_LAST_SYNC = "2 min ago";

export const KPIS = [
  { label: "Total Youth (YTD)", value: 1248, delta: "+8.2%", sub: "enrolled across 3 areas" },
  { label: "Facilitators", value: 36, delta: "✓ trained", sub: "Surround Sound model" },
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
  { indicator: "Facilitator : Youth ratio", baseline: 40, target: 35, actual: 35 },
];

export const DATA_QUALITY = 94;

// ---------- ACCOUNTABILITY ----------
export const FINANCE_FY2425 = [
  { line: "Programme Delivery (circles, materials)", pct: 62, kes: "KES 3.72M", note: "36 facilitators, 28 circles" },
  { line: "Facilitator Stipends", pct: 18, kes: "KES 1.08M", note: "peer-led model" },
  { line: "Monitoring, Evaluation & Data", pct: 7, kes: "KES 0.42M", note: "94% data quality" },
  { line: "Admin & Rent (Laini Saba)", pct: 8, kes: "KES 0.48M", note: "board-capped" },
  { line: "Fundraising & Audit", pct: 5, kes: "KES 0.30M", note: "external audit FY24" },
] as const;

export const SEGREGATION = [
  { role: "Board", detail: "Unpaid volunteers. Approve budgets. Sign-off with ED.", icon: "Landmark" },
  { role: "Executive Director", detail: "Cannot sign payments alone — needs one Board signatory.", icon: "UserRound" },
  { role: "Finance Officer", detail: "Not related to the ED. Keeps records, reconciles monthly.", icon: "Calculator" },
  { role: "Safeguarding Lead", detail: "Independent. No financial authority. Reports to Board.", icon: "ShieldCheck" },
] as const;

export const POLICIES = [
  { title: "Constitution — Non-Profit Clause", file: "/policies/binti-constitution.pdf", size: "PDF · 3 KB" },
  { title: "Safeguarding Policy", file: "/policies/binti-safeguarding-policy.pdf", size: "PDF · 3 KB" },
  { title: "DPA 2019 Data Protection Policy", file: "/policies/binti-dpa-2019-privacy.pdf", size: "PDF · 3 KB · Encrypted storage" },
  { title: "Finance Manual — Segregation of Duties", file: "/policies/binti-finance-manual.pdf", size: "PDF · 3 KB" },
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

// ---------- GET INVOLVED ----------
export const AREA_OPTIONS = ["Kibera", "Mathare", "Kawangware", "Other"] as const;

export const DONATE_TIERS = [
  { amount: 500, label: "KES 500", impact: "Materials for 1 girl for 1 session" },
  { amount: 2500, label: "KES 2,500", impact: "Full JTW session for a circle of 12" },
  { amount: 10000, label: "KES 10,000", impact: "One girl — the full 8-session journey" },
] as const;

// Facilitator cards (masked names only — DPA 2019)
export const FACILITATORS = [
  { name: "M. A.", area: "Kibera", role: "Lead Facilitator", sessions: "S1–S8", photo: "/nairobi-team/nairobi-01.webp" },
  { name: "A. N.", area: "Mathare", role: "Safeguarding Focal Point", sessions: "S4, S7", photo: "/nairobi-team/nairobi-12.webp" },
  { name: "F. W.", area: "Kawangware", role: "Circle Facilitator", sessions: "S2, S3, S6", photo: "/nairobi-team/nairobi-13.webp" },
] as const;

// Masked testimonial quote (hero) — DPA 2019: initials + area only
export const HERO_QUOTE = {
  text: "Remember the stone… you carried it, and you put it down.",
  author: "Binti, 19, Mathare",
  detail: "S4 Graduate",
};
