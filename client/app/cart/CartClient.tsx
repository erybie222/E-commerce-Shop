"use client";

import { CartItemCard } from "@/components/features/cart/CartItemCard";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";
import { getProductById } from "@/lib/api";
import { useCartStore } from "@/src/store/useCartStore";
import { OrderItem, Product } from "@/src/types";
import { useEffect, useState } from "react";

function CartProductItem({
  orderItem,
  onRemove,
  onQuantityChange,
}: {
  orderItem: OrderItem;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!orderItem.product_id) {
      setProduct(null);
      return;
    }

    getProductById(orderItem.product_id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct(null);
      });
  }, [orderItem.product_id]);

  if (!product) {
    return null;
  }

  return (
    <CartItemCard
      key={product.id}
      title={product.name}
      sellerName={product.seller_name}
      price={Number(orderItem.price)}
      currencySymbol="$"
      initialQuantity={orderItem.quantity || 1}
      onRemove={() => onRemove(product.id)}
      onQuantityChange={(quantity) => onQuantityChange(product.id, quantity)}
    />
  );
}

export function CartClient() {
  const cartItems = useCartStore((state) => state.items);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  let subtotal = 0;
  cartItems.forEach((orderItem: OrderItem) => {
    subtotal += Number(orderItem.price) * Number(orderItem.quantity);
  });
  const tax = subtotal * 0.23;
  const total = subtotal + tax;

  const handleQuantityChange = useCartStore((state) => state.changeQuantity);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section className="space-y-5">
            {cartItems.length === 0 ? (
              <p className="text-center text-2xl text-slate-400">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((orderItem: OrderItem) => (
                <CartProductItem
                  key={orderItem.product_id}
                  orderItem={orderItem}
                  onRemove={removeFromCart}
                  onQuantityChange={(productId, quantity) =>
                    handleQuantityChange(productId, quantity)
                  }
                />
              ))
            )}
          </section>

          <OrderSummaryCard
            subtotal={subtotal}
            itemsCount={cartItems.length}
            shippingLabel="FREE"
            tax={tax}
            total={total}
            currencySymbol="$"
          />
        </div>
      </div>
    </main>
  );
}
