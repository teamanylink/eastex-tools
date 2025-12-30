
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default function Loading() {
    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>
            <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-green-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <Header />

            <main className="flex-grow pt-32 px-4 md:px-10 pb-20 z-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Header Section Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <div className="bg-white/10 h-4 w-24 rounded animate-pulse"></div>
                            </div>
                            <div className="bg-white/10 h-12 w-64 rounded-lg animate-pulse mb-2"></div>
                            <div className="bg-white/5 h-5 w-96 rounded animate-pulse"></div>
                        </div>

                        {/* Search Bar Skeleton */}
                        <div className="w-full md:w-auto">
                            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-3 w-full md:w-[400px] h-12 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Stats Bar Skeleton */}
                    <div className="flex gap-8 border-y border-white/5 py-4">
                        <div className="bg-white/10 h-5 w-32 rounded animate-pulse"></div>
                        <div className="bg-white/10 h-5 w-24 rounded animate-pulse"></div>
                    </div>

                    {/* Parts Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center items-center gap-2 mt-10">
                        <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
                        <div className="flex items-center gap-2 px-4">
                            <div className="bg-white/10 h-5 w-20 rounded animate-pulse"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse"></div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
