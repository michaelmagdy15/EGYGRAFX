import os
import shutil

def main():
    img_dir = "public/machinery"
    if not os.path.exists(img_dir):
        print(f"Directory not found: {img_dir}")
        return
        
    files = [f for f in os.listdir(img_dir) if f.endswith(('.jpeg', '.png', '.jpg'))]
    
    # We will find the largest image file for each page from 1 to 13
    for p in range(1, 14):
        page_prefix = f"extracted_p{p}_img"
        page_files = [f for f in files if f.startswith(page_prefix)]
        
        if not page_files:
            print(f"No images found for page {p}")
            continue
            
        # Find the file with the largest size
        largest_file = None
        largest_size = 0
        for f in page_files:
            path = os.path.join(img_dir, f)
            sz = os.path.getsize(path)
            if sz > largest_size:
                largest_size = sz
                largest_file = f
                
        if largest_file:
            src_path = os.path.join(img_dir, largest_file)
            dst_name = f"page_{p}.jpeg"
            dst_path = os.path.join(img_dir, dst_name)
            shutil.copy(src_path, dst_path)
            print(f"Page {p} mapped: {largest_file} ({largest_size} bytes) -> {dst_name}")

if __name__ == "__main__":
    main()
