"use client";

import { useEffect } from "react";

import { captureError } from "@/lib/analytics";

/**
 * The last boundary: it replaces a root layout that itself failed to render, so
 * it must supply its own <html> and <body>.
 *
 * Styles are inline rather than Tailwind classes on purpose — this file renders
 * precisely when the layout that loads `globals.css` is broken, so it cannot
 * assume any stylesheet arrived.
 *
 * Not a second root layout: only `layout.tsx` at `src/app/` would collapse the
 * (frontend)/(payload) split, and there still isn't one.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    captureError(error, { digest: error.digest, boundary: "global" });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#faf9fd",
          color: "#0d0b1a",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
          Ashipa Electric is temporarily unavailable
        </h1>
        <p
          style={{
            maxWidth: "28rem",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            opacity: 0.8,
            margin: 0,
          }}
        >
          Something went wrong while loading the site. The fault has been
          reported.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            cursor: "pointer",
            border: "none",
            borderRadius: "2px",
            backgroundColor: "#da251d",
            color: "#ffffff",
            fontSize: "0.875rem",
            fontWeight: 700,
            padding: "0.875rem 1.5rem",
          }}
        >
          Try again
        </button>
        {error.digest && (
          <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>
            Reference: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
