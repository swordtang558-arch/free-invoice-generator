// FAQ content shared by the on-page accordion and FAQPage structured data.

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this invoice generator really free?",
    answer:
      "Yes. You can create unlimited invoices and download professional PDFs for free — no account, no trial, and no watermark on your invoices.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No sign up is required. Open the page, fill in the form, and download your invoice. There is nothing to register and no email to confirm.",
  },
  {
    question: "Is my invoice data private?",
    answer:
      "Completely. Everything runs inside your browser. Your invoice details, your logo, and your client information are never uploaded to any server — your data never leaves your device.",
  },
  {
    question: "Will my downloaded invoice have a watermark?",
    answer:
      "No. The PDF you download is clean and professional, with no watermark and no 'made with' branding.",
  },
  {
    question: "Can I add my company logo?",
    answer:
      "Yes. Upload your logo and it appears on the invoice. The image is read locally in your browser and embedded into the PDF — it is never sent anywhere.",
  },
  {
    question: "What currencies and taxes are supported?",
    answer:
      "You can choose from major currencies including USD, EUR, GBP, CAD, AUD, JPY and more. You can also add a tax percentage and an optional discount, and all totals are calculated automatically.",
  },
  {
    question: "Can I save my invoice and edit it later?",
    answer:
      "Yes. Your work is automatically saved as a draft in your browser, so you can refresh or come back later and continue where you left off on the same device.",
  },
];
