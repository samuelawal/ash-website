"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  OctagonAlert,
  Radio,
} from "lucide-react";

import GenerationChart from "@/components/GenerationChart";
import { siteData, type MonitoringSite } from "@/content/siteData";
import { enquiryHref } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

/**
 * The reserved status scale, rendered. Colour is never the only channel: each
 * state carries a distinctly shaped icon and a written label, because good and
 * fault are effectively the same colour to a deuteranopic reader.
 */
const STATUS = {
  healthy: {
    label: "Healthy",
    Icon: CheckCircle2,
    color: "var(--color-status-good)",
  },
  watch: {
    label: "Watch",
    Icon: CircleAlert,
    color: "var(--color-status-watch)",
  },
  fault: {
    label: "Fault",
    Icon: OctagonAlert,
    color: "var(--color-status-fault)",
  },
} as const;

type StatusKey = keyof typeof STATUS;

/** Site status uses its own operational vocabulary; map it onto the scale. */
const SITE_STATUS: Record<MonitoringSite["status"], StatusKey> = {
  online: "healthy",
  degraded: "watch",
  maintenance: "watch",
};

const SITE_STATUS_LABEL: Record<MonitoringSite["status"], string> = {
  online: "Online",
  degraded: "Degraded",
  maintenance: "Maintenance",
};

/** A feeder pushed close to its rating is the thing an operator wants to see. */
function loadStatus(load: number): StatusKey {
  if (load >= 85) return "fault";
  if (load >= 70) return "watch";
  return "healthy";
}

function StatusMark({ state, label }: { state: StatusKey; label: string }) {
  const { Icon, color } = STATUS[state];
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} aria-hidden="true" />
      <span className="text-xs font-semibold text-white/90">{label}</span>
    </span>
  );
}

/**
 * A ratio against a limit — a meter, not a chart. The fill carries severity and
 * the track is the same hue dimmed, so the state reads across the whole bar.
 */
function LoadMeter({ load }: { load: number }) {
  const state = loadStatus(load);
  const { color } = STATUS[state];

  return (
    <div className="flex items-center gap-3">
      {/* Track and fill are siblings rather than nested: `opacity` on a parent
          would dim the fill along with the track. */}
      <div className="relative h-1.5 w-24 shrink-0 overflow-hidden rounded-[2px] sm:w-32">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: color, opacity: 0.18 }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-r-[4px]"
          style={{ width: `${load}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold text-white/90 [font-variant-numeric:tabular-nums]">
        {load}%
      </span>
    </div>
  );
}

export default function MonitoringDashboard({
  /** `h1` when this section is the whole page, `h2` when it is one of many. */
  headingAs: Heading = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
  const { monitoring } = siteData;

  return (
    <section
      id="monitoring"
      className="border-y border-brand-teal-900/60 bg-brand-teal-950 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl space-y-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-brand-red-400">
            {monitoring.eyebrow}
          </span>
          <Heading
            className={`font-display font-extrabold tracking-tight ${
              Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {monitoring.title}
          </Heading>
          <p className="leading-relaxed text-brand-teal-200/80">{monitoring.subtitle}</p>
        </div>

        {/* The dashboard ------------------------------------------------ */}
        <div className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <div className="flex items-center gap-2.5">
              <Radio className="h-4 w-4 text-brand-green-400" aria-hidden="true" />
              <span className="font-display text-sm font-bold">
                Fleet Operations Overview
              </span>
            </div>
            {/* Says plainly what this is. A marketing page showing invented
                numbers as a live feed is the fastest way to lose a technical
                reader who checks. */}
            <span className="rounded-sm border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal-200/70">
              Illustrative view · not a live feed
            </span>
          </div>

          {/* KPI row */}
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {monitoring.demoMetrics.map((metric) => (
              <div key={metric.label} className="bg-brand-teal-950 p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold text-brand-teal-200/70">
                    {metric.label}
                  </span>
                  <StatusMark
                    state={metric.state}
                    label={STATUS[metric.state].label}
                  />
                </div>
                <span className="block font-sans text-3xl font-semibold tracking-tight text-white">
                  {metric.value}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-brand-teal-200/60">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Generation profile */}
          <div className="border-t border-white/10 p-6 sm:p-8">
            <GenerationChart data={monitoring.generationProfile} />
          </div>

          {/* Site table */}
          <div className="border-t border-white/10 p-6 sm:p-8">
            <h3 className="mb-1 font-display text-sm font-bold">Sites under management</h3>
            <p className="mb-5 text-xs text-brand-teal-200/60">
              Load is the share of installed capacity currently being drawn.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-brand-teal-200/50">
                    <th scope="col" className="py-3 pr-4 font-bold">
                      Site
                    </th>
                    <th scope="col" className="py-3 pr-4 font-bold">
                      State
                    </th>
                    <th scope="col" className="py-3 pr-4 font-bold">
                      Capacity
                    </th>
                    <th scope="col" className="py-3 pr-4 font-bold">
                      Uptime
                    </th>
                    <th scope="col" className="py-3 pr-4 font-bold">
                      Load
                    </th>
                    <th scope="col" className="py-3 font-bold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {monitoring.sites.map((site) => (
                    <tr key={site.name} className="transition-colors hover:bg-white/[0.03]">
                      <th scope="row" className="py-4 pr-4 font-semibold text-white">
                        {site.name}
                      </th>
                      <td className="py-4 pr-4 text-brand-teal-200/70">{site.state}</td>
                      <td className="py-4 pr-4 text-brand-teal-200/70 [font-variant-numeric:tabular-nums]">
                        {site.capacity}
                      </td>
                      <td className="py-4 pr-4 text-brand-teal-200/70 [font-variant-numeric:tabular-nums]">
                        {site.uptime}
                      </td>
                      <td className="py-4 pr-4">
                        <LoadMeter load={site.load} />
                      </td>
                      <td className="py-4">
                        <StatusMark
                          state={SITE_STATUS[site.status]}
                          label={SITE_STATUS_LABEL[site.status]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* A reminder of what the rows in that table actually are. */}
        <figure className="mt-8 m-0">
          <div className="relative aspect-21/9 overflow-hidden rounded-sm border border-white/10">
            <Image
              src="/images/project-village-aerial.png"
              alt="Aerial view of a rural Nigerian community served by an Ashipa Electric distributed energy system"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed text-brand-teal-200/50">
            Every uptime figure above is a community with power that evening.
          </figcaption>
        </figure>

        {/* Capabilities -------------------------------------------------- */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-brand-teal-900/60 bg-brand-teal-900/60 sm:grid-cols-2 lg:grid-cols-3">
          {monitoring.capabilities.map((capability) => (
            <div
              key={capability.title}
              className="bg-brand-teal-950 p-7 transition-colors hover:bg-brand-teal-900/40"
            >
              <h3 className="mb-3 font-display text-base font-bold leading-snug">
                {capability.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-teal-200/75">
                {capability.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={enquiryHref("remote-monitoring")}
            onClick={() =>
              trackEvent("resource_requested", {
                resource: "Asset Monitoring Assessment",
                kind: "request",
                requestType: "remote-monitoring",
              })
            }
            className="inline-flex items-center gap-2 rounded-sm bg-brand-red-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-brand-red-600 active:scale-95"
          >
            Get your assets monitored
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="max-w-sm text-xs leading-relaxed text-brand-teal-200/60">
            We instrument plants we did not build. Send us what you own and we will
            tell you what it takes to see it properly.
          </p>
        </div>
      </div>
    </section>
  );
}
