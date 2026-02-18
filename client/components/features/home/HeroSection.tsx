import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(700px_circle_at_80%_10%,rgba(250,204,21,0.12),transparent_50%)]" />
      <div className="container relative mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Find everything you need from verified sellers
            </h2>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              Discover thousands of products from trusted sellers worldwide.
            </p>
            <div>
              <Button className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 h-11 px-6 text-base">
                Shop Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-800/10 to-slate-900/60 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 shadow-2xl">
              <img
                src="/hero-dzik.jpg"
                alt="Minimal shopping scene"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
