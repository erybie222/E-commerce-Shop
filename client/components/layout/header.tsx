import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";
import { Category } from "@/src/types";
import { SearchArea } from "./SearchArea";
import { CartBadge } from "./cartBadge";
import { cookies } from "next/headers";
import { logoutAction } from "@/src/authentification";

async function getCategories(): Promise<Category[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/categories/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function Header() {
  const categories = await getCategories();
  const cookieStore = cookies();
  const isAuthenticated = (await cookieStore).has("access_token");

  return (
    <header className="bg-slate-800 text-white border-b border-slate-700">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="/">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-yellow-400">MarketPlace</h1>
          </div>
        </a>

        {/* Search Section */}
        <div className="flex-1 flex items-center max-w-3xl">
          <SearchArea categories={categories} />
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Account Dropdown */}
          {isAuthenticated ? (
            <a href="/profile">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-slate-700 text-base h-11 px-4"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Account
                    <ChevronDown className="w-5 h-5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-slate-700 text-white"
                >
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutAction}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </a>
          ) : (
            <a href="/login">
              <Button
                variant="ghost"
                className="text-white hover:bg-slate-700 text-base h-11 px-4"
              >
                Login
              </Button>
            </a>
          )}

          {/* Cart Badge */}
          <CartBadge />

          {/* Become a Seller Button */}
          <a href="/become-seller">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold h-11 px-5 text-base">
              Become a Seller
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
