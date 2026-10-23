import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const description =
  "Vrinda Business Solution is an India-based technology company that builds and sets up CRM, ERP, payroll, workflow automation and AI systems for growing businesses.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `About ${site.name}`, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const principles = [
  { title: "Business first", body: "Every project starts with your goals and how work moves today, not with a technical specification." },
  { title: "Small steps, shown often", body: "Short sprints and a working demo every week, so you see progress and can change direction early." },
  { title: "Secure by default", body: "Encrypted data, role-based access and audit logs are part of every build from the first day." },
  { title: "Built to grow", body: "Systems are designed so that adding users, branches or products does not mean starting again." },
  { title: "Yours to keep", body: "Your data is always yours, and custom code is handed over with documentation so you are never locked in." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>Systems that start from one root and grow with you</h1>
          <p className="lede">
            Our logo is a tree for a reason. We build business systems that start from one strong root, your customer,
            money and people data, and branch out as the business grows.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }} aria-labelledby="who-title">
        <div className="wrap split">
          <h2 id="who-title">Who we are</h2>
          <div className="prose lede">
            <p>
              {site.name} is a technology company based in India, working with clients across the country and
              worldwide. We help growing businesses replace spreadsheets, scattered apps and manual work with systems
              that fit how they actually operate.
            </p>
            <p>
              Our products cover sales (SMARA CRM, BeeWhat and VrindaCRM Pro), operations (ERP setup and the Payroll &
              Attendance System), and automation and AI (workflow automation, AI agents and agentic AI). Around them we
              provide cloud, security and technology consulting.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="wrap split">
          <h2 id="how-title">How we work</h2>
          <dl className="def-list">
            {principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactBand />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          { "@context": "https://schema.org", "@type": "AboutPage", name: `About ${site.name}`, description },
        ]}
      />
    </>
  );
}
