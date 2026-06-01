import json
import os
import re

transcript_path = r"C:\Users\Mi5a\.gemini\antigravity\brain\3a0b68e1-e881-4527-b462-b33b6a04723e\.system_generated\logs\transcript.jsonl"

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        try:
            data = json.loads(line)
            content = data.get("content", "")
            if not content:
                continue
            
            # Find references
            if "<!DOCTYPE html>" in content:
                print(f"Line {idx+1}: contains html code, length={len(content)}")
                # Find all HTML code blocks
                blocks = re.findall(r"```html\n(.*?)```", content, re.DOTALL)
                for b_idx, b in enumerate(blocks):
                    print(f"  Block {b_idx+1}: length={len(b)}")
                    if "Physics-Based Chemistry Simulator" in b or "config-width-container" in b:
                        print("    -> This block contains our expected new features!")
        except Exception as e:
            continue
