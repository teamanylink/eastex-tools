import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { refurbishedProducts } from "@/lib/products";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function RefurbishedProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = refurbishedProducts.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    const savings = product.originalPrice ? product.originalPrice - product.price : 0;

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background Ambient Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <Header />

            <main className="pt-32 pb-40 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-white/60 px-2 font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href="/refurbished" className="hover:text-primary transition-colors">Refurbished Tools</Link>
                    <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white font-semibold">{product.name}</span>
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Product Imagery */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="glass-panel rounded-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden group border-primary/20">
                            {/* Before/After Toggle */}
                            <div className="absolute top-6 left-6 z-10 flex bg-black/60 backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-lg">
                                <button className="px-5 py-2 rounded-full bg-white/15 text-white text-xs font-bold shadow-inner transition-all hover:bg-white/25 border border-white/5">
                                    After Refurbishment
                                </button>
                                <button className="px-5 py-2 rounded-full text-white/50 text-xs font-semibold hover:text-white transition-colors">
                                    Before
                                </button>
                            </div>

                            {/* Main Image */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] transform transition-transform duration-700 hover:scale-105 z-0"
                            />

                            {/* Zoom Icon */}
                            <button className="absolute bottom-6 right-6 size-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md shadow-lg group-hover:scale-110">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <button
                                    key={i}
                                    className={`glass-panel rounded-xl aspect-square p-2 flex items-center justify-center transition-all duration-300 ${i === 1 ? "border-primary/50 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(13,242,89,0.1)]" : "hover:border-white/30 opacity-70 hover:opacity-100 hover:-translate-y-1"
                                        }`}
                                >
                                    <img
                                        src={product.image}
                                        alt={`View ${i}`}
                                        className={i === 1 ? "w-full h-full object-contain opacity-100" : "w-full h-full object-contain"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details Card */}
                    <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
                        <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                            {/* Header */}
                            <div className="flex flex-col gap-3 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-bold tracking-widest border border-primary/20 uppercase">
                                        {product.badge}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-amber-400 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "fill-current opacity-30"}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="text-white/70 text-xs font-medium ml-1">({product.reviewCount})</span>
                                    </div>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                    {product.name}
                                </h1>
                                <p className="text-white/70 text-base leading-relaxed font-light">
                                    Industrial grade tool restored to peak performance. Rigorously tested, thoroughly cleaned, and ready for professional use on any job site.
                                </p>
                            </div>

                            {/* Condition Badge */}
                            <div className="bg-white/5 rounded-xl p-4 flex items-start gap-4 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-base mb-0.5">{product.subtitle}</p>
                                    <p className="text-white/50 text-xs leading-relaxed">Top-tier refurbishment. No cosmetic imperfections visible at arm&apos;s length. Battery health guaranteed &gt;95%.</p>
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"></div>

                            {/* Price */}
                            <div className="flex items-end gap-4">
                                <span className="text-5xl font-bold text-white tracking-tighter">${product.price.toFixed(2)}</span>
                                <div className="flex flex-col pb-1.5 gap-0.5">
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-white/50 text-base line-through font-medium Decoration-white/30">${product.originalPrice.toFixed(2)}</span>
                                            <span className="text-primary text-xs font-bold px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                                                SAVE ${savings.toFixed(0)} ({Math.round((savings / product.originalPrice) * 100)}%)
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col gap-4 mt-2">
                                <Link
                                    href="/cart"
                                    className="w-full bg-primary text-[#050505] font-extrabold text-lg h-14 rounded-full hover:bg-[#00ff55] hover:shadow-neon-strong transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                                >
                                    <span>Add to Cart</span>
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <div className="flex items-center justify-center gap-6 text-white/40 text-xs font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        In Stock
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Ships in 24h
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        Free Returns
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Short Highlights */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: "✅", label: "Certified", sub: "Fully Tested" },
                                { icon: "🛡️", label: "1-Year", sub: "Full Warranty" },
                                { icon: "📦", label: "Fast Ship", sub: "1-2 Days" },
                            ].map(({ icon, label, sub }) => (
                                <div key={label} className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-1 text-center hover:bg-white/5 transition-colors group cursor-default">
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300 mb-1">{icon}</span>
                                    <span className="text-sm font-bold text-white">{label}</span>
                                    <span className="text-[10px] text-white/40 uppercase tracking-wide font-medium">{sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Restoration Story */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-white mb-8 px-2 flex items-center gap-3">
                        <span className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold border border-primary/20">01</span>
                        The Restoration Process
                    </h2>
                    <div className="glass-panel rounded-2xl p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                            {[
                                { step: "1", title: "Disassembly", desc: "Every tool is completely taken apart to the screw level.", icon: "🔧" },
                                { step: "2", title: "Deep Cleaning", desc: "Ultrasonic cleaning removes all grit, grease, and dust.", icon: "✨" },
                                { step: "3", title: "Rebuild", desc: "Worn parts replaced with genuine OEM components.", icon: "🔩" },
                                { step: "4", title: "Certification", desc: "Rigorous stress testing to ensure factory-new performance.", icon: "✅" },
                            ].map(({ step, title, desc, icon }, i) => (
                                <div key={step} className="flex flex-col gap-4 items-center text-center max-w-[240px] group">
                                    <div className={`size-20 rounded-2xl flex items-center justify-center shadow-glass mb-2 transition-all duration-300 group-hover:-translate-y-2 ${i === 3 ? "bg-primary/10 border border-primary/30 shadow-neon" : "bg-white/5 border border-white/10 group-hover:bg-white/10"
                                        }`}>
                                        <span className="text-3xl">{icon}</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specs & Warranty Grid */}
                <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Tech Specs */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white">Technical Specs</h3>
                        </div>
                        <div className="space-y-0">
                            {[
                                ["Brand", "RIDGID"],
                                ["Condition", product.subtitle],
                                ["Category", product.type],
                                ["SKU", product.sku || "Contact Sales"],
                                ["Warranty", "1-Year Eastex Warranty"],
                                ["Return Policy", "30-Day Returns"],
                            ].map(([label, value], i) => (
                                <div key={label} className={`flex justify-between items-center py-3 ${i !== 5 ? "border-b border-white/5" : ""}`}>
                                    <span className="text-white/50 text-sm font-medium">{label}</span>
                                    <span className="text-white font-semibold text-sm">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warranty Card */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group border-white/10">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="flex flex-col gap-5 relative z-10">
                            <div className="size-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-neon bg-gradient-to-br from-primary to-[#0bc94a]">
                                <svg className="w-7 h-7 text-[#050505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">Ironclad 1-Year Warranty</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    We stand by our refurbishment process. If anything breaks within a year, we repair or replace it for free, including shipping.
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                            <a href="/warranty" className="text-primary text-sm font-bold hover:text-white transition-colors flex items-center gap-2 group/link">
                                View Warranty Policy
                                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* What's Included */}
                    <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white">What&apos;s Included</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { included: true, item: "Refurbished Tool Unit" },
                                { included: true, item: "Inspection Certificate" },
                                { included: true, item: "1-Year Warranty Card" },
                                { included: true, item: "User Documentation" },
                                { included: false, item: "Original Packaging" },
                            ].map(({ included, item }) => (
                                <li key={item} className={`flex items-center gap-3.5 text-sm font-medium ${included ? "text-white" : "text-white/40"}`}>
                                    {included ? (
                                        <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 shrink-0">
                                            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="size-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                            <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    )}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            {/* Floating Bottom Action Bar - Improved Padding and Blur */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-40 transition-transform duration-500 ease-out translate-y-0">
                <div className="glass-panel rounded-full p-2.5 pl-8 flex items-center justify-between shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0a100d]/80 backdrop-blur-xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-0.5">Total</span>
                        <span className="text-2xl font-bold text-white leading-none">${product.price.toFixed(0)}<span className="text-lg text-white/60">.{(product.price % 1).toFixed(2).substring(2)}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors bg-white/5 group">
                            <svg className="w-5 h-5 group-hover:fill-current transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <Link
                            href="/cart"
                            className="bg-primary text-[#050505] font-bold text-sm h-12 px-8 rounded-full hover:bg-[#00ff55] hover:shadow-neon transition-all flex items-center gap-2"
                        >
                            Add to Cart
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
