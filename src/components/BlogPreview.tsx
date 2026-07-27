"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function BlogPreview() {
  const data = siteData.blog;

  return (
    <section id="updates" className="py-24 bg-white border-t border-brand-teal-100/30">
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
              Resources & News
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
              className="text-base text-brand-teal-900/80 leading-relaxed"
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
              href="#updates"
              className="inline-flex items-center gap-2 text-brand-teal-950 font-bold border-b-2 border-brand-teal-950 pb-1 hover:text-brand-green-600 hover:border-brand-green-600 transition-colors text-sm tracking-wide"
            >
              View All Articles
            </Link>
          </motion.div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between h-full bg-[#f6f5fa] border border-brand-teal-100/20 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Image panel with zoom on card hover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-teal-950">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm">
                    {post.category}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 space-y-4">
                  {/* Meta items */}
                  <div className="flex gap-4 items-center text-xs text-brand-teal-900/60 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-green-600" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-green-600" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-display text-brand-teal-950 tracking-tight leading-snug group-hover:text-brand-teal-700 transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-brand-teal-900/80 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="#updates"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal-950 group-hover:text-brand-green-600 transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
