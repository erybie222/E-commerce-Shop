import { Product } from "@/src/types";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductPageClient } from "@/components/features/products/ProductPageClient";

async function getProductBySlug(slug: string): Promise<Product | null> {
  const API_BASE_URL = process.env.API_BASE_URL;
  const res = await fetch(
    `${API_BASE_URL}/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return null;
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("Expected JSON response when loading product.");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  const fallbackImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  ];

  const demoReviews = [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      description:
        "Excellent product! The sound quality is amazing and the noise cancellation works perfectly.",
      createdAt: "February 10, 2026",
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      description:
        "Great headphones, very comfortable for long use. Battery life is impressive.",
      createdAt: "February 8, 2026",
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      description: "Best purchase I've made this year. Highly recommended!",
      createdAt: "February 5, 2026",
    },
  ];

  return (
    <>
      <Header />
      <ProductPageClient
        product={product}
        fallbackImages={fallbackImages}
        demoReviews={demoReviews}
      />
      <Footer />
    </>
  );
}
