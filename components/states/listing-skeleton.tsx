export function ListingSkeleton() {
  return (
    <section className="grid gap-6" aria-label="Loading products">
      <div className="h-24 animate-pulse rounded-[28px] bg-slate-200/70" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card">
            <div className="aspect-[4/3] animate-pulse bg-slate-200/70" />
            <div className="grid gap-4 p-5">
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200/70" />
              <div className="grid gap-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200/70" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200/60" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/60" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
