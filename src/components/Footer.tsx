"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Youtube, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { siteData } from "@/content/siteData";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  LinkedIn: <Linkedin className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Facebook: <Facebook className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  TikTok: <TikTokIcon className="w-5 h-5" />,
  YouTube: <Youtube className="w-5 h-5" />,
};

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
              {data.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="p-2.5 bg-white/5 hover:bg-brand-green-500 text-white/60 hover:text-white border border-white/10 hover:border-brand-green-500 rounded-sm transition-all duration-300 active:scale-95"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {iconMap[social.name]}
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
                  <Link href={link.href} className="hover:text-brand-green-400 transition-colors">
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
                  <Link href={link.href} className="hover:text-brand-green-400 transition-colors">
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
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-green-500">
                      {post.category}
                    </span>
                    <span className="block text-sm font-semibold text-white/90 group-hover:text-brand-green-400 transition-colors line-clamp-2 leading-snug">
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
            <Link href="#" className="hover:text-brand-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand-green-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-brand-green-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
