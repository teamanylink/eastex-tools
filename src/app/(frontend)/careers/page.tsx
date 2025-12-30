
import React from "react";
import Link from "next/link";

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Join the Crew
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl">
                    <p className="mb-6">
                        We are always looking for skilled technicians, logistics experts, and sales professionals who understand the industry.
                    </p>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p>No open positions at this time. Please check back later or send your resume to careers@eastextools.com for future consideration.</p>
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
