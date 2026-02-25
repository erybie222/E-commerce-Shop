import { SellerForm } from "@/components/features/register/SellerForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { registerSellerAction } from "@/src/authentification";

export default async function BecomeSellerPage() {
  return (
    <>
      <Header />
      <SellerForm registerSellerAction={registerSellerAction} />
      <Footer />
    </>
  );
}
