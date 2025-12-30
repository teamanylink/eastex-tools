"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
    id: string;
    catalogNumber: string;
    name: string;
    description?: string;
    manufacturer: "ridgid" | "greenlee" | string;
    upc?: string;
    price?: number;
    quantity: number;
    image?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getSubtotal: () => number;
    isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "eastex-cart";

// Helper to get initial cart from localStorage (runs only once)
function getInitialCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to load cart from localStorage:", e);
    }
    return [];
}



export function CartProvider({ children }: { children: React.ReactNode }) {
    // Initialize with lazy initializer to avoid the useEffect setState issue
    const [items, setItems] = useState<CartItem[]>(() => getInitialCart());
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate on client-side mount
    useEffect(() => {
        const stored = getInitialCart();
        if (stored.length > 0 && items.length === 0) {
            // Only update if we have stored items and current is empty
            // This handles the SSR case
            setItems(stored);
        }
        setIsHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save cart to localStorage whenever it changes (only after hydration)
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.error("Failed to save cart to localStorage:", e);
            }
        }
    }, [items, isHydrated]);

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((prevItems) => {
            const existingIndex = prevItems.findIndex((i) => i.id === item.id);
            if (existingIndex > -1) {
                // Item exists, increment quantity
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + 1,
                };
                return updated;
            }
            // New item
            return [...prevItems, { ...item, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getItemCount = useCallback(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    const getSubtotal = useCallback(() => {
        return items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    }, [items]);

    const isInCart = useCallback((id: string) => {
        return items.some((item) => item.id === id);
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                getItemCount,
                getSubtotal,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
