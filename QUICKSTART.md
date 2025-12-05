# Quick Start Guide - Paraphrase Assistant

This guide will help you get the Paraphrase Assistant up and running quickly.

## 📋 Prerequisites Check

Before starting, verify you have the required software installed:

### 1. Check Python Installation

Open PowerShell or Command Prompt and run:

```powershell
python --version
```

**Expected output:** `Python 3.8.x` or higher

**If not installed:**
- Download from: https://www.python.org/downloads/
- During installation, **check "Add Python to PATH"**
- Restart your terminal after installation

### 2. Check .NET SDK Installation

Open PowerShell or Command Prompt and run:

```powershell
dotnet --version
```

**Expected output:** `6.0.x` or higher

**If not installed:**
- Download .NET 6.0 SDK from: https://dotnet.microsoft.com/download/dotnet/6.0
- Choose "SDK x64" for Windows
- Install and restart your terminal

---

## 🚀 Step-by-Step Setup

### Step 1: Start the Backend Server

#### Option A: Using the Startup Script (Easiest)

1. Navigate to the project folder in File Explorer
2. Double-click `start-backend.bat`
3. Wait for the message: **"Model loaded successfully!"**
   - ⚠️ First run will download ~500MB AI model (5-10 minutes)
   - Subsequent runs will be much faster

#### Option B: Manual Setup

Open PowerShell or Command Prompt:

```powershell
# Navigate to backend folder
cd C:\Users\Mani_Reddy\Downloads\TextEditor\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the server
python paraphrase_api.py
```

**✅ Success indicators:**
- Console shows: `INFO: Model loaded successfully!`
- Console shows: `Uvicorn running on http://127.0.0.1:8000`
- Browser can open: http://localhost:8000/docs

**Keep this window open!** The backend must stay running.

---

### Step 2: Build and Run the Desktop App

Open a **NEW** PowerShell or Command Prompt window:

```powershell
# Navigate to desktop app folder
cd C:\Users\Mani_Reddy\Downloads\TextEditor\desktop-ui\ParaphraseApp

# Restore NuGet packages (first time only)
dotnet restore

# Build the application
dotnet build

# Run the application
dotnet run
```

**✅ Success indicators:**
- A window opens with "Paraphrase Assistant" title
- Status bar shows: "Ready - Press Ctrl+Alt+P to capture text"
- API Status shows: "Connected" (in green)

---

## 🎯 Using the Application

### Method 1: Global Hotkey (Recommended)

1. **Ensure backend is running** (from Step 1)
2. **Launch the desktop app** (from Step 2)
3. **Open any application** (Notepad, Word, browser, etc.)
4. **Type and select some text**:
   ```
   The quick brown fox jumps over the lazy dog.
   ```
5. **Press `Ctrl+Alt+P`**
6. **Watch the magic happen!**
   - Original text appears in left panel
   - Paraphrased text appears in right panel

### Method 2: Manual Input

1. Type or paste text directly into the **"Original Text"** panel
2. Adjust the **strength slider** (0-100):
   - **0-30**: Conservative (minimal changes)
   - **31-70**: Moderate (balanced)
   - **71-100**: Aggressive (maximum diversity)
3. Click **"Paraphrase Now"**
4. Click **"Copy Paraphrase"** to copy the result

---

## 🧪 Testing the Setup

### Test 1: Backend API

With the backend running, open a new terminal:

```powershell
# Test the health endpoint
curl http://localhost:8000/health

# Test paraphrasing
curl -X POST http://localhost:8000/paraphrase -H "Content-Type: application/json" -d "{\"text\":\"This is a test.\",\"strength\":50}"
```

Or visit in your browser:
- http://localhost:8000/docs (Interactive API documentation)

### Test 2: Desktop App

1. Open Notepad
2. Type: "Artificial intelligence is transforming the world."
3. Select all (Ctrl+A)
4. Press Ctrl+Alt+P
5. Check the desktop app for the paraphrased result

---

## 🐛 Troubleshooting

### Backend Issues

**"python is not recognized"**
- Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation
- Restart your terminal

**"Model loading fails" or "Out of memory"**
- Ensure you have at least 2GB free RAM
- Close other applications
- Try restarting your computer

**"Port 8000 already in use"**
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace <PID> with the number from above)
taskkill /PID <PID> /F
```

### Frontend Issues

**"dotnet is not recognized"**
- Install .NET 6.0 SDK from https://dotnet.microsoft.com/download/dotnet/6.0
- Restart your terminal after installation

**"Cannot connect to API"**
- Verify backend is running (check Step 1)
- Check that you see "Uvicorn running on http://127.0.0.1:8000"
- Try restarting both backend and frontend

**"Hotkey Ctrl+Alt+P doesn't work"**
- Check if another app is using the same hotkey
- Try running the app as Administrator (right-click → Run as administrator)
- Ensure text is actually selected before pressing the hotkey

**"Clipboard capture fails"**
- Some apps (PDFs, protected content) may block clipboard access
- Try with Notepad or a web browser first
- Ensure you select text before pressing Ctrl+Alt+P

---

## 📁 Project Files Overview

```
TextEditor/
├── start-backend.bat          ← Double-click to start backend
├── backend/
│   ├── paraphrase_api.py      ← FastAPI server
│   └── requirements.txt       ← Python dependencies
└── desktop-ui/
    └── ParaphraseApp/         ← C# WPF application
```

---

## 🎓 Tips for Best Results

1. **Strength Settings:**
   - Use 20-30 for academic writing (minimal changes)
   - Use 50-60 for general content (balanced)
   - Use 70-90 for creative writing (maximum variety)

2. **Performance:**
   - First paraphrase may take 5-10 seconds
   - Subsequent requests are faster (~2-3 seconds)
   - Shorter texts process faster than longer ones

3. **Text Length:**
   - Works best with 1-5 sentences at a time
   - Very long texts may take longer to process
   - Maximum length: ~512 tokens (~400 words)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the main [README.md](README.md) for detailed documentation
3. Check the backend terminal for error messages
4. Ensure both backend and frontend are running

---

## 🎉 You're All Set!

Once both components are running:
- Backend: http://localhost:8000
- Desktop App: Running with Ctrl+Alt+P ready

**Happy paraphrasing!** 🚀
