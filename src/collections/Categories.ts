import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: 'Shown on the article card badge, e.g. "Partnership".',
      },
    },
    slugField(),
  ],
};
