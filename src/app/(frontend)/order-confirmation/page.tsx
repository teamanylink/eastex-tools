"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transactionId");

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Ambient Background Effects */}
            <div className="fixed top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60"></div>
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10 opacity-40"></div>

            <Header />

            <main className="flex-grow w-full max-w-3xl mx-auto px-4 md:px-6 py-6 pt-32 flex flex-col items-center justify-center text-center gap-8">
                {/* Success Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative size-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)]">
                        <svg
                            className="w-12 h-12 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Order Confirmed!
                    </h1>
                    <p className="text-xl text-white/60">
                        Thank you for your purchase.
                    </p>
                </div>

                {/* Transaction Details */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 w-full max-w-md">
                    <div className="space-y-4">
                        {transactionId && (
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-white/50 text-sm">Transaction ID</span>
                                <span className="text-white font-mono font-bold text-sm">
                                    {transactionId}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-white/50 text-sm">Order Status</span>
                            <span className="text-primary font-bold text-sm flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                Processing
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-white/50 text-sm">Estimated Delivery</span>
                            <span className="text-white font-bold text-sm">
                                2-3 Business Days
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Text */}
                <p className="text-white/40 text-sm max-w-md">
                    A confirmation email has been sent to your email address with your
                    order details and tracking information.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link
                        href="/"
                        className="h-12 px-8 rounded-full bg-primary text-black font-bold flex items-center justify-center gap-2 hover:shadow-neon transition-all"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="#"
                        className="h-12 px-8 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                        View Order Status
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-black">
                    <div className="size-12 rounded-full border-4 border-white/10 border-t-primary animate-spin"></div>
                </div>
            }
        >
            <OrderConfirmationContent />
        </Suspense>
    );
}
