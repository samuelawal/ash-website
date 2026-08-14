import type { Metadata } from "next";

import EvCharging from "@/components/EvCharging";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "EV Charging Infrastructure | Ashipa Electric",
  description: siteData.ev.subtitle,
  alternates: { canonical: "/ev-charging" },
};

export default function EvChargingPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <EvCharging />
      </main>
      <Footer />
    </>
  );
}
