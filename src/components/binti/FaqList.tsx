import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/data/faqs";

/**
 * Fully server-rendered FAQ list using native <details>/<summary>.
 * R3 COMPLIANCE: all question AND answer text is present in the initial
 * HTML (Radix Accordion unmounts collapsed content - replaced here).
 * Styled to match the existing shadcn accordion look.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-binti-warm-gray/50 border border-binti-warm-gray rounded-lg px-6 overflow-hidden hover:bg-binti-warm-gray/70 transition-colors shadow-sm"
        >
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-semibold text-binti-navy group-open:text-binti-pink transition-colors [&::-webkit-details-marker]:hidden">
            <span className="text-left">{faq.question}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-binti-navy/50 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 text-binti-navy/70 leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** 4-question teaser used on the homepage - fully server-rendered. */
export function FaqTeaser({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-binti-warm-gray/50 border border-binti-warm-gray rounded-lg px-6 overflow-hidden hover:bg-binti-warm-gray/70 transition-colors shadow-sm"
        >
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-semibold text-binti-navy group-open:text-binti-pink transition-colors [&::-webkit-details-marker]:hidden">
            <span className="text-left">{faq.question}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-binti-navy/50 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 text-binti-navy/70 leading-relaxed">{faq.answer}</p>
        </details>
      ))}
      <p className="text-center text-sm text-binti-navy/60 pt-2">
        See all{" "}
        <Link href="/faqs" className="text-binti-pink font-semibold hover:underline">
          frequently asked questions
        </Link>
        .
      </p>
    </div>
  );
}
