import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

print(f"Reading logs: {transcript_path}")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

with open(transcript_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Total lines: {len(lines)}")
    # Find all lines containing send_message
    for i, line in enumerate(lines):
        if "send_message" in line:
            print(f"\n--- Line {i+1} ---")
            # Let's print the line content or its structure
            try:
                data = json.loads(line)
                print(f"Keys: {list(data.keys())}")
                if "tool_calls" in data:
                    print("tool_calls exists in root")
                    for tc in data["tool_calls"]:
                        print(f"  Tool: {tc.get('name')}")
                        args = tc.get("arguments", {})
                        print(f"  Arg keys: {list(args.keys())}")
                        # print length of Message arg
                        msg = args.get("Message", "")
                        print(f"  Message length: {len(msg)}")
                if "step_result" in data:
                    print("step_result exists")
                    tc_list = data["step_result"].get("tool_calls", [])
                    for tc in tc_list:
                        print(f"  Tool: {tc.get('name')}")
                        args = tc.get("arguments", {})
                        print(f"  Arg keys: {list(args.keys())}")
                        msg = args.get("Message", "")
                        print(f"  Message length: {len(msg)}")
            except Exception as e:
                print(f"Error parsing line: {e}")
                # Print raw line snippet
                print(line[:500])
