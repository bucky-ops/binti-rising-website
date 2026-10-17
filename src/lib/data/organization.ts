/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH - BINTI Rising Initiative entity data (spec R7, 2.1)
 * ============================================================================
 * Every page, schema node, OG tag and footer MUST import from this file.
 * No org string literals scattered across components.
 *
 * R1 - NEVER FABRICATE: only verified facts are populated below. Anything the
 * organisation has not yet confirmed in writing lives in PENDING_HUMAN_INPUT
 * and is rendered with a visible pending marker (`data-q-a="pending"`).
 *
 * BLOCKERS (awaiting human input - see OFFSITE_CHECKLIST.md):
 *  - CBO registration number
 *  - Street address + ward-level geo coordinates
 *  - Official phone number(s) (the previously listed +254 700 000 000 was a
 *    placeholder and has been removed)
 *  - Confirmed founder/leadership names (public reporting identifies
 *    Esther Gitaranga as Founder & Executive Director, but the organisation
 *    must confirm in writing before names are published/marked up)
 *  - Real M-Pesa Paybill / bank details (placeholders "123456"/KCB removed)
 *  - Real YouTube URL for the SRHR guide video
 *  - TikTok / LinkedIn / YouTube profile URLs
 *  - GSC / Bing verification tokens
 */

export interface PostalAddressData {
  street: string | null;
  locality: string;
  region: string;
  postalCode: string | null;
  country: "KE";
}

export interface ContactPointData {
  contactType: "donations" | "support" | "media" | "volunteering" | "partnerships";
  email: string;
  telephone: string | null;
  areaServed: string;
  availableLanguage: string[];
}

export interface ProgramPillar {
  slug: string;
  name: string;
  shortName: string;
  /** <= 45 chars, brand-appended by buildMetadata when it fits. */
  seoTitle: string;
  serviceType: string;
  summary: string;
  sessions: { title: string; desc: string }[];
  outcomes: string[];
  sdgs: number[];
}

export interface CommunityWard {
  slug: string;
  name: string;
  subCounty: string;
  description: string;
  lat: number | null;
  lng: number | null;
}

/**
 * Fields awaiting written human confirmation. Rendered with a visible
 * pending marker on relevant pages. Never silently fabricated (spec R1).
 */
export const PENDING_HUMAN_INPUT: { field: string; why: string; owner: string }[] = [
  {
    field: "registrationNumber",
    why: "CBO registration number is required for NGO schema `identifier`, the transparency page and directory citations.",
    owner: "Operations (scan of certificate)",
  },
  {
    field: "address.street / postalCode",
    why: "Full postal address required for NAP-perfect citations (Google Business Profile, directories).",
    owner: "Operations",
  },
  {
    field: "telephone",
    why: "A monitored phone/WhatsApp Business number must be confirmed before publishing; previous number was a placeholder.",
    owner: "Founder",
  },
  {
    field: "founder & leadership names",
    why: "Public press identifies Esther Gitaranga as Founder & Executive Director, but names/bios must be confirmed in writing (and consent given) before publication and Person markup.",
    owner: "Founder",
  },
  {
    field: "donation.paybill / bankAccount",
    why: "Previous Paybill 123456 and KCB details were placeholders and have been removed pending verified details.",
    owner: "Finance",
  },
  {
    field: "video.url",
    why: "The SRHR guide video previously embedded a placeholder YouTube ID. Provide the real URL to enable VideoObject markup.",
    owner: "Communications",
  },
  {
    field: "sameAs (TikTok/LinkedIn/YouTube)",
    why: "Exact profile URLs needed to complete the sameAs entity graph.",
    owner: "Communications",
  },
  {
    field: "googleSiteVerification / bingSiteVerification",
    why: "Search Console + Bing Webmaster verification meta tokens.",
    owner: "Founder (OFFSITE_CHECKLIST.md steps 1-2)",
  },
  {
    field: "impactMetrics baseline/endline figures",
    why: "KPI figures shown on the homepage are programme targets; verified baseline/endline figures must come from M&E before publication as results.",
    owner: "M&E Lead",
  },
];

