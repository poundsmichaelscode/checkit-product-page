import { PAGE_SIZE } from "@/lib/constants";
import type { ListingSearchParams, Product, ProductQuery, ProductSortOption } from "@/types/product";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function normalizeSearchParams(searchParams: ListingSearchParams): ProductQuery {
  const page = Number(searchParams.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const sort = isSortOption(searchParams.sort) ? searchParams.sort : "featured";

  return {
    page: safePage,
    limit: PAGE_SIZE,
    q: searchParams.q?.trim() ?? "",
    category: searchParams.category?.trim() ?? "",
    sort
  };
}

export function buildPageHref(params: ListingSearchParams, nextPage: number): string {
  const nextSearchParams = new URLSearchParams();

  if (params.q) nextSearchParams.set("q", params.q);
  if (params.category) nextSearchParams.set("category", params.category);
  if (params.sort) nextSearchParams.set("sort", params.sort);
  if (nextPage > 1) nextSearchParams.set("page", String(nextPage));

  const query = nextSearchParams.toString();
  return query ? `/?${query}` : "/";
}

export function sortProducts(products: Product[], sort: ProductSortOption): Product[] {
  const cloned = [...products];

  switch (sort) {
    case "price-asc":
      return cloned.sort((a, b) => a.price - b.price);
    case "price-desc":
      return cloned.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return cloned.sort((a, b) => b.rating - a.rating);
    default:
      return cloned;
  }
}

function isSortOption(value: string | undefined): value is ProductSortOption {
  return value === "featured" || value === "price-asc" || value === "price-desc" || value === "rating-desc";
}
