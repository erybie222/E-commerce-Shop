"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/api";
import { formatMoney } from "@/lib/utils";
import { OrderItem, Product } from "@/src/types";

import { CheckoutItemCard } from "./CheckoutItemCard";

interface CheckoutOrderSummaryProps {
  cartItems: OrderItem[];
  shippingCost: number;
}

type ProductMap = Record<number, Product>;

export function CheckoutOrderSummary({
  cartItems,
  shippingCost,
}: CheckoutOrderSummaryProps) {
  const [productsById, setProductsById] = useState<ProductMap>({});

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const uniqueIds = Array.from(
        new Set(cartItems.map((item) => item.product_id)),
      );
      const entries = await Promise.all(
        uniqueIds.map(async (productId) => {
          try {
            const product = await getProductById(productId);
            return [productId, product] as const;
          } catch {
            return [productId, null] as const;
          }
        }),
      );

      if (!isMounted) {
        return;
      }

      const nextProductsById = entries.reduce<ProductMap>(
        (acc, [productId, product]) => {
          if (product) {
            acc[productId] = product;
          }
          return acc;
        },
        {},
      );

      setProductsById(nextProductsById);
    }

    if (cartItems.length === 0) {
      setProductsById({});
      return;
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => {
    const product = productsById[item.product_id];
    const unitPrice = product ? Number(product.price) : Number(item.price);
    return sum + unitPrice * Number(item.quantity);
  }, 0);
  const tax = subtotal * 0.23;
  const total = subtotal + Number(shippingCost) + tax;

  return (
    <aside className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6 lg:sticky lg:top-6">
      <h2 className="text-4xl font-semibold text-white">Order Summary</h2>

      <div className="mt-6 space-y-5">
        {cartItems.map((item) => {
          const product = productsById[item.product_id];
          const unitPrice = product
            ? Number(product.price)
            : Number(item.price);

          return (
            <CheckoutItemCard
              key={item.product_id}
              name={product?.name ?? `Product #${item.product_id}`}
              quantity={item.quantity}
              price={unitPrice * Number(item.quantity)}
            />
          );
        })}
      </div>

      <div className="my-6 border-t border-slate-700" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl text-slate-300">Subtotal</span>
          <span className="text-2xl font-semibold text-slate-100">
            {formatMoney(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl text-slate-300">Shipping</span>
          <span className="text-2xl font-semibold text-slate-100">
            {formatMoney(shippingCost)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl text-slate-300">Tax</span>
          <span className="text-2xl font-semibold text-slate-100">
            {formatMoney(tax)}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-700" />

      <div className="mb-6 flex items-center justify-between">
        <span className="text-4xl font-semibold text-white">Total</span>
        <span className="text-5xl font-semibold text-yellow-400">
          {formatMoney(total)}
        </span>
      </div>

      <div className="space-y-3">
        <Button className="h-12 w-full rounded-lg bg-yellow-400 text-slate-950 hover:bg-yellow-300">
          Place Order - {formatMoney(total)}
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-700 bg-slate-950 text-white hover:bg-slate-900"
        >
          Back to Cart
        </Button>
      </div>
    </aside>
  );
}
