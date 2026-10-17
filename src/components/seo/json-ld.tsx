/**
 * <JsonLdGraph> - server component emitting ONE `application/ld+json`
 * <script> per page containing {"@context","@graph":[...]} (spec 4.1).
 *
 * - `<` / `>` are escaped in the serialised JSON to prevent XSS and hydration
 *   breakage inside inline scripts.
 * - Never call this component twice on one page.
 */
const JSON_LD_SCRIPT_TYPE = "application/ld+json";

function serialize(nodes: unknown[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes })
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function JsonLdGraph({ nodes }: { nodes: unknown[] }) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <script
      type={JSON_LD_SCRIPT_TYPE}
      dangerouslySetInnerHTML={{ __html: serialize(nodes) }}
    />
  );
}
