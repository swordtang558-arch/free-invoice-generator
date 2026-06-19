"use client";

import { lineAmount } from "@/lib/calculations";
import { formatMoney, getCurrency } from "@/lib/currency";
import { formatDate, MultiLine, type TemplateProps } from "./shared";

// Modern: a filled brand header band, accent invoice number, and a clean
// tabular body. More color and confidence than Classic.
export default function ModernTemplate({ data, totals }: TemplateProps) {
  const { symbol } = getCurrency(data.currency);

  return (
    <div className="text-[12px] leading-relaxed text-slate-800">
      {/* Header band */}
      <div className="bg-brand-900 px-[14mm] py-[10mm] text-white">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            {data.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.logo}
                alt=""
                className="h-14 w-14 flex-shrink-0 rounded-md bg-white/90 object-contain p-1"
              />
            ) : null}
            <div>
              <p className="text-base font-bold">
                {data.from.name || "Your Company"}
              </p>
              <p className="mt-1 text-[11px] text-brand-100">
                <MultiLine text={data.from.address} />
              </p>
              <p className="mt-1 text-[11px] text-brand-100">
                {data.from.email}
                {data.from.email && data.from.phone ? " · " : ""}
                {data.from.phone}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
              Invoice
            </h2>
            <p className="mt-1 text-[11px] font-semibold tracking-wide text-accent-300">
              #{data.invoiceNumber || "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-[14mm] py-[10mm]">
        {/* Meta row */}
        <div className="flex justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
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
          <div className="rounded-lg bg-slate-50 px-4 py-3 text-right text-[11px]">
            <div className="flex justify-between gap-8">
              <span className="text-slate-400">Invoice date</span>
              <span className="font-medium text-slate-700">
                {formatDate(data.invoiceDate)}
              </span>
            </div>
            <div className="mt-1 flex justify-between gap-8">
              <span className="text-slate-400">Due date</span>
              <span className="font-medium text-slate-700">
                {formatDate(data.dueDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <table className="mt-8 w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-brand-600 text-left text-[10px] uppercase tracking-wide text-white">
              <th className="rounded-l-md px-3 py-2.5 font-semibold">
                Description
              </th>
              <th className="px-3 py-2.5 text-right font-semibold">Qty</th>
              <th className="px-3 py-2.5 text-right font-semibold">Unit price</th>
              <th className="rounded-r-md px-3 py-2.5 text-right font-semibold">
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
                <td className="px-3 py-2.5 text-right font-medium tabular-nums text-slate-900">
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
            <div className="mt-2 flex items-center justify-between rounded-md bg-brand-900 px-3 py-2 text-white">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-100">
                Total
              </span>
              <span className="font-display text-lg font-bold tabular-nums text-white">
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
          <div className="mt-10 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
              Notes
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              <MultiLine text={data.notes} />
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
