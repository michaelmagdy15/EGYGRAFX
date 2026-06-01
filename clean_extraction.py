import json
import os
import re

transcript_path = r"C:\Users\Mi5a\.gemini\antigravity\brain\3a0b68e1-e881-4527-b462-b33b6a04723e\.system_generated\logs\transcript.jsonl"
output_path = r"h:\EGYGRAFX\applications_gateway.html"

print("Starting clean extraction...")

if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

# We will read all blocks from the JSONL and decode them properly
html_content = ""
with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            # Find steps that are model responses or system messages containing code
            content = data.get("content", "")
            if not content:
                # Check if it is a tool output or tool call with arguments
                continue
            
            # Find the message containing the HTML template
            if "Solutions Matchmaker Gateway" in content and "<!DOCTYPE html>" in content:
                # Look for a code block
                matches = re.findall(r"```html\n(.*?)```", content, re.DOTALL)
                if matches:
                    # Choose the longest matching block
                    matches.sort(key=len, reverse=True)
                    html_content = matches[0]
                    print("Found HTML block in step!")
                    break
        except Exception as e:
            continue

# If not found yet, let's search all strings in the log for the longest block
if not html_content:
    print("Alternative search...")
    with open(transcript_path, "r", encoding="utf-8") as f:
        for line in f:
            try:
                # We do a substring search for JSON values that are strings
                # and contain HTML signatures
                idx = line.find('<!DOCTYPE html>')
                if idx != -1:
                    # Let's try to parse the line as JSON
                    data = json.loads(line)
                    # Recursively search for the string value
                    def find_html(obj):
                        if isinstance(obj, str):
                            if '<!DOCTYPE html>' in obj and 'Solutions Matchmaker Gateway' in obj:
                                return obj
                        elif isinstance(obj, dict):
                            for v in obj.values():
                                res = find_html(v)
                                if res: return res
                        elif isinstance(obj, list):
                            for v in obj:
                                res = find_html(v)
                                if res: return res
                        return None
                    
                    res = find_html(data)
                    if res:
                        # Extract the HTML block if it's inside markdown code blocks
                        match = re.search(r"```html\n(.*?)```", res, re.DOTALL)
                        if match:
                            html_content = match.group(1)
                        else:
                            html_content = res
                        print("Found HTML via deep JSON scan!")
                        break
            except Exception as e:
                continue

if html_content:
    # Now let's clean any prepended line numbers in case the subagent outputted them
    # Prepended line numbers look like: "123: <html>" or "  123: <html>"
    # But wait, let's check if the subagent actually outputted line numbers, or if it was just our view_file showing them.
    # We can inspect the first few lines of html_content
    lines = html_content.splitlines()
    cleaned_lines = []
    has_line_numbers = False
    
    # Check if there are line numbers like "900:  <header" or "  900: <header"
    for line in lines[:20]:
        if re.match(r"^\s*\d+:\s", line):
            has_line_numbers = True
            break
            
    if has_line_numbers:
        print("Detected prepended line numbers in subagent's code. Stripping them...")
        for line in lines:
            m = re.match(r"^\s*\d+:\s?(.*)", line)
            if m:
                cleaned_lines.append(m.group(1))
            else:
                cleaned_lines.append(line)
        html_content = "\n".join(cleaned_lines)
    
    # Write the clean content to disk
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Clean extraction completed! Written {len(html_content)} bytes to {output_path}")
else:
    print("Failed to find the HTML content!")
