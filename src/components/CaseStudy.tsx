"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function CaseStudy() {
  const data = siteData.caseStudy;

  return (
    <section className="py-24 bg-brand-teal-950 text-white overflow-hidden relative">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal-800/30 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-gold-400 block mb-2"
          >
            {data.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight max-w-2xl text-white"
          >
            {data.title}
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image and Quote */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video sm:aspect-[4/3] rounded-sm overflow-hidden border border-brand-teal-800/40 group shadow-2xl"
            >
              <Image
                src={data.image}
                alt={`${data.author} - ${data.company}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-950/80 via-brand-teal-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg">{data.author}</p>
                <p className="text-brand-teal-200 text-sm">{data.role}, {data.company}</p>
              </div>
            </motion.div>

            {/* Testimonial Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-brand-teal-900/40 border border-brand-teal-800/30 p-8 rounded-sm"
            >
              <Quote className="w-10 h-10 text-brand-gold-500/25 absolute top-4 left-4" />
              <blockquote className="relative z-10 text-brand-teal-100/90 italic leading-relaxed text-base pl-6">
                &ldquo;{data.quote}&rdquo;
              </blockquote>
            </motion.div>
          </div>

          {/* Right Column: ROI Metrics and Details */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                Accelerating Agricultural Power Security
              </h3>
              <p className="text-brand-teal-100/80 leading-relaxed">
                By investing in a hybrid micro-solar grid infrastructure, Dobi AgriCo completely insulated their high-yield commercial farming operations from the unstable national grid, ensuring reliable irrigation and temperature-controlled storage.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-brand-teal-900/30 border border-brand-teal-800/30 p-5 rounded-sm flex flex-col justify-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-display text-brand-gold-400 block mb-1">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm text-brand-teal-200">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Checklist of highlights */}
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-brand-teal-100/90">
                <CheckCircle2 className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span>Zero grid failure downtime achieved since commissioning</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-teal-100/90">
                <CheckCircle2 className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span>Amortization period outperformed expectations by 4 months</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-teal-100/90">
                <CheckCircle2 className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span>Fully integrated with live telemetry and yield auditing</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-brand-gold-400 font-bold hover:text-brand-gold-300 transition-colors uppercase tracking-wider text-xs"
              >
                Read Full Investment Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
