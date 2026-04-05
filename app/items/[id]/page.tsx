import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/lib/api";
import { formatCurrency, formatPercent } from "@/lib/formatters";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Item not found",
      description: "This Checkit item could not be found."
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : []
    }
  };
}

export default async function ItemDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="transition hover:text-ink" href="/">
              Checkit
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="transition hover:text-ink" href={`/?category=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink">{product.title}</li>
        </ol>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            <Image
              src={product.thumbnail || "/placeholder-image.svg"}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          <div className="grid gap-4 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-brand">{product.category}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                {product.availabilityStatus ?? "In stock"}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                ⭐ {product.rating.toFixed(1)} rating
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{product.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{product.description}</p>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-sm font-medium text-muted">Price</dt>
                <dd className="mt-1 text-lg font-bold text-ink">{formatCurrency(product.price)}</dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-sm font-medium text-muted">Discount</dt>
                <dd className="mt-1 text-lg font-bold text-ink">{formatPercent(product.discountPercentage)}</dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-sm font-medium text-muted">Stock</dt>
                <dd className="mt-1 text-lg font-bold text-ink">{product.stock} units</dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-sm font-medium text-muted">Brand</dt>
                <dd className="mt-1 text-lg font-bold text-ink">{product.brand ?? "Independent"}</dd>
              </div>
            </dl>
          </div>
        </article>

        <aside className="grid gap-6 self-start">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-lg font-semibold text-ink">Purchase snapshot</h2>
            <dl className="mt-6 grid gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <dt className="text-sm text-muted">SKU</dt>
                <dd className="text-sm font-semibold text-ink">#{product.sku ?? `CHK-${product.id}`}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <dt className="text-sm text-muted">Minimum order</dt>
                <dd className="text-sm font-semibold text-ink">{product.minimumOrderQuantity ?? 1} item</dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <dt className="text-sm text-muted">Weight</dt>
                <dd className="text-sm font-semibold text-ink">{product.weight ?? "—"} g</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted">Warranty</dt>
                <dd className="text-sm font-semibold text-ink">{product.warrantyInformation ?? "Standard support"}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-lg font-semibold text-ink">Shipping & returns</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {product.shippingInformation ?? "Ships worldwide with delivery updates at checkout."}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {product.returnPolicy ?? "Easy 30-day returns on eligible orders."}
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to listing
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}
