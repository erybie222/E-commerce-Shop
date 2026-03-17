"use client";

import { ShippingAddressSection } from "../../components/features/checkout/ShippingAddressSection";
import { ShippingMethodSelector } from "../../components/features/checkout/ShippingMethodSelector";
import { CheckoutOrderSummary } from "@/components/features/checkout/CheckoutOrderSummary";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getShippingAddresses,
  saveOrder,
  saveShippingAddress,
} from "@/lib/api";
import { ShippingAddress } from "@/src/types";

export default function CheckoutClient() {
  const router = useRouter();
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const cartItems = useCartStore((state) => state.items);
  const shippingCost = useCartStore((state) => state.shippingCost);
  const clearCart = useCartStore((state) => state.clearCart);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>(
    [],
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

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

  useEffect(() => {
    if (shippingAddresses.length === 0) {
      setSelectedAddressId(null);
      return;
    }

    const selectedStillExists = shippingAddresses.some(
      (address) => address.id === selectedAddressId,
    );
    if (selectedStillExists) {
      return;
    }

    const defaultAddress = shippingAddresses.find(
      (address) => address.is_default,
    );
    setSelectedAddressId(defaultAddress?.id ?? shippingAddresses[0].id);
  }, [selectedAddressId, shippingAddresses]);

  const handleSaveShippingAddress = async (formData: FormData) => {
    await saveShippingAddress(formData);
    const data = await getShippingAddresses();
    setShippingAddresses(data ?? []);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setOrderError("Select shipping address before placing your order.");
      return;
    }

    if (cartItems.length === 0) {
      setOrderError("Your cart is empty.");
      return;
    }

    try {
      setOrderError(null);
      setIsPlacingOrder(true);

      await saveOrder({
        shipping_address: selectedAddressId,
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: Number(item.quantity),
        })),
      });

      clearCart();
      router.push("/");
    } catch (error) {
      setOrderError(
        error instanceof Error ? error.message : "Failed to place order.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <ShippingAddressSection
              saveShippingAddress={handleSaveShippingAddress}
              listOfShippingAddresses={shippingAddresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
            />
            <ShippingMethodSelector />
          </div>
          <CheckoutOrderSummary
            cartItems={cartItems}
            shippingCost={shippingCost}
            placeOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
            orderError={orderError}
          />
        </div>
      </div>
    </main>
  );
}
