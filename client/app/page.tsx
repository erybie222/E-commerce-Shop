import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/features/home/HeroSection";
import { CategoriesSection } from "@/components/features/home/CategoriesSection";
import { ProductGrid } from "@/components/features/home/ProductGrid";
import { Category, Product } from "@/src/types";

async function getProducts(): Promise<Product[]> {
  const API_BASE_URL = process.env.API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/products/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

async function getCategories(): Promise<Category[]> {
  const API_BASE_URL = process.env.API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/categories/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection
        imgSrc="hero-dzik.jpg"
        title="Discover Amazing Products"
        description="Find everything you need from verified sellers"
      />
      <CategoriesSection categories={categories} />
      <ProductGrid title="Trending Products" products={products} />
      <Footer />
    </div>
  );
}
