import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#FAF8F2",
          color: "#244B3A",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 6, color: "#94553A" }}>
          <div style={{ width: 48, height: 2, background: "#B87557" }} />
          A TRAVELLING, COLLABORATIVE WELLBEING INITIATIVE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1 }}>Anvayam</div>
          <div style={{ fontSize: 112, lineHeight: 1, color: "#94553A" }}>Vaidya Sala</div>
          <div style={{ marginTop: 28, fontSize: 44, fontStyle: "italic", color: "#292D29" }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5a605a" }}>
          {siteConfig.guidingThought} — {siteConfig.guidingThoughtMeaning}
        </div>
      </div>
    ),
    size,
  );
}
