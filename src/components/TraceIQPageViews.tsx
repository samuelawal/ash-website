"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { traceiq } from "traceiq-sdk-js";

/**
 * Emits one TraceIQ `$page` event per committed navigation, including the first
 * render. `instrumentation-client.ts` turns the SDK's own `autoTrackPageViews`
 * off so this stays the single source of page views.
 *
 * The send happens in an effect rather than at render time so `window.location`
 * and `document.title` — which the SDK reads for event context — describe the
 * page being navigated *to*, not the one being left.
 *
 * `useSearchParams` client-side renders everything up to the nearest Suspense
 * boundary, so the layout wraps this in one. Blog pagination and category
 * filters live entirely in the query string, which is why the search params are
 * tracked at all.
 */
export default function TraceIQPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Depend on the serialized string, not the params object, so the effect keys
  // off the value instead of React identity.
  const query = searchParams.toString();

  useEffect(() => {
    // A no-op when the SDK was never initialized (keys unset, or /admin).
    traceiq.page(query ? `${pathname}?${query}` : pathname);
  }, [pathname, query]);

  return null;
}
