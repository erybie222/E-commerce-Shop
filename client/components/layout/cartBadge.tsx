"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/src/store/useCartStore";
import { ShoppingCart } from "lucide-react";

export function CartBadge() {
  const items = useCartStore((state) => state.items);
  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <a href="/cart">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-slate-700 relative h-11 w-11"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItemCount > 0 && (
          <Badge
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            variant="default"
          >
            {cartItemCount}
          </Badge>
        )}
      </Button>
    </a>
  );
}
