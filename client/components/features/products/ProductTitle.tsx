import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductTitleProps {
  title: string;
  rating?: number;
  reviewsCount?: number;
  price: number | string;
  currencySymbol: string;
  inStock: boolean;
  stockLabel: string;
  className?: string;
}

function formatPrice(value: number | string, currencySymbol: string) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${currencySymbol}${value.toFixed(2)}`;
  }

  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return `${currencySymbol}${asNumber.toFixed(2)}`;
  }

  return `${currencySymbol}${value}`;
}

export function ProductTitle({
  title,
  rating,
  reviewsCount,
  price,
  currencySymbol,
  inStock,
  stockLabel,
  className,
}: ProductTitleProps) {
  const filledStars = Math.max(0, Math.round(rating ?? 0));
  const showRating = rating !== undefined && reviewsCount !== undefined;

  return (
    <section className={className ?? "space-y-4"}>
      <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h1>

      {showRating && (
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`star-${index}`}
                className={`h-4 w-4 ${
                  index < filledStars
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-200 font-medium">
            {rating?.toFixed(1) ?? "0.0"}/5.0
          </span>
          <span className="text-slate-400">({reviewsCount} reviews)</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-white">
          {formatPrice(price, currencySymbol)}
        </span>
        <Badge
          className={
            inStock
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
              : "border-rose-500/40 bg-rose-500/15 text-rose-200"
          }
        >
          {stockLabel ?? (inStock ? "In Stock" : "Out of Stock")}
        </Badge>
      </div>
    </section>
  );
}
