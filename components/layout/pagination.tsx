import Link from "next/link";
import { buildPageHref } from "@/lib/utils";
import type { ListingSearchParams } from "@/types/product";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  params: ListingSearchParams;
};

export function Pagination({ currentPage, totalPages, params }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
       Explore multiple products and choose the right one for you. by OLAYENIKAN MICHAEL
      </p>
      <div className="flex items-center gap-3">
        <Link
          href={buildPageHref(params, Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            currentPage === 1
              ? "pointer-events-none border border-slate-200 text-slate-300"
              : "border border-slate-200 text-ink hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          Previous
        </Link>
        <span className="text-sm font-semibold text-ink">
          {currentPage} / {totalPages}
        </span>
        <Link
          href={buildPageHref(params, Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            currentPage === totalPages
              ? "pointer-events-none border border-slate-200 text-slate-300"
              : "bg-ink text-white hover:bg-slate-800"
          }`}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
