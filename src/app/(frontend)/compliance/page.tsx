import type { Metadata } from "next";

import Compliance from "@/components/Compliance";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partners from "@/components/Partners";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Governance, Compliance & Standards | Ashipa Electric",
  description: siteData.compliance.subtitle,
  alternates: { canonical: "/compliance" },
};

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <Compliance headingAs="h1" />
        {/* Who signs off on the work sits naturally next to how it is governed. */}
        <Partners />
      </main>
      <Footer />
    </>
  );
}
