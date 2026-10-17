import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Target, MapPin, BookOpen } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import CrisisHelpline from "@/components/binti/CrisisHelpline";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, serviceNode, fullPageGraph } from "@/lib/seo/schema";
import { PROGRAMS, getProgram } from "@/lib/data/programs";
import { LEARN_ARTICLES } from "@/lib/data/learn";
import { COMMUNITIES } from "@/lib/data/communities";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Prerender the four program spokes (spec Phase 3). */
export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return buildMetadata({
    path: `/programs/${program.slug}`,
    title: program.seoTitle,
    description: `Free ${program.sessions.length}-session ${program.name.toLowerCase()} program for young women in Nairobi: ${program.summary.slice(0, 110)}... See the full curriculum.`,
  });
}

const HELPLINE_PILLARS = ["srhr", "mental-health"];

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = LEARN_ARTICLES.filter((a) => a.programSlug === program.slug).slice(0, 3);
  const siblings = PROGRAMS.filter((p) => p.slug !== program.slug);

  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: `/programs/${program.slug}`,
          title: program.seoTitle,
          description: program.summary,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: program.shortName, path: `/programs/${program.slug}` },
          ],
          extra: [serviceNode(program)],
        }))}
      />
      <PageHero
        kicker={`${program.shortName} Program`}
        title={`${program.name} program for young women in Nairobi`}
        intro={program.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: program.shortName, path: `/programs/${program.slug}` },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy">
                The full curriculum: {program.sessions.length} sessions
              </h2>
              <p className="mt-3 text-binti-navy/70 leading-relaxed">
                Each session is 90 minutes to 2 hours, facilitated by trained
                staff and volunteers, in English and Swahili, in community
                spaces across Nairobi. Participants who complete all four
                pillars attend 26 sessions over six months.
              </p>
              <ol className="mt-8 space-y-4">
                {program.sessions.map((session, i) => (
                  <li
                    key={session.title}
                    className="flex gap-4 bg-binti-warm-gray/40 rounded-xl p-5 border border-binti-warm-gray"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-binti-pink text-white font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-binti-navy">{session.title}</h3>
                      <p className="mt-1 text-sm text-binti-navy/70 leading-relaxed">{session.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Related learning guides (hub-and-spoke linking) */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-binti-navy mb-4">
                    Keep learning: related guides
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {related.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/learn/${article.slug}`}
                        className="group rounded-xl border border-binti-warm-gray bg-white p-5 hover:border-binti-pink/40 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-binti-purple mb-2">
                          <BookOpen className="w-3.5 h-3.5" aria-hidden /> Learning guide
                        </div>
                        <h3 className="font-bold text-binti-navy group-hover:text-binti-pink transition-colors text-sm sm:text-base">
                          {article.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border-2 border-binti-teal/30 bg-binti-teal/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-binti-teal" aria-hidden />
                  <h2 className="font-bold text-binti-navy">Outcomes we measure</h2>
                </div>
                <ul className="space-y-2.5">
                  {program.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-binti-navy/70">
                      <CheckCircle2 className="w-4 h-4 text-binti-teal shrink-0 mt-0.5" aria-hidden />
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-binti-navy/50 leading-relaxed">
                  These are programme targets tracked through our M&amp;E
                  framework; verified baseline and endline results are published
                  as cohorts complete.
                </p>
              </div>

              <div className="rounded-2xl border border-binti-warm-gray bg-binti-warm-gray/40 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-binti-pink" aria-hidden />
                  <h2 className="font-bold text-binti-navy">Where it runs</h2>
                </div>
                <p className="text-sm text-binti-navy/70 mb-3">
                  Delivered free in community spaces across {COMMUNITIES.length} Nairobi communities:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMUNITIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/communities/${c.slug}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-white border border-binti-warm-gray text-binti-navy/70 hover:text-binti-pink hover:border-binti-pink/30 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-navy p-6 text-white">
                <h2 className="font-bold text-lg mb-2">Join this program</h2>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  Participation is free. Register yourself or refer a young
                  woman - the next cohort in your area may have open places.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-3 text-sm font-bold transition-colors"
                >
                  Register interest
                </Link>
              </div>
            </aside>
          </div>

          {/* Cross-links to sibling pillars */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-binti-navy mb-4">Explore the other pillars</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {siblings.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  className="group rounded-xl border border-binti-warm-gray bg-white p-5 hover:border-binti-pink/40 hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-binti-navy group-hover:text-binti-pink transition-colors text-sm sm:text-base">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-binti-navy/60">{p.sessions.length} sessions &middot; free</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Crisis help block on sensitive pillars (spec 5.6) */}
          {HELPLINE_PILLARS.includes(program.slug) && (
            <div className="mt-12">
              <CrisisHelpline
                title={
                  program.slug === "srhr"
                    ? "Need help right now?"
                    : "Mental health support lines"
                }
              />
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
