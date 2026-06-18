# Free Invoice Generator

A free, privacy-first online invoice generator. Users fill in a form, see a
live preview, and download a clean, professional **PDF with no watermark and no
sign up**. Everything runs in the browser — **your data never leaves your
device**.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, deployable as a
static-first site on **Vercel**.

---

## ✨ Features (Phase 1 / MVP)

- **Live invoice editor** — form on the left, real-time A4 preview on the right
  (stacked + collapsible on mobile).
- **Automatic math** — line item amounts, subtotal, tax %, discount (% or
  fixed), and total are all computed for you.
- **Multi-currency** — USD, EUR, GBP, CAD, AUD, JPY, INR, CHF, CNY, SGD.
- **Logo upload** — read locally as a data URL and embedded into the PDF; never
  uploaded.
- **PDF download** — no watermark, A4, filename
  `Invoice-{number}-{client}.pdf`, with a loading state.
- **Print** and **Reset** support.
- **Auto-saved drafts** — debounced to `localStorage`; restored on reload.
- **Privacy by design** — 100% client-side, no backend, no accounts.
- **SEO baked in** — per-page titles/meta, semantic headings, `WebApplication`
  + `FAQPage` JSON-LD, Open Graph / Twitter cards, `sitemap.xml`, `robots.txt`.
- **Content pages** — About (E-E-A-T), Privacy, Terms.
- Fully responsive.

---

## 🧱 Tech stack & key decisions

| Concern        | Choice                                  | Why |
| -------------- | --------------------------------------- | --- |
| Framework      | Next.js App Router + TypeScript         | SSG-friendly, great SEO, file-based routing |
| Styling        | Tailwind CSS                            | Fast, consistent, small CSS |
| PDF export     | `html2pdf.js` (jsPDF + html2canvas)     | Renders the **exact preview DOM** so the PDF matches what the user sees. Exported at `scale: 2` so text stays crisp. (A hand-built jsPDF text layout would be sharper but couldn't keep pixel parity with the live preview.) Imported dynamically so it never enters the server bundle. |
| State          | React `useState` / `useEffect`          | No Redux needed |
| Persistence    | `localStorage`                          | Privacy: data stays on device |
| Icons          | `lucide-react`                          | Clean, tree-shakeable |

### Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, global metadata, header/footer
│   ├── page.tsx            # Home = invoice generator + SEO content
│   ├── globals.css         # Tailwind + preview/print styles
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── robots.ts           # Auto-generated robots.txt
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── InvoiceGenerator.tsx  # Client wrapper: state, autosave, actions
│   ├── InvoiceForm.tsx
│   ├── InvoicePreview.tsx    # The printable A4 document (forwardRef)
│   ├── LineItemsTable.tsx
│   ├── PdfExportButton.tsx
│   ├── Faq.tsx / Header.tsx / Footer.tsx / PageShell.tsx
│   ├── JsonLd.tsx            # Structured data helper
│   └── AdSlot.tsx            # Adsense placeholder (Phase 2)
└── lib/
    ├── types.ts            # Domain types
    ├── calculations.ts     # Pure money math (testable)
    ├── currency.ts         # Currencies + formatMoney
    ├── storage.ts          # localStorage draft helpers
    ├── pdf.ts              # PDF export + filename builder
    ├── defaults.ts         # Seed invoice + id factory
    ├── faq.ts              # FAQ content (shared with JSON-LD)
    └── site.ts             # Site metadata
```

---

## 🚀 Local development

Requires **Node.js 18.18+** (tested on Node 20+).

```bash
cd free-invoice-generator
npm install
npm run dev       # http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # lint
```

### Environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` — your production URL (used for canonical links,
  sitemap, and Open Graph). No trailing slash.

The Phase-2 placeholders (`NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_ADSENSE_CLIENT`) can stay blank for
now.

---

## ▲ Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In [Vercel](https://vercel.com/new), **Import** the repo. If the project is
   in the `free-invoice-generator/` subfolder, set the **Root Directory** to
   `free-invoice-generator`.
3. Framework preset: **Next.js** (auto-detected). No build config changes
   needed.
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` (your domain).
5. Deploy. Vercel runs `next build` and serves the SSG output on its CDN.

After deploying, submit `https://your-domain.com/sitemap.xml` in Google Search
Console.

---

## 🗺️ Roadmap (Phase 2 & 3 TODO)

### Phase 2 — monetization + traffic
- [ ] Enable AdSense — replace the placeholder in `components/AdSlot.tsx` and
      load the script gated on `NEXT_PUBLIC_ADSENSE_CLIENT`.
- [ ] Multiple invoice templates (Classic / Modern / Minimal) with a switcher.
- [ ] `/invoice-templates` template gallery.
- [ ] Long-tail landing pages: `/freelancer-invoice`, `/contractor-invoice`
      (300+ words of original copy each + CTA into the tool, cross-linked).
- [ ] MDX blog (`/blog`, `/blog/[slug]`) with 3 seed posts:
      "How to invoice as a freelancer", "Invoice vs receipt",
      "What to include on an invoice". Add `Article` JSON-LD.
- [ ] Wire up Google Analytics (`NEXT_PUBLIC_GA_ID`) + Search Console
      (`NEXT_PUBLIC_GSC_VERIFICATION`, already supported in `layout.tsx`).

### Phase 3 — advanced monetization
- [ ] Keep core download free; gate premium templates / logo-free / batch
      export behind a one-time unlock or subscription.
- [ ] i18n (start with English-region variants, then European languages).
- [ ] Companion tools (e.g. Pay Stub Generator) cross-linked into a tool matrix.

---

## ⚠️ Notes

- This tool does not provide legal, tax, or accounting advice.
- The unrelated Pomodoro files in the parent directory are not part of this
  project.
