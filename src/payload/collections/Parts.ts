
import { CollectionConfig } from 'payload';

export const Parts: CollectionConfig = {
    slug: 'parts',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'description',
        defaultColumns: ['catalogNumber', 'description', 'manufacturer', 'upc', 'price'],
    },
    fields: [
        // Core identifiers - used for matching scraped data
        {
            name: 'catalogNumber',
            label: 'Catalog / Part Number',
            type: 'text',
            required: true,
            index: true,
        },
        {
            name: 'upc',
            label: 'UPC Code',
            type: 'text',
            index: true,
        },
        {
            name: 'manufacturer',
            type: 'select',
            required: true,
            options: [
                { label: 'RIDGID', value: 'ridgid' },
                { label: 'Greenlee', value: 'greenlee' },
                { label: 'Victaulic', value: 'victaulic' },
            ],
            index: true,
        },

        // Product info - populated from import or scrapers
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            required: true,
        },
        {
            name: 'productName',
            label: 'Product Name',
            type: 'text',
            admin: {
                description: 'Clean formatted product name (can be set by scraper)',
            },
        },
        {
            name: 'category',
            label: 'Category',
            type: 'text',
            index: true,
            admin: {
                description: 'Product category for filtering',
            },
        },

        // Pricing
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            admin: {
                description: 'Current price in USD',
            },
        },
        {
            name: 'listPrice',
            label: 'List/MSRP Price',
            type: 'number',
            admin: {
                description: 'Manufacturer suggested retail price',
            },
        },

        // Media - populated by scrapers
        {
            name: 'imageUrl',
            label: 'Image URL',
            type: 'text',
            admin: {
                description: 'URL to product image (from scraper)',
            },
        },
        {
            name: 'images',
            label: 'Additional Images',
            type: 'array',
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'alt',
                    type: 'text',
                },
            ],
        },

        // External references for syncing
        {
            name: 'externalIds',
            label: 'External IDs',
            type: 'group',
            admin: {
                description: 'IDs from external systems for syncing',
            },
            fields: [
                {
                    name: 'ridgidId',
                    label: 'RIDGID Website ID',
                    type: 'text',
                },
                {
                    name: 'greenleeId',
                    label: 'Greenlee Website ID',
                    type: 'text',
                },
                {
                    name: 'amazonAsin',
                    label: 'Amazon ASIN',
                    type: 'text',
                },
            ],
        },

        // Scraper metadata
        {
            name: 'scraperMeta',
            label: 'Scraper Metadata',
            type: 'group',
            admin: {
                description: 'Metadata from scraping process',
                condition: (data) => !!data?.scraperMeta?.lastScrapedAt,
            },
            fields: [
                {
                    name: 'lastScrapedAt',
                    label: 'Last Scraped',
                    type: 'date',
                },
                {
                    name: 'sourceUrl',
                    label: 'Source URL',
                    type: 'text',
                },
                {
                    name: 'scrapedFrom',
                    label: 'Scraped From',
                    type: 'select',
                    options: [
                        { label: 'RIDGID Website', value: 'ridgid_website' },
                        { label: 'Greenlee Website', value: 'greenlee_website' },
                        { label: 'Amazon', value: 'amazon' },
                        { label: 'Manual Entry', value: 'manual' },
                    ],
                },
            ],
        },

        // Inventory & availability
        {
            name: 'inStock',
            label: 'In Stock',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'stockQuantity',
            label: 'Stock Quantity',
            type: 'number',
        },
    ],
};
