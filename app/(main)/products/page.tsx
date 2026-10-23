import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { OfferList } from "@/components/OfferList";
import { products } from "@/lib/catalog";
import { breadcrumbLd, itemListLd } from "@/lib/jsonld";

const title = "Products: CRM, WhatsApp CRM, ERP, Payroll, Automation & AI";
const description =
  "Compare products from Vrinda Business Solution: SMARA CRM, BeeWhat for WhatsApp orders and invoices, ERP setup, payroll & attendance, workflow automation, AI agents, agentic AI and VrindaCRM Pro.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/products" },
  openGraph: { url: "/products", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const guide = [
  { need: "Orders and payments get lost in WhatsApp chats", pick: "BeeWhat" },
  { need: "Sales follow-ups depend on memory", pick: "SMARA CRM" },
  { need: "Sales process no CRM can model", pick: "VrindaCRM Pro" },
  { need: "Stock, invoices and accounts do not agree", pick: "ERP Setup" },
  { need: "Salary sheet rebuilt every month", pick: "Payroll & Attendance System" },
  { need: "Staff copy data between apps", pick: "Workflow Automation" },
  { need: "Same questions answered all day", pick: "AI Agents" },
  { need: "Multi-step processes across systems", pick: "Agentic AI" },
];

export default function ProductsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Products for sales, money, people and AI</h1>
          <p className="lede">
            Each product solves one problem well and connects to the others, so you can start small and grow into a
            single connected system.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <OfferList items={products} headingLevel={2} />
        </div>
      </section>
      <section className="section" aria-labelledby="guide-title" style={{ background: "var(--surface)" }}>
        <div className="wrap split">
          <h2 id="guide-title">Which product fits your problem</h2>
          <div className="fragment" style={{ padding: 0, boxShadow: "none" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">If this sounds familiar</th>
                  <th scope="col">Start with</th>
                </tr>
              </thead>
              <tbody>
                {guide.map((g) => (
                  <tr key={g.need}>
                    <td>{g.need}</td>
                    <td style={{ fontWeight: 600 }}>{g.pick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ContactBand />
      <JsonLd data={[itemListLd("Products by Vrinda Business Solution", products), breadcrumbLd(crumbs)]} />
    </>
  );
}
