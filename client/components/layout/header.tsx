import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="bg-slate-800 text-white border-b border-slate-700">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-yellow-400">MarketPlace</h1>
        </div>

        {/* Search Section */}
        <div className="flex-1 flex items-center max-w-3xl">
          <div className="flex w-full h-12 rounded-lg overflow-hidden border border-slate-600 bg-slate-700">
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-full px-4 text-base text-slate-200 hover:bg-slate-600 rounded-none"
                >
                  All
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-slate-700 text-white"
              >
                <DropdownMenuItem>Electronics</DropdownMenuItem>
                <DropdownMenuItem>Clothing</DropdownMenuItem>
                <DropdownMenuItem>Books</DropdownMenuItem>
                <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                <DropdownMenuItem>Sports</DropdownMenuItem>
                <DropdownMenuItem>Toys & Games</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <Input
              type="search"
              placeholder="Search for products..."
              className="flex-1 h-full bg-transparent text-white border-0 placeholder:text-gray-400 rounded-none px-4"
            />

            {/* Search Button */}
            <Button
              size="icon"
              className="h-full w-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-none"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Account Dropdown */}
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-slate-700 relative h-11 w-11"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
              variant="default"
            >
              3
            </Badge>
          </Button>

          {/* Become a Seller Button */}
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold h-11 px-5 text-base">
            Become a Seller
          </Button>
        </div>
      </div>
    </header>
  );
}
