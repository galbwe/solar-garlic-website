#!/usr/bin/env node
/**
 * Image optimization script using Sharp
 * Converts JPG/PNG images to WebP and AVIF formats
 * Preserves originals as fallbacks
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const publicDir = path.join(__dirname, "../public");

async function optimizeImages() {
  try {
    console.log("🖼️  Optimizing images with Sharp...\n");

    // Find all JPG and PNG files
    const imageFiles = glob.sync(`${publicDir}/**/*.{jpg,png}`, {
      ignore: `${publicDir}/**/*.{webp,avif}`,
    });

    console.log(`Found ${imageFiles.length} images to convert\n`);

    let processedCount = 0;

    for (const imagePath of imageFiles) {
      const fileName = path.basename(imagePath);
      const dirName = path.dirname(imagePath);
      const nameWithoutExt = path.parse(imagePath).name;

      try {
        // Convert to WebP
        const webpPath = path.join(dirName, `${nameWithoutExt}.webp`);
        await sharp(imagePath)
          .resize(4000, 4000, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(webpPath);

        // Convert to AVIF
        const avifPath = path.join(dirName, `${nameWithoutExt}.avif`);
        await sharp(imagePath)
          .resize(4000, 4000, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .avif({ quality: 75 })
          .toFile(avifPath);

        processedCount++;
        console.log(`✅ ${fileName}`);
      } catch (error) {
        console.error(`❌ Failed to process ${fileName}: ${error.message}`);
      }
    }

    // Summary
    console.log(`\n📊 Conversion Summary:`);
    const files = fs.readdirSync(publicDir);
    const jpgs = files.filter((f) => f.endsWith(".jpg")).length;
    const webps = files.filter((f) => f.endsWith(".webp")).length;
    const avifs = files.filter((f) => f.endsWith(".avif")).length;
    const pngs = files.filter((f) => f.endsWith(".png")).length;

    console.log(`  JPG/PNG originals: ${jpgs + pngs}`);
    console.log(`  WebP variants: ${webps}`);
    console.log(`  AVIF variants: ${avifs}`);
    console.log(`  Processed: ${processedCount} images`);
    console.log("\n✨ Image optimization complete!");
  } catch (error) {
    console.error("❌ Error optimizing images:", error.message);
    process.exit(1);
  }
}

optimizeImages();
