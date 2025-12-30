"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCart();

    const subtotal = getSubtotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background Effects */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(circle at 50% 0%, #15241b 0%, #050806 60%)",
                }}
            ></div>

            <Header />

            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-10 pt-32">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-sm">
                    <Link href="/" className="text-white/40 hover:text-primary transition-colors">
                        Home
                    </Link>
                    <span className="text-white/20">/</span>
                    <span className="text-white font-medium">Cart</span>
                </div>

                {/* Page Heading */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                            Your Cart
                        </h2>
                        <p className="text-white/50 text-lg">
                            {items.length === 0
                                ? "Your cart is empty."
                                : `You have ${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart.`
                            }
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear Cart
                            </button>
                        )}
                        <Link
                            href="/ridgid"
                            className="text-primary hover:text-[#0be050] font-medium flex items-center gap-1 transition-colors group"
                        >
                            <svg
                                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
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
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                        <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                        <p className="text-white/40 mb-6">Browse our parts catalog to find what you need.</p>
                        <div className="flex justify-center gap-4">
                            <Link
                                href="/ridgid"
                                className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-full transition-colors"
                            >
                                Shop RIDGID Parts
                            </Link>
                            <Link
                                href="/greenlee"
                                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full transition-colors"
                            >
                                Shop Greenlee Parts
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Cart Items */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative glass-panel rounded-3xl p-5 md:p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Product Image / Placeholder */}
                                        <div className="shrink-0 relative overflow-hidden rounded-2xl bg-[#151515] w-full md:w-40 aspect-square group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center">
                                            {item.image ? (
                                                <>
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center opacity-90"
                                                        style={{ backgroundImage: `url('${item.image}')` }}
                                                    ></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className={`text-3xl font-black uppercase ${item.manufacturer === 'ridgid' ? 'text-red-500' : 'text-green-500'
                                                        }`}>
                                                        {item.manufacturer === 'ridgid' ? 'RIDGID' : 'Greenlee'}
                                                    </div>
                                                    <div className="text-white/40 text-xs mt-2 font-mono">
                                                        #{item.catalogNumber}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.manufacturer === 'ridgid'
                                                                    ? "bg-red-500/20 text-red-400 border-red-500/20"
                                                                    : "bg-green-500/20 text-green-400 border-green-500/20"
                                                                }`}
                                                        >
                                                            {item.manufacturer === 'ridgid' ? 'RIDGID' : 'Greenlee'} Part
                                                        </span>
                                                        <span className="text-xs text-primary font-medium">
                                                            In Stock
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white leading-tight mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-white/40 font-light">
                                                        SKU: {item.catalogNumber} {item.upc && `| UPC: ${item.upc}`}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg text-white/50">
                                                        {item.price ? (
                                                            <span className="text-xl font-bold text-white">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-primary">Price on Request</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-end justify-between mt-6 md:mt-0">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-sm text-white/40 hover:text-red-400 flex items-center gap-1 transition-colors"
                                                >
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
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                    Remove
                                                </button>

                                                <div className="flex items-center bg-black/30 rounded-full border border-white/10 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="size-8 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                                                    >
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
                                                                d="M20 12H4"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (val > 0) updateQuantity(item.id, val);
                                                        }}
                                                        className="w-10 bg-transparent text-center text-white font-medium focus:ring-0 border-none p-0 text-sm"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="size-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-primary hover:text-black transition-colors shadow-lg"
                                                    >
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
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-28 glass-panel rounded-3xl p-8">
                                <h3 className="text-xl font-black text-white mb-6">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                                        <span className="font-medium text-white">
                                            {subtotal > 0 ? `$${subtotal.toFixed(2)}` : "Price on Request"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Estimated Shipping</span>
                                        <span className="text-primary font-medium">Free</span>
                                    </div>
                                    {subtotal > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/60">Tax Estimate</span>
                                            <span className="font-medium text-white">
                                                ${tax.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-white">Total</span>
                                        <span className="text-3xl font-black text-white tracking-tight">
                                            {total > 0 ? `$${total.toFixed(2)}` : "TBD"}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full group relative overflow-hidden bg-primary text-black font-bold text-lg py-4 rounded-full shadow-neon hover:shadow-neon-strong transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Request Quote
                                        <svg
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                                </Link>

                                <p className="text-center text-white/40 text-xs mt-4">
                                    Parts pricing provided upon request. <br />Our team will contact you within 24 hours.
                                </p>

                                <div className="mt-6 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2 text-white/30 text-xs">
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
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        Secure SSL Encryption
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
