import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Ashipa Electric",
  description:
    "Get in touch with Ashipa Electric for mini-grid development, commercial solar, consulting, and energy monitoring across Nigeria.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
