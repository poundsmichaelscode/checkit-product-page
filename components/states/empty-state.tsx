import Link from "next/link";
import { formatCategoryLabel } from "@/lib/formatters";

export function EmptyState({ searchTerm, category }: { searchTerm: string; category: string }) {
  return (
    <section className="rounded-[30px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-card sm:p-12">
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
        No results found
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">Nothing matched your current filters.</h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted">
        We couldn&apos;t find products for
        {searchTerm ? ` “${searchTerm}”` : " the current search"}
        {category ? ` in ${formatCategoryLabel(category)}` : ""}. Try a broader term or reset your filters.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Clear and explore all products
      </Link>
    </section>
  );
}
