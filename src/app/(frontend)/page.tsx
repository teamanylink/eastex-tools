"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { featuredProducts } from "@/lib/products";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>

      {/* Floating Ambient Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 md:px-10 flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content - Left */}
              {/* Hero Content - Left */}
              <FadeInStagger className="relative z-20 flex flex-col items-start text-left gap-8">
                <FadeInItem>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(13,242,89,0.5)] animate-pulse"></span>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      Now Available
                    </span>
                  </div>
                </FadeInItem>

                <FadeInItem>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-2xl">
                    POWER <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">REFINED.</span>
                  </h1>
                </FadeInItem>

                <FadeInItem>
                  <p className="text-xl text-white/60 max-w-xl font-light leading-relaxed">
                    Premium new and certified refurbished equipment for the modern
                    job site. Precision tools for precision work.
                  </p>
                </FadeInItem>

                <FadeInItem>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 w-full sm:w-auto">
                    <Link
                      href="/new-equipment"
                      className="h-14 px-8 rounded-full bg-primary text-[#050505] text-base font-bold tracking-wide hover:shadow-[0_0_30px_rgba(13,242,89,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      Shop New Arrivals
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/refurbished"
                      className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md text-base font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      View Collection
                    </Link>
                  </div>
                </FadeInItem>
              </FadeInStagger>

              <FadeIn direction="left" delay={0.4} className="relative z-10 w-full perspective-800 group h-full flex items-center">
                <div className="relative transform transition-all duration-700 group-hover:rotate-y-2 group-hover:scale-[1.02] w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <BeforeAfterSlider
                    beforeImage="/ridgid_before.png"
                    afterImage="/ridgid_after.png"
                    className="aspect-[4/3] md:aspect-[16/10] shadow-2xl relative z-10"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-2xl flex items-center gap-3 animate-float z-20">
                    <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Certified Quality</p>
                      <p className="text-white/40 text-xs">100% Guaranteed</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="py-16 px-4 md:px-10 flex justify-center">
          <div className="w-full max-w-7xl flex flex-col gap-10">
            {/* Section Header */}
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Featured Collection
              </h2>
              <div className="flex gap-2">
                <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg
                    className="w-5 h-5 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg
                    className="w-5 h-5 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel Items */}
            <FadeIn delay={0.2} duration={0.8} fullWidth>
              <div className="relative overflow-hidden w-full mask-linear-fade">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

                <div className="flex animate-scroll gap-6 py-4">
                  {[...featuredProducts, ...featuredProducts, ...featuredProducts].map((product, index) => (
                    <div key={`${product.id}-${index}`} className="w-[320px] shrink-0 transform hover:scale-[1.02] transition-transform duration-300">
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        subtitle={product.subtitle}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        image={product.image}
                        badge={product.badge}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        href={`/products/${product.category}/${product.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Category Split */}
        <section className="py-10 px-4 md:px-10 flex justify-center">
          <FadeInStagger className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Equipment Card */}
            <FadeInItem className="h-full">
              <Link
                href="/new-equipment"
                className="group relative h-80 rounded-[40px] overflow-hidden border border-white/10 cursor-pointer block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/factory_fresh_real.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                <div className="relative h-full flex flex-col justify-end p-10 z-10">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Factory Fresh
                  </h3>
                  <p className="text-white/70 max-w-sm mb-6">
                    The latest models straight from the manufacturer with full
                    warranty.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
                    Shop New
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeInItem>

            {/* Refurbished Equipment Card */}
            <FadeInItem className="h-full">
              <Link
                href="/refurbished"
                className="group relative h-80 rounded-[40px] overflow-hidden border border-white/10 cursor-pointer block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/refurbished_real.png')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                <div className="relative h-full flex flex-col justify-end p-10 z-10">
                  <div className="absolute top-8 right-8 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                    Certified
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Refurbished
                  </h3>
                  <p className="text-white/70 max-w-sm mb-6">
                    Expertly inspected, tested, and certified. High performance,
                    lower cost.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
                    Shop Refurbished
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeInItem>
          </FadeInStagger>
        </section>

        {/* Features / Trust */}
        <section className="py-16 px-4 md:px-10 flex justify-center">
          <div className="w-full max-w-7xl">
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 90-Day Warranty */}
              <FadeInItem className="h-full">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors h-full">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold">90-Day Warranty</h4>
                  <p className="text-white/60 text-sm">
                    Every tool, new or refurbished, is backed by our rock-solid
                    warranty.
                  </p>
                </div>
              </FadeInItem>

              {/* Expert Inspection */}
              <FadeInItem className="h-full">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors h-full">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold">Expert Inspection</h4>
                  <p className="text-white/60 text-sm">
                    Our certified technicians rigorously test every piece of
                    equipment.
                  </p>
                </div>
              </FadeInItem>

              {/* Fast Shipping */}
              <FadeInItem className="h-full">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors h-full">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold">Fast Shipping</h4>
                  <p className="text-white/60 text-sm">
                    Same-day shipping on orders placed before 2PM EST.
                  </p>
                </div>
              </FadeInItem>
            </FadeInStagger>
          </div>
        </section>

        {/* Bulk CTA */}
        <section className="py-10 px-4 md:px-10 flex justify-center mb-20">
          <div className="w-full max-w-7xl">
            <FadeIn className="relative rounded-[40px] overflow-hidden bg-primary p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
                  Equipping a Crew?
                </h2>
                <p className="text-black/80 text-lg font-medium">
                  Get exclusive bulk pricing and dedicated support for large
                  industrial orders.
                </p>
              </div>

              <div className="relative z-10">
                <button className="h-16 px-10 rounded-full bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Request Quote
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
