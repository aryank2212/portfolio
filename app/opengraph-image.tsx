import { ImageResponse } from "next/og";
import { SITE } from "../lib/data";

export const dynamic = "force-static";
export const alt = `${SITE.name} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07080c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", zIndex: 10, alignItems: "flex-start", width: "100%" }}>
          <div style={{ display: "flex", color: "#22d3ee", fontFamily: "monospace", fontSize: 32, marginBottom: 24, letterSpacing: "0.2em" }}>
            {`// ${SITE.role.toUpperCase()}`}
          </div>
          <div style={{ display: "flex", color: "white", fontSize: 100, fontWeight: "bold", lineHeight: 1, letterSpacing: "-0.05em", marginBottom: 40 }}>
            {SITE.name}
          </div>
          <div style={{ display: "flex", color: "#94a3b8", fontSize: 40, maxWidth: "80%", lineHeight: 1.4 }}>
            Built for failure. Designed for scale.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
