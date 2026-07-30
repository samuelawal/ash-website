import path from "path";
import { fileURLToPath } from "url";

import type { CollectionConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  access: {
    // Uploads are public so images render for site visitors.
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    // Written into `public/media`, so Next serves them statically at /media/<file>.
    // On an ephemeral filesystem (Vercel, Cloud Run) swap this for @payloadcms/storage-s3.
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 480, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
    // Cropping and focal point make the 16:10 article cards predictable.
    crop: true,
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the image for screen readers and for when the image fails to load.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Optional photographer or source attribution.",
      },
    },
  ],
};
