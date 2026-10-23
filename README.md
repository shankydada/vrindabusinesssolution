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
| `NEXT_PUBLIC_BEEWHAT_GOOGLE_SITE_VERIFICATION` | Search Console code for a separate `https://beewhat.vrindabsolution.com/` URL-prefix property (not needed with a Domain property) |
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
(Organization, SoftwareApplication, Service, Article, FAQPage, BreadcrumbList), sitemaps for both domains, an
`llms.txt` summary for AI assistants, and a Guides section (`lib/guides.ts`) that answers common buyer questions.

1. **Google Search Console**
   - A *Domain* property (verified by DNS, shown as `vrindabsolution.com`) already covers BeeWhat. Submit both
     `https://vrindabsolution.com/sitemap.xml` and `https://beewhat.vrindabsolution.com/sitemap.xml` inside it.
   - A *URL-prefix* property (`https://vrindabsolution.com/`) does not cover BeeWhat. Add a second URL-prefix
     property for `https://beewhat.vrindabsolution.com/`, verify it with the HTML tag method by setting
     `NEXT_PUBLIC_BEEWHAT_GOOGLE_SITE_VERIFICATION`, and submit its sitemap there.
   - Use **URL Inspection → Request indexing** for the home page, each product page and each guide.
2. **Bing Webmaster Tools**: import from Search Console. Bing's index also feeds ChatGPT search and Microsoft Copilot.
3. **IndexNow** (Bing, Yandex and others): `.github/workflows/indexnow.yml` runs `scripts/indexnow.mjs` after every
   successful Vercel production deploy and submits all sitemap URLs. Run it by hand with `npm run indexnow`. The key
   file is `public/2787078fc4d16f05fbb71a1f71fbea03.txt`.
4. **Vercel Analytics and Speed Insights**: switch both on under **Project → Analytics** and **Project → Speed
   Insights**. The site already includes them.
5. **Google Business Profile**: create or claim the listing with your phone, hours, category ("Software company")
   and products. Post updates and photos regularly.
6. **Reviews and listings**: real client reviews on Google, and listings on Clutch, GoodFirms, G2, Capterra,
   IndiaMART and JustDial. Add each listing URL to `site.profiles` in `lib/site.ts` so the structured data links them.
7. **Content**: add guides to `lib/guides.ts` (one or two a month). Each one is added to the sitemap, `llms.txt`,
   the Guides page and the related product pages automatically.
