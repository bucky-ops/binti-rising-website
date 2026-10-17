import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ScrollRestoration from "@/components/ScrollRestoration";
import { SITE_URL } from "@/lib/site-url";
import { ORG } from "@/lib/data/organization";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BINTI Rising Initiative | Empowering Young Women in Nairobi",
    template: "%s | BINTI Rising",
  },
  description: ORG.description,
  keywords: [
    "BINTI Rising",
    "Binti Rising Initiative",
    "young women empowerment Nairobi",
    "youth empowerment organization Nairobi",
    "Kenya CBO",
    "SRHR organization Nairobi",
    "mental health support young women Nairobi",
    "financial literacy for women Kenya",
    "women's leadership Kenya",
    "community-based organization Nairobi",
    "NGO for girls Nairobi",
    "donate to women's NGO Kenya",
    "volunteer Nairobi NGO",
    "Kayole",
    "Dandora",
    "Mathare",
  ],
  authors: [{ name: ORG.legalName, url: SITE_URL }],
  creator: ORG.legalName,
  publisher: ORG.legalName,
  category: "Nonprofit Organization",
  formatDetection: { telephone: false },
  alternates: {
    canonical: "/",
    languages: {
      "en-KE": "/",
      "x-default": "/",
    },
  },
  robots: {
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
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: ORG.legalName,
    title: "BINTI Rising Initiative | Empowering Young Women in Nairobi",
    description: ORG.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BINTI Rising Initiative - Empowering young women in Nairobi, Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BINTI Rising Initiative | Empowering Young Women in Nairobi",
    description: ORG.description,
    images: ["/opengraph-image"],
    site: "@bintirising",
  },
  // Search Console / Bing verification tokens are injected ONLY when provided
  // via env (never ship placeholder tokens - the old "your-google-verification-code"
  // meta was removed for that reason).
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.OTHER_VERIFICATION_YANDEX
      ? { yandex: process.env.OTHER_VERIFICATION_YANDEX }
      : {}),
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#E91E63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" suppressHydrationWarning>
      <head>
        {/* Local-business style geo hints (Nairobi, Kenya) */}
        <meta name="geo.region" content="KE-NBO" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        {/* NOTE: the JSON-LD graph is emitted per page (one block per page)
            by <JsonLdGraph nodes={fullPageGraph(...)} /> - composed of the
            site-level Organization + WebSite nodes plus the page's nodes.
            Never add a second ld+json script here. */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ScrollRestoration />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
