import { ProductGallery } from "@/components/features/products/ProductGallery";
import { ProductDescription } from "@/components/features/products/ProductDescription";
import { ProductReviewsList } from "@/components/features/products/ProductReviewsList";
import { ProductSellerCard } from "@/components/features/products/ProductSellerCard";
import { ProductTitle } from "@/components/features/products/ProductTitle";
import { ProductVariantActions } from "@/components/features/products/ProductVariantActions";
import { Product } from "@/src/types";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(
    `http://localhost:8000/api/products/${encodeURIComponent(slug)}`,
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
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-2">
          <ProductGallery images={fallbackImages} alt="Product image" />
          <div className="flex flex-col gap-6">
            <ProductTitle
              title={product.name}
              rating={product.rating}
              reviewsCount={demoReviews.length}
              price={product.price}
              currencySymbol="$"
              inStock={product.is_in_stock}
              stockLabel="In Stock"
            />
            <ProductSellerCard sellerName={product.seller_name} />

            <ProductVariantActions disabled={!product.is_in_stock} />
            <ProductDescription description={product.description} />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <ProductReviewsList
            reviews={demoReviews}
            averageRating={product.rating}
            totalReviews={demoReviews.length}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
