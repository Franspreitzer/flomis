import { ImageResponse } from "next/og";
import { PAREN_CLOSE_D, PAREN_OPEN_D, PARENS_VIEWBOX } from "@/components/brand/Parens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#101827" }}>
        <svg viewBox={PARENS_VIEWBOX} width="120" height="104" fill="none" stroke="#C9D600" strokeWidth="8" strokeLinecap="round">
          <path d={PAREN_OPEN_D} />
          <path d={PAREN_CLOSE_D} />
        </svg>
      </div>
    ),
    size,
  );
}
