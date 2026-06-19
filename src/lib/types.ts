// Central type definitions for the invoice domain.

import type { TemplateId } from "./templates";

export interface Party {
  /** Company or person name. */
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface LineItem {
  /** Stable id so React keys / row edits stay correct across reorders. */
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type AmountMode = "percent" | "fixed";

export interface InvoiceData {
  /** Visual template the invoice renders / exports with. */
  template: TemplateId;

  /** Logo as a base64 data URL (read locally, never uploaded). */
  logo: string | null;

  from: Party;
  to: Pick<Party, "name" | "address" | "email">;

  invoiceNumber: string;
  invoiceDate: string; // ISO yyyy-mm-dd
  dueDate: string; // ISO yyyy-mm-dd

  currency: string; // ISO 4217 code, e.g. "USD"

  items: LineItem[];

  taxPercent: number;

  discountMode: AmountMode;
  discountValue: number;

  notes: string;
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
}
