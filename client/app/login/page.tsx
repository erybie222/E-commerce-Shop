import { LoginForm } from "@/components/features/login/LoginForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { loginAction } from "@/src/authentification";

export default async function LoginPage() {
  return (
    <>
      <Header />
      <LoginForm loginAction={loginAction} />
      <Footer />
    </>
  );
}
