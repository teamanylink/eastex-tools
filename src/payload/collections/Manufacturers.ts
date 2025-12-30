import type { CollectionConfig } from "payload";

export const Manufacturers: CollectionConfig = {
    slug: "manufacturers",
    labels: {
        singular: "Manufacturer",
        plural: "Manufacturers",
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "productCount", "createdAt"],
        group: "Shop",
        description: "Tool manufacturers and brands",
    },
    fields: [
        {
            name: "name",
            type: "text",
            label: "Manufacturer Name",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            label: "URL Slug",
            required: true,
            unique: true,
            admin: {
                description: "Used in URLs (e.g., 'ridgid', 'greenlee', 'dewalt')",
            },
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            label: "Logo",
        },
        {
            name: "description",
            type: "richText",
            label: "Description",
        },
        {
            name: "website",
            type: "text",
            label: "Official Website",
            admin: {
                placeholder: "https://www.manufacturer.com",
            },
        },
        {
            name: "catalogUrl",
            type: "text",
            label: "Product Catalog URL",
            admin: {
                description: "URL to scrape products from",
                placeholder: "https://www.manufacturer.com/products",
            },
        },
        {
            type: "tabs",
            tabs: [
                {
                    label: "Scraping Settings",
                    fields: [
                        {
                            name: "scrapingEnabled",
                            type: "checkbox",
                            label: "Enable Automatic Scraping",
                            defaultValue: false,
                        },
                        {
                            name: "lastScrapedAt",
                            type: "date",
                            label: "Last Scraped",
                            admin: {
                                readOnly: true,
                                date: {
                                    displayFormat: "MMM d, yyyy h:mm a",
                                },
                            },
                        },
                        {
                            name: "scrapingConfig",
                            type: "group",
                            label: "Scraping Configuration",
                            fields: [
                                {
                                    name: "productSelector",
                                    type: "text",
                                    label: "Product Container Selector",
                                    admin: {
                                        placeholder: ".product-card, .product-item",
                                    },
                                },
                                {
                                    name: "nameSelector",
                                    type: "text",
                                    label: "Product Name Selector",
                                    admin: {
                                        placeholder: ".product-title, h2.name",
                                    },
                                },
                                {
                                    name: "priceSelector",
                                    type: "text",
                                    label: "Price Selector",
                                    admin: {
                                        placeholder: ".price, .product-price",
                                    },
                                },
                                {
                                    name: "imageSelector",
                                    type: "text",
                                    label: "Image Selector",
                                    admin: {
                                        placeholder: "img.product-image, .product-photo img",
                                    },
                                },
                                {
                                    name: "descriptionSelector",
                                    type: "text",
                                    label: "Description Selector",
                                    admin: {
                                        placeholder: ".product-description, .desc",
                                    },
                                },
                                {
                                    name: "skuSelector",
                                    type: "text",
                                    label: "SKU Selector",
                                    admin: {
                                        placeholder: ".sku, .product-sku",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Contact Info",
                    fields: [
                        {
                            name: "contactEmail",
                            type: "email",
                            label: "Contact Email",
                        },
                        {
                            name: "contactPhone",
                            type: "text",
                            label: "Contact Phone",
                        },
                        {
                            name: "address",
                            type: "textarea",
                            label: "Address",
                        },
                    ],
                },
            ],
        },
        {
            name: "productCount",
            type: "number",
            label: "Product Count",
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: "sidebar",
            },
        },
        {
            name: "featured",
            type: "checkbox",
            label: "Featured Manufacturer",
            defaultValue: false,
            admin: {
                position: "sidebar",
            },
        },
    ],
    timestamps: true,
};
