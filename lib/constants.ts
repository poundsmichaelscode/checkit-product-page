import type { ProductSortOption } from "@/types/product";

export const PAGE_SIZE = 20;

export const SORT_OPTIONS: Array<{ label: string; value: ProductSortOption }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" }
];
