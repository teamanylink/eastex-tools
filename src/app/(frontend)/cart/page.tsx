import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Sample cart data - RIDGID Products
const cartItems = [
    {
        id: "ridgid-rp-350-ref",
        name: "RIDGID RP 350 Press Tool",
        subtitle: "Refurbished - Grade A",
        sku: "RP-350-REF",
        price: 1599.0,
        quantity: 1,
        image: "https://cdn2.ridgid.com/resources/images/cded2670-a792-4a56-a129-e5fc7fbece62",
        badge: "refurbished",
        inStock: true,
    },
    {
        id: "ridgid-k40b-new",
        name: "RIDGID K40B Drain Machine",
        subtitle: "Brand New",
        sku: "K40B-NEW",
        price: 899.0,
        quantity: 1,
        image: "https://cdn2.ridgid.com/resources/images/bbad6855-e409-4b92-97b6-572be81cd048",
        badge: "new",
        inStock: true,
    },
    {
        id: "ridgid-thread-oil",
        name: "RIDGID Endura-Clear Thread Cutting Oil",
        subtitle: "New - 1 Gallon",
        sku: "32808",
        price: 34.0,
        quantity: 2,
        image: "https://cdn2.ridgid.com/resources/images/997d00d1-4da5-49b0-ba84-280b2feed004",
        badge: "new",
        inStock: true,
    },
];


export default function CartPage() {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
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
                            You have {cartItems.length} items reserved.
                        </p>
                    </div>
                    <Link
                        href="/new-equipment"
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Cart Items */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative glass-panel rounded-3xl p-5 md:p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Product Image */}
                                    <div className="shrink-0 relative overflow-hidden rounded-2xl bg-[#151515] w-full md:w-40 aspect-square group-hover:scale-[1.02] transition-transform duration-500">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-90"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.badge === "new"
                                                            ? "bg-primary/20 text-primary border-primary/20 shadow-neon"
                                                            : "bg-white/10 text-white/80 border-white/5"
                                                            }`}
                                                    >
                                                        {item.subtitle}
                                                    </span>
                                                    {item.inStock && (
                                                        <span className="text-xs text-primary font-medium">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-white leading-tight mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-white/40 font-light">
                                                    SKU: {item.sku}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-end justify-between mt-6 md:mt-0">
                                            <button className="text-sm text-white/40 hover:text-red-400 flex items-center gap-1 transition-colors">
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
                                                <button className="size-8 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors">
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
                                                    readOnly
                                                    value={item.quantity}
                                                    className="w-10 bg-transparent text-center text-white font-medium focus:ring-0 border-none p-0 text-sm"
                                                />
                                                <button className="size-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-primary hover:text-black transition-colors shadow-lg">
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
                                    <span className="text-white/60">Subtotal</span>
                                    <span className="font-medium text-white">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60">Estimated Shipping</span>
                                    <span className="text-primary font-medium">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60">Tax Estimate</span>
                                    <span className="font-medium text-white">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-white">Total</span>
                                    <span className="text-3xl font-black text-white tracking-tight">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full group relative overflow-hidden bg-primary text-black font-bold text-lg py-4 rounded-full shadow-neon hover:shadow-neon-strong transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Proceed to Checkout
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
                                <div className="flex gap-2 opacity-30 grayscale hover:opacity-50 transition-opacity">
                                    <div className="h-6 w-9 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">
                                        VISA
                                    </div>
                                    <div className="h-6 w-9 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">
                                        MC
                                    </div>
                                    <div className="h-6 w-9 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">
                                        AMEX
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
