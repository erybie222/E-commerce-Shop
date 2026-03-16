import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderItem, Product } from '../types'; 
import { SHIPPING_METHODS } from '../../lib/constants/shipping';



interface CartState {
  items: OrderItem[];
  hasHydrated: boolean;
  shippingCost: number;
  shippingMethodCode: "standard" | "priority" | "express";
  setHasHydrated: (value: boolean) => void;
  setShippingMethodCode: (code: "standard" | "priority" | "express") => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const defaultMethod = SHIPPING_METHODS.find((method) => method.code === 'standard');

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      shippingCost: defaultMethod.price,
      shippingMethodCode: defaultMethod.code,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setShippingMethodCode: (code) => {
        const selectedMethod = SHIPPING_METHODS.find((method) => method.code === code);
        set({
          shippingMethodCode: code,
          shippingCost: selectedMethod.price,
        });
      },

      addToCart: (productToAdd) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.product_id === productToAdd.id);

        if (existingItem) {
          set({
            items: currentItems.map(item => 
              item.product_id === productToAdd.id 
                ? { ...item, quantity: item.quantity + 1, price: productToAdd.price } 
                : item
            )
          });
        } else {
          set({ items: [...currentItems, { product_id: productToAdd.id, quantity: 1, price: productToAdd.price }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter(item => item.product_id !== productId) });
      },

      changeQuantity: (productId, quantity) => {
        set({
          items: get().items.map(item =>
            item.product_id === productId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'ecommerce-cart',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);