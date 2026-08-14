"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Download,
  FileSearch,
  Handshake,
  LineChart,
  PlugZap,
  Radio,
} from "lucide-react";

import { siteData } from "@/content/siteData";
import { enquiryHref } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

/**
 * Keyed by request type rather than by array position so reordering the
 * resources in siteData cannot silently reassign the icons.
 */
const iconMap: Record<string, React.ReactNode> = {
  "ci-feasibility": <LineChart className="h-6 w-6" />,
  "energy-audit": <ClipboardCheck className="h-6 w-6" />,
  "epc-om": <FileSearch className="h-6 w-6" />,
  "ev-charging": <PlugZap className="h-6 w-6" />,
  "remote-monitoring": <Radio className="h-6 w-6" />,
  "minigrid-partnership": <Handshake className="h-6 w-6" />,
};

export default function Resources({
  /** `h1` when this section is the whole page, `h2` when it is one of many. */
  headingAs = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
  const { resources } = siteData;

  // Assigned outside the JSX so the component reference is stable across
  // renders — building it inline would remount the heading on every render.
  const MotionHeading = headingAs === "h1" ? motion.h1 : motion.h2;

  return (
    <section
      id="resources"
      className="border-y border-brand-teal-100/30 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700"
          >
            {resources.eyebrow}
          </motion.span>
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display font-extrabold tracking-tight text-brand-teal-950 ${
              headingAs === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {resources.title}
          </MotionHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-brand-teal-900/80"
          >
            {resources.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.items.map((item, index) => {
            const isDownload = item.kind === "download";
            const href = isDownload
              ? (item.file ?? "#")
              : enquiryHref(item.requestType);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
                className="group flex flex-col justify-between rounded-sm border border-brand-teal-100/40 bg-[#f6f5fa] p-7 transition-all duration-300 hover:border-brand-teal-200/70 hover:shadow-lg"
              >
                <div>
                  <div className="mb-5 inline-flex rounded-sm border border-brand-teal-200/40 bg-white p-3 text-brand-red-500">
                    {(item.requestType && iconMap[item.requestType]) ?? (
                      <Download className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold leading-snug tracking-tight text-brand-teal-950">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-brand-teal-900/80">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={href}
                  {...(isDownload ? { download: true } : {})}
                  onClick={() =>
                    trackEvent("resource_requested", {
                      resource: item.title,
                      kind: item.kind,
                      requestType: item.requestType,
                    })
                  }
                  className="inline-flex items-center gap-1.5 border-t border-brand-teal-100 pt-5 text-xs font-bold uppercase tracking-wider text-brand-teal-700 transition-colors group-hover:text-brand-red-600"
                >
                  {isDownload ? "Download" : "Request this"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Sets the expectation the enquiry form's confirmation message repeats,
            so the commitment is visible before anyone fills anything in. */}
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-brand-teal-900/70">
          Every request is read by an engineer, not a mailbox. Tell us what you are
          running today and we will come back within two business days with the
          scope, what we need from you, and what it costs.
        </p>
      </div>
    </section>
  );
}
