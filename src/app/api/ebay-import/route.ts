import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || "";
const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v2";

interface EbayProduct {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    ebayUrl?: string;
    condition?: string;
    itemId?: string;
}

async function scrapeEbayStore(storeUrl: string): Promise<{ success: boolean; products: EbayProduct[]; error?: string }> {
    try {
        // First, get the store page
        const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: storeUrl,
                formats: ["markdown", "html"],
                waitFor: 3000,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return {
                success: false,
                products: [],
                error: data.error || "Failed to scrape eBay store",
            };
        }

        const markdown = data.data?.markdown || "";
        const html = data.data?.html || "";

        // Extract products from the scraped content
        const products = parseEbayProducts(markdown, html);

        return {
            success: true,
            products,
        };
    } catch (error) {
        return {
            success: false,
            products: [],
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

function parseEbayProducts(markdown: string, html: string): EbayProduct[] {
    const products: EbayProduct[] = [];

    // Method 1: Parse from markdown - look for product patterns
    // eBay listings typically show as: [Product Name](link) $XX.XX
    const productLinks = markdown.matchAll(/\[([^\]]+)\]\((https:\/\/www\.ebay\.com\/itm\/[^\)]+)\)/g);

    for (const match of productLinks) {
        const name = match[1].trim();
        const url = match[2];

        // Skip navigation/non-product links
        if (name.length < 5 || name.toLowerCase().includes('see all') || name.toLowerCase().includes('shop')) {
            continue;
        }

        // Try to find price near this product
        const priceMatch = markdown.slice(markdown.indexOf(match[0])).match(/\$[\d,]+\.?\d*/);
        const price = priceMatch ? parseFloat(priceMatch[0].replace(/[$,]/g, '')) : 0;

        // Extract item ID from URL
        const itemIdMatch = url.match(/\/itm\/(\d+)/);
        const itemId = itemIdMatch ? itemIdMatch[1] : undefined;

        if (name && !products.some(p => p.name === name)) {
            products.push({
                name,
                price,
                ebayUrl: url,
                itemId,
            });
        }
    }

    // Method 2: Parse from HTML for images and more details
    // Look for eBay listing item patterns
    const imgMatches = html.matchAll(/<img[^>]+src="([^"]*i\.ebayimg\.com[^"]+)"[^>]*alt="([^"]+)"/g);

    for (const match of imgMatches) {
        const imageUrl = match[1];
        const altText = match[2];

        // Find if we already have this product and add image
        const existingProduct = products.find(p =>
            altText.toLowerCase().includes(p.name.toLowerCase().substring(0, 20)) ||
            p.name.toLowerCase().includes(altText.toLowerCase().substring(0, 20))
        );

        if (existingProduct) {
            existingProduct.imageUrl = imageUrl.replace(/s-l\d+/, 's-l500'); // Get larger image
        } else if (altText.length > 10 && !altText.toLowerCase().includes('logo')) {
            // Add new product from image alt text
            products.push({
                name: altText,
                price: 0,
                imageUrl: imageUrl.replace(/s-l\d+/, 's-l500'),
            });
        }
    }

    // Method 3: Look for structured data in the markdown
    const lines = markdown.split('\n');
    let currentProduct: Partial<EbayProduct> = {};

    for (const line of lines) {
        // Price line
        const priceMatch = line.match(/^\s*\$?([\d,]+\.?\d*)\s*$/);
        if (priceMatch && currentProduct.name) {
            currentProduct.price = parseFloat(priceMatch[1].replace(/,/g, ''));

            if (!products.some(p => p.name === currentProduct.name)) {
                products.push(currentProduct as EbayProduct);
            }
            currentProduct = {};
            continue;
        }

        // Product name line (title case, reasonable length)
        if (line.length > 15 && line.length < 200 && !line.startsWith('#') && !line.startsWith('[')) {
            const cleaned = line.trim();
            if (cleaned && !cleaned.toLowerCase().includes('free shipping') &&
                !cleaned.toLowerCase().includes('see all') &&
                !cleaned.toLowerCase().includes('items on sale')) {
                currentProduct.name = cleaned;
            }
        }
    }

    // Deduplicate and clean up
    const uniqueProducts = products.reduce((acc: EbayProduct[], product) => {
        if (product.name && product.name.length > 5 && !acc.some(p => p.name === product.name)) {
            acc.push(product);
        }
        return acc;
    }, []);

    return uniqueProducts;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { storeUrl, autoImport } = body;

        const ebayStoreUrl = storeUrl || "https://www.ebay.com/str/eastextoolllc";

        // Scrape the eBay store
        console.log("Scraping eBay store:", ebayStoreUrl);
        const result = await scrapeEbayStore(ebayStoreUrl);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        console.log(`Found ${result.products.length} products`);

        if (autoImport && result.products.length > 0) {
            const payload = await getPayload({ config });
            const importedProducts: Array<{ id: number; name: string }> = [];
            const errors: string[] = [];

            // First, find or create "Eastex Tool" as a manufacturer
            let manufacturerId: number | undefined;
            try {
                const existingManufacturer = await payload.find({
                    collection: "manufacturers",
                    where: { slug: { equals: "eastex-tools" } },
                    limit: 1,
                });

                if (existingManufacturer.docs.length > 0) {
                    manufacturerId = existingManufacturer.docs[0].id as number;
                } else {
                    const newManufacturer = await payload.create({
                        collection: "manufacturers",
                        data: {
                            name: "Eastex Tool",
                            slug: "eastex-tools",
                            website: "https://www.ebay.com/str/eastextoolllc",
                            featured: true,
                        },
                    });
                    manufacturerId = newManufacturer.id as number;
                }
            } catch (err) {
                console.error("Error with manufacturer:", err);
            }

            for (const product of result.products) {
                try {
                    // Generate slug
                    const slug = product.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")
                        .substring(0, 100);

                    // Check if product exists
                    const existing = await payload.find({
                        collection: "products",
                        where: { slug: { equals: slug } },
                        limit: 1,
                    });

                    if (existing.docs.length > 0) {
                        errors.push(`Skipped "${product.name.substring(0, 50)}..." - already exists`);
                        continue;
                    }

                    // Determine product type based on name
                    const isRefurbished = product.name.toLowerCase().includes('refurbished') ||
                        product.name.toLowerCase().includes('refurb') ||
                        product.condition?.toLowerCase().includes('refurbished');

                    // Create the product
                    const newProduct = await payload.create({
                        collection: "products",
                        data: {
                            name: product.name,
                            slug,
                            price: product.price || 0,
                            originalPrice: product.originalPrice,
                            productType: isRefurbished ? "refurbished" : "new",
                            manufacturer: manufacturerId,
                            imageUrl: product.imageUrl || "",
                            sku: product.itemId || "",
                            inStock: true,
                            rating: 4.5,
                            reviewCount: 0,
                            featured: false,
                        },
                    });

                    importedProducts.push({
                        id: newProduct.id as number,
                        name: (newProduct.name as string).substring(0, 50),
                    });
                } catch (err) {
                    errors.push(
                        `Failed "${product.name.substring(0, 30)}...": ${err instanceof Error ? err.message : "Unknown error"}`
                    );
                }
            }

            // Update manufacturer product count
            if (manufacturerId) {
                try {
                    await payload.update({
                        collection: "manufacturers",
                        id: manufacturerId,
                        data: {
                            productCount: importedProducts.length,
                            lastScrapedAt: new Date().toISOString(),
                        },
                    });
                } catch {
                    // Non-critical
                }
            }

            return NextResponse.json({
                success: true,
                scraped: result.products.length,
                imported: importedProducts.length,
                products: importedProducts,
                errors: errors.length > 0 ? errors : undefined,
            });
        }

        // Return preview only
        return NextResponse.json({
            success: true,
            products: result.products,
            count: result.products.length,
        });
    } catch (error) {
        console.error("eBay import error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to import from eBay" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const storeUrl = searchParams.get("storeUrl") || "https://www.ebay.com/str/eastextoolllc";

    // Preview only
    const result = await scrapeEbayStore(storeUrl);

    return NextResponse.json({
        success: result.success,
        products: result.products,
        count: result.products.length,
        error: result.error,
    });
}
