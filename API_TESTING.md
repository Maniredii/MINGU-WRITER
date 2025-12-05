# Paraphrase Assistant - API Testing Guide

This guide shows you how to test the backend API independently of the desktop application.

## Prerequisites

- Backend server running (see [QUICKSTART.md](QUICKSTART.md))
- Python installed (for testing with Python)
- OR curl installed (for testing with curl)
- OR any web browser (for interactive testing)

---

## Method 1: Interactive API Documentation (Easiest)

The FastAPI backend provides automatic interactive documentation.

### Step 1: Start the Backend

```powershell
cd backend
.\venv\Scripts\activate
python paraphrase_api.py
```

### Step 2: Open Browser

Visit: **http://localhost:8000/docs**

### Step 3: Test the API

1. Click on **POST /paraphrase**
2. Click **"Try it out"**
3. Edit the request body:
   ```json
   {
     "text": "This is a sample sentence to paraphrase.",
     "strength": 50
   }
   ```
4. Click **"Execute"**
5. View the response below

---

## Method 2: Using PowerShell (curl)

### Test Health Endpoint

```powershell
curl http://localhost:8000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Test Paraphrase Endpoint

```powershell
curl -X POST http://localhost:8000/paraphrase `
  -H "Content-Type: application/json" `
  -d '{\"text\":\"The quick brown fox jumps over the lazy dog.\",\"strength\":50}'
```

**Expected response:**
```json
{
  "paraphrase": "A swift brown fox leaps over a lazy dog.",
  "original_text": "The quick brown fox jumps over the lazy dog.",
  "strength": 50
}
```

---

## Method 3: Using Python

Create a test file `test_api.py`:

```python
import requests
import json

# API endpoint
url = "http://localhost:8000/paraphrase"

# Test data
data = {
    "text": "Artificial intelligence is transforming the world.",
    "strength": 50
}

# Make request
response = requests.post(url, json=data)

# Print results
if response.status_code == 200:
    result = response.json()
    print("Original:", result["original_text"])
    print("Paraphrase:", result["paraphrase"])
    print("Strength:", result["strength"])
else:
    print("Error:", response.status_code)
    print(response.text)
```

Run it:
```powershell
python test_api.py
```

---

## Method 4: Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create a new request:
   - **Method**: POST
   - **URL**: `http://localhost:8000/paraphrase`
   - **Headers**: 
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body** (raw JSON):
     ```json
     {
       "text": "This is a test sentence.",
       "strength": 50
     }
     ```
3. Click **Send**

---

## Testing Different Strength Levels

### Conservative (Strength: 20)

```json
{
  "text": "The cat sat on the mat.",
  "strength": 20
}
```

Expected: Minimal changes, similar structure

### Moderate (Strength: 50)

```json
{
  "text": "The cat sat on the mat.",
  "strength": 50
}
```

Expected: Balanced paraphrasing

### Aggressive (Strength: 80)

```json
{
  "text": "The cat sat on the mat.",
  "strength": 80
}
```

Expected: Significant rewording, different structure

---

## All Available Endpoints

### GET /

Root endpoint - API information

```powershell
curl http://localhost:8000/
```

### GET /health

Health check

```powershell
curl http://localhost:8000/health
```

### POST /paraphrase

Main paraphrasing endpoint

**Request:**
```json
{
  "text": "string (required)",
  "strength": 0-100 (optional, default: 50)
}
```

**Response:**
```json
{
  "paraphrase": "string",
  "original_text": "string",
  "strength": 0-100
}
```

### GET /docs

Interactive API documentation (Swagger UI)

Visit in browser: http://localhost:8000/docs

### GET /redoc

Alternative API documentation (ReDoc)

Visit in browser: http://localhost:8000/redoc

---

## Error Testing

### Test with Empty Text

```json
{
  "text": "",
  "strength": 50
}
```

**Expected:** 400 Bad Request

### Test with Invalid Strength

```json
{
  "text": "Test sentence.",
  "strength": 150
}
```

**Expected:** 422 Validation Error

### Test When Backend is Stopped

Stop the backend server and try any request.

**Expected:** Connection refused error

---

## Performance Testing

### Test Response Time

```python
import requests
import time

url = "http://localhost:8000/paraphrase"
data = {"text": "This is a test.", "strength": 50}

start = time.time()
response = requests.post(url, json=data)
end = time.time()

print(f"Response time: {end - start:.2f} seconds")
```

**Typical times:**
- First request: 5-10 seconds (model warmup)
- Subsequent requests: 1-3 seconds

### Batch Testing

```python
import requests

url = "http://localhost:8000/paraphrase"
sentences = [
    "The sky is blue.",
    "Water is essential for life.",
    "Technology advances rapidly."
]

for i, sentence in enumerate(sentences, 1):
    response = requests.post(url, json={"text": sentence, "strength": 50})
    if response.status_code == 200:
        result = response.json()
        print(f"{i}. Original: {sentence}")
        print(f"   Paraphrase: {result['paraphrase']}\n")
```

---

## Troubleshooting

### "Connection refused"

- Ensure backend is running
- Check URL is exactly `http://localhost:8000`
- Verify no firewall is blocking port 8000

### "Model not loaded"

- Wait for backend to fully start
- Look for "Model loaded successfully!" in backend console
- First run takes longer (model download)

### Slow responses

- First request is always slower (model warmup)
- Subsequent requests should be faster
- Consider using GPU for better performance

### Invalid JSON errors

- Ensure JSON is properly formatted
- Use double quotes for strings
- Escape special characters

---

## Sample Test Suite

Save as `test_suite.py`:

```python
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    print("✓ Health check passed")

def test_paraphrase_basic():
    data = {"text": "Hello world.", "strength": 50}
    response = requests.post(f"{BASE_URL}/paraphrase", json=data)
    assert response.status_code == 200
    result = response.json()
    assert "paraphrase" in result
    print("✓ Basic paraphrase passed")

def test_paraphrase_strengths():
    text = "The cat sat on the mat."
    for strength in [20, 50, 80]:
        data = {"text": text, "strength": strength}
        response = requests.post(f"{BASE_URL}/paraphrase", json=data)
        assert response.status_code == 200
        print(f"✓ Strength {strength} passed")

def test_empty_text():
    data = {"text": "", "strength": 50}
    response = requests.post(f"{BASE_URL}/paraphrase", json=data)
    assert response.status_code == 400
    print("✓ Empty text validation passed")

if __name__ == "__main__":
    print("Running API tests...\n")
    test_health()
    test_paraphrase_basic()
    test_paraphrase_strengths()
    test_empty_text()
    print("\nAll tests passed! ✓")
```

Run with:
```powershell
python test_suite.py
```

---

## Next Steps

After verifying the API works:

1. Test the desktop application
2. Try the global hotkey (Ctrl+Alt+P)
3. Experiment with different strength levels
4. Test with various text types (technical, creative, formal)

For desktop app testing, see [QUICKSTART.md](QUICKSTART.md).