export const ORG = {
  legalName: "BINTI Rising Initiative",
  displayName: "BINTI Rising",
  alternateName: ["BINTI", "Binti Rising", "Binti Rising Initiative", "Binti Rising Initiative Kenya"],
  url: "https://bintirising.org",
  logo: "/binti-logo.jpg",
  logoAlt: "BINTI Rising Initiative logo",
  description:
    "BINTI Rising Initiative is a registered community-based organisation (CBO) in Nairobi, Kenya, empowering young women aged 15-25 through four program pillars: sexual and reproductive health and rights (SRHR), mental health and wellbeing, financial freedom and literacy, and women's leadership.",
  slogan: "From silence, she rises.",
  foundingDate: "2024",
  nonprofitStatus: "Registered Community-Based Organisation (CBO), Kenya",
  registrationNumber: null as string | null, // PENDING_HUMAN_INPUT
  address: {
    street: null, // PENDING_HUMAN_INPUT
    locality: "Nairobi",
    region: "Nairobi County",
    postalCode: null as string | null, // PENDING_HUMAN_INPUT
    country: "KE" as const,
  },
  // Nairobi city-centre reference coordinates (approximate; ward-level geo pending)
  geo: { lat: -1.2921, lng: 36.8219 },
  phone: null as string | null, // PENDING_HUMAN_INPUT - placeholder removed
  email: "info@bintirising.org",
  contactPoint: [
    {
      contactType: "donations",
      email: "info@bintirising.org",
      telephone: null,
      areaServed: "KE",
      availableLanguage: ["en", "sw"],
    },
    {
      contactType: "support",
      email: "info@bintirising.org",
      telephone: null,
      areaServed: "KE",
      availableLanguage: ["en", "sw"],
    },
    {
      contactType: "media",
      email: "info@bintirising.org",
      telephone: null,
      areaServed: "KE",
      availableLanguage: ["en"],
    },
  ] as ContactPointData[],
  /**
   * External profiles that already exist (Phase 0 entity gap analysis).
   * Handles below were inherited from the existing site markup; each MUST be
   * human-verified before Phase 7 citations. TikTok/LinkedIn/YouTube pending.
   */
  sameAs: [
    "https://www.instagram.com/bintirising",
    "https://www.facebook.com/bintirising",
    "https://twitter.com/bintirising",
  ],
  founder: {
    // Publicly reported (Nation, Citizen TV) but NOT published on-site until the
    // organisation confirms in writing. Keep `publish: false` until then.
    name: "Esther Gitaranga",
    jobTitle: "Founder & Executive Director",
    publish: false,
    image: null as string | null,
    sameAs: [] as string[],
  },
  boardRoles: [
    { title: "Board Chairperson", responsibility: "Strategic governance, oversight and guidance for organisational growth and impact." },
    { title: "Board Secretary", responsibility: "Compliance, governance standards and documentation across all board activities." },
  ],
  staffRoles: [
    { title: "Founder & Executive Director", responsibility: "Vision and overall leadership of BINTI's mission across Nairobi communities." },
    { title: "Programs Manager", responsibility: "Oversees all four program pillars, ensuring quality delivery and alignment with community needs." },
    { title: "Monitoring & Evaluation Lead", responsibility: "Evidence-based programming through rigorous data collection and impact measurement." },
    { title: "Finance & Admin Lead", responsibility: "Financial systems, compliance and administrative operations with transparency." },
  ],
  languages: ["en", "sw"],
  currencies: ["KES"],
  sdgs: [3, 4, 5, 8, 10, 16],
  knowsAbout: [
    "sexual and reproductive health and rights",
    "SRHR education Kenya",
    "adolescent mental health",
    "financial literacy for women",
    "gender-based violence prevention",
    "women's leadership",
    "menstrual health",
    "community-based organisation management",
  ],
  knowsLanguage: ["en", "sw"],
  areaServedCity: "Nairobi",
  /**
   * Kenya national PUBLIC helplines (government-run services, not BINTI
   * lines). Shown on SRHR / mental-health / GBV content. Marked
   * verifyPending: confirm wording/availability with each service.
   */
  helplines: [
    {
      name: "GBV Toll-Free Line (Ministry of Public Service, Gender)",
      phone: "1195",
      description: "National toll-free line for reporting gender-based violence in Kenya.",
      verifyPending: true,
    },
    {
      name: "Childline Kenya",
      phone: "116",
      description: "National toll-free child helpline (call or WhatsApp).",
      verifyPending: true,
    },
    {
      name: "Kenya Red Cross",
      phone: "1199",
      description: "National toll-free emergency and psychosocial support line.",
      verifyPending: true,
    },
  ],
} as const;

export type Org = typeof ORG;

/** Absolute logo URL helper. */
export function orgLogoUrl(absolute: string): string {
  return `${absolute}${ORG.logo}`;
}
