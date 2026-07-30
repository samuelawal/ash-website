/* THIS FILE IS PART OF THE PAYLOAD ADMIN INTEGRATION.
 * It is a second root layout, sibling to `(frontend)/layout.tsx`. Next only
 * permits this because there is no top-level `src/app/layout.tsx`.
 */
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap";

/* Required. `@payloadcms/next` ships no .scss of its own — the styles for the
 * admin's templates and views (.template-minimal, .create-first-user, the login
 * form) live only in this precompiled stylesheet. `@payloadcms/ui`'s SCSS, which
 * RootLayout imports internally, covers the shared components but not these, so
 * omitting this renders the panel as unstyled HTML. */
import "@payloadcms/next/css";

/* Ashipa branding. Must come after the Payload stylesheets so its `@layer
 * payload` rules win over `@layer payload-default`. */
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
