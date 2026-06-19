// Default / seed invoice data and small factory helpers.

import type { InvoiceData, LineItem } from "./types";

/** Crypto-backed id with a graceful fallback for older environments. */
export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function emptyLineItem(): LineItem {
  return { id: makeId(), description: "", quantity: 1, unitPrice: 0 };
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** A friendly starter invoice so the preview never looks empty. */
export function createDefaultInvoice(): InvoiceData {
  return {
    template: "classic",
    logo: null,
    from: {
      name: "Your Company LLC",
      address: "123 Market Street\nSan Francisco, CA 94105",
      email: "billing@yourcompany.com",
      phone: "+1 (555) 010-2030",
    },
    to: {
      name: "Client Inc.",
      address: "456 Client Avenue\nNew York, NY 10001",
      email: "accounts@client.com",
    },
    invoiceNumber: "INV-0001",
    invoiceDate: todayISO(),
    dueDate: plusDaysISO(30),
    currency: "USD",
    items: [
      { id: makeId(), description: "Website design", quantity: 1, unitPrice: 1200 },
      { id: makeId(), description: "Consulting (hours)", quantity: 8, unitPrice: 95 },
    ],
    taxPercent: 0,
    discountMode: "percent",
    discountValue: 0,
    notes: "Payment due within 30 days. Thank you for your business!",
  };
}
