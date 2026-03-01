import { MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";

type ShippingAddressFormProps = {
  withContainer?: boolean;
};

export function ShippingAddressForm({
  withContainer = true,
}: ShippingAddressFormProps) {
  const formContent = (
    <form className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="phone-prefix"
            className="text-xl font-semibold text-slate-100"
          >
            Phone Prefix
          </label>
          <Input
            id="phone-prefix"
            name="phone_prefix"
            type="tel"
            placeholder="+48"
            autoComplete="tel-country-code"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone-number"
            className="text-xl font-semibold text-slate-100"
          >
            Phone Number
          </label>
          <Input
            id="phone-number"
            name="phone_number"
            type="tel"
            placeholder="500600700"
            autoComplete="tel"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="street-name"
            className="text-xl font-semibold text-slate-100"
          >
            Street Name
          </label>
          <Input
            id="street-name"
            name="street_name"
            type="text"
            placeholder="Main Street"
            autoComplete="street-address"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="street-number"
            className="text-xl font-semibold text-slate-100"
          >
            Building Number
          </label>
          <Input
            id="street-number"
            name="street_number"
            type="text"
            placeholder="123"
            autoComplete="address-line2"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="text-xl font-semibold text-slate-100"
          >
            City
          </label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="New York"
            autoComplete="address-level2"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="state"
            className="text-xl font-semibold text-slate-100"
          >
            State / Province
          </label>
          <Input
            id="state"
            name="state"
            type="text"
            placeholder="NY"
            autoComplete="address-level1"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="zip" className="text-xl font-semibold text-slate-100">
            ZIP / Postal Code
          </label>
          <Input
            id="zip"
            name="zip"
            type="text"
            placeholder="10001"
            autoComplete="postal-code"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="text-xl font-semibold text-slate-100"
          >
            Country
          </label>
          <Input
            id="country"
            name="country"
            type="text"
            placeholder="United States"
            autoComplete="country-name"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>
    </form>
  );

  if (!withContainer) {
    return formContent;
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
          <MapPin className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-semibold text-white">Shipping Address</h2>
      </div>
      {formContent}
    </section>
  );
}
