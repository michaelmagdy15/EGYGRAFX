import os

def find_pdf_scripts(root_dir):
    print(f"Searching for PDF generation scripts in {root_dir}...")
    found_files = []
    # Let's search in root_dir up to 3 levels deep to be fast and safe
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Skip directories that are hidden or system
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ['AppData', 'node_modules', 'venv', 'env', '3d']]
        
        # Check depth
        depth = dirpath.count(os.path.sep) - root_dir.count(os.path.sep)
        if depth > 3:
            dirnames[:] = []  # Don't go deeper
            continue
            
        for f in filenames:
            if f.endswith('.py') or f.endswith('.js'):
                file_path = os.path.join(dirpath, f)
                # Check file size to avoid huge files
                try:
                    if os.path.getsize(file_path) < 100000:
                        with open(file_path, 'r', errors='ignore') as fh:
                            content = fh.read()
                            if 'reportlab' in content or 'SimpleDocTemplate' in content or 'canvas' in content or 'Egygrafx_Proposal' in content:
                                print(f"Found match: {file_path}")
                                found_files.append(file_path)
                except Exception:
                    pass
    return found_files

if __name__ == "__main__":
    # Let's search C:\EGYGRAFX WEBSITE first
    found = find_pdf_scripts("C:\\EGYGRAFX WEBSITE")
    if not found:
        # Search the user's home directory
        find_pdf_scripts("C:\\Users\\Mi5a")
