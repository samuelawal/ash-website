/**
 * Single source of truth for the enquiry form's option lists.
 *
 * Both the public form and the Payload `enquiries` collection import from here,
 * so a value written by the form is always a value the collection's `select`
 * fields recognise. Adding an option in one place without the other is what
 * silently produces unreadable rows in the admin lead inbox.
 */

export interface Option<V extends string = string> {
  label: string;
  value: V;
}

/**
 * Preserves each option's literal `value` while still returning a *mutable*
 * array, which is what Payload's `options` field property requires.
 *
 * Both halves matter. Without the `const` type parameter the values widen to
 * `string`, and the server action can no longer prove to the compiler that it
 * is writing a value the collection's `select` field actually accepts. Without
 * the copy, a `readonly` tuple is rejected by Payload's field config.
 */
function defineOptions<const T extends readonly Option[]>(
  list: T,
): Option<T[number]["value"]>[] {
  return [...list];
}

/**
 * The reason someone is writing in. This drives which extra fields the form
 * shows — see `requestTypesNeedingLoadProfile` below — and it is the field the
 * business development team filters the inbox on.
 */
export const requestTypes = [
  {
    label: "Request a C&I Feasibility Study",
    value: "ci-feasibility",
    blurb:
      "Solar, hybrid, or battery storage for a commercial or industrial site. We model yield, savings, and payback against your actual load.",
  },
  {
    label: "Request an Energy Audit",
    value: "energy-audit",
    blurb:
      "An engineer-led audit of your current supply, tariff, diesel spend, and load profile, with a costed efficiency and generation plan.",
  },
  {
    label: "Partner with us on Mini-Grids",
    value: "minigrid-partnership",
    blurb:
      "Community, developer, DFI, or government partnerships on distributed energy and rural electrification projects.",
  },
  {
    label: "Deploy EV Charging",
    value: "ev-charging",
    blurb:
      "AC and DC charge points for fleets, filling stations, malls, estates, and workplaces — including site suitability and payment integration.",
  },
  {
    label: "Remote Monitoring & Metering",
    value: "remote-monitoring",
    blurb:
      "Telemetry, smart metering, revenue assurance, and SCADA integration for assets you already own or operate.",
  },
  {
    label: "EPC & O&M Services",
    value: "epc-om",
    blurb:
      "Engineering, procurement, construction, and long-term operations and maintenance for existing or planned assets.",
  },
  {
    label: "General Enquiry",
    value: "general",
    blurb: "Media, careers, supplier, or anything else that does not fit above.",
  },
] as const;

export type RequestTypeValue = (typeof requestTypes)[number]["value"];

/**
 * Load-profile questions are only meaningful for requests where we are sizing a
 * system. Asking a journalist for their peak demand in kW is the fastest way to
 * lose the enquiry, so the form hides the block for the other request types.
 */
export const requestTypesNeedingLoadProfile: readonly string[] = [
  "ci-feasibility",
  "energy-audit",
  "ev-charging",
  "epc-om",
];

export const companySizes = defineOptions([
  { label: "1–10 employees", value: "1-10" },
  { label: "11–50 employees", value: "11-50" },
  { label: "51–200 employees", value: "51-200" },
  { label: "201–1,000 employees", value: "201-1000" },
  { label: "More than 1,000 employees", value: "1000+" },
  { label: "Government / Public sector", value: "public-sector" },
  { label: "Community / Cooperative", value: "community" },
  { label: "Development partner / DFI", value: "dfi" },
]);

export const sectors = defineOptions([
  { label: "Agro-processing & Cold Chain", value: "agro-processing" },
  { label: "Manufacturing & Industry", value: "manufacturing" },
  { label: "Commercial Real Estate & Retail", value: "commercial-property" },
  { label: "Hospitality & Hotels", value: "hospitality" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Telecoms & Data Centres", value: "telecoms" },
  { label: "Mining & Extractives", value: "mining" },
  { label: "Transport & Logistics / Fleet", value: "transport" },
  { label: "Residential Estate / Township", value: "residential-estate" },
  { label: "Public Infrastructure", value: "public-infrastructure" },
  { label: "Rural / Underserved Community", value: "rural-community" },
  { label: "Other", value: "other" },
]);

/** What the site runs on today — drives how much diesel we can displace. */
export const powerSources = defineOptions([
  { label: "Grid (DisCo) only", value: "grid" },
  { label: "Grid + diesel/petrol generator", value: "grid-plus-generator" },
  { label: "Generator only (off-grid)", value: "generator-only" },
  { label: "Existing solar or hybrid system", value: "existing-solar" },
  { label: "No power supply yet / greenfield site", value: "none" },
]);

export const timelines = defineOptions([
  { label: "Immediately — budget approved", value: "immediate" },
  { label: "Within 3 months", value: "3-months" },
  { label: "3–12 months", value: "3-12-months" },
  { label: "Exploring / building the business case", value: "exploring" },
]);

/**
 * All 36 states plus the FCT, then an international escape hatch. Kept as plain
 * strings because the label and the stored value are identical, and a state
 * list that renames itself between deploys would break historical rows.
 */
export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun",
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
  "Zamfara",
] as const;

export type NigerianState = (typeof nigerianStates)[number];

export const locationOptions: Option<NigerianState | "outside-nigeria">[] = [
  ...nigerianStates.map((state) => ({ label: state, value: state })),
  { label: "Outside Nigeria", value: "outside-nigeria" },
];

/** Payload `select` fields want `{label, value}` and nothing else. */
export const requestTypeOptions: Option<RequestTypeValue>[] = requestTypes.map(
  ({ label, value }) => ({ label, value }),
);

export function requestTypeLabel(value: string): string {
  return requestTypes.find((type) => type.value === value)?.label ?? value;
}
