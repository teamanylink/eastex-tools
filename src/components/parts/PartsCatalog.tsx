
"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface Part {
    id: string;
    catalogNumber: string;
    description: string;
    upc?: string;
    manufacturer: "ridgid" | "greenlee";
}

interface PartsCatalogProps {
    initialParts: Part[];
    totalPages: number;
    currentPage: number;
    manufacturer: "ridgid" | "greenlee";
    totalDocs: number;
}

// Skeleton Card Component
function SkeletonCard() {
    return (
        <div className="relative bg-white/5 border border-white/5 rounded-2xl p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-white/10 h-6 w-24 rounded-lg"></div>
                <div className="bg-white/5 h-4 w-32 rounded"></div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="bg-white/10 h-5 w-full rounded"></div>
                <div className="bg-white/10 h-5 w-3/4 rounded"></div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="bg-white/5 h-4 w-16 rounded"></div>
                <div className="bg-white/10 h-4 w-24 rounded"></div>
            </div>
        </div>
    );
}

// Skeleton Grid Component
function SkeletonGrid({ count = 24 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function PartsCatalog({
    initialParts,
    totalPages,
    currentPage,
    manufacturer,
    totalDocs,
}: PartsCatalogProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [isPending, startTransition] = useTransition();
    const [isNavigating, setIsNavigating] = useState(false);

    // Track navigation state
    useEffect(() => {
        setIsNavigating(false);
    }, [initialParts, currentPage]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (searchParams.get("q") || "")) {
                setIsNavigating(true);
                const params = new URLSearchParams(searchParams.toString());
                if (search) {
                    params.set("q", search);
                } else {
                    params.delete("q");
                }
                params.set("page", "1"); // Reset to page 1 on search
                startTransition(() => {
                    router.push(`?${params.toString()}`);
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search, router, searchParams]);

    const handlePageChange = (newPage: number) => {
        setIsNavigating(true);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const brandColor = manufacturer === "ridgid" ? "text-red-500" : "text-green-500";
    const brandBg = manufacturer === "ridgid" ? "bg-red-500" : "bg-green-500";
    const isLoading = isPending || isNavigating;

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>
            <div className={`fixed top-[-20%] right-[-10%] w-[800px] h-[800px] ${manufacturer === 'ridgid' ? 'bg-red-600/10' : 'bg-green-600/10'} rounded-full blur-[120px] pointer-events-none z-0`}></div>

            <Header />

            <main className="flex-grow pt-32 px-4 md:px-10 pb-20 z-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`inline-block w-2 h-2 rounded-full ${brandBg} animate-pulse`}></span>
                                <span className={`${brandColor} font-bold tracking-widest uppercase text-xs`}>
                                    Official Catalog
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                                {manufacturer} <span className="text-white/30">Parts</span>
                            </h1>
                            <p className="text-white/60 mt-2 max-w-xl">
                                Browse our complete inventory of authentic {manufacturer === 'ridgid' ? 'RIDGID®' : 'Greenlee®'} replacement parts and tools.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-auto relative group">
                            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all"></div>
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-3 w-full md:w-[400px] backdrop-blur-md focus-within:border-white/20 transition-all">
                                <svg className="w-5 h-5 text-white/40 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder={`Search directly by Part # or Name...`}
                                    className="bg-transparent border-none outline-none text-white placeholder-white/30 w-full"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {isLoading && (
                                    <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full ml-2"></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex gap-8 border-y border-white/5 py-4 text-sm text-white/50">
                        <div>
                            {isLoading ? (
                                <div className="bg-white/10 h-5 w-32 rounded animate-pulse"></div>
                            ) : (
                                <>
                                    <span className="text-white font-bold">{totalDocs.toLocaleString()}</span> Items Found
                                </>
                            )}
                        </div>
                        <div>
                            {isLoading ? (
                                <div className="bg-white/10 h-5 w-24 rounded animate-pulse"></div>
                            ) : (
                                <>
                                    Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Parts Grid/List - Show skeleton during loading */}
                    {isLoading ? (
                        <SkeletonGrid count={24} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {initialParts.map((part) => (
                                <div
                                    key={part.id}
                                    className="group relative bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-black/40 px-3 py-1 rounded-lg border border-white/5 text-xs font-mono text-white/70 group-hover:text-white transition-colors">
                                            #{part.catalogNumber}
                                        </div>
                                        {part.upc && (
                                            <div className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
                                                UPC: {part.upc}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
                                        {part.description}
                                    </h3>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                                        <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                                            In Stock
                                        </div>
                                        <button className="text-sm font-bold text-white flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                            View Details
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && initialParts.length === 0 && (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                            <p className="text-white/40 text-lg">No parts found matching your search.</p>
                            <button
                                onClick={() => { setSearch(""); }}
                                className="mt-4 text-primary hover:underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && !isLoading && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2 px-4">
                                <span className="text-white/50 text-sm">Page</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={totalPages}
                                    value={currentPage}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (val >= 1 && val <= totalPages) {
                                            handlePageChange(val);
                                        }
                                    }}
                                    className="w-12 bg-black/30 border border-white/20 rounded-md text-center text-white text-sm py-1 focus:border-primary outline-none"
                                />
                                <span className="text-white/50 text-sm">of {totalPages}</span>
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Skeleton Pagination during loading */}
                    {isLoading && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
                            <div className="flex items-center gap-2 px-4">
                                <div className="bg-white/10 h-5 w-20 rounded animate-pulse"></div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
