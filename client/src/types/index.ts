export interface Category {
    id: number;
    name: string;
    slug: string;
    display: string;
    description: string;
    parent_category_id: number | null;
}

export interface ShippingMethod {
  id: "standard" | "priority" | "express";
  name: string;
  eta: string;
  price: number;
};

export interface Product {
    id: number;
    seller_name: string;
    rating: number;
    is_in_stock: boolean;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    created_at:Date;
    category_id: number;
    seller_id: number;
    quantity?: number;
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Review {
    id: number;
    created_at: Date;
    updated_at: Date;
    rating: number;
    description: string;
    buyer_id: number;
    product_id: number;
}


export interface ShippingAddress {
  id: number; 
  buyer_profile: number; 
  country: number; 
  city: number;
  region: number;
  zip_code: string;
  phone_prefix: string;
  phone_number: string;
  street_name: string;
  street_number: string;
  is_default: boolean;
  place: 'home' | 'work' | 'other';
}

// export interface User {
//     id: number;
//     username: string;
//     email: string;
//     firstName: string;
//     lastName: string;
// }

// export interface SellerProfile {
//     id: number;
//     user: User;
//     tin: string;
//     shop_name: string;
// }


