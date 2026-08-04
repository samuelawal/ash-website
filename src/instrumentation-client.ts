import { traceiq } from "traceiq-sdk-js";

/**
 * Boots TraceIQ before React hydrates, which is early enough for its global
 * `error` / `unhandledrejection` handlers to catch faults thrown during
 * hydration itself.
 *
 * Analytics stays off unless both keys are present, so local dev and preview
 * builds send nothing until they are configured on purpose.
 */
const projectId = process.env.NEXT_PUBLIC_TRACEIQ_PROJECT_ID;
const writeKey = process.env.NEXT_PUBLIC_TRACEIQ_WRITE_KEY;

// This file runs for the admin panel too. Editor sessions are internal traffic
// and would drown out the ~few thousand real visits the site gets.
const isAdmin = window.location.pathname.startsWith("/admin");

if (projectId && writeKey && !isAdmin) {
  try {
    traceiq.initialize({
      projectId,
      writeKey,
      // Unset falls back to the SDK's own default (localhost:4000), which is
      // what you want when running the TraceIQ API alongside `npm run dev`.
      endpoint: process.env.NEXT_PUBLIC_TRACEIQ_ENDPOINT,
      // Page views come from <TraceIQPageViews /> instead — this file runs once
      // per document load, and the site navigates client-side after that.
      autoTrackPageViews: false,
      debug: process.env.NODE_ENV === "development",
    });
  } catch (error) {
    // Never let instrumentation take the page down with it.
    console.warn("TraceIQ failed to initialize", error);
  }
}
