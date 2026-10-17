/**
 * Editorial content for /learn - answer-engine optimised explainers.
 *
 * R1 COMPLIANCE: every factual claim below is general public knowledge drawn
 * from named primary sources (Constitution of Kenya 2010, Kenya Law, WHO,
 * UNFPA, KNBS/KDHS 2022, Kenya MOH) which are linked at the end of each
 * article. No invented statistics, no invented quotes, no org-specific
 * claims beyond the organisation's own published program descriptions.
 *
 * Author is the organisation (editorial team) - a named Person author is
 * added only after human confirmation of staff identities.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "term"; term: string; definition: string }
  | { type: "sources"; items: { label: string; url: string }[] };

export interface LearnArticle {
  slug: string;
  title: string;
  /** 40-60 word direct answer to the target query (featured-snippet bait). */
  directAnswer: string;
  metaDescription: string;
  cluster: "srhr" | "mental-health" | "financial-freedom" | "leadership";
  /** Related program pillar slug (hub-and-spoke linking). */
  programSlug: string;
  /** Sibling article slugs for cross-linking. */
  siblings: string[];
  keywords: string[];
  blocks: Block[];
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "srhr-rights-in-kenya-for-young-women",
    title: "What Are Your SRHR Rights in Kenya? A Plain-Language Guide",
    directAnswer:
      "In Kenya, every person has the constitutional right to the highest attainable standard of health, which includes reproductive health care (Article 43 of the Constitution). As a young woman this means you may access sexual and reproductive health information and services, and you cannot be denied care simply because of your age, marital status or sex.",
    metaDescription:
      "Kenya's Constitution guarantees reproductive health care. Learn what SRHR rights mean for young women: consent, services, confidentiality and where to get help.",
    cluster: "srhr",
    programSlug: "srhr",
    siblings: ["what-does-consent-actually-mean", "how-to-recognise-gender-based-violence"],
    keywords: ["srhr rights kenya", "reproductive health rights young women kenya", "constitutional right health kenya"],
    blocks: [
      {
        type: "p",
        text: "SRHR stands for **Sexual and Reproductive Health and Rights**. It is the umbrella term for the information, services and legal protections that let you make informed decisions about your own body, relationships and health. In BINTI Rising's SRHR pillar, we teach these topics across eight structured sessions, in a safe and judgment-free space, because in many Kenyan communities these conversations simply do not happen at home or in school.",
      },
      { type: "h2", text: "Which laws protect your reproductive health in Kenya?" },
      {
        type: "p",
        text: "The starting point is the **Constitution of Kenya, 2010**. Article 43(1)(a) guarantees every person the right to the highest attainable standard of health, and it explicitly includes **reproductive health care**. Article 27 guarantees equality and freedom from discrimination, including on grounds of sex and marital status, which means a health facility cannot turn you away for being a young, unmarried woman.",
      },
      {
        type: "p",
        text: "Article 26(4) of the Constitution restricts abortion, stating that it is not permitted unless, in the opinion of a trained health professional, there is a need for emergency treatment or the life or health of the mother is in danger, or if permitted by other written law. This is a legal nuance worth understanding: emergency care for pregnancy complications is constitutional, and a trained health professional is the person who assesses that need.",
      },
      { type: "h2", text: "What services can a young woman legally access?" },
      {
        type: "ul",
        items: [
          "**Family planning counselling and commodities** - publicly funded facilities provide counselling and a range of modern contraceptive methods; a provider should explain options, effectiveness and side effects.",
          "**HIV and STI testing and treatment** - voluntary counselling and testing (VCT) services are available across Nairobi county facilities, and treatment is provided in the public health system.",
          "**Antenatal and maternity care** - Kenya's public health system provides free maternity services in public facilities.",
          "**Gender-based violence support** - including post-rape care, which is most effective when sought within 72 hours.",
          "**Menstrual health support** - Kenya's Menstrual Health Management Policy (2019-2030) commits the government to menstrual health as a hygiene and dignity issue.",
        ],
      },
      { type: "h2", text: "How young is too young to ask questions at a clinic?" },
      {
        type: "p",
        text: "There is no minimum age for asking questions. Health workers are trained to provide **age-appropriate counselling**, and adolescents are recognised in Kenya's health policies as a priority group. If one facility treats you disrespectfully, you may seek care elsewhere and, where appropriate, report the conduct. Knowing your rights is the first step to using them.",
      },
      { type: "term", term: "Contraception", definition: "Methods used to prevent pregnancy. Options differ in effectiveness, duration, side effects and suitability; a qualified health provider can help you choose what fits your body and life." },
      { type: "term", term: "Post-rape care (PRC)", definition: "Emergency clinical care after sexual assault, ideally within 72 hours: emergency contraception, HIV post-exposure prophylaxis, antibiotic treatment and psychosocial support, plus documentation you may need later." },
      { type: "h2", text: "What does this look like in real life?" },
      {
        type: "table",
        head: ["Situation", "What your rights mean in practice"],
        rows: [
          ["You want contraception but fear judgement", "You may ask for confidential counselling in a public facility; bring a friend or visit a youth-friendly centre."],
          ["You are pressured into sex", "Consent must be free and voluntary (see our Consent 101 guide). The age of consent in Kenya is 18 (Sexual Offences Act, 2006)."],
          ["You experience violence", "Call 1195 (national GBV toll-free), seek medical care within 72 hours, and preserve evidence where possible."],
          ["You miss your period and are scared", "Visit a facility for a pregnancy test and counselling; emergency complications must be treated under Article 26(4)."],
        ],
      },
      { type: "h2", text: "How BINTI Rising teaches SRHR in Nairobi" },
      {
        type: "p",
        text: "Our [SRHR program](/programs/srhr) runs eight sessions covering understanding your body, consent and boundaries, family planning, STIs and HIV prevention, pregnancy and maternal health, GBV awareness, body image, and navigating health services. Sessions are facilitated in community spaces across Nairobi wards including Kayole, Dandora and Mathare, in English and Swahili, and are always free for participants aged 15-25.",
      },
      { type: "h2", text: "Where to get help now" },
      {
        type: "ul",
        items: [
          "**1195** - national toll-free GBV helpline.",
          "**116** - Childline Kenya, free from any phone.",
          "**1199** - Kenya Red Cross toll-free line.",
          "Your nearest **public health facility** - ask at reception for youth-friendly services.",
        ],
      },
      {
        type: "sources",
        items: [
          { label: "The Constitution of Kenya, 2010 (Articles 26, 27, 43)", url: "http://kenyalaw.org/kl/index.php?id=398" },
          { label: "WHO - Sexual and Reproductive Health and Rights", url: "https://www.who.int/health-topics/sexual-and-reproductive-health-and-rights" },
          { label: "UNFPA Kenya", url: "https://kenya.unfpa.org/en" },
          { label: "Kenya National Bureau of Statistics - Kenya Demographic and Health Survey 2022", url: "https://www.knbs.or.ke/" },
          { label: "Ministry of Health, Kenya", url: "https://www.health.go.ke/" },
        ],
      },
    ],
  },
  {
    slug: "what-does-consent-actually-mean",
    title: "What Does Consent Actually Mean? Consent 101 for Young Women",
    directAnswer:
      "Consent is a free, voluntary and informed agreement to a specific activity, given by a person with capacity, and it can be withdrawn at any time. In Kenya the age of consent is 18 under the Sexual Offences Act, 2006. Silence, fear, intoxication or a past relationship never equal consent.",
    metaDescription:
      "Consent must be free, voluntary, informed and reversible. Learn the FRIES test, what Kenyan law says, and how to set and respect boundaries.",
    cluster: "srhr",
    programSlug: "srhr",
    siblings: ["srhr-rights-in-kenya-for-young-women", "how-to-recognise-gender-based-violence"],
    keywords: ["what is consent", "age of consent kenya", "consent education young women"],
    blocks: [
      {
        type: "p",
        text: "**Consent** is an agreement that is given freely, voluntarily and with full information. It is specific to each activity, and it can be withdrawn at any moment. In BINTI Rising's SRHR sessions we spend an entire lesson on consent and boundaries because so much harm, from unwanted touching to assault, traces back to people never having been taught what real agreement looks like.",
      },
      { type: "h2", text: "What is the FRIES way to remember consent?" },
      {
        type: "ul",
        items: [
          "**Freely given** - no pressure, manipulation, threats or abuse of authority. A yes under fear is not consent.",
          "**Reversible** - anyone can change their mind at any point, even mid-activity, and the other person must stop.",
          "**Informed** - the person knows what they are agreeing to. Deception invalidates agreement.",
          "**Enthusiastic** - a hesitant, silent or frozen response is not a yes. Look for a clear, willing yes.",
          "**Specific** - saying yes to one thing (for example, holding hands) is not saying yes to everything.",
        ],
      },
      { type: "h2", text: "What does Kenyan law say about consent?" },
      {
        type: "p",
        text: "Under the **Sexual Offences Act, 2006**, the age of consent in Kenya is **18 years**. Sexual activity with a person below 18 is a criminal offence, regardless of what the younger person says. For adults, an act is unlawful when there is no consent, and the law recognises that consent obtained by force, threats, deception or while a person is asleep, unconscious or incapacitated is not valid consent.",
      },
      {
        type: "p",
        text: "The Constitution (Article 45) also protects the family and recognises that marriage requires the free consent of both parties - so a forced marriage is not a lawful marriage. The Prohibition of Female Genital Mutilation Act (2011) and the Children Act (2022) add further protections for girls.",
      },
      { type: "term", term: "Coercion", definition: "Pressure that removes a person's free choice - threats, intimidation, blackmail, persistent wearing-down or abuse of power. Agreement produced by coercion is not consent." },
      { type: "h2", text: "How do you set a boundary - and respect one?" },
      {
        type: "ol",
        items: [
          "Name the boundary plainly: 'I am not comfortable with that.' You do not owe anyone a detailed explanation.",
          "Watch the response, not the words: a person who respects you adjusts their behaviour immediately.",
          "Remember withdrawal counts: 'stop' after a yes is final.",
          "Practise saying no in low-stakes situations - it gets easier.",
          "If someone cannot respect a boundary, distance yourself and tell someone you trust.",
        ],
      },
      {
        type: "callout",
        title: "If consent was violated, it is not your fault",
        text: "Survivors are never to blame. Seek medical care within 72 hours (post-rape care is free in public facilities), call 1195, and tell a trusted adult. See our guide on recognising gender-based violence for the exact steps.",
      },
      { type: "h2", text: "Keep learning" },
      {
        type: "p",
        text: "Consent is lesson two of our [SRHR program](/programs/srhr). Read [your SRHR rights in Kenya](/learn/srhr-rights-in-kenya-for-young-women) and [how to recognise gender-based violence](/learn/how-to-recognise-gender-based-violence) next.",
      },
      {
        type: "sources",
        items: [
          { label: "The Sexual Offences Act, 2006 (Kenya Law)", url: "http://kenyalaw.org/kl/landing_page/kenyalaw/org/index.php?id=981" },
          { label: "The Constitution of Kenya, 2010", url: "http://kenyalaw.org/kl/index.php?id=398" },
          { label: "WHO - Violence against women", url: "https://www.who.int/news-room/fact-sheets/detail/violence-against-women" },
        ],
      },
    ],
  },
  {
    slug: "how-to-recognise-gender-based-violence",
    title: "How Do You Recognise Gender-Based Violence and Get Help?",
    directAnswer:
      "Gender-based violence is any harm directed at a person because of their sex or gender - physical, sexual, emotional, economic or psychological. Warning signs include control of money, movement or phones, threats, humiliation and forced sex. In Kenya you can call the free 1195 GBV line, seek medical care within 72 hours after assault, and obtain protection orders under the 2015 domestic violence law.",
    metaDescription:
      "Recognise the types and warning signs of gender-based violence, what Kenyan law provides, and exactly where to get help: 1195, medical care and protection orders.",
    cluster: "srhr",
    programSlug: "srhr",
    siblings: ["what-does-consent-actually-mean", "mental-health-support-for-young-women-in-nairobi"],
    keywords: ["gbv helpline kenya", "gender based violence help nairobi", "protection order kenya"],
    blocks: [
      {
        type: "p",
        text: "**Gender-based violence (GBV)** is any act that causes physical, sexual, emotional, economic or psychological harm to a person because of their gender. It happens in homes, relationships, schools, workplaces and online. In our [SRHR program](/programs/srhr), GBV awareness is a dedicated session because recognising abuse early - in your own relationship or a friend's - can change, and sometimes save, a life.",
      },
      { type: "h2", text: "What are the main types of GBV?" },
      {
        type: "table",
        head: ["Type", "What it can look like"],
        rows: [
          ["Physical", "Hitting, slapping, choking, throwing objects, blocking you from leaving a room."],
          ["Sexual", "Rape and attempted rape, forced sexual acts, sexual harassment, sharing intimate images without consent."],
          ["Emotional / psychological", "Constant insults, threats to harm you or your family, isolation from friends and family, stalking."],
          ["Economic", "Taking your earnings, refusing to let you work or study, destroying your tools or stock, denying you basic needs."],
          ["Harmful practices", "Forced or early marriage, female genital mutilation - both prohibited under Kenyan law."],
        ],
      },
      { type: "h2", text: "Which warning signs should you never ignore?" },
      {
        type: "ul",
        items: [
          "A partner who checks your phone, demands your passwords, or controls who you see.",
          "Someone who takes your money or sabotages your job or business.",
          "Threats - against you, your children, or themselves - used to control you.",
          "Blaming you for their anger ('you made me do it').",
          "Intensity that swings from extreme jealousy to apologies and gifts - a common cycle.",
          "Fear of a specific person is itself the loudest warning sign.",
        ],
      },
      { type: "h2", text: "What does Kenyan law provide?" },
      {
        type: "p",
        text: "The **Protection Against Domestic Violence Act (2015)** allows a survivor to apply for a **protection order** from the courts, which can restrain an abuser from contact, entering the home, or coming to your workplace. The Sexual Offences Act (2006) criminalises sexual violence. The Prohibition of FGM Act (2011) and the Children Act (2022) protect girls specifically. None of these processes require you to be wealthy: court users' support sections and children's offices in Nairobi counties can guide you, and organisations like ours can help you find the right door.",
      },
      { type: "h2", text: "What should you do in the first 72 hours after an assault?" },
      {
        type: "ol",
        items: [
          "Get to safety - anywhere you are not alone with the person who hurt you.",
          "Call **1195** (GBV toll-free) or **1199** (Kenya Red Cross), or tell one trusted person.",
          "Go to a hospital for **post-rape care** - ideally within 72 hours: emergency medication to prevent HIV and pregnancy, treatment for injuries, and documentation.",
          "Do not wash or change clothes before examination if you can avoid it; preserve messages or threats as evidence.",
          "Ask about counselling - psychological support is part of proper care, not a luxury.",
        ],
      },
      {
        type: "callout",
        title: "Supporting a friend who discloses abuse",
        text: "Believe her. Do not demand details or promise to confront the abuser yourself. Help her call 1195, offer to accompany her to a facility, and keep her confidence. Pressure to 'report now or leave him' can push survivors back into silence - safety planning is a process.",
      },
      { type: "h2", text: "How BINTI Rising addresses GBV in Nairobi" },
      {
        type: "p",
        text: "GBV awareness runs through our SRHR and leadership pillars: recognising abuse, knowing legal protections, and where to get help. Sessions run in community groups across Nairobi wards. If you need someone to walk with you to a facility, write to info@bintirising.org - we will do what we can, as quickly as we can.",
      },
      {
        type: "sources",
        items: [
          { label: "Protection Against Domestic Violence Act, 2015 (Kenya Law)", url: "http://kenyalaw.org/kl/landing_page/kenyalaw/org/index.php?id=0" },
          { label: "WHO - Violence against women fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/violence-against-women" },
          { label: "UNFPA Kenya - Gender-based violence", url: "https://kenya.unfpa.org/en" },
        ],
      },
    ],
  },
  {
    slug: "mental-health-support-for-young-women-in-nairobi",
    title: "Where Can a Young Woman in Nairobi Start With Mental Health?",
    directAnswer:
      "Start with three steps: name what you are feeling to one trusted person, use a daily coping practice (sleep, movement, grounding, journaling), and reach a professional if symptoms last more than two weeks or affect school, work or safety. Free or low-cost entry points in Nairobi include public health facilities, Kenya Red Cross (1199) and Befrienders Kenya.",
    metaDescription:
      "A practical starting point for mental health support in Nairobi: free entry points, coping skills you can use today, and when to seek professional help.",
    cluster: "mental-health",
    programSlug: "mental-health",
    siblings: ["how-to-recognise-gender-based-violence", "menstrual-health-myths-and-facts"],
    keywords: ["mental health support nairobi", "free counselling nairobi young women", "mental health kenya youth"],
    blocks: [
      {
        type: "p",
        text: "**Mental health** is your ability to think, feel and cope well enough to live, study, work and relate to others. It is health, not weakness - and in Kenya it is finally being treated that way: the Mental Health (Amendment) Act, 2022 modernised our mental health law, and a national taskforce in 2020 recommended treating mental health as a critical development issue. In Nairobi's communities, though, stigma still keeps many young women silent. Our [mental health program](/programs/mental-health) was built to break exactly that silence.",
      },
      { type: "h2", text: "What is the difference between stress, low mood and something more serious?" },
      {
        type: "table",
        head: ["Experience", "Typical signs", "What usually helps"],
        rows: [
          ["Stress", "Tension, racing thoughts, trouble sleeping before an event (exams, rent, conflict)", "Problem-solving, exercise, breathing exercises, reducing the load where possible"],
          ["Low mood", "Sadness or flatness for days that improves with support, rest or good news", "Connection, routine, movement, talking to someone you trust"],
          ["Depression / anxiety disorder", "Two weeks or more of persistent low mood, loss of interest, panic, sleep and appetite changes, hopelessness, thoughts of self-harm", "Professional care - a clinical assessment at a health facility; these are treatable conditions"],
        ],
      },
      { type: "term", term: "Grounding (5-4-3-2-1)", definition: "A quick anxiety technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell and 1 you taste. It pulls your attention out of panic and into the present." },
      { type: "h2", text: "Where in Nairobi can you get help for free or cheap?" },
      {
        type: "ul",
        items: [
          "**Public health facilities** - level 2 and 3 facilities can assess and refer; Kenyatta National Hospital runs psychiatric services for complex cases.",
          "**Kenya Red Cross - 1199** - toll-free psychosocial support, any day.",
          "**Befrienders Kenya** - a listening service for people in emotional distress (confirm current hours on their site).",
          "**School and college counsellors** - if you are a student, ask; most institutions have one.",
          "**BINTI Rising wellbeing sessions** - peer support groups in community spaces across Nairobi; free for young women 15-25.",
        ],
      },
      { type: "h2", text: "What can you do today, by yourself?" },
      {
        type: "ol",
        items: [
          "Tell one trusted person the truth about how you are doing. Secrecy is heavy.",
          "Protect sleep: a consistent bedtime is the cheapest mental health intervention there is.",
          "Move your body 20-30 minutes - a walk counts.",
          "Try the 5-4-3-2-1 grounding when anxiety spikes.",
          "Write down tomorrow's three most important tasks; overwhelm shrinks when it is on paper.",
          "Limit late-night doom-scrolling; comparison and bad news at midnight are a bad combination.",
        ],
      },
      {
        type: "callout",
        title: "If you are thinking of harming yourself",
        text: "Tell someone now: call Kenya Red Cross on 1199 (toll-free) or go to the nearest hospital emergency department. You deserve help, and help works. If someone else is in danger, stay with them and call for help - do not leave them alone.",
      },
      { type: "h2", text: "What happens in a BINTI Rising wellbeing session?" },
      {
        type: "p",
        text: "Six sessions: understanding mental health and breaking stigma, stress management, emotional regulation, self-care, building support systems, and resilience and goal setting. Facilitators are trained in psychological first aid, groups are confidential, and no one is forced to share. Read how sessions run on the [mental health program page](/programs/mental-health), or start with our guides to [recognising gender-based violence](/learn/how-to-recognise-gender-based-violence) and [menstrual health myths](/learn/menstrual-health-myths-and-facts).",
      },
      {
        type: "sources",
        items: [
          { label: "WHO - Mental health strengthening our response", url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" },
          { label: "WHO - Adolescent mental health", url: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health" },
          { label: "Ministry of Health, Kenya - mental health", url: "https://www.health.go.ke/" },
        ],
      },
    ],
  },
  {
    slug: "budget-and-save-on-irregular-income-kenya",
    title: "How Do You Budget and Save on an Irregular Income in Kenya?",
    directAnswer:
      "With irregular income, budget by percentages instead of amounts: every shilling that arrives is split - for example 50% needs, 30% goals, 20% savings - the day it lands. Keep a buffer account equal to one lean month, automate transfers on payday (even M-Pesa-to-M-Pesa), and keep savings in a separate account or chama so it is harder to spend.",
    metaDescription:
      "A practical budgeting method for hustles, casual jobs and small business income in Kenya: percentage budgeting, buffer months, chamas and M-Pesa saving habits.",
    cluster: "financial-freedom",
    programSlug: "financial-freedom",
    siblings: ["menstrual-health-myths-and-facts", "mental-health-support-for-young-women-in-nairobi"],
    keywords: ["budgeting irregular income kenya", "how to save money kenya", "financial literacy young women nairobi"],
    blocks: [
      {
        type: "p",
        text: "Most financial advice assumes a salary that lands on the 28th like a bus on a timetable. In Nairobi's informal economy - hustles, casual jobs, boda, mitumba, Salon, produce selling - income arrives in lumps, sometimes good, sometimes nothing. Our [financial freedom program](/programs/financial-freedom) teaches a system built for exactly that reality.",
      },
      { type: "h2", text: "What is percentage budgeting?" },
      {
        type: "p",
        text: "Instead of budgeting amounts, you budget **shares of whatever comes in**. The classic 50/30/20 rule adapts like this for irregular income:",
      },
      {
        type: "ul",
        items: [
          "**50% to needs** - rent, food, transport, airtime, stock for your hustle.",
          "**30% to goals** - school fees balance, business growth, a course, tools.",
          "**20% to savings** - moved out of reach the same day the money arrives.",
        ],
      },
      {
        type: "p",
        text: "On a KES 3,000 week that is KES 1,500 needs, KES 900 goals, KES 600 savings. On a zero week, the rule pauses - but you do not raid the savings share, because that share is what keeps a zero week from becoming a crisis week.",
      },
      { type: "h2", text: "Why does a 'buffer month' change everything?" },
      {
        type: "p",
        text: "Your first savings target is not an investment - it is **one lean month of needs** kept in a separate account or lock savings. A buffer turns an emergency (sickness, slow sales, a family obligation) from a debt event into an inconvenience. Digital lenders charge painful rates and list defaulters with credit reference bureaus, which can block future borrowing and even some job processes; a buffer keeps you out of that trap.",
      },
      { type: "term", term: "Chama", definition: "A rotating savings group where members contribute a fixed amount on schedule and each member takes the pot in turn. Chamas enforce discipline that solo saving often lacks - many Kenyan businesses were built on them." },
      { type: "term", term: "Table banking", definition: "A group system where members save and borrow from the common pool at the meeting itself, usually at better terms than informal lenders, with the group providing accountability." },
      { type: "h2", text: "How do you actually make it stick?" },
      {
        type: "ol",
        items: [
          "Separate accounts: one for daily flows, one savings account you do not carry a card for.",
          "Move savings the day money arrives, not 'at the end of the month' - leftovers never exist.",
          "Join or form a chama of 5-10 disciplined members; group accountability is powerful.",
          "Track every shilling for one month - the M-Pesa statement alone will shock you.",
          "Price your hustle properly: many small businesses fail because the owner never pays themselves a wage.",
          "Borrow only for things that earn (stock, tools, training), not for lifestyle.",
        ],
      },
      {
        type: "table",
        head: ["Tool", "Good for", "Watch out for"],
        rows: [
          ["M-Pesa lock savings / bank fixed accounts", "Money you must not touch", "Withdrawal notice periods - read them first"],
          ["Chama / table banking", "Discipline and lump sums", "Choose members carefully; write rules down"],
          ["Mobile loans", "True emergencies only", "High effective cost; CRB listing on default"],
          ["SACCOs", "Regular savers with consistent income", "Requires steady contributions"],
        ],
      },
      { type: "h2", text: "What do participants actually learn in our sessions?" },
      {
        type: "p",
        text: "Six sessions: financial basics, budgeting, saving strategies including chamas, entrepreneurship basics, understanding credit, and income generation with digital tools like M-Pesa. Several participants have gone on to start micro-businesses with less than KES 1,000 in starting capital. Savings habits are one of the six KPIs we track in our [M&E framework](/programs) - because money skills are measurable, and so is change.",
      },
      {
        type: "sources",
        items: [
          { label: "Central Bank of Kenya - consumer protection and financial literacy", url: "https://www.centralbank.go.ke/" },
          { label: "Kenya Bankers Association", url: "https://www.kba.co.ke/" },
        ],
      },
    ],
  },
  {
    slug: "menstrual-health-myths-and-facts",
    title: "Menstrual Health: Which Period Myths Should You Stop Believing?",
    directAnswer:
      "Menstruation is a normal monthly process, not an illness or a curse. Common myths - that you cannot conceive during your period, that exercise or washing harms you, that periods make you unclean - are all false. Pain that stops daily life is a medical issue worth assessing, and Kenya's health policy treats menstrual health as a dignity matter.",
    metaDescription:
      "Evidence-based answers to the most common period myths among Kenyan young women, plus hygiene basics, cycle tracking and when to see a health provider.",
    cluster: "srhr",
    programSlug: "srhr",
    siblings: ["srhr-rights-in-kenya-for-young-women", "mental-health-support-for-young-women-in-nairobi"],
    keywords: ["menstrual health kenya", "period myths facts", "menstruation young women nairobi"],
    blocks: [
      {
        type: "p",
        text: "Every month, for roughly four decades, the lining of the uterus builds up and sheds - that is **menstruation**. It signals a working reproductive system, yet myths still shame girls out of school and out of clinics. Menstrual health is session one of our [SRHR program](/programs/srhr) because knowledge here has an immediate, practical effect on confidence, school attendance and health.",
      },
      { type: "h2", text: "Myth vs fact" },
      {
        type: "table",
        head: ["Myth", "Fact"],
        rows: [
          ["You cannot get pregnant if you have sex during your period", "False. Sperm survive for days; cycles vary. Unprotected sex can lead to pregnancy at almost any point in the cycle."],
          ["Exercise during periods is harmful", "False. Light to moderate exercise can actually reduce cramps and improve mood."],
          ["A menstruating person is unclean or should not cook, attend church or touch communal things", "False. Menstrual blood is not dirt. Taboos like these are exactly what Kenya's Menstrual Health Management Policy (2019-2030) works to dismantle."],
          ["Very painful periods are normal and must just be endured", "Not necessarily. Severe pain that disrupts school or work deserves a clinical assessment - conditions like endometriosis and fibroids are real and manageable."],
          ["You lose a lot of blood during a period", "Usually 30-80 millilitres across the whole period - a few tablespoons. Soaking a pad or tampon hourly is a sign to see a provider."],
        ],
      },
      { type: "h2", text: "What is a normal cycle, anyway?" },
      {
        type: "ul",
        items: [
          "Cycles commonly run **21 to 35 days**, counted from the first day of one period to the first day of the next.",
          "Bleeding lasts roughly **2 to 7 days**.",
          "Teen cycles are often irregular for the first couple of years - that alone is usually not alarming.",
          "Track your cycle in a notebook or free app: pattern knowledge turns panic into information.",
        ],
      },
      { type: "term", term: "PMS (premenstrual syndrome)", definition: "A cluster of physical and mood symptoms - tenderness, bloating, irritability, low mood - in the days before a period, easing once bleeding starts. Severe forms deserve clinical support." },
      { type: "h2", text: "What are the hygiene basics that actually matter?" },
      {
        type: "ol",
        items: [
          "Change pads or tampons every 4-6 hours; wash hands before and after.",
          "Clean the external genital area with water and mild soap; never insert soap inside.",
          "Wrap used disposables and bin them properly; reusable pads and menstrual cups are safe, economical options when used per instructions.",
          "Do not flush pads down toilets - Nairobi's drainage will thank you.",
          "If you cannot afford products, ask: schools, county facilities and community organisations (including ours) can point you to support.",
        ],
      },
      {
        type: "callout",
        title: "Period poverty is a policy issue, not a personal failure",
        text: "Kenya's Menstrual Health Management Policy (2019-2030) recognises products, privacy and information as rights-based needs. If products are a struggle, talk to us at info@bintirising.org - confidentially.",
      },
      { type: "h2", text: "When should you see a health provider?" },
      {
        type: "ul",
        items: [
          "Pain that stops you attending school or work, or that painkillers do not touch.",
          "Bleeding that soaks through protection hourly, or periods lasting longer than 7 days.",
          "No period by age 16, or a period that suddenly stops for 3 months (if pregnancy is not possible).",
          "Bleeding between periods or after sex.",
          "Fever with pelvic pain - seek care urgently.",
        ],
      },
      { type: "h2", text: "Keep learning" },
      {
        type: "p",
        text: "Continue with [your SRHR rights in Kenya](/learn/srhr-rights-in-kenya-for-young-women) and [where to start with mental health support in Nairobi](/learn/mental-health-support-for-young-women-in-nairobi), or see the full [SRHR program curriculum](/programs/srhr).",
      },
      {
        type: "sources",
        items: [
          { label: "WHO - Adolescent health", url: "https://www.who.int/news-room/fact-sheets/detail/adolescent-health" },
          { label: "UNICEF Kenya - menstrual health and hygiene", url: "https://www.unicef.org/kenya/" },
          { label: "Ministry of Health, Kenya", url: "https://www.health.go.ke/" },
        ],
      },
    ],
  },
];

export function getArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug);
}

/** Rough visible word count for Article schema wordCount and CI checks. */
export function articleWordCount(article: LearnArticle): number {
  let words = 0;
  const count = (s: string) => s.split(/\s+/).filter(Boolean).length;
  words += count(article.directAnswer);
  for (const b of article.blocks) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
        words += count(b.text);
        break;
      case "ul":
      case "ol":
        b.items.forEach((i) => (words += count(i)));
        break;
      case "table":
        b.head.forEach((h) => (words += count(h)));
        b.rows.forEach((r) => r.forEach((c) => (words += count(c))));
        break;
      case "callout":
        words += count(b.title) + count(b.text);
        break;
      case "term":
        words += count(b.term) + count(b.definition);
        break;
      default:
        break;
    }
  }
  return words;
}
