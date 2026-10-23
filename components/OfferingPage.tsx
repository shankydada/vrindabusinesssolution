import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { Faq } from "@/components/Faq";
import { Fragment, hasFragment } from "@/components/Fragments";
import { JsonLd } from "@/components/JsonLd";
import { OfferList } from "@/components/OfferList";
import type { Offering } from "@/lib/catalog";
import { getOffering } from "@/lib/catalog";
import { breadcrumbLd, faqLd, offeringLd } from "@/lib/jsonld";
import { whatsappLink } from "@/lib/site";

export function OfferingPage({ offering: o }: { offering: Offering }) {
  const section = o.kind === "product" ? { name: "Products", path: "/products" } : { name: "Services", path: "/services" };
  const path = `${section.path}/${o.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, section, { name: o.name, path }];
  const related = o.related.map(getOffering).filter((r): r is Offering => !!r);
  const showFragment = hasFragment(o.slug);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className={showFragment ? "split" : undefined} style={{ alignItems: "center" }}>
            <div>
              <h1>{o.h1}</h1>
              <p className="lede">{o.intro}</p>
              <div className="hero-actions">
                <Link href={`/contact?interest=${o.slug}`} className="btn btn-primary">
                  Book a {o.short} Demo
                </Link>
                <a
                  href={whatsappLink(`Hi, I'd like to know more about ${o.name}.`)}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
            {showFragment && <Fragment slug={o.slug} />}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="for-title" style={{ background: "var(--surface)" }}>
        <div className="wrap split">
          <div>
            <h2 id="for-title">Who {o.name} is for</h2>
          </div>
          <ul className="audience lede" style={{ marginTop: 0 }}>
            {o.audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="wrap split">
          <h2 id="features-title">What {o.name} does</h2>
          <dl className="def-list">
            {o.features.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section field" aria-labelledby="steps-title">
        <div className="wrap split">
          <div>
            <h2 id="steps-title">How we set it up</h2>
          </div>
          <div>
            <ol className="steps" style={{ color: "var(--field-ink)" }}>
              {o.steps.map((s) => (
                <li key={s} style={{ borderColor: "rgba(255,255,255,.16)" }}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <h3 style={{ marginTop: "2.5rem", color: "#fff" }}>Works with</h3>
            <ul className="chips">
              {o.connects.map((c) => (
                <li key={c} style={{ background: "rgba(255,255,255,.1)", color: "var(--field-ink)" }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title" style={{ background: "var(--surface)" }}>
        <div className="wrap split">
          <h2 id="faq-title">{o.name} questions</h2>
          <Faq items={o.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" style={{ marginBottom: "2rem" }}>
              Often used with {o.name}
            </h2>
            <OfferList items={related} />
          </div>
        </section>
      )}

      <ContactBand
        title={`See ${o.name} with your own data`}
        text={`Book a free demo and we will show you how ${o.name} fits the way your business works today.`}
        whatsappText={`Hi, I'd like a demo of ${o.name}.`}
      />

      <JsonLd data={[offeringLd(o), breadcrumbLd(crumbs), faqLd(o.faqs)]} />
    </>
  );
}
