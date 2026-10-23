# Vrinda Business Solution website

Next.js 16 site for [vrindabsolution.com](https://vrindabsolution.com), plus the BeeWhat product site on
[beewhat.vrindabsolution.com](https://beewhat.vrindabsolution.com). Both are served by one Vercel project.

- 3D hero: React Three Fiber (`components/tree/`), the Vrinda tree with one branch per product
- Motion: framer-motion (respects the visitor's reduced-motion setting)
- Content: every product, service, FAQ and SEO field lives in `lib/catalog.ts`; pages, sitemap, structured data and
  `llms.txt` are generated from it

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
                     # BeeWhat site: http://beewhat.localhost:3000
npm run build        # production build
npm run typecheck
```

## Deploy on Vercel

1. In Vercel, **Add New → Project** and import this GitHub repository. Framework preset: Next.js. No build settings
   need changing.
2. In **Project → Settings → Domains**, add all three to the same project:
   - `vrindabsolution.com`
   - `www.vrindabsolution.com`, set to redirect to `vrindabsolution.com`
   - `beewhat.vrindabsolution.com`
3. At your domain registrar, replace the old GitHub Pages DNS records with the records Vercel shows for each domain.
4. Once the site loads from Vercel, turn off GitHub Pages in the repository settings (**Settings → Pages**).

Optional environment variables (**Project → Settings → Environment Variables**):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Main site URL. Defaults to `https://vrindabsolution.com` |
| `NEXT_PUBLIC_BEEWHAT_URL` | BeeWhat URL. Defaults to `https://beewhat.vrindabsolution.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code |
| `RESEND_API_KEY` | **Required for the contact form.** API key from Resend |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries. Defaults to `contact@vrindabsolution.com` |
| `CONTACT_FROM_EMAIL` | Sender address, once your domain is verified in Resend, e.g. `Vrinda Website <website@vrindabsolution.com>` |

### Contact form email (Resend free tier)

The contact form posts to `app/api/contact/route.ts`, which emails each enquiry through
[Resend](https://resend.com) (free tier: 3,000 emails a month, 100 a day). The visitor's email is set as reply-to,
so you can answer with your mail app's Reply button. A hidden spam-trap field and a minimum fill time filter out
most bots.

1. Sign up at resend.com and create an API key with "Sending access".
2. In Vercel, add `RESEND_API_KEY` and redeploy.
3. **Quick start:** without a verified domain, Resend only delivers to the email address you signed up with, so
   set `CONTACT_TO_EMAIL` to that address.
4. **Recommended:** in Resend, go to **Domains → Add Domain**, add `vrindabsolution.com` and create the DNS records
   it lists at your DNS provider. Once it shows Verified, set `CONTACT_FROM_EMAIL` to an address on your domain
   and `CONTACT_TO_EMAIL` to any inbox you like.

If email is not configured or fails, the form tells the visitor and offers WhatsApp instead.

### How the BeeWhat subdomain works

`proxy.ts` checks the host. Requests to `beewhat.*` are rewritten to the internal `app/beewhat-site/` route, which
has its own layout, sitemap, robots.txt and llms.txt. On the main domain, `/products/beewhat` redirects to the
subdomain so search engines see one URL per page.

## After launch: getting found

The site ships with per-page titles and descriptions, canonical URLs, Open Graph images, JSON-LD structured data
(Organization, SoftwareApplication, Service, FAQPage, BreadcrumbList), sitemaps, and an `llms.txt` summary for AI
assistants. Search engines still need to be told the site exists:

1. **Google Search Console**: add a *Domain* property for `vrindabsolution.com` (DNS verification covers the BeeWhat
   subdomain). Submit `https://vrindabsolution.com/sitemap.xml` and `https://beewhat.vrindabsolution.com/sitemap.xml`.
2. **Bing Webmaster Tools**: import from Search Console. Bing's index also feeds Microsoft Copilot and ChatGPT search.
3. **Google Business Profile**: create or claim the business listing with your address, phone and category
   ("Software company"). This drives local and map results.
4. **Reviews and listings**: real client reviews on Google, plus listings on Clutch, GoodFirms, G2 or Capterra,
   are what search engines and AI assistants weigh most when recommending a provider.
5. Keep `lib/catalog.ts` accurate; FAQs written as real questions are what assistants quote.
