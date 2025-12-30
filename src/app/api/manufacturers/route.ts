import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
    try {
        const payload = await getPayload({ config });

        const manufacturers = await payload.find({
            collection: "manufacturers",
            limit: 100,
            sort: "name",
        });

        return NextResponse.json({
            success: true,
            docs: manufacturers.docs.map((m) => ({
                id: m.id,
                name: m.name,
                slug: m.slug,
                catalogUrl: m.catalogUrl,
                lastScrapedAt: m.lastScrapedAt,
                productCount: m.productCount,
                scrapingEnabled: m.scrapingEnabled,
                website: m.website,
            })),
            totalDocs: manufacturers.totalDocs,
        });
    } catch (error) {
        console.error("Error fetching manufacturers:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch manufacturers" },
            { status: 500 }
        );
    }
}
