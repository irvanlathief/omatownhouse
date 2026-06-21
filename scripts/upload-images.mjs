/**
 * Upload optimized images to S3 storage
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!FORGE_API_URL || !FORGE_API_KEY) {
  console.error('Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY');
  process.exit(1);
}

const IMAGES_DIR = '/home/ubuntu/oma-townhouse/optimized-images';

async function uploadFile(filePath, key) {
  const fileBuffer = readFileSync(filePath);
  const base64Content = fileBuffer.toString('base64');
  
  const response = await fetch(`${FORGE_API_URL}/storage/put`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FORGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: key,
      content: base64Content,
      contentType: 'image/webp',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${text}`);
  }

  const result = await response.json();
  return result;
}

async function main() {
  const files = readdirSync(IMAGES_DIR).filter(f => f.endsWith('.webp'));
  
  console.log(`Found ${files.length} images to upload...`);
  
  const results = [];
  
  for (const file of files) {
    const filePath = join(IMAGES_DIR, file);
    const key = `oma-townhouse/gallery/${file}`;
    
    try {
      const result = await uploadFile(filePath, key);
      console.log(`✓ Uploaded ${file} → ${result.url}`);
      results.push({ file, url: result.url, key: result.key });
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error.message);
    }
  }
  
  // Output JSON for use in the app
  console.log('\n--- Image URLs ---');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
