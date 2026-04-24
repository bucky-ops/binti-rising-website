import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BINTI Rising Initiative | Empowering Young Women in Nairobi, Kenya",
  description:
    "BINTI Rising Initiative is a registered Kenyan CBO empowering young women aged 15-25 through SRHR education, mental health support, financial literacy, and women empowerment programs in Nairobi, Kenya. Your support changes lives.",
  keywords: [
    "BINTI Rising",
    "young women empowerment",
    "Kenya CBO",
    "SRHR",
    "mental health",
    "financial literacy",
    "women empowerment",
    "Nairobi",
    "Nairobi Kenya",
    "community-based organization",
    "donate Kenya",
    "women empowerment Nairobi",
  ],
  authors: [{ name: "BINTI Rising Initiative" }],
  creator: "BINTI Rising Initiative",
  publisher: "BINTI Rising Initiative",
  metadataBase: new URL("https://bintirising.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BINTI Rising Initiative | Empowering Young Women in Nairobi, Kenya",
    description:
      "Empowering young women aged 15-25 through comprehensive programs in SRHR, mental health, financial freedom, and leadership in Nairobi, Kenya. Your support directly transforms lives.",
    url: "https://bintirising.org",
    siteName: "BINTI Rising Initiative",
    images: [
      {
        url: "/binti-logo.jpg",
        width: 800,
        height: 800,
        alt: "BINTI Rising Initiative Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BINTI Rising Initiative",
    description:
      "Empowering young women in Nairobi, Kenya through education, health, and leadership programs. Donate today to change lives.",
    images: ["/binti-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/binti-logo.jpg",
    apple: "/binti-logo.jpg",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "BINTI Rising Initiative",
  url: "https://bintirising.org",
  logo: "https://bintirising.org/binti-logo.jpg",
  description:
    "Empowering young women aged 15-25 through SRHR education, mental health support, financial literacy, and women empowerment programs in Nairobi, Kenya.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi",
  },
  areaServed: {
    "@type": "City",
    name: "Nairobi",
    sameAs: "https://en.wikipedia.org/wiki/Nairobi",
  },
  foundingDate: "2024",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 10,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general",
      email: "info@bintirising.org",
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+254-700-000-000",
      availableLanguage: ["English", "Swahili"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/bintirising",
    "https://www.facebook.com/bintirising",
    "https://twitter.com/bintirising",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BINTI Rising Initiative",
  url: "https://bintirising.org",
  description:
    "BINTI Rising Initiative - Empowering young women in Nairobi, Kenya through SRHR, mental health, financial literacy, and leadership programs.",
  publisher: {
    "@type": "NGO",
    name: "BINTI Rising Initiative",
    logo: {
      "@type": "ImageObject",
      url: "https://bintirising.org/binti-logo.jpg",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://bintirising.org/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BINTI Rising Initiative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BINTI Rising Initiative is a registered Community-Based Organization in Nairobi, Kenya, dedicated to empowering young women aged 15-25 through four comprehensive program pillars: Sexual & Reproductive Health Rights (SRHR), Mental Health & Wellbeing, Financial Freedom & Literacy, and Women Empowerment & Leadership.",
      },
    },
    {
      "@type": "Question",
      name: "Where does BINTI Rising operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BINTI Rising Initiative operates in Nairobi, Kenya, reaching young women across 10+ communities within Nairobi County. We partner with local health facilities, community leaders, and women's groups to deliver our programs.",
      },
    },
    {
      "@type": "Question",
      name: "How can I donate to BINTI Rising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can donate to BINTI Rising via M-Pesa (Paybill: 123456, Account: BINTI) or bank transfer to KCB Bank, Account Name: BINTI Rising Initiative. Every contribution counts — KES 1,000 trains a young woman for a full session, KES 5,000 funds complete pillar training, and KES 20,000 sponsors an entire cohort.",
      },
    },
    {
      "@type": "Question",
      name: "How can I volunteer with BINTI Rising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can volunteer by filling out our volunteer form on the Get Involved section of our website. We welcome volunteers with skills in facilitation, mentorship, counseling, data collection, communications, and more. Volunteers must be based in or willing to travel to Nairobi, Kenya.",
      },
    },
    {
      "@type": "Question",
      name: "What programs does BINTI Rising offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BINTI Rising offers four core programs: (1) Sexual & Reproductive Health Rights with 8 sessions covering body autonomy, consent, family planning, and more; (2) Mental Health & Wellbeing with 6 sessions on stress management and emotional resilience; (3) Financial Freedom & Literacy with 6 sessions on budgeting, saving, and entrepreneurship; (4) Women Empowerment & Leadership with 6 sessions on self-advocacy and community engagement. Total: 26 sessions over 6 months.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="KE-NBO" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
