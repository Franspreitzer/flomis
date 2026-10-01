import { press } from "@/content";
import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Press kit", `${press.label} · Flomis Osijek`);
}
