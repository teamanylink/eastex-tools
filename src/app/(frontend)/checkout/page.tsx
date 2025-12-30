import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutPage() {
    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Ambient Background Effects */}
            <div className="fixed top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60"></div>
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px] pointer-events-none -z-10 opacity-40"></div>

            <Header />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-6 pt-32 flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Column: Checkout Form */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Stepper */}
                    <nav className="flex items-center gap-3 text-sm font-medium ml-2">
                        <Link
                            href="/cart"
                            className="text-primary/70 hover:text-primary transition-colors flex items-center gap-1"
                        >
                            Cart
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                        <span className="text-primary flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-neon">
                            Shipping
                        </span>
                        <span className="text-white/30 flex items-center gap-1">
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            Payment
                        </span>
                    </nav>

                    {/* Section: Contact */}
                    <section className="glass-panel rounded-3xl p-6 md:p-8">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-semibold tracking-wide text-white">
                                Contact Information
                            </h2>
                            <button
                                type="button"
                                className="text-sm text-primary hover:underline transition-colors"
                            >
                                Sign in for faster checkout
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-3 cursor-pointer group h-12">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-transparent checked:bg-primary checked:border-primary transition-all"
                                        />
                                        <svg
                                            className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 left-1 pointer-events-none"
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
                                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                                        Receive order updates via SMS
                                    </span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Section: Shipping Address */}
                    <section className="glass-panel rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold tracking-wide text-white mb-6">
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="123 Main Street"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    Apartment, suite, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Apt 4B"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                    City
                                </label>
                                <input
                                    type="text"
                                    placeholder="New York"
                                    className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        State
                                    </label>
                                    <select className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary appearance-none bg-no-repeat bg-right cursor-pointer">
                                        <option value="">Select</option>
                                        <option value="NY">NY</option>
                                        <option value="CA">CA</option>
                                        <option value="TX">TX</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        ZIP
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="10001"
                                        className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section: Shipping Method */}
                    <section className="glass-panel rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold tracking-wide text-white mb-6">
                            Shipping Method
                        </h2>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-4 rounded-xl border border-primary bg-primary/5 cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            defaultChecked
                                            className="peer appearance-none w-5 h-5 border-2 border-primary rounded-full checked:bg-primary transition-all"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Express Shipping</p>
                                        <p className="text-white/50 text-sm">2-3 business days</p>
                                    </div>
                                </div>
                                <span className="text-primary font-bold">Free</span>
                            </label>

                            <label className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:border-white/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            className="peer appearance-none w-5 h-5 border-2 border-white/30 rounded-full checked:border-primary checked:bg-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Standard Shipping</p>
                                        <p className="text-white/50 text-sm">5-7 business days</p>
                                    </div>
                                </div>
                                <span className="text-white font-bold">Free</span>
                            </label>

                            <label className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:border-white/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            className="peer appearance-none w-5 h-5 border-2 border-white/30 rounded-full checked:border-primary checked:bg-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Next Day Delivery</p>
                                        <p className="text-white/50 text-sm">
                                            Order before 2PM EST
                                        </p>
                                    </div>
                                </div>
                                <span className="text-white font-bold">$14.99</span>
                            </label>
                        </div>
                    </section>

                    {/* Continue Button */}
                    <Link
                        href="/payment"
                        className="w-full bg-primary text-black font-bold text-lg h-14 rounded-full shadow-neon hover:shadow-neon-strong hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        Continue to Payment
                        <svg
                            className="w-5 h-5"
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
                    </Link>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-96 lg:sticky lg:top-28 h-fit">
                    <div className="glass-panel rounded-3xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                            Order Summary
                            <span className="text-sm font-normal text-white/50">3 items</span>
                        </h3>

                        {/* Cart Preview Items */}
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto no-scrollbar">
                            {[
                                { name: "RIDGID RP 350 Press Tool", qty: 1, price: 1599.0 },
                                { name: "RIDGID K40B Drain Machine", qty: 1, price: 899.0 },
                                { name: "RIDGID Thread Cutting Oil 1 Gal", qty: 2, price: 34.0 },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="size-12 rounded-lg bg-white/5 flex items-center justify-center text-white/50 text-xs font-bold border border-white/10">
                                        {item.qty}x
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">
                                            {item.name}
                                        </p>
                                    </div>
                                    <p className="text-white font-bold text-sm">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-white/10 my-6"></div>

                        {/* Promo Code */}
                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="Promo code"
                                className="flex-1 h-10 px-4 rounded-lg glass-input text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                            <button className="h-10 px-4 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                Apply
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Subtotal</span>
                                <span className="text-white font-medium">$392.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Shipping</span>
                                <span className="text-primary font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Tax</span>
                                <span className="text-white font-medium">$31.36</span>
                            </div>
                            <div className="h-px bg-white/10 my-4"></div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-black text-white">$423.36</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 flex flex-col items-center gap-4 text-center">
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
                            Secure 256-bit SSL encryption
                        </div>
                        <div className="flex gap-4 text-white/30 text-xs">
                            <span className="flex items-center gap-1">
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
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                90-Day Warranty
                            </span>
                            <span className="flex items-center gap-1">
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
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Free Returns
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
