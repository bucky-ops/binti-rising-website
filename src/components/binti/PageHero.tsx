import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/seo/schema";

/**
 * Server-rendered page header band + visual breadcrumbs (matches the site's
 * hero design language). The JSON-LD BreadcrumbList is emitted separately
 * per page via pageGraph().
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-binti-navy/60">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-binti-navy/40" aria-hidden />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-binti-navy/80">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-binti-pink transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function PageHero({
  kicker,
  title,
  intro,
  crumbs,
  tone = "light",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  tone?: "light" | "gradient";
}) {
  return (
    <section
      className={`relative pt-28 md:pt-36 pb-12 md:pb-16 ${
        tone === "gradient" ? "bg-gradient-binti" : "bg-white"
      }`}
    >
      <div
        aria-hidden
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-binti-pink/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs crumbs={crumbs} />
        {kicker && (
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            {kicker}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-binti-navy leading-tight max-w-4xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-base sm:text-lg text-binti-navy/70 leading-relaxed max-w-3xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
