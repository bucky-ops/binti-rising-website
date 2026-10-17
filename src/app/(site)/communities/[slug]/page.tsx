import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, Users, BookOpen } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import CrisisHelpline from "@/components/binti/CrisisHelpline";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, communityNode, fullPageGraph } from "@/lib/seo/schema";
import { COMMUNITIES, getCommunity } from "@/lib/data/communities";
import { PROGRAMS } from "@/lib/data/programs";
import { STORIES } from "@/lib/data/stories";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ward = getCommunity(slug);
  if (!ward) return {};
  return buildMetadata({
    path: `/communities/${ward.slug}`,
    title: `Youth Programs in ${ward.name}, Nairobi | BINTI Rising`,
    description: `BINTI Rising runs free SRHR, mental health, financial literacy and leadership programs for young women in ${ward.name}, Nairobi. See sessions near you.`,
  });
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const ward = getCommunity(slug);
  if (!ward) notFound();

  const localStories = STORIES.filter((s) => s.ward === ward.name);
  const others = COMMUNITIES.filter((c) => c.slug !== ward.slug).slice(0, 6);

  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: `/communities/${ward.slug}`,
          title: `Youth Programs in ${ward.name}, Nairobi | BINTI Rising`,
          description: `BINTI Rising runs free SRHR, mental health, financial literacy and leadership programs for young women in ${ward.name}, Nairobi.`,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Communities", path: "/communities" },
            { name: ward.name, path: `/communities/${ward.slug}` },
          ],
          extra: [communityNode(ward)],
        }))}
      />
      <PageHero
        kicker={`${ward.subCounty} · Nairobi`}
        title={`Free programs for young women in ${ward.name}`}
        intro={`BINTI Rising delivers SRHR education, mental health support, financial literacy and leadership training for young women aged 15-25 in ${ward.name} - free of charge, in community spaces close to home.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Communities", path: "/communities" },
          { name: ward.name, path: `/communities/${ward.slug}` },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-4">
                  What young women in {ward.name} face - and what we do about it
                </h2>
                <div className="space-y-4 text-binti-navy/70 leading-relaxed">
                  <p>{ward.description}</p>
                  <p>
                    Like much of Nairobi, {ward.name} has a large population of
                    young women aged 15-25 navigating the same four challenges
                    BINTI Rising exists to address: limited access to sexual and
                    reproductive health information, mental health stigma,
                    financial exclusion, and few structured leadership
                    opportunities for girls. Rather than asking participants to
                    travel across the city, our facilitators run sessions in{" "}
                    {ward.name} itself, working with community venues and local
                    structures.
                  </p>
                  <p>
                    Sessions in {ward.name} follow the same documented
                    curriculum we deliver across Nairobi - 26 structured
                    sessions across four pillars - adapted to the realities
                    participants raise in the room, in English and Swahili, and
                    always free.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                  The four pillars in {ward.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PROGRAMS.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      className="group rounded-xl border border-binti-warm-gray bg-binti-warm-gray/40 p-5 hover:border-binti-pink/40 hover:bg-white transition-all"
                    >
                      <h3 className="font-bold text-binti-navy group-hover:text-binti-pink transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-xs text-binti-navy/60">
                        {p.sessions.length} sessions &middot; free &middot; ages 15-25
                      </p>
                      <p className="mt-2 text-sm text-binti-navy/70 leading-relaxed line-clamp-2">
                        {p.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {localStories.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                    From {ward.name}
                  </h2>
                  <div className="space-y-4">
                    {localStories.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/stories/${s.slug}`}
                        className="block rounded-xl border border-binti-warm-gray bg-binti-warm-gray/40 p-5 hover:border-binti-pink/40 transition-all"
                      >
                        <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed">
                          &ldquo;{s.quote.slice(0, 160)}&hellip;&rdquo;
                        </p>
                        <p className="mt-2 text-sm font-semibold text-binti-pink">
                          {s.attribution} - read her story &rarr;
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-5 h-5 text-binti-pink" aria-hidden />
                  <h2 className="font-bold text-binti-navy">Join in {ward.name}</h2>
                </div>
                <p className="text-sm text-binti-navy/70 leading-relaxed mb-4">
                  Registration for cohorts in {ward.name} is open year-round.
                  Contact us and we will connect you with the mobiliser for
                  your area.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-3 text-sm font-bold text-white transition-colors"
                >
                  Register interest
                </Link>
              </div>

              {ward.lat != null && ward.lng != null && (
                <div className="rounded-2xl overflow-hidden border border-binti-warm-gray">
                  <div className="bg-binti-warm-gray/60 px-4 py-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-binti-pink" aria-hidden />
                    <span className="text-sm font-semibold text-binti-navy">{ward.name}, Nairobi</span>
                  </div>
                  <iframe
                    title={`Map of ${ward.name}, Nairobi`}
                    src={`https://www.google.com/maps?q=${ward.lat},${ward.lng}&z=14&output=embed`}
                    width="100%"
                    height="260"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0"
                  />
                </div>
              )}

              <div className="rounded-2xl bg-binti-warm-gray/60 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-binti-teal" aria-hidden />
                  <h2 className="font-bold text-binti-navy">Other areas we serve</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {others.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/communities/${c.slug}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-white border border-binti-warm-gray text-binti-navy/70 hover:text-binti-pink hover:border-binti-pink/30 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/communities"
                    className="text-xs px-2.5 py-1 rounded-full bg-white border border-binti-warm-gray text-binti-pink font-semibold hover:underline"
                  >
                    See all
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <CrisisHelpline />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
