import urllib.request
import json
import os

url = "http://127.0.0.1:8000/analyze-ai-contribution"
data = {
  "repository": "example-repo",
  "commits": [
    {
      "commit_id": "abc1234",
      "message": "Add robust string reversal utility with comprehensive null checking and capitalization logic.",
      "diff": """diff --git a/string_utils.py b/string_utils.py
new file mode 100644
index 0000000..8a9b2c3
--- /dev/null
+++ b/string_utils.py
@@ -0,0 +1,24 @@
+def reverse_string_and_capitalize(input_string: str) -> str:
+    \"\"\"
+    Reverses the provided input string and capitalizes the first letter of the resulting string.
+    
+    Args:
+        input_string (str): The original string to be processed.
+        
+    Returns:
+        str: The reversed and capitalized string. If the input is empty or None, returns an empty string.
+    \"\"\"
+    
+    # Check if the input is None or an empty string to prevent errors
+    if not input_string:
+        return ""
+        
+    # Reverse the string using Python's slicing notation [::-1]
+    reversed_string = input_string[::-1]
+    
+    # Capitalize the first letter of the reversed string and make the rest lowercase
+    final_string = reversed_string.capitalize()
+    
+    # Return the finalized processed string back to the caller
+    return final_string
""",
      "author": "dev@example.com",
      "timestamp": "2023-10-27T10:00:00Z"
    }
  ]
}

import threading
import sys
import time

def spinner_task(stop_event):
    spinner = ['|', '/', '-', '\\']
    i = 0
    start_time = time.time()
    while not stop_event.is_set():
        elapsed = int(time.time() - start_time)
        sys.stdout.write(f"\r\033[K[ Llama 3.2 ] Analyzing Commits... {spinner[i % len(spinner)]} ({elapsed}s elapsed)")
        sys.stdout.flush()
        time.sleep(0.1)
        i += 1
    sys.stdout.write("\r\033[K")

req = urllib.request.Request(url, json.dumps(data).encode(), {'Content-Type': 'application/json'})

print("Sending request to Local Ollama AI Detector Backend...")
stop_event = threading.Event()
spinner_thread = threading.Thread(target=spinner_task, args=(stop_event,))
spinner_thread.start()

try:
    response = urllib.request.urlopen(req)
    stop_event.set()
    spinner_thread.join()
    
    print("\n✅ Analysis Complete!\n")
    print("Response Status:", response.status)
    print(json.dumps(json.loads(response.read().decode()), indent=2))
except Exception as e:
    stop_event.set()
    spinner_thread.join()
    print("\n❌ Error:", e)
    if hasattr(e, 'read'):
        print(e.read().decode())
