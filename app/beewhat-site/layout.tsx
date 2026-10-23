import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/MotionProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BEEWHAT_URL, SITE_URL, site } from "@/lib/site";
import "./beewhat.css";

const description =
  "BeeWhat saves every WhatsApp message to your CRM automatically. Contacts, chat history and follow-ups are recorded with zero manual data entry.";

export const metadata: Metadata = {
  metadataBase: new URL(BEEWHAT_URL),
  title: {
    absolute: "BeeWhat: Zero-Touch WhatsApp CRM, Every Chat Saved Automatically",
    template: "%s | BeeWhat",
  },
  description,
  applicationName: "BeeWhat",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: "BeeWhat by Vrinda Business Solution", url: "/" },
  twitter: { card: "summary_large_image" },
  // The subdomain needs its own token when it is a separate URL-prefix property in Search Console.
  verification: { google: process.env.NEXT_PUBLIC_BEEWHAT_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: "#fbfaf6" };

export default function BeeWhatLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <div className="bw">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header bw-header">
          <div className="wrap">
            <a href="/" className="brand" aria-label="BeeWhat, home">
              <span className="bw-mark" aria-hidden="true">
                B
              </span>
              <span>BeeWhat</span>
            </a>
            <nav className="nav" aria-label="Main" style={{ display: "flex" }}>
              <a href="#how" className="bw-hide-sm">
                How It Works
              </a>
              <a href="#faq" className="bw-hide-sm">
                FAQ
              </a>
              <a href={`${SITE_URL}/contact?interest=beewhat`} className="btn">
                Book a Demo
              </a>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer" style={{ background: "#fff" }}>
          <div className="wrap footer-bar" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
            <span>
              BeeWhat is a product of <a href={SITE_URL}>{site.name}</a>
            </span>
            <span>
              <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
            </span>
          </div>
        </footer>
        <WhatsAppButton text="Hi, I'd like a demo of BeeWhat." />
      </div>
    </MotionProvider>
  );
}
