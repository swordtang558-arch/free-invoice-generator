// Supported currencies and money formatting helpers.

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "CAD", symbol: "CA$", label: "CAD — Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar" },
  { code: "JPY", symbol: "¥", label: "JPY — Japanese Yen" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
  { code: "CHF", symbol: "CHF", label: "CHF — Swiss Franc" },
  { code: "CNY", symbol: "¥", label: "CNY — Chinese Yuan" },
  { code: "SGD", symbol: "S$", label: "SGD — Singapore Dollar" },
];

/** Currencies with no minor unit (no decimal places). */
const ZERO_DECIMAL = new Set(["JPY"]);

export function getCurrency(code: string): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/**
 * Format a numeric amount as a money string for the given currency.
 * Uses Intl when available for correct grouping; falls back to a simple format.
 */
export function formatMoney(amount: number, code: string): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const fractionDigits = ZERO_DECIMAL.has(code) ? 0 : 2;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(safe);
  } catch {
    const { symbol } = getCurrency(code);
    return `${symbol}${safe.toFixed(fractionDigits)}`;
  }
}
