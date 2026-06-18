// Central site metadata used across SEO, sitemap, and structured data.

export const siteConfig = {
  name: "Free Invoice Generator",
  shortName: "Invoice Generator",
  // Override at build time with NEXT_PUBLIC_SITE_URL (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com").replace(
    /\/$/,
    ""
  ),
  description:
    "Create and download professional invoices in seconds — no sign up, no watermark, 100% free. Everything runs in your browser; your data never leaves your device.",
  tagline: "Invoices in seconds. Free, private, no sign up.",
  twitter: "@yourhandle",
};

export type SiteConfig = typeof siteConfig;
