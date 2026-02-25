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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchArea({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  const selectedCategoryLabel =
    selectedCategory === "All"
      ? "All"
      : categories.find((category) => category.slug === selectedCategory)
          ?.display || selectedCategory;

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (query.trim() !== "") {
      params.set("query", query.trim());
    }

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : "/search");
  };

  return (
    <div className="flex w-full h-12 rounded-lg overflow-hidden border border-slate-600 bg-slate-700 border-2 focus-within:border-yellow-400">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-full px-4 text-base text-slate-200 hover:bg-slate-600 rounded-none"
          >
            {selectedCategoryLabel}
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
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.display}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        type="search"
        placeholder="Search for products..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 h-full bg-transparent text-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 rounded-none px-4"
      />
      <Button
        size="icon"
        className="h-full w-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-none"
        onClick={handleSearch}
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}
