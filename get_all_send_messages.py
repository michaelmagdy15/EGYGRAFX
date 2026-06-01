import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\..gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"
# Wait! Let's check the path: is it ".gemini" or "..gemini" or "C:\Users\Mi5a\.gemini..."
# The user_information says: App Data Directory is C:\Users\Mi5a\.gemini\antigravity
# So: C:\Users\Mi5a\.gemini\antigravity\brain\3a0b68e1-e881-4527-b462-b33b6a04723e\.system_generated\logs\transcript.jsonl

transcript_path = r"C:\Users\Mi5a\.gemini\antigravity\brain\3a0b68e1-e881-4527-b462-b33b6a04723e\.system_generated\logs\transcript.jsonl"

print(f"Searching send_message tool calls in: {transcript_path}")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

found = False
with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "send_message" in line:
            try:
                data = json.loads(line)
                
                # Check tool_calls in planner response
                tool_calls = data.get("tool_calls", [])
                if not tool_calls:
                    tool_calls = data.get("step_result", {}).get("tool_calls", [])
                
                for tc in tool_calls:
                    if tc.get("name") == "send_message":
                        args = tc.get("arguments", {})
                        msg = args.get("Message", "")
                        print(f"Line {idx+1}: Found send_message. Message length: {len(msg)}")
                        if len(msg) > 1000:
                            print(f"  First 200 chars: {msg[:200]}")
                            print(f"  Last 200 chars: {msg[-200:]}")
                            # Save to file
                            out_file = rf"h:\EGYGRAFX\untruncated_subagent_msg_{idx+1}.txt"
                            with open(out_file, "w", encoding="utf-8") as out:
                                out.write(msg)
                            print(f"  Saved full message to {out_file}")
                            found = True
            except Exception as e:
                print(f"Line {idx+1} parse error: {e}")

if not found:
    print("No large send_message tool calls found.")
