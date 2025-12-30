"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function FloatingCart() {
    const { getItemCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const count = getItemCount();

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted || count === 0) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link
                href="/cart"
                className="glass-panel flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:scale-105 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-[#0a100d]/80"
            >
                <div className="relative">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold size-4 flex items-center justify-center rounded-full ring-2 ring-[#0a100d]">
                        {count}
                    </span>
                </div>

                <div className="flex flex-col mr-2">
                    <span className="text-white font-bold text-sm leading-none mb-0.5">View Cart</span>
                    <span className="text-white/50 text-[10px] uppercase tracking-wider font-medium group-hover:text-primary/80 transition-colors">
                        {count} {count === 1 ? 'Item' : 'Items'} Added
                    </span>
                </div>

                <div className="size-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Link>
        </div>
    );
}
