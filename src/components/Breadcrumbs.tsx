import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { siteConfig } from "@/lib/site";

export interface Crumb {
  name: string;
  /** Root-relative path, e.g. "/" or "/invoice-templates". */
  href: string;
}

// Visible breadcrumb trail + BreadcrumbList structured data. Gives every page a
// "back to parent" path (weight flows up the hierarchy) and helps search engines
// understand site structure.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="no-print">
      <JsonLd data={ld} />
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 text-xs text-slate-500 sm:px-6">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden />
              )}
              {isLast ? (
                <span className="font-medium text-slate-700" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-brand-700 hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
