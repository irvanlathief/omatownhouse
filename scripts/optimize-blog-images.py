from PIL import Image
import os

images = {
    "blog-beach-club": "/home/ubuntu/upload/search_images/zNg2kUkNXxow.jpg",
    "blog-gym-fitness": "/home/ubuntu/upload/search_images/QlZCs0NWhYDo.jpg",
    "blog-cafe-coworking": "/home/ubuntu/upload/search_images/YaND3zt7zmRt.jpg",
    "blog-spa-wellness": "/home/ubuntu/upload/search_images/WmCPgwbNgxv7.jpg",
    "blog-surf-beach": "/home/ubuntu/upload/search_images/lIOHYAOhIjES.jpg",
    "blog-school-family": "/home/ubuntu/upload/search_images/r7QJAbeXUYfi.webp",
    "blog-community-dining": "/home/ubuntu/upload/search_images/WYa5bZKaNijM.jpg",
    "blog-nuanu-creative": "/home/ubuntu/upload/search_images/bTmUojYvEZWz.jpg",
    "blog-rice-field": "/home/ubuntu/upload/search_images/Ba3xcahBCNJr.jpg",
}

output_dir = "/home/ubuntu/oma-townhouse/optimized-blog-images"
os.makedirs(output_dir, exist_ok=True)

MAX_WIDTH = 1200
MAX_HEIGHT = 800

for name, path in images.items():
    try:
        img = Image.open(path)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Resize to max dimensions while maintaining aspect ratio
        img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
        
        output_path = os.path.join(output_dir, f"{name}.webp")
        img.save(output_path, 'WEBP', quality=82, method=6)
        
        original_size = os.path.getsize(path) / 1024
        new_size = os.path.getsize(output_path) / 1024
        print(f"{name}: {original_size:.0f}KB -> {new_size:.0f}KB ({img.size[0]}x{img.size[1]})")
    except Exception as e:
        print(f"Error processing {name}: {e}")

print("\nAll images optimized!")
