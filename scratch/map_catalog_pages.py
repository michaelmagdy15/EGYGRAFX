import pypdf

def main():
    pdf_path = "EgyGrafx Industrial Printing Solutions Catalog.pdf"
    reader = pypdf.PdfReader(pdf_path)
    print(f"Total pages: {len(reader.pages)}")
    
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        print(f"\n================ PAGE {i+1} ================")
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        # Print the first 10 non-empty lines to identify the machinery
        for line in lines[:8]:
            print(f"  {line}")

if __name__ == "__main__":
    main()
