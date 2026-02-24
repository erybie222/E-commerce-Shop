import { RegisterForm } from "@/components/features/register/RegisterForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { registerAction } from "@/src/authentification";

export default async function RegisterPage() {
  return (
    <>
      <Header />
      <RegisterForm registerAction={registerAction} />
      <Footer />
    </>
  );
}
