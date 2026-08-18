"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck2 } from "lucide-react";

import { siteData } from "@/content/siteData";

export default function Compliance({
  /** `h1` when this section is the whole page, `h2` when it is one of many. */
  headingAs = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
  const { compliance } = siteData;

  // Assigned outside the JSX so the component reference is stable across
  // renders — building it inline would remount the heading on every render.
  const MotionHeading = headingAs === "h1" ? motion.h1 : motion.h2;

  // Unverified claims never reach the page. See the note in siteData.ts.
  const frameworks = compliance.frameworks.filter(
    (item) => item.status === "verified",
  );

  if (frameworks.length === 0) return null;

  return (
    <section
      id="compliance"
      className="py-24 bg-brand-teal-950 text-white border-y border-brand-teal-900/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32 lg:self-start">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-wider text-brand-red-400 block"
            >
              {compliance.eyebrow}
            </motion.span>
            <MotionHeading
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-extrabold font-display tracking-tight ${
                headingAs === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
              }`}
            >
              {compliance.title}
            </MotionHeading>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-teal-200/80 leading-relaxed"
            >
              {compliance.subtitle}
            </motion.p>

            {/* Not decoration: a signposted site naming the client, developer,
                and consultant is the most ordinary evidence there is that a
                project was disclosed and delivered under agreement. */}
            <figure className="m-0 pt-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-white/10">
                <Image
                  src="/images/project-dobi-site.png"
                  alt="Project signboard at the 95 kWp Dobi solar mini-grid, naming Dobi-Agrico as client, Ashipa Electric as developer, and CeeSolar as consultant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-[11px] leading-relaxed text-brand-teal-200/50">
                95 kWp Dobi solar mini-grid — client, developer, and consultant
                declared on site.
              </figcaption>
            </figure>

          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-px bg-brand-teal-900/60 border border-brand-teal-900/60 rounded-sm overflow-hidden">
              {frameworks.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-brand-teal-950 p-7 space-y-3 hover:bg-brand-teal-900/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <ShieldCheck className="w-6 h-6 text-brand-green-400 shrink-0" />
                    {item.reference && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-teal-200/60 bg-white/5 px-2 py-1 rounded-sm">
                        {item.reference}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-teal-200/75 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 text-xs text-brand-teal-200/60 bg-white/[0.03] border border-white/10 px-5 py-4 rounded-sm">
              <FileCheck2 className="w-4 h-4 shrink-0 mt-0.5 text-brand-green-400" />
              <p className="leading-relaxed">
                Environmental and social clearances are secured from the relevant
                regulators <strong className="text-white/90">before</strong> construction
                mobilises on any site. Permit status, grievance records, and HSE reports
                are maintained per project and available to lenders on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
