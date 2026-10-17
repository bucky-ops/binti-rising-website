import type { MetadataRoute } from "next";
import { SITE_URL, siteUrlFor } from "@/lib/site-url";
import { ALL_ROUTES } from "@/lib/seo/all-routes";
import { routesForSitemap } from "@/lib/seo/routes";

/**
 * Sitemap generated from the typed route registry (spec 1.4).
 * lastModified comes from src/lib/seo/lastmod.json (git-sourced via
 * scripts/sync-lastmod.mjs) - NEVER new Date(), which resets on every deploy
 * and destroys the freshness signal.
 *
 * When the URL count grows past 50, split per-section sitemaps behind a
 * /sitemap.xml index (spec 1.4 splitting rule).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls = routesForSitemap(ALL_ROUTES);

  return urls.map((entry) => ({
    url: entry.url === "/" ? SITE_URL : siteUrlFor(entry.url),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
