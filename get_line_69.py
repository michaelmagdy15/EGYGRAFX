import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Reading line 69...")
    line_data = json.loads(lines[68]) # 0-indexed
    print(f"Type: {line_data.get('type')}, Source: {line_data.get('source')}")
    
    # Try to find message in tool calls
    tool_calls = line_data.get("tool_calls", [])
    if not tool_calls:
        tool_calls = line_data.get("step_result", {}).get("tool_calls", [])
        
    for tc in tool_calls:
        if tc.get("name") == "send_message":
            msg = tc.get("arguments", {}).get("Message", "")
            print(f"Message length: {len(msg)}")
            # Write to scratch file to check
            with open(r"h:\EGYGRAFX\extracted_line_69_message.txt", "w", encoding="utf-8") as out:
                out.write(msg)
            print("Successfully written message to extracted_line_69_message.txt!")
            exit(0)

print("Failed to find send_message in line 69.")
