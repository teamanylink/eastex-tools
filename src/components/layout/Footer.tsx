"use client";

import Link from "next/link";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/40 py-12 px-4 md:px-10 flex justify-center backdrop-blur-md mt-auto">
            <FadeInStagger className="w-full max-w-7xl flex flex-col md:flex-row justify-between gap-10">
                {/* Brand */}
                <FadeInItem className="flex flex-col gap-4">
                    <Link href="/" className="flex items-center gap-3">

                        <span className="text-white text-lg font-bold tracking-tight">
                            Eastex Tools
                        </span>
                    </Link>
                    <p className="text-white/40 text-sm max-w-xs">
                        Premium tools for the professionals who build our world.
                    </p>
                </FadeInItem>

                {/* Links */}
                <div className="flex flex-wrap gap-12 md:gap-16">
                    {/* Shop */}
                    <FadeInItem className="flex flex-col gap-4">
                        <h5 className="text-white font-bold">Shop</h5>
                        <Link
                            href="/new-equipment"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            New Arrivals
                        </Link>
                        <Link
                            href="/refurbished"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Refurbished
                        </Link>
                        <Link
                            href="/accessories"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Accessories
                        </Link>
                    </FadeInItem>

                    {/* Support */}
                    <FadeInItem className="flex flex-col gap-4">
                        <h5 className="text-white font-bold">Support</h5>
                        <Link
                            href="/contact"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/warranty"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Warranty
                        </Link>
                        <Link
                            href="/shipping"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Shipping
                        </Link>
                    </FadeInItem>

                    {/* Company */}
                    <FadeInItem className="flex flex-col gap-4">
                        <h5 className="text-white font-bold">Company</h5>
                        <Link
                            href="/about"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/careers"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Careers
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-white/60 hover:text-primary text-sm transition-colors"
                        >
                            Privacy
                        </Link>
                    </FadeInItem>
                </div>
            </FadeInStagger>
        </footer>
    );
}
