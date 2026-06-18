"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import type { AmountMode, InvoiceData, LineItem } from "@/lib/types";
import { CURRENCIES } from "@/lib/currency";
import LineItemsTable from "./LineItemsTable";

interface Props {
  data: InvoiceData;
  onChange: (patch: Partial<InvoiceData>) => void;
}

const input =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "mb-1 block text-xs font-medium text-slate-600";
const sectionTitle =
  "text-sm font-semibold uppercase tracking-wide text-slate-500";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card sm:p-5">
      <h3 className={sectionTitle}>{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

const MAX_LOGO_BYTES = 1_500_000; // ~1.5MB guard before base64 inflation

export default function InvoiceForm({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleLogo(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (PNG, JPG, SVG).");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      alert("That image is a bit large — please use one under 1.5 MB.");
      return;
    }
    // Read locally as a base64 data URL. Nothing is uploaded.
    const reader = new FileReader();
    reader.onload = () => onChange({ logo: String(reader.result) });
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-5">
      {/* From + logo */}
      <Section title="Your details (From)">
        <div className="flex items-start gap-4">
          <div>
            <span className={label}>Logo</span>
            {data.logo ? (
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.logo}
                  alt="Your logo"
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => onChange({ logo: null })}
                  className="absolute right-1 top-1 rounded-full bg-white/90 p-0.5 text-slate-500 shadow hover:text-red-600"
                  aria-label="Remove logo"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 text-slate-400 transition hover:border-brand-400 hover:text-brand-500"
              >
                <ImagePlus className="h-5 w-5" aria-hidden />
                <span className="text-[10px]">Add logo</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleLogo(e.target.files?.[0])}
            />
          </div>

          <div className="flex-1">
            <label className={label}>Name *</label>
            <input
              className={input}
              type="text"
              placeholder="Your company or name"
              value={data.from.name}
              onChange={(e) =>
                onChange({ from: { ...data.from, name: e.target.value } })
              }
            />
          </div>
        </div>

        <div>
          <label className={label}>Address</label>
          <textarea
            className={input}
            rows={2}
            placeholder="Street, city, postal code"
            value={data.from.address}
            onChange={(e) =>
              onChange({ from: { ...data.from, address: e.target.value } })
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Email</label>
            <input
              className={input}
              type="email"
              placeholder="you@company.com"
              value={data.from.email}
              onChange={(e) =>
                onChange({ from: { ...data.from, email: e.target.value } })
              }
            />
          </div>
          <div>
            <label className={label}>Phone</label>
            <input
              className={input}
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={data.from.phone}
              onChange={(e) =>
                onChange({ from: { ...data.from, phone: e.target.value } })
              }
            />
          </div>
        </div>
      </Section>

      {/* Bill to */}
      <Section title="Client details (Bill to)">
        <div>
          <label className={label}>Client name *</label>
          <input
            className={input}
            type="text"
            placeholder="Client company or name"
            value={data.to.name}
            onChange={(e) =>
              onChange({ to: { ...data.to, name: e.target.value } })
            }
          />
        </div>
        <div>
          <label className={label}>Address</label>
          <textarea
            className={input}
            rows={2}
            placeholder="Street, city, postal code"
            value={data.to.address}
            onChange={(e) =>
              onChange({ to: { ...data.to, address: e.target.value } })
            }
          />
        </div>
        <div>
          <label className={label}>Email</label>
          <input
            className={input}
            type="email"
            placeholder="client@example.com"
            value={data.to.email}
            onChange={(e) =>
              onChange({ to: { ...data.to, email: e.target.value } })
            }
          />
        </div>
      </Section>

      {/* Invoice meta */}
      <Section title="Invoice details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Invoice number</label>
            <input
              className={input}
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => onChange({ invoiceNumber: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Invoice date</label>
            <input
              className={input}
              type="date"
              value={data.invoiceDate}
              onChange={(e) => onChange({ invoiceDate: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Due date</label>
            <input
              className={input}
              type="date"
              value={data.dueDate}
              onChange={(e) => onChange({ dueDate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className={label}>Currency</label>
          <select
            className={input}
            value={data.currency}
            onChange={(e) => onChange({ currency: e.target.value })}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </Section>

      {/* Line items */}
      <Section title="Items">
        <LineItemsTable
          items={data.items}
          currency={data.currency}
          onChange={(items: LineItem[]) => onChange({ items })}
        />
      </Section>

      {/* Tax & discount */}
      <Section title="Tax & discount">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Tax rate (%)</label>
            <input
              className={input}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={Number.isFinite(data.taxPercent) ? data.taxPercent : 0}
              onChange={(e) =>
                onChange({ taxPercent: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div>
            <label className={label}>Discount</label>
            <div className="flex gap-2">
              <input
                className={`${input} flex-1`}
                type="number"
                min={0}
                step="any"
                inputMode="decimal"
                value={
                  Number.isFinite(data.discountValue) ? data.discountValue : 0
                }
                onChange={(e) =>
                  onChange({ discountValue: parseFloat(e.target.value) || 0 })
                }
              />
              <select
                className={`${input} w-28`}
                value={data.discountMode}
                onChange={(e) =>
                  onChange({ discountMode: e.target.value as AmountMode })
                }
              >
                <option value="percent">%</option>
                <option value="fixed">{data.currency}</option>
              </select>
            </div>
          </div>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Notes & payment terms">
        <textarea
          className={input}
          rows={3}
          placeholder="e.g. Payment due within 30 days. Bank transfer to…"
          value={data.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </Section>
    </div>
  );
}
