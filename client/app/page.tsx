import { Header } from "@/components/layout/header";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-yellow-400">
          Startujemy z Marketplace! 🚀
        </h1>
      </main>
    </div>
  );
}
