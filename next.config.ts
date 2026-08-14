import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 narrowed the default to `[75]`, which silently coerced the
    // `quality` props already used by the hero and section backgrounds.
    qualities: [75, 80, 85],
    // No `remotePatterns`: every image is now either a local file under /public
    // or served by Payload. The one former entry, wp.ashipaelectric.com, is
    // behind bot protection that returns an HTML captcha to server-side
    // fetches, so the optimiser could never load from it anyway.
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
