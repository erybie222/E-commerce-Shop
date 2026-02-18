import {
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Smartphone,
  Headphones,
  Camera,
  Watch,
} from "lucide-react";

const categories = [
  { label: "Electronics", icon: Laptop },
  { label: "Fashion", icon: Shirt },
  { label: "Home & Garden", icon: Home },
  { label: "Sports", icon: Dumbbell },
  { label: "Phones", icon: Smartphone },
  { label: "Audio", icon: Headphones },
  { label: "Cameras", icon: Camera },
  { label: "Watches", icon: Watch },
];

export function CategoriesSection() {
  return (
    <section className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">
          Shop by Category
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/70 ring-1 ring-white/10">
                <Icon className="h-7 w-7 text-yellow-400" />
              </div>
              <span className="text-sm font-semibold text-slate-100">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
