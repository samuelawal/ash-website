"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const useSolidHeader = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Banner (Hidden on scroll on desktop to save space) */}
      <div className={`bg-brand-teal-950/40 text-brand-teal-100/80 border-b border-brand-teal-900/30 text-xs px-4 transition-all duration-300 ease-in-out ${useSolidHeader && isScrolled ? "max-h-0 py-0 overflow-hidden border-b-0" : "max-h-12 py-2.5 overflow-hidden"}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* The banner is height-clamped, so everything here has to stay on a
              single line. Narrow screens show one phone; the rest appear once
              there is room for them. */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 max-w-full">
            {siteData.navigation.contactInfo.phones.map((phone, index) => (
              <span
                key={phone}
                className={`items-center gap-1.5 whitespace-nowrap hover:text-brand-red-400 transition-colors ${
                  index === 0 ? "flex" : "hidden sm:flex"
                }`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <a href={phoneHref(phone)}>{phone}</a>
              </span>
            ))}
            <span className="flex items-center gap-1.5 min-w-0 hover:text-brand-red-400 transition-colors">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <a href={`mailto:${siteData.navigation.contactInfo.email}`} className="truncate">
                {siteData.navigation.contactInfo.email}
              </a>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-brand-teal-200">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-green-500 animate-pulse"></span>
            <span>{siteData.footer.tagline}</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header
        className={`w-full transition-all duration-500 ${
          useSolidHeader
            ? "bg-brand-teal-950/90 backdrop-blur-lg border-b border-brand-teal-800/40 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center">
            <div className="relative w-40 sm:w-48 h-10 transition-transform hover:scale-[1.02] duration-200">
              <Image
                src={siteData.logos.white}
                alt="Ashipa Electric Logo"
                fill
                sizes="192px"
                className="object-contain"
                preload
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteData.navigation.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/95 hover:text-brand-red-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-red-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={siteData.navigation.cta.href}
              className="inline-flex items-center gap-1.5 bg-brand-red-500 text-white font-semibold px-5 py-2.5 rounded-sm hover:bg-brand-red-600 active:scale-95 transition-all text-sm tracking-wide shadow-md shadow-brand-red-500/10"
            >
              {siteData.navigation.cta.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-brand-red-400 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-brand-teal-950/95 backdrop-blur-xl border-b border-brand-teal-900 py-6 px-6 flex flex-col gap-6 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {siteData.navigation.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-white/90 hover:text-brand-red-400 py-2 border-b border-white/5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="flex flex-col gap-2 text-sm text-brand-teal-200/90 py-2">
                {siteData.navigation.contactInfo.phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-red-500" />
                    <a href={phoneHref(phone)}>{phone}</a>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-red-500" />
                  <a href={`mailto:${siteData.navigation.contactInfo.email}`}>{siteData.navigation.contactInfo.email}</a>
                </div>
              </div>

              <Link
                href={siteData.navigation.cta.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-brand-red-500 text-white font-bold py-3 rounded-sm hover:bg-brand-red-600 transition-colors shadow-lg"
              >
                {siteData.navigation.cta.text}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
