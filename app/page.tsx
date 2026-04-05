import { Suspense } from "react";
import { SearchControls } from "@/components/filters/search-controls";
import { ListingSkeleton } from "@/components/states/listing-skeleton";
import { ProductResults } from "@/components/layout/product-results";
import { getCategories } from "@/lib/api";
import type { ListingSearchParams } from "@/types/product";

export const revalidate = 300;

type HomePageProps = {
  searchParams: Promise<ListingSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const [resolvedSearchParams, categories] = await Promise.all([searchParams, getCategories()]);
  const suspenseKey = JSON.stringify(resolvedSearchParams);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="overflow-hidden rounded-[32px] border border-white/60 bg-hero px-6 py-8 shadow-soft sm:px-8 lg:px-10 lg:py-10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            Checit Product Page
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Checkit
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
           Discover everything you need in one place — from everyday household essentials to electronics and vehicles.
          Browse, search, and filter products بسهولة with powerful tools, shareable links, and detailed product pages designed to help you make the right choice.
          </p>
        </div>
      </section>

      <SearchControls categories={categories} initialParams={resolvedSearchParams} />

      <Suspense key={suspenseKey} fallback={<ListingSkeleton />}>
        <ProductResults searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  );
}
