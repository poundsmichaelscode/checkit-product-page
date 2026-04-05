import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f8fc]">
      <header className="border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Checkit home">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-sm font-extrabold text-white shadow-card">
              C
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-ink">Checkit</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Content Explorer</p>
            </div>
          </Link>
          <a
            href="#catalog"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
          >
            Explore catalog
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
