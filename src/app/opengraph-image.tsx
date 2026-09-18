import { ogImage, OG_SIZE } from "@/lib/og";
import { site } from "@/content";

export const alt = site.description;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Izrada web stranica, web shopova i AI asistenata — Osijek", "Digitalna agencija za Osijek, Slavoniju i Baranju");
}
