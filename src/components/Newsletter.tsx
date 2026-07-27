"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 bg-brand-teal-950 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#463299_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-teal-800/20 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mt-16"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-10">
        
        {/* Header Text */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-green-400 block"
          >
            Stay Informed
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white"
          >
            {siteData.newsletter.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-brand-teal-200/90 leading-relaxed"
          >
            {siteData.newsletter.subtitle}
          </motion.p>
        </div>

        {/* Input Form container */}
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row gap-3 w-full"
              >
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-teal-300" />
                  <input
                    type="email"
                    required
                    placeholder={siteData.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 focus:border-brand-green-500/70 focus:bg-white/10 outline-none rounded-sm py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 transition-all font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brand-green-600 hover:bg-brand-green-700 active:scale-95 text-white font-bold px-6 py-3.5 rounded-sm transition-all text-sm tracking-wide shrink-0 flex items-center justify-center gap-1.5 shadow-lg shadow-brand-green-500/10 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-brand-teal-950 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      {siteData.newsletter.cta}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-teal-900/30 border border-brand-teal-800/40 p-6 rounded-sm flex items-center gap-3.5 text-left"
              >
                <div className="p-2.5 bg-brand-green-500/10 text-brand-green-500 rounded-full">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Subscription Successful</h4>
                  <p className="text-xs sm:text-sm text-brand-teal-200/80 mt-0.5">Thank you for subscribing. We will send you our next brief soon.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
