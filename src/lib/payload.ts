import config from "@payload-config";
import { getPayload as getPayloadClient } from "payload";

export const getPayload = async () => {
    const payload = await getPayloadClient({
        config,
    });
    return payload;
};

// Helper to transform Payload product to frontend format
export interface FrontendProduct {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: "NEW" | "REFURB" | "RESTOCKED";
    rating: number;
    reviewCount: number;
    category: "new" | "refurbished";
    type: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformProduct(product: any): FrontendProduct {
    // Get image URL - either from uploaded media or external URL
    let imageUrl = product.imageUrl || "";
    if (product.images && product.images.length > 0 && product.images[0].image) {
        const img = product.images[0].image;
        if (typeof img === "object" && img.url) {
            imageUrl = img.url;
        }
    }

    return {
        id: product.slug || product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        price: product.price,
        originalPrice: product.originalPrice || undefined,
        image: imageUrl,
        badge: product.badge || undefined,
        rating: product.rating || 4.5,
        reviewCount: product.reviewCount || 0,
        category: product.productType || "new",
        type: product.toolType || "Drills",
    };
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<FrontendProduct[]> {
    try {
        const payload = await getPayload();
        const { docs } = await payload.find({
            collection: "products",
            where: {
                featured: { equals: true },
            },
            limit: 8,
        });
        return docs.map(transformProduct);
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
}

// Fetch products by type
export async function getProductsByType(
    type: "new" | "refurbished",
    limit = 12
): Promise<FrontendProduct[]> {
    try {
        const payload = await getPayload();
        const { docs } = await payload.find({
            collection: "products",
            where: {
                productType: { equals: type },
            },
            limit,
        });
        return docs.map(transformProduct);
    } catch (error) {
        console.error(`Error fetching ${type} products:`, error);
        return [];
    }
}

// Fetch single product by slug
export async function getProductBySlug(
    slug: string
): Promise<FrontendProduct | null> {
    try {
        const payload = await getPayload();
        const { docs } = await payload.find({
            collection: "products",
            where: {
                slug: { equals: slug },
            },
            limit: 1,
        });
        return docs.length > 0 ? transformProduct(docs[0]) : null;
    } catch (error) {
        console.error(`Error fetching product ${slug}:`, error);
        return null;
    }
}
