
import React from "react";
import Link from "next/link";

export default function AccessoriesPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 font-primary text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                    Industrial Accessories
                </h1>
                <div className="text-xl text-white/60 leading-relaxed max-w-2xl">
                    Browse our selection of heavy-duty attachments, batteries, and maintenance kits.
                    <br /><br />
                    Current inventory includes:
                    <ul className="list-disc list-inside mt-4 space-y-2 text-primary">
                        <li>High-capacity Lithium-Ion Battery Packs</li>
                        <li>Diamond-tipped Drill Bits</li>
                        <li>Industrial Saw Blades</li>
                        <li>Protective Carry Cases</li>
                    </ul>
                </div>
                <div className="pt-8">
                    <Link href="/new-equipment" className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-full">
                        View Equipment
                    </Link>
                </div>
            </div>
        </div>
    );
}
