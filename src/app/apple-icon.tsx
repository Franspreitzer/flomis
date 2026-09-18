import { ImageResponse } from "next/og";
import { PAREN_CLOSE_PATH, PAREN_OPEN_PATH, PARENS_VIEWBOX } from "@/components/brand/logo-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#101827" }}>
        <svg viewBox={PARENS_VIEWBOX} width="120" height="104" fill="#C9D600">
          <path d={PAREN_OPEN_PATH} />
          <path d={PAREN_CLOSE_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
