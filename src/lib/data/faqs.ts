export interface Faq {
  question: string;
  answer: string;
}

/**
 * Organisation FAQs - existing published content (FAQ.tsx), lightly tightened.
 * Rendered fully server-side on /faqs (R3: content must be in initial HTML),
 * with FAQPage JSON-LD emitted only on /faqs where all Q&As are visible.
 */
export const FAQS: Faq[] = [
  {
    question: "What is the age range for BINTI Rising programs?",
    answer:
      "Our programs are specifically designed for young women aged 15-25. We believe in meeting young women where they are during this critical phase of their lives and providing holistic empowerment that addresses their unique challenges.",
  },
  {
    question: "How much do the programs cost?",
    answer:
      "All BINTI Rising programs are completely free for participating young women. We are committed to removing financial barriers to empowerment. Our community partners and donors make this possible.",
  },
  {
    question: "Where are your programs located?",
    answer:
      "We currently operate in 10+ communities across Nairobi, Kenya, including Kayole, Dandora, Mathare, Kasarani, Embakasi, Kariobangi, Kibera, Mukuru kwa Njenga, Korogocho, Umoja and Mawanga. Our programs are community-based and locally adapted to meet the specific needs of young women in each area.",
  },
  {
    question: "What does SRHR stand for?",
    answer:
      "SRHR stands for Sexual and Reproductive Health and Rights. Our SRHR program pillar provides comprehensive education on reproductive health, consent, healthy relationships, and access to health services.",
  },
  {
    question: "Can I volunteer with BINTI Rising?",
    answer:
      "Yes! We welcome volunteers who are passionate about empowering young women. Visit our volunteer page to learn about opportunities and apply online, or contact us at info@bintirising.org.",
  },
  {
    question: "How do you measure the impact of your programs?",
    answer:
      "We track 6 key performance indicators including SRHR knowledge, health service utilisation, mental wellbeing, savings habits, leadership skills, and GBV awareness. Regular monitoring and evaluation ensure our programs are evidence-based and effective. Published figures are programme targets; verified baseline and endline results are released on our impact page as M&E cycles complete.",
  },
  {
    question: "What are your program pillars?",
    answer:
      "BINTI Rising has four main program pillars: SRHR (Sexual and Reproductive Health and Rights), Mental Health & Wellbeing, Financial Freedom & Literacy, and Women Empowerment & Leadership. Each pillar addresses interconnected challenges young women face, and together they add up to 26 structured sessions over six months.",
  },
  {
    question: "How can organizations partner with BINTI Rising?",
    answer:
      "We welcome partnerships with NGOs, corporate organizations, and social enterprises. Partners can support through funding, in-kind donations, expertise sharing, or collaborative program delivery. Contact our partnership team at info@bintirising.org or through the partner page.",
  },
  {
    question: "How can I donate to BINTI Rising?",
    answer:
      "You can donate by contacting us at info@bintirising.org - we will share our verified M-Pesa Paybill or bank details and issue a receipt. We removed self-service payment details from this site until our official Paybill and account numbers are confirmed, so that every shilling reaches BINTI Rising safely.",
  },
  {
    question: "Is my donation eligible for a tax receipt in Kenya?",
    answer:
      "BINTI Rising Initiative is a registered community-based organisation in Kenya. Contact info@bintirising.org with your donation details and we will advise on available documentation for your records.",
  },
];

/** The 4-question teaser shown on the homepage (server-rendered, visible in DOM). */
export const HOME_FAQ_TEASER: Faq[] = FAQS.slice(0, 4);
