import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq";

// Server component — pure markup so it's crawlable and ships zero JS.
// Uses native <details>/<summary> for the accordion behaviour.
export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-slate-200 bg-white p-4 shadow-card open:ring-1 open:ring-brand-100"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-slate-900">
            {item.question}
            <ChevronDown
              className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
