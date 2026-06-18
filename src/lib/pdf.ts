// Client-only PDF export. html2pdf.js (jsPDF + html2canvas) is imported
// dynamically so it never lands in the SSG/server bundle.
//
// Library choice: html2pdf.js renders the exact preview DOM, guaranteeing the
// PDF matches what the user sees. We export at scale 2 so text stays crisp
// rather than blurry. (A hand-built jsPDF text layout would be sharper still
// but could not keep pixel parity with the live preview.)

function sanitizeFilename(value: string): string {
  return (
    value
      .replace(/[\\/:*?"<>|]+/g, "-") // illegal filename chars
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "invoice"
  );
}

export function buildFilename(invoiceNumber: string, clientName: string): string {
  const num = sanitizeFilename(invoiceNumber || "0001");
  const client = sanitizeFilename(clientName || "client");
  return `Invoice-${num}-${client}.pdf`;
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2pdf = (await import("html2pdf.js")).default;

  await html2pdf()
    .set({
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // >= 2x so text is sharp, never blurry
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .save();
}
