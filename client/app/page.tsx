import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/features/home/HeroSection";
import { CategoriesSection } from "@/components/features/home/CategoriesSection";
import { ProductGrid } from "@/components/layout/ProductGrid";
import { Product } from "@/src/types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://127.0.0.1:8000/api/products/", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <ProductGrid title="Trending Products" products={products} />
      <Footer />
    </div>
  );
}
