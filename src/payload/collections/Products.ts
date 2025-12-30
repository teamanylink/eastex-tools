import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    labels: {
        singular: "Product",
        plural: "Products",
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "price", "productType", "badge", "inStock"],
        group: "Shop",
    },
    access: {
        read: () => true,
    },
    fields: [
        // Basic Info
        {
            type: "row",
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                    label: "Product Name",
                },
                {
                    name: "slug",
                    type: "text",
                    required: true,
                    unique: true,
                    admin: {
                        width: "50%",
                    },
                },
            ],
        },
        {
            name: "subtitle",
            type: "text",
            label: "Subtitle / Short Description",
        },
        {
            name: "description",
            type: "richText",
            label: "Full Description",
        },

        // Pricing
        {
            type: "row",
            fields: [
                {
                    name: "price",
                    type: "number",
                    required: true,
                    label: "Price ($)",
                    min: 0,
                    admin: {
                        width: "33%",
                    },
                },
                {
                    name: "originalPrice",
                    type: "number",
                    label: "Original Price ($)",
                    min: 0,
                    admin: {
                        width: "33%",
                        description: "For showing discounts",
                    },
                },
                {
                    name: "badge",
                    type: "select",
                    options: [
                        { label: "New", value: "NEW" },
                        { label: "Refurbished", value: "REFURB" },
                        { label: "Restocked", value: "RESTOCKED" },
                    ],
                    admin: {
                        width: "33%",
                    },
                },
            ],
        },

        // Classification
        {
            type: "row",
            fields: [
                {
                    name: "productType",
                    type: "select",
                    required: true,
                    options: [
                        { label: "New Equipment", value: "new" },
                        { label: "Refurbished", value: "refurbished" },
                    ],
                    defaultValue: "new",
                    admin: {
                        width: "50%",
                    },
                },
                {
                    name: "category",
                    type: "relationship",
                    relationTo: "categories",
                    hasMany: false,
                    admin: {
                        width: "50%",
                    },
                },
            ],
        },
        {
            type: "row",
            fields: [
                {
                    name: "manufacturer",
                    type: "relationship",
                    relationTo: "manufacturers",
                    hasMany: false,
                    label: "Manufacturer",
                    admin: {
                        width: "50%",
                    },
                },
                {
                    name: "sku",
                    type: "text",
                    label: "SKU / Part Number",
                    admin: {
                        width: "25%",
                    },
                },
                {
                    name: "modelNumber",
                    type: "text",
                    label: "Model Number",
                    admin: {
                        width: "25%",
                    },
                },
            ],
        },
        {
            name: "toolType",
            type: "select",
            options: [
                { label: "Drills", value: "Drills" },
                { label: "Saws", value: "Saws" },
                { label: "Sanders", value: "Sanders" },
                { label: "Grinders", value: "Grinders" },
                { label: "Accessories", value: "Accessories" },
            ],
            label: "Tool Type",
        },

        // Images
        {
            name: "images",
            type: "array",
            label: "Product Images",
            minRows: 1,
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
        {
            name: "imageUrl",
            type: "text",
            label: "External Image URL",
            admin: {
                description: "Alternative to uploading - use an external image URL",
            },
        },

        // Ratings & Stock
        {
            type: "row",
            fields: [
                {
                    name: "rating",
                    type: "number",
                    min: 0,
                    max: 5,
                    defaultValue: 4.5,
                    admin: {
                        width: "33%",
                    },
                },
                {
                    name: "reviewCount",
                    type: "number",
                    min: 0,
                    defaultValue: 0,
                    admin: {
                        width: "33%",
                    },
                },
                {
                    name: "inStock",
                    type: "checkbox",
                    defaultValue: true,
                    admin: {
                        width: "33%",
                    },
                },
            ],
        },

        // Specifications
        {
            name: "specs",
            type: "array",
            label: "Technical Specifications",
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true,
                },
                {
                    name: "value",
                    type: "text",
                    required: true,
                },
            ],
        },

        // Features
        {
            name: "features",
            type: "array",
            label: "Key Features",
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                },
            ],
        },

        // Refurbished specific
        {
            name: "condition",
            type: "select",
            options: [
                { label: "Grade A - Like New", value: "grade-a" },
                { label: "Grade B - Good", value: "grade-b" },
                { label: "Grade C - Fair", value: "grade-c" },
            ],
            admin: {
                condition: (data) => data?.productType === "refurbished",
            },
        },

        // Featured
        {
            name: "featured",
            type: "checkbox",
            defaultValue: false,
            label: "Featured Product",
            admin: {
                position: "sidebar",
                description: "Show on homepage carousel",
            },
        },
    ],
};
