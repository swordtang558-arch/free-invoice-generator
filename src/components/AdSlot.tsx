// Adsense slot — placeholder only. Enable in Phase 2 by replacing the inner
// markup with the real <ins class="adsbygoogle"> tag and loading the AdSense
// script (gated on NEXT_PUBLIC_ADSENSE_CLIENT). Kept as a semantic, reserved
// container in Phase 1 so layout (and CLS) stays stable when ads turn on.

export default function AdSlot({ label = "Advertisement" }: { label?: string }) {
  // In Phase 1 we render nothing visible to avoid affecting UX / review.
  // The wrapper documents intent and reserves a named insertion point.
  return (
    <aside
      aria-hidden
      data-ad-slot="phase-2"
      data-ad-label={label}
      className="hidden"
    >
      {/* Adsense slot — enable in phase 2 */}
    </aside>
  );
}
