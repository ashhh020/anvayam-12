# Anvayam Vaidya Sala — Website

*Wellbeing, wherever life takes us.*
*Sarve Santu Niramayah — May all be free from illness.*

The website for Anvayam Vaidya Sala, a travelling, collaborative wellbeing initiative. All copy comes from *Anvayam_Vaidya_Sala_Website_Content.pdf*. When you edit the wording, keep it in line with that document.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens live in `src/app/globals.css`)
- **lucide-react** for icons
- Fonts from `next/font/google`, self-hosted at build time: Cormorant Garamond (headings), DM Sans (body), Noto Serif Devanagari (सर्वे सन्तु निरामयाः)
- No other runtime dependencies. The contact form sends email through the Resend REST API using `fetch`.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

| Command         | Purpose                         |
| --------------- | ------------------------------- |
| `npm run dev`   | Local development server        |
| `npm run build` | Production build                |
| `npm start`     | Serve the production build      |
| `npm run lint`  | ESLint (Next.js core-web-vitals)|

## Project structure

```
src/
  app/
    page.tsx                 Home  (/)
    about/page.tsx           About Us  (/about)
    services/page.tsx        Services & Experiences  (/services)
    collaborate/page.tsx     Collaborate & Grow  (/collaborate)
    contact/page.tsx         Connect With Us  (/contact)
    api/contact/route.ts     Contact form endpoint (server only)
    credits/page.tsx         Photo credits  (/credits)
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon.png, apple-icon.png, not-found.tsx
  components/
    layout/                  Header (with accessible mobile menu), Footer, Wordmark
    ui/                      Button, Container/Section/Eyebrow/Heading, PageIntro, CtaBand, Reveal
    sections/ServiceRow.tsx  Services page focus-area layout
    contact/ContactForm.tsx  Client-side form with validation and status states
    illustrations/           Arch photo frame, SVG landscape fallback, kolam and botanical motifs
  config/site.ts             Brand strings, navigation, env-driven contact/social/privacy config
  content/content.ts         Structured copy (values, services, collaborators, pathways…)
  content/photos.ts          Photographs with alt text, credits and licences
  lib/enquiry.ts             Form schema and validation shared by the client and the server
  lib/metadata.ts            Per-page SEO and Open Graph helper
```

## Configuration

All configuration comes from environment variables. See `.env.example`. **No contact details, social accounts or addresses are hard-coded.** Anything left empty stays hidden.

| Variable | Exposed to browser? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Production URL, used for canonical links, sitemap, robots and Open Graph. **Required in production.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | Official public email, shown on the Contact page, in the footer and in form error messages |
| `NEXT_PUBLIC_CONTACT_PHONE` | yes | Official public phone number (optional) |
| `NEXT_PUBLIC_PRIVACY_POLICY_URL` | yes | Privacy policy URL or path. The footer link and the link in the form's privacy notice appear only when this is set |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` / `_FACEBOOK` / `_LINKEDIN` / `_YOUTUBE` / `_X` | yes | Social profile URLs. Each one appears only when set |
| `RESEND_API_KEY` | **no (server only)** | Resend API key for delivering form enquiries |
| `CONTACT_TO_EMAIL` | **no (server only)** | Inbox that receives enquiries (comma-separated for several) |
| `CONTACT_FROM_EMAIL` | **no (server only)** | Sender on a domain verified in Resend, e.g. `Anvayam Website <website@your-domain>` |

`NEXT_PUBLIC_*` values are baked in at build time, so you must rebuild or redeploy after changing them. Never put secrets in a `NEXT_PUBLIC_*` variable.

### Contact form delivery

