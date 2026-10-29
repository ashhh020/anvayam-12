import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const emblem = await readFile(join(process.cwd(), "public/brand/logo-emblem.png"));
  const emblemSrc = `data:image/png;base64,${emblem.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 56,
          padding: "72px 80px",
          background: "#FAF8F2",
          color: "#285E2A",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 5, color: "#8A4D19" }}>
          <div style={{ width: 48, height: 2, background: "#A35F22" }} />
          A TRAVELLING, COLLABORATIVE WELLBEING INITIATIVE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: 6 }}>ANVAYAM</div>
          <div style={{ fontSize: 40, lineHeight: 1.2, letterSpacing: 18, marginTop: 8 }}>VAIDYA SALA</div>
          <div style={{ marginTop: 28, fontSize: 44, fontStyle: "italic", color: "#292D29" }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5a605a" }}>
          {siteConfig.guidingThought} — {siteConfig.guidingThoughtMeaning}
        </div>
        </div>
        <img src={emblemSrc} width={380} height={360} alt="" style={{ objectFit: "contain" }} />
      </div>
    ),
    size,
  );
}
