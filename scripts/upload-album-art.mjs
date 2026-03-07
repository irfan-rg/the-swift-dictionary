/**
 * Upload optimized album art to Supabase Storage
 * Run: node scripts/upload-album-art.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

// Load env
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const BUCKET = "album-art";
const OPTIMIZED_DIR = "H:\\swiftcovers\\optimized";

// File → album slug mapping  
const slugMap = {
    "ts-debut": "debut",
    "speak-now": "speaknow",
};

function fileSlug(filename) {
    const base = filename.replace(/\.(webp|webm)$/, "").replace(/-anim$/, "");
    return slugMap[base] || base;
}

async function main() {
    // 1. Create bucket if it doesn't exist
    console.log(`\n📦 Ensuring bucket "${BUCKET}" exists...`);
    const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
        public: true,
        allowedMimeTypes: ["image/webp", "video/webm"],
        fileSizeLimit: 10 * 1024 * 1024, // 10MB
    });
    if (bucketErr && !bucketErr.message.includes("already exists")) {
        console.error("Bucket error:", bucketErr.message);
        process.exit(1);
    }
    console.log("✅ Bucket ready");

    // 2. Upload all files
    const files = readdirSync(OPTIMIZED_DIR);
    console.log(`\n📤 Uploading ${files.length} files...\n`);

    const results = { covers: {}, anims: {} };

    for (const file of files) {
        const filePath = join(OPTIMIZED_DIR, file);
        const fileBuffer = readFileSync(filePath);
        const contentType = file.endsWith(".webp") ? "image/webp" : "video/webm";
        const isAnim = file.includes("-anim");
        const slug = fileSlug(file);

        console.log(`  ↑ ${file} (${(fileBuffer.length / 1024).toFixed(0)} KB)...`);

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(file, fileBuffer, {
                contentType,
                upsert: true,
            });

        if (error) {
            console.error(`  ✗ Failed: ${error.message}`);
            continue;
        }

        // Get the public URL
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(file);
        const publicUrl = urlData.publicUrl;
        console.log(`  ✓ ${publicUrl}`);

        if (isAnim) {
            results.anims[slug] = publicUrl;
        } else {
            results.covers[slug] = publicUrl;
        }
    }

    // 3. Add animated_cover_url column (idempotent — will fail silently if exists)
    console.log("\n🗄️  Adding animated_cover_url column to albums table...");
    const { error: colErr } = await supabase.rpc("exec_sql", {
        query: "ALTER TABLE albums ADD COLUMN IF NOT EXISTS animated_cover_url TEXT DEFAULT NULL",
    });
    if (colErr) {
        console.log(`  ⚠️  Column might need to be added manually: ${colErr.message}`);
        console.log(`  Run this SQL in your Supabase SQL Editor:`);
        console.log(`  ALTER TABLE albums ADD COLUMN IF NOT EXISTS animated_cover_url TEXT DEFAULT NULL;`);
    } else {
        console.log("  ✓ Column added");
    }

    // 4. Update album rows with new URLs
    console.log("\n🔄 Updating album cover URLs...\n");

    for (const [slug, url] of Object.entries(results.covers)) {
        const update = { cover_url: url };
        const animUrl = results.anims[slug];
        if (animUrl) update.animated_cover_url = animUrl;

        const { error: updateErr } = await supabase
            .from("albums")
            .update(update)
            .eq("slug", slug);

        if (updateErr) {
            console.error(`  ✗ ${slug}: ${updateErr.message}`);
        } else {
            console.log(`  ✓ ${slug}: cover${animUrl ? " + animated" : ""}`);
        }
    }

    // Handle albums that only have animation (no new static cover)
    for (const [slug, url] of Object.entries(results.anims)) {
        if (!results.covers[slug]) {
            const { error: updateErr } = await supabase
                .from("albums")
                .update({ animated_cover_url: url })
                .eq("slug", slug);

            if (updateErr) {
                console.error(`  ✗ ${slug} (anim only): ${updateErr.message}`);
            } else {
                console.log(`  ✓ ${slug}: animated only`);
            }
        }
    }

    console.log("\n🎉 Done! All album art uploaded and database updated.\n");

    // Summary
    console.log("═══════════════════════════════════════");
    console.log(`  Static covers: ${Object.keys(results.covers).length}`);
    console.log(`  Animated covers: ${Object.keys(results.anims).length}`);
    console.log("═══════════════════════════════════════\n");
}

main().catch(console.error);
