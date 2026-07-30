"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The scroll-reveal used across the site's sections, isolated into a client
 * component so Server Components (which cannot use framer-motion directly) can
 * still opt into the same motion language.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
