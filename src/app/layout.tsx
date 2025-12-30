import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Eastex Tool - Premium Industrial Equipment",
    description:
        "Premium new and certified refurbished equipment for the modern job site. Precision tools for precision work.",
    keywords: ["power tools", "industrial equipment", "refurbished tools", "RIDGID", "Greenlee", "Victaulic", "press tools", "drain cleaning"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
