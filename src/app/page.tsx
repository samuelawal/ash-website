import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import CaseStudy from "@/components/CaseStudy";
import StatsBand from "@/components/StatsBand";
import WhyDistributed from "@/components/WhyDistributed";
import CareersPreview from "@/components/CareersPreview";
import Projects from "@/components/Projects";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Offerings />
        <CaseStudy />
        <StatsBand />
        <WhyDistributed />
        <CareersPreview />
        <Projects />
        <Industries />
        <Testimonials />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
