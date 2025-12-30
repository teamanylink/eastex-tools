
import { getPayload } from 'payload';
import config from '@payload-config';
import { PartsCatalog } from '@/components/parts/PartsCatalog';

export default async function RidgidPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const query = typeof params.q === 'string' ? params.q : '';
    const limit = 24;

    const payload = await getPayload({ config });

    const where: any = {
        manufacturer: {
            equals: 'ridgid',
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
                manufacturer: 'ridgid',
            }))}
            totalPages={parts.totalPages}
            currentPage={parts.page || 1}
            totalDocs={parts.totalDocs}
            manufacturer="ridgid"
        />
    );
}

export const metadata = {
    title: 'RIDGID Parts & Tools Catalog | Eastex Tool',
    description: 'Browse our complete catalog of RIDGID replacement parts and industrial tools. Authentic components for professional equipment.',
};
