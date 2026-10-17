import type { ProgramPillar } from "./organization";

/**
 * The four program pillars. Session curricula and descriptions are the
 * organisation's existing published content (Programs.tsx) - verified source.
 * Outcome figures are programme TARGETS (from the M&E framework), not claimed
 * results; verified baselines/endlines are PENDING_HUMAN_INPUT.
 */
export const PROGRAMS: ProgramPillar[] = [
  {
    slug: "srhr",
    name: "Sexual & Reproductive Health Rights",
    shortName: "SRHR",
    serviceType: "SRHR education for young women",
    seoTitle: "SRHR Program in Nairobi for Young Women",
    summary:
      "Comprehensive education on sexual and reproductive health, body autonomy, consent, family planning, and access to health services. Empowering young women with knowledge to make informed decisions about their bodies and health.",
    sessions: [
      { title: "Understanding Your Body", desc: "Anatomy, puberty changes, menstrual health, and hygiene management for young women." },
      { title: "Consent & Boundaries", desc: "Understanding personal boundaries, recognizing consent, and saying no with confidence." },
      { title: "Family Planning Methods", desc: "Overview of modern contraceptive methods, effectiveness, and accessing reproductive health services." },
      { title: "STIs & HIV Prevention", desc: "Comprehensive education on sexually transmitted infections, prevention strategies, and testing." },
      { title: "Pregnancy & Maternal Health", desc: "Antenatal care, nutrition during pregnancy, and safe delivery practices in Nairobi." },
      { title: "Gender-Based Violence Awareness", desc: "Recognizing GBV, understanding legal protections, and knowing where to get help." },
      { title: "Body Image & Self-Esteem", desc: "Building positive body image, resisting harmful beauty standards, and self-acceptance." },
      { title: "Accessing Health Services", desc: "Navigating Nairobi's health facilities, understanding patient rights, and health insurance options." },
    ],
    outcomes: [
      "Programme target: increase SRHR knowledge from a 40% baseline to 80%",
      "Programme target: improved utilisation of reproductive health services",
      "Programme target: enhanced ability to recognise and report GBV",
      "Programme target: better menstrual health management practices",
      "Programme target: increased confidence in accessing health facilities",
    ],
    sdgs: [3, 4, 5],
  },
  {
    slug: "mental-health",
    name: "Mental Health & Wellbeing",
    shortName: "Mental Health",
    serviceType: "Adolescent mental health support",
    seoTitle: "Mental Health Support Program in Nairobi",
    summary:
      "Building mental resilience through stress management, emotional regulation, self-care practices, and creating safe spaces for young women to discuss their mental health challenges without stigma.",
    sessions: [
      { title: "Understanding Mental Health", desc: "What mental health means, common conditions, and breaking stigma in our communities." },
      { title: "Stress Management", desc: "Identifying stress triggers, practical coping techniques, and relaxation exercises." },
      { title: "Emotional Regulation", desc: "Recognizing emotions, healthy expression techniques, and building emotional intelligence." },
      { title: "Self-Care Practices", desc: "Creating daily self-care routines, mindfulness, and prioritizing mental wellbeing." },
      { title: "Building Support Systems", desc: "Identifying trusted people, building healthy relationships, and knowing when to seek professional help." },
      { title: "Resilience & Goal Setting", desc: "Bouncing back from adversity, personal visioning, and setting achievable life goals." },
    ],
    outcomes: [
      "Programme target: improved mental wellbeing scores from a 30% baseline to 70%",
      "Programme target: reduced stigma around mental health discussions",
      "Programme target: established personal self-care routines",
      "Programme target: stronger peer support networks",
      "Programme target: increased willingness to seek professional help",
    ],
    sdgs: [3, 5],
  },
  {
    slug: "financial-freedom",
    name: "Financial Freedom & Literacy",
    shortName: "Financial Freedom",
    serviceType: "Financial literacy training for young women",
    seoTitle: "Financial Literacy Program in Nairobi",
    summary:
      "Equipping young women with practical financial skills including budgeting, saving, entrepreneurship, and income generation. Building pathways to economic independence and breaking cycles of poverty.",
    sessions: [
      { title: "Financial Literacy Basics", desc: "Understanding money, income vs. expenses, and why financial knowledge matters for women." },
      { title: "Budgeting & Money Management", desc: "Creating personal budgets, tracking spending, and making smart financial decisions." },
      { title: "Saving Strategies", desc: "Different saving methods, joining chamas (savings groups), building an emergency fund." },
      { title: "Entrepreneurship Basics", desc: "Identifying business opportunities in Nairobi, writing a simple business plan, and starting small." },
      { title: "Understanding Credit & Loans", desc: "How loans work, responsible borrowing, avoiding debt traps, and building credit history." },
      { title: "Income Generation & Networking", desc: "Multiple income streams, leveraging networks in Nairobi, and digital financial tools like M-Pesa." },
    ],
    outcomes: [
      "Programme target: regular saving habits rising from a 20% baseline to 65%",
      "Programme target: participants start income-generating activities",
      "Programme target: improved financial decision-making skills",
      "Programme target: formation of peer savings groups (chamas)",
      "Programme target: greater economic independence and confidence",
    ],
    sdgs: [5, 8],
  },
  {
    slug: "leadership",
    name: "Women Empowerment & Leadership",
    shortName: "Leadership",
    serviceType: "Leadership and empowerment training",
    seoTitle: "Women's Leadership Program in Nairobi",
    summary:
      "Developing leadership skills, self-advocacy, community engagement, and confidence building. Preparing young women to take on leadership roles in their communities and beyond.",
    sessions: [
      { title: "Self-Advocacy & Communication", desc: "Speaking up confidently, assertive communication, and expressing needs effectively." },
      { title: "Women's Rights & Legal Framework", desc: "Understanding constitutional rights, gender equality laws, and legal protections for women in Kenya." },
      { title: "Leadership Skills Development", desc: "Different leadership styles, team building, decision-making, and conflict resolution." },
      { title: "Community Engagement & Civic Participation", desc: "Getting involved in community development, understanding local governance, and civic duties." },
      { title: "Gender Norms & Equality", desc: "Challenging harmful stereotypes, promoting gender equality, and creating inclusive spaces." },
      { title: "Mentorship & Paying It Forward", desc: "Becoming a mentor, sharing knowledge, and creating lasting impact in Nairobi communities." },
    ],
    outcomes: [
      "Programme target: leadership competency scores rising from a 25% baseline to 70%",
      "Programme target: increased participation in community decision-making",
      "Programme target: stronger self-advocacy and communication skills",
      "Programme target: formation of peer mentorship networks",
      "Programme target: greater awareness of women's legal rights",
    ],
    sdgs: [5, 10, 16],
  },
];

export function getProgram(slug: string): ProgramPillar | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
