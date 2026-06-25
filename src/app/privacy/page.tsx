import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Our privacy policy: the Free Invoice Generator processes everything in your browser. Your invoice data is never uploaded to our servers.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      breadcrumb={{ name: "Privacy", href: "/privacy" }}
      title="Privacy Policy"
      intro="Short version: your invoice data never leaves your browser."
    >
      <p>
        Last updated: June 18, 2026. This policy explains how {siteConfig.name}{" "}
        (“we”, “us”) handles information when you use this website.
      </p>

      <h2>Your invoice data stays on your device</h2>
      <p>
        The invoice generator runs entirely in your browser. Everything you type
        — your business details, your client’s details, line items, notes — and
        any logo you upload is processed locally on your device. This
        information is <strong>not transmitted to or stored on our servers</strong>.
      </p>

      <h2>Local draft storage</h2>
      <p>
        To let you pick up where you left off, your current invoice is saved as a
        draft in your browser’s <code>localStorage</code>. This data lives only
        in your browser, on your device. You can remove it at any time by
        clicking <strong>Reset</strong> in the tool or by clearing your browser
        storage.
      </p>

      <h2>Logo uploads</h2>
      <p>
        When you add a logo, the image is read locally and embedded directly into
        your invoice and PDF. It is never uploaded to us or any third party.
      </p>

      <h2>Analytics and cookies</h2>
      <p>
        In this version of the site we do not set tracking cookies. If we
        introduce privacy-conscious analytics or advertising in the future, we
        will update this policy and, where required, request your consent.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site may be served through a hosting/CDN provider (for example,
        Vercel), which may process basic technical request data such as IP
        address and user agent for security and delivery purposes. This is
        standard for any website and is separate from your invoice content,
        which we never receive.
      </p>

      <h2>Children</h2>
      <p>
        This tool is intended for business use by adults and is not directed at
        children.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? See our <Link href="/about">about page</Link>{" "}
        for more about the project.
      </p>
    </PageShell>
  );
}
