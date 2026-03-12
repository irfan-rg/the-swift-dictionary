/**
 * Populate animated_cover_url for all albums
 * Run: node scripts/update-animated-urls.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET = "album-art";

const slugMap = {
    "ts-debut": "debut",
    "speak-now": "speaknow",
};

const animFiles = [
    "1989-anim.webm",
    "evermore-anim.webm",
    "fearless-anim.webm",
    "folklore-anim.webm",
    "lover-anim.webm",
    "midnights-anim.webm",
    "red-anim.webm",
    "reputation-anim.webm",
    "showgirl-anim.webm",
    "speak-now-anim.webm",
    "ttpd-anim.webm",
];

async function main() {
    for (const file of animFiles) {
        const base = file.replace(/-anim\.webm$/, "");
        const slug = slugMap[base] || base;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(file);

        const { error } = await supabase
            .from("albums")
            .update({ animated_cover_url: urlData.publicUrl })
            .eq("slug", slug);

        if (error) {
            console.error(`✗ ${slug}: ${error.message}`);
        } else {
            console.log(`✓ ${slug}: ${urlData.publicUrl}`);
        }
    }
    console.log("\n🎉 All animated URLs populated!");
}

main().catch(console.error);
