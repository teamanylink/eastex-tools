"use client";

import Link from "next/link";
import React from "react";

export default function ProductImporterNavLink() {
    return (
        <Link
            href="/admin/product-importer"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                marginTop: "8px",
                background: "rgba(255,255,255,0.1)",
                transition: "background 0.2s",
            }}
        >
            <span style={{ fontSize: "16px" }}>🔄</span>
            <span>Product Importer</span>
        </Link>
    );
}
