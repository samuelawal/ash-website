"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Heart, GraduationCap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

const highlightIcons = [Heart, GraduationCap, Globe];

export default function CareersPreview() {
  const { careersPreview, careers } = siteData;
  const openRoles = careers.items.length;

  return (
    <section id="careers" className="py-24 bg-white border-y border-brand-teal-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 block"
            >
              {careersPreview.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-teal-950"
            >
              {careersPreview.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-brand-teal-900/80 leading-relaxed"
            >
              {careersPreview.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href={careersPreview.ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-brand-teal-950 text-white font-bold px-6 py-3.5 rounded-sm hover:bg-brand-teal-900 transition-colors text-sm tracking-wide shadow-md"
              >
                {careersPreview.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-brand-teal-200 text-brand-teal-950 font-bold px-6 py-3.5 rounded-sm hover:bg-brand-teal-50 transition-colors text-sm tracking-wide"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {careersPreview.highlights.map((item, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#f6f5fa] border border-brand-teal-100/40 p-5 rounded-sm"
                  >
                    <div className="p-2.5 bg-brand-teal-100/40 rounded-sm border border-brand-teal-200/40 w-fit mb-4">
                      <Icon className="w-5 h-5 text-brand-red-500" />
                    </div>
                    <h3 className="text-sm font-bold text-brand-teal-950 mb-2">{item.title}</h3>
                    <p className="text-xs text-brand-teal-900/75 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-brand-teal-950 text-white p-6 sm:p-8 rounded-sm border border-brand-teal-800/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-red-500/10 rounded-sm border border-brand-red-500/20 shrink-0">
                  <Briefcase className="w-6 h-6 text-brand-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-display text-white">{openRoles} open roles</p>
                  <p className="text-sm text-brand-teal-100/80 mt-1">
                    Engineering, operations, finance, and field roles across Nigeria.
                  </p>
                </div>
              </div>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-2 bg-brand-red-500 text-white font-bold px-5 py-3 rounded-sm hover:bg-brand-red-600 transition-colors text-sm tracking-wide shrink-0"
              >
                Browse All Roles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
