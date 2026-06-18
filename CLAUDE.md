# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build; also runs type-check + lint (fails on either)
npm run start    # serve the production build
npm run lint     # eslint only
```

There is **no test runner configured**. The `lib/` functions are written to be
pure and unit-testable, but no test framework is installed yet — don't assume
`npm test` exists.

`npm run build` is the primary correctness gate (type errors and lint errors
both fail the build).

## Project location

The project root is this directory (`free-invoice-generator/`), which is the git
repository root. The parent directory contains an unrelated Pomodoro script that
is **not** part of this project.

## Delivery is phased — respect the scope boundary

The product is built in deliberate phases (see "Roadmap" in `README.md`).
**Phase 1 (the current MVP) is intentionally complete and self-contained.** Do
not pull Phase 2/3 features (AdSense, multiple templates, blog, long-tail landing
pages, analytics, i18n) into a Phase 1 change unless explicitly asked.

Phase 2 hooks are already wired but **inert** and must stay that way until
activated with env vars:
- `components/AdSlot.tsx` renders nothing (hidden placeholder).
- Google Analytics / Search Console are gated on `NEXT_PUBLIC_GA_ID` /
  `NEXT_PUBLIC_GSC_VERIFICATION` (see `app/layout.tsx`), blank by default.

## Architecture (the big picture)

**Server/client split is deliberate and SEO-critical.** The home page
(`app/page.tsx`) is a **server component** that renders all crawlable SEO content
(H1, how-it-works, FAQ, JSON-LD) as static HTML. The interactive tool is isolated
in a single `"use client"` component, `components/InvoiceGenerator.tsx`, which the
server page embeds. **Keep SEO/marketing content in server components; only the
tool is client-side.**

**State flow is top-down through one owner.** `InvoiceGenerator` holds the single
`InvoiceData` object (`lib/types.ts`) and exposes a `patch(partial)` callback.
`InvoiceForm` sends partial updates up; `InvoicePreview` is read-only.
- It renders `null` (a skeleton) until mounted, then seeds state from a saved
  draft or `createDefaultInvoice()`. **This null-until-mounted pattern exists to
  avoid hydration mismatches** from random ids (`crypto.randomUUID`) and
  date-based defaults. Don't move default-invoice creation into the initial
  `useState` value.

**The preview IS the PDF.** `components/InvoicePreview.tsx` (a `forwardRef`
component) is the single source of truth for how the downloaded PDF looks.
`lib/pdf.ts` uses `html2pdf.js` (html2canvas + jsPDF) to render that exact DOM
node — passed up via the ref — at `scale: 2`. **To change the PDF, change the
preview.** `html2pdf.js` is imported dynamically (client-only) so it never enters
the server bundle, and has a hand-written type declaration at
`src/types/html2pdf.d.ts` (no official `@types`).

**Preview scaling uses CSS `zoom`, not `transform: scale`** (see
`.invoice-preview-scale` in `app/globals.css`). This is intentional: `zoom`
reflows layout so the scaled A4 paper collapses its box with no empty gap, while
the export still reads the full-size DOM for crisp output. `@media print` resets
zoom to 1.

**Money math lives in `lib/calculations.ts` and is pure.** Use `round2()` (it
corrects binary-float drift) for any new monetary computation. Order of
operations: discount is applied to subtotal first, then tax is computed on
`(subtotal − discount)`. Don't recompute totals ad hoc in components — call
`computeTotals()`.

**Persistence is privacy-first and local-only.** `lib/storage.ts` saves the draft
to `localStorage` (debounced 600ms in `InvoiceGenerator`) with a shape guard so a
corrupt draft never crashes the app. There is **no backend** and user data must
never be sent anywhere — this is a stated product principle, not just an
implementation detail.

**Single-sourced content that feeds two places:**
- FAQ text lives in `lib/faq.ts` and is consumed by both the on-page accordion
  (`components/Faq.tsx`) **and** the `FAQPage` JSON-LD in `app/page.tsx`. Edit
  once, both update.
- Site metadata lives in `lib/site.ts`; `NEXT_PUBLIC_SITE_URL` drives
  `metadataBase`, canonicals, sitemap, and Open Graph.

**SEO plumbing to keep in sync:** `app/sitemap.ts` and `app/robots.ts`
auto-generate from `siteConfig.url`. **When you add a route, add it to
`sitemap.ts`** and give the page its own `metadata` export with a canonical.

## Conventions

- TypeScript strict mode; path alias `@/*` → `src/*`.
- Tailwind brand color is the `brand` indigo scale (`tailwind.config.ts`).
- Add `"use client"` only to components that need interactivity; default to
  server components.
- Currency formatting goes through `lib/currency.ts` (`formatMoney`), which
  handles zero-decimal currencies like JPY.
