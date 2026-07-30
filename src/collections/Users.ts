import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email"],
    group: "Admin",
  },
  // Enables email/password login for the /admin panel.
  auth: true,
  access: {
    // Only signed-in staff can enumerate or manage accounts.
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Shown as the default byline when you publish an article.",
      },
    },
  ],
};
