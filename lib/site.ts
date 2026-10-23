export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vrindabsolution.com").replace(/\/$/, "");
export const BEEWHAT_URL = (process.env.NEXT_PUBLIC_BEEWHAT_URL ?? "https://beewhat.vrindabsolution.com").replace(/\/$/, "");

export const site = {
  name: "Vrinda Business Solution",
  legalName: "Vrinda Business Solution",
  alternateNames: ["VrindaBusinessSolutions", "Vrinda Business Solutions", "VBS"],
  tagline: "CRM, ERP, payroll, workflow automation and AI agents for growing businesses",
  description:
    "Vrinda Business Solution builds and sets up business software for growing companies in India: SMARA CRM, BeeWhat for WhatsApp orders and invoices, ERP setup, payroll & attendance, workflow automation, AI agents and agentic AI.",
  email: "contact@vrindabsolution.com",
  phone: "+91 88829 84274",
  phoneE164: "+918882984274",
  whatsapp: "918882984274",
  country: "India",
  countryCode: "IN",
  hours: "Monday to Saturday, 9:00 AM to 7:00 PM IST",
  social: {
    linkedin: "https://www.linkedin.com/company/vrindabusinesssolutions",
    youtube: "https://www.youtube.com/@VrindaBusinessSolutions",
  },
  // Add each listing's URL as it goes live (Google Business Profile, Clutch, GoodFirms, G2, Capterra,
  // IndiaMART, JustDial). They are published as sameAs links, which tie your profiles to one business.
  profiles: [] as string[],
} as const;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
