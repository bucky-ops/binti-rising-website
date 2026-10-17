import type { Metadata } from "next";
import Link from "next/link";
import { Info, MapPin } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, itemListNode, fullPageGraph } from "@/lib/seo/schema";
import { STORIES } from "@/lib/data/stories";

export const metadata: Metadata = buildMetadata({
  path: "/stories",
  title: "Stories of Change | BINTI Rising Initiative",
  description:
    "Anonymised stories from young women in Nairobi whose lives changed through BINTI Rising's SRHR, mental health, financial literacy and leadership programs.",
});

export default function StoriesPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/stories",
          title: "Stories of Change | BINTI Rising Initiative",
          description:
            "Anonymised stories from young women in Nairobi whose lives changed through BINTI Rising's programs.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
          ],
          extra: [
            itemListNode({
              path: "/stories",
              name: "Participant stories",
              items: STORIES.map((s) => ({ name: s.attribution, path: `/stories/${s.slug}` })),
            }),
          ],
        }))}
      />
      <PageHero
        kicker="Stories of Change"
        title="In their own words, with their privacy protected"
        intro="These accounts come from participants in our four pillars across Nairobi. Every story is anonymised: names and identifying details are withheld unless a participant has given recorded consent to be named."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
        ]}
      />

      <section className="py-16 bg-binti-warm-gray/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 inline-flex items-center gap-2 text-xs text-binti-navy/50 bg-white rounded-full px-4 py-2 border border-binti-warm-gray">
            <Info className="h-3.5 w-3.5" aria-hidden />
            Names are withheld to protect privacy. To amend or remove your
            story, email info@bintirising.org.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {STORIES.map((story) => (
              <article
                key={story.slug}
                className="group bg-white rounded-2xl p-6 sm:p-8 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all hover:shadow-lg flex flex-col"
              >
                <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-binti-navy text-sm">{story.attribution}</div>
                  <div className="flex items-center gap-1 text-binti-navy/50 text-xs mt-0.5">
                    <MapPin className="w-3 h-3" aria-hidden />
                    {story.ward}, Nairobi &middot; Age band {story.ageBand}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-binti-pink/10 text-binti-pink border border-binti-pink/20 font-medium">
                      {story.pillar}
                    </span>
                    <Link
                      href={`/stories/${story.slug}`}
                      className="text-xs font-semibold text-binti-pink hover:underline"
                    >
                      Full story &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your story could carry someone else"
        text="If you have taken part in a BINTI Rising program and want to share your journey - named or anonymous - we would love to hear from you."
      />
    </>
  );
}
