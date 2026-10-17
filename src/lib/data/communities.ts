import type { CommunityWard } from "./organization";

/**
 * Nairobi communities (wards/sub-locations) where BINTI Rising delivers
 * programs. The site claims "10+ communities across Nairobi"; the ward list
 * below was supplied by the SEO brief (owner-provided). Ward-level statistics
 * and named outreach contacts are PENDING_HUMAN_INPUT - do not invent them.
 * Ward descriptions are factual, public-knowledge context only.
 */
export const COMMUNITIES: CommunityWard[] = [
  {
    slug: "kayole",
    name: "Kayole",
    subCounty: "Embakasi East",
    description:
      "A densely settled residential estate in Embakasi East, home to many young families and a vibrant youth population within reach of Nairobi's industrial job market.",
    lat: -1.2617,
    lng: 36.9166,
  },
  {
    slug: "mawanga",
    name: "Mawanga",
    subCounty: "Embakasi",
    description:
      "A growing settlement area in the Embakasi side of Nairobi where residents balance informal-sector livelihoods with limited access to youth services.",
    lat: -1.3167,
    lng: 36.9,
  },
  {
    slug: "dandora",
    name: "Dandora",
    subCounty: "Embakasi North",
    description:
      "Known countrywide for its solid-waste dumpsite, Dandora is a resilient community where environmental health burdens fall heaviest on women and girls.",
    lat: -1.2622,
    lng: 36.9033,
  },
  {
    slug: "kasarani",
    name: "Kasarani",
    subCounty: "Kasarani",
    description:
      "A fast-growing sub-county along Thika Road mixing planned estates with informal settlements, with a large population of school-leavers and young mothers.",
    lat: -1.2236,
    lng: 36.8919,
  },
  {
    slug: "embakasi",
    name: "Embakasi",
    subCounty: "Embakasi South",
    description:
      "A major residential and industrial area east of the CBD, where many young women work in informal trade and manufacturing around the Outer Ring corridor.",
    lat: -1.3167,
    lng: 36.8833,
  },
  {
    slug: "mathare",
    name: "Mathare",
    subCounty: "Mathare",
    description:
      "One of Nairobi's largest informal settlements, where access to sexual and reproductive health information and psychosocial support remains limited for adolescent girls.",
    lat: -1.2606,
    lng: 36.8711,
  },
  {
    slug: "kariobangi",
    name: "Kariobangi",
    subCounty: "Embakasi North",
    description:
      "A mixed estate and informal settlement area neighbouring Dandora, with active women's groups and a strong culture of table banking.",
    lat: -1.2586,
    lng: 36.8956,
  },
  {
    slug: "kibera",
    name: "Kibera",
    subCounty: "Kibra",
    description:
      "Africa's largest urban informal settlement, where young women lead many of the community's own responses to health, education and economic challenges.",
    lat: -1.3133,
    lng: 36.7894,
  },
  {
    slug: "mukuru",
    name: "Mukuru kwa Njenga",
    subCounty: "Starehe",
    description:
      "Part of the Mukuru informal settlement belt along the Nairobi--Mombasa road corridor, with an active process of resident-led planning and upgrading.",
    lat: -1.3078,
    lng: 36.8569,
  },
  {
    slug: "korogocho",
    name: "Korogocho",
    subCounty: "Ruaraka",
    description:
      "A high-density settlement next to the Dandora dumpsite, where community organisations play a central role in girls' safety and education.",
    lat: -1.2419,
    lng: 36.8925,
  },
  {
    slug: "umoja",
    name: "Umoja",
    subCounty: "Embakasi West",
    description:
      "A bustling middle-density estate whose name means unity, with numerous self-help groups and a strong base of young women entrepreneurs.",
    lat: -1.2833,
    lng: 36.9,
  },
];

export function getCommunity(slug: string): CommunityWard | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}
