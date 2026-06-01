import os
import shutil

def main():
    src_dir = "public/machinery"
    os.makedirs(src_dir, exist_ok=True)
    
    # We copy the unique page images from the extracted page 1 list
    # extracted_p1_img1.jpeg is page 1, extracted_p1_img2.jpeg is page 2, etc.
    mappings = {
        "extracted_p1_img1.jpeg": "page_1.jpeg",
        "extracted_p1_img2.jpeg": "page_2.jpeg",
        "extracted_p1_img3.jpeg": "page_3.jpeg",
        "extracted_p1_img4.jpeg": "page_4.jpeg",
        "extracted_p1_img5.jpeg": "page_5.jpeg",
        "extracted_p1_img6.jpeg": "page_6.jpeg",
        "extracted_p1_img7.jpeg": "page_7.jpeg",
        "extracted_p1_img8.jpeg": "page_8.jpeg",
        "extracted_p1_img9.jpeg": "page_9.jpeg",
        "extracted_p1_img10.jpeg": "page_10.jpeg",
        "extracted_p1_img11.jpeg": "page_11.jpeg",
        "extracted_p1_img12.jpeg": "page_12.jpeg",
        "extracted_p1_img13.jpeg": "page_13.jpeg"
    }
    
    copied_count = 0
    for src_name, dst_name in mappings.items():
        src_path = os.path.join(src_dir, src_name)
        dst_path = os.path.join(src_dir, dst_name)
        
        if os.path.exists(src_path):
            shutil.copy(src_path, dst_path)
            print(f"Copied: {src_name} -> {dst_name} ({os.path.getsize(dst_path)} bytes)")
            copied_count += 1
        else:
            print(f"Error: Source file {src_name} not found in {src_dir}")
            
    print(f"\nSuccessfully mapped and copied {copied_count} authentic pages to clean formats.")

if __name__ == "__main__":
    main()
