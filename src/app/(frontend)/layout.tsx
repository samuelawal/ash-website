import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import TraceIQPageViews from "@/components/TraceIQPageViews";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves the relative OG/Twitter image paths on article pages to absolute
  // URLs. Without it Next falls back to localhost and shared links show no image.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ashipaelectric.com",
  ),
  title: "Ashipa Electric | Intelligent Decentralized Energy Infrastructure",
  description: "Ashipa Electric develops clean energy infrastructure—utility-scale solar, distributed energy, commercial & industrial solar, and battery storage—to power African growth.",
  keywords: ["Ashipa Electric", "Distributed Energy Africa", "Distributed Energy Nigeria", "C&I Solar Nigeria", "Renewable Energy Nigeria", "Rural Electrification", "Utility Scale Solar Africa", "C&I Solar Lagos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#faf9fd] text-[#0d0b1a]">
        {/* Renders nothing; reads useSearchParams, so it needs its own boundary
            to keep the rest of the tree prerenderable. */}
        <Suspense fallback={null}>
          <TraceIQPageViews />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
