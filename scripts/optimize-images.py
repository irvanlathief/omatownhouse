#!/usr/bin/env python3
"""
Optimize property images for web:
- Convert to WebP format for better compression
- Resize to reasonable max dimensions (1920px width for gallery)
- Apply quality optimization
- Generate thumbnails for faster initial load
"""

import os
from PIL import Image
from pathlib import Path

# Source images
SOURCE_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/oma-townhouse/optimized-images")

# Image files to process
IMAGE_FILES = [
    "Scene77.png",
    "Scene76.png", 
    "Scene33.png",
    "Scene41.png",
    "Scene23.png",
    "Scene52.png",
    "Scene51.png",
    "Scene22.png",
    "Scene39.png",
    "Scene32.png",
    "Scene26.png",
]

# Settings
MAX_WIDTH = 1920  # Max width for full images
THUMB_WIDTH = 800  # Width for thumbnails (faster initial load)
QUALITY = 85  # WebP quality (85 is good balance)

def optimize_image(input_path: Path, output_path: Path, max_width: int, quality: int):
    """Optimize a single image."""
    with Image.open(input_path) as img:
        # Convert to RGB if necessary (for PNG with alpha)
        if img.mode in ('RGBA', 'P'):
            # Create white background for transparency
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if larger than max width
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as WebP
        img.save(output_path, 'WEBP', quality=quality, method=6)
        
        return output_path

def main():
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    results = []
    
    for filename in IMAGE_FILES:
        input_path = SOURCE_DIR / filename
        if not input_path.exists():
            print(f"Warning: {filename} not found, skipping...")
            continue
        
        base_name = input_path.stem
        
        # Generate full-size optimized image
        full_output = OUTPUT_DIR / f"{base_name}.webp"
        optimize_image(input_path, full_output, MAX_WIDTH, QUALITY)
        full_size = full_output.stat().st_size / 1024
        
        # Generate thumbnail for faster loading
        thumb_output = OUTPUT_DIR / f"{base_name}_thumb.webp"
        optimize_image(input_path, thumb_output, THUMB_WIDTH, QUALITY)
        thumb_size = thumb_output.stat().st_size / 1024
        
        # Get original size
        orig_size = input_path.stat().st_size / 1024
        
        results.append({
            'name': base_name,
            'original_kb': orig_size,
            'full_kb': full_size,
            'thumb_kb': thumb_size,
            'full_path': str(full_output),
            'thumb_path': str(thumb_output)
        })
        
        print(f"✓ {filename}: {orig_size:.0f}KB → Full: {full_size:.0f}KB, Thumb: {thumb_size:.0f}KB")
    
    print(f"\nOptimized {len(results)} images to {OUTPUT_DIR}")
    
    # Print summary
    total_orig = sum(r['original_kb'] for r in results)
    total_full = sum(r['full_kb'] for r in results)
    total_thumb = sum(r['thumb_kb'] for r in results)
    
    print(f"\nTotal: {total_orig:.0f}KB → Full: {total_full:.0f}KB ({(1-total_full/total_orig)*100:.0f}% reduction)")
    print(f"Thumbnails: {total_thumb:.0f}KB ({(1-total_thumb/total_orig)*100:.0f}% reduction)")

if __name__ == "__main__":
    main()
