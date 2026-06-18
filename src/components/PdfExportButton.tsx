"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportElementToPdf } from "@/lib/pdf";

interface Props {
  getElement: () => HTMLElement | null;
  filename: string;
}

export default function PdfExportButton({ getElement, filename }: Props) {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (busy) return;
    const el = getElement();
    if (!el) return;
    setBusy(true);
    try {
      await exportElementToPdf(el, filename);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Sorry, the PDF could not be generated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4" aria-hidden />
      )}
      {busy ? "Generating PDF…" : "Download PDF"}
    </button>
  );
}
