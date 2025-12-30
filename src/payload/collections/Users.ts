import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    labels: {
        singular: "User",
        plural: "Users",
    },
    admin: {
        useAsTitle: "email",
        defaultColumns: ["email", "role", "createdAt"],
    },
    auth: true,
    fields: [
        {
            name: "role",
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
            ],
            defaultValue: "editor",
            required: true,
        },
        {
            name: "name",
            type: "text",
            label: "Full Name",
        },
    ],
};
