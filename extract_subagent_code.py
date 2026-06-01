with open(r"h:\EGYGRAFX\home_portal_prototype.html", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Total lines: {len(lines)}")
    # Print lines containing "id=" or "class=" with section names
    for i, line in enumerate(lines):
        if "id=" in line or "class=" in line:
            if "bento" in line or "sim-" in line or "calc" in line or "admin" in line:
                print(f"Line {i+1}: {line.strip()}")
