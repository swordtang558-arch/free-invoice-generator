import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Free Invoice Generator — a privacy-first, browser-based tool that lets freelancers and small businesses create professional invoices for free.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      title="About this invoice generator"
      intro="A simple, private, genuinely free way to invoice your clients."
    >
      <p>
        {siteConfig.name} was built around one idea: creating an invoice should
        be fast, professional, and free — without handing your business details
        to yet another platform. Most “free” invoice tools ask you to register,
        cap how many invoices you can make, or stamp a watermark on the PDF. We
        don’t do any of that.
      </p>

      <h2>Why we built it</h2>
      <p>
        Freelancers, contractors, and small business owners spend far too much
        time wrestling with word processors and spreadsheet templates just to
        bill a client. We wanted a tool where you open a page, type in your
        details, and download a clean PDF in under a minute — on any device.
      </p>

      <h2>Privacy by design</h2>
      <p>
        This is the part we care about most. The entire generator runs inside
        your web browser. When you enter your business information, your
        client’s details, or upload a logo, that data is processed locally on
        your device and is <strong>never uploaded to a server</strong>. Your
        draft is saved only in your own browser’s storage. In short: your data
        never leaves your browser. You can read the details in our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>How it stays free</h2>
      <p>
        The core invoice generator is, and will remain, free with no watermark
        and no sign up. In the future we may add optional advertising and
        premium templates to support the project, but creating and downloading a
        standard professional invoice will always be free.
      </p>

      <h2>A note on accuracy</h2>
      <p>
        We aim to make invoicing easy, but this tool does not provide legal,
        accounting, or tax advice. Tax rules vary by country and situation —
        please confirm your invoice meets the requirements in your jurisdiction,
        and consult a professional if you’re unsure.
      </p>

      <p>
        Ready to bill a client?{" "}
        <Link href="/#invoice-tool">Create your invoice now →</Link>
      </p>
    </PageShell>
  );
}
