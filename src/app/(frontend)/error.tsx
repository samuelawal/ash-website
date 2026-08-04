"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

import { captureError } from "@/lib/analytics";

/**
 * Catches render-time failures in every frontend page and nested layout — the
 * class of error the SDK's global `error` / `unhandledrejection` listeners never
 * see, because React swallows them into the nearest boundary.
 *
 * Errors thrown in the root layout above this file bubble past it, which is what
 * `src/app/global-error.tsx` is for.
 */
export default function FrontendError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    captureError(error, {
      // Server Component errors reach the client with their message stripped;
      // the digest is the only way to line this up with the server log.
      digest: error.digest,
      boundary: "frontend",
    });
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-brand-red-600">
        Something went wrong
      </span>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-teal-950 sm:text-4xl">
        This page failed to load
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-teal-900/80">
        The fault has been reported. You can try again, or head back to the
        homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-brand-red-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md shadow-brand-red-500/10 transition-all hover:bg-brand-red-600 active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-brand-teal-100/60 bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-brand-teal-950 transition-colors hover:border-brand-red-500/30"
        >
          Back to homepage
        </Link>
      </div>
      {error.digest && (
        <p className="mt-8 text-xs text-brand-teal-900/50">
          Reference: {error.digest}
        </p>
      )}
    </main>
  );
}
