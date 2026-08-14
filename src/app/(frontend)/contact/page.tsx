import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { requestTypes } from "@/content/enquiryOptions";
import { ENQUIRY_REQUEST_PARAM } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us | Ashipa Electric",
  description:
    "Get in touch with Ashipa Electric for distributed energy and utility-scale development, commercial solar, consulting, and energy monitoring across Nigeria.",
  alternates: { canonical: "/contact" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requested = params[ENQUIRY_REQUEST_PARAM];

  // Section CTAs across the site deep-link here with the request already
  // chosen. Anything not on the canonical list is ignored rather than trusted —
  // it would otherwise render a `<select>` with no matching option.
  const defaultRequestType =
    typeof requested === "string" &&
    requestTypes.some((type) => type.value === requested)
      ? requested
      : undefined;

  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <ContactSection defaultRequestType={defaultRequestType} />
      </main>
      <Footer />
    </>
  );
}
