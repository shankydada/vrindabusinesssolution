import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ENQUIRY_RETENTION_MONTHS, LEGAL_UPDATED } from "@/lib/legal";
import { BEEWHAT_URL, site } from "@/lib/site";

const description = "How Vrinda Business Solution collects, uses and protects personal data on vrindabsolution.com and in the services we deliver.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy Policy", description },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated={LEGAL_UPDATED}
      intro={`${site.name} ("we", "us") builds and sets up business software and provides technology services. This policy explains what personal data we handle on vrindabsolution.com and in our client work, in line with India's Digital Personal Data Protection Act, 2023 (DPDP Act).`}
    >
      <section>
        <h2>Products with their own policy</h2>
        <p>
          BeeWhat and BeeMeet, including the BeeWhat Connect app used to link a WhatsApp Business number through
          Facebook, have their own Privacy Policy at{" "}
          <a className="text-link" href={`${BEEWHAT_URL}/privacy`}>
            {BEEWHAT_URL.replace("https://", "")}/privacy
          </a>
          . That policy applies when you use those products.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Enquiries:</strong> what you enter in our contact form (name, company, phone or WhatsApp number,
            email, the product you are interested in and your message), and what you send us by email, phone or
            WhatsApp.
          </li>
          <li>
            <strong>Website usage:</strong> pages viewed and page speed, measured in aggregate by Vercel Web Analytics
            and Speed Insights without cookies and without identifying you; and server logs with IP address and browser
            details, kept by our host for security.
          </li>
          <li>
            <strong>Client projects:</strong> when we build or set up software for a business, we may handle that
            business&apos;s records (such as its customers, staff, attendance or payroll) on its instructions. For that data
            the business is the Data Fiduciary and we act as its Data Processor under our agreement.
          </li>
        </ul>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To reply to your enquiry, arrange a demo and prepare a proposal.</li>
          <li>To deliver the services a client has engaged us for.</li>
          <li>To keep the website secure and prevent abuse of the contact form.</li>
          <li>To meet legal obligations, such as tax and accounting records.</li>
        </ul>
        <p>We do not sell personal data and do not use it for advertising.</p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>Only service providers we need to run the website and our work, under their terms:</p>
        <ul>
          <li>Vercel Inc. (vercel.com), which hosts this website and provides its privacy-friendly analytics.</li>
          <li>Resend (resend.com), which delivers contact form messages to our inbox.</li>
          <li>Meta Platforms (WhatsApp), when you choose to contact us on WhatsApp.</li>
          <li>Hosting and software providers a client has chosen for its project, as agreed with that client.</li>
        </ul>
        <p>We may disclose data if Indian law requires it.</p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>This website does not set cookies for tracking or advertising.</p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>
            Enquiries that do not lead to work are deleted within {ENQUIRY_RETENTION_MONTHS} months. If you become a
            client, we keep our correspondence for as long as the engagement and the law require.
          </li>
          <li>Client project data is returned or deleted when the engagement ends, as set out in the client agreement.</li>
          <li>Server logs are kept by our host for a limited period for security.</li>
        </ul>
        <p>
          How to ask for deletion is explained on our{" "}
          <Link className="text-link" href="/data-deletion">
            Data deletion
          </Link>{" "}
          page.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          The website is served only over HTTPS with modern browser security protections, the contact form accepts
          messages only from this website, and access to enquiries and client data is limited to the people who need it.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Under the DPDP Act you may ask to access, correct or erase your personal data, withdraw consent, nominate
          someone to act for you, and have grievances addressed. If we process your data for one of our clients,
          contact that business first; we will help it respond.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>This website and our services are meant for businesses and are not directed at children under 18.</p>
      </section>

      <section>
        <h2>Grievance Officer</h2>
        <p>
          Grievance Officer, {site.name}. Email:{" "}
          <a className="text-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . Phone and WhatsApp:{" "}
          <a className="text-link" href={`tel:${site.phoneE164}`}>
            {site.phone}
          </a>{" "}
          ({site.hours}). We respond within 7 days. If you are not satisfied, you may approach the Data Protection Board of
          India.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>We will post any updates to this policy on this page with a new date.</p>
      </section>
    </LegalPage>
  );
}
