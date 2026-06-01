import pypdf

def dump_all_text(pdf_path, txt_out):
    print(f"Extracting all text from {pdf_path} to {txt_out}...")
    reader = pypdf.PdfReader(pdf_path)
    full_text = []
    for i, page in enumerate(reader.pages):
        full_text.append(f"--- PAGE {i+1} ---")
        full_text.append(page.extract_text())
    
    with open(txt_out, 'w', encoding='utf-8') as f:
        f.write("\n".join(full_text))
    print("Done!")

if __name__ == "__main__":
    dump_all_text("C:\\EGYGRAFX WEBSITE\\pdf\\MitryVisuals_MV-2026-085_eng-ashraf.pdf", "C:\\EGYGRAFX WEBSITE\\pdf\\MitryVisuals_text.txt")
    dump_all_text("C:\\EGYGRAFX WEBSITE\\pdf\\Egygrafx_Proposal_MV-2026-085 (1).pdf", "C:\\EGYGRAFX WEBSITE\\pdf\\Egygrafx_Proposal_text.txt")
