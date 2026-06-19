import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-slate-900">
              {siteConfig.name}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden />
              <span>
                100% free and private. Your invoice data never leaves your
                browser.
              </span>
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-slate-600 sm:grid-cols-3">
            <Link className="hover:text-slate-900" href="/">
              Invoice Generator
            </Link>
            <Link className="hover:text-slate-900" href="/invoice-templates">
              Templates
            </Link>
            <Link className="hover:text-slate-900" href="/freelancer-invoice">
              Freelancer invoice
            </Link>
            <Link className="hover:text-slate-900" href="/contractor-invoice">
              Contractor invoice
            </Link>
            <Link className="hover:text-slate-900" href="/about">
              About
            </Link>
            <Link className="hover:text-slate-900" href="/#faq">
              FAQ
            </Link>
            <Link className="hover:text-slate-900" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-slate-900" href="/terms">
              Terms
            </Link>
          </nav>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
          © {year} {siteConfig.name}. Free to use. Not legal or tax advice.
        </p>
      </div>
    </footer>
  );
}
