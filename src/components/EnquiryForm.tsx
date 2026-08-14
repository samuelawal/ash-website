"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { initialEnquiryState, submitEnquiry } from "@/app/(frontend)/actions";
import {
  companySizes,
  locationOptions,
  powerSources,
  requestTypes,
  requestTypesNeedingLoadProfile,
  sectors,
  timelines,
  type Option,
} from "@/content/enquiryOptions";
import { trackEvent } from "@/lib/analytics";

const fieldClass =
  "w-full bg-[#f6f5fa] border border-brand-teal-100/40 focus:border-brand-teal-600 outline-none rounded-sm px-4 py-3.5 text-sm text-brand-teal-950 transition-colors";
const labelClass =
  "text-xs font-bold uppercase tracking-wider text-brand-teal-950/70 block";

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-brand-teal-900/60 leading-snug">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] font-semibold text-brand-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  name,
  id,
  options,
  placeholder,
  defaultValue,
}: {
  name: string;
  id: string;
  options: readonly Option[];
  placeholder: string;
  defaultValue?: string;
}) {
  return (
    <select name={name} id={id} defaultValue={defaultValue ?? ""} className={fieldClass}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function EnquiryForm({
  defaultRequestType = "ci-feasibility",
}: {
  /** Lets a section CTA deep-link straight into the right request. */
  defaultRequestType?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const pathname = usePathname();
  const uid = useId();

  // Held in React state rather than read off the DOM because the load-profile
  // block appears and disappears with it.
  const [requestType, setRequestType] = useState(defaultRequestType);
  const showLoadProfile = requestTypesNeedingLoadProfile.includes(requestType);
  const activeType = requestTypes.find((type) => type.value === requestType);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("contact_request_submitted", { service: requestType });
    }
    // `requestType` is deliberately not a dependency: the event belongs to the
    // submission, and re-firing it if the visitor changes the dropdown
    // afterwards would double-count the conversion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="bg-white border border-brand-green-500/30 p-8 sm:p-12 rounded-sm shadow-sm text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-brand-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-brand-green-600" />
        </div>
        <h3 className="text-xl font-bold font-display text-brand-teal-950">
          Request received
        </h3>
        <p className="text-sm text-brand-teal-900/80 leading-relaxed max-w-md mx-auto">
          {state.message}
        </p>
        <p className="text-xs text-brand-teal-900/60">
          Need to speak to someone sooner? Call{" "}
          <a href="tel:+2347039929954" className="font-semibold text-brand-red-600">
            +234 703 992 9954
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="bg-white border border-brand-teal-100/40 p-8 sm:p-10 rounded-sm shadow-sm space-y-6"
    >
      {/* Records which page converted, without asking the visitor. */}
      <input type="hidden" name="sourcePage" value={pathname} />

      {/* Honeypot — hidden from people, irresistible to naive bots. Not
          `display:none`, which some bots skip; off-screen and untabbable. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          type="text"
          id={`${uid}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        label="What do you need?"
        htmlFor={`${uid}-requestType`}
        error={state.errors?.requestType}
      >
        <select
          name="requestType"
          id={`${uid}-requestType`}
          value={requestType}
          onChange={(event) => setRequestType(event.target.value)}
          className={fieldClass}
        >
          {requestTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </Field>

      {activeType && (
        <p className="text-xs text-brand-teal-900/70 leading-relaxed bg-brand-teal-100/30 border-l-2 border-brand-red-500 px-4 py-3 rounded-sm">
          {activeType.blurb}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full name" htmlFor={`${uid}-fullName`} error={state.errors?.fullName}>
          <input
            type="text"
            id={`${uid}-fullName`}
            name="fullName"
            required
            placeholder="Jane Adeyemi"
            autoComplete="name"
            className={fieldClass}
          />
        </Field>
        <Field label="Work email" htmlFor={`${uid}-email`} error={state.errors?.email}>
          <input
            type="email"
            id={`${uid}-email`}
            name="email"
            required
            placeholder="jane@company.com"
            autoComplete="email"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Phone" htmlFor={`${uid}-phone`}>
          <input
            type="tel"
            id={`${uid}-phone`}
            name="phone"
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            className={fieldClass}
          />
        </Field>
        <Field label="Job title" htmlFor={`${uid}-jobTitle`}>
          <input
            type="text"
            id={`${uid}-jobTitle`}
            name="jobTitle"
            placeholder="Head of Facilities"
            autoComplete="organization-title"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Organisation" htmlFor={`${uid}-company`}>
          <input
            type="text"
            id={`${uid}-company`}
            name="company"
            placeholder="Company or community name"
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label="Organisation size" htmlFor={`${uid}-companySize`}>
          <Select
            name="companySize"
            id={`${uid}-companySize`}
            options={companySizes}
            placeholder="Select size"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Sector" htmlFor={`${uid}-sector`}>
          <Select
            name="sector"
            id={`${uid}-sector`}
            options={sectors}
            placeholder="Select sector"
          />
        </Field>
        <Field label="State / Region" htmlFor={`${uid}-location`}>
          <Select
            name="location"
            id={`${uid}-location`}
            options={locationOptions}
            placeholder="Select location"
          />
        </Field>
      </div>

      {showLoadProfile && (
        <div className="space-y-6 border-t border-brand-teal-100/50 pt-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-display text-brand-teal-950">
              Site &amp; load profile
            </h4>
            <p className="text-xs text-brand-teal-900/70 leading-relaxed">
              Every field here is optional, but the more you share the faster we can
              come back with a costed, engineer-reviewed proposal instead of a
              follow-up questionnaire. Estimates are fine.
            </p>
          </div>

          <Field label="Site address or nearest town" htmlFor={`${uid}-siteAddress`}>
            <input
              type="text"
              id={`${uid}-siteAddress`}
              name="siteAddress"
              placeholder="e.g. Ikeja Industrial Estate, Lagos"
              className={fieldClass}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field
              label="Peak demand (kW)"
              htmlFor={`${uid}-peakDemandKw`}
              hint="Largest simultaneous load, or your generator's rating."
            >
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="any"
                id={`${uid}-peakDemandKw`}
                name="peakDemandKw"
                placeholder="250"
                className={fieldClass}
              />
            </Field>
            <Field
              label="Monthly consumption (kWh)"
              htmlFor={`${uid}-monthlyConsumptionKwh`}
              hint="From your DisCo bill or generator run hours."
            >
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="any"
                id={`${uid}-monthlyConsumptionKwh`}
                name="monthlyConsumptionKwh"
                placeholder="45000"
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field
              label="Monthly energy spend (₦)"
              htmlFor={`${uid}-monthlyEnergySpend`}
              hint="Grid tariff plus diesel and maintenance."
            >
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="any"
                id={`${uid}-monthlyEnergySpend`}
                name="monthlyEnergySpend"
                placeholder="8500000"
                className={fieldClass}
              />
            </Field>
            <Field label="Average outage hours per day" htmlFor={`${uid}-dailyOutageHours`}>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="24"
                step="any"
                id={`${uid}-dailyOutageHours`}
                name="dailyOutageHours"
                placeholder="10"
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Current power source" htmlFor={`${uid}-currentPowerSource`}>
              <Select
                name="currentPowerSource"
                id={`${uid}-currentPowerSource`}
                options={powerSources}
                placeholder="Select source"
              />
            </Field>
            <Field label="Decision timeline" htmlFor={`${uid}-timeline`}>
              <Select
                name="timeline"
                id={`${uid}-timeline`}
                options={timelines}
                placeholder="Select timeline"
              />
            </Field>
          </div>
        </div>
      )}

      <Field
        label="Tell us about your project"
        htmlFor={`${uid}-message`}
        error={state.errors?.message}
      >
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          required
          placeholder="What are you trying to solve, and what does success look like?"
          className={`${fieldClass} resize-none`}
        />
      </Field>

      {state.status === "error" && !state.errors && (
        <p
          aria-live="polite"
          className="text-sm font-semibold text-brand-red-600 flex items-start gap-2 bg-brand-red-500/5 border border-brand-red-500/20 px-4 py-3 rounded-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand-teal-950 text-white font-bold py-3.5 rounded-sm hover:bg-brand-teal-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm tracking-wide shadow-md cursor-pointer flex items-center justify-center gap-2"
      >
        {pending && <Loader2 className="w-4 h-4 animate-spin" />}
        {pending ? "Sending…" : "Submit Request"}
      </button>

      <p className="text-[11px] text-brand-teal-900/60 leading-relaxed text-center">
        We use your details only to respond to this request, in line with the Nigeria
        Data Protection Act. We never sell or share them.
      </p>
    </form>
  );
}
