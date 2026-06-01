import json
import os

subagent_id = "3a0b68e1-e881-4527-b462-b33b6a04723e"
transcript_path = f"C:\\Users\\Mi5a\\.gemini\\antigravity\\brain\\{subagent_id}\\.system_generated\\logs\\transcript.jsonl"

print(f"Checking subagent transcript for tool calls: {transcript_path}")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

found_any = False
with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "write_to_file" in line or "replace_file_content" in line or "applications_gateway.html" in line:
            try:
                data = json.loads(line)
                # Find tool calls
                tool_calls = data.get("tool_calls", [])
                if not tool_calls:
                    # Let's check nested fields in step results
                    tool_calls = data.get("step_result", {}).get("tool_calls", [])
                
                for tc in tool_calls:
                    method = tc.get("name", "") or tc.get("method", "")
                    if "write_to_file" in method or "replace_file" in method:
                        args = tc.get("arguments", {}) or tc.get("params", {})
                        target = args.get("TargetFile", "") or args.get("target", "")
                        if "applications_gateway.html" in target:
                            print(f"Found tool call in line {idx+1}: {method}")
                            content = args.get("CodeContent", "") or args.get("code", "")
                            if content:
                                print(f"Successfully extracted CodeContent! Length: {len(content)}")
                                with open(r"h:\EGYGRAFX\applications_gateway.html", "w", encoding="utf-8") as out:
                                    out.write(content)
                                print("Successfully restored applications_gateway.html from subagent tool call!")
                                found_any = True
                                exit(0)
            except Exception as e:
                # Let's also do a fallback search for raw JSON keys in line
                if '"CodeContent"' in line or '"ReplacementContent"' in line:
                    print(f"Detected CodeContent keyword in line {idx+1} (raw search)")
                    try:
                        # Let's extract using standard json load on full line
                        data = json.loads(line)
                        # recursively scan for CodeContent
                        def scan_for_code(obj):
                            if isinstance(obj, dict):
                                if "CodeContent" in obj and "applications_gateway.html" in str(obj):
                                    return obj["CodeContent"]
                                for v in obj.values():
                                    res = scan_for_code(v)
                                    if res: return res
                            elif isinstance(obj, list):
                                for v in obj:
                                    res = scan_for_code(v)
                                    if res: return res
                            return None
                        
                        code = scan_for_code(data)
                        if code:
                            print(f"Extracted code from deep raw scan! Length: {len(code)}")
                            with open(r"h:\EGYGRAFX\applications_gateway.html", "w", encoding="utf-8") as out:
                                out.write(code)
                            print("Restored successfully!")
                            found_any = True
                            exit(0)
                    except Exception as ex:
                        print(f"Raw scan parse error: {ex}")

if not found_any:
    print("Finished search. No write_to_file tool calls found for applications_gateway.html.")
