"use client";

import { ShippingAddressSection } from "../../components/features/checkout/ShippingAddressSection";
import { ShippingMethodSelector } from "../../components/features/checkout/ShippingMethodSelector";
import { CheckoutOrderSummary } from "@/components/features/checkout/CheckoutOrderSummary";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getShippingAddresses, saveShippingAddress } from "@/lib/api";
import { ShippingAddress } from "@/src/types";

export default function CheckoutClient() {
  const router = useRouter();
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const cartItems = useCartStore((state) => state.items);
  const shippingCost = useCartStore((state) => state.shippingCost);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>(
    [],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getShippingAddresses();
        if (mounted) setShippingAddresses(data ?? []);
      } catch {
        if (mounted) setShippingAddresses([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [cartItems.length, hasHydrated, router]);

  const handleSaveShippingAddress = async (formData: FormData) => {
    await saveShippingAddress(formData);
    const data = await getShippingAddresses();
    setShippingAddresses(data ?? []);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <ShippingAddressSection
              saveShippingAddress={handleSaveShippingAddress}
              listOfShippingAddresses={shippingAddresses}
            />
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
