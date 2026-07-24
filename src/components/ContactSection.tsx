import { Mail, Phone, MapPin } from "lucide-react";
import { siteData } from "@/content/siteData";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export default function ContactSection() {
  const { contact } = siteData;

  return (
    <section className="py-24 bg-[#f6f5fa] border-t border-brand-teal-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
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
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-gold-500 rounded-sm shadow-sm shrink-0">
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
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-gold-500 rounded-sm shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <a href={`mailto:${contact.email}`} className="hover:text-brand-teal-600 transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white border border-brand-teal-100/30 text-brand-gold-500 rounded-sm shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="bg-white border border-brand-teal-100/40 p-8 sm:p-10 rounded-sm shadow-sm space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-teal-950/70 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#f6f5fa] border border-brand-teal-100/40 focus:border-brand-teal-600 outline-none rounded-sm px-4 py-3.5 text-sm text-brand-teal-950 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-teal-950/70 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-[#f6f5fa] border border-brand-teal-100/40 focus:border-brand-teal-600 outline-none rounded-sm px-4 py-3.5 text-sm text-brand-teal-950 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-teal-950/70 block">
                  Service Required
                </label>
                <select className="w-full bg-[#f6f5fa] border border-brand-teal-100/40 focus:border-brand-teal-600 outline-none rounded-sm px-4 py-3.5 text-sm text-brand-teal-950 transition-colors">
                  {contact.serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-teal-950/70 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project size, location, and power needs..."
                  className="w-full bg-[#f4f7f7] border border-brand-teal-100/40 focus:border-brand-gold-500 outline-none rounded-sm px-4 py-3.5 text-sm text-brand-teal-950 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-teal-950 text-white font-bold py-3.5 rounded-sm hover:bg-brand-teal-900 transition-colors text-sm tracking-wide shadow-md cursor-pointer"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
