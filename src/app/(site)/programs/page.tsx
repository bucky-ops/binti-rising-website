import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Brain, Wallet, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, offerCatalogNode, itemListNode, fullPageGraph } from "@/lib/seo/schema";
import { PROGRAMS } from "@/lib/data/programs";
import { COMMUNITIES } from "@/lib/data/communities";

export const metadata: Metadata = buildMetadata({
  path: "/programs",
  title: "Programs for Young Women in Nairobi | BINTI Rising",
  description:
    "Four free program pillars for young women 15-25 in Nairobi: SRHR, mental health, financial freedom and leadership. 26 sessions over 6 months.",
});

const pillarIcons = [Heart, Brain, Wallet, Crown];

export default function ProgramsPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/programs",
          title: "Programs for Young Women in Nairobi | BINTI Rising",
          description:
            "Four free program pillars for young women 15-25 in Nairobi: SRHR, mental health, financial freedom and leadership. 26 sessions over 6 months.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
          ],
          extra: [
            offerCatalogNode(PROGRAMS),
            itemListNode({
              path: "/programs",
              name: "BINTI Rising program pillars",
              items: PROGRAMS.map((p) => ({ name: p.name, path: `/programs/${p.slug}` })),
            }),
          ],
        }))}
      />
      <PageHero
        kicker="Our Programs"
        title="Four pillars, one journey: free programs for young women in Nairobi"
        intro="BINTI Rising delivers four program pillars - SRHR, mental health, financial freedom, and women's empowerment and leadership - as 26 structured sessions over six months. All programs are free for young women aged 15-25, delivered in community spaces across Nairobi."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
        ]}
      />

      <section className="py-16 bg-binti-warm-gray/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {PROGRAMS.map((program, i) => {
              const Icon = pillarIcons[i];
              return (
                <article
                  key={program.slug}
                  className="group bg-white rounded-2xl p-6 sm:p-8 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-binti-pink/10 transition-transform group-hover:scale-110">
                      <Icon className="w-7 h-7 text-binti-pink" aria-hidden />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-binti-warm-gray text-xs font-bold text-binti-navy/60">
                      {program.sessions.length} sessions
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-binti-navy">
                    <Link href={`/programs/${program.slug}`} className="hover:text-binti-pink transition-colors">
                      {program.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-binti-navy/70 text-sm sm:text-base leading-relaxed">
                    {program.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {program.sessions.slice(0, 3).map((s) => (
                      <li key={s.title} className="flex items-start gap-2 text-sm text-binti-navy/60">
                        <CheckCircle2 className="w-4 h-4 text-binti-teal shrink-0 mt-0.5" aria-hidden />
                        {s.title}
                      </li>
                    ))}
                    <li className="text-sm text-binti-navy/50 pl-6">
                      +{program.sessions.length - 3} more sessions
                    </li>
                  </ul>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-binti-pink hover:underline"
                  >
                    View full curriculum <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-heading" className="text-2xl sm:text-3xl font-bold text-binti-navy text-center">
            How delivery works
          </h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6 text-center">
            {[
              { step: "1", title: "Join", text: "A young woman registers through a community mobiliser, school, or the contact form." },
              { step: "2", title: "Learn", text: "Cohorts of around 20 take each pillar's sessions weekly in a community space." },
              { step: "3", title: "Measure", text: "Baseline and endline assessments track six indicators per participant." },
              { step: "4", title: "Lead", text: "Graduates become peer mentors who support the next cohort." },
            ].map((s) => (
              <article key={s.step} className="rounded-2xl bg-binti-warm-gray/60 p-6">
                <div className="w-10 h-10 rounded-full bg-binti-pink text-white font-extrabold flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-binti-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-binti-navy/70 leading-relaxed">{s.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-binti-navy/70 max-w-3xl mx-auto text-sm sm:text-base">
            Sessions run in {COMMUNITIES.length} Nairobi communities including{" "}
            {COMMUNITIES.slice(0, 5).map((c) => c.name).join(", ")} and more -{" "}
            <Link href="/communities" className="text-binti-pink font-semibold hover:underline">
              see the full list
            </Link>
            . Program outcomes we track are published as targets on each program
            page; verified results follow each M&amp;E cycle.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
