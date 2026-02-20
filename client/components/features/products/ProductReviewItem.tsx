import { Star } from "lucide-react";

interface ProductReviewItemProps {
  author: string;
  rating: number;
  description: string;
  createdAt: string;
}

export function ProductReviewItem({
  author,
  rating,
  description,
  createdAt,
}: ProductReviewItemProps) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-semibold text-white">{author}</h3>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`${author}-star-${index}`}
                className={`h-6 w-6 ${
                  index < normalizedRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-2xl text-slate-400">{createdAt}</span>
      </div>

      <p className="mt-4 text-3xl text-slate-100">{description}</p>
    </article>
  );
}
