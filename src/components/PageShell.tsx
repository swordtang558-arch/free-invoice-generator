// Simple centered content shell for text pages (about / privacy / terms).

export default function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-brand-900">
        {title}
      </h1>
      {intro ? <p className="mt-3 text-lg text-slate-600">{intro}</p> : null}
      <div className="prose-page mt-8 space-y-4 text-slate-700">{children}</div>
    </article>
  );
}
