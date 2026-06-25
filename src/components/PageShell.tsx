// Simple centered content shell for text pages (about / privacy / terms).

import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function PageShell({
  title,
  intro,
  breadcrumb,
  children,
}: {
  title: string;
  intro?: string;
  /** Current page's breadcrumb (Home is prepended automatically). */
  breadcrumb?: Crumb;
  children: React.ReactNode;
}) {
  return (
    <>
      {breadcrumb && (
        <Breadcrumbs items={[{ name: "Home", href: "/" }, breadcrumb]} />
      )}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-brand-900">
          {title}
        </h1>
        {intro ? <p className="mt-3 text-lg text-slate-600">{intro}</p> : null}
        <div className="prose-page mt-8 space-y-4 text-slate-700">{children}</div>
      </article>
    </>
  );
}
