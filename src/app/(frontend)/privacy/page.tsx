
import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Privacy Policy
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl space-y-4 text-base">
                    <p>Last Updated: December 2025</p>
                    <p>
                        Eastex Tool respects your privacy. This policy outlines how we collect, use, and protect your personal information.
                    </p>
                    <h3 className="text-white font-bold mt-4">Data Collection</h3>
                    <p>
                        We collect information necessary to process your orders and improve our services, including name, shipping address, and payment details.
                    </p>
                    <h3 className="text-white font-bold mt-4">Data Usage</h3>
                    <p>
                        Your data is used strictly for order fulfillment, customer support, and authorized marketing communications. We do not sell your data to third parties.
                    </p>
                    <h3 className="text-white font-bold mt-4">Security</h3>
                    <p>
                        We adhere to industry standards (PCI-DSS) to ensure your payment information is secure.
                    </p>
                </div>
                <div className="pt-8">
                    <Link href="/" className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-full">
                        Acccept & Close
                    </Link>
                </div>
            </div>
        </div>
    );
}
