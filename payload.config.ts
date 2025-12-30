import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Categories } from "./src/payload/collections/Categories";
import { Customers } from "./src/payload/collections/Customers";
import { Manufacturers } from "./src/payload/collections/Manufacturers";
import { Media } from "./src/payload/collections/Media";
import { Orders } from "./src/payload/collections/Orders";
import { Products } from "./src/payload/collections/Products";
import { Users } from "./src/payload/collections/Users";

import { Parts } from "./src/payload/collections/Parts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: " | Eastex Tool Admin",
        },
    },
    collections: [Users, Products, Categories, Manufacturers, Parts, Media, Customers, Orders],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "super-secret-key-change-me",
    typescript: {
        outputFile: path.resolve(dirname, "src/payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || "",
        },
    }),
    sharp,
});

