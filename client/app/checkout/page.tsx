import { Header } from "@/components/layout/Header";
import CheckoutClient from "./CheckoutClient";
import { Footer } from "@/components/layout/Footer";

export default async function CheckoutPage() {
  return (
    <>
      <Header />
      <CheckoutClient />
      <Footer />
    </>
  );
}
