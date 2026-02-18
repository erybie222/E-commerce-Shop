import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/features/home/HeroSection";
import { CategoriesSection } from "@/components/features/home/CategoriesSection";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-yellow-400">
          Startujemy z Marketplace! 🚀
        </h1>
      </main> */}
      <CategoriesSection />
      <Footer />
    </div>
  );
}
