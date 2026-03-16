"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCities, fetchCountries, fetchRegions } from "@/lib/api";
import { LocationItem } from "@/src/types";

type ShippingAddressFormProps = {
  withContainer?: boolean;
  saveShippingAddress: (formData: FormData) => Promise<void>;
};

export function ShippingAddressForm({
  withContainer = true,
  saveShippingAddress,
}: ShippingAddressFormProps) {
  const [countries, setCountries] = useState<LocationItem[]>([]);
  const [regions, setRegions] = useState<LocationItem[]>([]);
  const [cities, setCities] = useState<LocationItem[]>([]);

  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const [isCountriesLoading, setIsCountriesLoading] = useState(false);
  const [isRegionsLoading, setIsRegionsLoading] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCountries = async () => {
      setIsCountriesLoading(true);
      try {
        const data = await fetchCountries();
        if (isMounted) {
          setCountries(data);
        }
      } finally {
        if (isMounted) {
          setIsCountriesLoading(false);
        }
      }
    };

    void loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    setRegions([]);
    setCities([]);
    setSelectedRegionId("");
    setSelectedCityId("");

    if (!selectedCountryId) {
      return;
    }

    const loadRegions = async () => {
      setIsRegionsLoading(true);
      try {
        const data = await fetchRegions(Number(selectedCountryId));
        if (isMounted) {
          setRegions(data);
        }
      } finally {
        if (isMounted) {
          setIsRegionsLoading(false);
        }
      }
    };

    void loadRegions();

    return () => {
      isMounted = false;
    };
  }, [selectedCountryId]);

  useEffect(() => {
    let isMounted = true;

    setCities([]);
    setSelectedCityId("");

    if (!selectedRegionId) {
      return;
    }

    const loadCities = async () => {
      setIsCitiesLoading(true);
      try {
        const data = await fetchCities(Number(selectedRegionId));
        if (isMounted) {
          setCities(data);
        }
      } finally {
        if (isMounted) {
          setIsCitiesLoading(false);
        }
      }
    };

    void loadCities();

    return () => {
      isMounted = false;
    };
  }, [selectedRegionId]);

  const formContent = (
    <form className="space-y-4" action={saveShippingAddress}>
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
            htmlFor="country"
            className="text-xl font-semibold text-slate-100"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={selectedCountryId}
            onChange={(event) => {
              setSelectedCountryId(event.target.value);
            }}
            className="h-12 w-full rounded-md border border-slate-600 bg-slate-700/70 px-3 text-base text-slate-100"
            required
          >
            <option value="" disabled>
              {isCountriesLoading ? "Loading countries..." : "Select country"}
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="region"
            className="text-xl font-semibold text-slate-100"
          >
            Region
          </label>
          <select
            id="region"
            name="region"
            value={selectedRegionId}
            onChange={(event) => {
              setSelectedRegionId(event.target.value);
            }}
            className="h-12 w-full rounded-md border border-slate-600 bg-slate-700/70 px-3 text-base text-slate-100"
            disabled={!selectedCountryId || isRegionsLoading}
            required
          >
            <option value="" disabled>
              {!selectedCountryId
                ? "Select country first"
                : isRegionsLoading
                  ? "Loading regions..."
                  : "Select region"}
            </option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
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
          <select
            id="city"
            name="city"
            value={selectedCityId}
            onChange={(event) => {
              setSelectedCityId(event.target.value);
            }}
            className="h-12 w-full rounded-md border border-slate-600 bg-slate-700/70 px-3 text-base text-slate-100"
            disabled={!selectedRegionId || isCitiesLoading}
            required
          >
            <option value="" disabled>
              {!selectedRegionId
                ? "Select region first"
                : isCitiesLoading
                  ? "Loading cities..."
                  : "Select city"}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="zip" className="text-xl font-semibold text-slate-100">
            ZIP / Postal Code
          </label>
          <Input
            id="zip"
            name="zip_code"
            type="text"
            placeholder="10001"
            autoComplete="postal-code"
            className="h-12 border-slate-600 bg-slate-700/70 text-base text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:items-end">
        <div className="space-y-2">
          <label
            htmlFor="place"
            className="text-xl font-semibold text-slate-100"
          >
            Place
          </label>
          <select
            id="place"
            name="place"
            defaultValue="home"
            className="h-12 w-full rounded-md border border-slate-600 bg-slate-700/70 px-3 text-base text-slate-100"
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <span className="block text-xl font-semibold text-slate-100">
            Default Address
          </span>
          <label
            htmlFor="is-default"
            className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-md border border-slate-600 bg-slate-700/70 px-3 text-base text-slate-100"
          >
            <input
              id="is-default"
              name="is_default"
              type="checkbox"
              className="h-5 w-5 rounded border-slate-500 bg-slate-800 accent-yellow-400"
            />
            <span>Set as default address</span>
          </label>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="h-12 rounded-xl bg-yellow-400 px-8 text-base font-semibold text-slate-900 hover:bg-yellow-300"
          >
            Save
          </Button>
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
