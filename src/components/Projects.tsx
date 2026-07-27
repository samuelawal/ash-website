"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function Projects() {
  const data = siteData.projects;

  return (
    <section id="projects" className="py-24 bg-[#f6f5fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 block"
            >
              Proven Track Record
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
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-teal-950 text-white font-semibold px-5 py-3 rounded-sm hover:bg-brand-teal-900 transition-colors text-sm tracking-wide shadow-md"
            >
              Request Site Audit
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
          {data.items.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white border border-brand-teal-100/40 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Container with magnification hover */}
              <div className="relative aspect-video overflow-hidden bg-brand-teal-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-95"
                  sizes="(max-w-720px) 100vw, 50vw"
                />
                
                {/* Top Left Tag */}
                <div className="absolute top-4 left-4 bg-brand-teal-950/80 backdrop-blur-md px-3 py-1.5 border border-brand-teal-800/40 rounded-sm text-xs font-semibold tracking-wide text-brand-green-400">
                  {project.tag}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-display text-brand-teal-950 tracking-tight group-hover:text-brand-teal-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-brand-teal-900/70 font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-green-500 shrink-0" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-brand-green-500 shrink-0" />
                      {project.capacity}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-teal-100/30 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-950/40 group-hover:text-brand-teal-700 transition-colors">
                    Technical Specifications
                  </span>
                  <div className="p-2 bg-brand-teal-100/30 group-hover:bg-brand-green-600 text-brand-teal-700 group-hover:text-white rounded-sm transition-all duration-300 shadow-sm border border-brand-teal-100/20">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
