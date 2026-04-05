import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://checkit-demo.example.com"),
  title: {
    default: "Checkit — Content Explorer",
    template: "%s | Checkit"
  },
  description:
    "Checkit is a polished content explorer for discovering and filtering products with a fast, shareable browsing experience.",
  openGraph: {
    title: "Checkit — Content Explorer",
    description:
      "Browse, search, and filter products with a performant Next.js content explorer.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
