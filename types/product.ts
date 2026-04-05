export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
  availabilityStatus?: string;
  sku?: string;
  minimumOrderQuantity?: number;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ListingSearchParams = {
  page?: string;
  q?: string;
  category?: string;
  sort?: string;
};

export type ProductQuery = {
  page: number;
  limit: number;
  q: string;
  category: string;
  sort: ProductSortOption;
};

export type ProductSortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export type ProductListData = {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};
