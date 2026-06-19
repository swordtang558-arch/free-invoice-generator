"use client";

import { forwardRef } from "react";
import type { InvoiceData } from "@/lib/types";
import { computeTotals } from "@/lib/calculations";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

interface Props {
  data: InvoiceData;
}

/**
 * The printable invoice document and the single source of truth for the PDF.
 * Owns the .invoice-paper wrapper (which PDF export and print styles target via
 * the forwarded ref) and dispatches the visual layout to the chosen template.
 */
const InvoicePreview = forwardRef<HTMLDivElement, Props>(function InvoicePreview(
  { data },
  ref
) {
  const totals = computeTotals(data);

  return (
    <div ref={ref} className="invoice-paper mx-auto overflow-hidden font-sans">
      {data.template === "modern" ? (
        <ModernTemplate data={data} totals={totals} />
      ) : data.template === "minimal" ? (
        <MinimalTemplate data={data} totals={totals} />
      ) : (
        <ClassicTemplate data={data} totals={totals} />
      )}
    </div>
  );
});

export default InvoicePreview;
