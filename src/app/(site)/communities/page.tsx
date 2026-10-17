import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, itemListNode, fullPageGraph } from "@/lib/seo/schema";
import { COMMUNITIES } from "@/lib/data/communities";

export const metadata: Metadata = buildMetadata({
  path: "/communities",
  title: "Communities We Serve in Nairobi | BINTI Rising",
  description:
    "BINTI Rising works with young women in 11 Nairobi communities including Kayole, Dandora, Mathare, Kasarani, Embakasi and Kibera. Find your area.",
});

export default function CommunitiesPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/communities",
          title: "Communities We Serve in Nairobi | BINTI Rising",
          description:
            "BINTI Rising works with young women in 11 Nairobi communities including Kayole, Dandora, Mathare, Kasarani, Embakasi and Kibera.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Communities", path: "/communities" },
          ],
          extra: [
            itemListNode({
              path: "/communities",
              name: "Nairobi communities served by BINTI Rising",
              items: COMMUNITIES.map((c) => ({ name: c.name, path: `/communities/${c.slug}` })),
            }),
          ],
        }))}
      />
      <PageHero
        kicker="Communities"
        title="Where young women meet BINTI Rising in Nairobi"
        intro="Our programs are delivered in the neighbourhoods where participants live - community halls, schools and safe spaces across 11 Nairobi communities. Find your area, see what runs there, and get directions."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Communities", path: "/communities" },
        ]}
      />

      <section className="py-16 bg-binti-warm-gray/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITIES.map((ward) => (
              <article
                key={ward.slug}
                className="group bg-white rounded-2xl p-6 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-binti-pink" aria-hidden />
                  <span className="text-xs font-semibold text-binti-navy/50 uppercase tracking-wider">
                    {ward.subCounty}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-binti-navy">
                  <Link href={`/communities/${ward.slug}`} className="hover:text-binti-pink transition-colors">
                    {ward.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-binti-navy/70 leading-relaxed">
                  {ward.description}
                </p>
                <Link
                  href={`/communities/${ward.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-binti-pink hover:underline"
                >
                  Programs in {ward.name} &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center rounded-2xl bg-white border border-binti-warm-gray p-6 sm:p-8">
            <h2 className="text-xl font-bold text-binti-navy mb-2">Not on the list?</h2>
            <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed mb-4">
              We expand to new communities as facilitators and venues become
              available. If you want BINTI Rising sessions in your Nairobi
              neighbourhood, contact us - community demand is how new cohorts
              start.
            </p>
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold text-binti-pink hover:underline"
            >
              Request a program in your area &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
