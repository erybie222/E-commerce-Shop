interface ProductDescriptionProps {
  description?: string;
  title?: string;
  className?: string;
}

export function ProductDescription({
  description,
  title = "Product Description",
  className,
}: ProductDescriptionProps) {
  return (
    <section className={className ?? "border-t border-slate-800 pt-6"}>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-xl leading-relaxed text-slate-300 sm:text-2xl">
        {description ?? "No product description available."}
      </p>
    </section>
  );
}
