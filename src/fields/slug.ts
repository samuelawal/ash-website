import type { Field } from "payload";

/** Lowercase, strip accents, collapse anything non-alphanumeric into single hyphens. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A URL slug that auto-fills from `sourceField` when left blank, so editors
 * never have to think about it — but stays editable, because changing a slug
 * after publishing breaks inbound links and should be a deliberate act.
 */
export function slugField(sourceField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    admin: {
      position: "sidebar",
      description:
        "The URL for this entry. Leave blank and it fills in from the title. Avoid changing it once published.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.trim().length > 0) {
            return slugify(value);
          }
          const source = data?.[sourceField];
          return typeof source === "string" ? slugify(source) : value;
        },
      ],
    },
  };
}
