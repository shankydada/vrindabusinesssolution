import type { Metadata } from "next";
import { ContactBand } from "@/components/ContactBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OfferList } from "@/components/OfferList";
import { TreeHero } from "@/components/tree/TreeHero";
import { generalFaqs, industries, process, products, services } from "@/lib/catalog";
import { faqLd, itemListLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: `${site.name}: Business Software That Grows With You`, description: site.description },
};

const story = [
  { title: "A customer asks on WhatsApp", body: "BeeWhat records the enquiry as an order and sends a GST quote, right inside the chat." },
  { title: "An AI agent replies after hours", body: "It answers the price question from your catalogue and books a call with sales." },
  { title: "The order ships", body: "Your ERP updates stock and accounts, and workflow automation keeps the numbers in sync." },
  { title: "Month end arrives", body: "Payroll pays the salesperson's incentive from the same numbers, with attendance already in." },
];

export default function HomePage() {
  return (
    <>
      <TreeHero />

      <section className="section" id="products" aria-labelledby="products-title" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <div className="index-head">
            <h2 id="products-title">Products for every part of the business</h2>
            <p className="lede">
              Use one product to fix the problem in front of you, or connect several so customer, money and people data
              live in one place.
            </p>
          </div>
          <OfferList items={products} />
        </div>
      </section>

      <section className="section field" aria-labelledby="connect-title">
        <div className="wrap">
          <h2 id="connect-title" style={{ maxWidth: "18ch" }}>
            One enquiry, followed all the way through
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            The products are built to work together. Here is what happens to a single WhatsApp enquiry when they do.
          </p>
          <ol className="flow">
            {story.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="wrap split">
          <div>
            <h2 id="services-title">Services around the software</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              The infrastructure, security and advice that keep your systems running well.
            </p>
          </div>
          <OfferList items={services} />
        </div>
      </section>

      <section className="section" aria-labelledby="industries-title" style={{ background: "var(--surface)" }}>
        <div className="wrap split">
          <h2 id="industries-title">Industries we work with</h2>
          <dl className="def-list">
            {industries.map((i) => (
              <div key={i.name}>
                <dt>{i.name}</dt>
                <dd>{i.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="wrap split">
          <div>
            <h2 id="process-title">How a project runs</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              The same five stages for every project, so you always know what happens next.
            </p>
          </div>
          <ol className="steps">
            {process.map((p) => (
              <li key={p.title}>
                <div>
                  <strong>{p.title}</strong>
                  <span className="muted">{p.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title" style={{ background: "var(--surface)" }}>
        <div className="wrap split">
          <h2 id="faq-title">Questions businesses ask us</h2>
          <Faq items={generalFaqs} />
        </div>
      </section>

      <ContactBand />

      <JsonLd data={[itemListLd("Products by Vrinda Business Solution", products), faqLd(generalFaqs)]} />
    </>
  );
}
