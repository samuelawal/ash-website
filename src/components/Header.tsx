"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { trackEvent } from "@/lib/analytics";

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
            {siteData.navigation.links.map((link) =>
              link.children ? (
                // Opens on hover and, for keyboard users, whenever anything
                // inside it holds focus — so the submenu is reachable by Tab
                // without a click handler.
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium tracking-wide text-white/95 hover:text-brand-red-400 transition-colors"
                  >
                    {link.name}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* The padded wrapper keeps the pointer inside the group while
                      it travels from the trigger down to the panel. */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 invisible opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
                    <ul className="min-w-56 bg-brand-teal-950/95 backdrop-blur-xl border border-brand-teal-800/60 rounded-sm shadow-2xl py-2">
                      {link.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="block px-5 py-2.5 text-sm font-medium text-white/85 hover:text-white hover:bg-brand-teal-800/60 transition-colors whitespace-nowrap"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-white/95 hover:text-brand-red-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-red-500 after:transition-all hover:after:w-full"
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={siteData.navigation.cta.href}
              onClick={() =>
                trackEvent("nav_cta_clicked", {
                  placement: "desktop_header",
                  // Which page the visitor was on when the CTA converted.
                  from: pathname,
                })
              }
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
                  <div key={link.name} className="border-b border-white/5">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-semibold text-white/90 hover:text-brand-red-400 py-2 transition-colors"
                    >
                      {link.name}
                    </Link>
                    {/* No accordion on mobile: a tap that only reveals more taps
                        is friction on a slow connection. The children are just
                        listed. */}
                    {link.children && (
                      <ul className="pb-2 pl-4 border-l border-white/10 ml-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 text-sm text-white/70 hover:text-brand-red-400 transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent("nav_cta_clicked", {
                    placement: "mobile_menu",
                    from: pathname,
                  });
                }}
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
