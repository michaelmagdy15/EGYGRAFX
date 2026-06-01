import json
import re
import os

transcript_path = r"C:\Users\Mi5a\.gemini\antigravity\brain\3a0b68e1-e881-4527-b462-b33b6a04723e\.system_generated\logs\transcript.jsonl"
output_path = r"h:\EGYGRAFX\applications_gateway.html"

print(f"Reading transcript: {transcript_path}")
if not os.path.exists(transcript_path):
    print("Error: transcript file not found!")
    exit(1)

html_content = ""
with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            # We are looking for content inside the steps
            content = data.get("content", "")
            if not content and "tool_calls" in data:
                # Some JSONL forms have content nested differently
                continue
            
            # Check if it contains the HTML file we want
            if "<!DOCTYPE html>" in content and "Solutions Matchmaker Gateway" in content:
                # Use regex to find the html block
                match = re.search(r"```html\n(.*?)```", content, re.DOTALL)
                if match:
                    html_content = match.group(1)
                    print("Found HTML content in step content!")
                else:
                    # Maybe it's not wrapped in backticks or just the raw html
                    if content.strip().startswith("<!DOCTYPE html>"):
                        html_content = content
                        print("Found raw HTML content!")
        except Exception as e:
            continue

if html_content:
    print(f"Writing to {output_path} ({len(html_content)} bytes)")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print("Success!")
else:
    print("Failed to extract HTML content. Let's try scanning all string values in the JSONL.")
    # Alternate scan of the entire JSON text for the largest html matching block
    with open(transcript_path, "r", encoding="utf-8") as f:
        full_text = f.read()
        # Find all occurrences of <!DOCTYPE html> ... </html>
        matches = re.findall(r"<!DOCTYPE html>.*?</html>", full_text, re.DOTALL)
        if matches:
            # Sort by length and take the longest one
            matches.sort(key=len, reverse=True)
            longest_match = matches[0]
            # Replace escaped JSON sequences if any
            longest_match = longest_match.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(longest_match)
            print(f"Alternative extraction success! Written {len(longest_match)} bytes.")
        else:
            print("No html blocks found anywhere in the log!")
