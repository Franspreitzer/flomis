import type { Metadata } from "next";
import { services, site } from "@/content";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: readonly string[];
};

export function buildMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, keywords }: MetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    // Naslovi u contentu već sadrže "| Flomis" — ne primjenjuj template iz layouta.
    title: { absolute: title },
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical: url, languages: { "hr-HR": url, "x-default": url } },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(type === "article" && publishedTime ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [site.name] } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const BLOG_ID = `${site.url}/blog#blog`;

const areaServed = () => [
  ...site.serviceArea.map((name) => ({ "@type": "City", name })),
  ...site.regions.map((name) => ({ "@type": "AdministrativeArea", name })),
  { "@type": "Country", name: "Hrvatska" },
];

/** Glavna schema: LocalBusiness + ProfessionalService s katalogom usluga i cijenama. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: ["Flomis Osijek", "FLOMIS", "flomis.hr", "www.flomis.hr"],
    legalName: site.legalName,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/logo/logo-dark.svg`, width: 512, height: 512 },
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: "Web koji radi za tvoju firmu.",
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    foundingDate: site.founded,
    foundingLocation: {
      "@type": "Place",
      name: site.contact.address.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contact.address.city,
        addressRegion: site.region,
        addressCountry: site.contact.address.countryCode,
      },
    },
    vatID: `HR${site.oib}`,
    taxID: site.oib,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      postalCode: site.contact.address.zip,
      addressLocality: site.contact.address.city,
      addressRegion: site.region,
      addressCountry: site.contact.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city}`)}`,
    areaServed: areaServed(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contact.phoneHref.replace("tel:", ""),
        email: site.contact.email,
        contactType: "sales",
        availableLanguage: ["hr", "en"],
        areaServed: "HR",
      },
    ],
    sameAs: site.social.map((s) => s.href).filter((h) => !h.includes("[")),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bankovni prijenos, kartica",
    knowsAbout: [
      "Izrada web stranica",
      "Izrada web shopa",
      "Web shop",
      "AI chatbot za firme",
      "AI asistent",
      "SEO",
      "Lokalni SEO",
      "Google Business Profil",
      "Core Web Vitals",
      "Hosting",
      "Održavanje web stranica",
      "Next.js",
      "Shopify Hrvatska",
      "WordPress",
    ],
    // Rating se ispisuje tek kad recenzije postoje i vidljive su na stranici.
    ...(site.reviews.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.reviews.average,
            reviewCount: site.reviews.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/usluge/${s.slug}`, description: s.short },
        ...(/^\d/.test(s.priceFrom)
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: s.priceFrom.replace(/[^\d.,]/g, "").replace(".", "").replace(",", "."),
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
              },
            }
          : {}),
      })),
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    alternateName: ["FLOMIS", "Flomis Osijek", "www.flomis.hr"],
    description: site.description,
    inLanguage: "hr",
    publisher: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
    copyrightHolder: { "@id": ORG_ID },
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

/**
 * WebPage čvor koji stranicu veže uz WebSite i uz firmu.
 * Zahvaljujući njemu AI asistenti znaju da svi ti URL-ovi opisuju istu firmu.
 */
export function webPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  dateModified?: string;
}) {
  const url = `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "hr",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string; type?: string; priceFrom?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.type ?? input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}/kontakt`,
      availableLanguage: ["hr"],
    },
    ...(input.priceFrom && /^\d/.test(input.priceFrom)
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: input.priceFrom.replace(/[^\d.,]/g, "").replace(".", "").replace(",", "."),
            priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", valueAddedTaxIncluded: false },
            availability: "https://schema.org/InStock",
            url: `${site.url}/kontakt`,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

/** `path` je opcionalan: kad ga zadaš, FAQ se veže uz WebPage čvor te stranice. */
export function faqJsonLd(items: readonly { q: string; a: string }[], path?: string) {
  const url = path ? `${site.url}${path}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(url ? { "@id": `${url}#faq`, url, isPartOf: { "@id": `${url}#webpage` } } : {}),
    inLanguage: "hr",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Studija slučaja / projekt — CreativeWork s poveznicom na izrađenu stranicu. */
export function caseStudyJsonLd(p: {
  slug: string;
  title: string;
  description: string;
  year: string;
  image: string;
  services: readonly string[];
  clientUrl?: string;
  modified?: string;
}) {
  const url = `${site.url}/radovi/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: p.title,
    headline: p.title,
    description: p.description,
    url,
    image: `${site.url}${p.image}`,
    inLanguage: "hr",
    dateCreated: p.year,
    dateModified: p.modified ?? p.year,
    genre: "Web design",
    keywords: p.services.join(", "),
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    ...(p.clientUrl ? { sameAs: [p.clientUrl], mainEntityOfPage: url } : {}),
  };
}

export function blogPostingJsonLd(p: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  keywords?: string[];
  wordCount?: number;
  category?: string;
  readingMinutes?: number;
}) {
  const url = `${site.url}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: p.title,
    description: p.description,
    inLanguage: "hr",
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    image: p.image ?? `${site.url}/blog/${p.slug}/opengraph-image`,
    author: { "@type": "Organization", name: site.name, url: site.url, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@type": "Blog", "@id": BLOG_ID },
    ...(p.category ? { articleSection: p.category } : {}),
    ...(p.readingMinutes ? { timeRequired: `PT${p.readingMinutes}M` } : {}),
    ...(p.keywords ? { keywords: p.keywords.join(", ") } : {}),
    ...(p.wordCount ? { wordCount: p.wordCount } : {}),
  };
}
