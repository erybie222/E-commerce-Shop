"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";
import { Category } from "@/src/types";
import { useState } from "react";

export function SearchArea({ categories }: { categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  return (
    <div className="flex w-full h-12 rounded-lg overflow-hidden border border-slate-600 bg-slate-700 border-2 focus-within:border-yellow-400">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-full px-4 text-base text-slate-200 hover:bg-slate-600 rounded-none"
          >
            {selectedCategory}
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 bg-slate-700 text-white rounded-md border-yellow-400 border-1"
        >
          <DropdownMenuItem onClick={() => setSelectedCategory("All")}>
            All
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => setSelectedCategory(category.display)}
            >
              {category.display}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        type="search"
        placeholder="Search for products..."
        className="flex-1 h-full bg-transparent text-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 rounded-none px-4"
      />
      <Button
        size="icon"
        className="h-full w-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-none"
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}
