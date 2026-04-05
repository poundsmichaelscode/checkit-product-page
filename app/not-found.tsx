export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6">
      <section className="w-full rounded-[28px] border border-slate-200 bg-white p-8 shadow-card">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          Not found
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">The product you requested does not exist.</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Head back to the catalog to continue exploring available products.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Return to Checkit
        </a>
      </section>
    </main>
  );
}
