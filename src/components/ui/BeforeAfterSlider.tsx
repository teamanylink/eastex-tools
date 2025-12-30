
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    className = "",
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [hasInteracted, setHasInteracted] = useState(false);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        // Check for clientX in different event types safely
        let clientX = 0;
        if ("touches" in event) {
            clientX = event.touches[0].clientX;
        } else if ("clientX" in event) {
            clientX = (event as MouseEvent).clientX;
        } else {
            return;
        }

        const x = clientX;
        const position = ((x - containerRect.left) / containerRect.width) * 100;

        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => {
        setHasInteracted(true);
        setIsDragging(true);
    };

    // Auto-slide animation
    useEffect(() => {
        if (hasInteracted) return;

        let animationFrame: number;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            // Slow sine wave oscillation
            // Period: 4000ms (4s)
            const frequency = 0.0015;
            const amplitude = 45; // Swing from 5 to 95
            const wave = Math.sin(elapsed * frequency); // -1 to 1

            // Center is 50.
            // 50 + (sin * 45) -> oscillates between 5 and 95
            setSliderPosition(50 + wave * amplitude);

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [hasInteracted]);

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                handleMove(e);
            }
        };

        const handleGlobalUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleGlobalMove);
            window.addEventListener("mouseup", handleGlobalUp);
            window.addEventListener("touchmove", handleGlobalMove, { passive: false });
            window.addEventListener("touchend", handleGlobalUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleGlobalMove);
            window.removeEventListener("mouseup", handleGlobalUp);
            window.removeEventListener("touchmove", handleGlobalMove);
            window.removeEventListener("touchend", handleGlobalUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden select-none group cursor-ew-resize border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* RIGHT IMAGE (After/Clean) - Fully visible background */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src={afterImage}
                    alt="After"
                    fill
                    className="object-cover"
                    draggable={false}
                    priority
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-xs font-black text-primary tracking-widest uppercase shadow-lg">
                    After
                </div>
            </div>

            {/* LEFT IMAGE (Before/Rusty) - Clipped on top */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeImage}
                    alt="Before"
                    fill
                    className="object-cover"
                    draggable={false}
                    priority
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black text-white/70 tracking-widest uppercase shadow-lg">
                    Before
                </div>

                {/* Dark overlay on the 'before' side to make it look even grimier/dramatic? Optional. 
                 Let's add a subtle vignette.
             */}
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
            </div>

            {/* SLIDER HANDLE & GLOW EFFECTS */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Intense Green Laser Glow */}
                <div className="absolute inset-0 bg-primary shadow-[0_0_30px_3px_rgba(34,197,94,0.6)] animate-pulse-fast"></div>
                <div className="absolute inset-0 bg-white opacity-50 blur-[2px]"></div>

                {/* Vertical Light Beam / Scan Effect */}
                <div className="absolute top-0 bottom-0 -left-16 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50 mix-blend-screen pointer-events-none"></div>

                {/* Handle Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-14 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-transform duration-200 hover:scale-110">
                    <div className="size-9 rounded-full bg-primary flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] relative overflow-hidden">
                        {/* Shimmer effect on handle */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-shimmer"></div>

                        <svg className="w-5 h-5 text-black relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Scanline/Grid overlay for "industrial" feel */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>
    );
};
