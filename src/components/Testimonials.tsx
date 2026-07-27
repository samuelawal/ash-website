"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = siteData.testimonials.items;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-teal-700 block"
          >
            Social Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-teal-950"
          >
            {siteData.testimonials.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-teal-900/80 leading-relaxed"
          >
            {siteData.testimonials.subtitle}
          </motion.p>
        </div>

        {/* Carousel Block */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Testimonial Panel */}
          <div className="lg:col-span-8 relative">
            <div className="relative bg-[#f6f5fa] border border-brand-teal-100/30 p-8 sm:p-12 md:p-16 rounded-sm min-h-[380px] sm:min-h-[320px] flex flex-col justify-between shadow-sm">
              <Quote className="w-16 h-16 text-brand-red-500/10 absolute top-6 left-6 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 relative z-10 flex-grow flex flex-col justify-between"
                >
                  {/* Testimonial Quote */}
                  <p className="text-lg sm:text-xl text-brand-teal-950 font-medium leading-relaxed italic pl-2 sm:pl-4">
                    &ldquo;{items[activeIndex].quote}&rdquo;
                  </p>
                  
                  {/* User Profile */}
                  <div className="flex items-center gap-4 pl-2 sm:pl-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-red-500/25">
                      <Image
                        src={items[activeIndex].avatar}
                        alt={`${items[activeIndex].name} Avatar`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display text-brand-teal-950 tracking-tight">
                        {items[activeIndex].name}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-brand-teal-700">
                        {items[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators for Touch navigation */}
              <div className="flex gap-2.5 mt-8 pl-2 sm:pl-4">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-8 bg-brand-teal-700" : "w-2.5 bg-brand-teal-900/10 hover:bg-brand-teal-900/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Static text + Navigation Panel */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold font-display text-brand-teal-950 tracking-tight">
              Powered by Shared Prosperity
            </h3>
            <p className="text-sm text-brand-teal-900/80 leading-relaxed">
              We measure our success by the growth of the businesses and communities we energize. Stable, smart utility grids transform lives from the ground up.
            </p>
            
            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-[#f6f5fa] hover:bg-brand-teal-50 border border-brand-teal-100/50 hover:border-brand-teal-100 rounded-sm text-brand-teal-950 active:scale-95 transition-all"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 bg-[#f6f5fa] hover:bg-brand-teal-50 border border-brand-teal-100/50 hover:border-brand-teal-100 rounded-sm text-brand-teal-950 active:scale-95 transition-all"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
