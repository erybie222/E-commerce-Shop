"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductVariantActionsProps {
  colors?: string[];
  sizes?: string[];
  disabled?: boolean;
  className?: string;
}

export function ProductVariantActions({
  colors,
  sizes,
  disabled = false,
  className,
}: ProductVariantActionsProps) {
  const colorOptions = useMemo(() => {
    const filtered = (colors ?? []).filter(Boolean);
    return filtered.length > 0 ? filtered : ["Black", "White", "Blue"];
  }, [colors]);

  const sizeOptions = useMemo(() => {
    const filtered = (sizes ?? []).filter(Boolean);
    return filtered.length > 0 ? filtered : ["Small", "Medium", "Large"];
  }, [sizes]);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(
    sizeOptions[1] ?? sizeOptions[0],
  );

  return (
    <section className={className ?? "space-y-6"}>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => {
            const isActive = selectedColor === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                disabled={disabled}
                aria-pressed={isActive}
                className={`min-w-24 rounded-xl border px-6 py-2.5 text-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isActive
                    ? "border-yellow-400 text-white"
                    : "border-slate-700 text-slate-100 hover:border-slate-500"
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Size</h3>
        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((size) => {
            const isActive = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                disabled={disabled}
                aria-pressed={isActive}
                className={`min-w-24 rounded-xl border px-6 py-2.5 text-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isActive
                    ? "border-yellow-400 text-white"
                    : "border-slate-700 text-slate-100 hover:border-slate-500"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          type="button"
          disabled={disabled}
          className="h-12 rounded-lg bg-yellow-400 text-slate-950 hover:bg-yellow-300"
        >
          Add to Cart
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className="h-12 rounded-lg border-yellow-400 bg-transparent text-yellow-400 hover:bg-yellow-400/10"
        >
          Buy Now
        </Button>
      </div>
    </section>
  );
}
