import Link from "next/link";
import { ArrowRight, Check, FileText } from "lucide-react";

// Presentational layout shared by the long-tail landing pages
// (/freelancer-invoice, /contractor-invoice). Content is passed in per page so
// each stays original and keyword-targeted; this only owns the layout + CTAs.

export interface LandingSection {
  heading: string;
  paragraphs: string[];
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface LandingPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  checklistTitle: string;
  checklist: string[];
  sections: LandingSection[];
  related: RelatedLink[];
}

function Cta({ label = "Create your invoice" }: { label?: string }) {
  return (
    <Link
      href="/#invoice-tool"
      className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export default function LandingPage({
  eyebrow,
  title,
  intro,
  checklistTitle,
  checklist,
  sections,
  related,
}: LandingPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-600">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-brand-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{intro}</p>
          <div className="mt-7">
            <Cta />
            <span className="ml-4 text-sm text-slate-500">
              Free · No sign up · No watermark
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {/* Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-xl font-bold tracking-tight text-brand-900">
            {checklistTitle}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Body sections */}
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-brand-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-slate-600">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Mid CTA */}
        <div className="mt-14 rounded-2xl bg-brand-900 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Ready to send your invoice?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-100">
            Fill in the form, preview it live, and download a clean PDF in
            seconds. It all happens in your browser — your data never leaves
            your device.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/#invoice-tool"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-brand-950 shadow-sm transition hover:bg-accent-400"
            >
              Create your invoice
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Related internal links */}
        {related.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Related
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
