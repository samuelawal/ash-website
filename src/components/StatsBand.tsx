"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView, animate } from "framer-motion";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

function formatStatValue(value: number) {
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

interface CounterProps {
  value: number;
  active: boolean;
  duration?: number;
}

function Counter({ value, active, duration = 2.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      node.textContent = formatStatValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(current) {
        node.textContent = Number.isInteger(value)
          ? Math.round(current).toLocaleString()
          : current.toLocaleString(undefined, { maximumFractionDigits: 1 });
      },
    });

    return () => controls.stop();
  }, [active, value, duration]);

  return (
    <span
      ref={ref}
      className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white"
    >
      0
    </span>
  );
}

export default function StatsBand() {
  const data = siteData.statsBand;
  const sectionRef = useRef<HTMLElement>(null);
  const countersActive = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-brand-teal-950 text-white select-none"
    >
      {/* Background image with high contrast dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt="Ashipa Electric infrastructure"
          fill
          className="object-cover object-center brightness-35 contrast-110"
          quality={80}
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-teal-950 via-brand-teal-900/90 to-brand-teal-950/60"></div>
        <div className="absolute inset-0 bg-linear-to-t from-brand-teal-950/60 via-transparent to-brand-teal-950/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {data.items.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center space-y-3"
            >
              {/* Animated Stat Value */}
              <div className="flex items-baseline justify-center">
                <Counter value={item.value} active={countersActive} />
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  {item.suffix}
                </span>
              </div>
              
              {/* Divider Line */}
              <div className="w-10 h-0.5 bg-brand-red-500/50 rounded-full"></div>
              
              {/* Stat Description */}
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-brand-teal-100/90 uppercase max-w-[200px] leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
