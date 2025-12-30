
import React from "react";
import Link from "next/link";

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Warranty Information
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl">
                    <p className="mb-4">
                        All Eastex Tools come with our standard Iron-Clad Guarantee. We stand behind the quality of our industrial equipment.
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><strong>New Equipment:</strong> 3-Year Limited Warranty covering defects in materials and workmanship.</li>
                        <li><strong>Refurbished Tools:</strong> 1-Year Certified Warranty.</li>
                        <li><strong>Accessories:</strong> 90-Day Satisfaction Guarantee.</li>
                    </ul>
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
