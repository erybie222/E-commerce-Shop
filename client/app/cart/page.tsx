import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartClient } from "@/app/cart/CartClient";

export default function CartPage() {
  return (
    <>
      <Header />
      <CartClient />
      <Footer />
    </>
  );
}
