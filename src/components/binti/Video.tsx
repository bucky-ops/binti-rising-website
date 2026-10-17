import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, VideoOff } from 'lucide-react';
import PendingNotice from '@/components/binti/PendingNotice';

/**
 * SRHR video section. The previous version embedded a placeholder YouTube ID
 * with invented view-count/duration/rating stats (R1 violation) - both have
 * been removed. VideoObject JSON-LD is emitted only after a real video URL
 * is provided (PENDING_HUMAN_INPUT: video.url).
 */
export default function Video() {
  return (
    <section id="video" className="py-20 md:py-28 bg-binti-warm-gray/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Educational Content
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy leading-tight">
            Learn About{' '}
            <span className="text-gradient">SRHR</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-lg leading-relaxed">
            Our video guide on sexual and reproductive health is being published
            here soon. In the meantime, start with our written guides.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-binti-pink via-binti-purple to-binti-teal opacity-60 rounded-2xl blur" aria-hidden />
            <div className="relative bg-white rounded-2xl">
              <div className="aspect-video bg-gradient-to-br from-binti-warm-gray/50 to-binti-warm-gray/80 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-binti-pink/10 flex items-center justify-center" aria-hidden>
                  <VideoOff className="h-7 w-7 text-binti-pink" />
                </div>
                <h3 className="text-binti-navy font-bold text-lg">
                  Understanding SRHR: video guide coming soon
                </h3>
                <p className="text-binti-navy/60 text-sm max-w-md">
                  We are finalising production and publication rights. Want to
                  be notified? Email info@bintirising.org.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <PendingNotice compact />
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full">
                <Link href="/learn/srhr-rights-in-kenya-for-young-women">
                  Read: Your SRHR rights in Kenya
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-binti-pink text-binti-pink hover:bg-binti-pink/5 rounded-full"
              >
                <Link href="/programs/srhr">See the SRHR program</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
