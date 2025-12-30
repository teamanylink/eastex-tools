
import React from "react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Contact Support
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl">
                    Need assistance with an order or have a technical question? Our team is ready to help.
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                        <h3 className="text-xl font-bold text-white mb-4">Sales & Inquiries</h3>
                        <p className="text-white/60 mb-2">sales@eastextools.com</p>
                        <p className="text-white/60">+1 (800) 555-0123</p>
                    </div>
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                        <h3 className="text-xl font-bold text-white mb-4">Visit Our HQ</h3>
                        <p className="text-white/60 mb-2">123 Industrial Blvd</p>
                        <p className="text-white/60">Houston, TX 77001</p>
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
