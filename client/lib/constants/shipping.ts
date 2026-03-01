import { ShippingMethod } from "@/src/types";
export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    eta: "5-7 business days",
    price: 9.99,
  },
  {
    id: "priority",
    name: "Priority Shipping",
    eta: "2-3 business days",
    price: 15.99,
  },
  {
    id: "express",
    name: "Express Shipping",
    eta: "1-2 business days",
    price: 25.99,
  },
];