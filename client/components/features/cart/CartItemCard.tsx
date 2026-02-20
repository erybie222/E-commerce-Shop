"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface CartItemCardProps {
  image: string;
  title: string;
  sellerName: string;
  color: string;
  price: number;
  currencySymbol: string;
  initialQuantity: number;
  className?: string;
  onRemove?: () => void;
  onQuantityChange?: (quantity: number) => void;
}

export function CartItemCard({
  image,
  title,
  sellerName,
  color,
  price,
  currencySymbol,
  initialQuantity,
  className,
  onRemove,
  onQuantityChange,
}: CartItemCardProps) {
  const [quantity, setQuantity] = useState(Math.max(1, initialQuantity));

  const decrease = () => {
    setQuantity((prev) => {
      const next = Math.max(1, prev - 1);
      if (next !== prev) {
        onQuantityChange?.(next);
      }
      return next;
    });
  };

  const increase = () => {
    setQuantity((prev) => {
      const next = prev + 1;
      onQuantityChange?.(next);
      return next;
    });
  };

  return (
    <article
      className={
        className ?? "rounded-2xl border border-slate-700 bg-slate-800/70 p-6"
      }
    >
      <div className="flex flex-wrap items-stretch justify-between gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-900">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 space-y-3">
            <h2 className="truncate text-4xl font-semibold text-white">
              {title}
            </h2>

            <p className="text-3xl text-slate-300">Sold by {sellerName}</p>
            <p className="text-3xl text-slate-300">Color: {color}</p>

            <div className="inline-flex items-center rounded-xl bg-slate-700/80 px-2 py-1">
              <button
                type="button"
                onClick={decrease}
                className="h-9 w-9 rounded-md text-3xl text-slate-300 hover:bg-slate-600/70"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="inline-flex min-w-12 items-center justify-center text-3xl font-semibold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increase}
                className="h-9 w-9 rounded-md text-3xl text-slate-300 hover:bg-slate-600/70"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-[130px] flex-col items-end justify-between">
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md p-2 text-rose-400 hover:bg-rose-500/10"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <p className="text-5xl font-semibold text-white">
            {currencySymbol}
            {price.toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
}
