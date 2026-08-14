/**
 * Helpers for routing a visitor into the enquiry form.
 *
 * Every section CTA that wants a specific kind of request goes through here, so
 * the query parameter is defined once and the contact page is the only place
 * that has to know how to validate it.
 */

export const ENQUIRY_REQUEST_PARAM = "request";

export function enquiryHref(requestType?: string): string {
  return requestType
    ? `/contact?${ENQUIRY_REQUEST_PARAM}=${encodeURIComponent(requestType)}`
    : "/contact";
}
