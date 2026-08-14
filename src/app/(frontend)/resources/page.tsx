import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Resources from "@/components/Resources";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Technical Resources & Requests | Ashipa Electric",
  description: siteData.resources.subtitle,
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <Resources headingAs="h1" />
        {/* The form sits directly below the cards so a visitor who scrolled past
            the deep links can still submit without another navigation. */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
