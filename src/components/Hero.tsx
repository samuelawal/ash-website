"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteData.hero.slides;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      7000
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide, slides.length]);

  const prevSlide = () => {
    resetTimeout();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[640px] max-h-[1000px] overflow-hidden bg-brand-teal-950 text-white select-none">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              preload={currentSlide === 0}
              quality={85}
            />
            {/* Soft gradient overlay for maximum contrast and high-end aesthetic */}
            <div className="absolute inset-0 bg-linear-to-r from-brand-teal-950 via-brand-teal-950/70 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-linear-to-t from-brand-teal-950/80 via-transparent to-brand-teal-950/20"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-28 sm:pt-36 pb-24 sm:pb-28">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Tagline */}
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-brand-red-400 bg-brand-red-500/10 border border-brand-red-500/20 px-3 py-1.5 rounded-sm">
                {slides[currentSlide].tagline}
              </span>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-white">
                {slides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-brand-teal-100/90 leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>

              {/* CTA Button */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-red-500 text-white font-bold px-6 py-3.5 rounded-sm hover:bg-brand-red-600 active:scale-95 transition-all text-sm tracking-wide shadow-lg shadow-brand-red-500/10"
                >
                  {slides[currentSlide].ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 font-semibold px-6 py-3.5 rounded-sm active:scale-95 transition-all text-sm tracking-wide"
                >
                  Consult an Engineer
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-3 bg-brand-teal-950/60 hover:bg-brand-teal-900 border border-white/10 hover:border-white/20 rounded-full transition-all active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-brand-teal-950/60 hover:bg-brand-teal-900 border border-white/10 hover:border-white/20 rounded-full transition-all active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Slide Indicators / Progress Bars */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              resetTimeout();
              setCurrentSlide(index);
            }}
            className="group relative flex h-2 w-12 sm:w-16 overflow-hidden rounded-full bg-white/20 focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index && (
              <motion.span
                layoutId="progressBar"
                className="absolute left-0 top-0 h-full w-full bg-brand-red-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 7, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
