"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface CartItem {
    name: string;
    qty: number;
    price: number;
}

const cartItems: CartItem[] = [
    { name: "RIDGID RP 350 Press Tool", qty: 1, price: 1599.0 },
    { name: "RIDGID K40B Drain Machine", qty: 1, price: 899.0 },
    { name: "RIDGID Thread Cutting Oil 1 Gal", qty: 2, price: 34.0 },
];

export default function PaymentPage() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [cardNumber, setCardNumber] = useState("");
    const [expirationMonth, setExpirationMonth] = useState("");
    const [expirationYear, setExpirationYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardholderName, setCardholderName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    // Billing address (can be pre-filled from shipping step in real app)
    const [billingAddress, setBillingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
    });

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsProcessing(true);

        try {
            // Format expiration date as MMYY
            const expirationDate = `${expirationMonth.padStart(2, "0")}${expirationYear.slice(-2)}`;

            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: total,
                    customerEmail: customerEmail,
                    payment: {
                        cardNumber: cardNumber.replace(/\s/g, ""),
                        expirationDate,
                        cardCode: cvv,
                    },
                    billing: {
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        address: billingAddress.address,
                        city: billingAddress.city,
                        state: billingAddress.state,
                        zip: billingAddress.zip,
                        country: billingAddress.country,
                    },
                    lineItems: cartItems.map((item, index) => ({
                        itemId: `ITEM-${index + 1}`,
                        name: item.name.substring(0, 31), // Max 31 chars
                        quantity: item.qty,
                        unitPrice: item.price,
                    })),
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Redirect to success page
                router.push(`/order-confirmation?transactionId=${result.transactionId}`);
            } else {
                setError(result.message || "Payment failed. Please try again.");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Ambient Background Effects */}
            <div className="fixed top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60"></div>
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px] pointer-events-none -z-10 opacity-40"></div>

            <Header />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-6 pt-32 flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Column: Payment Form */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Stepper */}
                    <nav className="flex items-center gap-3 text-sm font-medium ml-2">
                        <Link
                            href="/cart"
                            className="text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
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
                        <Link
                            href="/checkout"
                            className="text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
                        >
                            Shipping
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
                            Payment
                        </span>
                    </nav>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {/* Section: Payment Information */}
                        <section className="glass-panel rounded-3xl p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold tracking-wide text-white">
                                    Payment Information
                                </h2>
                                <div className="flex items-center gap-2 text-white/40">
                                    {/* Card brand icons */}
                                    <svg className="w-8 h-5" viewBox="0 0 32 20">
                                        <rect fill="#1a1f71" width="32" height="20" rx="3" />
                                        <text
                                            x="16"
                                            y="13"
                                            fill="white"
                                            fontSize="8"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            VISA
                                        </text>
                                    </svg>
                                    <svg className="w-8 h-5" viewBox="0 0 32 20">
                                        <rect fill="#eb001b" width="15" height="20" rx="3" />
                                        <rect fill="#f79e1b" x="17" width="15" height="20" rx="3" />
                                    </svg>
                                    <svg className="w-8 h-5" viewBox="0 0 32 20">
                                        <rect fill="#006fcf" width="32" height="20" rx="3" />
                                        <text
                                            x="16"
                                            y="13"
                                            fill="white"
                                            fontSize="6"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            AMEX
                                        </text>
                                    </svg>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        required
                                        className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={cardholderName}
                                        onChange={(e) => setCardholderName(e.target.value)}
                                        required
                                        className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(formatCardNumber(e.target.value))
                                        }
                                        maxLength={19}
                                        required
                                        className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary font-mono tracking-wider"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                            Month
                                        </label>
                                        <select
                                            value={expirationMonth}
                                            onChange={(e) => setExpirationMonth(e.target.value)}
                                            required
                                            className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                                        >
                                            <option value="">MM</option>
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const month = (i + 1).toString().padStart(2, "0");
                                                return (
                                                    <option key={month} value={month}>
                                                        {month}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                            Year
                                        </label>
                                        <select
                                            value={expirationYear}
                                            onChange={(e) => setExpirationYear(e.target.value)}
                                            required
                                            className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                                        >
                                            <option value="">YY</option>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = (new Date().getFullYear() + i).toString();
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            value={cvv}
                                            onChange={(e) =>
                                                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                                            }
                                            maxLength={4}
                                            required
                                            className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary font-mono text-center"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Billing Address */}
                        <section className="glass-panel rounded-3xl p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold tracking-wide text-white">
                                    Billing Address
                                </h2>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-transparent checked:bg-primary checked:border-primary transition-all"
                                    />
                                    <span className="text-sm text-white/50">
                                        Same as shipping
                                    </span>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={billingAddress.firstName}
                                        onChange={(e) =>
                                            setBillingAddress({
                                                ...billingAddress,
                                                firstName: e.target.value,
                                            })
                                        }
                                        required
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
                                        value={billingAddress.lastName}
                                        onChange={(e) =>
                                            setBillingAddress({
                                                ...billingAddress,
                                                lastName: e.target.value,
                                            })
                                        }
                                        required
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
                                        value={billingAddress.address}
                                        onChange={(e) =>
                                            setBillingAddress({
                                                ...billingAddress,
                                                address: e.target.value,
                                            })
                                        }
                                        required
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
                                        value={billingAddress.city}
                                        onChange={(e) =>
                                            setBillingAddress({
                                                ...billingAddress,
                                                city: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                            State
                                        </label>
                                        <select
                                            value={billingAddress.state}
                                            onChange={(e) =>
                                                setBillingAddress({
                                                    ...billingAddress,
                                                    state: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                                        >
                                            <option value="">Select</option>
                                            <option value="AL">AL</option>
                                            <option value="AK">AK</option>
                                            <option value="AZ">AZ</option>
                                            <option value="CA">CA</option>
                                            <option value="CO">CO</option>
                                            <option value="FL">FL</option>
                                            <option value="GA">GA</option>
                                            <option value="NY">NY</option>
                                            <option value="TX">TX</option>
                                            <option value="WA">WA</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                                            ZIP
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="10001"
                                            value={billingAddress.zip}
                                            onChange={(e) =>
                                                setBillingAddress({
                                                    ...billingAddress,
                                                    zip: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full h-12 px-4 rounded-xl glass-input focus:ring-1 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary text-black font-bold text-lg h-14 rounded-full shadow-neon hover:shadow-neon-strong hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isProcessing ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing Payment...
                                </>
                            ) : (
                                <>
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    Pay ${total.toFixed(2)}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-96 lg:sticky lg:top-28 h-fit">
                    <div className="glass-panel rounded-3xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                            Order Summary
                            <span className="text-sm font-normal text-white/50">
                                {cartItems.length} items
                            </span>
                        </h3>

                        {/* Cart Preview Items */}
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto no-scrollbar">
                            {cartItems.map((item, i) => (
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

                        {/* Totals */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Subtotal</span>
                                <span className="text-white font-medium">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Shipping</span>
                                <span className="text-primary font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Tax</span>
                                <span className="text-white font-medium">
                                    ${tax.toFixed(2)}
                                </span>
                            </div>
                            <div className="h-px bg-white/10 my-4"></div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-black text-white">
                                    ${total.toFixed(2)}
                                </span>
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
                        <div className="flex items-center gap-2 text-white/30 text-xs">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
                                <path d="M2 10h20" strokeWidth="2" />
                            </svg>
                            Powered by Authorize.net
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
