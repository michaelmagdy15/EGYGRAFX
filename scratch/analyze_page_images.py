import os
from PIL import Image

def main():
    img_dir = "public/machinery"
    if not os.path.exists(img_dir):
        print(f"Directory not found: {img_dir}")
        return
        
    files = [f for f in os.listdir(img_dir) if f.endswith(('.jpeg', '.png', '.jpg'))]
    
    for p in range(1, 4):
        page_prefix = f"extracted_p{p}_img"
        page_files = [f for f in files if f.startswith(page_prefix)]
        print(f"\nPage {p} images:")
        
        for f in sorted(page_files):
            path = os.path.join(img_dir, f)
            sz = os.path.getsize(path)
            try:
                img = Image.open(path)
                print(f"  {f}: {img.size[0]}x{img.size[1]} ({sz} bytes)")
            except Exception as e:
                print(f"  {f}: error opening ({sz} bytes): {e}")

if __name__ == "__main__":
    main()
