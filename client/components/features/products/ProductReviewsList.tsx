import { Star } from "lucide-react";
import { ProductReviewItem } from "@/components/features/products/ProductReviewItem";

interface ReviewEntry {
  id: number;
  author: string;
  rating: number;
  description: string;
  createdAt: string;
}

interface ProductReviewsListProps {
  reviews: ReviewEntry[];
  averageRating?: number | null;
  totalReviews?: number | null;
  className?: string;
}

export function ProductReviewsList({
  reviews,
  averageRating,
  totalReviews,
  className,
}: ProductReviewsListProps) {
  const parsedAverage = Number(averageRating);
  const safeAverageRating = Number.isFinite(parsedAverage)
    ? Math.max(0, Math.min(5, parsedAverage))
    : 0;

  const safeTotalReviews =
    typeof totalReviews === "number" && Number.isFinite(totalReviews)
      ? Math.max(0, Math.trunc(totalReviews))
      : reviews.length;

  return (
    <section className={className ?? "space-y-8"}>
      <div className="space-y-4">
        <h2 className="text-5xl font-semibold text-white">Customer Reviews</h2>

        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
          <span className="text-5xl font-semibold text-white">
            {safeAverageRating.toFixed(1)}
          </span>
          <span className="text-3xl">out of 5</span>
          <span className="text-3xl">Based on {safeTotalReviews} reviews</span>
        </div>
      </div>

      <div className="space-y-5">
        {reviews.map((review) => (
          <ProductReviewItem
            key={review.id}
            author={review.author}
            rating={review.rating}
            description={review.description}
            createdAt={review.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
