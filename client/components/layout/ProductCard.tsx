"use client";
import { OrderItem, Product } from "@/src/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = (product: Product) => {
    const exsistingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (
      exsistingCart.some(
        (orderItem: OrderItem) => orderItem.product_id === product.id,
      )
    ) {
      exsistingCart.forEach((orderItem: OrderItem) => {
        if (orderItem.product_id === product.id) {
          orderItem.quantity = (orderItem.quantity || 1) + 1;
        }
      });
      localStorage.setItem("cart", JSON.stringify(exsistingCart));
      console.log("Cart:", exsistingCart);
      return;
    }
    const updaTedCart = [
      ...exsistingCart,
      {
        product_id: product.id,
        quantity: 1,
        price: Number(product.price) || 0,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(updaTedCart));
    console.log("Cart:", updaTedCart);
  };

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
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
