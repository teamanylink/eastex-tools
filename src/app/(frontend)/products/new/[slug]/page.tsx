import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { newEquipmentProducts, featuredProducts, refurbishedProducts } from "@/lib/products";
import { notFound } from "next/navigation";

// Combine all product sources to ensure no product link goes to a blank page
const allProducts = [...newEquipmentProducts, ...featuredProducts, ...refurbishedProducts];

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function NewProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = allProducts.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background Effects */}
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* Left Column: Breadcrumbs + Main Image + Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-white/60 pl-2 font-medium">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="text-white/30">/</span>
                            <Link href="/new-equipment" className="hover:text-primary transition-colors">New Equipment</Link>
                            <span className="text-white/30">/</span>
                            <span className="text-white font-semibold">{product.name}</span>
                        </nav>

                        {/* Hero Image Container */}
                        <div className="glass-panel rounded-2xl p-10 relative overflow-hidden group border-primary/20 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10 w-full aspect-[4/3] flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-contain max-h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute top-6 left-6 flex gap-2">
                                {product.badge && (
                                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                        {product.badge === "NEW" ? "New Arrival" : product.badge}
                                    </span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                                    Professional Grade
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {[1, 2, 3, 4].map((i) => (
                                <button
                                    key={i}
                                    className={`size-20 min-w-20 rounded-xl border p-1 relative overflow-hidden transition-all duration-300 ${i === 1
                                        ? "border-primary/50 bg-white/5 ring-1 ring-primary/20"
                                        : "border-white/10 bg-white/5 hover:border-white/30 opacity-60 hover:opacity-100 hover:-translate-y-1"
                                        }`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image}
                                        alt={`View ${i}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 flex flex-col gap-6 relative">
                        {/* Product Info Header */}
                        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-5 relative overflow-hidden border-white/5">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.1]">
                                    {product.name}
                                </h1>
                                <p className="text-white/60 text-lg font-light leading-relaxed">{product.subtitle}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex text-amber-400 gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-current opacity-30"}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-white/50 font-medium border-l border-white/10 pl-3">
                                    {product.rating} ({product.reviewCount} Reviews)
                                </span>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                            {/* Price */}
                            <div className="flex items-end gap-3 mt-1">
                                <span className="text-5xl font-bold text-white tracking-tighter">${product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <div className="flex flex-col pb-1.5 pl-1">
                                        <span className="text-lg text-white/50 line-through decoration-white/30 font-medium mb-0.5">
                                            ${product.originalPrice.toFixed(2)}
                                        </span>
                                        <span className="text-primary text-[10px] font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            Save ${(product.originalPrice - product.price).toFixed(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-white/50 leading-relaxed mt-2 text-sm">
                                {product.subtitle}. Built for professionals who demand reliability and precision on every job site.
                            </p>
                        </div>

                        {/* Config & Actions */}
                        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
                            {/* Availability Status */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <div className="size-3 rounded-full bg-primary animate-pulse"></div>
                                <span className="text-primary font-semibold">In Stock</span>
                                <span className="text-white/50 text-sm ml-auto">Ships within 1-2 business days</span>
                            </div>

                            {/* SKU/Model Info */}
                            {(product.sku || product.modelNumber) && (
                                <div className="flex items-center gap-4 text-sm">
                                    {product.modelNumber && (
                                        <span className="text-white/50">Model: <span className="text-white font-medium">{product.modelNumber}</span></span>
                                    )}
                                    {product.sku && (
                                        <span className="text-white/50">SKU: <span className="text-white font-medium">{product.sku}</span></span>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex gap-4">
                                    {/* Quantity */}
                                    <div className="flex items-center bg-black/40 border border-white/10 rounded-full px-2 h-14 w-32 shrink-0">
                                        <button className="size-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            value="1"
                                            readOnly
                                            className="w-full bg-transparent text-center text-white font-bold border-none focus:ring-0 p-0 text-lg"
                                        />
                                        <button className="size-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Add to Cart */}
                                    <Link
                                        href="/cart"
                                        className="flex-1 bg-primary hover:bg-[#0be050] text-black font-bold text-lg rounded-full h-14 shadow-neon hover:shadow-[0_0_30px_rgba(13,242,89,0.5)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart
                                    </Link>
                                </div>

                                {/* Secondary Actions */}
                                <div className="flex items-center justify-between px-2">
                                    <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Add to Wishlist
                                    </button>
                                    <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wide">Free Shipping</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wide">5yr Warranty</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wide">30d Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications & Features */}
                <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {/* Specs Table */}
                    <div className="glass-panel rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </span>
                            Technical Specifications
                        </h3>
                        <div className="flex flex-col">
                            {[
                                ["Brand", "RIDGID"],
                                ["Model", product.modelNumber || "See Manual"],
                                ["SKU", product.sku || "Contact Sales"],
                                ["Category", product.type],
                                ["Condition", "Factory New"],
                                ["Warranty", "RIDGID Lifetime Service Agreement"],
                            ].map(([label, value], i) => (
                                <div key={i} className="flex justify-between py-4 border-b border-white/5 group hover:bg-white/5 px-2 rounded-lg transition-colors">
                                    <span className="text-white/50">{label}</span>
                                    <span className="text-white font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="glass-panel rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                            Key Features
                        </h3>
                        <ul className="space-y-6">
                            {[
                                ["Professional Grade", "Built for demanding professional applications with industrial-grade components."],
                                ["Authorized Dealer", "Eastex Tool is an authorized RIDGID dealer. All products include full manufacturer warranty."],
                                ["Expert Support", "Our team of specialists can help with product selection, training, and ongoing support."],
                                ["Fast Shipping", "Most orders ship within 1-2 business days. Free shipping on orders over $500."],
                            ].map(([title, desc], i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="mt-1 size-2 rounded-full bg-primary shadow-neon shrink-0"></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{title}</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
