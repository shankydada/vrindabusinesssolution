import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

const description =
  "Monthly plans for startups, growing businesses and enterprises. Every plan includes dedicated support, source code ownership and free onboarding.";

export const metadata: Metadata = {
  title: "Pricing",
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing", title: "Pricing", description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

const plans = [
  {
    name: "Startup",
    tagline: "For MVPs and early-stage teams",
    amount: "₹29,999",
    per: "per month, minimum 3 months",
    features: ["1 core product (CRM or web app)", "Up to 3 integrations", "Basic cloud hosting setup", "Email support, 48-hour response", "Monthly progress reports"],
    cta: "Start With Startup",
  },
  {
    name: "Growth",
    tagline: "For scaling businesses with bigger needs",
    amount: "₹74,999",
    per: "per month, minimum 6 months",
    features: ["CRM and ERP, or a custom platform", "Up to 15 integrations", "Workflow automation (10 workflows)", "Managed cloud hosting on AWS or Azure", "Priority support, 4-hour response", "Mobile app (iOS or Android)", "Weekly analytics reports"],
    cta: "Start With Growth",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "A full technology partner for large organisations",
    amount: "Custom",
    per: "Scoped to your requirements",
    features: ["Unlimited products and features", "Unlimited workflow automation", "AI agents and agentic AI development", "Dedicated team, on-site or remote", "24/7 support with SLA contract", "CTO-as-a-service and advisory", "Compliance and security audits"],
    cta: "Talk to Sales",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Plans for every business size</h1>
          <p className="lede">{description} No hidden charges.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap price-grid">
          {plans.map((p) => (
            <article className="price" key={p.name} data-featured={p.featured ?? false}>
              <h2 style={{ fontSize: "var(--step-2)" }}>{p.name}</h2>
              <p className="muted">{p.tagline}</p>
              <div>
                <div className="amount">{p.amount}</div>
                <p className="muted">{p.per}</p>
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href={`/contact?plan=${p.name.toLowerCase()}`} className={p.featured ? "btn btn-light" : "btn btn-primary"}>
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
