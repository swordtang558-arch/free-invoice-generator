import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Free Invoice Generator — Create Invoices Online (No Sign Up)",
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "free invoice generator",
    "create invoice online",
    "invoice maker",
    "invoice template",
    "download invoice pdf",
    "no sign up invoice",
    "freelancer invoice",
    "contractor invoice",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Free Invoice Generator — Create Invoices Online (No Sign Up)",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator — Create Invoices Online (No Sign Up)",
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: { index: true, follow: true },
  // Google Search Console verification (set NEXT_PUBLIC_GSC_VERIFICATION in Phase 2).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/*
          Google Analytics slot — enable in Phase 2 by setting NEXT_PUBLIC_GA_ID.
          Intentionally not loaded in Phase 1 to keep the page dependency-free.
        */}
      </body>
    </html>
  );
}
