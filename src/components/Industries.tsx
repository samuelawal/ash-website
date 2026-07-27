"use client";

import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function Industries() {
  const data = siteData.industries;

  return (
    <section className="relative py-28 text-white bg-brand-teal-950 overflow-hidden select-none">
      {/* Background Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt="Ashipa Electric industry infrastructure"
          fill
          className="object-cover object-center brightness-[25%] contrast-110"
          quality={80}
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-teal-950 via-brand-teal-950/90 to-brand-teal-950/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4 text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-green-400 block"
          >
            Sectors We Empower
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white"
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-teal-100/90 leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.list.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 hover:border-brand-green-500/40 hover:bg-white/10 p-8 rounded-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Sector Identifier Badge */}
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-500 rounded-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-brand-teal-200/50 font-bold uppercase tracking-widest font-display">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold font-display text-white tracking-tight group-hover:text-brand-green-400 transition-colors">
                  {item.name}
                </h3>
                
                {/* Desc */}
                <p className="text-brand-teal-100/80 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>

              {/* Bullet checklist icon */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-brand-teal-200/60">
                <Check className="w-4 h-4 text-brand-green-500 shrink-0" />
                <span>Audited Performance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
