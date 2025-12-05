@echo off
echo ========================================
echo Paraphrase Assistant - Complete Setup
echo ========================================
echo.
echo This script will check your system and
echo guide you through the setup process.
echo.
pause

echo.
echo [1/4] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [X] Python is NOT installed!
    echo.
    echo Please install Python 3.8 or higher from:
    echo https://www.python.org/downloads/
    echo.
    echo IMPORTANT: Check "Add Python to PATH" during installation!
    echo.
    echo After installing Python, run this script again.
    pause
    exit /b 1
) else (
    python --version
    echo [OK] Python is installed!
)

echo.
echo [2/4] Checking .NET SDK installation...
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [X] .NET SDK is NOT installed!
    echo.
    echo Please install .NET 6.0 SDK from:
    echo https://dotnet.microsoft.com/download/dotnet/6.0
    echo.
    echo After installing .NET SDK, restart your terminal and run this script again.
    pause
    exit /b 1
) else (
    dotnet --version
    echo [OK] .NET SDK is installed!
)

echo.
echo [3/4] Checking backend setup...
if not exist "backend\venv\" (
    echo.
    echo Setting up Python virtual environment...
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    echo Installing Python dependencies (this may take a few minutes)...
    pip install -r requirements.txt
    cd ..
    echo [OK] Backend setup complete!
) else (
    echo [OK] Backend already set up!
)

echo.
echo [4/4] Checking desktop app setup...
cd desktop-ui\ParaphraseApp
dotnet restore >nul 2>&1
if errorlevel 1 (
    echo.
    echo [X] Failed to restore .NET packages!
    echo Please check your internet connection and try again.
    cd ..\..
    pause
    exit /b 1
) else (
    echo [OK] Desktop app dependencies restored!
)
cd ..\..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your system is ready to run Paraphrase Assistant!
echo.
echo Next steps:
echo 1. Double-click "start-backend.bat" to start the backend server
echo 2. Wait for "Model loaded successfully!" message
echo 3. Double-click "start-desktop.bat" to start the desktop app
echo 4. Press Ctrl+Alt+P to capture and paraphrase text!
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
