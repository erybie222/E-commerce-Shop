import { Product } from "@/src/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  title: string;
  products: Product[];
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold sm:text-3xl mb-10">{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
