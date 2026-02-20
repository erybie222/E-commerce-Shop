import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductSellerCardProps {
  sellerName?: string;
  statusLabel?: string;
  className?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "SS";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function ProductSellerCard({
  sellerName,
  statusLabel = "Verified Seller",
  className,
}: ProductSellerCardProps) {
  const safeSellerName = sellerName?.trim() ? sellerName : "TechStore";
  const initials = getInitials(safeSellerName);

  return (
    <section
      className={
        className ?? "rounded-2xl border border-slate-700 bg-slate-800/60 p-6"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-semibold text-slate-950">
            {initials}
          </div>

          <div>
            <h3 className="text-4xl font-semibold text-white">
              {safeSellerName}
            </h3>
            <p className="text-3xl text-slate-300">{statusLabel}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl border-yellow-400 bg-transparent px-5 text-xl text-yellow-400 hover:bg-yellow-400/10"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Seller
        </Button>
      </div>
    </section>
  );
}
