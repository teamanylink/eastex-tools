import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    labels: {
        singular: "Category",
        plural: "Categories",
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "updatedAt"],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Category Name",
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "description",
            type: "textarea",
            label: "Description",
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            label: "Category Image",
        },
    ],
};
