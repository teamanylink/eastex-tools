"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Manufacturer {
    id: number;
    name: string;
    catalogUrl: string;
    lastScrapedAt: string | null;
    productCount: number;
    scrapingEnabled: boolean;
}

interface ScrapedProduct {
    name: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    sku?: string;
    modelNumber?: string;
    imageUrl?: string;
}

interface ImportResult {
    success: boolean;
    scraped?: number;
    imported?: number;
    products?: Array<{ id: number; name: string }>;
    errors?: string[];
    count?: number;
}

export default function ProductImporterPage() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);
    const [customUrl, setCustomUrl] = useState("");
    const [manufacturerName, setManufacturerName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [previewProducts, setPreviewProducts] = useState<ScrapedProduct[]>([]);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch manufacturers on mount
    useEffect(() => {
        fetchManufacturers();
    }, []);

    const fetchManufacturers = async () => {
        try {
            const response = await fetch("/api/manufacturers");
            const data = await response.json();
            if (data.docs) {
                setManufacturers(data.docs);
            }
        } catch (err) {
            console.error("Failed to fetch manufacturers:", err);
        }
    };

    const handlePreview = async () => {
        if (!selectedManufacturer && !customUrl) {
            setError("Please select a manufacturer or enter a custom URL");
            return;
        }

        setIsLoading(true);
        setError(null);
        setPreviewProducts([]);
        setImportResult(null);

        try {
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    manufacturerId: selectedManufacturer?.id,
                    catalogUrl: customUrl || selectedManufacturer?.catalogUrl,
                    manufacturerName: manufacturerName || selectedManufacturer?.name || "Unknown",
                    autoImport: false,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setPreviewProducts(data.products || []);
            } else {
                setError(data.error || "Failed to scrape products");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Scraping failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImport = async () => {
        if (previewProducts.length === 0) {
            setError("No products to import. Run a preview first.");
            return;
        }

        setIsImporting(true);
        setError(null);

        try {
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    manufacturerId: selectedManufacturer?.id,
                    catalogUrl: customUrl || selectedManufacturer?.catalogUrl,
                    manufacturerName: manufacturerName || selectedManufacturer?.name || "Unknown",
                    autoImport: true,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setImportResult(data);
                setPreviewProducts([]);
                fetchManufacturers(); // Refresh manufacturer counts
            } else {
                setError(data.error || "Failed to import products");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Import failed");
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8f9fa",
            padding: "32px",
            fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "32px",
                }}>
                    <div>
                        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", color: "#1a1a1a" }}>
                            🔄 Product Importer
                        </h1>
                        <p style={{ color: "#666" }}>
                            Scrape and import products from manufacturer websites with one click.
                        </p>
                    </div>
                    <Link
                        href="/admin"
                        style={{
                            padding: "10px 20px",
                            background: "#333",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    >
                        ← Back to Admin
                    </Link>
                </div>

                {/* Manufacturer Selection */}
                <div style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1a1a1a" }}>
                        Select Manufacturer
                    </h2>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
                        {manufacturers.length === 0 ? (
                            <p style={{ color: "#666", fontStyle: "italic" }}>
                                No manufacturers yet. <Link href="/admin/collections/manufacturers/create" style={{ color: "#0066cc" }}>Create one</Link> first.
                            </p>
                        ) : (
                            manufacturers.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setSelectedManufacturer(m);
                                        setCustomUrl(m.catalogUrl || "");
                                        setManufacturerName(m.name);
                                    }}
                                    style={{
                                        padding: "12px 20px",
                                        border: selectedManufacturer?.id === m.id ? "2px solid #0066cc" : "1px solid #ddd",
                                        borderRadius: "8px",
                                        background: selectedManufacturer?.id === m.id ? "#e6f0ff" : "white",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <div style={{ fontWeight: "600", color: "#1a1a1a" }}>{m.name}</div>
                                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                                        {m.productCount || 0} products
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                                Manufacturer Name
                            </label>
                            <input
                                type="text"
                                value={manufacturerName}
                                onChange={(e) => setManufacturerName(e.target.value)}
                                placeholder="e.g., RIDGID, DeWalt, Milwaukee"
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>
                                Catalog URL
                            </label>
                            <input
                                type="url"
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                placeholder="https://manufacturer.com/products"
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                    <button
                        onClick={handlePreview}
                        disabled={isLoading || (!selectedManufacturer && !customUrl)}
                        style={{
                            padding: "14px 28px",
                            background: isLoading ? "#999" : "#0066cc",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "15px",
                            cursor: isLoading ? "wait" : "pointer",
                            opacity: (!selectedManufacturer && !customUrl) ? 0.5 : 1,
                        }}
                    >
                        {isLoading ? "🔍 Scraping..." : "🔍 Preview Products"}
                    </button>

                    <button
                        onClick={handleImport}
                        disabled={isImporting || previewProducts.length === 0}
                        style={{
                            padding: "14px 28px",
                            background: previewProducts.length > 0 ? "#28a745" : "#ccc",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "15px",
                            cursor: previewProducts.length > 0 ? "pointer" : "not-allowed",
                        }}
                    >
                        {isImporting ? "⏳ Importing..." : `✅ Import ${previewProducts.length} Products`}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div style={{
                        background: "#fee",
                        border: "1px solid #fcc",
                        padding: "16px 20px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                        color: "#c00",
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Import Result */}
                {importResult && (
                    <div style={{
                        background: "#efe",
                        border: "1px solid #cfc",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                    }}>
                        <h3 style={{ color: "#060", marginBottom: "12px", fontSize: "18px" }}>
                            ✅ Import Complete!
                        </h3>
                        <p style={{ color: "#040" }}>
                            Successfully imported <strong>{importResult.imported}</strong> of {importResult.scraped} products.
                        </p>
                        {importResult.errors && importResult.errors.length > 0 && (
                            <div style={{ marginTop: "16px" }}>
                                <p style={{ fontWeight: "500", color: "#860" }}>Warnings:</p>
                                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                                    {importResult.errors.map((err, i) => (
                                        <li key={i} style={{ color: "#860", fontSize: "13px" }}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Link
                            href="/admin/collections/products"
                            style={{
                                display: "inline-block",
                                marginTop: "12px",
                                color: "#060",
                                fontWeight: "500",
                            }}
                        >
                            View Products →
                        </Link>
                    </div>
                )}

                {/* Product Preview */}
                {previewProducts.length > 0 && (
                    <div style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}>
                        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#1a1a1a" }}>
                            📦 Preview ({previewProducts.length} products found)
                        </h2>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "16px",
                        }}>
                            {previewProducts.map((product, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #eee",
                                        borderRadius: "10px",
                                        padding: "16px",
                                        background: "#fafafa",
                                    }}
                                >
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "150px",
                                                objectFit: "contain",
                                                marginBottom: "12px",
                                                background: "white",
                                                borderRadius: "6px",
                                            }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    )}
                                    <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#1a1a1a" }}>
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
                                            {product.description.substring(0, 100)}...
                                        </p>
                                    )}
                                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                        {product.price && (
                                            <span style={{ fontWeight: "bold", color: "#28a745", fontSize: "16px" }}>
                                                ${product.price.toFixed(2)}
                                            </span>
                                        )}
                                        {product.originalPrice && (
                                            <span style={{
                                                textDecoration: "line-through",
                                                color: "#999",
                                                fontSize: "13px",
                                            }}>
                                                ${product.originalPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
                                        {product.sku && <span>SKU: {product.sku}</span>}
                                        {product.modelNumber && <span> | Model: {product.modelNumber}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && previewProducts.length === 0 && !importResult && (
                    <div style={{
                        textAlign: "center",
                        padding: "64px",
                        background: "white",
                        borderRadius: "12px",
                        color: "#666",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}>
                        <div style={{ fontSize: "64px", marginBottom: "20px" }}>📦</div>
                        <p style={{ fontSize: "16px" }}>
                            Select a manufacturer or enter a catalog URL, then click &quot;Preview Products&quot; to get started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
