import { Product, ShippingAddress } from "@/src/types";

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

export async function getShippingAddresses(): Promise<ShippingAddress[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res =  await fetch(`${API_BASE_URL}/shipping_addresses/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch shipping addresses");
  }
  return res.json();
}