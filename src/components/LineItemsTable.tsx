"use client";

import { Plus, Trash2 } from "lucide-react";
import type { LineItem } from "@/lib/types";
import { lineAmount } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { emptyLineItem } from "@/lib/defaults";

interface Props {
  items: LineItem[];
  currency: string;
  onChange: (items: LineItem[]) => void;
}

const cell =
  "w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export default function LineItemsTable({ items, currency, onChange }: Props) {
  function update(id: string, patch: Partial<LineItem>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function remove(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }

  function add() {
    onChange([...items, emptyLineItem()]);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        {/* Header row (hidden on mobile where rows stack). */}
        <div className="hidden grid-cols-[1fr_5rem_7rem_7rem_2.5rem] gap-2 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
          <span>Description</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Unit price</span>
          <span className="text-right">Amount</span>
          <span className="sr-only">Remove</span>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 gap-2 px-3 py-3 sm:grid-cols-[1fr_5rem_7rem_7rem_2.5rem] sm:items-center"
            >
              <div className="col-span-2 sm:col-span-1">
                <label className="sr-only">Description</label>
                <input
                  className={cell}
                  type="text"
                  placeholder="Item or service description"
                  value={item.description}
                  onChange={(e) =>
                    update(item.id, { description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-500 sm:hidden">
                  Qty
                </label>
                <input
                  className={`${cell} text-right`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={Number.isFinite(item.quantity) ? item.quantity : 0}
                  onChange={(e) =>
                    update(item.id, { quantity: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-500 sm:hidden">
                  Unit price
                </label>
                <input
                  className={`${cell} text-right`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={Number.isFinite(item.unitPrice) ? item.unitPrice : 0}
                  onChange={(e) =>
                    update(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end">
                <span className="text-xs text-slate-500 sm:hidden">Amount</span>
                <span className="text-right text-sm font-medium tabular-nums text-slate-900">
                  {formatMoney(lineAmount(item), currency)}
                </span>
              </div>

              <div className="col-span-2 flex justify-end sm:col-span-1 sm:justify-center">
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  disabled={items.length === 1}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Remove line item"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  <span className="sm:hidden">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-dashed border-brand-300 px-3 py-2 text-sm font-medium text-brand-700 transition hover:border-brand-500 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Add item
      </button>
    </div>
  );
}
