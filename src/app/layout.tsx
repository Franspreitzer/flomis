import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { AppStateProvider } from "@/components/layout/AppState";
import { Background, ScrollProgress } from "@/components/layout/Chrome";
import { ClientExtras } from "@/components/layout/ClientExtras";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { home, site } from "@/content";
import { localBusinessJsonLd, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], weight: ["500", "700"], variable: "--font-space-grotesk", display: "swap" });
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // samo oznake/labele — ne natječe se s LCP fontovima
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.meta.title, template: `%s | ${site.name}` },
  description: home.meta.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  keywords: [
    "izrada web stranica Osijek",
    "web agencija Osijek",
    "web dizajn Osijek",
    "izrada web stranica Slavonija",
    "Osječko-baranjska županija",
    "web shop izrada",
    "AI asistent za firme",
    "chatbot za firme",
    "hosting Hrvatska",
    "registracija domena",
    "održavanje web stranica",
    "digitalna agencija Osijek",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: home.meta.title,
    description: home.meta.description,
  },
  twitter: { card: "summary_large_image", title: home.meta.title, description: home.meta.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: site.url, languages: { "hr-HR": site.url }, types: { "application/rss+xml": `${site.url}/feed.xml` } },
  icons: { icon: "/icon", apple: "/apple-icon" },
};

export const viewport: Viewport = {
  themeColor: "#101827",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="bg-ink text-paper">
        <JsonLd data={[localBusinessJsonLd(), webSiteJsonLd()]} />
        <AppStateProvider>
          <MotionProvider>
          <SmoothScroll>
            <PageTransitionProvider>
              <Preloader />
              <Background />
              <ScrollProgress />
              <Header />
              <main id="sadrzaj" className="relative">
                {children}
              </main>
              <Footer />
              <ClientExtras />
            </PageTransitionProvider>
          </SmoothScroll>
          </MotionProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
