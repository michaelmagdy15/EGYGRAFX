import json
import os
import re

main_id = "071fe6ce-0e0d-4e76-a9be-d758c4a0ce9c"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{main_id}\\.system_generated\\logs\\transcript.jsonl"

print(f"Checking main transcript: {transcript_path}")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "3a0b68e1-e881-4527-b462-b33b6a04723e" in line and "Physics-Based Chemistry" in line:
            print(f"Line {idx+1} contains keywords! Length: {len(line)}")
            try:
                data = json.loads(line)
                # Find all string fields recursively
                def scan_obj(obj):
                    if isinstance(obj, str):
                        if "<!DOCTYPE html>" in obj and "Solutions Matchmaker" in obj:
                            print(f"Found html block in JSON structure! Length: {len(obj)}")
                            return obj
                    elif isinstance(obj, dict):
                        for k, v in obj.items():
                            res = scan_obj(v)
                            if res: return res
                    elif isinstance(obj, list):
                        for v in obj:
                            res = scan_obj(v)
                            if res: return res
                    return None
                
                res = scan_obj(data)
                if res:
                    print("Successfully extracted HTML content from JSON!")
                    # Check if it has a code block
                    m = re.search(r"```html\n(.*?)```", res, re.DOTALL)
                    html = m.group(1) if m else res
                    print(f"Clean HTML code length: {len(html)}")
                    if "truncated" in html:
                        print("Warning: The extracted code contains the word 'truncated'. It might be truncated!")
                    with open(r"h:\EGYGRAFX\applications_gateway.html", "w", encoding="utf-8") as out:
                        out.write(html)
                    print("Written to applications_gateway.html successfully!")
                    exit(0)
            except Exception as e:
                print(f"JSON Parse/Scan error: {e}")
                
print("Finished search without success.")
