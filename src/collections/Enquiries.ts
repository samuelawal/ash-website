import type { CollectionConfig } from "payload";

import {
  companySizes,
  locationOptions,
  powerSources,
  requestTypeOptions,
  sectors,
  timelines,
} from "../content/enquiryOptions";

/**
 * The inbound lead inbox. Every B2B request form on the site writes here —
 * feasibility studies, energy audits, mini-grid partnerships, EV deployments,
 * monitoring, EPC/O&M, and general enquiries — so business development has one
 * queue to work rather than a shared mailbox.
 *
 * Writes come exclusively from the `submitEnquiry` server action, which uses
 * the local API with `overrideAccess`. That is why `create` is closed to the
 * public here: leaving it open would expose `POST /api/enquiries` as an
 * unauthenticated write endpoint for anyone with curl.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "requestType", "status", "fullName", "createdAt"],
    group: "Business Development",
    description:
      "Inbound requests from the website. Work the queue by status — new leads appear at the top.",
  },
  // Newest first: this is a worklist, not an archive. Sits at the config root,
  // not under `admin`, since it governs the API's default order too.
  defaultSort: "-createdAt",
  access: {
    // Leads carry personal and commercially sensitive data (contact details,
    // energy spend). Nothing here is ever public.
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "requestType",
          type: "select",
          required: true,
          options: requestTypeOptions,
          admin: { width: "50%" },
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "new",
          options: [
            { label: "New", value: "new" },
            { label: "Contacted", value: "contacted" },
            { label: "Qualified", value: "qualified" },
            { label: "Proposal sent", value: "proposal-sent" },
            { label: "Won", value: "won" },
            { label: "Lost", value: "lost" },
            { label: "Spam", value: "spam" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                { name: "fullName", type: "text", required: true, admin: { width: "50%" } },
                { name: "email", type: "email", required: true, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", admin: { width: "50%" } },
                {
                  name: "jobTitle",
                  type: "text",
                  label: "Job title",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "company", type: "text", admin: { width: "50%" } },
                {
                  name: "companySize",
                  type: "select",
                  label: "Organisation size",
                  options: companySizes,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "sector",
              type: "select",
              options: sectors,
            },
          ],
        },
        {
          label: "Site & Load",
          description:
            "Only collected for requests where we are sizing a system. Blank on partnership and general enquiries.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "location",
                  type: "select",
                  label: "State / Region",
                  options: locationOptions,
                  admin: { width: "50%" },
                },
                {
                  name: "siteAddress",
                  type: "text",
                  label: "Site address or nearest town",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "peakDemandKw",
                  type: "number",
                  label: "Peak demand (kW)",
                  min: 0,
                  admin: { width: "50%" },
                },
                {
                  name: "monthlyConsumptionKwh",
                  type: "number",
                  label: "Monthly consumption (kWh)",
                  min: 0,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "monthlyEnergySpend",
                  type: "number",
                  label: "Monthly energy spend (₦)",
                  min: 0,
                  admin: {
                    width: "50%",
                    description: "Grid tariff plus diesel, as reported by the enquirer.",
                  },
                },
                {
                  name: "dailyOutageHours",
                  type: "number",
                  label: "Average outage hours per day",
                  min: 0,
                  max: 24,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "currentPowerSource",
              type: "select",
              label: "Current power source",
              options: powerSources,
            },
            {
              name: "timeline",
              type: "select",
              label: "Decision timeline",
              options: timelines,
            },
          ],
        },
        {
          label: "Message & Source",
          fields: [
            { name: "message", type: "textarea" },
            {
              name: "sourcePage",
              type: "text",
              admin: {
                readOnly: true,
                description: "The page the form was submitted from.",
              },
            },
            {
              name: "internalNotes",
              type: "textarea",
              admin: {
                description: "Staff-only. Never shown to the enquirer.",
              },
            },
          ],
        },
      ],
    },
  ],
};
