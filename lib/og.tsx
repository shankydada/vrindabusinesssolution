import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: brand colours, product name large, one supporting line. */
export function ogImage({ title, subtitle, brand = "Vrinda Business Solution", accent = "#1d72b2" }: {
  title: string;
  subtitle: string;
  brand?: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e2a3b",
          color: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, color: "#a9c3cf" }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: accent }} />
          {brand}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 32, color: "#cfe0e7", lineHeight: 1.35, maxWidth: 980 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%", background: `linear-gradient(90deg, #2a86cf, #2b8e7d)`, borderRadius: 999 }} />
      </div>
    ),
    ogSize,
  );
}
