import { normalizeSearchParams, sortProducts } from "@/lib/utils";
import type { ListingSearchParams, Product, ProductListData, ProductListResponse, ProductQuery } from "@/types/product";

const BASE_URL = (process.env.DUMMYJSON_BASE_URL || "https://dummyjson.com").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed for ${path}`);
  }

  return (await response.json()) as T;
}

export async function getCategories(): Promise<string[]> {
  return request<string[]>("/products/category-list", {
    next: { revalidate: 3600 }
  });
}

export async function getProducts(searchParams: ListingSearchParams): Promise<ProductListData> {
  const query = normalizeSearchParams(searchParams);
  return getProductsByQuery(query);
}

async function getProductsByQuery(query: ProductQuery): Promise<ProductListData> {
  const skip = (query.page - 1) * query.limit;

  if (query.q) {
    const response = await request<ProductListResponse>(
      `/products/search?q=${encodeURIComponent(query.q)}&limit=100`,
      {
        next: { revalidate: 300 }
      }
    );

    const filtered = query.category
      ? response.products.filter((product) => product.category === query.category)
      : response.products;

    const sorted = sortProducts(filtered, query.sort);
    const items = sorted.slice(skip, skip + query.limit);

    return {
      items,
      total: filtered.length,
      page: query.page,
      totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)),
      limit: query.limit
    };
  }

  if (query.category) {
    const response = await request<ProductListResponse>(
      `/products/category/${encodeURIComponent(query.category)}?limit=100`,
      {
        next: { revalidate: 300 }
      }
    );

    const sorted = sortProducts(response.products, query.sort);
    const items = sorted.slice(skip, skip + query.limit);

    return {
      items,
      total: response.products.length,
      page: query.page,
      totalPages: Math.max(1, Math.ceil(response.products.length / query.limit)),
      limit: query.limit
    };
  }

  const response = await request<ProductListResponse>(`/products?limit=${query.limit}&skip=${skip}`, {
    next: { revalidate: 300 }
  });

  const items = sortProducts(response.products, query.sort);

  return {
    items,
    total: response.total,
    page: query.page,
    totalPages: Math.max(1, Math.ceil(response.total / query.limit)),
    limit: query.limit
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await request<Product>(`/products/${id}`, {
      next: { revalidate: 900 }
    });
  } catch {
    return null;
  }
}
