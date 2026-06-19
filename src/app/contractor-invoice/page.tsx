import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  // Absolute title to avoid the layout's "— Free Invoice Generator" suffix
  // doubling up the keyword.
  title: { absolute: "Free Contractor Invoice Generator (No Sign Up)" },
  description:
    "Create professional contractor invoices for free. Bill for labor, materials, and milestones, add tax, and download a clean PDF in seconds — no sign up, no watermark.",
  alternates: { canonical: "/contractor-invoice" },
  openGraph: {
    title: "Free Contractor Invoice Generator",
    description:
      "Invoice for labor, materials, and milestones with a professional, no-watermark PDF. Free, private, no sign up.",
    url: "/contractor-invoice",
  },
};

export default function ContractorInvoicePage() {
  return (
    <LandingPage
      eyebrow="For contractors & trades"
      title="Free contractor invoice generator"
      intro="Whether you run a one-person trade or a small crew, billing should be the easy part of the job. Create a professional contractor invoice for labor, materials, and milestones, add tax, and download a clean PDF on site or at the office — free, private, no sign up."
      checklistTitle="What a contractor invoice should include"
      checklist={[
        "Your business name, license number, and contact details",
        "The client and the job or site address",
        "A unique invoice number and the invoice date",
        "Payment due date and accepted payment methods",
        "Labor lines with hours and rates",
        "Materials and equipment, itemized with quantities",
        "Subtotal, sales tax, and the total due",
        "Deposit or milestone terms, plus any warranty note",
      ]}
      sections={[
        {
          heading: "Invoice for labor and materials in one place",
          paragraphs: [
            "Contractor invoices usually mix two kinds of charges: the work itself and the materials it took to do it. Add a line for each — hours of labor at your rate, and each material or piece of equipment with its quantity and price. Every line total and the grand total are calculated automatically, so a long materials list never turns into a math error.",
            "Add a tax percentage for the labor and materials that are taxable in your area, and the tax amount is worked out for you. Choose your currency, and the whole invoice formats to match.",
          ],
        },
        {
          heading: "Deposits, progress payments, and milestones",
          paragraphs: [
            "Larger jobs are rarely paid in one lump sum. Use the notes and terms field to spell out deposit requirements, progress-payment schedules, or milestone billing — for example, a deposit up front, a payment at rough-in, and the balance on completion. Issue a separate, clearly numbered invoice for each stage so both you and the client can track what's been paid.",
            "Setting an explicit due date on every invoice keeps cash flow predictable. A clear \"payment due by\" date is far more effective than a vague \"due on receipt.\"",
          ],
        },
        {
          heading: "Professional invoices from the truck or the office",
          paragraphs: [
            "Because the tool runs entirely in your browser, you can put an invoice together on a phone between jobs or on a laptop back at the office — no app to install, no account, and no data leaving your device. Add your logo and license number so the document looks official and builds trust with the client.",
            "When it's ready, download a clean PDF with no watermark and send it on. That's it — no subscription, no per-invoice fee.",
          ],
        },
      ]}
      related={[
        { href: "/freelancer-invoice", label: "Freelancer invoice generator" },
        { href: "/", label: "Free invoice generator (home)" },
        { href: "/#faq", label: "Invoicing FAQ" },
      ]}
    />
  );
}
