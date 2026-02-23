"use client";

import { ProductGallery } from "@/components/features/products/ProductGallery";
import { ProductDescription } from "@/components/features/products/ProductDescription";
import { ProductReviewsList } from "@/components/features/products/ProductReviewsList";
import { ProductSellerCard } from "@/components/features/products/ProductSellerCard";
import { ProductTitle } from "@/components/features/products/ProductTitle";
import { ProductVariantActions } from "@/components/features/products/ProductVariantActions";
import { Product } from "@/src/types";
import { useCartStore } from "@/src/store/useCartStore";

interface ProductPageClientProps {
  product: Product;
  fallbackImages: string[];
  demoReviews: Array<{
    id: number;
    author: string;
    rating: number;
    description: string;
    createdAt: string;
  }>;
}

export function ProductPageClient({
  product,
  fallbackImages,
  demoReviews,
}: ProductPageClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
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

          <ProductVariantActions
            disabled={!product.is_in_stock}
            addToCart={(product) => addToCart(product)}
            product={product}
          />
          <ProductDescription description={product.description} />
        </div>
      </div>

      <section className="border-t border-slate-700 bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-4xl font-bold">Customer Reviews</h2>
          <ProductReviewsList reviews={demoReviews} />
        </div>
      </section>
    </div>
  );
}
