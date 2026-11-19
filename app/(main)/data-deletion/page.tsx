import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ENQUIRY_RETENTION_MONTHS, LEGAL_UPDATED } from "@/lib/legal";
import { BEEWHAT_URL, site, whatsappLink } from "@/lib/site";

const description = "How to have your personal data deleted by Vrinda Business Solution, including data from BeeWhat and Facebook Login.";

export const metadata: Metadata = {
  title: "Data Deletion",
  description,
  alternates: { canonical: "/data-deletion" },
  openGraph: { url: "/data-deletion", title: "Data Deletion", description },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Deleting your data"
      path="/data-deletion"
      updated={LEGAL_UPDATED}
      intro={`This page explains how to have your personal data deleted by ${site.name}.`}
    >
      <section>
        <h2>BeeWhat, BeeMeet and Facebook Login</h2>
        <p>
          If you connected a WhatsApp Business number to BeeWhat through Facebook (the BeeWhat Connect app), or use
          BeeWhat or BeeMeet, follow the steps on{" "}
          <a className="text-link" href={`${BEEWHAT_URL}/data-deletion`}>
            {BEEWHAT_URL.replace("https://", "")}/data-deletion
          </a>
          . In short: remove BeeWhat Connect from Facebook (Settings &amp; privacy → Settings → Business integrations), then ask us
          to delete what we hold as described below.
        </p>
      </section>

      <section>
        <h2>Enquiries and conversations with us</h2>
        <ol>
          <li>
            Email{" "}
            <a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent("Delete my data")}`}>
              {site.email}
            </a>{" "}
            or{" "}
            <a className="text-link" href={whatsappLink("Please delete my data.")} target="_blank" rel="noopener">
              WhatsApp {site.phone}
            </a>{" "}
            with the subject &quot;Delete my data&quot;.
          </li>
          <li>Write from the email address or number you used to contact us, so we know the request is yours.</li>
          <li>We confirm within 7 days and delete your data within 30 days.</li>
        </ol>
        <p>Enquiries that do not lead to work are deleted automatically within {ENQUIRY_RETENTION_MONTHS} months.</p>
      </section>

      <section>
        <h2>Clients</h2>
        <p>
          Data we handle for a client project is returned or deleted when the engagement ends, as set out in the client
          agreement. To ask earlier, write to us as above. Records the law requires us to keep, such as tax invoices, are
          kept for the period the law sets.
        </p>
      </section>

      <section>
        <h2>Website analytics</h2>
        <p>Our website analytics are aggregate and cookieless and do not identify you, so there is no personal data to delete.</p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          {site.email} · {site.phone} ({site.hours}). See also our{" "}
          <Link className="text-link" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </LegalPage>
  );
}
