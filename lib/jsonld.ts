import type { Faq, Offering } from "./catalog";
import { offeringHref } from "./catalog";
import { SITE_URL, absoluteUrl, site } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.alternateNames,
    url: SITE_URL,
    logo: absoluteUrl("/logo-full.png"),
    description: site.description,
    email: site.email,
    telephone: site.phoneE164,
    address: { "@type": "PostalAddress", addressCountry: site.countryCode },
    areaServed: [{ "@type": "Country", name: site.country }, "Worldwide"],
    sameAs: [site.social.linkedin, site.social.youtube],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      email: site.email,
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
      areaServed: site.countryCode,
    },
    knowsAbout: [
      "CRM software",
      "WhatsApp CRM",
      "ERP implementation",
      "Payroll software",
      "Attendance management",
      "Workflow automation",
      "n8n",
      "AI agents",
      "Agentic AI",
      "Cloud infrastructure",
      "Cybersecurity",
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function offeringLd(o: Offering) {
  const href = offeringHref(o);
  const url = href.startsWith("http") ? href : absoluteUrl(href);
  if (o.schemaType === "SoftwareApplication") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: o.name,
      url,
      description: o.seoDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      featureList: o.features.map((f) => f.title),
      keywords: o.keywords.join(", "),
      publisher: { "@id": ORG_ID },
      provider: { "@id": ORG_ID },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: o.name,
    serviceType: o.name,
    url,
    description: o.seoDescription,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "Country", name: site.country }, "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: o.name,
      itemListElement: o.features.map((f) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: f.title, description: f.body },
      })),
    },
  };
}

export function itemListLd(name: string, items: Offering[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((o, i) => {
      const href = offeringHref(o);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: o.name,
        url: href.startsWith("http") ? href : absoluteUrl(href),
      };
    }),
  };
}
