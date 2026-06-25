import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms of use for the Free Invoice Generator. The tool is provided free of charge, as-is, for creating invoices.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      breadcrumb={{ name: "Terms", href: "/terms" }}
      title="Terms of Use"
      intro="Plain-English terms for using this free tool."
    >
      <p>
        Last updated: June 18, 2026. By using {siteConfig.name} (the “Service”),
        you agree to these terms. If you don’t agree, please don’t use the
        Service.
      </p>

      <h2>Use of the service</h2>
      <p>
        The Service lets you create and download invoices for free. You are
        responsible for the accuracy and content of the invoices you create,
        including amounts, tax rates, and any legal or regulatory requirements
        that apply to you and your business.
      </p>

      <h2>No professional advice</h2>
      <p>
        The Service is a document tool, not a substitute for professional advice.
        We do not provide legal, tax, or accounting advice. You are responsible
        for ensuring your invoices comply with the laws of your country or
        region.
      </p>

      <h2>“As-is”, no warranty</h2>
      <p>
        The Service is provided “as is” and “as available”, without warranties of
        any kind, whether express or implied. We do not guarantee that the
        Service will be uninterrupted, error-free, or that calculations will suit
        every use case. Always review your invoice before sending it.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any
        indirect, incidental, or consequential damages arising from your use of
        the Service, including any loss of data or business arising from invoices
        created with the tool.
      </p>

      <h2>Your data</h2>
      <p>
        Your invoice data is processed in your browser and stored locally on your
        device. Please see our <Link href="/privacy">privacy policy</Link> for
        details. You are responsible for backing up any invoices you wish to
        keep by downloading the PDF.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the Service
        after changes means you accept the updated terms.
      </p>
    </PageShell>
  );
}
