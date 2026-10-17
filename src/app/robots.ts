import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * Generated robots.txt (spec 1.3) - always tracks the canonical host,
 * unlike the static file it replaces.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
