
import { getPayload } from 'payload';
import config from '@payload-config';
import { PartsCatalog } from '@/components/parts/PartsCatalog';
import { Where } from 'payload';

export default async function GreenleePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const query = typeof params.q === 'string' ? params.q : '';
    const limit = 24;

    const payload = await getPayload({ config });

    const where: Where = {
        manufacturer: {
            equals: 'greenlee',
        },
    };

    if (query) {
        where.or = [
            {
                description: {
                    contains: query,
                },
            },
            {
                catalogNumber: {
                    contains: query,
                },
            },
        ];
    }

    const parts = await payload.find({
        collection: 'parts',
        where,
        page,
        limit,
        sort: 'catalogNumber',
    });

    return (
        <PartsCatalog
            initialParts={parts.docs.map(doc => ({
                id: String(doc.id),
                catalogNumber: doc.catalogNumber,
                description: doc.description,
                upc: doc.upc || undefined,
                manufacturer: 'greenlee',
            }))}
            totalPages={parts.totalPages}
            currentPage={parts.page || 1}
            totalDocs={parts.totalDocs}
            manufacturer="greenlee"
        />
    );
}

export const metadata = {
    title: 'Greenlee Parts & Tools Catalog | Eastex Tool',
    description: 'Explore our inventory of Greenlee parts and tools. Find authentic replacement components for your Greenlee equipment.',
};
