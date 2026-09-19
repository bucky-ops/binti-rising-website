import type { Metadata, Viewport } from "next";
import { Sora, Inter, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://binti-rising-initiative.vercel.app"),
  title: {
    default: "Binti Rising Initiative — From Silence, She Rises.",
    template: "%s | Binti Rising Initiative",
  },
  description:
    "Peer-led Journey to Wholeness (JTW) mentorship for 15-25 AGYW in Kibera, Mathare & Kawangware, Nairobi. Data-driven, audited, Kenya DPA 2019 compliant. 4,500+ alumni.",
  keywords: [
    "Binti Rising Initiative",
    "JTW Journey to Wholeness",
    "AGYW Nairobi",
    "SRH Kenya",
    "Kibera",
    "Mathare",
    "Kawangware",
    "peer-led mentorship",
    "GBV hotline 1195",
  ],
  authors: [{ name: "Binti Rising Initiative" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Binti Rising Initiative — From Silence, She Rises.",
    description:
      "Peer-led 8-session JTW mentorship for 15-25 AGYW in Nairobi informal settlements. Co-created by 50 youth. Live impact dashboard, audited finances.",
    url: "https://binti-rising-initiative.vercel.app",
    siteName: "Binti Rising Initiative",
    type: "website",
    locale: "en_KE",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Binti Rising Initiative — From Silence, She Rises." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binti Rising Initiative — From Silence, She Rises.",
    description:
      "Peer-led JTW mentorship for 15-25 AGYW in Nairobi. 4,500+ alumni. Live data. DPA 2019 compliant.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} ${caveat.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
