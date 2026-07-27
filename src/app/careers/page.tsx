import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobListings from "@/components/JobListings";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Careers | Ashipa Electric",
  description:
    "Explore open roles at Ashipa Electric. Join our team building intelligent decentralized energy infrastructure across Africa.",
};

export default function CareersPage() {
  const { careers } = siteData;

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="relative bg-brand-teal-950 text-white pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#463299_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-500/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green-400 block mb-4">
              Careers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight max-w-3xl mb-6">
              {careers.title}
            </h1>
            <p className="text-lg text-brand-teal-100/90 leading-relaxed max-w-2xl">
              {careers.subtitle}
            </p>
          </div>
        </section>

        <JobListings />
      </main>
      <Footer />
    </>
  );
}
