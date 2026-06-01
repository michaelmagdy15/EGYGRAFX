import zipfile
import xml.etree.ElementTree as ET
import os

def extract_docx_text(docx_path, out_path):
    print(f"Extracting text from {docx_path} to {out_path}...")
    if not os.path.exists(docx_path):
        print(f"Error: {docx_path} does not exist.")
        return
        
    try:
        with zipfile.ZipFile(docx_path) as zf:
            # Let's inspect the files inside the zip to see if it's a valid docx
            file_list = zf.namelist()
            print(f"Zip files count: {len(file_list)}")
            
            if 'word/document.xml' not in file_list:
                print("Error: 'word/document.xml' not found in docx ZIP.")
                return
                
            doc_xml = zf.read('word/document.xml')
            
            root = ET.fromstring(doc_xml)
            
            # Namespace map
            ns = {
                'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
            }
            
            paragraphs = []
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = []
                for text in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    if text.text:
                        texts.append(text.text)
                paragraphs.append("".join(texts))
            
            full_text = "\n".join(paragraphs)
            
            # Write to output file
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(full_text)
                
            print(f"Success! Extracted {len(paragraphs)} paragraphs, written to {out_path}")
            print(f"File size: {os.path.getsize(out_path)} bytes.")
    except Exception as e:
        print(f"Exception encountered: {e}")

if __name__ == "__main__":
    extract_docx_text("C:\\EGYGRAFX WEBSITE\\Core.docx", "C:\\EGYGRAFX WEBSITE\\Core_extracted.txt")
