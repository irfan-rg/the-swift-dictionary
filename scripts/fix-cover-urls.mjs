/**
 * Fix cover_url for all albums (re-run after column was added)
 * Run: node scripts/fix-cover-urls.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET = "album-art";

// Maps optimized file basenames to album slugs
const coverMap = {
    "1989": "1989",
    "evermore": "evermore",
    "fearless": "fearless",
    "folklore": "folklore",
    "lover": "lover",
    "midnights": "midnights",
    "red": "red",
    "reputation": "reputation",
    "showgirl": "showgirl",
    "speak-now": "speaknow",
    "ts-debut": "debut",
    "ttpd": "ttpd",
};

const animMap = {
    "1989": "1989",
    "evermore": "evermore",
    "fearless": "fearless",
    "folklore": "folklore",
    "lover": "lover",
    "midnights": "midnights",
    "red": "red",
    "reputation": "reputation",
    "showgirl": "showgirl",
    "speak-now": "speaknow",
    "ttpd": "ttpd",
};

async function main() {
    console.log("Updating cover_url...\n");
    for (const [fileBase, slug] of Object.entries(coverMap)) {
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(`${fileBase}.webp`);
        const { error } = await supabase
            .from("albums")
            .update({ cover_url: data.publicUrl })
            .eq("slug", slug);
        console.log(error ? `✗ ${slug}: ${error.message}` : `✓ ${slug} cover: ${data.publicUrl}`);
    }

    console.log("\nUpdating animated_cover_url...\n");
    for (const [fileBase, slug] of Object.entries(animMap)) {
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(`${fileBase}-anim.webm`);
        const { error } = await supabase
            .from("albums")
            .update({ animated_cover_url: data.publicUrl })
            .eq("slug", slug);
        console.log(error ? `✗ ${slug}: ${error.message}` : `✓ ${slug} anim: ${data.publicUrl}`);
    }

    console.log("\n🎉 Done!");
}

main().catch(console.error);
