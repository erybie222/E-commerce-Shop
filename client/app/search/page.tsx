import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/features/home/ProductGrid";
import { Product } from "@/src/types";

async function fetchProducts(category: string): Promise<Product[]> {
  const API_BASE_URL = process.env.API_BASE_URL;
  const categoryFilter =
    category && category !== "All"
      ? `?category__slug=${encodeURIComponent(category)}`
      : "";

  const res = await fetch(`${API_BASE_URL}/products/${categoryFilter}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query = "", category = "All" } = await searchParams;
  const products = await fetchProducts(category);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) => {
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        return (
          name.includes(normalizedQuery) ||
          description.includes(normalizedQuery)
        );
      })
    : products;

  const title = normalizedQuery
    ? `Results for "${query}"`
    : category !== "All"
      ? `Category: ${category}`
      : "All Products";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      {filteredProducts.length > 0 ? (
        <ProductGrid title={title} products={filteredProducts} />
      ) : (
        <section className="bg-slate-900 text-white">
          <div className="container mx-auto px-4 py-14">
            <h2 className="text-2xl font-semibold sm:text-3xl mb-4">{title}</h2>
            <p className="text-slate-300">No products found for this search.</p>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
