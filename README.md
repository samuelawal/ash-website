# Ashipa Electric — Website & CMS

A [Next.js 16](https://nextjs.org) marketing site with a self-hosted
[Payload 3](https://payloadcms.com) CMS for publishing articles.

## Architecture

The app has **two root layouts**, each in its own route group. Next only allows
this because there is no top-level `src/app/layout.tsx` — do not add one back.

```
src/
  app/
    (frontend)/          Public site — its own root layout, fonts, globals.css
      blog/              Article index (paginated, filterable by category)
      blog/[slug]/       Article page
      sitemap.ts         Includes every published article
    (payload)/           CMS — its own root layout
      admin/             The admin panel at /admin
      api/               Payload REST + GraphQL
  collections/           Articles, Categories, Media, Users
  fields/slug.ts         Shared auto-slug field
  hooks/                 Publish → cache revalidation
  lib/articles.ts        Cached read queries used by the frontend
  payload.config.ts
  payload-types.ts       GENERATED — do not edit by hand
```

## Getting started

1. **Create a database.** Any Postgres works; Supabase is the quickest.

2. **Configure the environment.**

   ```bash
   cp .env.example .env
   ```

   Fill in `DATABASE_URI` and `PAYLOAD_SECRET` (generate one with
   `openssl rand -hex 32`).

   > **Supabase:** use the **Session pooler** connection string (port `5432`),
   > not the Transaction pooler (`6543`). Payload's migrations use prepared
   > statements, which the transaction pooler does not support.

3. **Install and run.**

   ```bash
   npm install
   npm run dev
   ```

   In development Payload pushes the schema to the database automatically.

4. **Create the first admin user** at http://localhost:3000/admin — the panel
   prompts for one on first visit.

5. **Optionally seed** the three launch articles:

   ```bash
   npm run seed
   ```

   Re-running is safe; it skips anything already present.

## Publishing

Editors work at `/admin`:

- **Articles** — title, excerpt, hero image, rich-text body, plus an SEO tab for
  overriding the meta title/description and social share image.
- Drafts autosave. An article is only visible to the public once **Published**;
  it can also be scheduled to publish at a future time.
- The **slug** fills in from the title. Changing it after publishing breaks
  inbound links, so it is left editable but flagged in the UI.

Publishing calls `revalidateTag` / `revalidatePath`, so changes reach the live
site within seconds — **no redeploy required**.

## Media

Uploads go to `public/media` on local disk by default, which is correct for a VM
or a container with a persistent volume.

**On Vercel, Cloud Run, or any ephemeral filesystem this will lose files between
deploys.** Set the `S3_*` variables (Supabase Storage exposes an S3-compatible
endpoint) and uploads move off-box automatically — no code change needed.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed` | Insert the launch articles (idempotent) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after editing a collection |
| `npm run generate:importmap` | Regenerate the admin import map after adding a custom component |

After changing any collection, run `npm run generate:types` — the frontend reads
those types, so the build will fail if they are stale.
