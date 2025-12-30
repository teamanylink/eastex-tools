"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { newEquipmentProducts } from "@/lib/products";

const categories = ["All Items", "Press Tools", "Drain Cleaning", "Wrenches", "Benders", "Stands & Vises", "Accessories"];
const brands = ["RIDGID", "Greenlee", "Victaulic"];

export default function NewEquipmentPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [selectedBrands, setSelectedBrands] = useState<string[]>(["RIDGID"]);

    const filteredProducts = newEquipmentProducts.filter((product) => {
        if (selectedCategory !== "All Items" && product.type !== selectedCategory) {
            return false;
        }
        return true;
    });

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background Effects */}
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <Header />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
                {/* Breadcrumbs & Heading */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-4 pl-1">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Catalog
                        </Link>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-white font-medium">New Equipment</span>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                                New Equipment
                            </h1>
                            <p className="text-white/50 text-lg font-light leading-relaxed">
                                Discover our latest collection of premium industrial-grade power tools, engineered for precision and durability in the modern workshop.
                            </p>
                        </div>
                        <div className="flex gap-2 relative z-10">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-[#102216] bg-white/10"
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col justify-center pl-2">
                                <span className="text-white text-xs font-bold">1k+ Reviews</span>
                                <div className="flex text-primary text-[10px]">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                        <div className="glass-panel p-5 rounded-xl sticky top-28">
                            <div className="flex items-center justify-between mb-6 px-1">
                                <h3 className="text-white font-bold text-lg">Filters</h3>
                                <button className="text-white/40 text-xs hover:text-white transition-colors">
                                    Reset
                                </button>
                            </div>

                            <div className="space-y-3">
                                {/* Brand Filter */}
                                <details className="group bg-black/20 rounded-xl border border-white/5 overflow-hidden" open>
                                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors select-none">
                                        <span className="text-white text-sm font-medium">Brand</span>
                                        <svg className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-4 pb-4 space-y-2">
                                        {brands.map((brand) => (
                                            <label key={brand} className="flex items-center gap-3 cursor-pointer group/item">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => toggleBrand(brand)}
                                                        className="peer appearance-none w-4 h-4 border border-white/20 rounded bg-transparent checked:bg-primary checked:border-primary transition-all"
                                                    />
                                                    <svg
                                                        className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-white/50 text-sm group-hover/item:text-white transition-colors">
                                                    {brand}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </details>

                                {/* Price Filter */}
                                <details className="group bg-black/20 rounded-xl border border-white/5 overflow-hidden" open>
                                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors select-none">
                                        <span className="text-white text-sm font-medium">Price Range</span>
                                        <svg className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-4 pb-4">
                                        <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                                            <span>$0</span>
                                            <span>$2,500+</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex gap-2 mt-4">
                                            <div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white flex-1 text-center">
                                                $150
                                            </div>
                                            <span className="text-white/40 self-center">-</span>
                                            <div className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white flex-1 text-center">
                                                $850
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                {/* Availability Filter */}
                                <details className="group bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors select-none">
                                        <span className="text-white text-sm font-medium">Availability</span>
                                        <svg className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-4 pb-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="appearance-none w-4 h-4 border border-white/20 rounded bg-transparent checked:bg-primary checked:border-primary"
                                                defaultChecked
                                            />
                                            <span className="text-white/50 text-sm">In Stock Only</span>
                                        </label>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Section */}
                    <section className="flex-1 min-w-0">
                        {/* Categories & Sorting */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? "bg-primary text-black shadow-neon"
                                        : "glass-panel-light hover:bg-white/5 text-white"
                                        }`}
                                >
                                    {category}
                                    {category !== "All Items" && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === category ? "bg-black/20" : "bg-white/10"
                                            }`}>
                                            {newEquipmentProducts.filter(p => p.type === category).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                            <div className="ml-auto">
                                <button className="flex items-center gap-2 h-9 pl-4 pr-2 rounded-full glass-panel-light hover:bg-white/5 text-white/60 text-sm font-medium transition-all">
                                    <span>Sort: Newest</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                                    href={`/products/new/${product.id}`}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center pb-12">
                            <button className="glass-panel hover:bg-white/5 rounded-full px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 flex items-center gap-2">
                                <span>Load More Products</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
