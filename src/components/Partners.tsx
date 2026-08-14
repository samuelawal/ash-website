"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { siteData, type PartnerItem } from "@/content/siteData";

/**
 * The partner wall.
 *
 * Logos are grouped by `category` and shown in their own colours — several of
 * these marks are governed by brand guidelines that forbid recolouring or
 * greyscaling, so the tiles do the unifying instead: one white surface, one
 * logo height, `object-contain`, and the group heading carrying the meaning.
 * Captioning 30-odd tiles individually reads as noise.
 *
 * Entries with no `logo` render as a wordmark tile, so a relationship can be
 * listed before its artwork (or permission to use it) arrives.
 */
function groupByCategory(items: PartnerItem[]) {
  const groups = new Map<string, PartnerItem[]>();
  for (const item of items) {
    // Insertion order is the display order, so siteData controls both.
    const existing = groups.get(item.category);
    if (existing) existing.push(item);
    else groups.set(item.category, [item]);
  }
  return [...groups.entries()];
}

function PartnerTile({ partner }: { partner: PartnerItem }) {
  return (
    <li
      className={`flex h-24 items-center justify-center rounded-sm border border-brand-teal-100 px-5 py-4 transition-colors ${
        partner.onDark
          ? "border-brand-teal-900 bg-brand-teal-900"
          : "bg-white hover:border-brand-teal-200"
      }`}
    >
      {partner.logo ? (
        <div className="relative h-full w-full">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 15vw"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center font-display text-sm font-bold leading-tight tracking-tight text-brand-teal-950">
          {partner.name}
        </span>
      )}
    </li>
  );
}

export default function Partners() {
  const { partners } = siteData;

  if (partners.items.length === 0) return null;

  const groups = groupByCategory(partners.items);

  return (
    <section
      id="partners"
      className="border-y border-brand-teal-100/30 bg-[#f6f5fa] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700"
          >
            {partners.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl font-extrabold tracking-tight text-brand-teal-950 sm:text-4xl"
          >
            {partners.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="leading-relaxed text-brand-teal-900/80"
          >
            {partners.subtitle}
          </motion.p>
        </div>

        <div className="space-y-12">
          {groups.map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-brand-teal-900/50">
                {category}
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-brand-teal-100"
                />
              </h3>
              {/* Discrete bordered tiles rather than a flush `gap-px` grid: a
                  group whose count does not fill the last row would otherwise
                  paint the grid background through the empty cells, which reads
                  as missing logos. */}
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {items.map((partner) => (
                  <PartnerTile key={partner.name} partner={partner} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
