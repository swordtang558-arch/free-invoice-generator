// Invoice template registry. Kept JSX-free so both server components (the
// gallery page) and client components (the switcher) can import it.

export type TemplateId = "classic" | "modern" | "minimal";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional invoice layout with a restrained gold accent. The safe, professional default.",
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "A bold colored header band and clean tabular body. Confident and contemporary.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Monochrome, hairline rules, and generous whitespace. Quietly elegant and understated.",
  },
];

const VALID = new Set<string>(TEMPLATES.map((t) => t.id));

export function isTemplateId(value: string | null | undefined): value is TemplateId {
  return !!value && VALID.has(value);
}
