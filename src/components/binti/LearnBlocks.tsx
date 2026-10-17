import Link from "next/link";
import { ExternalLink, Lightbulb } from "lucide-react";
import type { Block } from "@/lib/data/learn";
import CrisisHelpline from "@/components/binti/CrisisHelpline";

/**
 * Server-side renderer for editorial blocks (R3: everything in initial HTML).
 * Supports minimal inline markdown: [label](url) links and **bold**.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key++} className="text-binti-navy font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("(") + 1, -1);
      const internal = href.startsWith("/");
      parts.push(
        internal ? (
          <Link key={key++} href={href} className="text-binti-pink font-semibold hover:underline">
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-binti-pink font-semibold hover:underline"
          >
            {label}
          </a>
        )
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function LearnBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-binti-navy/70 text-base leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-bold text-binti-navy pt-4">
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-xl font-bold text-binti-navy">
                {renderInline(block.text)}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-binti-navy/70 text-base leading-relaxed">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 space-y-2 text-binti-navy/70 text-base leading-relaxed">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-binti-warm-gray">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-binti-warm-gray/70">
                      {block.head.map((h) => (
                        <th key={h} className="text-left font-bold text-binti-navy px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-binti-warm-gray bg-white">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-binti-navy/70 align-top leading-relaxed">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-binti-pink shrink-0" aria-hidden />
                  <h2 className="font-bold text-binti-navy">{block.title}</h2>
                </div>
                <p className="text-sm text-binti-navy/70 leading-relaxed">{renderInline(block.text)}</p>
              </aside>
            );
          case "term":
            return (
              <div
                key={i}
                data-q-a="defined-term"
                className="rounded-xl border-l-4 border-binti-purple bg-binti-purple/5 p-5"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-binti-purple mb-1">
                  Definition
                </div>
                <p className="text-sm sm:text-base text-binti-navy/80 leading-relaxed">
                  <strong className="text-binti-navy">{block.term}:</strong> {block.definition}
                </p>
              </div>
            );
          case "sources":
            return (
              <div key={i} className="pt-4 border-t border-binti-warm-gray">
                <h2 className="text-sm font-bold uppercase tracking-widest text-binti-navy/60 mb-3">
                  Sources &amp; further reading
                </h2>
                <ul className="space-y-2">
                  {block.items.map((s) => (
                    <li key={s.url} className="flex items-start gap-2 text-sm text-binti-navy/60">
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 text-binti-pink" aria-hidden />
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-binti-pink transition-colors leading-relaxed"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Convenience wrapper: article body + trailing helpline. */
export function LearnBody({ blocks, helpline }: { blocks: Block[]; helpline?: boolean }) {
  return (
    <>
      <LearnBlocks blocks={blocks} />
      {helpline && (
        <div className="mt-10">
          <CrisisHelpline />
        </div>
      )}
    </>
  );
}
