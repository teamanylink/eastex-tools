"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { refurbishedProducts } from "@/lib/products";

const filterCategories = [
    "All Equipment",
    "Drills & Drivers",
    "Saws",
    "Sanders",
    "Grinders",
    "Accessories",
];

export default function RefurbishedPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Equipment");

    const filteredProducts = refurbishedProducts.filter((product) => {
        if (selectedCategory === "All Equipment") return true;
        if (selectedCategory === "Drills & Drivers" && product.type === "Drills") return true;
        if (selectedCategory === product.type) return true;
        return false;
    });

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background Effects */}
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <Header />

            <main className="flex-grow flex flex-col items-center w-full px-6 pb-20 pt-24">
                <div className="w-full max-w-7xl flex flex-col gap-12">
                    {/* Hero Section */}
                    <section className="relative mt-8 w-full rounded-[3rem] overflow-hidden min-h-[500px] flex items-center justify-center p-8 group border border-white/10">
                        {/* Hero Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8mlNRTWPqSE6EjDtMOvK2Kd8S9oKuclpsMbsMdt1RYhOiJX6wsf7528_ewFfjw-9YLe47S8CSC3K1W26W0zvNIygOhh2jrNH12JG-32G6SzSEd0QxMkKK7dRu17c3xOfMSRl3dqMypBv53XSkwjB7I84LTFtBf5Uk2nUO2pyt-f6Hu8hnKxi5Dq-DDicFRFwNH6Z1un2oSiwHiaO82zkWH1meWYhNhLE55Rh8qK5glNSXfcICv65t4a5PrE89hv9N8Q7QSEpwg3U')",
                            }}
                        ></div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl glass-panel p-12 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl">
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
                                <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(13,242,89,0.5)]"></span>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                    Certified Restored
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                                INDUSTRIAL POWER.
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4dff88] to-primary">RESTORED.</span>
                            </h1>
                            <p className="text-white/70 text-xl max-w-2xl mb-10 font-light leading-relaxed">
                                Performance guaranteed at a fraction of the cost. Every tool is
                                inspected, repaired, and tested to meet original factory standards.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full sm:w-auto mt-4">
                                <button className="h-14 px-8 rounded-full bg-primary text-[#050505] font-bold text-base tracking-wide hover:shadow-[0_0_30px_rgba(13,242,89,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center">
                                    Shop Deals
                                </button>
                                <button className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base tracking-wide hover:bg-white/10 hover:border-white/20 transition-colors backdrop-blur-md w-full sm:w-auto flex items-center justify-center">
                                    Learn Our Process
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Filter Bar */}
                    <section className="sticky top-24 z-40 flex justify-center w-full">
                        <div className="glass-panel p-2 rounded-full flex gap-1 overflow-x-auto max-w-full no-scrollbar">
                            {filterCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? "bg-primary text-[#050505] font-bold shadow-lg"
                                        : "hover:bg-white/5 text-white/80"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Product Grid */}
                    <section className="w-full">
                        <div className="flex items-end justify-between mb-8 px-2">
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight">
                                    Featured Refurbished
                                </h2>
                                <p className="text-white/50 text-sm mt-1">
                                    Limited stock available. Updated daily.
                                </p>
                            </div>
                            <div className="hidden md:flex gap-2">
                                <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button className="size-10 rounded-full bg-transparent border border-transparent flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    subtitle={product.subtitle}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    image={product.image}
                                    badge={product.badge}
                                    rating={product.rating}
                                    reviewCount={product.reviewCount}
                                    href={`/products/refurbished/${product.id}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-16 mb-8">
                            <button className="glass-panel px-10 py-4 rounded-full text-white font-bold text-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/50 flex items-center gap-3">
                                <span>Browse Full Inventory</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
