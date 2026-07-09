"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Shield, Target, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function WhyDistributed() {
  const [isPlaying, setIsPlaying] = useState(false);
  const data = siteData.whyDistributed;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy, Mission and Vision */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-widest text-brand-teal-700 block"
              >
                Our Purpose
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
                className="text-lg text-brand-teal-900/80 leading-relaxed"
              >
                {data.subtitle}
              </motion.p>
            </div>

            {/* Mission & Vision blocks */}
            <div className="space-y-6">
              {data.blocks.map((block, index) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-4 p-6 bg-[#f6f5fa] border border-brand-teal-100/30 rounded-sm hover:border-brand-gold-500/20 transition-all duration-300"
                >
                  <div className="p-3 bg-brand-teal-950 text-brand-gold-400 rounded-sm h-fit shrink-0">
                    {index === 0 ? <Target className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-display text-brand-teal-950 tracking-tight">
                      {block.title}
                    </h3>
                    <p className="text-sm text-brand-teal-900/80 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Feature Video / Image Container */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video sm:aspect-[4/3] w-full rounded-sm overflow-hidden bg-brand-teal-950 border border-brand-teal-900/40 shadow-2xl group"
            >
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Feature Image as Thumbnail */}
                    <Image
                      src={data.featureImage}
                      alt="Ashipa Electric clean energy project installation site"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      priority
                    />
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 bg-brand-teal-950/40 transition-colors group-hover:bg-brand-teal-950/30"></div>
                    
                    {/* Large Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute inline-flex h-20 w-20 rounded-full bg-brand-gold-500/30 animate-ping"></span>
                        <div className="relative p-6 bg-brand-gold-500 text-brand-teal-950 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-lg">
                          <Play className="w-8 h-8 fill-brand-teal-950 stroke-brand-teal-950" />
                        </div>
                      </div>
                    </div>

                    {/* Infrastructure Tag */}
                    <div className="absolute bottom-5 left-5 bg-brand-teal-950/80 backdrop-blur-md px-4 py-2 border border-brand-teal-800/50 rounded-sm flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                      <Shield className="w-3.5 h-3.5 text-brand-gold-500" />
                      <span>Infrastructure Film</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <iframe
                      src={data.videoUrl}
                      title="Ashipa Electric Project Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
