import Link from "next/link";
import { offeringHref, products, services } from "@/lib/catalog";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 650, fontSize: "1.15rem" }}>{site.name}</p>
            <p className="muted" style={{ marginTop: "0.6rem", maxWidth: "36ch" }}>
              Business software for growing companies: CRM, WhatsApp CRM, ERP, payroll, workflow automation and AI
              agents. Based in India, working worldwide.
            </p>
            <address style={{ fontStyle: "normal", marginTop: "1.25rem", display: "grid", gap: "0.3rem" }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
            </address>
          </div>
          <div>
            <h2>Products</h2>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  <a href={offeringHref(p)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={offeringHref(s)}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a href={site.social.linkedin} rel="noopener" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.social.youtube} rel="noopener" target="_blank">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bar">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.hours}</span>
        </div>
      </div>
    </footer>
  );
}
