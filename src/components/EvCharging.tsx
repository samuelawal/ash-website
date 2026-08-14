"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  Cable,
  Clock,
  CreditCard,
  Truck,
  Fuel,
  Zap,
} from "lucide-react";

import { siteData } from "@/content/siteData";
import { enquiryHref } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const useCaseIcons = [
  <Truck key="fleet" className="h-6 w-6" />,
  <Fuel key="forecourt" className="h-6 w-6" />,
  <Building2 key="workplace" className="h-6 w-6" />,
  <CreditCard key="caas" className="h-6 w-6" />,
];

/** One labelled spec row inside a charger card. */
function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-2">
      <span className="mt-0.5 shrink-0 text-brand-teal-400">{icon}</span>
      <div className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-teal-200/50">
          {label}
        </span>
        <span className="block text-sm font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}

export default function EvCharging() {
  const { ev } = siteData;

  return (
    <>
      {/* Intro ---------------------------------------------------------- */}
      <section className="border-b border-brand-teal-100/30 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-5 lg:col-span-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                {ev.eyebrow}
              </span>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-teal-950 sm:text-5xl">
                {ev.title}
              </h1>
              <p className="text-lg leading-relaxed text-brand-teal-900/80">
                {ev.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={enquiryHref("ev-charging")}
                  onClick={() =>
                    trackEvent("resource_requested", {
                      resource: "EV Charging Site Assessment",
                      kind: "request",
                      requestType: "ev-charging",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-sm bg-brand-red-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-brand-red-600 active:scale-95"
                >
                  Request a site assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#charger-types"
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-teal-200 px-6 py-3.5 text-sm font-bold tracking-wide text-brand-teal-950 transition-colors hover:border-brand-teal-600"
                >
                  Compare charger types
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src={ev.image}
                  alt="An Ashipa Electric commercial solar installation of the kind that energises our charge points"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charger types -------------------------------------------------- */}
      <section
        id="charger-types"
        className="scroll-mt-28 border-b border-brand-teal-900/60 bg-brand-teal-950 py-24 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-red-400">
              Hardware
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              AC and DC Charging, Sized to the Site
            </h2>
            <p className="leading-relaxed text-brand-teal-200/80">
              The right charger is the one your site can actually supply and your
              vehicles can actually use in the time they are parked. We specify
              against dwell time and available capacity, not headline kilowatts.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-brand-teal-900/60 bg-brand-teal-900/60 sm:grid-cols-2 lg:grid-cols-4">
            {ev.chargerTypes.map((charger, index) => (
              <motion.div
                key={charger.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.25) }}
                className="flex flex-col bg-brand-teal-950 p-7 transition-colors hover:bg-brand-teal-900/40"
              >
                <h3 className="mb-5 font-display text-base font-bold leading-snug">
                  {charger.name}
                </h3>
                <div className="divide-y divide-white/5 border-y border-white/5">
                  <Spec
                    icon={<Zap className="h-4 w-4" />}
                    label="Output"
                    value={charger.power}
                  />
                  <Spec
                    icon={<Cable className="h-4 w-4" />}
                    label="Connector"
                    value={charger.connector}
                  />
                  <Spec
                    icon={<Clock className="h-4 w-4" />}
                    label="Charge time"
                    value={charger.chargeTime}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-brand-teal-200/75">
                  {charger.bestFor}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases ------------------------------------------------------ */}
      <section className="border-b border-brand-teal-100/30 bg-[#f6f5fa] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
              Where We Deploy
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-teal-950 sm:text-4xl">
              Fleets, Forecourts, and Everywhere Vehicles Wait
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {ev.useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
                className="rounded-sm border border-brand-teal-100/40 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-sm border border-brand-teal-200/40 bg-brand-teal-100/40 p-3.5 text-brand-red-500">
                  {useCaseIcons[index % useCaseIcons.length]}
                </div>
                <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-brand-teal-950">
                  {useCase.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-teal-900/80">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Site requirements + payment models ----------------------------- */}
      <section className="border-b border-brand-teal-100/30 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="mb-4 block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                Site Requirements
              </span>
              <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-brand-teal-950">
                What a Charging Site Needs
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-brand-teal-900/80">
                Most sites meet more of this than their owners expect. Where the
                supply is the constraint, solar and storage usually solve it more
                cheaply than a grid upgrade.
              </p>
              <ul className="space-y-3.5">
                {ev.siteRequirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-500/10">
                      <Check className="h-3 w-3 text-brand-green-600" />
                    </span>
                    <span className="text-sm leading-relaxed text-brand-teal-900/90">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <span className="mb-4 block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                Commercial Models
              </span>
              <h2 className="mb-8 font-display text-3xl font-extrabold tracking-tight text-brand-teal-950">
                How You Pay For It
              </h2>
              <div className="grid gap-px overflow-hidden rounded-sm border border-brand-teal-100 bg-brand-teal-100 sm:grid-cols-2">
                {ev.paymentModels.map((model) => (
                  <div key={model.title} className="bg-[#f6f5fa] p-7">
                    <div className="mb-4 inline-flex rounded-sm bg-white p-2.5 text-brand-red-500 shadow-sm">
                      <BatteryCharging className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2.5 font-display text-base font-bold text-brand-teal-950">
                      {model.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-teal-900/80">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
