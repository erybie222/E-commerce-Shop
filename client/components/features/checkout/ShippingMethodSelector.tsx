"use client";

import { Package, Truck } from "lucide-react";
import { useState } from "react";

import { ShippingMethod } from "@/src/types";
import { SHIPPING_METHODS } from "@/lib/constants/shipping";

export function ShippingMethodSelector() {
  const [selectedMethod, setSelectedMethod] =
    useState<ShippingMethod["id"]>("standard");

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
          <Truck className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-semibold text-white">Shipping Method</h2>
      </div>

      <div className="space-y-4">
        {SHIPPING_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <label
              key={method.id}
              htmlFor={method.id}
              className="block cursor-pointer"
            >
              <input
                id={method.id}
                type="radio"
                name="shipping_method"
                value={method.id}
                checked={isSelected}
                onChange={() => setSelectedMethod(method.id)}
                className="sr-only"
              />

              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 transition-colors hover:border-slate-600">
                <div className="flex items-center gap-4">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isSelected ? "bg-yellow-400" : "bg-slate-600"
                    }`}
                  />

                  {method.id === "standard" ? (
                    <Package className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Truck className="h-5 w-5 text-slate-400" />
                  )}

                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {method.name}
                    </p>
                    <p className="text-xl text-slate-400">{method.eta}</p>
                  </div>
                </div>

                <p className="text-3xl font-semibold text-white">
                  ${method.price.toFixed(2)}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
