import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { guides } from "@/lib/guides";
import { breadcrumbLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const title = "Guides: CRM, WhatsApp CRM, ERP, Payroll, Automation & AI";
const description =
  "Practical guides for growing businesses: saving WhatsApp chats to a CRM, choosing a CRM, moving from Tally to an ERP, payroll compliance, workflow automation and AI agents.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/guides" },
  openGraph: { url: "/guides", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
];

export default function GuidesPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Guides for running a growing business</h1>
          <p className="lede">Plain answers to the questions owners and managers ask us most, with no jargon.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="cells" style={{ "--cols": 2 } as React.CSSProperties}>
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="cell-link">
                <h2 style={{ fontSize: "var(--step-2)", marginBottom: "0.6rem" }}>{g.title}</h2>
                <p>{g.description}</p>
                <span className="cell-go">Read the guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description,
            url: absoluteUrl("/guides"),
            hasPart: guides.map((g) => ({ "@type": "Article", headline: g.title, url: absoluteUrl(`/guides/${g.slug}`) })),
          },
        ]}
      />
    </>
  );
}
