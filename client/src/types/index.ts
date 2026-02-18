export interface Category {
    id: number;
    name: string;
    slug: string;
    parentCategory: Category | null;
    display: string;
    description: string;
}

export interface Product {
    id: number;
    seller_name: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    seller: number;
    slug: string;
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


