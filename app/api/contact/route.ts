import { allOfferings } from "@/lib/catalog";
import { SITE_URL, site } from "@/lib/site";

// Contact form delivery through Resend (free tier: 3,000 emails a month).
// Required on Vercel: RESEND_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
const RESEND_URL = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";
const MIN_FILL_MS = 2500;
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort limit per server instance; add a Vercel Firewall rate-limit rule for /api/contact for a global one.
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_LIMIT;
}

// Browsers always send Origin on POST; reject anything not coming from this site.
function sameSite(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin || origin === SITE_URL || origin === SITE_URL.replace("://", "://www.");
}

type Payload = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

// Single-line fields lose control characters (so nothing can add lines to the subject); messages keep line breaks.
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";
const cleanText = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function topicFor(interest: string) {
  const offering = allOfferings.find((o) => o.slug === interest);
  if (offering) return offering.name;
  if (interest.startsWith("plan-")) return `${interest.slice(5)} plan`;
  return "General enquiry";
}

export async function POST(request: Request) {
  if (!sameSite(request)) return Response.json({ error: "Send the form from the website." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ error: "Send the form as JSON." }, { status: 415 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip))
    return Response.json({ error: "Too many messages in a short time. Try again in a few minutes." }, { status: 429 });

  let body: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return Response.json({ error: "The message is too long." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Send the form as JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return Response.json({ error: "Send the form as JSON." }, { status: 400 });

  // Bots fill the hidden field or submit instantly; accept silently so they do not retry.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (clean(body.website, 200) || Date.now() - startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 200);
  const message = cleanText(body.message, 5000);
  const topic = topicFor(clean(body.interest, 80));

  if (!name) return Response.json({ error: "Enter your name so we know who to reply to." }, { status: 400 });
  if (!phone && !email)
    return Response.json({ error: "Add a phone number or an email address so we can reply." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: "Check the email address, it does not look complete." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return Response.json({ error: "Email delivery is not set up yet." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company],
    ["Phone / WhatsApp", phone],
    ["Email", email],
    ["Interested in", topic],
  ];
  const filled = rows.filter(([, v]) => v);
  const text = [...filled.map(([k, v]) => `${k}: ${v}`), "", message || "(no message)"].join("\n");
  const html = `<h2 style="font-family:sans-serif">New enquiry: ${escapeHtml(topic)}</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${filled
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td style="padding:4px 0"><b>${escapeHtml(v)}</b></td></tr>`)
    .join("")}</table>
<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message || "(no message)")}</p>
<p style="font-family:sans-serif;color:#777;font-size:12px">Sent from the contact form on ${escapeHtml(site.name)}'s website.</p>`;

  let res: Response;
  try {
    res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Vrinda Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: email || undefined,
        subject: `New enquiry: ${topic} from ${name}${company ? `, ${company}` : ""}`,
        text,
        html,
      }),
    });
  } catch (err) {
    console.error("Contact form: could not reach Resend", err);
    return Response.json({ error: "Your message could not be sent." }, { status: 502 });
  }

  if (!res.ok) {
    console.error("Contact form: Resend returned", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Your message could not be sent." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
