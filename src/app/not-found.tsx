import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/binti/Navbar";

/**
 * Real 404 page (spec 1.7) - soft-404s ("Discovered - currently not indexed")
 * are a classic symptom of empty not-found shells. This page is useful,
 * navigable, and noindex-by-status-code.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="solid" />
      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-20">
        <div className="max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            404 - Page not found
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-binti-navy leading-tight">
            This page has moved or never existed
          </h1>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg leading-relaxed">
            The address you tried may be out of date. Here are the places most
            people are looking for:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full">
              <Link href="/">Go home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-binti-pink text-binti-pink hover:bg-binti-pink/5 rounded-full"
            >
              <Link href="/programs">Our programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-binti-purple text-binti-purple hover:bg-binti-purple/5 rounded-full"
            >
              <Link href="/learn">Learning guides</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-binti-teal text-binti-teal hover:bg-binti-teal/5 rounded-full"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
          <p className="mt-10 text-sm text-binti-navy/50">
            Looking for something specific? Email{" "}
            <a
              href="mailto:info@bintirising.org"
              className="text-binti-pink font-semibold hover:underline"
            >
              info@bintirising.org
            </a>
          </p>
        </div>
      </main>
      <SiteFooterMinimal />
    </div>
  );
}

function SiteFooterMinimal() {
  return (
    <footer className="bg-binti-navy text-white py-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} BINTI Rising Initiative &middot; Registered
        CBO &middot; Nairobi, Kenya
      </div>
    </footer>
  );
}
