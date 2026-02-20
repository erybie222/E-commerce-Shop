import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartItemCard } from "@/components/features/cart/CartItemCard";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";

export default async function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
            <section className="space-y-5">
              <CartItemCard
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                title="Premium Wireless Headphones"
                sellerName="TechStore"
                color="Black"
                price={299.99}
                currencySymbol="$"
                initialQuantity={1}
              />
            </section>

            <OrderSummaryCard
              subtotal={879.96}
              itemsCount={3}
              shippingLabel="FREE"
              tax={88}
              total={967.96}
              currencySymbol="$"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
