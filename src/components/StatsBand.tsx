"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView, animate } from "framer-motion";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

interface CounterProps {
  value: number;
  duration?: number;
}

function Counter({ value, duration = 2.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const node = ref.current;
      if (!node) return;

      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(current) {
          if (value % 1 !== 0) {
            // Decimal formatting (e.g. 1.8)
            node.textContent = current.toFixed(1);
          } else {
            // Integer formatting with comma separator
            node.textContent = Math.round(current).toLocaleString();
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-gold-500">0</span>;
}

export default function StatsBand() {
  const data = siteData.statsBand;

  return (
    <section className="relative py-28 overflow-hidden bg-brand-teal-950 text-white select-none">
      {/* Background image with high contrast dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt="Ashipa Electric infrastructure"
          fill
          className="object-cover object-center brightness-35 contrast-110"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal-950 via-brand-teal-900/90 to-brand-teal-950/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-950/60 via-transparent to-brand-teal-950/30"></div>
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
                <Counter value={item.value} />
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-gold-500">
                  {item.suffix}
                </span>
              </div>
              
              {/* Divider Line */}
              <div className="w-10 h-0.5 bg-brand-gold-500/50 rounded-full"></div>
              
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