`POST /api/contact` validates every enquiry on the server with the same rules as the browser (`src/lib/enquiry.ts`). It then sends the enquiry by email through [Resend](https://resend.com), with `reply_to` set to the sender's address.

To set it up:

1. Create a Resend account and verify the domain you will send from.
2. Create an API key.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in your hosting provider's environment settings.
4. Redeploy, then send a test enquiry.

**Until these three variables are set, the endpoint returns `503`.** The form then shows an honest "your enquiry was not sent" message. It never shows a fake success. Delivery failures (`502`) and rate-limiting (`429`) are reported to the visitor in the same way.

To use another provider (SMTP, a CRM, a form service), replace the `fetch` call in `src/app/api/contact/route.ts`. The validation, spam checks and response format stay the same.

**Spam protection** comes in three layers:

- a hidden honeypot field
- a minimum time to fill in the form
- a per-IP rate limit of 5 enquiries per 10 minutes

The rate limit is kept in memory for each server instance. On serverless or multi-instance hosting, also enable your platform's firewall or bot protection, or move the limiter to a shared store such as Upstash Redis.

**Privacy:**

- A short privacy notice and a required consent checkbox appear before submission.
- Visitors are asked not to include personal medical information.
- Enquiries are not stored by the website. They exist only in the delivered email.

## Brand and imagery

**Logo.** The official logo lives in `public/brand/`:

- `logo-full.png` is the complete logo, with its black background removed so it sits on ivory.
- `logo-emblem.png` is the tree-and-hands emblem on its own.

The header and footer use the emblem with a text wordmark. The Contact page shows the full logo, and the favicon, Apple touch icon and Open Graph image use the emblem. The colour palette in `src/app/globals.css` comes from the logo: leaf greens and the earthy brown of the figure. The brown accent keeps the token name `terracotta`, so no class names needed to change.

**Photographs.** The photos come from Wikimedia Commons under CC BY or CC BY-SA licences. They are illustrative only and **do not depict Anvayam programmes**. Their alt text describes the scene, not an Anvayam activity.

- Each photo's file, alt text, author, licence and source link is recorded in `src/content/photos.ts`.
- The required attribution is shown on `/credits`, which is linked from the footer.
- Files are in `public/images/` (resized to 1800px, JPEG). `next/image` serves responsive AVIF/WebP with blur placeholders and lazy-loads them.

To replace a photo:

1. Add the file to `public/images/`.
2. Update its entry in `photos.ts`: alt text, credit and licence.
3. Keep `/credits` accurate.

Prefer genuine Anvayam photography once programmes take place, with participants' consent.

## Accessibility and motion

- Semantic landmarks, a skip link, one `h1` per page and labelled sections.
- Visible focus styles.
- The mobile menu has `aria-expanded`/`aria-controls`, closes on Escape, keeps focus inside while open and locks page scroll.
- Form fields have labels and `aria-invalid`/`aria-describedby` errors. Focus moves to the first invalid field. Status messages are announced through live regions. The submit button is disabled while sending, which prevents duplicate submissions.
- Scroll-reveal animations run only when `prefers-reduced-motion` is `no-preference`. Without JavaScript, content is shown immediately.
- Colours meet WCAG AA contrast. `terracotta-deep` (`#94553A`) is used for small terracotta text on light backgrounds.

## SEO

- Each page sets a title, description, canonical URL and Open Graph/Twitter tags (`src/lib/metadata.ts`).
- A branded Open Graph image is generated at `/opengraph-image`.
- `/sitemap.xml` and `/robots.txt` come from `NEXT_PUBLIC_SITE_URL`. `/api/` is disallowed.

## Deployment

Any Node-capable host that supports Next.js works. On **Vercel**:

1. Import the repository.
2. Add the environment variables above (Production and Preview).
3. Deploy.
4. Add the custom domain and set `NEXT_PUBLIC_SITE_URL` to it, then redeploy.

For self-hosting: `npm ci && npm run build && npm start`, behind HTTPS. Make sure the proxy forwards `X-Forwarded-For` so that rate limiting works.

## Before launch — information still required

- [ ] **Official email address** → `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] **Contact phone number** (optional) → `NEXT_PUBLIC_CONTACT_PHONE`
- [ ] **Form delivery**: Resend account, verified sending domain, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and a successful test enquiry
- [ ] **Privacy policy**: write and publish one, covering what the form collects, why, how long it is kept and who to contact (consider India's DPDP Act 2023), then set `NEXT_PUBLIC_PRIVACY_POLICY_URL`. Also review the short notice in `ContactForm.tsx` so it matches the policy
- [ ] **Social media links**: only accounts that will be maintained
- [ ] **Production domain** → `NEXT_PUBLIC_SITE_URL`
- [ ] **Photography**: the current photos are licensed stock from Wikimedia Commons, credited on `/credits`. Replace them with genuine Anvayam images, taken with participants' consent, when available
- [ ] **Logo source file**: the logo was extracted from a JPEG. A high-resolution transparent PNG or SVG from the designer would give sharper edges
- [ ] Final proofread of all copy against the source content document
