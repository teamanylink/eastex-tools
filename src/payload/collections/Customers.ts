import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: "customers",
    labels: {
        singular: "Customer",
        plural: "Customers",
    },
    admin: {
        useAsTitle: "email",
        defaultColumns: ["email", "firstName", "lastName", "totalOrders", "createdAt"],
        group: "Shop",
        description: "Customer accounts and contact information",
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "firstName",
                    type: "text",
                    label: "First Name",
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
                {
                    name: "lastName",
                    type: "text",
                    label: "Last Name",
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
            ],
        },
        {
            name: "email",
            type: "email",
            label: "Email Address",
            required: true,
            unique: true,
        },
        {
            name: "phone",
            type: "text",
            label: "Phone Number",
        },
        {
            type: "tabs",
            tabs: [
                {
                    label: "Addresses",
                    fields: [
                        {
                            name: "shippingAddresses",
                            type: "array",
                            label: "Shipping Addresses",
                            labels: {
                                singular: "Address",
                                plural: "Addresses",
                            },
                            fields: [
                                {
                                    name: "label",
                                    type: "text",
                                    label: "Address Label",
                                    admin: {
                                        placeholder: "e.g., Home, Office, Warehouse",
                                    },
                                },
                                {
                                    name: "isDefault",
                                    type: "checkbox",
                                    label: "Default Address",
                                    defaultValue: false,
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            name: "firstName",
                                            type: "text",
                                            label: "First Name",
                                            admin: { width: "50%" },
                                        },
                                        {
                                            name: "lastName",
                                            type: "text",
                                            label: "Last Name",
                                            admin: { width: "50%" },
                                        },
                                    ],
                                },
                                {
                                    name: "company",
                                    type: "text",
                                    label: "Company",
                                },
                                {
                                    name: "address1",
                                    type: "text",
                                    label: "Address Line 1",
                                    required: true,
                                },
                                {
                                    name: "address2",
                                    type: "text",
                                    label: "Address Line 2",
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            name: "city",
                                            type: "text",
                                            label: "City",
                                            required: true,
                                            admin: { width: "40%" },
                                        },
                                        {
                                            name: "state",
                                            type: "text",
                                            label: "State",
                                            required: true,
                                            admin: { width: "30%" },
                                        },
                                        {
                                            name: "zip",
                                            type: "text",
                                            label: "ZIP Code",
                                            required: true,
                                            admin: { width: "30%" },
                                        },
                                    ],
                                },
                                {
                                    name: "country",
                                    type: "text",
                                    label: "Country",
                                    defaultValue: "US",
                                },
                                {
                                    name: "phone",
                                    type: "text",
                                    label: "Phone",
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Notes",
                    fields: [
                        {
                            name: "notes",
                            type: "textarea",
                            label: "Internal Notes",
                            admin: {
                                description: "Private notes about this customer (not visible to customer)",
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: "totalOrders",
            type: "number",
            label: "Total Orders",
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: "sidebar",
            },
        },
        {
            name: "totalSpent",
            type: "number",
            label: "Total Spent ($)",
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: "sidebar",
            },
        },
        {
            name: "tags",
            type: "array",
            label: "Customer Tags",
            admin: {
                position: "sidebar",
            },
            fields: [
                {
                    name: "tag",
                    type: "text",
                },
            ],
        },
    ],
    timestamps: true,
};
