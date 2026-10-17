import type { NextConfig } from "next";

/**
 * Security & SEO headers (spec 1.6):
 *  - poweredByHeader: false            (fingerprint reduction)
 *  - X-Robots-Tag: all                 (belt and braces against stray noindex)
 *  - HSTS, Referrer-Policy, nosniff    (trust signals, donor safety)
 *  - immutable caching for /_next/static, SWR for pages
 * CSP is applied only in production and intentionally allows inline scripts
 * (Next.js hydration + JSON-LD require it; nonce-based CSP would need
 * middleware and is a Phase-2 hardening backlog item).
 * No frame-ancestors / X-Frame-Options: the sandbox preview and partner
 * embeds need framing; revisit if embedding abuse appears.
 */
const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Robots-Tag", value: "all" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(isProd
    ? [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube-nocookie.com",
            "media-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; "),
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
