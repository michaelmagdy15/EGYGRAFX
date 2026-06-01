import json
import os

main_id = "071fe6ce-0e0d-4e76-a9be-d758c4a0ce9c"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{main_id}\\.system_generated\\logs\\transcript.jsonl"

print(f"Reading line 331 and around...")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if idx + 1 in [330, 331, 332, 347, 348, 349, 351, 352, 353]:
            print(f"\n--- LINE {idx+1} ---")
            print(line[:300])
            print("...")
            print(line[-300:])
