"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";
import { formatCategoryLabel } from "@/lib/formatters";
import { useDebouncedRouter } from "@/hooks/use-debounced-router";
import type { ListingSearchParams } from "@/types/product";

type SearchControlsProps = {
  categories: string[];
  initialParams: ListingSearchParams;
};

export function SearchControls({ categories, initialParams }: SearchControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { value, setValue } = useDebouncedRouter({
    paramName: "q",
    initialValue: initialParams.q ?? "",
    delay: 400
  });

  const selectedCategory = searchParams.get("category") ?? initialParams.category ?? "";
  const selectedSort = searchParams.get("sort") ?? initialParams.sort ?? "featured";

  const activeCount = useMemo(() => {
    return Number(Boolean(value.trim())) + Number(Boolean(selectedCategory)) + Number(selectedSort !== "featured");
  }, [selectedCategory, selectedSort, value]);

  function updateSelect(name: string, nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue) {
      params.set(name, nextValue);
    } else {
      params.delete(name);
    }

    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    setValue("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <section className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-card lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end lg:p-6">
      <div className="grid gap-2">
        <label htmlFor="search" className="text-sm font-semibold text-ink">
          Search catalog
        </label>
        <input
          id="search"
          name="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search by product title"
          className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:ring-brand"
        />
        <p className="text-xs text-muted">Debounced URL-driven search updates after 400ms.</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="category" className="text-sm font-semibold text-ink">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(event) => updateSelect("category", event.target.value)}
          className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm text-ink focus:border-brand focus:ring-brand"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="sort" className="text-sm font-semibold text-ink">
          Sort by
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(event) => updateSelect("sort", event.target.value)}
          className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm text-ink focus:border-brand focus:ring-brand"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 lg:items-end">
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
        >
          Clear filters
        </button>
        <span className="text-xs text-muted">{activeCount} active filter{activeCount === 1 ? "" : "s"}</span>
      </div>
    </section>
  );
}
