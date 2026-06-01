import os

def main():
    file_path = "src/context/AppContext.jsx"
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Standard string replacements for exact insertion of images
    replacements = {
        'id: "home-textile",': 'id: "home-textile",\n    image: "/machinery/page_3.jpeg",',
        'id: "t-shirts",': 'id: "t-shirts",\n    image: "/machinery/page_4.jpeg",',
        'id: "carpet-rugs",': 'id: "carpet-rugs",\n    image: "/machinery/page_5.jpeg",',
        'id: "industrial-cad",': 'id: "industrial-cad",\n    image: "/machinery/page_6.jpeg",',
        'id: "signage-display",': 'id: "signage-display",\n    image: "/machinery/page_7.jpeg",',
        'id: "wall-decor",': 'id: "wall-decor",\n    image: "/machinery/page_8.jpeg",',
        'id: "outdoor-adv",': 'id: "outdoor-adv",\n    image: "/machinery/page_9.jpeg",',
        'id: "packaging-labeling",': 'id: "packaging-labeling",\n    image: "/machinery/page_10.jpeg",',
        'id: "promotional-spec",': 'id: "promotional-spec",\n    image: "/machinery/page_11.jpeg",'
    }
    
    count = 0
    for old_str, new_str in replacements.items():
        if old_str in content:
            if new_str not in content:  # avoid double insertion
                content = content.replace(old_str, new_str)
                print(f"Updated mapping for: {old_str}")
                count += 1
            else:
                print(f"Already mapped: {old_str}")
        else:
            print(f"Warning: String not found: {old_str}")
            
    if count > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated {count} sectors in AppContext.jsx")
    else:
        print("No changes made (already updated or matches not found)")

if __name__ == "__main__":
    main()
