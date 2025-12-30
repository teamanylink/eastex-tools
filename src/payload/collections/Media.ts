import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    labels: {
        singular: "Media",
        plural: "Media",
    },
    access: {
        read: () => true,
    },
    upload: {
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 600,
                height: 600,
                position: "centre",
            },
            {
                name: "hero",
                width: 1200,
                height: 800,
                position: "centre",
            },
        ],
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
            label: "Alt Text",
        },
        {
            name: "caption",
            type: "text",
            label: "Caption",
        },
    ],
};
