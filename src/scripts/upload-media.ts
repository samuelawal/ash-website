/**
 * Pushes everything in `public/media` up to the configured S3/Supabase bucket,
 * using the filename as the object key.
 *
 * Why this exists: media uploaded before storage was configured lives only on
 * the local disk. Payload's database rows already reference those filenames, so
 * uploading them under the same keys makes existing articles work with no
 * database changes and no re-seeding.
 *
 *   npx tsx --env-file=.env src/scripts/upload-media.ts
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const mediaDir = path.resolve(dirname, "../../public/media");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

async function main() {
  const { S3_BUCKET, S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } =
    process.env;

  const missing = Object.entries({
    S3_BUCKET,
    S3_ENDPOINT,
    S3_REGION,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    console.error("Set them in .env first — see the Media storage section.");
    process.exit(1);
  }

  const client = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID as string,
      secretAccessKey: S3_SECRET_ACCESS_KEY as string,
    },
    // Supabase Storage requires path-style addressing.
    forcePathStyle: true,
  });

  let files: string[];
  try {
    files = await fs.readdir(mediaDir);
  } catch {
    console.error(`No local media directory at ${mediaDir} — nothing to upload.`);
    process.exit(1);
  }

  const uploadable = files.filter((f) => !f.startsWith("."));
  if (!uploadable.length) {
    console.log("No files to upload.");
    return;
  }

  let ok = 0;
  for (const file of uploadable) {
    const body = await fs.readFile(path.join(mediaDir, file));
    const ext = path.extname(file).toLowerCase();

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: file,
          Body: body,
          ContentType: CONTENT_TYPES[ext] ?? "application/octet-stream",
        }),
      );
      console.log(`  uploaded  ${file}`);
      ok += 1;
    } catch (error) {
      console.error(`  FAILED    ${file}:`, (error as Error).message);
    }
  }

  console.log(`\n${ok}/${uploadable.length} uploaded to "${S3_BUCKET}".`);
  if (ok < uploadable.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
