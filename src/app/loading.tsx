
import React from "react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full bg-black">
            <div className="relative flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="size-12 rounded-full border-4 border-white/10 border-t-primary animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>

                {/* Text */}
                <div className="text-white/50 text-sm font-medium animate-pulse tracking-widest uppercase">
                    Loading
                </div>
            </div>
        </div>
    );
}
