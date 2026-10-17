import Link from "next/link";
import { Heart, HandHeart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Reusable end-of-page CTA band, server-rendered. Keeps every page one click
 * from donate / volunteer / partner (no dead ends, hub-and-spoke linking).
 */
export default function CtaBand({
  title = "Ready to be part of the change?",
  text = "Donate, volunteer or partner with us - every contribution directly supports young women in Nairobi.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-label="Get involved" className="py-16 md:py-20 bg-gradient-navy relative overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full bg-binti-pink/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">{text}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full px-8 py-6 text-base shadow-lg shadow-binti-pink/25"
          >
            <Link href="/get-involved/donate">
              <Heart className="w-4 h-4 mr-2" aria-hidden /> Donate
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base"
          >
            <Link href="/get-involved/volunteer">
              <HandHeart className="w-4 h-4 mr-2" aria-hidden /> Volunteer
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base"
          >
            <Link href="/get-involved/partner">
              <Users className="w-4 h-4 mr-2" aria-hidden /> Partner
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
