// Firecrawl API integration for product scraping

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || "";
const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v2";

interface ScrapeOptions {
    formats?: string[];
    includeTags?: string[];
    excludeTags?: string[];
    waitFor?: number;
}

interface ScrapeResult {
    success: boolean;
    data?: {
        markdown?: string;
        html?: string;
        metadata?: {
            title?: string;
            description?: string;
            [key: string]: unknown;
        };
    };
    error?: string;
}

interface CrawlResult {
    success: boolean;
    id?: string;
    data?: Array<{
        url: string;
        markdown?: string;
        html?: string;
        metadata?: {
            title?: string;
            [key: string]: unknown;
        };
    }>;
    error?: string;
}

interface ExtractedProduct {
    name: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    sku?: string;
    modelNumber?: string;
    imageUrl?: string;
    specs?: Array<{ label: string; value: string }>;
    features?: Array<{ title: string; description?: string }>;
}

/**
 * Scrape a single URL using Firecrawl
 */
export async function scrapeUrl(url: string, options?: ScrapeOptions): Promise<ScrapeResult> {
    try {
        const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
                formats: options?.formats || ["markdown", "html"],
                includeTags: options?.includeTags,
                excludeTags: options?.excludeTags,
                waitFor: options?.waitFor || 1000,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `HTTP ${response.status}`,
            };
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

/**
 * Crawl multiple pages from a starting URL
 */
export async function crawlUrl(
    url: string,
    options?: {
        limit?: number;
        maxDepth?: number;
        includePaths?: string[];
        excludePaths?: string[];
    }
): Promise<CrawlResult> {
    try {
        // Start crawl job
        const response = await fetch(`${FIRECRAWL_API_URL}/crawl`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
                limit: options?.limit || 50,
                maxDepth: options?.maxDepth || 3,
                includePaths: options?.includePaths,
                excludePaths: options?.excludePaths,
                scrapeOptions: {
                    formats: ["markdown"],
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `HTTP ${response.status}`,
            };
        }

        return {
            success: true,
            id: data.id,
            data: data.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

/**
 * Extract products from scraped markdown content using AI
 */
export async function extractProductsFromMarkdown(
    markdown: string,
    manufacturerName: string
): Promise<ExtractedProduct[]> {
    // For now, use regex-based extraction. Can be enhanced with AI later.
    const products: ExtractedProduct[] = [];

    // Look for common product patterns in markdown
    // This is a basic implementation - can be enhanced with LLM extraction

    // Pattern: ## Product Name followed by price and description
    const productBlocks = markdown.split(/(?=^#{1,3}\s+)/m);

    for (const block of productBlocks) {
        const nameMatch = block.match(/^#{1,3}\s+(.+)/m);
        if (!nameMatch) continue;

        const name = nameMatch[1].trim();

        // Skip non-product headers
        if (name.toLowerCase().includes('menu') ||
            name.toLowerCase().includes('navigation') ||
            name.toLowerCase().includes('footer') ||
            name.length < 3) {
            continue;
        }

        // Extract price (look for $XXX.XX patterns)
        const priceMatch = block.match(/\$[\d,]+\.?\d*/);
        const price = priceMatch ?
            parseFloat(priceMatch[0].replace(/[$,]/g, '')) : undefined;

        // Extract original/MSRP price
        const originalPriceMatch = block.match(/(?:MSRP|Was|Original).*?\$[\d,]+\.?\d*/i);
        const originalPrice = originalPriceMatch ?
            parseFloat(originalPriceMatch[0].match(/\$[\d,]+\.?\d*/)?.[0].replace(/[$,]/g, '') || '0') : undefined;

        // Extract SKU/Model patterns
        const skuMatch = block.match(/(?:SKU|Part\s*#?|Item\s*#?)[\s:]*([A-Z0-9-]+)/i);
        const sku = skuMatch ? skuMatch[1] : undefined;

        const modelMatch = block.match(/(?:Model|Model\s*#?)[\s:]*([A-Z0-9-]+)/i);
        const modelNumber = modelMatch ? modelMatch[1] : undefined;

        // Extract image URL
        const imageMatch = block.match(/!\[.*?\]\((.+?)\)/);
        const imageUrl = imageMatch ? imageMatch[1] : undefined;

        // Extract description (first paragraph after header)
        const descMatch = block.match(/^#{1,3}\s+.+\n+(.+)/m);
        const description = descMatch ? descMatch[1].trim() : undefined;

        if (name && (price || sku || modelNumber)) {
            products.push({
                name: `${manufacturerName} ${name}`,
                description,
                price,
                originalPrice,
                sku,
                modelNumber,
                imageUrl,
            });
        }
    }

    return products;
}

/**
 * Scrape products from a manufacturer's catalog URL
 */
export async function scrapeManufacturerProducts(
    catalogUrl: string,
    manufacturerName: string,
    options?: ScrapeOptions
): Promise<{ success: boolean; products: ExtractedProduct[]; error?: string }> {
    const scrapeResult = await scrapeUrl(catalogUrl, options);

    if (!scrapeResult.success || !scrapeResult.data?.markdown) {
        return {
            success: false,
            products: [],
            error: scrapeResult.error || "No content returned",
        };
    }

    const products = await extractProductsFromMarkdown(
        scrapeResult.data.markdown,
        manufacturerName
    );

    return {
        success: true,
        products,
    };
}

export type { ScrapeResult, CrawlResult, ExtractedProduct, ScrapeOptions };
