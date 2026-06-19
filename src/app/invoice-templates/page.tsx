import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InvoicePreview from "@/components/InvoicePreview";
import { TEMPLATES } from "@/lib/templates";
import type { InvoiceData } from "@/lib/types";

export const metadata: Metadata = {
  title: "Free Invoice Templates — Classic, Modern & Minimal",
  description:
    "Browse free invoice templates — Classic, Modern, and Minimal. Pick a style and create a professional, no-watermark invoice PDF in seconds. No sign up.",
  alternates: { canonical: "/invoice-templates" },
  openGraph: {
    title: "Free Invoice Templates",
    description:
      "Classic, Modern, and Minimal invoice templates. Pick one and download a professional PDF — free, no sign up.",
    url: "/invoice-templates",
  },
};

// Fixed sample invoice so each thumbnail is deterministic and looks polished.
const SAMPLE: InvoiceData = {
  template: "classic",
  logo: null,
  from: {
    name: "Northwind Studio",
    address: "24 Harbour Lane\nPortland, OR 97204",
    email: "hello@northwind.studio",
    phone: "+1 (555) 240-1180",
  },
  to: {
    name: "Acme Corporation",
    address: "1 Innovation Way\nAustin, TX 78701",
    email: "ap@acme.com",
  },
  invoiceNumber: "INV-0042",
  invoiceDate: "2026-06-01",
  dueDate: "2026-07-01",
  currency: "USD",
  items: [
    { id: "s1", description: "Brand identity design", quantity: 1, unitPrice: 2400 },
    { id: "s2", description: "Marketing landing page", quantity: 1, unitPrice: 1800 },
    { id: "s3", description: "Consulting (hours)", quantity: 6, unitPrice: 120 },
  ],
  taxPercent: 8,
  discountMode: "percent",
  discountValue: 0,
  notes: "Payment due within 30 days. Thank you for your business!",
};

export default function InvoiceTemplatesPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-600">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
            Free templates
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-brand-900 sm:text-5xl">
            Free invoice templates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Three professionally designed styles. Pick one, fill in your
            details, and download a clean PDF — no sign up, no watermark.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
            >
              <div className="flex justify-center overflow-hidden border-b border-slate-100 bg-slate-50 p-4">
                <div className="invoice-thumb w-fit shadow-sm">
                  <InvoicePreview data={{ ...SAMPLE, template: t.id }} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-bold tracking-tight text-brand-900">
                  {t.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {t.description}
                </p>
                <Link
                  href={`/?template=${t.id}#invoice-tool`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Use this template
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-slate-500">
          You can switch templates any time from the editor — your invoice
          details carry over. Looking for a specific use case? See our{" "}
          <Link href="/freelancer-invoice" className="font-medium text-brand-700 hover:underline">
            freelancer
          </Link>{" "}
          and{" "}
          <Link href="/contractor-invoice" className="font-medium text-brand-700 hover:underline">
            contractor
          </Link>{" "}
          invoice guides.
        </p>
      </div>
    </>
  );
}
