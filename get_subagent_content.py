import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Total lines: {len(lines)}")
    # Print the last 5 lines
    for i in range(max(0, len(lines)-10), len(lines)):
        print(f"\n--- Line {i+1} ---")
        try:
            data = json.loads(lines[i])
            print(f"Source: {data.get('source')}, Type: {data.get('type')}")
            content = data.get("content", "")
            print(f"Content preview: {content[:400]}")
            if len(content) > 400:
                print(f"... (total length: {len(content)}) ...")
                print(f"End: {content[-400:]}")
        except Exception as e:
            print(f"Error parsing JSON: {e}")
