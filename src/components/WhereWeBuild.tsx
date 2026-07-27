"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

// Tailwind needs the full class names present in the source, so the three
// logo colours are mapped explicitly rather than interpolated.
const accentStyles = {
  purple: {
    bar: "bg-brand-teal-700",
    badge: "bg-brand-teal-700/15 text-brand-teal-300 border-brand-teal-300/30",
    ring: "group-hover:border-brand-teal-400/60",
  },
  green: {
    bar: "bg-brand-green-500",
    badge: "bg-brand-green-500/15 text-brand-green-300 border-brand-green-300/30",
    ring: "group-hover:border-brand-green-400/60",
  },
  red: {
    bar: "bg-brand-red-500",
    badge: "bg-brand-red-500/15 text-brand-red-300 border-brand-red-300/30",
    ring: "group-hover:border-brand-red-400/60",
  },
} as const;

export default function WhereWeBuild() {
  const data = siteData.whereWeBuild;

  return (
    <section id="where-we-build" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div className="max-w-3xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-widest text-brand-teal-700 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-brand-green-600" />
              {data.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-teal-950"
            >
              {data.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-brand-teal-900/80 leading-relaxed"
            >
              {data.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-brand-green-600 text-white font-bold px-5 py-3 rounded-sm hover:bg-brand-green-700 active:scale-95 transition-all text-sm tracking-wide shadow-md shadow-brand-green-500/10"
            >
              Discuss a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Environment Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {data.environments.map((env, index) => {
            const accent = accentStyles[env.accent];

            return (
              <motion.article
                key={env.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-sm border border-brand-teal-100/40 bg-brand-teal-950 shadow-sm hover:shadow-xl transition-all duration-300 ${accent.ring}`}
              >
                {/* Photograph */}
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={env.image}
                    alt={env.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Legibility gradient for the caption block */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-teal-950 via-brand-teal-950/60 to-brand-teal-950/5" />
                </div>

                {/* Accent rule in one of the three logo colours */}
                <span className={`absolute top-0 left-0 h-1 w-24 ${accent.bar}`} />

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-3">
                  <span
                    className={`inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 border rounded-sm backdrop-blur-sm ${accent.badge}`}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                    {env.name}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed max-w-xl">
                    {env.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
