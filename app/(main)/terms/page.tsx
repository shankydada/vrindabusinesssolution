import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_UPDATED } from "@/lib/legal";
import { BEEWHAT_URL, site } from "@/lib/site";

const description = "The terms for using vrindabsolution.com, the website of Vrinda Business Solution.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Terms of Use", description },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated={LEGAL_UPDATED}
      intro={`These terms apply to your use of vrindabsolution.com, the website of ${site.name}. By using the website you agree to them.`}
    >
      <section>
        <h2>Information on this website</h2>
        <p>
          Descriptions of our products and services, including features and prices, are for general information and can
          change. They are not an offer. The scope, price, taxes and timelines of any work are set out in a written
          proposal or agreement, which takes precedence over this website.
        </p>
        <p>
          Our guides are general information, not legal, tax, payroll or financial advice. Check rates and rules that
          apply to you with the relevant authority or a qualified adviser.
        </p>
      </section>

      <section>
        <h2>Our products</h2>
        <p>
          BeeWhat and BeeMeet are provided under their own Terms at{" "}
          <a className="text-link" href={`${BEEWHAT_URL}/terms`}>
            {BEEWHAT_URL.replace("https://", "")}/terms
          </a>
          . Other products and services are provided under the agreement you sign with us.
        </p>
      </section>

      <section>
        <h2>Using the website</h2>
        <ul>
          <li>Do not try to break, overload or gain unauthorised access to the website or its systems.</li>
          <li>Do not use the contact form to send spam, misleading information or someone else&apos;s details without permission.</li>
          <li>Do not copy the website in a way that harms it or presents our work as your own.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The website&apos;s content, design and logo, and the names SMARA CRM, BeeWhat, BeeMeet and VrindaCRM Pro, belong to{" "}
          {site.name}. You may quote or share our guides with a link back to the original page.
        </p>
      </section>

      <section>
        <h2>Links to other websites</h2>
        <p>
          The website links to services such as WhatsApp, LinkedIn and YouTube. Their own terms and privacy policies apply
          when you use them.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          The website is provided as it is. To the extent the law allows, we are not liable for indirect losses arising
          from use of the website or reliance on its general information. Nothing in these terms limits rights you have
          under Indian law.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          How we handle personal data is explained in our{" "}
          <Link className="text-link" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts in India.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <a className="text-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          ·{" "}
          <a className="text-link" href={`tel:${site.phoneE164}`}>
            {site.phone}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
