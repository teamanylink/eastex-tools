"use client";

import React, { useState, useEffect } from "react";

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

export default function ProductImporter() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);
    const [customUrl, setCustomUrl] = useState("");
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
                    manufacturerName: selectedManufacturer?.name || "Unknown",
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
                    manufacturerName: selectedManufacturer?.name || "Unknown",
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
        <div style={{ padding: "24px", maxWidth: "1200px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>
                🔄 Product Importer
            </h1>

            <p style={{ color: "#666", marginBottom: "24px" }}>
                Scrape and import products from manufacturer websites with one click.
            </p>

            {/* Manufacturer Selection */}
            <div style={{
                background: "#f5f5f5",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "24px"
            }}>
                <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
                    Select Manufacturer
                </h2>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {manufacturers.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setSelectedManufacturer(m);
                                setCustomUrl(m.catalogUrl || "");
                            }}
                            style={{
                                padding: "10px 16px",
                                border: selectedManufacturer?.id === m.id ? "2px solid #0066cc" : "1px solid #ddd",
                                borderRadius: "6px",
                                background: selectedManufacturer?.id === m.id ? "#e6f0ff" : "white",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            <div style={{ fontWeight: "500" }}>{m.name}</div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                                {m.productCount || 0} products
                            </div>
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                        Catalog URL
                    </label>
                    <input
                        type="url"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="https://manufacturer.com/products"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                <button
                    onClick={handlePreview}
                    disabled={isLoading || (!selectedManufacturer && !customUrl)}
                    style={{
                        padding: "12px 24px",
                        background: "#0066cc",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: isLoading ? "wait" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                    }}
                >
                    {isLoading ? "🔍 Scraping..." : "🔍 Preview Products"}
                </button>

                <button
                    onClick={handleImport}
                    disabled={isImporting || previewProducts.length === 0}
                    style={{
                        padding: "12px 24px",
                        background: previewProducts.length > 0 ? "#28a745" : "#ccc",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: previewProducts.length > 0 ? "pointer" : "not-allowed",
                        opacity: isImporting ? 0.7 : 1,
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
                    padding: "12px 16px",
                    borderRadius: "6px",
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
                    padding: "16px",
                    borderRadius: "6px",
                    marginBottom: "24px",
                }}>
                    <h3 style={{ color: "#060", marginBottom: "8px" }}>
                        ✅ Import Complete!
                    </h3>
                    <p>
                        Successfully imported {importResult.imported} of {importResult.scraped} products.
                    </p>
                    {importResult.errors && importResult.errors.length > 0 && (
                        <div style={{ marginTop: "12px" }}>
                            <p style={{ fontWeight: "500", color: "#860" }}>Warnings:</p>
                            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                                {importResult.errors.map((err, i) => (
                                    <li key={i} style={{ color: "#860", fontSize: "13px" }}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Product Preview */}
            {previewProducts.length > 0 && (
                <div>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
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
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    background: "white",
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
                                            background: "#f9f9f9",
                                            borderRadius: "4px",
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                )}
                                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                                        {product.description.substring(0, 100)}...
                                    </p>
                                )}
                                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                    {product.price && (
                                        <span style={{ fontWeight: "bold", color: "#28a745" }}>
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
                                <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
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
                    padding: "48px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    color: "#666",
                }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
                    <p>Select a manufacturer and click &quot;Preview Products&quot; to get started.</p>
                </div>
            )}
        </div>
    );
}
