
import React from "react";
import Link from "next/link";

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Shipping & Logistics
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl">
                    <p className="mb-6">
                        We offer robust shipping options for heavy freight and standard parcels globally.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-white font-bold text-lg">Standard Ground</h3>
                            <p className="text-sm">3-5 Business Days. Free on orders over $1,500.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Freight/LTL</h3>
                            <p className="text-sm">Required for orders over 150 lbs. Calculated at checkout.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Expedited Air</h3>
                            <p className="text-sm">Next-day delivery available for urgent site requirements.</p>
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <Link href="/" className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-full">
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
