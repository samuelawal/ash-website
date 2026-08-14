import { traceiq } from "traceiq-sdk-js";

/**
 * The site's whole event vocabulary. Keeping it as a union rather than passing
 * bare strings to `traceiq.track()` is what stops the same action from arriving
 * as `contact_submit`, `contactSubmitted`, and `Contact Form` across three
 * components — once events are in the warehouse, renaming them is expensive.
 *
 * Page views are not here: those are `$page` events emitted by
 * <TraceIQPageViews />, and article reads are simply `$page` on /blog/[slug].
 */
export type SiteEvent =
  | "newsletter_subscribed"
  | "contact_request_submitted"
  | "job_application_opened"
  | "career_inquiry_started"
  | "nav_cta_clicked"
  | "resource_requested";

/**
 * Both helpers are safe to call anywhere, including during SSR: the SDK is only
 * initialized in the browser by `instrumentation-client.ts`, and an
 * uninitialized client drops events instead of throwing. The try/catch is for
 * the synchronous work the SDK does before its own internal error handling
 * takes over — measurement must never be the thing that breaks the page.
 */
export function trackEvent(
  event: SiteEvent,
  properties?: Record<string, unknown>,
) {
  try {
    traceiq.track(event, properties);
  } catch (error) {
    console.warn(`TraceIQ could not track ${event}`, error);
  }
}

export function captureError(
  error: unknown,
  properties?: Record<string, unknown>,
) {
  try {
    traceiq.captureException(error, properties);
  } catch (failure) {
    console.warn("TraceIQ could not capture an exception", failure);
  }
}
