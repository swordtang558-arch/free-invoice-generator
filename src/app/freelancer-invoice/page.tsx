import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  // Absolute title to avoid the layout's "— Free Invoice Generator" suffix
  // doubling up the keyword.
  title: { absolute: "Free Freelancer Invoice Generator (No Sign Up)" },
  description:
    "Create professional freelancer invoices for free. Bill hourly or per project, add taxes, and download a clean PDF in seconds — no sign up, no watermark.",
  alternates: { canonical: "/freelancer-invoice" },
  openGraph: {
    title: "Free Freelancer Invoice Generator",
    description:
      "Bill clients in minutes with a professional, no-watermark invoice. Free, private, no sign up.",
    url: "/freelancer-invoice",
  },
};

export default function FreelancerInvoicePage() {
  return (
    <LandingPage
      eyebrow="For freelancers"
      title="Free invoice generator built for freelancers"
      intro="Stop fighting word processor templates every time a project wraps. Create a polished freelancer invoice, bill by the hour or by the project, and download a clean PDF in under a minute — free, private, and without a single watermark."
      checklistTitle="What every freelancer invoice should include"
      checklist={[
        "Your name or business name and contact details",
        "Your client's name and billing address",
        "A unique invoice number and the invoice date",
        "A clear payment due date (e.g. net 14 or net 30)",
        "Itemized work — hours or deliverables with rates",
        "Subtotal, any tax, and the total amount due",
        "Accepted payment methods and bank or PayPal details",
        "A short thank-you or payment terms note",
      ]}
      sections={[
        {
          heading: "Invoicing as a freelancer, without the busywork",
          paragraphs: [
            "When you freelance, every hour spent on admin is an hour you can't bill. A good invoice should take two minutes, not twenty. This tool keeps a live preview next to the form so you can see exactly what your client will receive while you type, then export it as a professional PDF when you're done.",
            "Because everything runs in your browser, there's no account to create and nothing to upload. Your rates, your client list, and your earnings stay entirely on your own device — which matters when you're handling sensitive financial details for multiple clients.",
          ],
        },
        {
          heading: "Bill hourly or per project",
          paragraphs: [
            "Add a line item for each chunk of work. For hourly work, set the quantity to the number of hours and the unit price to your rate; for fixed-scope projects, use a single line with a quantity of one. The amount column and the running total update automatically, so the math is never your problem.",
            "Need to add sales tax, VAT, or GST? Enter a tax percentage and it's calculated for you. Offering a returning-client discount? Apply it as a percentage or a flat amount before tax. Pick from major currencies including USD, EUR, GBP, CAD, and AUD so the invoice fits wherever your clients are.",
          ],
        },
        {
          heading: "Look established, get paid faster",
          paragraphs: [
            "Clients pay clear, professional invoices faster than messy ones. Add your logo, use consistent invoice numbers, and always set a due date — a specific date gives the invoice a deadline rather than leaving payment open-ended. A clean document signals that you take your business seriously, and that you expect to be paid on time.",
            "When the invoice is ready, download the PDF and send it straight to your client. There's no watermark, no \"made with\" footer, and no upsell — just your invoice.",
          ],
        },
      ]}
      related={[
        { href: "/contractor-invoice", label: "Contractor invoice generator" },
        { href: "/", label: "Free invoice generator (home)" },
        { href: "/#faq", label: "Invoicing FAQ" },
      ]}
    />
  );
}
