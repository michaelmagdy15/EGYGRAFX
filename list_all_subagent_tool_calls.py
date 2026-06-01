import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

print(f"Listing all tool calls in: {transcript_path}")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        try:
            data = json.loads(line)
            tool_calls = data.get("tool_calls", [])
            # Also check nested structure
            if not tool_calls:
                tool_calls = data.get("step_result", {}).get("tool_calls", [])
            
            if tool_calls:
                for tc in tool_calls:
                    print(f"Line {idx+1}: {tc.get('name', 'unknown')} args: {list(tc.get('arguments', {}).keys()) if tc.get('arguments') else []}")
        except Exception as e:
            continue
