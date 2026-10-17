import type { MetadataRoute } from "next";
import { ORG } from "@/lib/data/organization";

/**
 * PWA manifest (spec 5.5) - replaces the static public/manifest.json so it
 * always reflects the canonical organisation data.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORG.legalName,
    short_name: "BINTI Rising",
    description: ORG.description,
    start_url: "/",
    display: "standalone",
    lang: "en-KE",
    background_color: "#FFFFFF",
    theme_color: "#E91E63",
    categories: ["nonprofit", "charity", "education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
