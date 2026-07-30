import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { revalidateArticle, revalidateArticleDelete } from "../hooks/revalidateArticle";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Content",
    description: "Write, preview, and publish articles for the site.",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}/blog/${data?.slug ?? ""}`,
    },
  },
  access: {
    // Anonymous visitors only ever see published articles; staff see drafts too.
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: { equals: "published" },
      };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  // Drafts let editors save work in progress; autosave protects against lost work.
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidateArticle],
    afterDelete: [revalidateArticleDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              maxLength: 300,
              admin: {
                description:
                  "The summary shown on article cards and in search results. Aim for 1–2 sentences.",
              },
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description:
                  "Displayed at the top of the article and on its card. Landscape images work best.",
              },
            },
            {
              name: "content",
              type: "richText",
              required: true,
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              admin: {
                description:
                  "Overrides the browser tab and search result title. Defaults to the article title.",
              },
            },
            {
              name: "metaDescription",
              type: "textarea",
              maxLength: 200,
              admin: {
                description:
                  "Overrides the search result description. Defaults to the excerpt.",
              },
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Image used when the article is shared on social media. Defaults to the hero image.",
              },
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Controls the display date and the ordering of the article list.",
      },
      hooks: {
        beforeChange: [
          // Stamp a publish date the first time an article goes live.
          ({ siblingData, value }) => {
            if (siblingData?._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "byline",
      type: "text",
      required: true,
      defaultValue: "Ashipa Communications",
      admin: {
        position: "sidebar",
        description:
          'Who the article is credited to — a person or a team, e.g. "Investment Team".',
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Pin this article to the top of the blog index.",
      },
    },
  ],
};
