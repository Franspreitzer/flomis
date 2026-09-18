import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Blog članci se čitaju s diska (src/content/blog) — osiguraj da su uključeni u deploy.
  outputFileTracingIncludes: { "/blog/**": ["./src/content/blog/**"], "/feed.xml": ["./src/content/blog/**"], "/sitemap.xml": ["./src/content/blog/**"] },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

export default nextConfig;
