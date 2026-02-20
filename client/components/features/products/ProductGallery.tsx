"use client";

import { useMemo, useState } from "react";

interface ProductGalleryProps {
  images?: string[];
  alt?: string;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
];

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const cleaned = (images ?? []).filter(Boolean);
    return cleaned.length > 0 ? cleaned : fallbackImages;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3 shadow-2xl">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <img
            src={activeImage}
            alt={alt ?? "Product image"}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(250,204,21,0.15),transparent_55%)]" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {galleryImages.slice(0, 4).map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative aspect-square overflow-hidden rounded-lg border transition-colors ${
                  isActive
                    ? "border-yellow-400 ring-2 ring-yellow-400"
                    : "border-slate-800 hover:border-slate-600"
                }`}
              >
                <img
                  src={image}
                  alt={alt ?? "Product thumbnail"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
