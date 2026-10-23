import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { OfferList } from "@/components/OfferList";
import { services } from "@/lib/catalog";
import { breadcrumbLd, itemListLd } from "@/lib/jsonld";

const title = "Services: Cloud & DevOps, Cybersecurity, Tech Consultancy";
const description =
  "Cloud infrastructure and DevOps, VAPT and security audits, and technology consultancy with CTO-as-a-service, from Vrinda Business Solution.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Services that keep your systems running</h1>
          <p className="lede">
            Cloud, security and advice for the software you run, whether we built it or not.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <OfferList items={services} headingLevel={2} />
        </div>
      </section>
      <ContactBand />
      <JsonLd data={[itemListLd("Services by Vrinda Business Solution", services), breadcrumbLd(crumbs)]} />
    </>
  );
}
