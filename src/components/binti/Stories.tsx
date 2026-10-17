import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, MapPin, Info } from 'lucide-react';
import Link from 'next/link';
import { STORIES } from '@/lib/data/stories';

/**
 * Participant stories - ANONYMISED (R1/2.5). The previous version displayed
 * full names with no consent trail; names are withheld until signed consent
 * is recorded. Full stories live on /stories/[slug] pages.
 */
const pillarColors: Record<string, string> = {
  SRHR: 'bg-binti-pink/10 text-binti-pink border-binti-pink/20',
  'Financial Freedom': 'bg-binti-teal/10 text-binti-teal border-binti-teal/20',
  'Mental Health': 'bg-binti-purple/10 text-binti-purple border-binti-purple/20',
  Leadership: 'bg-binti-gold/10 text-binti-gold border-binti-gold/20',
};

const partners = [
  'Nairobi County community health structures',
  'Community health volunteers',
  'Local women\u2019s groups (chamas)',
  'Nairobi youth organisations',
  'Public health facilities',
  'Schools and colleges',
];

export default function Stories() {
  return (
    <section id="stories" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Community Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy">
            Stories of{' '}
            <span className="text-gradient">Change</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg">
            Hear from the young women across Nairobi whose lives have been transformed through our
            programs. Their stories inspire our work every day.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-binti-navy/50 bg-binti-warm-gray/60 rounded-full px-4 py-2">
            <Info className="h-3.5 w-3.5" aria-hidden />
            Stories are anonymised to protect participants&apos; privacy.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STORIES.slice(0, 6).map((story) => (
            <article
              key={story.slug}
              className="group relative bg-binti-warm-gray/40 rounded-2xl p-6 sm:p-8 hover:bg-binti-warm-gray/70 transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-binti-pink" />
              </div>

              <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed mb-6 relative">
                &ldquo;{story.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-binti-pink text-white font-bold text-sm">
                    {story.ward.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-binti-navy text-sm">{story.attribution}</div>
                  <div className="flex items-center gap-1 text-binti-navy/50 text-xs">
                    <MapPin className="w-3 h-3" />
                    {story.ward}, Nairobi &middot; Age band {story.ageBand}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`text-xs ${pillarColors[story.pillar]}`}>
                  {story.pillar}
                </Badge>
                <Link
                  href={`/stories/${story.slug}`}
                  className="text-xs font-semibold text-binti-pink hover:underline"
                >
                  Read her story &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Read all stories */}
        <div className="mt-10 text-center">
          <Link
            href="/stories"
            className="inline-block text-sm font-semibold text-binti-pink hover:underline"
          >
            Read all stories of change &rarr;
          </Link>
        </div>

        {/* Ecosystem note (not an endorsement claim - see SEO audit R1) */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-binti-navy">Where the work happens</h3>
            <p className="text-sm text-binti-navy/50 mt-1">
              Our sessions run in and alongside Nairobi&apos;s community structures
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-4 py-2 bg-binti-warm-gray/60 rounded-full text-sm text-binti-navy/70 font-medium border border-binti-warm-gray hover:border-binti-pink/30 hover:text-binti-pink transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
