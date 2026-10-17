import { ImageResponse } from "next/og";
import { ORG } from "@/lib/data/organization";

export const alt = `${ORG.legalName} - Empowering young women in Nairobi, Kenya`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded OG/Twitter card (spec 5.4) - 1200x630. Shares on WhatsApp and X
 * are the primary discovery surface for Kenyan NGOs; a text card beats the
 * square logo that was previously used for OG.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FCE4EC 0%, #F3E5F5 55%, #FFFFFF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              background: "linear-gradient(135deg, #E91E63, #9C27B0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span style={{ fontSize: 34, fontWeight: 800, color: "#1B2A4A", letterSpacing: 1 }}>
              BINTI RISING
            </span>
            <span style={{ fontSize: 20, color: "#9C27B0", letterSpacing: 4 }}>
              INITIATIVE
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              color: "#1B2A4A",
              lineHeight: 1.15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Empowering young women</span>
            <span>
              in Nairobi through{" "}
              <span style={{ color: "#E91E63" }}>SRHR</span>,{" "}
              <span style={{ color: "#9C27B0" }}>mental health</span>,
            </span>
            <span>
              <span style={{ color: "#008080" }}>financial literacy</span> &amp;{" "}
              <span style={{ color: "#D4A017" }}>leadership</span>
            </span>
          </div>
          <div style={{ fontSize: 26, color: "#1B2A4A99" }}>
            Registered CBO &middot; Free programs for ages 15-25 &middot; bintirising.org
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["SRHR", "Mental Health", "Financial Freedom", "Leadership"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                background: "white",
                border: "2px solid #E91E6333",
                color: "#1B2A4A",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
