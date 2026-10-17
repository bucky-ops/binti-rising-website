import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/events",
  title: "Events & Workshops | BINTI Rising Initiative",
  description:
    "Upcoming workshops, launches and community sessions by BINTI Rising Initiative for young women across Nairobi, Kenya.",
});

/**
 * Events hub. /events/[slug] pages (with Event JSON-LD) are generated only
 * when the organisation publishes a real event - empty hubs and stub event
 * pages are soft-404 bait (spec 1.7 / R1). Until then this page links to the
 * program calendar.
 */
export default function EventsPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/events",
          title: "Events & Workshops | BINTI Rising Initiative",
          description:
            "Upcoming workshops, launches and community sessions by BINTI Rising Initiative for young women across Nairobi, Kenya.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
          ],
        }))}
      />
      <PageHero
        kicker="Events"
        title="Workshops, launches and community sessions"
        intro="BINTI Rising runs cohort sessions on a rolling six-month calendar across our communities. Public events - launches, open workshops and community forums - are announced here."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ]}
      />

      <section className="py-16 bg-binti-warm-gray/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <CalendarDays className="w-12 h-12 text-binti-pink mx-auto mb-4" aria-hidden />
          <h2 className="text-2xl font-bold text-binti-navy mb-3">
            No public events scheduled right now
          </h2>
          <p className="text-binti-navy/70 leading-relaxed mb-6">
            Our current cohorts are in session. When the next public event is
            confirmed - with date, venue and how to join - it will be published
            here with full details. In the meantime:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/programs"
              className="inline-block rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-3 text-sm font-bold text-white transition-colors"
            >
              Explore the four programs
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-full border border-binti-pink px-6 py-3 text-sm font-bold text-binti-pink hover:bg-binti-pink/5 transition-colors"
            >
              Ask about joining a cohort
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
