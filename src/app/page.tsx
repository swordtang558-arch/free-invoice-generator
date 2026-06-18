import {
  FileText,
  ShieldCheck,
  Download,
  ListChecks,
  PencilLine,
} from "lucide-react";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import { siteConfig } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  url: siteConfig.url,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript",
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Create professional invoices online",
    "Download invoices as PDF with no watermark",
    "No sign up or account required",
    "Runs entirely in your browser — private by design",
    "Add a logo, taxes, discounts and multiple currencies",
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const steps = [
  {
    icon: PencilLine,
    title: "1. Fill in your details",
    body: "Add your business info, your client, line items, taxes and a logo. The preview updates instantly as you type.",
  },
  {
    icon: ListChecks,
    title: "2. Review the live preview",
    body: "See exactly how your invoice will look. Totals, tax and discounts are calculated automatically — no spreadsheet needed.",
  },
  {
    icon: Download,
    title: "3. Download your PDF",
    body: "Click Download PDF to get a clean, professional invoice — no watermark, no sign up, ready to send to your client.",
  },
];

const checklist = [
  "Your business name, address and contact details",
  "Your client's name and billing address",
  "A unique invoice number and the invoice date",
  "A payment due date and accepted payment methods",
  "An itemized list of products or services with quantities and prices",
  "Subtotal, any tax or discount, and the total amount due",
  "Payment terms or notes (for example, “due within 30 days”)",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={webAppLd} />
      <JsonLd data={faqLd} />

      {/* Hero (concise — the tool is the hero) */}
      <section className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-600">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
            Free · No sign up · No watermark
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-900 sm:text-5xl">
            The free invoice generator that gets you paid.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Create and download a professional invoice PDF in seconds — no sign
            up, no watermark, 100% free.
          </p>
          <p className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-accent-600" aria-hidden />
            Everything runs in your browser. Your data never leaves your device.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section id="invoice-tool" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <InvoiceGenerator />
        </div>
      </section>

      <AdSlot label="Below invoice tool" />

      {/* How it works */}
      <section
        id="how-it-works"
        className="no-print scroll-mt-20 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              How to create an invoice in 3 steps
            </h2>
            <p className="mt-2 text-slate-600">
              No software, no spreadsheets, no learning curve.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-slate-200 p-6 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to include */}
      <section className="no-print border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
                What to include in a professional invoice
              </h2>
              <p className="mt-3 text-slate-600">
                A clear, complete invoice gets you paid faster and looks
                professional to your clients. Whether you’re a freelancer, a
                small business, or a contractor, every invoice should contain a
                few essential pieces of information. Our free invoice generator
                builds all of this for you automatically.
              </p>
              <p className="mt-3 text-slate-600">
                Once you’ve filled in the form, you can{" "}
                <a
                  href="#invoice-tool"
                  className="font-medium text-brand-700 underline-offset-2 hover:underline"
                >
                  download a polished PDF
                </a>{" "}
                with no watermark and send it to your client right away.
              </p>
            </div>
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-card"
                >
                  <FileText
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="no-print scroll-mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-slate-600">
              Everything you need to know about our free invoice generator.
            </p>
          </div>
          <Faq />
        </div>
      </section>
    </>
  );
}
