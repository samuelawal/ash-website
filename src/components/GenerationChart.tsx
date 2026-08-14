"use client";

import { useMemo, useRef, useState } from "react";

import type { GenerationPoint } from "@/content/siteData";

/**
 * A single-series area chart of fleet PV output across a day.
 *
 * One series, so there is no legend — the caption names what is plotted. The
 * hover layer is part of the chart rather than an enhancement: the crosshair
 * snaps to the nearest hour so the reader aims at a time of day, not at a 2px
 * line, and the same readout is available from the keyboard. Every value is
 * also reachable without pointing at anything, via the table below.
 */

const VIEW_W = 720;
const VIEW_H = 240;
const PAD = { top: 16, right: 16, bottom: 28, left: 48 };
const PLOT_W = VIEW_W - PAD.left - PAD.right;
const PLOT_H = VIEW_H - PAD.top - PAD.bottom;
const BASE_Y = PAD.top + PLOT_H;

/** A clean maximum above the day's peak, so the ticks land on round numbers. */
const MAX_KW = 350;
const Y_TICKS = [0, 100, 200, 300];
const X_TICK_HOURS = [0, 6, 12, 18, 23];

const SERIES = "var(--color-status-good)";

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function GenerationChart({ data }: { data: GenerationPoint[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { points, linePath, areaPath, peak } = useMemo(() => {
    const points = data.map((point, index) => ({
      ...point,
      x: PAD.left + (index / (data.length - 1)) * PLOT_W,
      y: PAD.top + PLOT_H - (point.kw / MAX_KW) * PLOT_H,
    }));

    const linePath = points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
      .join(" ");

    const first = points[0];
    const last = points[points.length - 1];
    const areaPath = `${linePath} L${last.x} ${BASE_Y} L${first.x} ${BASE_Y} Z`;

    // The one point worth labelling directly. Everything else is carried by the
    // axis, the tooltip, and the table.
    const peak = points.reduce((best, point) => (point.kw > best.kw ? point : best));

    return { points, linePath, areaPath, peak };
  }, [data]);

  const active = activeIndex === null ? null : points[activeIndex];

  /** Screen pixels → viewBox units; the SVG scales with its container. */
  function pointerToIndex(clientX: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return null;
    const viewX = ((clientX - rect.left) / rect.width) * VIEW_W;
    const ratio = (viewX - PAD.left) / PLOT_W;
    const index = Math.round(ratio * (data.length - 1));
    return Math.min(data.length - 1, Math.max(0, index));
  }

  function handleKeyDown(event: React.KeyboardEvent<SVGSVGElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      setActiveIndex((current) =>
        Math.min(data.length - 1, Math.max(0, (current ?? 0) + step)),
      );
    } else if (event.key === "Escape") {
      setActiveIndex(null);
    }
  }

  return (
    <figure className="m-0">
      <figcaption className="mb-1 font-display text-sm font-bold text-white">
        Aggregate PV generation across monitored sites
      </figcaption>
      <p className="mb-5 text-xs text-brand-teal-200/60">
        Kilowatts, hourly, on a representative clear day. Hover or use the arrow
        keys to read a specific hour.
      </p>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400/60"
          role="img"
          aria-label={`Aggregate PV generation by hour, peaking at ${peak.kw} kilowatts at ${formatHour(peak.hour)}. The full hourly readings are listed in the table below the chart.`}
          tabIndex={0}
          onPointerMove={(event) => setActiveIndex(pointerToIndex(event.clientX))}
          onPointerLeave={() => setActiveIndex(null)}
          onKeyDown={handleKeyDown}
          onBlur={() => setActiveIndex(null)}
        >
          {/* Recessive hairline grid — solid, never dashed. */}
          {Y_TICKS.map((tick) => {
            const y = PAD.top + PLOT_H - (tick / MAX_KW) * PLOT_H;
            return (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={VIEW_W - PAD.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-white/40 text-[11px] [font-variant-numeric:tabular-nums]"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Positioned from the plotted point rather than recomputed from the
              hour, so a tick can never drift away from the reading it labels. */}
          {X_TICK_HOURS.map((hour) => {
            const point = points.find((candidate) => candidate.hour === hour);
            if (!point) return null;
            return (
              <text
                key={hour}
                x={point.x}
                y={VIEW_H - 8}
                textAnchor="middle"
                className="fill-white/40 text-[11px] [font-variant-numeric:tabular-nums]"
              >
                {formatHour(hour)}
              </text>
            );
          })}

          <path d={areaPath} fill={SERIES} fillOpacity={0.1} />
          <path
            d={linePath}
            fill="none"
            stroke={SERIES}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The day's peak, labelled directly — the only value on the plot. */}
          <circle
            cx={peak.x}
            cy={peak.y}
            r={4}
            fill={SERIES}
            stroke="#0a071e"
            strokeWidth={2}
          />
          <text
            x={peak.x}
            y={peak.y - 14}
            textAnchor="middle"
            className="fill-white text-[12px] font-semibold"
          >
            {peak.kw} kW
          </text>

          {active && (
            <g>
              <line
                x1={active.x}
                x2={active.x}
                y1={PAD.top}
                y2={BASE_Y}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1}
              />
              <circle
                cx={active.x}
                cy={active.y}
                r={5}
                fill={SERIES}
                stroke="#0a071e"
                strokeWidth={2}
              />
            </g>
          )}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-sm border border-white/15 bg-brand-teal-900 px-3 py-2 shadow-xl"
            style={{
              // Clamped so the readout never runs off either edge of the plot.
              left: `${Math.min(88, Math.max(12, (active.x / VIEW_W) * 100))}%`,
              top: `${(active.y / VIEW_H) * 100 - 4}%`,
            }}
          >
            <span className="block text-sm font-bold text-white [font-variant-numeric:tabular-nums]">
              {active.kw} kW
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-brand-teal-200/70">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-3 rounded-full"
                style={{ backgroundColor: SERIES }}
              />
              {formatHour(active.hour)}
            </span>
          </div>
        )}
      </div>

      {/* Every plotted value, reachable without a pointer. */}
      <details className="mt-5 border-t border-white/10 pt-4">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-brand-teal-200/60 transition-colors hover:text-white">
          View as table
        </summary>
        <div className="mt-4 max-h-64 overflow-auto">
          <table className="w-full text-left text-xs">
            <caption className="sr-only">
              Aggregate PV generation in kilowatts, by hour
            </caption>
            <thead className="sticky top-0 bg-brand-teal-950">
              <tr className="text-[10px] uppercase tracking-wider text-brand-teal-200/50">
                <th scope="col" className="py-2 font-bold">
                  Hour
                </th>
                <th scope="col" className="py-2 text-right font-bold">
                  Generation (kW)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((point) => (
                <tr key={point.hour}>
                  <th
                    scope="row"
                    className="py-1.5 font-normal text-brand-teal-200/70 [font-variant-numeric:tabular-nums]"
                  >
                    {formatHour(point.hour)}
                  </th>
                  <td className="py-1.5 text-right text-white [font-variant-numeric:tabular-nums]">
                    {point.kw}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
