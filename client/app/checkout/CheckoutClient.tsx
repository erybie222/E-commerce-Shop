"use client";

import { ShippingAddressSection } from "../../components/features/checkout/ShippingAddressSection";
import { ShippingMethodSelector } from "../../components/features/checkout/ShippingMethodSelector";
import { CheckoutOrderSummary } from "@/components/features/checkout/CheckoutOrderSummary";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutClient() {
  const router = useRouter();
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const cartItems = useCartStore((state) => state.items);
  const shippingCost = useCartStore((state) => state.shippingCost);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [cartItems.length, hasHydrated, router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <ShippingAddressSection />
            <ShippingMethodSelector />
          </div>
          <CheckoutOrderSummary
            cartItems={cartItems}
            shippingCost={shippingCost}
          />
        </div>
      </div>
    </main>
  );
}
