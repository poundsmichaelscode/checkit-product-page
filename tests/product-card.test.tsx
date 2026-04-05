import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/cards/product-card";
import type { Product } from "@/types/product";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ""} />
}));

const product: Product = {
  id: 12,
  title: "Checkit Performance Headphones",
  description: "Studio-grade audio for focused work sessions.",
  category: "audio-accessories",
  price: 250,
  discountPercentage: 18,
  rating: 4.7,
  stock: 14,
  brand: "Checkit Labs",
  thumbnail: "/headphones.jpg"
};

describe("ProductCard", () => {
  it("renders the key product information", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("heading", { name: /checkit performance headphones/i })).toBeInTheDocument();
    expect(screen.getByText("$250")).toBeInTheDocument();
    expect(screen.getByText("18%")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /checkit performance headphones/i })).toHaveAttribute("href", "/items/12");
  });
});
