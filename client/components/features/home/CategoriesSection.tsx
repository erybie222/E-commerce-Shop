import { Category } from "@/src/types";
import {
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Smartphone,
  Car,
  Puzzle,
  Sparkles,
  PawPrint,
  BookOpen,
  Apple,
} from "lucide-react";

const categories_icon = [
  { name: "electronics", icon: Laptop },
  { name: "fashion", icon: Shirt },
  { name: "home", icon: Home },
  { name: "sports", icon: Dumbbell },
  { name: "electronics", icon: Smartphone },
  { name: "automotive", icon: Car },
  { name: "beauty", icon: Sparkles },
  { name: "toys", icon: Puzzle },
  { name: "food", icon: Apple },
  { name: "books", icon: BookOpen },
  { name: "pet-care", icon: PawPrint },
];

interface CategorySectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategorySectionProps) {
  return (
    <section className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">
          Shop by Category
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-10">
          {categories.map((category) => {
            const Icon =
              categories_icon.find((c) => c.name === category.name)?.icon ||
              Sparkles;

            return (
              <a href={`categories/${category.slug}`} key={category.id}>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/70 ring-1 ring-white/10">
                    <Icon className="h-7 w-7 text-yellow-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-100">
                    {category.display}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
