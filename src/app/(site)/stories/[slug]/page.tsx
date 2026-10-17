import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, articleNode, fullPageGraph } from "@/lib/seo/schema";
import { STORIES, getStory } from "@/lib/data/stories";

const CONTENT_EPOCH = "2026-10-17";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return buildMetadata({
    path: `/stories/${story.slug}`,
    title: `${story.attribution} | ${story.pillar} story`,
    description: `A young woman from ${story.ward} shares how BINTI Rising's ${story.pillar} program changed her outlook. Anonymised participant story.`,
    type: "article",
    publishedTime: CONTENT_EPOCH,
    modifiedTime: CONTENT_EPOCH,
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const others = STORIES.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: `/stories/${story.slug}`,
          title: `${story.attribution} | ${story.pillar} story`,
          description: `A young woman from ${story.ward} shares how BINTI Rising's ${story.pillar} program changed her outlook.`,
          type: "WebPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
            { name: story.attribution, path: `/stories/${story.slug}` },
          ],
          extra: [
            articleNode({
              path: `/stories/${story.slug}`,
              headline: `${story.attribution}: a ${story.pillar} story`,
              description: `Anonymised participant story from ${story.ward}, Nairobi.`,
              datePublished: CONTENT_EPOCH,
              dateModified: CONTENT_EPOCH,
              wordCount: 320,
              authorName: "BINTI Rising Initiative Editorial Team",
            }),
          ],
        }))}
      />
      <PageHero
        kicker={`${story.pillar} story`}
        title={`${story.attribution}, age band ${story.ageBand}`}
        intro={`From ${story.ward}, Nairobi - a participant in our ${story.pillar} pillar.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
          { name: story.attribution, path: `/stories/${story.slug}` },
        ]}
      />

      <section className="py-14 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 inline-flex items-center gap-2 text-xs text-binti-navy/50 bg-binti-warm-gray/60 rounded-full px-4 py-2">
            <Info className="h-3.5 w-3.5" aria-hidden />
            {story.anonymisationNote}
          </p>

          <blockquote className="border-l-4 border-binti-pink pl-6 py-2">
            <p className="text-xl sm:text-2xl text-binti-navy/80 leading-relaxed font-medium">
              &ldquo;{story.quote}&rdquo;
            </p>
          </blockquote>

          <div className="mt-10 space-y-4 text-binti-navy/70 leading-relaxed">
            <h2 className="text-2xl font-bold text-binti-navy">
              How the {story.pillar} pillar works
            </h2>
            <p>
              This participant journey began in the {story.pillar} pillar, one
              of four programs BINTI Rising delivers free to young women aged
              15-25 across Nairobi. Sessions follow a documented curriculum,
              facilitated in community spaces, with progress tracked through
              our six-indicator monitoring and evaluation framework.
            </p>
            <p>
              Stories like this one are why the four pillars are taught
              together: knowledge on its own is fragile without the confidence,
              economic footing and community that the other pillars build.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/programs/${story.pillarSlug}`}
              className="inline-block rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-3 text-sm font-bold text-white transition-colors"
            >
              See the {story.pillar} program
            </Link>
            <Link
              href="/stories"
              className="inline-block rounded-full border border-binti-pink px-6 py-3 text-sm font-bold text-binti-pink hover:bg-binti-pink/5 transition-colors"
            >
              All stories
            </Link>
          </div>

          <div className="mt-14">
            <h2 className="text-xl font-bold text-binti-navy mb-4">More stories of change</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/stories/${s.slug}`}
                  className="group rounded-xl border border-binti-warm-gray bg-binti-warm-gray/40 p-5 hover:border-binti-pink/40 transition-all"
                >
                  <h3 className="font-bold text-binti-navy group-hover:text-binti-pink transition-colors text-sm">
                    {s.attribution}
                  </h3>
                  <p className="mt-1 text-xs text-binti-navy/60">
                    {s.ward} &middot; {s.pillar}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
