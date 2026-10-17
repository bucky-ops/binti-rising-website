import { SITE_URL, siteUrlFor } from "@/lib/site-url";
import { LEARN_ARTICLES } from "@/lib/data/learn";
import { STORIES } from "@/lib/data/stories";

export const dynamic = "force-static";

const CONTENT_EPOCH = "2026-10-17";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * RSS 2.0 feed (spec 6.5) - learn articles + stories. Every new post appears
 * here and is picked up by the IndexNow deploy hook.
 */
export function GET() {
  const items = [
    ...LEARN_ARTICLES.map((a) => ({
      title: a.title,
      link: siteUrlFor(`/learn/${a.slug}`),
      guid: siteUrlFor(`/learn/${a.slug}`),
      description: a.metaDescription,
      pubDate: CONTENT_EPOCH,
      category: "Learning guide",
    })),
    ...STORIES.map((s) => ({
      title: `${s.attribution}: a ${s.pillar} story`,
      link: siteUrlFor(`/stories/${s.slug}`),
      guid: siteUrlFor(`/stories/${s.slug}`),
      description: s.quote.slice(0, 140) + "...",
      pubDate: CONTENT_EPOCH,
      category: "Stories of change",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BINTI Rising Initiative - Learning guides and stories</title>
    <link>${SITE_URL}</link>
    <description>Practical guides and participant stories from BINTI Rising Initiative, a registered CBO empowering young women aged 15-25 in Nairobi, Kenya.</description>
    <language>en-ke</language>
    <lastBuildDate>${new Date(CONTENT_EPOCH).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.guid}</guid>
      <description>${escapeXml(i.description)}</description>
      <category>${escapeXml(i.category)}</category>
      <pubDate>${new Date(i.pubDate).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
    },
  });
}
