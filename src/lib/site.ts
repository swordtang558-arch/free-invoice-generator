// Central site metadata used across SEO, sitemap, and structured data.
// NOTE: siteConfig.url is only read server-side / at build time (layout
// metadata, sitemap, robots, JSON-LD), so it can safely use non-public env vars.

/**
 * Resolve the canonical site origin (no trailing slash). Precedence:
 * 1. NEXT_PUBLIC_SITE_URL — explicit override (set this for a custom domain).
 * 2. VERCEL_PROJECT_PRODUCTION_URL — auto-injected by Vercel; the project's
 *    production domain (tracks a custom domain once one is attached). No protocol.
 * 3. localhost for local dev.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Free Invoice Generator",
  shortName: "Invoice Generator",
  url: resolveSiteUrl(),
  description:
    "Create and download professional invoices in seconds — no sign up, no watermark, 100% free. Everything runs in your browser; your data never leaves your device.",
  tagline: "Invoices in seconds. Free, private, no sign up.",
  twitter: "@yourhandle",
};

export type SiteConfig = typeof siteConfig;
