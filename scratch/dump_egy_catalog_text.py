import pypdf
import os

def dump_all_text(pdf_path, txt_out):
    if not os.path.exists(pdf_path):
        print(f"PDF not found: {pdf_path}")
        return
    print(f"Extracting all text from {pdf_path} to {txt_out}...")
    reader = pypdf.PdfReader(pdf_path)
    full_text = []
    for i, page in enumerate(reader.pages):
        full_text.append(f"--- PAGE {i+1} ---")
        text = page.extract_text()
        if text:
            full_text.append(text)
        else:
            full_text.append("[No text found on this page]")
    
    with open(txt_out, 'w', encoding='utf-8') as f:
        f.write("\n".join(full_text))
    print(f"Done! Text written to {txt_out}")

if __name__ == "__main__":
    dump_all_text("EgyGrafx Industrial Printing Solutions Catalog.pdf", "scratch/EgyGrafx_Catalog_text.txt")
