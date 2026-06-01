import os
import sys

def inspect_pdf_libraries():
    print("Checking installed PDF libraries...")
    libs = ['pypdf', 'PyPDF2', 'pdfplumber', 'fitz', 'reportlab', 'fpdf2']
    installed = []
    for lib in libs:
        try:
            __import__(lib)
            installed.append(lib)
        except ImportError:
            pass
    print(f"Installed libraries: {installed}")
    return installed

def extract_pdf_info(pdf_path):
    print(f"\nInspecting: {pdf_path}")
    if not os.path.exists(pdf_path):
        print("File does not exist.")
        return
    
    # Try importing pypdf or PyPDF2
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        print(f"Pages: {len(reader.pages)}")
        metadata = reader.metadata
        print("Metadata:")
        for k, v in metadata.items():
            print(f"  {k}: {v}")
        
        # Print first page text snippet
        first_page_text = reader.pages[0].extract_text()
        print("\nFirst 1000 chars of First Page:")
        print("-" * 50)
        print(first_page_text[:1000])
        print("-" * 50)
    except Exception as e:
        print(f"Error parsing with pypdf: {e}")

if __name__ == "__main__":
    installed_libs = inspect_pdf_libraries()
    pdf_dir = "C:\\EGYGRAFX WEBSITE\\pdf"
    
    # List files
    if os.path.exists(pdf_dir):
        files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
        for f in files:
            extract_pdf_info(os.path.join(pdf_dir, f))
