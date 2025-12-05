# Installation Guide - Paraphrase Assistant

Complete installation guide for setting up the Paraphrase Assistant on Windows.

## System Requirements

- **Operating System**: Windows 10 or Windows 11
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: 3GB free space
- **Internet**: Required for initial setup (model download)

---

## Part 1: Install Python

### Step 1: Download Python

1. Visit: https://www.python.org/downloads/
2. Click the yellow **"Download Python 3.x.x"** button
3. Save the installer to your Downloads folder

### Step 2: Install Python

1. **Run the installer** (double-click the downloaded file)
2. ⚠️ **IMPORTANT**: Check the box **"Add Python to PATH"** at the bottom
3. Click **"Install Now"**
4. Wait for installation to complete
5. Click **"Close"**

### Step 3: Verify Installation

1. Open **PowerShell** or **Command Prompt**:
   - Press `Win + R`
   - Type `powershell`
   - Press Enter

2. Type and run:
   ```powershell
   python --version
   ```

3. You should see: `Python 3.x.x`

✅ **Python is now installed!**

---

## Part 2: Install .NET SDK

### Step 1: Download .NET SDK

1. Visit: https://dotnet.microsoft.com/download/dotnet/6.0
2. Under **".NET 6.0"**, find the **SDK** section
3. Click **"Windows x64"** to download
4. Save the installer to your Downloads folder

### Step 2: Install .NET SDK

1. **Run the installer** (double-click the downloaded file)
2. Click **"Install"**
3. Wait for installation to complete (may take a few minutes)
4. Click **"Close"**

### Step 3: Verify Installation

1. **Close and reopen** PowerShell or Command Prompt
2. Type and run:
   ```powershell
   dotnet --version
   ```

3. You should see: `6.0.xxx` or higher

✅ **.NET SDK is now installed!**

---

## Part 3: Set Up the Backend

### Step 1: Navigate to Project Folder

```powershell
cd C:\Users\Mani_Reddy\Downloads\TextEditor\backend
```

### Step 2: Create Virtual Environment

```powershell
python -m venv venv
```

This creates an isolated Python environment for the project.

### Step 3: Activate Virtual Environment

```powershell
.\venv\Scripts\activate
```

You should see `(venv)` appear at the start of your command prompt.

### Step 4: Install Python Dependencies

```powershell
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Transformers (AI models)
- PyTorch (deep learning)
- And other dependencies

⏱️ **This may take 5-10 minutes** depending on your internet speed.

### Step 5: Test the Backend

```powershell
python paraphrase_api.py
```

**First run will download the AI model (~500MB)**. This is a one-time download.

Wait for these messages:
```
INFO: Loading model 'ramsrigouthamg/t5_paraphraser'...
INFO: Model loaded successfully!
INFO: Uvicorn running on http://127.0.0.1:8000
```

✅ **Backend is working!**

Press `Ctrl+C` to stop the server for now.

---

## Part 4: Set Up the Desktop App

### Step 1: Navigate to Desktop App Folder

Open a **new** PowerShell window:

```powershell
cd C:\Users\Mani_Reddy\Downloads\TextEditor\desktop-ui\ParaphraseApp
```

### Step 2: Restore NuGet Packages

```powershell
dotnet restore
```

This downloads the required .NET libraries.

### Step 3: Build the Application

```powershell
dotnet build
```

You should see: `Build succeeded.`

✅ **Desktop app is ready!**

---

## Part 5: Running the Application

### Every Time You Want to Use the App:

#### Terminal 1: Start Backend

```powershell
cd C:\Users\Mani_Reddy\Downloads\TextEditor
.\start-backend.bat
```

Wait for: `Model loaded successfully!`

**Keep this window open!**

#### Terminal 2: Start Desktop App

```powershell
cd C:\Users\Mani_Reddy\Downloads\TextEditor\desktop-ui\ParaphraseApp
dotnet run
```

The desktop app window will open.

---

## Alternative: Using Startup Scripts

### For Backend:

Simply double-click `start-backend.bat` in the TextEditor folder.

### For Desktop App:

Create a shortcut:

1. Right-click `desktop-ui\ParaphraseApp` folder
2. Create a new text file named `run-app.bat`
3. Add this content:
   ```batch
   @echo off
   cd /d "%~dp0"
   dotnet run
   pause
   ```
4. Double-click `run-app.bat` to start the app

---

## Verification Checklist

After installation, verify everything works:

- [ ] Python installed and in PATH
- [ ] .NET SDK installed and in PATH
- [ ] Backend virtual environment created
- [ ] Python dependencies installed
- [ ] AI model downloaded
- [ ] Backend starts successfully
- [ ] Desktop app builds without errors
- [ ] Desktop app runs and shows UI
- [ ] API Status shows "Connected" in the app

---

## Uninstallation

If you need to remove the application:

### Remove Project Files

Simply delete the `TextEditor` folder.

### Uninstall Python (Optional)

1. Open **Settings** → **Apps**
2. Find **Python 3.x**
3. Click **Uninstall**

### Uninstall .NET SDK (Optional)

1. Open **Settings** → **Apps**
2. Find **Microsoft .NET SDK 6.0.x**
3. Click **Uninstall**

---

## Next Steps

Once installation is complete:

1. Read [QUICKSTART.md](QUICKSTART.md) for usage instructions
2. Read [README.md](README.md) for detailed documentation
3. Try the example in the Quick Start guide

---

## Troubleshooting Installation

### "pip is not recognized"

Python was not added to PATH. Reinstall Python and check "Add Python to PATH".

### "dotnet is not recognized"

.NET SDK was not added to PATH. Restart your terminal or computer.

### Installation fails with permission errors

Run PowerShell as Administrator:
- Right-click PowerShell
- Select "Run as administrator"

### Antivirus blocks installation

Temporarily disable antivirus during installation, or add exceptions for:
- Python installer
- .NET SDK installer
- TextEditor folder

### Download speeds are slow

- Use a wired internet connection if possible
- Close other applications using bandwidth
- Try installation during off-peak hours

---

## Getting Help

If you encounter issues during installation:

1. Check error messages carefully
2. Review this guide step-by-step
3. Ensure you have administrator privileges
4. Check your internet connection
5. Verify system requirements are met

---

**Installation complete!** Proceed to [QUICKSTART.md](QUICKSTART.md) to start using the application.
