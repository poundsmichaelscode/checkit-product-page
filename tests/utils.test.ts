import { buildPageHref, normalizeSearchParams, sortProducts } from "@/lib/utils";
import type { Product } from "@/types/product";

describe("normalizeSearchParams", () => {
  it("falls back to safe defaults", () => {
    expect(normalizeSearchParams({ page: "0", sort: "nope" })).toEqual({
      page: 1,
      limit: 20,
      q: "",
      category: "",
      sort: "featured"
    });
  });

  it("preserves valid search parameters", () => {
    expect(normalizeSearchParams({ page: "3", q: "bag", category: "mens-shirts", sort: "price-desc" })).toEqual({
      page: 3,
      limit: 20,
      q: "bag",
      category: "mens-shirts",
      sort: "price-desc"
    });
  });
});

describe("buildPageHref", () => {
  it("removes the page param on first page", () => {
    expect(buildPageHref({ q: "phone", category: "smartphones", sort: "rating-desc" }, 1)).toBe(
      "/?q=phone&category=smartphones&sort=rating-desc"
    );
  });
});

describe("sortProducts", () => {
  const products: Product[] = [
    {
      id: 1,
      title: "A",
      description: "",
      category: "phones",
      price: 100,
      discountPercentage: 10,
      rating: 3.5,
      stock: 10,
      thumbnail: "/image-a"
    },
    {
      id: 2,
      title: "B",
      description: "",
      category: "phones",
      price: 300,
      discountPercentage: 20,
      rating: 4.9,
      stock: 20,
      thumbnail: "/image-b"
    }
  ];

  it("sorts by price descending", () => {
    expect(sortProducts(products, "price-desc").map((item) => item.id)).toEqual([2, 1]);
  });

  it("sorts by rating descending", () => {
    expect(sortProducts(products, "rating-desc").map((item) => item.id)).toEqual([2, 1]);
  });
});
