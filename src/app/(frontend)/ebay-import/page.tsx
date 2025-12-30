"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EbayProduct {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    ebayUrl?: string;
    condition?: string;
    itemId?: string;
}

interface ImportResult {
    success: boolean;
    scraped?: number;
    imported?: number;
    products?: Array<{ id: number; name: string }>;
    errors?: string[];
}

export default function EbayImporterPage() {
    const [storeUrl, setStoreUrl] = useState("https://www.ebay.com/str/eastextoolllc");
    const [isLoading, setIsLoading] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [previewProducts, setPreviewProducts] = useState<EbayProduct[]>([]);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePreview = async () => {
        if (!storeUrl) {
            setError("Please enter an eBay store URL");
            return;
        }

        setIsLoading(true);
        setError(null);
        setPreviewProducts([]);
        setImportResult(null);

        try {
            const response = await fetch("/api/ebay-import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storeUrl,
                    autoImport: false,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setPreviewProducts(data.products || []);
                if (data.products?.length === 0) {
                    setError("No products found. The store page might need different parsing.");
                }
            } else {
                setError(data.error || "Failed to scrape eBay store");
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
            const response = await fetch("/api/ebay-import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storeUrl,
                    autoImport: true,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setImportResult(data);
                setPreviewProducts([]);
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
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            padding: "32px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "white",
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
                        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>
                            🛒 eBay Store Importer
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.7)" }}>
                            Import all products from your eBay store to your website.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Link
                            href="/product-importer"
                            style={{
                                padding: "10px 20px",
                                background: "rgba(255,255,255,0.1)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            General Importer
                        </Link>
                        <Link
                            href="/admin"
                            style={{
                                padding: "10px 20px",
                                background: "rgba(255,255,255,0.1)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            ← Admin Panel
                        </Link>
                    </div>
                </div>

                {/* Store URL Input */}
                <div style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "24px",
                    borderRadius: "16px",
                    marginBottom: "24px",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                        eBay Store URL
                    </h2>

                    <div style={{ display: "flex", gap: "12px" }}>
                        <input
                            type="url"
                            value={storeUrl}
                            onChange={(e) => setStoreUrl(e.target.value)}
                            placeholder="https://www.ebay.com/str/your-store-name"
                            style={{
                                flex: 1,
                                padding: "14px 18px",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "10px",
                                fontSize: "15px",
                                color: "white",
                            }}
                        />
                        <button
                            onClick={handlePreview}
                            disabled={isLoading}
                            style={{
                                padding: "14px 28px",
                                background: isLoading ? "#666" : "#00d4ff",
                                color: isLoading ? "#ccc" : "#000",
                                border: "none",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "15px",
                                cursor: isLoading ? "wait" : "pointer",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {isLoading ? "🔍 Scanning..." : "🔍 Scan Store"}
                        </button>
                    </div>

                    <p style={{
                        marginTop: "12px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                    }}>
                        Enter your eBay store URL to scan and import all products.
                    </p>
                </div>

                {/* Action Buttons */}
                {previewProducts.length > 0 && (
                    <div style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "24px",
                        padding: "16px 20px",
                        background: "rgba(0,212,255,0.1)",
                        borderRadius: "12px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <div>
                            <strong>{previewProducts.length}</strong> products found and ready to import
                        </div>
                        <button
                            onClick={handleImport}
                            disabled={isImporting}
                            style={{
                                padding: "14px 32px",
                                background: isImporting ? "#666" : "#00ff88",
                                color: "#000",
                                border: "none",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                fontSize: "16px",
                                cursor: isImporting ? "wait" : "pointer",
                            }}
                        >
                            {isImporting ? "⏳ Importing..." : `✅ Import All ${previewProducts.length} Products`}
                        </button>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div style={{
                        background: "rgba(255,100,100,0.1)",
                        border: "1px solid rgba(255,100,100,0.3)",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                        color: "#ff6b6b",
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Import Result */}
                {importResult && (
                    <div style={{
                        background: "rgba(0,255,136,0.1)",
                        border: "1px solid rgba(0,255,136,0.3)",
                        padding: "24px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                    }}>
                        <h3 style={{ color: "#00ff88", marginBottom: "16px", fontSize: "20px" }}>
                            ✅ Import Complete!
                        </h3>
                        <p style={{ marginBottom: "12px" }}>
                            Successfully imported <strong>{importResult.imported}</strong> of {importResult.scraped} products.
                        </p>
                        {importResult.errors && importResult.errors.length > 0 && (
                            <div style={{ marginTop: "16px" }}>
                                <p style={{ fontWeight: "500", color: "#ffaa00", marginBottom: "8px" }}>
                                    ⚠️ Some items were skipped:
                                </p>
                                <ul style={{
                                    margin: "0",
                                    paddingLeft: "20px",
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.7)",
                                }}>
                                    {importResult.errors.slice(0, 10).map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                    {importResult.errors.length > 10 && (
                                        <li>...and {importResult.errors.length - 10} more</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
                            <Link
                                href="/admin/collections/products"
                                style={{
                                    padding: "12px 24px",
                                    background: "#00ff88",
                                    color: "#000",
                                    textDecoration: "none",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                }}
                            >
                                View Products →
                            </Link>
                            <Link
                                href="/"
                                style={{
                                    padding: "12px 24px",
                                    background: "rgba(255,255,255,0.1)",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                }}
                            >
                                View Store
                            </Link>
                        </div>
                    </div>
                )}

                {/* Product Preview Grid */}
                {previewProducts.length > 0 && (
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        padding: "24px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
                            📦 Products Found ({previewProducts.length})
                        </h2>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: "16px",
                        }}>
                            {previewProducts.map((product, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: "12px",
                                        padding: "16px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    {product.imageUrl && (
                                        <div style={{
                                            width: "100%",
                                            height: "140px",
                                            marginBottom: "12px",
                                            background: "rgba(255,255,255,0.05)",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                        }}>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                }}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                    <h3 style={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        marginBottom: "8px",
                                        lineHeight: "1.4",
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                    }}>
                                        {product.name}
                                    </h3>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        {product.price > 0 ? (
                                            <span style={{ fontWeight: "bold", color: "#00ff88", fontSize: "16px" }}>
                                                ${product.price.toFixed(2)}
                                            </span>
                                        ) : (
                                            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                                                Price TBD
                                            </span>
                                        )}
                                        {product.ebayUrl && (
                                            <a
                                                href={product.ebayUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "#00d4ff",
                                                    fontSize: "12px",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                View on eBay →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div style={{
                        textAlign: "center",
                        padding: "64px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        <div style={{
                            fontSize: "48px",
                            marginBottom: "20px",
                            animation: "spin 1s linear infinite",
                        }}>
                            🔄
                        </div>
                        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
                            Scanning eBay store for products...
                        </p>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
                            This may take a few seconds
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && previewProducts.length === 0 && !importResult && !error && (
                    <div style={{
                        textAlign: "center",
                        padding: "64px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "16px",
                        color: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🛒</div>
                        <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                            Ready to import from eBay
                        </p>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                            Click &quot;Scan Store&quot; to find all products
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
