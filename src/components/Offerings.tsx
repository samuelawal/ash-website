"use client";

import Link from "next/link";
import { ArrowUpRight, Zap, Activity, ClipboardCopy, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

const iconMap = [
  <Zap key="zap" className="w-6 h-6 text-brand-green-500" />,
  <ClipboardCopy key="clipboard" className="w-6 h-6 text-brand-green-500" />,
  <Activity key="activity" className="w-6 h-6 text-brand-green-500" />,
  <Building2 key="building" className="w-6 h-6 text-brand-green-500" />,
];

export default function Offerings() {
  const offerings = siteData.offerings;

  return (
    <section id="services" className="py-24 bg-[#f6f5fa] border-y border-brand-teal-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-teal-950"
          >
            {offerings.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-teal-900/80 leading-relaxed"
          >
            {offerings.subtitle}
          </motion.p>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {offerings.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-brand-teal-100/30 p-8 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-teal-200/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top / Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 bg-brand-teal-100/40 rounded-sm border border-brand-teal-200/40">
                    {iconMap[index % iconMap.length]}
                  </div>
                  <Link
                    href={item.link}
                    className="p-2 text-brand-teal-700 hover:text-brand-green-500 rounded-full hover:bg-brand-teal-100/40 transition-all opacity-40 group-hover:opacity-100 duration-200"
                    aria-label={`Read more about ${item.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl font-bold font-display text-brand-teal-950 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-brand-teal-900/80 leading-relaxed text-sm mb-6">
                  {item.description}
                </p>

                {/* bullet lists */}
                <ul className="space-y-2 border-t border-brand-teal-100/30 pt-5 mb-8">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-xs text-brand-teal-950 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              {/* <Link
                href={item.link}
                className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 group-hover:text-brand-green-600 transition-colors flex items-center gap-1"
              >
                Learn More
                <span className="block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
