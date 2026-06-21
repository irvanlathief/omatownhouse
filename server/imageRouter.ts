import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const IMAGES_DIR = "/home/ubuntu/oma-townhouse/optimized-images";

export const imageRouter = router({
  // Upload all optimized images to S3
  uploadGalleryImages: publicProcedure.mutation(async () => {
    const files = readdirSync(IMAGES_DIR).filter((f) => f.endsWith(".webp"));
    const results: { file: string; url: string; key: string }[] = [];

    for (const file of files) {
      const filePath = join(IMAGES_DIR, file);
      const fileBuffer = readFileSync(filePath);
      const key = `oma-townhouse/gallery/${file}`;

      try {
        const result = await storagePut(key, fileBuffer, "image/webp");
        results.push({ file, url: result.url, key: result.key });
        console.log(`✓ Uploaded ${file} → ${result.url}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error);
      }
    }

    return results;
  }),

  // Get list of gallery images (for frontend)
  getGalleryImages: publicProcedure.query(() => {
    // Return hardcoded URLs after upload - these will be populated after running uploadGalleryImages
    return [];
  }),
});
