"use client";
import { Product } from "@/src/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
      <div className="relative aspect-square overflow-hidden bg-slate-700">
        <a href={`/products/${product.slug}`} className="absolute inset-0 z-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </a>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-white font-medium text-base line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-white">{product.price}$</p>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-slate-200 font-medium">
              {product.rating}/5
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400">Sold by {product.seller_name}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
