export interface Story {
  slug: string;
  /** Display attribution - anonymised (R1: consent not yet on file). */
  attribution: string;
  ageBand: string;
  ward: string;
  pillar: string;
  pillarSlug: string;
  quote: string;
  /** How the story is presented - always visible on the story page. */
  anonymisationNote: string;
}

/**
 * Participant stories inherited from the existing homepage (Stories.tsx).
 *
 * R1/2.5 COMPLIANCE: the original section displayed full names ("Amina
 * Wanjiku", etc.) with no consent trail. Until signed consent is recorded
 * (ConsentRecord), stories are published ANONYMISED: names withheld,
 * attribution by age band + ward only, with a visible anonymisation notice
 * and a takedown contact. Do NOT re-add names or photos.
 */
export const STORIES: Story[] = [
  {
    slug: "learning-my-reproductive-health-rights-kayole",
    attribution: "A young woman from Kayole",
    ageBand: "18-21",
    ward: "Kayole",
    pillar: "SRHR",
    pillarSlug: "srhr",
    quote:
      "Before joining BINTI Rising, I had no idea about my reproductive health rights. The SRHR sessions gave me knowledge and confidence I never had. Now I help other young women in Kayole understand their bodies and make informed choices about their health.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
  {
    slug: "starting-a-business-from-savings-kibera",
    attribution: "A young woman from Kibera",
    ageBand: "22-25",
    ward: "Kibera",
    pillar: "Financial Freedom",
    pillarSlug: "financial-freedom",
    quote:
      "The financial literacy program changed my life completely. I learned how to budget, save, and even started a small business selling handmade jewelry. For the first time, I feel economically independent and hopeful about my future.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
  {
    slug: "finding-safe-space-to-talk-dagoretti",
    attribution: "A young woman from Dagoretti",
    ageBand: "18-21",
    ward: "Dagoretti",
    pillar: "Mental Health",
    pillarSlug: "mental-health",
    quote:
      "Mental health was never something we talked about in my community. BINTI Rising created a safe space for us to share our struggles. I learned coping strategies that help me every day. I am stronger and more resilient now.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
  {
    slug: "discovering-my-voice-mathare",
    attribution: "A young woman from Mathare",
    ageBand: "15-17",
    ward: "Mathare",
    pillar: "Leadership",
    pillarSlug: "leadership",
    quote:
      "The Women Empowerment program taught me that my voice matters. I now speak up at community meetings and advocate for girls' education. I never saw myself as a leader, but BINTI Rising helped me discover my potential.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
  {
    slug: "becoming-a-peer-mentor-embakasi",
    attribution: "A young woman from Embakasi",
    ageBand: "22-25",
    ward: "Embakasi",
    pillar: "Leadership",
    pillarSlug: "leadership",
    quote:
      "After completing all four program pillars, I became a peer mentor. I now help new participants navigate the program and share my own journey. Watching other young women transform is the most rewarding experience of my life.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
  {
    slug: "kesh-500-and-a-grocery-kiosk-rongai",
    attribution: "A young woman from Rongai",
    ageBand: "18-21",
    ward: "Rongai",
    pillar: "Financial Freedom",
    pillarSlug: "financial-freedom",
    quote:
      "I used to think starting a business was only for people with capital. Through BINTI's entrepreneurship sessions, I learned that with KES 500 and determination, I could start something meaningful. Today I run a small grocery kiosk.",
    anonymisationNote:
      "Anonymised participant account. Names and identifying details are withheld to protect privacy. If this is your story and you would like it amended or removed, contact info@bintirising.org.",
  },
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
