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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-yellow-400">MarketPlace</h1>
        </div>

        {/* Search Section */}
        <div className="flex-1 flex items-center gap-3 max-w-2xl">
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-slate-700 text-slate-200 border-0 hover:bg-gray-600"
              >
                All
                <ChevronDown className="w-4 h-4 ml-1" />
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
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search for products..."
              className="bg-slate-700 text-white border-0 placeholder:text-gray-400"
            />
            <Button
              size="icon"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                <User className="w-4 h-4 mr-2" />
                Account
                <ChevronDown className="w-4 h-4 ml-1" />
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
            className="text-white hover:bg-slate-700 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <Badge
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
              variant="default"
            >
              3
            </Badge>
          </Button>

          {/* Become a Seller Button */}
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
            Become a Seller
          </Button>
        </div>
      </div>
    </header>
  );
}
