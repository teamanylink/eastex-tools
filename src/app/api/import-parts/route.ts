
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import path from 'path';
import * as XLSX from 'xlsx';
import fs from 'fs';

export const maxDuration = 300; // 5 minutes timeout

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload({ config });

        // Define path to the file (we renamed it earlier)
        const filePath = path.join(process.cwd(), 'public/parts_data.xlsx');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);
        // Parse the buffer
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        const results = [];
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '100000');

        for (const sheetName of workbook.SheetNames) {
            const manufacturer = sheetName.toUpperCase().includes('RIDGID') ? 'ridgid' :
                sheetName.toUpperCase().includes('GREENLEE') ? 'greenlee' : null;

            if (!manufacturer) {
                results.push({ sheet: sheetName, status: 'skipped', reason: 'Unknown Manufacturer' });
                continue;
            }

            const worksheet = workbook.Sheets[sheetName];

            // Get data as array of arrays (header: 1)
            // This avoids any key inference issues
            const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            let importedCount = 0;
            let skippedCount = 0;
            let errorCount = 0;

            // Find the header row index to skip it
            let dataStartIndex = 0;
            for (let i = 0; i < Math.min(rows.length, 20); i++) {
                const row = rows[i];
                // Check if this row looks like a header
                if (row && row.some((cell: any) => typeof cell === 'string' && (cell.toLowerCase().includes('catalog') || cell.toLowerCase().includes('part')))) {
                    dataStartIndex = i + 1; // Start data after this row
                    break;
                }
            }

            // Subset for processing
            const rowsToProcess = rows.slice(dataStartIndex, dataStartIndex + limit);
            console.log(`Processing ${rowsToProcess.length} rows for ${manufacturer} (Sheet: ${sheetName})...`);

            // Iterate through rows
            // Process in batches
            const BATCH_SIZE = 50;
            for (let i = 0; i < rowsToProcess.length; i += BATCH_SIZE) {
                const batch = rowsToProcess.slice(i, i + BATCH_SIZE);
                console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(rowsToProcess.length / BATCH_SIZE)} for ${manufacturer}...`);

                await Promise.all(batch.map(async (row) => {
                    if (!row || row.length < 2) return;

                    const catalogNumber = String(row[0] || '').trim();
                    const description = String(row[1] || '').trim();
                    const upc = row[2] ? String(row[2]).trim() : undefined;

                    if (!catalogNumber || !description || catalogNumber.toLowerCase().includes('catalog')) {
                        return;
                    }

                    try {
                        // Check existence
                        const existing = await payload.find({
                            collection: 'parts',
                            where: {
                                catalogNumber: { equals: catalogNumber },
                                manufacturer: { equals: manufacturer },
                            },
                            limit: 1,
                        });

                        if (existing.docs.length > 0) {
                            skippedCount++;
                            return;
                        }

                        await payload.create({
                            collection: 'parts',
                            data: {
                                catalogNumber,
                                description,
                                upc,
                                manufacturer: manufacturer as 'ridgid' | 'greenlee',
                            },
                        });
                        importedCount++;
                    } catch (err) {
                        errorCount++;
                        console.error(`Error importing ${catalogNumber}:`, err);
                    }
                }));
            }

            results.push({
                sheet: sheetName,
                manufacturer,
                rowsProcessed: rowsToProcess.length,
                imported: importedCount,
                skipped: skippedCount,
                errors: errorCount,
            });
        }

        return NextResponse.json({ success: true, results });

    } catch (error) {
        console.error('Import error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    }
}
