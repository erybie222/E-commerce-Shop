import { Button } from "@/components/ui/button";

interface OrderSummaryCardProps {
  subtotal: number;
  itemsCount: number;
  shippingLabel: string;
  tax: number;
  total: number;
  currencySymbol: string;
  className?: string;
}

function formatMoney(value: number, currencySymbol: string) {
  return `${currencySymbol}${value.toFixed(2)}`;
}

export function OrderSummaryCard({
  subtotal,
  itemsCount,
  shippingLabel,
  tax,
  total,
  currencySymbol,
  className,
}: OrderSummaryCardProps) {
  return (
    <aside
      className={
        className ?? "rounded-2xl border border-slate-700 bg-slate-800/70 p-5"
      }
    >
      <h2 className="text-4xl font-semibold text-white">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-3xl">Subtotal ({itemsCount} items)</span>
          <span className="text-3xl font-semibold text-white">
            {formatMoney(subtotal, currencySymbol)}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-300">
          <span className="text-3xl">Shipping</span>
          <span className="text-3xl font-semibold text-white">
            {shippingLabel}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-300">
          <span className="text-3xl">Tax</span>
          <span className="text-3xl font-semibold text-white">
            {formatMoney(tax, currencySymbol)}
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-slate-700" />

      <div className="flex items-center justify-between">
        <span className="text-4xl font-semibold text-white">Total</span>
        <span className="text-5xl font-semibold text-yellow-400">
          {formatMoney(total, currencySymbol)}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <Button className="h-12 w-full rounded-lg bg-yellow-400 text-slate-950 hover:bg-yellow-300">
          Proceed to Checkout
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-700 bg-slate-950 text-white hover:bg-slate-900"
        >
          Continue Shopping
        </Button>
      </div>
    </aside>
  );
}
