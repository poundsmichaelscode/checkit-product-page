"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6">
      <section className="w-full rounded-[28px] border border-red-100 bg-white p-8 shadow-card">
        <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
          Something went wrong
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">We couldn&apos;t load Checkit right now.</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Please try again. If the issue persists, check your network connection or reload the page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to listing
          </a>
        </div>
      </section>
    </main>
  );
}
