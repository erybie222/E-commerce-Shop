"use client";
import { Building2, House, MapPin, Plus } from "lucide-react";

import { ShippingAddressForm } from "./ShippingAddressForm";
import { useState } from "react";
import { ShippingAddress } from "@/src/types";

interface ShippingAddressSectionProps {
  listOfShippingAddresses?: ShippingAddress[];
}

function getAddressIcon(place: ShippingAddress["place"]) {
  if (place === "work") {
    return Building2;
  }

  return House;
}

function getAddressLabel(place: ShippingAddress["place"]) {
  if (place === "work") {
    return "Office Address";
  }

  if (place === "other") {
    return "Other Address";
  }

  return "Home Address";
}

export function ShippingAddressSection({
  listOfShippingAddresses = [],
}: ShippingAddressSectionProps) {
  const defaultAddress = listOfShippingAddresses.find(
    (address) => address.is_default,
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    defaultAddress?.id ?? listOfShippingAddresses[0]?.id ?? null,
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
          <MapPin className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-semibold text-white">Shipping Address</h2>
      </div>

      <div className="space-y-4">
        {listOfShippingAddresses.map((address) => {
          const AddressIcon = getAddressIcon(address.place);

          return (
            <article
              className="rounded-xl border border-slate-700 p-5"
              onClick={() => {
                setSelectedAddressId(address.id);
                setIsAddingNewAddress(false);
              }}
              key={address.id}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-yellow-400">
                  {selectedAddressId === address.id && (
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  )}
                  <AddressIcon className="h-5 w-5" />
                  <p className="text-xl font-semibold text-slate-100">
                    {getAddressLabel(address.place)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-semibold text-white">
                    {address.street_name} {address.street_number}
                  </p>
                  <p className="text-xl text-slate-400">
                    City ID: {address.city}, Region ID: {address.region}
                  </p>
                  <p className="text-xl text-slate-400">
                    ZIP: {address.zip_code}
                  </p>
                  <p className="text-xl text-slate-400">
                    Country ID: {address.country}
                  </p>
                  <p className="text-xl text-slate-400">
                    {address.phone_prefix} {address.phone_number}
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        <button
          type="button"
          onClick={() => {
            setSelectedAddressId(null);
            setIsAddingNewAddress(true);
          }}
          className="flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-600 px-5 py-4 text-left text-slate-100"
        >
          {isAddingNewAddress && (
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          )}
          <Plus className="h-5 w-5 text-yellow-400" />
          <span className="text-2xl font-semibold">Add New Address</span>
        </button>

        <div className="my-2 border-t border-slate-700" />

        {isAddingNewAddress && <ShippingAddressForm withContainer={false} />}
      </div>
    </section>
  );
}
