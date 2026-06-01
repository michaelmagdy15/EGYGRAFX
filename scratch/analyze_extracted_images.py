import os
import hashlib
from PIL import Image

def get_image_hash(image_path):
    with open(image_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def main():
    img_dir = "public/machinery"
    if not os.path.exists(img_dir):
        print(f"Directory not found: {img_dir}")
        return
        
    files = [f for f in os.listdir(img_dir) if f.endswith(('.jpeg', '.png', '.jpg'))]
    print(f"Total files in directory: {len(files)}")
    
    unique_hashes = {}
    for filename in files:
        path = os.path.join(img_dir, filename)
        try:
            h = get_image_hash(path)
            if h not in unique_hashes:
                unique_hashes[h] = []
            unique_hashes[h].append(filename)
        except Exception as e:
            print(f"Error hashing {filename}: {e}")
            
    print(f"Total unique images: {len(unique_hashes)}")
    
    # Save the de-duplicated unique images into a list, keeping only the first occurrence
    unique_dir = "public/machinery/unique"
    os.makedirs(unique_dir, exist_ok=True)
    
    count = 1
    for h, filenames in unique_hashes.items():
        first_file = filenames[0]
        src_path = os.path.join(img_dir, first_file)
        
        try:
            img = Image.open(src_path)
            w, h_size = img.size
            
            new_name = f"machine_unique_{count}_{w}x{h_size}.jpeg"
            dst_path = os.path.join(unique_dir, new_name)
            img.save(dst_path)
            
            print(f"Unique #{count}: {first_file} -> {new_name} ({w}x{h_size}) [Duplicate count: {len(filenames)}]")
            count += 1
        except Exception as e:
            print(f"Error copying {first_file}: {e}")

if __name__ == "__main__":
    main()
