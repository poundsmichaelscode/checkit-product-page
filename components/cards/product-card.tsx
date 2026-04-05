import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCategoryLabel, formatCurrency, formatPercent } from "@/lib/formatters";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/items/${product.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.thumbnail || "/placeholder-image.svg"}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="grid gap-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {formatCategoryLabel(product.category)}
            </span>
            <span className="text-sm font-semibold text-amber-600">★ {product.rating.toFixed(1)}</span>
          </div>
          <div>
            <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-ink">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-muted">Price</dt>
              <dd className="mt-1 font-semibold text-ink">{formatCurrency(product.price)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-muted">Discount</dt>
              <dd className="mt-1 font-semibold text-ink">{formatPercent(product.discountPercentage)}</dd>
            </div>
          </dl>
          <div className="flex items-center justify-between text-sm font-medium text-muted">
            <span>{product.brand ?? "Independent"}</span>
            <span className="text-ink">View details →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
