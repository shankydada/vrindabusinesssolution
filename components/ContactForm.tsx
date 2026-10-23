"use client";

import { useEffect, useRef, useState } from "react";
import { allOfferings } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

type Errors = Partial<Record<"name" | "contact", string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Pre-select the product when arriving from a product page (?interest=smara-crm).
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("interest");
    const plan = params.get("plan");
    if (slug && allOfferings.some((o) => o.slug === slug)) setInterest(slug);
    else if (plan) setInterest(`plan-${plan}`);
  }, []);

  const pick = (data: FormData, k: string) => String(data.get(k) ?? "").trim();

  function compose(data: FormData) {
    const offering = allOfferings.find((o) => o.slug === pick(data, "interest"));
    const raw = pick(data, "interest");
    const topic = offering ? offering.name : raw.startsWith("plan-") ? `${raw.slice(5)} plan` : "General enquiry";
    return [
      `Name: ${pick(data, "name")}`,
      pick(data, "company") && `Company: ${pick(data, "company")}`,
      pick(data, "phone") && `Phone: ${pick(data, "phone")}`,
      pick(data, "email") && `Email: ${pick(data, "email")}`,
      `Interested in: ${topic}`,
      pick(data, "message") && `\n${pick(data, "message")}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function validate(data: FormData) {
    const next: Errors = {};
    if (!pick(data, "name")) next.name = "Enter your name so we know who to reply to.";
    if (!pick(data, "phone") && !pick(data, "email")) next.contact = "Add a phone number or an email address so we can reply.";
    setErrors(next);
    if (next.name) form.current?.querySelector<HTMLInputElement>("#cf-name")?.focus();
    else if (next.contact) form.current?.querySelector<HTMLInputElement>("#cf-phone")?.focus();
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!form.current || status.kind === "sending") return;
    const data = new FormData(form.current);
    if (!validate(data)) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), startedAt: startedAt.current }),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        form.current.reset();
        setInterest("");
        return;
      }
      const { error } = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({ kind: "error", message: error ?? "Your message could not be sent." });
    } catch {
      setStatus({ kind: "error", message: "Your message could not be sent because the connection dropped." });
    }
  }

  function sendWhatsApp() {
    if (!form.current) return;
    const data = new FormData(form.current);
    if (!validate(data)) return;
    window.open(whatsappLink(compose(data)), "_blank", "noopener");
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="form" aria-live="polite">
        <h2 style={{ fontSize: "var(--step-2)" }}>Message sent</h2>
        <p className="muted">
          Thank you. Your message is with our team, and we will reply by phone or email to arrange your demo.
        </p>
        <div>
          <button type="button" className="btn btn-secondary" onClick={() => setStatus({ kind: "idle" })}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      ref={form}
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
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
      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="hero-actions" style={{ marginTop: "0.25rem" }}>
        <button type="submit" className="btn btn-primary" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : "Send Message"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={sendWhatsApp}>
          Send on WhatsApp Instead
        </button>
      </div>
      <p className={status.kind === "error" ? "field-error" : "form-note"} role={status.kind === "error" ? "alert" : undefined}>
        {status.kind === "error"
          ? `${status.message} Please use “Send on WhatsApp Instead”, or call us.`
          : "Your message goes straight to our team's inbox."}
      </p>
    </form>
  );
}
