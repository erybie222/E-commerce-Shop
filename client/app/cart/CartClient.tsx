"use client";

import { CartItemCard } from "@/components/features/cart/CartItemCard";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";
import { OrderItem, Product } from "@/src/types";
import { useEffect, useState } from "react";

async function getProductById(product_id: number): Promise<Product> {
  const res = await fetch(
    `http://127.0.0.1:8000/api/products_by_id/${product_id}/`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

function CartProductItem({
  orderItem,
  onRemove,
}: {
  orderItem: OrderItem;
  onRemove: (productId: number) => void;
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
      price={Number(orderItem.price) * Number(orderItem.quantity)}
      currencySymbol="$"
      initialQuantity={orderItem.quantity || 1}
      onRemove={() => onRemove(product.id)}
    />
  );
}

export function CartClient() {
  const [cart, setCart] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const fetchedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(fetchedCart);
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(
      (orderItem: OrderItem) => orderItem.product_id !== productId,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section className="space-y-5">
            {cart.length === 0 ? (
              <p className="text-center text-2xl text-slate-400">
                Your cart is empty.
              </p>
            ) : (
              cart.map((orderItem: OrderItem) => (
                <CartProductItem
                  key={orderItem.product_id}
                  orderItem={orderItem}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </section>

          <OrderSummaryCard
            subtotal={879.96}
            itemsCount={3}
            shippingLabel="FREE"
            tax={88}
            total={967.96}
            currencySymbol="$"
          />
        </div>
      </div>
    </main>
  );
}
