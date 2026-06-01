import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    print("LINE 87 RAW:")
    print(lines[86][:1000])
    print("...")
    print(lines[86][-1000:])
