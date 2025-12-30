import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { scrapeManufacturerProducts } from "@/lib/firecrawl";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { manufacturerId, catalogUrl, manufacturerName, autoImport } = body;

        if (!catalogUrl || !manufacturerName) {
            return NextResponse.json(
                { success: false, error: "Catalog URL and manufacturer name are required" },
                { status: 400 }
            );
        }

        // Scrape products
        const result = await scrapeManufacturerProducts(catalogUrl, manufacturerName);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // If autoImport is true, save products to database
        if (autoImport && result.products.length > 0) {
            const payload = await getPayload({ config });
            const importedProducts: Array<{ id: number; name: string }> = [];
            const errors: string[] = [];

            for (const product of result.products) {
                try {
                    // Generate slug from product name
                    const slug = product.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "");

                    // Check if product already exists
                    const existing = await payload.find({
                        collection: "products",
                        where: {
                            slug: { equals: slug },
                        },
                        limit: 1,
                    });

                    if (existing.docs.length > 0) {
                        errors.push(`Skipped "${product.name}" - already exists`);
                        continue;
                    }

                    // Create the product
                    const newProduct = await payload.create({
                        collection: "products",
                        data: {
                            name: product.name,
                            slug,
                            subtitle: product.description?.substring(0, 100) || "",
                            price: product.price || 0,
                            originalPrice: product.originalPrice,
                            productType: "new",
                            manufacturer: manufacturerId || undefined,
                            sku: product.sku || "",
                            modelNumber: product.modelNumber || "",
                            imageUrl: product.imageUrl || "",
                            inStock: true,
                            rating: 4.5,
                            reviewCount: 0,
                            featured: false,
                            specs: product.specs || [],
                            features: product.features || [],
                        },
                    });

                    importedProducts.push({
                        id: newProduct.id as number,
                        name: newProduct.name as string,
                    });
                } catch (err) {
                    errors.push(
                        `Failed to import "${product.name}": ${err instanceof Error ? err.message : "Unknown error"}`
                    );
                }
            }

            // Update manufacturer product count
            if (manufacturerId && importedProducts.length > 0) {
                try {
                    const manufacturer = await payload.findByID({
                        collection: "manufacturers",
                        id: manufacturerId,
                    });

                    await payload.update({
                        collection: "manufacturers",
                        id: manufacturerId,
                        data: {
                            productCount: ((manufacturer?.productCount as number) || 0) + importedProducts.length,
                            lastScrapedAt: new Date().toISOString(),
                        },
                    });
                } catch {
                    // Non-critical error
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

        // Just return scraped products without importing
        return NextResponse.json({
            success: true,
            products: result.products,
            count: result.products.length,
        });
    } catch (error) {
        console.error("Scraping error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred during scraping" },
            { status: 500 }
        );
    }
}

// GET endpoint to check scraping status or get manufacturer info
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const manufacturerId = searchParams.get("manufacturerId");

        if (!manufacturerId) {
            return NextResponse.json(
                { success: false, error: "Manufacturer ID is required" },
                { status: 400 }
            );
        }

        const payload = await getPayload({ config });
        const manufacturer = await payload.findByID({
            collection: "manufacturers",
            id: manufacturerId,
        });

        if (!manufacturer) {
            return NextResponse.json(
                { success: false, error: "Manufacturer not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            manufacturer: {
                id: manufacturer.id,
                name: manufacturer.name,
                catalogUrl: manufacturer.catalogUrl,
                lastScrapedAt: manufacturer.lastScrapedAt,
                productCount: manufacturer.productCount,
                scrapingEnabled: manufacturer.scrapingEnabled,
            },
        });
    } catch (error) {
        console.error("Error fetching manufacturer:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch manufacturer" },
            { status: 500 }
        );
    }
}
