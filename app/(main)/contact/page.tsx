import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { site, whatsappLink } from "@/lib/site";

const description =
  "Book a free demo of SMARA CRM, BeeWhat, ERP setup, payroll, workflow automation or AI agents. Call, WhatsApp or email Vrinda Business Solution.";

export const metadata: Metadata = {
  title: "Contact & Free Demo",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact ${site.name}`, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Book a free demo</h1>
          <p className="lede">
            Tell us how you work today. We will reply with a suggested starting point and a time for a 30-minute demo,
            with no commitment.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split contact-split">
          <div className="panel">
            <ContactForm />
          </div>
          <dl className="contact-details">
            <div>
              <dt>Phone and WhatsApp</dt>
              <dd>
                <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
              </dd>
              <dd style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                <a className="text-link" href={whatsappLink()} target="_blank" rel="noopener">
                  Open WhatsApp chat
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>India, working with clients worldwide</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </div>
      </section>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          { "@context": "https://schema.org", "@type": "ContactPage", name: `Contact ${site.name}`, description },
        ]}
      />
    </>
  );
}
