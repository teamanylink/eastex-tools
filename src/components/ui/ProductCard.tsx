import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: "NEW" | "REFURB" | "RESTOCKED";
    rating?: number;
    reviewCount?: number;
    href: string;
}

export function ProductCard({
    name,
    subtitle,
    price,
    originalPrice,
    image,
    badge,
    rating = 4.5,
    reviewCount,
    href,
}: ProductCardProps) {
    const isRefurbished = badge === "REFURB";
    const savings = originalPrice ? originalPrice - price : 0;

    return (
        <Link href={href} className="block group">
            <div className="relative rounded-3xl glass-card p-4 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                {/* Image Container */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/40 mb-4">
                    {/* Badge */}
                    {badge && (
                        <div
                            className={`absolute top-3 right-3 z-10 backdrop-blur-sm px-2 py-1 rounded-lg border ${isRefurbished
                                ? "bg-primary/20 border-primary/20"
                                : "bg-black/60 border-white/10"
                                }`}
                        >
                            <span className="text-xs font-bold text-primary">{badge}</span>
                        </div>
                    )}

                    {/* Savings Badge */}
                    {savings > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="px-2 py-1 rounded-lg bg-primary text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                Save ${savings}
                            </span>
                        </div>
                    )}

                    {/* Product Image */}
                    <div
                        className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    {/* Quick Add Button (appears on hover) */}
                    <button
                        className="absolute bottom-3 right-3 z-10 size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic
                        }}
                    >
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 px-1">
                    {/* Rating */}
                    {rating && (
                        <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                                        ? "text-primary fill-current"
                                        : i < rating
                                            ? "text-primary fill-current opacity-50"
                                            : "text-white/20"
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            {reviewCount && (
                                <span className="text-xs text-white/40 ml-1">
                                    ({reviewCount})
                                </span>
                            )}
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                        {name}
                    </h3>

                    {/* Subtitle & Price Row */}
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-white/60 text-sm line-clamp-1">{subtitle}</p>
                        <div className="flex items-center gap-2">
                            {originalPrice && (
                                <span className="text-white/40 text-sm line-through">
                                    ${originalPrice}
                                </span>
                            )}
                            <span
                                className={`font-bold ${isRefurbished ? "text-primary" : "text-white"
                                    }`}
                            >
                                ${price.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button (full width, appears on hover) */}
                <button
                    className="mt-4 w-full h-10 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-primary hover:text-black hover:border-primary transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}
