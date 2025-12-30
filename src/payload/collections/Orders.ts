import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: "orders",
    labels: {
        singular: "Order",
        plural: "Orders",
    },
    admin: {
        useAsTitle: "orderNumber",
        defaultColumns: ["orderNumber", "customer", "status", "total", "createdAt"],
        group: "Shop",
        description: "Customer orders and transactions",
    },
    fields: [
        {
            name: "orderNumber",
            type: "text",
            label: "Order Number",
            required: true,
            unique: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: "customer",
            type: "relationship",
            relationTo: "customers",
            label: "Customer",
            hasMany: false,
        },
        {
            name: "status",
            type: "select",
            label: "Order Status",
            required: true,
            defaultValue: "pending",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Refunded", value: "refunded" },
            ],
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "paymentStatus",
            type: "select",
            label: "Payment Status",
            required: true,
            defaultValue: "pending",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Paid", value: "paid" },
                { label: "Failed", value: "failed" },
                { label: "Refunded", value: "refunded" },
            ],
            admin: {
                position: "sidebar",
            },
        },
        {
            type: "tabs",
            tabs: [
                {
                    label: "Items",
                    fields: [
                        {
                            name: "items",
                            type: "array",
                            label: "Order Items",
                            required: true,
                            minRows: 1,
                            fields: [
                                {
                                    name: "product",
                                    type: "relationship",
                                    relationTo: "products",
                                    label: "Product",
                                },
                                {
                                    name: "productName",
                                    type: "text",
                                    label: "Product Name",
                                    required: true,
                                    admin: {
                                        description: "Snapshot of product name at time of order",
                                    },
                                },
                                {
                                    name: "sku",
                                    type: "text",
                                    label: "SKU",
                                },
                                {
                                    type: "row",
                                    fields: [
                                        {
                                            name: "quantity",
                                            type: "number",
                                            label: "Quantity",
                                            required: true,
                                            min: 1,
                                            admin: { width: "33%" },
                                        },
                                        {
                                            name: "unitPrice",
                                            type: "number",
                                            label: "Unit Price ($)",
                                            required: true,
                                            admin: { width: "33%" },
                                        },
                                        {
                                            name: "lineTotal",
                                            type: "number",
                                            label: "Line Total ($)",
                                            admin: {
                                                readOnly: true,
                                                width: "33%",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Shipping",
                    fields: [
                        {
                            name: "shippingMethod",
                            type: "text",
                            label: "Shipping Method",
                        },
                        {
                            name: "trackingNumber",
                            type: "text",
                            label: "Tracking Number",
                        },
                        {
                            name: "trackingUrl",
                            type: "text",
                            label: "Tracking URL",
                        },
                        {
                            name: "shippingAddress",
                            type: "group",
                            label: "Shipping Address",
                            fields: [
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
                                            admin: { width: "40%" },
                                        },
                                        {
                                            name: "state",
                                            type: "text",
                                            label: "State",
                                            admin: { width: "30%" },
                                        },
                                        {
                                            name: "zip",
                                            type: "text",
                                            label: "ZIP Code",
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
                    label: "Billing",
                    fields: [
                        {
                            name: "billingAddress",
                            type: "group",
                            label: "Billing Address",
                            fields: [
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
                                            admin: { width: "40%" },
                                        },
                                        {
                                            name: "state",
                                            type: "text",
                                            label: "State",
                                            admin: { width: "30%" },
                                        },
                                        {
                                            name: "zip",
                                            type: "text",
                                            label: "ZIP Code",
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
                            ],
                        },
                    ],
                },
                {
                    label: "Payment",
                    fields: [
                        {
                            name: "transactionId",
                            type: "text",
                            label: "Transaction ID",
                            admin: {
                                description: "Authorize.net transaction ID",
                            },
                        },
                        {
                            name: "authCode",
                            type: "text",
                            label: "Authorization Code",
                        },
                        {
                            name: "paymentMethod",
                            type: "text",
                            label: "Payment Method",
                            defaultValue: "Credit Card",
                        },
                        {
                            name: "cardLast4",
                            type: "text",
                            label: "Card Last 4 Digits",
                            maxLength: 4,
                        },
                        {
                            name: "cardBrand",
                            type: "select",
                            label: "Card Brand",
                            options: [
                                { label: "Visa", value: "visa" },
                                { label: "Mastercard", value: "mastercard" },
                                { label: "American Express", value: "amex" },
                                { label: "Discover", value: "discover" },
                                { label: "Other", value: "other" },
                            ],
                        },
                    ],
                },
                {
                    label: "Notes",
                    fields: [
                        {
                            name: "customerNotes",
                            type: "textarea",
                            label: "Customer Notes",
                            admin: {
                                description: "Notes or special instructions from the customer",
                            },
                        },
                        {
                            name: "internalNotes",
                            type: "textarea",
                            label: "Internal Notes",
                            admin: {
                                description: "Private notes for staff (not visible to customer)",
                            },
                        },
                    ],
                },
            ],
        },
        // Order Totals
        {
            name: "subtotal",
            type: "number",
            label: "Subtotal ($)",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "shippingCost",
            type: "number",
            label: "Shipping ($)",
            defaultValue: 0,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "tax",
            type: "number",
            label: "Tax ($)",
            defaultValue: 0,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "discount",
            type: "number",
            label: "Discount ($)",
            defaultValue: 0,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "total",
            type: "number",
            label: "Total ($)",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        // Customer email for quick reference (denormalized)
        {
            name: "customerEmail",
            type: "email",
            label: "Customer Email",
            admin: {
                position: "sidebar",
                readOnly: true,
            },
        },
    ],
    timestamps: true,
    hooks: {
        beforeChange: [
            ({ data }) => {
                // Generate order number if not present
                if (!data?.orderNumber) {
                    const timestamp = Date.now().toString(36).toUpperCase();
                    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
                    data.orderNumber = `ET-${timestamp}-${random}`;
                }

                // Calculate line totals
                if (data?.items) {
                    data.items = data.items.map((item: { quantity?: number; unitPrice?: number; lineTotal?: number }) => ({
                        ...item,
                        lineTotal: (item.quantity || 0) * (item.unitPrice || 0),
                    }));
                }

                return data;
            },
        ],
    },
};
