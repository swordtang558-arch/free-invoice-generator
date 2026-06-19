import Link from "next/link";
import { FileText } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 text-white">
            <FileText className="h-5 w-5" aria-hidden />
            <span
              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"
              aria-hidden
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-tight text-brand-900">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-slate-500 lg:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600 sm:gap-2">
          <Link
            href="/invoice-templates"
            className="hidden rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          >
            Templates
          </Link>
          <Link
            href="/#how-it-works"
            className="hidden rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 md:inline-flex"
          >
            How it works
          </Link>
          <Link
            href="/#faq"
            className="hidden rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="hidden rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          >
            About
          </Link>
          <Link
            href="/#invoice-tool"
            className="ml-1 rounded-md bg-brand-600 px-3 py-2 text-white transition hover:bg-brand-700"
          >
            Create invoice
          </Link>
        </nav>
      </div>
    </header>
  );
}
