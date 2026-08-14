/**
 * DISABLED — the remote monitoring page is parked for now.
 *
 * The leading underscore makes this a Next private folder, so nothing here is
 * routable and /monitoring returns a 404. The page is otherwise intact and
 * untouched.
 *
 * To bring it back:
 *   1. Rename this folder from `_monitoring` back to `monitoring`.
 *   2. Restore the commented-out entries marked `MONITORING DISABLED` in
 *      src/app/(frontend)/page.tsx, src/app/(frontend)/sitemap.ts, and
 *      src/content/siteData.ts (nav children, footer services, resources).
 *   3. Point the "Energy Monitoring" offering's `link` back at "/monitoring".
 */
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MonitoringDashboard from "@/components/MonitoringDashboard";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Remote Monitoring & SCADA | Ashipa Electric",
  description: siteData.monitoring.subtitle,
  alternates: { canonical: "/monitoring" },
};

export default function MonitoringPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <MonitoringDashboard headingAs="h1" />
      </main>
      <Footer />
    </>
  );
}
