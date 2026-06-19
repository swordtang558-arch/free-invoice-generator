// Helpers shared by the invoice template components.

import type { InvoiceData, InvoiceTotals } from "@/lib/types";

export interface TemplateProps {
  data: InvoiceData;
  totals: InvoiceTotals;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function MultiLine({ text }: { text: string }) {
  if (!text) return null;
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line || " "}
        </span>
      ))}
    </>
  );
}

export type { InvoiceData, InvoiceTotals };
