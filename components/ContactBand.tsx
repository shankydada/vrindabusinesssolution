import Link from "next/link";
import { whatsappLink } from "@/lib/site";

export function ContactBand({
  title = "Tell us what slows your business down",
  text = "Share how you work today. We will suggest where to start, show you a demo and give you a timeline, with no commitment.",
  whatsappText = "Hi, I'd like a demo.",
}: {
  title?: string;
  text?: string;
  whatsappText?: string;
}) {
  return (
    <section className="contact-band section" aria-labelledby="contact-band-title">
      <div className="wrap">
        <h2 id="contact-band-title">{title}</h2>
        <p className="lede">{text}</p>
        <div className="hero-actions">
          <Link href="/contact" className="btn btn-light">
            Book a Free Demo
          </Link>
          <a href={whatsappLink(whatsappText)} className="btn btn-secondary" target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
