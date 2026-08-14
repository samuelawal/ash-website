import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import WhereWeBuild from "@/components/WhereWeBuild";
import CaseStudy from "@/components/CaseStudy";
import StatsBand from "@/components/StatsBand";
import WhyDistributed from "@/components/WhyDistributed";
import CareersPreview from "@/components/CareersPreview";
import Projects from "@/components/Projects";
// MONITORING DISABLED — restore alongside the section below.
// import MonitoringDashboard from "@/components/MonitoringDashboard";
import Industries from "@/components/Industries";
import Compliance from "@/components/Compliance";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Resources from "@/components/Resources";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Offerings />
        <WhereWeBuild />
        <CaseStudy />
        <StatsBand />
        <WhyDistributed />
        <CareersPreview />
        <Projects />
        {/* MONITORING DISABLED — parked for now. Sat straight after the
            portfolio: having seen what we built, here is how we operate it.
            <MonitoringDashboard /> */}
        <Industries />
        {/* The bankability pair — how the work is governed, and who we do it
            alongside. This is what a DFI or corporate off-taker scrolls for. */}
        <Compliance />
        <Partners />
        <Testimonials />
        <BlogPreview />
        {/* Last section before the newsletter: the visitor has the evidence, so
            this is where asking for a feasibility study makes sense. */}
        <Resources />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
