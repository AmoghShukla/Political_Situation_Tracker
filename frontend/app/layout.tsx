import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { AppProviders } from "@/providers/app-providers";
import { PwaRegister } from "@/components/tracker/pwa-register";
import { SiteFooter } from "@/components/tracker/site-footer";
import { SiteHeader } from "@/components/tracker/site-header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://maharashtra-promise-tracker.vercel.app"),
  title: {
    default: "Maharashtra NDA Promise & Performance Tracker",
    template: "%s | Maharashtra NDA Tracker"
  },
  description: "Evidence-backed public accountability ledger for Maharashtra NDA government promises, projects, budget implementation, and district outcomes.",
  keywords: ["Maharashtra", "NDA", "promise tracker", "manifesto", "budget", "governance", "public accountability"],
  openGraph: {
    title: "Maharashtra NDA Promise & Performance Tracker",
    description: "A non-partisan civic-tech dashboard for promises, budget spending, projects, evidence, and district development.",
    type: "website",
    url: "https://maharashtra-promise-tracker.vercel.app",
    siteName: "Maharashtra NDA Tracker"
  },
  twitter: {
    card: "summary_large_image",
    title: "Maharashtra NDA Promise & Performance Tracker",
    description: "Evidence-backed governance dashboard for Maharashtra 2024-2029."
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <PwaRegister />
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
}
