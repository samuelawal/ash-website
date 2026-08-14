import { Mail, Phone, MapPin } from "lucide-react";

import EnquiryForm from "@/components/EnquiryForm";
import { siteData } from "@/content/siteData";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/**
 * Server component by design — only the form itself needs interactivity, so the
 * contact details and headings ship as plain HTML.
 */
export default function ContactSection({
  defaultRequestType,
}: {
  defaultRequestType?: string;
}) {
  const { contact } = siteData;

  return (
    <section id="contact" className="py-24 bg-[#f6f5fa] border-t border-brand-teal-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 block">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-teal-950">
                {contact.title}
              </h2>
              <p className="text-brand-teal-900/80 leading-relaxed text-sm sm:text-base">
                {contact.description}
              </p>
            </div>

            <div className="space-y-4 text-sm font-semibold text-brand-teal-950">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-red-500 rounded-sm shadow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={phoneHref(phone)}
                      className="block hover:text-brand-teal-600 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-red-500 rounded-sm shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-brand-teal-600 transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              {/* Four offices across Nigeria and the US — listed in full so a
                  buyer can tell which one is closest to their site. */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-red-500 rounded-sm shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <ul className="space-y-3">
                  {contact.offices.map((office) => (
                    <li key={office.label}>
                      <span className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                        {office.label}
                      </span>
                      <address className="not-italic font-medium text-brand-teal-900/80">
                        {office.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <EnquiryForm defaultRequestType={defaultRequestType} />
          </div>
        </div>
      </div>
    </section>
  );
}
