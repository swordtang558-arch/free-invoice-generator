"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Eye,
  Printer,
  RotateCcw,
  Save,
  ShieldCheck,
} from "lucide-react";
import type { InvoiceData } from "@/lib/types";
import { createDefaultInvoice } from "@/lib/defaults";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import { buildFilename } from "@/lib/pdf";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import PdfExportButton from "./PdfExportButton";

export default function InvoiceGenerator() {
  // null until mounted → avoids hydration mismatch from random ids / dates,
  // and lets us restore a saved draft before first paint of the tool.
  const [data, setData] = useState<InvoiceData | null>(null);
  const [savedTick, setSavedTick] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Restore draft (or seed defaults) once, on the client only.
  useEffect(() => {
    setData(loadDraft() ?? createDefaultInvoice());
  }, []);

  // Debounced autosave on every change.
  useEffect(() => {
    if (!data) return;
    const t = setTimeout(() => saveDraft(data), 600);
    return () => clearTimeout(t);
  }, [data]);

  const patch = useCallback((p: Partial<InvoiceData>) => {
    setData((prev) => (prev ? { ...prev, ...p } : prev));
  }, []);

  function handleManualSave() {
    if (!data) return;
    saveDraft(data);
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 1800);
  }

  function handleReset() {
    if (
      window.confirm(
        "Reset the invoice and clear the saved draft? This cannot be undone."
      )
    ) {
      clearDraft();
      setData(createDefaultInvoice());
    }
  }

  function handlePrint() {
    window.print();
  }

  if (!data) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-96 animate-pulse rounded-xl border border-slate-200 bg-white" />
        <div className="hidden h-96 animate-pulse rounded-xl border border-slate-200 bg-white lg:block" />
      </div>
    );
  }

  const filename = buildFilename(data.invoiceNumber, data.to.name);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: form (not printed) */}
      <div className="no-print order-2 space-y-5 lg:order-1">
        <InvoiceForm data={data} onChange={patch} />
      </div>

      {/* Right: preview + actions */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-20">
          {/* Action bar */}
          <div className="no-print mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PdfExportButton
                getElement={() => previewRef.current}
                filename={filename}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" aria-hidden />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleManualSave}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {savedTick ? (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                  ) : (
                    <Save className="h-4 w-4" aria-hidden />
                  )}
                  {savedTick ? "Saved" : "Save draft"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Reset
                </button>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              No watermark · No sign up · Your data never leaves your browser.
            </p>
          </div>

          {/* Mobile preview toggle */}
          <button
            type="button"
            onClick={() => setShowPreviewMobile((v) => !v)}
            className="no-print mb-3 flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 lg:hidden"
            aria-expanded={showPreviewMobile}
          >
            <span className="inline-flex items-center gap-2">
              <Eye className="h-4 w-4" aria-hidden />
              {showPreviewMobile ? "Hide preview" : "Show live preview"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showPreviewMobile ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>

          {/* Preview viewport — scrollable scaled paper */}
          <div
            className={`${
              showPreviewMobile ? "block" : "hidden"
            } overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-3 lg:block lg:max-h-[80vh]`}
          >
            {/* Scale the A4 paper down to fit narrow viewports while keeping
                the export crisp (export reads the unscaled DOM). */}
            <div className="invoice-preview-scale mx-auto w-fit">
              <div className="shadow-card">
                <InvoicePreview ref={previewRef} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
