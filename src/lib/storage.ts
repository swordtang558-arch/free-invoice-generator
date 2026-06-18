// localStorage-backed draft persistence. All data stays on the device.

import type { InvoiceData } from "./types";

const STORAGE_KEY = "fig:invoice-draft:v1";

/** Load a saved draft, or null if none / unreadable. */
export function loadDraft(): InvoiceData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<InvoiceData>;
    // Minimal shape guard — a corrupt draft should never crash the app.
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed as InvoiceData;
  } catch {
    return null;
  }
}

export function saveDraft(data: InvoiceData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or storage disabled — fail silently, never block typing.
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
