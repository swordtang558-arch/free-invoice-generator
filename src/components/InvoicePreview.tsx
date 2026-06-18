"use client";

import { forwardRef } from "react";
import type { InvoiceData } from "@/lib/types";
import { computeTotals, lineAmount } from "@/lib/calculations";
import { formatMoney, getCurrency } from "@/lib/currency";

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function MultiLine({ text }: { text: string }) {
  if (!text) return null;
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line || " "}
        </span>
      ))}
    </>
  );
}

interface Props {
  data: InvoiceData;
}

/**
 * The printable invoice document. Styled with inline-friendly Tailwind so it
 * exports cleanly to PDF. This is the single source of truth for how the
 * downloaded PDF looks.
 */
const InvoicePreview = forwardRef<HTMLDivElement, Props>(function InvoicePreview(
  { data },
  ref
) {
  const totals = computeTotals(data);
  const { symbol } = getCurrency(data.currency);

  return (
    <div
      ref={ref}
      className="invoice-paper mx-auto p-[14mm] font-sans text-[12px] leading-relaxed text-slate-800"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          {data.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logo}
              alt=""
              className="h-16 w-16 flex-shrink-0 object-contain"
            />
          ) : null}
          <div>
            <p className="text-base font-bold text-slate-900">
              {data.from.name || "Your Company"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              <MultiLine text={data.from.address} />
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {data.from.email}
              {data.from.email && data.from.phone ? " · " : ""}
              {data.from.phone}
            </p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-700">
            Invoice
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            #{data.invoiceNumber || "—"}
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-8 flex justify-between gap-6 border-t border-slate-100 pt-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Bill to
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {data.to.name || "Client"}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            <MultiLine text={data.to.address} />
          </p>
          <p className="text-[11px] text-slate-500">{data.to.email}</p>
        </div>

        <div className="text-right text-[11px]">
          <div className="flex justify-between gap-6">
            <span className="text-slate-400">Invoice date</span>
            <span className="font-medium text-slate-700">
              {formatDate(data.invoiceDate)}
            </span>
          </div>
          <div className="mt-1 flex justify-between gap-6">
            <span className="text-slate-400">Due date</span>
            <span className="font-medium text-slate-700">
              {formatDate(data.dueDate)}
            </span>
          </div>
          <div className="mt-3 flex justify-between gap-6">
            <span className="text-slate-400">Amount due</span>
            <span className="text-sm font-bold text-slate-900">
              {formatMoney(totals.total, data.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Items table */}
      <table className="mt-8 w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-slate-50 text-left text-[10px] uppercase tracking-wide text-slate-500">
            <th className="rounded-l-md px-3 py-2 font-semibold">Description</th>
            <th className="px-3 py-2 text-right font-semibold">Qty</th>
            <th className="px-3 py-2 text-right font-semibold">Unit price</th>
            <th className="rounded-r-md px-3 py-2 text-right font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 align-top">
              <td className="px-3 py-2.5 text-slate-700">
                {item.description || (
                  <span className="text-slate-300">Item description</span>
                )}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">
                {item.quantity}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">
                {formatMoney(item.unitPrice, data.currency)}
              </td>
              <td className="px-3 py-2.5 text-right font-medium tabular-nums text-slate-800">
                {formatMoney(lineAmount(item), data.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-6 flex justify-end">
        <div className="w-64 text-[11px]">
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Subtotal</span>
            <span className="tabular-nums text-slate-700">
              {formatMoney(totals.subtotal, data.currency)}
            </span>
          </div>
          {totals.discountAmount > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-slate-500">
                Discount
                {data.discountMode === "percent"
                  ? ` (${data.discountValue}%)`
                  : ""}
              </span>
              <span className="tabular-nums text-slate-700">
                −{formatMoney(totals.discountAmount, data.currency)}
              </span>
            </div>
          )}
          {data.taxPercent > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Tax ({data.taxPercent}%)</span>
              <span className="tabular-nums text-slate-700">
                {formatMoney(totals.taxAmount, data.currency)}
              </span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t-2 border-slate-200 pt-2">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-sm font-bold tabular-nums text-brand-700">
              {formatMoney(totals.total, data.currency)}
            </span>
          </div>
          <p className="mt-1 text-right text-[10px] text-slate-400">
            All amounts in {data.currency} ({symbol})
          </p>
        </div>
      </div>

      {/* Notes */}
      {data.notes ? (
        <div className="mt-10 border-t border-slate-100 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Notes
          </p>
          <p className="mt-1 text-[11px] text-slate-600">
            <MultiLine text={data.notes} />
          </p>
        </div>
      ) : null}

      <p className="mt-10 text-center text-[10px] text-slate-400">
        Thank you for your business.
      </p>
    </div>
  );
});

export default InvoicePreview;
