"use client";

import { lineAmount } from "@/lib/calculations";
import { formatMoney, getCurrency } from "@/lib/currency";
import { formatDate, MultiLine, type TemplateProps } from "./shared";

// Minimal: monochrome, hairline rules, generous whitespace. No fills, no color
// beyond ink-on-paper. Quietly elegant.
export default function MinimalTemplate({ data, totals }: TemplateProps) {
  const { symbol } = getCurrency(data.currency);

  return (
    <div className="p-[16mm] text-[12px] font-light leading-relaxed text-slate-700">
      {/* Header */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-3">
          {data.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logo}
              alt=""
              className="h-12 w-12 flex-shrink-0 object-contain"
            />
          ) : null}
          <p className="text-lg font-medium tracking-tight text-slate-900">
            {data.from.name || "Your Company"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
            Invoice
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            #{data.invoiceNumber || "—"}
          </p>
        </div>
      </div>

      <div className="mt-2 h-px w-full bg-slate-200" />

      {/* Meta */}
      <div className="mt-8 grid grid-cols-2 gap-8 text-[11px]">
        <div>
          <p className="uppercase tracking-[0.2em] text-slate-400">From</p>
          <p className="mt-2 text-slate-600">
            <MultiLine text={data.from.address} />
          </p>
          <p className="text-slate-600">
            {data.from.email}
            {data.from.email && data.from.phone ? " · " : ""}
            {data.from.phone}
          </p>
          <p className="mt-4 uppercase tracking-[0.2em] text-slate-400">
            Billed to
          </p>
          <p className="mt-2 font-medium text-slate-900">
            {data.to.name || "Client"}
          </p>
          <p className="text-slate-600">
            <MultiLine text={data.to.address} />
          </p>
          <p className="text-slate-600">{data.to.email}</p>
        </div>
        <div className="text-right">
          <p className="uppercase tracking-[0.2em] text-slate-400">
            Invoice date
          </p>
          <p className="mt-1 text-slate-900">{formatDate(data.invoiceDate)}</p>
          <p className="mt-3 uppercase tracking-[0.2em] text-slate-400">
            Due date
          </p>
          <p className="mt-1 text-slate-900">{formatDate(data.dueDate)}</p>
        </div>
      </div>

      {/* Items */}
      <table className="mt-10 w-full border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-slate-300 text-left uppercase tracking-[0.15em] text-slate-400">
            <th className="py-2 font-normal">Description</th>
            <th className="py-2 text-right font-normal">Qty</th>
            <th className="py-2 text-right font-normal">Price</th>
            <th className="py-2 text-right font-normal">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 align-top">
              <td className="py-3 text-slate-700">
                {item.description || (
                  <span className="text-slate-300">Item description</span>
                )}
              </td>
              <td className="py-3 text-right tabular-nums text-slate-500">
                {item.quantity}
              </td>
              <td className="py-3 text-right tabular-nums text-slate-500">
                {formatMoney(item.unitPrice, data.currency)}
              </td>
              <td className="py-3 text-right tabular-nums text-slate-900">
                {formatMoney(lineAmount(item), data.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-8 flex justify-end">
        <div className="w-64 text-[11px]">
          <div className="flex justify-between py-1 text-slate-500">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatMoney(totals.subtotal, data.currency)}
            </span>
          </div>
          {totals.discountAmount > 0 && (
            <div className="flex justify-between py-1 text-slate-500">
              <span>
                Discount
                {data.discountMode === "percent"
                  ? ` (${data.discountValue}%)`
                  : ""}
              </span>
              <span className="tabular-nums">
                −{formatMoney(totals.discountAmount, data.currency)}
              </span>
            </div>
          )}
          {data.taxPercent > 0 && (
            <div className="flex justify-between py-1 text-slate-500">
              <span>Tax ({data.taxPercent}%)</span>
              <span className="tabular-nums">
                {formatMoney(totals.taxAmount, data.currency)}
              </span>
            </div>
          )}
          <div className="mt-3 flex items-baseline justify-between border-t border-slate-300 pt-3">
            <span className="uppercase tracking-[0.2em] text-slate-400">
              Total
            </span>
            <span className="text-base font-medium tabular-nums text-slate-900">
              {formatMoney(totals.total, data.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes ? (
        <div className="mt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Notes
          </p>
          <p className="mt-2 text-[11px] text-slate-600">
            <MultiLine text={data.notes} />
          </p>
        </div>
      ) : null}

      <p className="mt-12 text-[10px] tracking-wide text-slate-400">
        All amounts in {data.currency} ({symbol})
      </p>
    </div>
  );
}
