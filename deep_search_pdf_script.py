import os

def find_script():
    search_str = "Egygrafx_Proposal"
    print(f"Scanning C:\\Users\\Mi5a recursively for scripts containing '{search_str}'...")
    matches = []
    
    for root, dirs, files in os.walk("C:\\Users\\Mi5a"):
        # Skip standard large/hidden dirs to speed up
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['AppData', 'Local', 'Roaming', 'node_modules', 'venv', 'env', '3d', 'Pictures', 'Music', 'Videos', 'Searches', 'Saved Games', 'Links', 'Contacts']]
        
        for f in files:
            if f.endswith('.py') or f.endswith('.js') or f.endswith('.ps1'):
                full_path = os.path.join(root, f)
                try:
                    if os.path.getsize(full_path) < 500000:
                        with open(full_path, 'r', errors='ignore') as fh:
                            if search_str in fh.read():
                                print(f"Found match: {full_path}")
                                matches.append(full_path)
                except Exception:
                    pass
    return matches

if __name__ == "__main__":
    find_script()
