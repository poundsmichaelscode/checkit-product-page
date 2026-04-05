import { EmptyState } from "@/components/states/empty-state";
import { Pagination } from "@/components/layout/pagination";
import { ProductCard } from "@/components/cards/product-card";
import { getProducts } from "@/lib/api";
import { formatCategoryLabel } from "@/lib/formatters";
import { normalizeSearchParams } from "@/lib/utils";
import type { ListingSearchParams } from "@/types/product";

export async function ProductResults({ searchParams }: { searchParams: ListingSearchParams }) {
  const query = normalizeSearchParams(searchParams);
  const data = await getProducts(searchParams);

  const activeFilters = [query.q && `Search: “${query.q}”`, query.category && formatCategoryLabel(query.category)]
    .filter(Boolean)
    .join(" · ");

  if (data.items.length === 0) {
    return <EmptyState searchTerm={query.q} category={query.category} />;
  }

  return (
    <section id="catalog" className="grid gap-6">
      <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-ink">Curated products</h2>
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-ink">{data.items.length}</span> of <span className="font-semibold text-ink">{data.total}</span>{" "}
            results{activeFilters ? ` · ${activeFilters}` : ""}
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Page {data.page} of {data.totalPages}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {data.items.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4 && data.page === 1} />
        ))}
      </div>

      <Pagination currentPage={data.page} totalPages={data.totalPages} params={searchParams} />
    </section>
  );
}
