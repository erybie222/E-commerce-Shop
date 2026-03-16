import { ShippingAddressFormSchema } from "@/app/lib/definitions";
import { LocationItem, Product, ShippingAddress } from "@/src/types";

let cachedAccessToken: string | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    cachedAccessToken = null;
    return null;
  }

  const data = await response.json();
  cachedAccessToken = data?.access ?? null;
  return cachedAccessToken;
}

async function resolveAccessToken(
  accessToken?: string,
): Promise<string | null> {
  if (accessToken) {
    cachedAccessToken = accessToken;
    return accessToken;
  }
  return refreshAccessToken();
}

async function fetchWithAuthRetry(
  url: string,
  init: RequestInit,
  accessToken?: string,
): Promise<Response> {
  const resolvedToken = await resolveAccessToken(accessToken);

  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(resolvedToken ? { Authorization: `Bearer ${resolvedToken}` } : {}),
    },
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshedAccessToken = await refreshAccessToken();
  if (!refreshedAccessToken) {
    cachedAccessToken = null;
    return response;
  }

  return fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${refreshedAccessToken}`,
    },
  });
}

export async function getProductById(product_id: number): Promise<Product> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/products_by_id/${product_id}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getShippingAddresses(
  accessToken?: string,
): Promise<ShippingAddress[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetchWithAuthRetry(
    `${API_BASE_URL}/addresses/`,
    {
      method: "GET",
      cache: "no-store",
    },
    accessToken,
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch shipping addresses (${res.status})${text ? ` - ${text}` : ""}`,
    );
  }
  return res.json();
}

export async function saveShippingAddress(
  formData: FormData,
  accessToken?: string,
): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const stringField = (name: string) => String(formData.get(name) ?? "").trim();
  const normalizedPhoneNumber = stringField("phone_number").replace(/\D/g, "");

  const validatedFields = ShippingAddressFormSchema.safeParse({
    country: stringField("country"),
    region: stringField("region"),
    city: stringField("city"),
    zip_code: stringField("zip_code"),
    phone_prefix: "",
    phone_number: normalizedPhoneNumber,
    street_name: stringField("street_name"),
    street_number: stringField("street_number"),
    is_default: formData.get("is_default") === "on",
  });

  if (!validatedFields.success) {
    const details = Object.entries(validatedFields.error.flatten().fieldErrors)
      .map(([field, messages]) => `${field}: ${(messages ?? []).join(", ")}`)
      .filter((line) => line.trim() !== "")
      .join(" | ");
    throw new Error(
      details
        ? `Shipping address validation failed - ${details}`
        : "Shipping address validation failed",
    );
  }

  const place = (formData.get("place") as string) || "home";
  const payload = {
    ...validatedFields.data,
    country: Number(validatedFields.data.country),
    region: Number(validatedFields.data.region),
    city: Number(validatedFields.data.city),
    phone_prefix: validatedFields.data.phone_prefix ?? "",
    place,
  };

  const res = await fetchWithAuthRetry(
    `${API_BASE_URL}/addresses/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    accessToken,
  );

  if (!res.ok) {
    let message = `Failed to save shipping address (${res.status})`;
    try {
      const data = await res.json();
      const details =
        typeof data === "string"
          ? data
          : Object.entries(data)
              .map(([field, value]) => {
                if (Array.isArray(value)) {
                  return `${field}: ${value.join(", ")}`;
                }
                return `${field}: ${String(value)}`;
              })
              .join(" | ");
      if (details) {
        message = `${message} - ${details}`;
      }
    } catch {
      const text = await res.text().catch(() => "");
      if (text) {
        message = `${message} - ${text}`;
      }
    }

    throw new Error(message);
  }
}


export async function fetchCountries(): Promise<LocationItem[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/countries/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return res.json();
}

export async function fetchRegions(country_id: number): Promise<LocationItem[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/regions/country=${country_id}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch regions");
  }

  return res.json();
}

export async function fetchCities(region_id: number): Promise<LocationItem[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/cities/region=${region_id}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cities");
  }

  return res.json();
}

