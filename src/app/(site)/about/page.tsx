import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { PROGRAMS } from "@/lib/data/programs";
import { ORG } from "@/lib/data/organization";
import { Heart, Brain, Wallet, Crown, Target, Eye, Compass, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About BINTI Rising | Registered CBO in Nairobi, Kenya",
  description:
    "Learn about BINTI Rising Initiative: our 2024 founding, mission, vision, values and the four pillars empowering young women aged 15-25 across Nairobi.",
});

const pillarIcons = [Heart, Brain, Wallet, Crown];

const values = [
  {
    title: "Dignity",
    text: "Every young woman is met where she is, without judgement. Confidentiality and respect are non-negotiable in every session.",
  },
  {
    title: "Evidence",
    text: "Programs follow a documented curriculum of 26 sessions and are measured through a six-indicator monitoring and evaluation framework.",
  },
  {
    title: "Community ownership",
    text: "Sessions run in the wards where participants live, with local leaders, women's groups and health structures involved.",
  },
  {
    title: "Sustainability",
    text: "We build capacity that stays: graduates become peer mentors who carry knowledge to the next cohort.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/about",
          title: "About BINTI Rising | Registered CBO in Nairobi, Kenya",
          description:
            "Learn about BINTI Rising Initiative: our 2024 founding, mission, vision, values and the four pillars empowering young women aged 15-25 across Nairobi.",
          type: "AboutPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
        }))}
      />
      <PageHero
        kicker="About Us"
        title="A Nairobi community-based organisation built for and with young women"
        intro="BINTI Rising Initiative is a registered CBO in Nairobi, Kenya, founded in 2024 to give young women aged 15-25 the knowledge, support and economic tools that their environment too often denies them."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="py-16 md:py-20 bg-white" aria-labelledby="story-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 id="story-heading" className="text-3xl sm:text-4xl font-bold text-binti-navy leading-tight">
                Why BINTI Rising exists
              </h2>
              <div className="mt-6 space-y-4 text-binti-navy/70 text-base leading-relaxed">
                <p>
                  Across Nairobi&apos;s estates and informal settlements, a girl growing up today
                  navigates decisions about her body, her money and her voice with shockingly
                  little support. Conversations about sexual and reproductive health are treated
                  as taboo. Stress and depression are called weakness. Starting a business is
                  framed as something for people with capital. And leadership still looks like
                  something done by other people, somewhere else.
                </p>
                <p>
                  <strong className="text-binti-navy">BINTI Rising Initiative</strong> was founded
                  in 2024 to change that, one cohort at a time. We work with young women aged
                  15-25 in more than ten Nairobi communities, delivering four program pillars -
                  SRHR, mental health, financial freedom, and women&apos;s empowerment and
                  leadership - as one connected journey of 26 structured sessions over six months.
                </p>
                <p>
                  The name says what we believe: from silence, she rises. Our participants are not
                  charity cases; they are the most under-resourced experts on their own lives. Our
                  job is to arm that expertise with information, skills and community - then get
                  out of the way as they lead.
                </p>
              </div>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-visual.jpg"
                  alt="Young women participating in a BINTI Rising program session in Nairobi"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "2024", label: "Founded" },
                  { value: "15-25", label: "Ages served" },
                  { value: "10+", label: "Nairobi communities" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-binti-warm-gray/60 p-4">
                    <div className="text-xl sm:text-2xl font-extrabold text-binti-pink">{s.value}</div>
                    <div className="text-xs text-binti-navy/60 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-binti-warm-gray/50" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="mission-heading" className="text-3xl sm:text-4xl font-bold text-binti-navy text-center">
            Mission, vision &amp; approach
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Our mission",
                text: "To empower young women aged 15-25 in Nairobi with the knowledge, mental resilience, financial skills and leadership capacity to make informed decisions and lead change in their communities.",
              },
              {
                icon: Eye,
                title: "Our vision",
                text: "A Nairobi where every young woman can understand her body, protect her mind, grow her income and use her voice - without permission from anyone.",
              },
              {
                icon: Compass,
                title: "Our approach",
                text: "Holistic, community-based and evidence-led: four pillars taught as one journey, measured against six KPIs, delivered free of charge in the wards where participants live.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-white rounded-2xl p-6 sm:p-8 border border-binti-warm-gray shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-pink/10 mb-4">
                  <item.icon className="w-6 h-6 text-binti-pink" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-binti-navy">{item.title}</h3>
                <p className="mt-3 text-binti-navy/70 text-sm sm:text-base leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="pillars-heading" className="text-3xl sm:text-4xl font-bold text-binti-navy text-center">
            The four pillars
          </h2>
          <p className="mt-4 text-center text-binti-navy/70 max-w-2xl mx-auto">
            Each pillar stands alone as a complete program; together they form a six-month
            journey. Every program is free for participants.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {PROGRAMS.map((program, i) => {
              const Icon = pillarIcons[i];
              return (
                <article key={program.slug} className="group bg-white rounded-2xl p-6 sm:p-8 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-pink/10">
                      <Icon className="w-6 h-6 text-binti-pink" aria-hidden />
                    </div>
                    <span className="text-xs font-bold text-binti-navy/50 uppercase tracking-wider">
                      {program.sessions.length} sessions
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-binti-navy">{program.name}</h3>
                  <p className="mt-2 text-binti-navy/70 text-sm leading-relaxed">{program.summary}</p>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-binti-pink hover:underline"
                  >
                    Explore the {program.shortName} program
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-binti-warm-gray/50" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-binti-navy text-center">
            What we hold ourselves to
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => (
              <article key={v.title} className="bg-white rounded-2xl p-6 border border-binti-warm-gray">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-binti-gold" aria-hidden />
                  <h3 className="font-bold text-binti-navy">{v.title}</h3>
                </div>
                <p className="text-binti-navy/70 text-sm leading-relaxed">{v.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 max-w-3xl mx-auto text-center rounded-2xl border border-binti-pink/20 bg-binti-pink/5 p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-binti-pink" aria-hidden />
              <h3 className="font-bold text-binti-navy">Registered and accountable</h3>
            </div>
            <p className="text-sm text-binti-navy/70 leading-relaxed">
              BINTI Rising Initiative is registered as a community-based
              organisation in Kenya and reports on its governance and funding
              openly. Read our{" "}
              <Link href="/about/governance" className="text-binti-pink font-semibold hover:underline">
                governance and transparency page
              </Link>{" "}
              or{" "}
              <Link href="/about/team" className="text-binti-pink font-semibold hover:underline">
                meet the team
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
