import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function cartButton() {
  return (
    <Button variant="outline" size="icon">
      <ShoppingCart />
    </Button>
  );
}
