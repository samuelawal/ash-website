"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Youtube, Facebook, Mail, MapPin } from "lucide-react";
import { siteData } from "@/content/siteData";

const iconMap = [
  <Linkedin key="linkedin" className="w-5 h-5" />,
  <Twitter key="twitter" className="w-5 h-5" />,
  <Youtube key="youtube" className="w-5 h-5" />,
  <Facebook key="facebook" className="w-5 h-5" />,
];

export default function Footer() {
  const data = siteData.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-teal-950 text-brand-teal-100/90 border-t border-brand-teal-900/60 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-brand-teal-900/40">
          
          {/* Logo & Tagline Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative w-48 h-12">
              <Image
                src={siteData.logos.white}
                alt="Ashipa Electric White Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-brand-teal-200/80 leading-relaxed max-w-sm">
              {data.tagline} We build intelligent decentralized clean energy assets linking millions of businesses and households across Africa.
            </p>
            
            {/* Socials */}
            <div className="flex gap-4">
              {data.socials.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="p-2.5 bg-white/5 hover:bg-brand-gold-500 text-white/60 hover:text-white border border-white/10 hover:border-brand-gold-500 rounded-sm transition-all duration-300 active:scale-95"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {iconMap[index % iconMap.length]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links: Company */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-3.5 text-sm">
              {data.links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-brand-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Services */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Our Solutions</h4>
            <ul className="space-y-3.5 text-sm">
              {data.links.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-brand-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog/Updates column */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Recent Updates</h4>
            <ul className="space-y-5">
              {siteData.blog.items.slice(0, 2).map((post) => (
                <li key={post.title} className="group">
                  <Link href="#updates" className="block space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-gold-500">
                      {post.category}
                    </span>
                    <span className="block text-sm font-semibold text-white/90 group-hover:text-brand-gold-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-teal-200/50">
          <p>&copy; {year} Ashipa Electric Co. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-brand-gold-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
