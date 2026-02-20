export interface Category {
    id: number;
    name: string;
    slug: string;
    display: string;
    description: string;
    parent_category_id: number | null;
}

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


