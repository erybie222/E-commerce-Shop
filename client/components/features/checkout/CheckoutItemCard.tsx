"use client";
import { formatMoney } from "@/lib/utils";

interface CheckoutItemCardProps {
  name: string;
  quantity: number;
  price: number;
}
export function CheckoutItemCard({
  name,
  quantity,
  price,
}: CheckoutItemCardProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-xl `}
        >
          <span className="text-xl">📦</span>
        </div>

        <div>
          <p className="text-2xl font-semibold text-slate-100">{name}</p>
          <p className="text-xl text-slate-400">Qty: {quantity}</p>
        </div>
      </div>

      <p className="text-3xl font-semibold text-white">{formatMoney(price)}</p>
    </div>
  );
}
