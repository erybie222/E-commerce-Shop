import { ProductGrid } from "@/components/features/home/ProductGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Product } from "@/src/types";

async function fetchCategoryProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `http://127.0.0.1:8000/api/products/?category__slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products for category: " + slug);
  }
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await fetchCategoryProducts(slug);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <ProductGrid title={slug} products={products} />
      <Footer />
    </div>
  );
}
