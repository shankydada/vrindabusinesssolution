"use client";

import { useEffect, useRef, useState } from "react";
import { allOfferings } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";

type Errors = Partial<Record<"name" | "contact", string>>;

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  // Pre-select the product when arriving from a product page (?interest=smara-crm).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("interest");
    const plan = params.get("plan");
    if (slug && allOfferings.some((o) => o.slug === slug)) setInterest(slug);
    else if (plan) setInterest(`plan-${plan}`);
  }, []);

  function compose(data: FormData) {
    const pick = (k: string) => String(data.get(k) ?? "").trim();
    const offering = allOfferings.find((o) => o.slug === pick("interest"));
    const topic = offering ? offering.name : pick("interest").startsWith("plan-") ? `${pick("interest").slice(5)} plan` : "General enquiry";
    const lines = [
      `Name: ${pick("name")}`,
      pick("company") && `Company: ${pick("company")}`,
      pick("phone") && `Phone: ${pick("phone")}`,
      pick("email") && `Email: ${pick("email")}`,
      `Interested in: ${topic}`,
      pick("message") && `\n${pick("message")}`,
    ].filter(Boolean);
    return { topic, body: lines.join("\n") };
  }

  function validate(data: FormData) {
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your name so we know who to reply to.";
    if (!String(data.get("phone") ?? "").trim() && !String(data.get("email") ?? "").trim())
      next.contact = "Add a phone number or an email address so we can reply.";
    setErrors(next);
    if (next.name) form.current?.querySelector<HTMLInputElement>("#cf-name")?.focus();
    else if (next.contact) form.current?.querySelector<HTMLInputElement>("#cf-phone")?.focus();
    return Object.keys(next).length === 0;
  }

  function send(channel: "whatsapp" | "email") {
    if (!form.current) return;
    const data = new FormData(form.current);
    if (!validate(data)) return;
    const { topic, body } = compose(data);
    if (channel === "whatsapp") {
      window.open(whatsappLink(body), "_blank", "noopener");
      setSent("WhatsApp opened with your message. Press send there to reach us.");
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${topic}`)}&body=${encodeURIComponent(body)}`;
      setSent("Your email app opened with the message ready. Press send there to reach us.");
    }
  }

  return (
    <form
      ref={form}
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
    >
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" className="input" autoComplete="name" placeholder="Ravi Kumar…" aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} />
          {errors.name && <span id="cf-name-err" className="field-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" className="input" autoComplete="organization" placeholder="Kumar Traders…" />
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="cf-phone">Phone or WhatsApp</label>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel" placeholder="+91 98765 43210…" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "cf-contact-err" : undefined} />
        </div>
        <div className="field-group">
          <label htmlFor="cf-email">Work email</label>
          <input id="cf-email" name="email" type="email" inputMode="email" spellCheck={false} className="input" autoComplete="email" placeholder="ravi@company.com…" aria-invalid={!!errors.contact} />
        </div>
      </div>
      {errors.contact && <span id="cf-contact-err" className="field-error">{errors.contact}</span>}
      <div className="field-group">
        <label htmlFor="cf-interest">What are you interested in?</label>
        <select id="cf-interest" name="interest" className="input" value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">Not sure yet</option>
          <optgroup label="Products">
            {allOfferings.filter((o) => o.kind === "product").map((o) => (
              <option key={o.slug} value={o.slug}>{o.name}</option>
            ))}
          </optgroup>
          <optgroup label="Services">
            {allOfferings.filter((o) => o.kind === "service").map((o) => (
              <option key={o.slug} value={o.slug}>{o.name}</option>
            ))}
          </optgroup>
          <optgroup label="Plans">
            <option value="plan-startup">Startup plan</option>
            <option value="plan-growth">Growth plan</option>
            <option value="plan-enterprise">Enterprise plan</option>
          </optgroup>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="cf-message">How do you work today, and what would you like to change?</label>
        <textarea id="cf-message" name="message" className="input" autoComplete="off" placeholder="We track leads in Excel and lose follow-ups when staff are on leave…" />
      </div>
      <div className="hero-actions" style={{ marginTop: "0.25rem" }}>
        <button type="submit" className="btn btn-primary">Send on WhatsApp</button>
        <button type="button" className="btn btn-secondary" onClick={() => send("email")}>Send by Email</button>
      </div>
      <p className="form-note" aria-live="polite">
        {sent ?? "Your message opens in WhatsApp or your email app, ready to send. Nothing is stored on this website."}
      </p>
    </form>
  );
}
