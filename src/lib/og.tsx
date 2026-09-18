import { ImageResponse } from "next/og";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/components/brand/logo-paths";
import { site } from "@/content";

export const OG_SIZE = { width: 1200, height: 630 };

/** Zajednički OG generator: crna pozadina, logo, naslov, akcent. */
export function ogImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101827",
          color: "#F5F5F2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <svg viewBox={LOGO_VIEWBOX} width="260" height="32" fill="#F5F5F2">
            <path fillRule="evenodd" d={LOGO_PATH} />
          </svg>
          <div style={{ display: "flex", fontSize: 22, color: "#C9D600", letterSpacing: 4 }}>( {site.tagline.toUpperCase()} )</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 60 : 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 28, color: "#A8B0B8", maxWidth: 900, lineHeight: 1.35 }}>{subtitle}</div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#77818A" }}>
          <div style={{ display: "flex" }}>{site.url.replace(/^https?:\/\//, "")}</div>
          <div style={{ display: "flex" }}>{site.contact.address.city}, Hrvatska</div>
        </div>
        <div style={{ position: "absolute", right: -120, bottom: -160, width: 520, height: 520, borderRadius: 9999, background: "radial-gradient(circle, rgba(201,214,0,0.35), rgba(201,214,0,0) 70%)" }} />
      </div>
    ),
    OG_SIZE,
  );
}
