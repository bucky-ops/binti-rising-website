/**
 * Canonical site URL resolution with build-time guard.
 *
 * SEO rule (spec 1.1): every emitted canonical / OG / sitemap URL must use the
 * production hostname. A relative canonical or a `localhost` URL must never
 * escape into production HTML.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL (set in Vercel Production/Preview/Development env)
 *  2. http://localhost:3000 (local dev ONLY - production builds throw)
 */

function assertHttpsProd(url: URL): void {
  const isProdBuild = process.env.NODE_ENV === "production";
  if (!isProdBuild) return;
  if (url.protocol !== "https:") {
    throw new Error(
      `[SEO] NEXT_PUBLIC_SITE_URL must use https:// in production. Got: "${url.href}". ` +
        `Set NEXT_PUBLIC_SITE_URL in your Vercel project environment variables.`
    );
  }
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "0.0.0.0") {
    throw new Error(
      `[SEO] NEXT_PUBLIC_SITE_URL must not be a localhost host in production. Got: "${url.href}".`
    );
  }
}

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (raw) {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    let url: URL;
    try {
      url = new URL(withProtocol);
    } catch {
      throw new Error(`[SEO] NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}".`);
    }
    assertHttpsProd(url);
    // Normalize: no trailing slash.
    return url.href.replace(/\/+$/, "");
  }

  // No env var present: allow only in non-production (local dev / sandbox preview).
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[SEO] NEXT_PUBLIC_SITE_URL is missing in a production build. " +
        "Add NEXT_PUBLIC_SITE_URL (e.g. https://bintirising.org) to the build environment. " +
        "Refusing to emit relative or localhost canonicals."
    );
  }
  return "http://localhost:3000";
}

/** Canonical origin, no trailing slash. e.g. "https://bintirising.org" */
export const SITE_URL: string = resolveSiteUrl();

/** Absolute URL helper for any path. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path.replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean.replace(/\/+$/, "") || ""}` || SITE_URL;
}

/** Absolute URL for "/" is the bare origin; for "/x" it is origin + "/x". */
export function siteUrlFor(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/" || clean === "") return SITE_URL;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}
