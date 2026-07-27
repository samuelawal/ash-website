"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  MapPin,
  Clock,
  Heart,
  GraduationCap,
  Calendar,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";

const benefitIcons = [Heart, Shield, Briefcase, GraduationCap, Calendar, Globe];

export default function JobListings() {
  const { careers } = siteData;

  return (
    <section className="py-20 bg-[#f6f5fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base text-brand-teal-900/80 leading-relaxed max-w-3xl mb-12"
        >
          {careers.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-green-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal-700">
              Benefits & Perks
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index % benefitIcons.length];
              return (
                <div
                  key={benefit.title}
                  className="bg-white border border-brand-teal-100/40 rounded-sm p-5 hover:border-brand-green-500/20 transition-colors"
                >
                  <div className="p-2 bg-brand-green-500/10 text-brand-green-600 rounded-sm w-fit mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-brand-teal-950 text-sm mb-1.5">{benefit.title}</h3>
                  <p className="text-sm text-brand-teal-900/70 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 mb-6">
          Open Positions
        </h2>

        <div className="space-y-6">
          {careers.items.map((job, index) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-brand-teal-100/40 rounded-sm p-6 sm:p-8 hover:border-brand-green-500/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-green-600 bg-brand-green-500/10 border border-brand-green-500/20 px-2.5 py-1 rounded-sm">
                      {job.department}
                    </span>
                    <span className="text-xs text-brand-teal-700/60">Posted {job.posted}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-teal-950 tracking-tight">
                    {job.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-brand-teal-800/70">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-green-500 shrink-0" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-brand-green-500 shrink-0" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-green-500 shrink-0" />
                      {job.department}
                    </span>
                  </div>

                  <p className="text-brand-teal-900/80 leading-relaxed">{job.description}</p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 mb-3">
                        Responsibilities
                      </h3>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-brand-teal-900/75 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 mb-3">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {job.requirements.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-brand-teal-900/75 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-teal-100/40">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 mb-3">
                      Benefits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careers.benefits.map((benefit) => (
                        <span
                          key={benefit.title}
                          className="text-xs font-medium text-brand-teal-800 bg-brand-teal-100/40 border border-brand-teal-100/60 px-2.5 py-1 rounded-sm"
                        >
                          {benefit.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 lg:pt-2">
                  <Link
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-brand-green-600 text-white font-bold px-6 py-3.5 rounded-sm hover:bg-brand-green-700 active:scale-95 transition-all text-sm tracking-wide shadow-md shadow-brand-green-500/10 w-full sm:w-auto justify-center"
                  >
                    Apply Now
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 bg-brand-teal-950 text-white rounded-sm border border-brand-teal-800/40"
        >
          <h3 className="text-lg font-bold font-display mb-2">Don&apos;t see the right role?</h3>
          <p className="text-brand-teal-100/80 text-sm leading-relaxed mb-4 max-w-2xl">
            We&apos;re always interested in hearing from talented people in engineering, operations, and energy infrastructure.
            Send your CV and a short note about what you&apos;d like to work on.
          </p>
          <a
            href={`mailto:${siteData.navigation.contactInfo.email}?subject=General%20Career%20Inquiry`}
            className="inline-flex items-center gap-2 text-brand-green-400 font-semibold hover:text-brand-green-300 transition-colors text-sm"
          >
            {siteData.navigation.contactInfo.email}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
