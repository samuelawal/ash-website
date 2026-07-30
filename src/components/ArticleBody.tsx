import Image from "next/image";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type UploadValue = {
  url?: string | null;
  alt?: string | null;
  credit?: string | null;
  width?: number | null;
  height?: number | null;
};

/**
 * Renders inline images through next/image rather than a bare <img>, so uploads
 * inside article bodies get the same optimisation and lazy-loading as the rest
 * of the site. Everything else falls through to Payload's default converters.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const value = node.value as UploadValue | undefined;
    if (!value?.url) return null;

    return (
      <figure className="my-10">
        <div className="relative overflow-hidden rounded-sm bg-brand-teal-950">
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={value.width ?? 1600}
            height={value.height ?? 900}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full object-cover"
          />
        </div>
        {(value.alt || value.credit) && (
          <figcaption className="mt-3 text-xs text-brand-teal-900/60">
            {value.alt}
            {value.credit && (
              <span className="italic"> — {value.credit}</span>
            )}
          </figcaption>
        )}
      </figure>
    );
  },
});

export default function ArticleBody({ data }: { data: SerializedEditorState }) {
  return (
    <RichText
      data={data}
      converters={converters}
      // No `disableContainer` — it returns a bare Fragment and discards
      // `className`, which silently drops every spacing rule below.
      className="
        text-base leading-relaxed text-brand-teal-900/90
        [&>p]:mb-7
        [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-brand-teal-950
        [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:tracking-tight [&>h3]:text-brand-teal-950
        [&>h4]:mt-8 [&>h4]:mb-2 [&>h4]:font-display [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-brand-teal-950
        [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6
        [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6
        [&_a]:font-medium [&_a]:text-brand-red-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-red-700
        [&>blockquote]:my-8 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-red-500 [&>blockquote]:pl-6 [&>blockquote]:font-display [&>blockquote]:text-lg [&>blockquote]:italic [&>blockquote]:text-brand-teal-950
        [&_strong]:font-bold [&_strong]:text-brand-teal-950
        [&>hr]:my-12 [&>hr]:border-brand-teal-100
      "
    />
  );
}
