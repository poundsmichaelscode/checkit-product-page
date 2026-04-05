export function DetailSkeleton() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]" aria-label="Loading product details">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card">
        <div className="aspect-[4/3] animate-pulse bg-slate-200/70" />
        <div className="grid gap-4 p-8">
          <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200/70" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-slate-200/70" />
          <div className="h-5 w-full animate-pulse rounded bg-slate-200/60" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-slate-200/60" />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="h-64 animate-pulse rounded-[30px] bg-white shadow-card" />
        <div className="h-56 animate-pulse rounded-[30px] bg-white shadow-card" />
      </div>
    </section>
  );
}
