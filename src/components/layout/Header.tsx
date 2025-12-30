"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
      <header className="flex items-center justify-between w-full max-w-5xl h-16 px-6 rounded-full glass-panel border border-white/10 shadow-lg pointer-events-auto transition-all duration-300 hover:border-white/20 hover:shadow-glass">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">

          <span className="text-white text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
            Eastex Tool
          </span>
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/new-equipment"
            className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            New Equipment
          </Link>
          <Link
            href="/refurbished"
            className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            Refurbished
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 group text-white/70">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group relative text-white/70 overflow-hidden"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <div className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full group-hover:scale-0 transition-transform"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 glass-panel rounded-2xl p-6 z-50">
          <nav className="flex flex-col gap-4">
            <Link
              href="/new-equipment"
              className="text-base font-medium text-white/70 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Equipment
            </Link>
            <Link
              href="/refurbished"
              className="text-base font-medium text-white/70 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Refurbished
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-white/70 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
