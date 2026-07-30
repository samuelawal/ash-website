import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import type { Plugin } from "payload";
import sharp from "sharp";

import { Articles } from "./collections/Articles";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Uploads go to local disk by default, which is right for a VM or a container
 * with a persistent volume. Set the S3_* variables (Supabase Storage exposes an
 * S3-compatible endpoint) and they move off-box instead — required on Vercel or
 * Cloud Run, where the filesystem is wiped between deploys.
 */
const storagePlugins: Plugin[] = process.env.S3_BUCKET
  ? [
      s3Storage({
        collections: { media: true },
        bucket: process.env.S3_BUCKET,
        config: {
          endpoint: process.env.S3_ENDPOINT,
          region: process.env.S3_REGION,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
          },
          // Supabase Storage requires path-style addressing.
          forcePathStyle: true,
        },
      }),
    ]
  : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      // Only the suffix — setting `title` here would override each view's own
      // name, giving "Ashipa Electric CMS — Ashipa Electric CMS" on every page
      // instead of "Articles — Ashipa Electric CMS".
      titleSuffix: "— Ashipa Electric CMS",
      description: "Publish articles and manage content for Ashipa Electric.",
      // The square 512x512 Ashipa mark, copied from the site's own icon.
      // Deliberately not the wordmark — at 2560x341 it renders as a sliver.
      icons: [
        { rel: "icon", type: "image/png", url: "/brand/favicon.png" },
        { rel: "apple-touch-icon", type: "image/png", url: "/brand/favicon.png" },
      ],
    },
    components: {
      graphics: {
        // Paths resolve against `importMap.baseDir` (src/). Re-run
        // `npm run generate:importmap` after changing either of these.
        Logo: "/components/admin/AshipaLogo#AshipaLogo",
        Icon: "/components/admin/AshipaIcon#AshipaIcon",
      },
    },
  },
  collections: [Articles, Categories, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [...storagePlugins],
  // Powers upload resizing for the Media collection's `imageSizes`.
  sharp,
});
