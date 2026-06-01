import os
import fitz
import io
from PIL import Image

def main():
    pdf_path = "EgyGrafx Industrial Printing Solutions Catalog.pdf"
    output_dir = "public/machinery"
    os.makedirs(output_dir, exist_ok=True)
    
    if not os.path.exists(pdf_path):
        print(f"PDF not found: {pdf_path}")
        return
        
    doc = fitz.open(pdf_path)
    print(f"Total pages in catalog: {len(doc)}")
    
    count = 0
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images(full=True)
        print(f"Page {page_num + 1} has {len(image_list)} images")
        
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Check minimum size to filter out icons or tiny lines
                image = Image.open(io.BytesIO(image_bytes))
                width, height = image.size
                if width < 150 or height < 150:
                    continue  # skip tiny images like icons or decor lines
                    
                output_filename = f"extracted_p{page_num + 1}_img{img_idx + 1}.{image_ext}"
                output_path = os.path.join(output_dir, output_filename)
                
                image.save(output_path)
                print(f"  Extracted: {output_filename} ({width}x{height})")
                count += 1
            except Exception as e:
                print(f"  Error extracting image xref {xref} on page {page_num + 1}: {e}")
                
    print(f"\nSuccessfully extracted {count} high-quality real machinery images into {output_dir}")

if __name__ == "__main__":
    main()
