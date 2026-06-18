// Pure, testable money math for invoices. No side effects, no DOM.

import type { InvoiceData, InvoiceTotals, LineItem } from "./types";

/** Round to 2 decimals, avoiding binary float drift (e.g. 1.005 -> 1.01). */
export function round2(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function lineAmount(item: Pick<LineItem, "quantity" | "unitPrice">): number {
  const qty = Number.isFinite(item.quantity) ? item.quantity : 0;
  const price = Number.isFinite(item.unitPrice) ? item.unitPrice : 0;
  return round2(qty * price);
}

export function computeTotals(data: InvoiceData): InvoiceTotals {
  const subtotal = round2(
    data.items.reduce((sum, item) => sum + lineAmount(item), 0)
  );

  const discountAmount =
    data.discountMode === "percent"
      ? round2((subtotal * (data.discountValue || 0)) / 100)
      : round2(Math.min(data.discountValue || 0, subtotal));

  const taxedBase = Math.max(subtotal - discountAmount, 0);
  const taxAmount = round2((taxedBase * (data.taxPercent || 0)) / 100);

  const total = round2(taxedBase + taxAmount);

  return { subtotal, discountAmount, taxAmount, total };
}
