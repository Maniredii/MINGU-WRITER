# Paraphrase Assistant - Executable Usage Guide

This guide explains how to build and use the standalone executable (.exe) version of the Paraphrase Assistant.

## 🎯 Quick Start (For End Users)

If someone has already built the executable for you:

1. **Double-click** `launch-paraphrase-assistant.bat`
2. **Wait** for both windows to open (backend server + desktop app)
3. **Start paraphrasing!** Press `Ctrl+Alt+P` in any application

That's it! Skip to the [Using the Application](#-using-the-application) section.

---

## 🔨 Building the Executable (One-Time Setup)

### Prerequisites

Before building, ensure you have:

- ✅ **Python 3.8+** installed ([Download](https://www.python.org/downloads/))
- ✅ **.NET 6.0 SDK** installed ([Download](https://dotnet.microsoft.com/download/dotnet/6.0))
- ✅ **Windows 10/11** operating system

### Build Steps

1. **Open File Explorer** and navigate to the project folder:
   ```
   C:\Users\Mani_Reddy\Downloads\TextEditor
   ```

2. **Double-click** `build-desktop-exe.bat`

3. **Wait** for the build to complete (2-5 minutes)
   - You'll see progress messages
   - The script will restore packages and compile the application

4. **Success!** When complete, you'll see:
   ```
   BUILD SUCCESSFUL!
   The executable has been created at:
   C:\Users\Mani_Reddy\Downloads\TextEditor\desktop-ui\ParaphraseApp\bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe
   ```

### What Gets Created?

The build process creates a **standalone executable** with these characteristics:

- **File**: `ParaphraseApp.exe` (~60-80 MB)
- **Self-contained**: Includes the .NET runtime
- **No installation needed**: Can run on any Windows 10/11 machine
- **Single file**: Everything bundled into one .exe

---

## 🚀 Running the Application

### Method 1: Unified Launcher (Recommended)

The easiest way to run the application:

1. **Double-click** `launch-paraphrase-assistant.bat`

This script will:
- ✅ Check that Python is installed
- ✅ Start the backend server automatically
- ✅ Wait for the backend to be ready
- ✅ Launch the desktop application
- ✅ Show status messages throughout

**What you'll see:**
- A **backend window** (black terminal) - keep this open!
- A **desktop app window** - your main interface
- A **launcher window** - shows startup progress

### Method 2: Manual Start

If you prefer to start components separately:

#### Step 1: Start Backend
```powershell
# Double-click this file:
start-backend.bat
```

Wait for: `INFO: Model loaded successfully!`

#### Step 2: Launch Desktop App
```powershell
# Navigate to the executable location and double-click:
desktop-ui\ParaphraseApp\bin\Release\net6.0-windows\win-x64\publish\ParaphraseApp.exe
```

---

## 💡 Using the Application

### Global Hotkey Method (Recommended)

1. **Open any application** (Notepad, Word, browser, email, etc.)

2. **Type some text**:
   ```
   The quick brown fox jumps over the lazy dog.
   ```

3. **Select the text** (Ctrl+A or drag to highlight)

4. **Press `Ctrl+Alt+P`**

5. **Check the desktop app** - paraphrased text appears instantly!

6. **Click "Copy Paraphrase"** to copy the result

### Manual Input Method

1. **Type or paste** text directly into the "Original Text" panel

2. **Adjust the strength slider**:
   - **0-30**: Conservative (minimal changes)
   - **31-70**: Moderate (balanced)
   - **71-100**: Aggressive (maximum variety)

3. **Click "Paraphrase Now"**

4. **Click "Copy Paraphrase"** to copy the result

---

## 📦 Distributing to Other Users

Want to share the application with others?

### What to Share

Create a folder with these files:

```
Paraphrase-Assistant/
├── ParaphraseApp.exe          (from build output)
├── backend/                   (entire folder)
│   ├── paraphrase_api.py
│   ├── requirements.txt
│   └── ...
├── start-backend.bat
└── launch-paraphrase-assistant.bat
```

### Instructions for Recipients

1. **Install Python 3.8+** from https://www.python.org/downloads/
   - ⚠️ Check "Add Python to PATH" during installation

2. **Extract the folder** to any location (e.g., Desktop)

3. **Double-click** `launch-paraphrase-assistant.bat`

4. **First run only**: Wait 5-10 minutes for AI model download (~500MB)

5. **Subsequent runs**: Start in ~30 seconds

---

## 🔧 Troubleshooting

### Build Issues

**"dotnet is not recognized"**
- Install .NET 6.0 SDK: https://dotnet.microsoft.com/download/dotnet/6.0
- Restart your terminal after installation

**"Build failed" error**
- Run `dotnet restore` manually in `desktop-ui/ParaphraseApp`
- Check that all XAML files are present
- Ensure you have internet connection (for NuGet packages)

### Runtime Issues

**"Python is not installed"**
- Install Python 3.8+ from https://www.python.org/downloads/
- Make sure "Add Python to PATH" is checked
- Restart your computer after installation

**"Backend failed to start"**
- Check the backend window for error messages
- Ensure port 8000 is not in use by another application
- Try running `start-backend.bat` manually to see detailed errors

**"Cannot connect to API"**
- Verify the backend window shows: `Uvicorn running on http://127.0.0.1:8000`
- Open http://localhost:8000/docs in a browser to test
- Check Windows Firewall isn't blocking Python

**"Hotkey doesn't work"**
- Ensure text is selected before pressing Ctrl+Alt+P
- Try running the app as Administrator (right-click → Run as administrator)
- Check if another application is using the same hotkey
- Some apps (PDFs, protected content) may block clipboard access

**"Out of memory" when loading model**
- Close other applications to free up RAM
- Ensure you have at least 2GB free RAM
- Restart your computer and try again

### Performance Issues

**"First paraphrase is very slow"**
- This is normal! The AI model needs to load into memory
- First request: 5-10 seconds
- Subsequent requests: 2-3 seconds

**"Model download is stuck"**
- The first run downloads ~500MB from Hugging Face
- Ensure stable internet connection
- Check firewall isn't blocking Python
- Download may take 5-10 minutes on slow connections

---

## 📊 System Requirements

### Minimum Requirements
- **OS**: Windows 10 (64-bit) or Windows 11
- **RAM**: 4GB (2GB free)
- **Storage**: 2GB free space
- **Internet**: Required for first-time model download

### Recommended Requirements
- **OS**: Windows 11
- **RAM**: 8GB (4GB free)
- **Storage**: 5GB free space
- **Internet**: Broadband connection

---

## 🎓 Advanced Configuration

### Changing the Hotkey

Edit `desktop-ui/ParaphraseApp/MainWindow.xaml.cs`:

```csharp
// Current: Ctrl+Alt+P (VK_P = 0x50)
RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x50);

// Change to Ctrl+Alt+T (VK_T = 0x54)
RegisterHotKey(helper.Handle, HOTKEY_ID, MOD_CONTROL | MOD_ALT, 0x54);
```

Then rebuild using `build-desktop-exe.bat`.

### Changing the Backend Port

Edit `backend/paraphrase_api.py`:

```python
# Change from 8000 to 8080
uvicorn.run(app, host="127.0.0.1", port=8080)
```

Also update `desktop-ui/ParaphraseApp/MainWindow.xaml.cs`:

```csharp
private const string API_URL = "http://localhost:8080/paraphrase";
```

Then rebuild using `build-desktop-exe.bat`.

---

## 📝 File Locations Reference

After building, here's where everything is located:

```
TextEditor/
├── build-desktop-exe.bat                    ← Build script
├── launch-paraphrase-assistant.bat          ← Unified launcher
├── start-backend.bat                        ← Backend only
├── EXE_USAGE_GUIDE.md                       ← This file
│
├── backend/                                 ← Backend server
│   ├── paraphrase_api.py
│   └── requirements.txt
│
└── desktop-ui/
    └── ParaphraseApp/
        └── bin/
            └── Release/
                └── net6.0-windows/
                    └── win-x64/
                        └── publish/
                            └── ParaphraseApp.exe  ← The executable!
```

---

## 🆘 Getting More Help

If you encounter issues not covered here:

1. Check the main [README.md](README.md) for detailed documentation
2. Review [QUICKSTART.md](QUICKSTART.md) for setup instructions
3. Check the backend terminal window for error messages
4. Verify both backend and frontend are running
5. Try restarting both components

---

## ✨ Tips for Best Results

1. **Text Length**: Works best with 1-5 sentences at a time
2. **Strength Settings**:
   - Academic writing: 20-30
   - General content: 50-60
   - Creative writing: 70-90
3. **Performance**: Keep the backend running for faster subsequent paraphrases
4. **Clipboard**: Works with most applications, but some (PDFs, protected content) may block access

---

**Happy paraphrasing!** 🚀
