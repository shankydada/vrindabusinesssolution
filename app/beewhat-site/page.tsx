import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getOffering } from "@/lib/catalog";
import { ORG_ID, faqLd, organizationLd } from "@/lib/jsonld";
import { BEEWHAT_URL, SITE_URL, whatsappLink } from "@/lib/site";
import { ChatToCrm } from "./ChatToCrm";

const beewhat = getOffering("beewhat")!;

const problems = [
  { title: "Chats live on personal phones", body: "Customer history sits in a salesperson's WhatsApp, not in your business." },
  { title: "Nobody updates the CRM", body: "Copying chats into the CRM is the first job skipped on a busy day." },
  { title: "Leads leave with your staff", body: "When someone changes roles or leaves, their conversations go with them." },
];

const faqs = [
  ...beewhat.faqs,
  { q: "Do my salespeople need to change how they use WhatsApp?", a: "No. They keep chatting with customers as they do today. BeeWhat records the conversations in the background." },
  { q: "Can managers see every conversation?", a: "Yes. Managers and owners can see the chat history on each contact in the CRM, based on the access you set." },
];

export default function BeeWhatHome() {
  return (
    <>
      <section className="bw-hero">
        <div className="wrap bw-hero-grid">
          <div>
            <h1>{beewhat.h1}</h1>
            <p className="lede" style={{ marginTop: "1.4rem" }}>
              {beewhat.intro}
            </p>
            <div className="hero-actions">
              <a href={`${SITE_URL}/contact?interest=beewhat`} className="btn btn-primary">
                Book a BeeWhat Demo
              </a>
              <a href={whatsappLink("Hi, I'd like a demo of BeeWhat.")} className="btn btn-honey" target="_blank" rel="noopener">
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <ChatToCrm />
        </div>
      </section>

      <section className="section bw-field" aria-labelledby="problem-title">
        <div className="wrap">
          <h2 id="problem-title" style={{ maxWidth: "20ch" }}>
            Where WhatsApp leads go missing
          </h2>
          <ul className="bw-problems">
            {problems.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                <span className="muted">{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="how" aria-labelledby="how-title">
        <div className="wrap split">
          <h2 id="how-title">How BeeWhat works</h2>
          <ol className="steps">
            {beewhat.steps.map((s) => (
              <li key={s}>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title" style={{ background: "#fff" }}>
        <div className="wrap split">
          <h2 id="features-title">What BeeWhat does</h2>
          <dl className="def-list">
            {beewhat.features.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="for-title">
        <div className="wrap split">
          <h2 id="for-title">Who BeeWhat is for</h2>
          <ul className="audience lede" style={{ marginTop: 0 }}>
            {beewhat.audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title" style={{ background: "#fff" }}>
        <div className="wrap split">
          <h2 id="faq-title">BeeWhat questions</h2>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section bw-field" aria-labelledby="cta-title">
        <div className="wrap">
          <h2 id="cta-title" style={{ maxWidth: "18ch", color: "#fff" }}>
            Stop losing customer history to personal phones
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            See BeeWhat working with your own WhatsApp number in a free demo. BeeWhat pairs with{" "}
            <a href={`${SITE_URL}/products/smara-crm`} style={{ color: "#fff" }}>
              SMARA CRM
            </a>{" "}
            from Vrinda Business Solution.
          </p>
          <div className="hero-actions">
            <a href={`${SITE_URL}/contact?interest=beewhat`} className="btn btn-honey">
              Book a BeeWhat Demo
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${BEEWHAT_URL}/#software`,
            name: "BeeWhat",
            alternateName: "BeeWhat WhatsApp CRM",
            url: BEEWHAT_URL,
            description: beewhat.seoDescription,
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "WhatsApp CRM",
            operatingSystem: "Web",
            featureList: beewhat.features.map((f) => f.title),
            keywords: beewhat.keywords.join(", "),
            publisher: { "@id": ORG_ID },
          },
          organizationLd(),
          faqLd(faqs),
        ]}
      />
    </>
  );
}
