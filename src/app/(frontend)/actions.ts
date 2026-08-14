"use server";

import { getPayload } from "payload";

import config from "@payload-config";
import {
  companySizes,
  locationOptions,
  powerSources,
  requestTypes,
  sectors,
  timelines,
  type Option,
} from "@/content/enquiryOptions";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Keyed by field name so the form can render errors inline. */
  errors?: Record<string, string>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

/**
 * Server-side validation is the only validation that counts here. A Server
 * Action is reachable by direct POST, so the `required` attributes on the form
 * are a convenience for real visitors and nothing more.
 *
 * Hand-rolled rather than schema-based: the project has no validation library
 * installed, and adding a dependency for eight fields is not worth the bundle.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string, maxLength = 500): string {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLength);
}

/**
 * Rejects anything not on the canonical option list instead of coercing it.
 * Storing an arbitrary attacker-supplied string in a `select` column produces a
 * row the admin UI cannot render.
 *
 * Returning the matched option's own `value` rather than the submitted string
 * is what carries the literal type through: the result is the collection's
 * union, so a value the `select` field would reject cannot compile.
 */
function choice<V extends string>(
  formData: FormData,
  key: string,
  options: readonly Option<V>[],
): V | undefined {
  const value = text(formData, key, 100);
  if (!value) return undefined;
  return options.find((option) => option.value === value)?.value;
}

/** Returns undefined for blanks so optional numbers stay null in the database. */
function number(formData: FormData, key: string, max = 10_000_000): number | undefined {
  const value = text(formData, key, 20).replace(/,/g, "");
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) return undefined;
  return parsed;
}

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot. Real browsers leave this hidden field empty; most naive bots fill
  // every input they find. Answer with the success message rather than an error
  // so the bot has no signal that it was rejected.
  if (text(formData, "website")) {
    return { status: "success", message: "Thank you — your request has been received." };
  }

  const fullName = text(formData, "fullName", 120);
  const email = text(formData, "email", 200).toLowerCase();
  const requestType = choice(formData, "requestType", requestTypes);
  const message = text(formData, "message", 4000);

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Please tell us your name.";
  if (!email) errors.email = "Please provide an email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address does not look right.";
  if (!requestType) errors.requestType = "Please choose what you need.";
  if (!message) errors.message = "Please tell us a little about your project.";

  // The trailing `!requestType` is redundant at runtime — the check above
  // already recorded an error for it — but it is what narrows the value to the
  // collection's union below, so the write does not need a cast.
  if (Object.keys(errors).length > 0 || !requestType) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "enquiries",
      // The collection denies anonymous `create` on purpose, so that the REST
      // endpoint is not an open write. This call is trusted server code and
      // has already validated its input, so it bypasses that rule.
      overrideAccess: true,
      data: {
        requestType,
        status: "new",
        fullName,
        email,
        phone: text(formData, "phone", 40) || undefined,
        jobTitle: text(formData, "jobTitle", 120) || undefined,
        company: text(formData, "company", 160) || undefined,
        companySize: choice(formData, "companySize", companySizes),
        sector: choice(formData, "sector", sectors),
        location: choice(formData, "location", locationOptions),
        siteAddress: text(formData, "siteAddress", 240) || undefined,
        peakDemandKw: number(formData, "peakDemandKw", 500_000),
        monthlyConsumptionKwh: number(formData, "monthlyConsumptionKwh"),
        monthlyEnergySpend: number(formData, "monthlyEnergySpend", 1_000_000_000),
        dailyOutageHours: number(formData, "dailyOutageHours", 24),
        currentPowerSource: choice(formData, "currentPowerSource", powerSources),
        timeline: choice(formData, "timeline", timelines),
        message,
        sourcePage: text(formData, "sourcePage", 200) || undefined,
      },
    });

    return {
      status: "success",
      message:
        "Thank you — your request has been received. An engineer from our team will respond within two business days.",
    };
  } catch (error) {
    // The enquirer must never see a stack trace, and must never be told their
    // request went through when it did not: the phone number in the page header
    // is the fallback path.
    console.error("[enquiries] submission failed", error);
    return {
      status: "error",
      message:
        "We could not submit your request just now. Please try again, or reach us directly on +234 703 992 9954.",
    };
  }
}
