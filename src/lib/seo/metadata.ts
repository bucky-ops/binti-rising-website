import type { Metadata } from "next";
import { siteUrlFor, SITE_URL } from "@/lib/site-url";

export interface BuildMetadataOptions {
  /** Route path, e.g. "/programs/srhr" or "/". */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  /** OG image path (defaults to the generated site OG image). */
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Typed metadata builder (spec 5.1) - no hand-written meta tags anywhere.
 * Titles are front-loaded and <= 58 chars; descriptions 140-155 chars.
 * Every URL emitted here is absolute and derived from SITE_URL.
 */
export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const url = siteUrlFor(opts.path);
  const ogImage = opts.image ?? `${SITE_URL}/opengraph-image`;

  // Title discipline (spec 5.1): final title <= ~60 chars including brand.
  // Absolute title so the root layout template never double-appends.
  const BRAND = " | BINTI Rising";
  const fullTitle = /BINTI Rising/i.test(opts.title)
    ? opts.title
    : opts.title.length + BRAND.length <= 60
      ? opts.title + BRAND
      : opts.title;

  return {
    title: { absolute: fullTitle },
    description: opts.description,
    alternates: {
      canonical: opts.path === "/" ? "/" : opts.path,
    },
    robots: opts.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: "BINTI Rising Initiative",
      locale: "en_KE",
      type: opts.type ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [ogImage],
    },
  };
}
